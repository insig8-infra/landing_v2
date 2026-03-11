import { createContext, useEffect, useMemo, useState } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const FINE_POINTER_QUERY = '(pointer: fine)';

const DEFAULT_PERFORMANCE_OPTIONS = Object.freeze({
  samplePerformance: true,
  performanceSampleCount: 12,
  slowFrameMs: 48,
  slowFrameLimit: 5,
});

const readMediaMatch = (query) => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  return Boolean(window.matchMedia(query).matches);
};

export const MotionSafetyContext = createContext(null);

const readNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

export const resolvePerformanceFallback = (
  runtimeNavigator = typeof navigator === 'undefined' ? undefined : navigator
) => {
  if (!runtimeNavigator) {
    return false;
  }

  const hardwareConcurrency = readNumber(runtimeNavigator.hardwareConcurrency);
  const deviceMemory = readNumber(runtimeNavigator.deviceMemory);
  const saveDataMode = runtimeNavigator.connection?.saveData === true;

  return (
    (hardwareConcurrency !== null && hardwareConcurrency <= 2) ||
    (deviceMemory !== null && deviceMemory <= 4) ||
    saveDataMode
  );
};

export const deriveMotionSafetyFlags = ({
  reducedMotion = false,
  finePointer = false,
  performanceFallback = false,
} = {}) => {
  const reducedMotionEnabled = Boolean(reducedMotion);
  const finePointerEnabled = Boolean(finePointer);
  const performanceFallbackEnabled = Boolean(performanceFallback);
  const prefersStaticExperience = reducedMotionEnabled || performanceFallbackEnabled;

  return Object.freeze({
    reducedMotion: reducedMotionEnabled,
    finePointer: finePointerEnabled,
    performanceFallback: performanceFallbackEnabled,
    prefersStaticExperience,
    allowMotion: !prefersStaticExperience,
    allowContinuousMotion: !prefersStaticExperience,
    depthEnabled: finePointerEnabled && !prefersStaticExperience,
  });
};

export const readMotionSafetySnapshot = () =>
  deriveMotionSafetyFlags({
    reducedMotion: readMediaMatch(REDUCED_MOTION_QUERY),
    finePointer: readMediaMatch(FINE_POINTER_QUERY),
    performanceFallback: resolvePerformanceFallback(),
  });

const bindMediaListener = (mediaQueryList, callback) => {
  if (typeof mediaQueryList.addEventListener === 'function') {
    mediaQueryList.addEventListener('change', callback);
    return () => mediaQueryList.removeEventListener('change', callback);
  }

  if (typeof mediaQueryList.addListener === 'function') {
    mediaQueryList.addListener(callback);
    return () => mediaQueryList.removeListener(callback);
  }

  return () => {};
};

export const useMotionSafety = (options = {}) => {
  const mergedOptions = { ...DEFAULT_PERFORMANCE_OPTIONS, ...options };
  const [baseState, setBaseState] = useState(() => ({
    reducedMotion: readMediaMatch(REDUCED_MOTION_QUERY),
    finePointer: readMediaMatch(FINE_POINTER_QUERY),
    performanceFallback: false,
  }));

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const reducedMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const finePointerQuery = window.matchMedia(FINE_POINTER_QUERY);
    const applyMediaState = () => {
      setBaseState((current) => {
        const nextState = {
          ...current,
          reducedMotion: Boolean(reducedMotionQuery.matches),
          finePointer: Boolean(finePointerQuery.matches),
        };

        if (
          nextState.reducedMotion === current.reducedMotion &&
          nextState.finePointer === current.finePointer
        ) {
          return current;
        }

        return nextState;
      });
    };

    applyMediaState();

    const unbindReducedMotion = bindMediaListener(reducedMotionQuery, applyMediaState);
    const unbindFinePointer = bindMediaListener(finePointerQuery, applyMediaState);

    return () => {
      unbindReducedMotion();
      unbindFinePointer();
    };
  }, []);

  useEffect(() => {
    if (resolvePerformanceFallback()) {
      setBaseState((current) =>
        current.performanceFallback
          ? current
          : {
              ...current,
              performanceFallback: true,
            }
      );
      return undefined;
    }

    if (
      !mergedOptions.samplePerformance ||
      typeof window === 'undefined' ||
      typeof window.requestAnimationFrame !== 'function'
    ) {
      return undefined;
    }

    let frameSampleCount = 0;
    let slowFrameCount = 0;
    let previousTimestamp;
    let rafId;

    const sampleFrame = (timestamp) => {
      if (typeof previousTimestamp === 'number') {
        frameSampleCount += 1;
        if (timestamp - previousTimestamp > mergedOptions.slowFrameMs) {
          slowFrameCount += 1;
        }
      }

      previousTimestamp = timestamp;

      if (frameSampleCount >= mergedOptions.performanceSampleCount) {
        if (slowFrameCount >= mergedOptions.slowFrameLimit) {
          setBaseState((current) => ({
            ...current,
            performanceFallback: true,
          }));
        }
        return;
      }

      rafId = window.requestAnimationFrame(sampleFrame);
    };

    rafId = window.requestAnimationFrame(sampleFrame);

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [
    mergedOptions.performanceSampleCount,
    mergedOptions.samplePerformance,
    mergedOptions.slowFrameLimit,
    mergedOptions.slowFrameMs,
  ]);

  return useMemo(() => deriveMotionSafetyFlags(baseState), [baseState]);
};
