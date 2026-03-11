import React, { useRef, useEffect, useMemo, useState } from 'react';
import { MouseContext, floatingBadges, convergenceHandoffCopy } from './shared';
import {
  CONVERGENCE_STAGES,
  DEFAULT_INSIGHT_LOCUS,
  getBadgeConvergencePosition,
  getConvergenceState,
  getDepthMetrics,
  getStaticClusterPosition,
} from './sphereConvergence';

const getScrollValue = (scrollProgress) =>
  typeof scrollProgress?.get === 'function' ? scrollProgress.get() : 0;

const resolveHeroViewportProgress = (rootEl) => {
  if (!rootEl || typeof window === 'undefined') {
    return null;
  }

  const rect = rootEl.getBoundingClientRect();
  const viewportHeight = window.innerHeight || 0;
  if (rect.height <= 0 || viewportHeight <= 0) {
    return null;
  }

  // Drive convergence over the hero's own scroll travel so handoff is visible before hero exits.
  return Math.min(1, Math.max(0, -rect.top / rect.height));
};

const readReducedMotionPreference = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const clampToViewport = (x, y) => ({
  x: Math.max(3, Math.min(97, x)),
  y: Math.max(5, Math.min(92, y)),
});

const avoidExclusionZone = (x, y, intensity = 1) => {
  if (intensity <= 0) {
    return { x, y, wasAvoided: false };
  }

  const centerX = 50;
  const centerY = 48;
  const exclusionRadius = 29;
  const dx = x - centerX;
  const dy = y - centerY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance >= exclusionRadius) {
    return { x, y, wasAvoided: false };
  }

  const angle = Math.atan2(dy, dx);
  const pushDistance = exclusionRadius + exclusionRadius * 0.12 * intensity;
  const adjustedX = centerX + Math.cos(angle) * pushDistance;
  const adjustedY = centerY + Math.sin(angle) * pushDistance;

  return {
    x: x + (adjustedX - x) * intensity,
    y: y + (adjustedY - y) * intensity,
    wasAvoided: true,
  };
};

const toScreenCoordinates = (position) => ({
  x: 50 + position.x * 95,
  y: 48 + position.y * 95,
});

const createUiState = ({
  stage,
  reducedMotion,
  showHandoff,
  handoffOpacity,
  pulseOpacity,
  pulseScale,
}) => ({
  stage,
  reducedMotion,
  showHandoff,
  handoffOpacity,
  pulseOpacity,
  pulseScale,
});

const hasUiStateChanged = (current, next) =>
  current.stage !== next.stage ||
  current.reducedMotion !== next.reducedMotion ||
  current.showHandoff !== next.showHandoff ||
  Math.abs(current.handoffOpacity - next.handoffOpacity) > 0.03 ||
  Math.abs(current.pulseOpacity - next.pulseOpacity) > 0.03 ||
  Math.abs(current.pulseScale - next.pulseScale) > 0.03;

export const SphereBadges = ({ scrollProgress }) => {
  const mousePos = React.useContext(MouseContext);
  const rootRef = useRef(null);
  const badgeRefs = useRef([]);
  const startTimeRef = useRef(null);
  const mousePosRef = useRef({ x: 0.5, y: 0.5 });
  const positionsRef = useRef([]);

  const [reducedMotion, setReducedMotion] = useState(readReducedMotionPreference);
  const [uiState, setUiState] = useState(() => {
    const initialState = getConvergenceState(getScrollValue(scrollProgress), readReducedMotionPreference());
    return createUiState({
      stage: initialState.stage,
      reducedMotion: initialState.reducedMotion,
      showHandoff: initialState.showHandoff,
      handoffOpacity: initialState.reducedMotion ? 1 : 0,
      pulseOpacity: 0,
      pulseScale: 0.75,
    });
  });
  const uiStateRef = useRef(uiState);
  const reducedMotionRef = useRef(reducedMotion);

  useEffect(() => {
    mousePosRef.current = mousePos;
  }, [mousePos]);

  useEffect(() => {
    reducedMotionRef.current = reducedMotion;
  }, [reducedMotion]);

  useEffect(() => {
    uiStateRef.current = uiState;
  }, [uiState]);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (eventOrQuery) => {
      setReducedMotion(Boolean(eventOrQuery.matches));
    };

    handleMotionChange(mediaQuery);

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleMotionChange);
      return () => mediaQuery.removeEventListener('change', handleMotionChange);
    }

    mediaQuery.addListener(handleMotionChange);
    return () => mediaQuery.removeListener(handleMotionChange);
  }, []);

  const badgeConfig = useMemo(() => {
    const badgeCount = floatingBadges.length;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    return floatingBadges.map((_, index) => {
      const theta = goldenAngle * index;
      const phi = Math.acos(1 - (2 * (index + 0.5)) / badgeCount);

      return {
        theta,
        phi,
        speedMult: 0.74 + ((index * 7) % 8) * 0.05,
        phaseOffset: (Math.PI * 2 * index) / badgeCount,
        wobbleFreq: 0.28 + (index % 6) * 0.045,
        wobbleAmp: 0.009 + (index % 4) * 0.003,
      };
    });
  }, []);

  useEffect(() => {
    const resolveProgress = () => {
      const heroViewportProgress = resolveHeroViewportProgress(rootRef.current);
      return heroViewportProgress ?? getScrollValue(scrollProgress);
    };

    const totalBadges = badgeConfig.length;

    const syncUiState = (state) => {
      const nextUiState = createUiState({
        stage: state.stage,
        reducedMotion: state.reducedMotion,
        showHandoff: state.showHandoff,
        handoffOpacity: state.reducedMotion
          ? 1
          : state.showHandoff
            ? Math.min(
                1,
                state.handoffMix + (state.stage === CONVERGENCE_STAGES.PULSE ? 0.56 : 0.62)
              )
            : 0,
        pulseOpacity: state.pulseVisible ? 0.24 + state.pulseMix * 0.58 : 0,
        pulseScale: state.pulseVisible ? 0.8 + state.pulseMix * 0.65 : 0.8,
      });

      if (hasUiStateChanged(uiStateRef.current, nextUiState)) {
        uiStateRef.current = nextUiState;
        setUiState(nextUiState);
      }
    };

    const applyBadgeStyle = (index, position, state, smoothFactor) => {
      const el = badgeRefs.current[index];
      if (!el) {
        return;
      }

      const screen = toScreenCoordinates(position);
      const avoidanceStrength = Math.max(0, 1 - state.convergenceMix * 1.2);
      const avoided = avoidExclusionZone(screen.x, screen.y, avoidanceStrength);
      const clamped = clampToViewport(avoided.x, avoided.y);

      if (!positionsRef.current[index]) {
        positionsRef.current[index] = { ...clamped };
      }

      positionsRef.current[index].x += (clamped.x - positionsRef.current[index].x) * smoothFactor;
      positionsRef.current[index].y += (clamped.y - positionsRef.current[index].y) * smoothFactor;

      const { depth, scale, opacity, blur } = getDepthMetrics(position.z, state);
      el.style.left = `${positionsRef.current[index].x}%`;
      el.style.top = `${positionsRef.current[index].y}%`;
      el.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(3)})`;
      el.style.opacity = `${Math.max(0.24, opacity).toFixed(3)}`;
      el.style.zIndex = `${Math.round(depth * 12)}`;
      el.style.filter = blur > 0.25 ? `blur(${blur.toFixed(1)}px)` : 'none';
    };

    if (reducedMotion) {
      const reducedState = getConvergenceState(resolveProgress(), true);
      syncUiState(reducedState);

      badgeConfig.forEach((_, index) => {
        const staticPosition = getStaticClusterPosition(index, totalBadges, DEFAULT_INSIGHT_LOCUS);
        const el = badgeRefs.current[index];
        if (!el) {
          return;
        }

        const screen = clampToViewport(
          50 + staticPosition.x * 95,
          48 + staticPosition.y * 95
        );
        const depthState = getDepthMetrics(staticPosition.z, reducedState);
        positionsRef.current[index] = { ...screen };

        el.style.left = `${screen.x}%`;
        el.style.top = `${screen.y}%`;
        el.style.transform = `translate(-50%, -50%) scale(${depthState.scale.toFixed(3)})`;
        el.style.opacity = `${Math.max(0.3, depthState.opacity).toFixed(3)}`;
        el.style.zIndex = `${Math.round(depthState.depth * 12)}`;
        el.style.filter = 'none';
      });

      return undefined;
    }

    let frame = 0;

    const animate = (timestamp) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = (timestamp - startTimeRef.current) / 1000;
      const state = getConvergenceState(resolveProgress(), reducedMotionRef.current);
      syncUiState(state);

      const radius = 0.33 - state.convergenceMix * 0.1;
      const wobbleMix = Math.max(0, 1 - state.convergenceMix * 0.9);
      const tiltX = (mousePosRef.current.y - 0.5) * 0.14 * state.tiltDamping;
      const tiltY = (mousePosRef.current.x - 0.5) * 0.14 * state.tiltDamping;

      badgeConfig.forEach((config, index) => {
        const rotationPhase = elapsed * 0.15 * config.speedMult + config.phaseOffset;
        const theta = config.theta + rotationPhase;
        const phi = config.phi;

        const sphereX = radius * Math.sin(phi) * Math.cos(theta);
        const sphereY = radius * Math.cos(phi);
        const sphereZ = radius * Math.sin(phi) * Math.sin(theta);

        const wobbleX = Math.sin(elapsed * config.wobbleFreq * 2 + index) * config.wobbleAmp * wobbleMix;
        const wobbleY =
          Math.cos(elapsed * config.wobbleFreq * 1.7 + index * 0.5) * config.wobbleAmp * wobbleMix;

        const breathe = 1 + Math.sin(elapsed * 0.25 + config.phaseOffset) * 0.025 * (1 - state.mergeMix);
        const perspective = 1 + sphereZ * 0.28;
        const orbitPosition = {
          x: (sphereX * breathe + wobbleX) * perspective + tiltY * 0.09,
          y: (sphereY * breathe + wobbleY) * perspective + tiltX * 0.09,
          z: sphereZ,
        };

        const { position } = getBadgeConvergencePosition({
          orbitPosition,
          index,
          total: totalBadges,
          state,
          insightLocus: DEFAULT_INSIGHT_LOCUS,
        });

        const smoothing =
          state.stage === CONVERGENCE_STAGES.ORBIT ? 0.055 : state.stage === CONVERGENCE_STAGES.ARC ? 0.08 : 0.14;
        applyBadgeStyle(index, position, state, smoothing);
      });

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      startTimeRef.current = null;
    };
  }, [badgeConfig, reducedMotion, scrollProgress]);

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      data-testid="sphere-convergence-root"
      data-convergence-stage={uiState.stage}
      data-reduced-motion={uiState.reducedMotion ? 'true' : 'false'}
      data-handoff-visible={uiState.showHandoff ? 'true' : 'false'}
    >
      {floatingBadges.map((badge, index) => (
        <div
          key={badge.label}
          ref={(el) => {
            badgeRefs.current[index] = el;
          }}
          data-testid={`sphere-badge-${index}`}
          data-participates-in-merge="true"
          className="absolute glass rounded-lg px-3 py-1.5 md:px-3.5 md:py-2 transition-[filter,opacity] duration-300"
          style={{
            willChange: 'transform, opacity, left, top',
            left: '50%',
            top: '50%',
          }}
        >
          <div className="flex items-center gap-1.5 text-xs whitespace-nowrap">
            <badge.icon className={`w-3 h-3 md:w-3.5 md:h-3.5 ${badge.color}`} />
            <span className="text-white/60 hidden sm:inline text-[11px]">{badge.label}</span>
          </div>
        </div>
      ))}

      {!uiState.reducedMotion && uiState.pulseOpacity > 0.01 && (
        <div
          data-testid="sphere-convergence-pulse"
          className="absolute left-1/2 top-[42%] h-28 w-28 md:h-36 md:w-36 rounded-full bg-gradient-to-br from-cyan-400/35 to-blue-500/10 blur-2xl"
          style={{
            opacity: uiState.pulseOpacity,
            transform: `translate(-50%, -50%) scale(${uiState.pulseScale})`,
          }}
        />
      )}

      <div
        data-testid="sphere-convergence-outcome"
        data-visible={uiState.showHandoff ? 'true' : 'false'}
        className="absolute left-1/2 top-[42%] z-30 -translate-x-1/2 rounded-full border border-white/25 bg-slate-950/92 px-4 py-2 text-xs md:text-sm font-medium tracking-wide text-white backdrop-blur-sm shadow-[0_0_36px_rgba(56,189,248,0.22)] transition-opacity duration-500"
        style={{
          opacity: uiState.showHandoff ? uiState.handoffOpacity : 0,
        }}
      >
        <span>{convergenceHandoffCopy.prefix} </span>
        <span data-testid="sphere-convergence-outcome-emphasis" className="gradient-text-highlight">
          {convergenceHandoffCopy.emphasis}
        </span>
      </div>
    </div>
  );
};
