import { useCallback, useEffect, useMemo, useState } from 'react';

const DEPTH_LIMITS = Object.freeze({
  translate: 6,
  rotate: 2,
  translateMax: 8,
  rotateMax: 3,
});

const DEFAULT_POINTER = Object.freeze({
  x: 0.5,
  y: 0.5,
});

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const readMediaMatch = (query) => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia(query).matches;
};

export const supportsInteractionDepth = () =>
  readMediaMatch('(pointer: fine)') && !readMediaMatch('(prefers-reduced-motion: reduce)');

export const calculateDepthVector = ({
  x = DEFAULT_POINTER.x,
  y = DEFAULT_POINTER.y,
  translate = DEPTH_LIMITS.translate,
  rotate = DEPTH_LIMITS.rotate,
} = {}) => {
  const clampedX = clamp(x, 0, 1) - 0.5;
  const clampedY = clamp(y, 0, 1) - 0.5;
  const translateRange = clamp(Math.abs(translate), 0, DEPTH_LIMITS.translateMax);
  const rotateRange = clamp(Math.abs(rotate), 0, DEPTH_LIMITS.rotateMax);

  return {
    translateX: Number((clampedX * 2 * translateRange).toFixed(3)),
    translateY: Number((clampedY * 2 * translateRange).toFixed(3)),
    rotateX: Number((clampedY * -2 * rotateRange).toFixed(3)),
    rotateY: Number((clampedX * 2 * rotateRange).toFixed(3)),
  };
};

export const depthVectorToTransform = (
  vector,
  { translateFactor = 1, rotateFactor = 1 } = {}
) => {
  const resolvedTranslateFactor = clamp(translateFactor, 0, 1.2);
  const resolvedRotateFactor = clamp(rotateFactor, 0, 1.2);
  const translateX = Number((vector.translateX * resolvedTranslateFactor).toFixed(3));
  const translateY = Number((vector.translateY * resolvedTranslateFactor).toFixed(3));
  const rotateX = Number((vector.rotateX * resolvedRotateFactor).toFixed(3));
  const rotateY = Number((vector.rotateY * resolvedRotateFactor).toFixed(3));

  return `translate3d(${translateX}px, ${translateY}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
};

export const DEPTH_RESET_TRANSFORM =
  'translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg)';

export const useInteractionDepth = ({
  translate = DEPTH_LIMITS.translate,
  rotate = DEPTH_LIMITS.rotate,
  transitionMs = 180,
} = {}) => {
  const [pointer, setPointer] = useState(DEFAULT_POINTER);
  const [depthEnabled, setDepthEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      setDepthEnabled(false);
      return undefined;
    }

    const finePointerQuery = window.matchMedia('(pointer: fine)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const applyCapability = () =>
      setDepthEnabled(Boolean(finePointerQuery.matches) && !Boolean(reducedMotionQuery.matches));

    applyCapability();

    if (typeof finePointerQuery.addEventListener === 'function') {
      finePointerQuery.addEventListener('change', applyCapability);
      reducedMotionQuery.addEventListener('change', applyCapability);
    } else if (typeof finePointerQuery.addListener === 'function') {
      finePointerQuery.addListener(applyCapability);
      reducedMotionQuery.addListener(applyCapability);
    }

    return () => {
      if (typeof finePointerQuery.removeEventListener === 'function') {
        finePointerQuery.removeEventListener('change', applyCapability);
        reducedMotionQuery.removeEventListener('change', applyCapability);
      } else if (typeof finePointerQuery.removeListener === 'function') {
        finePointerQuery.removeListener(applyCapability);
        reducedMotionQuery.removeListener(applyCapability);
      }
    };
  }, []);

  const onPointerMove = useCallback((event) => {
    if (!depthEnabled) {
      return;
    }

    const rect = event.currentTarget?.getBoundingClientRect?.();
    if (!rect || rect.width <= 0 || rect.height <= 0) {
      return;
    }

    const pointerX = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    const pointerY = clamp((event.clientY - rect.top) / rect.height, 0, 1);
    setPointer({ x: pointerX, y: pointerY });
  }, [depthEnabled]);

  const onPointerLeave = useCallback(() => {
    setPointer(DEFAULT_POINTER);
  }, []);

  const depthVector = useMemo(
    () =>
      calculateDepthVector({
        x: pointer.x,
        y: pointer.y,
        translate,
        rotate,
      }),
    [pointer.x, pointer.y, rotate, translate]
  );

  return {
    depthEnabled,
    pointer,
    depthVector,
    transition: `transform ${transitionMs}ms cubic-bezier(0.22, 1, 0.36, 1)`,
    onPointerMove,
    onPointerLeave,
  };
};
