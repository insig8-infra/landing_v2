const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export const clamp01 = (value) => clamp(Number.isFinite(value) ? value : 0, 0, 1);

export const CONVERGENCE_STAGES = Object.freeze({
  ORBIT: 'orbit',
  ARC: 'arc',
  MERGE: 'merge',
  PULSE: 'pulse',
  HANDOFF: 'handoff',
});

export const CONVERGENCE_THRESHOLDS = Object.freeze({
  orbitEnd: 0.09,
  arcEnd: 0.17,
  mergeEnd: 0.24,
  pulseEnd: 0.31,
  handoffEnd: 0.45,
});

export const DEFAULT_INSIGHT_LOCUS = Object.freeze({
  x: 0,
  y: -0.06,
  z: 0.22,
});

const normalizeRange = (value, start, end) => {
  if (end <= start) {
    return value >= end ? 1 : 0;
  }
  return clamp((value - start) / (end - start), 0, 1);
};

const lerp = (start, end, amount) => start + (end - start) * amount;

const lerpVec3 = (start, end, amount) => ({
  x: lerp(start.x, end.x, amount),
  y: lerp(start.y, end.y, amount),
  z: lerp(start.z, end.z, amount),
});

const quadraticBezierVec3 = (start, control, end, amount) => {
  const inverse = 1 - amount;
  return {
    x: inverse * inverse * start.x + 2 * inverse * amount * control.x + amount * amount * end.x,
    y: inverse * inverse * start.y + 2 * inverse * amount * control.y + amount * amount * end.y,
    z: inverse * inverse * start.z + 2 * inverse * amount * control.z + amount * amount * end.z,
  };
};

export const resolveConvergenceStage = (
  rawProgress,
  reducedMotion = false,
  thresholds = CONVERGENCE_THRESHOLDS
) => {
  if (reducedMotion) {
    return CONVERGENCE_STAGES.HANDOFF;
  }

  const progress = clamp01(rawProgress);
  if (progress < thresholds.orbitEnd) {
    return CONVERGENCE_STAGES.ORBIT;
  }
  if (progress < thresholds.arcEnd) {
    return CONVERGENCE_STAGES.ARC;
  }
  if (progress < thresholds.mergeEnd) {
    return CONVERGENCE_STAGES.MERGE;
  }
  if (progress < thresholds.pulseEnd) {
    return CONVERGENCE_STAGES.PULSE;
  }
  return CONVERGENCE_STAGES.HANDOFF;
};

export const getConvergenceState = (
  rawProgress,
  reducedMotion = false,
  thresholds = CONVERGENCE_THRESHOLDS
) => {
  const progress = clamp01(rawProgress);
  const stage = resolveConvergenceStage(progress, reducedMotion, thresholds);

  if (reducedMotion) {
    return {
      progress,
      stage,
      stageProgress: 1,
      reducedMotion: true,
      shouldSkipMergeAnimation: true,
      arcMix: 1,
      mergeMix: 1,
      pulseMix: 0,
      handoffMix: 1,
      convergenceMix: 1,
      tiltDamping: 0,
      pulseVisible: false,
      showHandoff: true,
    };
  }

  const arcMix = normalizeRange(progress, thresholds.orbitEnd, thresholds.arcEnd);
  const mergeMix = normalizeRange(progress, thresholds.arcEnd, thresholds.mergeEnd);
  const pulseMix = normalizeRange(progress, thresholds.mergeEnd, thresholds.pulseEnd);
  const handoffMix = normalizeRange(progress, thresholds.pulseEnd, thresholds.handoffEnd);
  const convergenceMix = normalizeRange(progress, thresholds.orbitEnd, thresholds.mergeEnd);

  let stageProgress = 0;
  if (stage === CONVERGENCE_STAGES.ORBIT) {
    stageProgress = normalizeRange(progress, 0, thresholds.orbitEnd);
  } else if (stage === CONVERGENCE_STAGES.ARC) {
    stageProgress = arcMix;
  } else if (stage === CONVERGENCE_STAGES.MERGE) {
    stageProgress = mergeMix;
  } else if (stage === CONVERGENCE_STAGES.PULSE) {
    stageProgress = pulseMix;
  } else {
    stageProgress = handoffMix;
  }

  return {
    progress,
    stage,
    stageProgress,
    reducedMotion: false,
    shouldSkipMergeAnimation: false,
    arcMix,
    mergeMix,
    pulseMix,
    handoffMix,
    convergenceMix,
    tiltDamping: 1 - convergenceMix * 0.85,
    pulseVisible: stage === CONVERGENCE_STAGES.PULSE,
    showHandoff: stage === CONVERGENCE_STAGES.PULSE || stage === CONVERGENCE_STAGES.HANDOFF,
  };
};

export const getBadgeArcTarget = (index, total) => {
  const safeTotal = Math.max(total, 1);
  const lane = safeTotal === 1 ? 0.5 : index / (safeTotal - 1);
  const side = lane * 2 - 1;
  const centerBias = 1 - Math.abs(side);

  return {
    x: clamp(side * (0.34 + centerBias * 0.08), -0.45, 0.45),
    y: clamp(-0.28 - centerBias * 0.12 + (index % 2 === 0 ? 0.018 : -0.018), -0.6, 0.1),
    z: clamp((0.5 - lane) * 0.48, -0.55, 0.55),
  };
};

export const getBadgeArcControlPoint = (orbitPosition, arcTarget, index, total) => {
  const safeTotal = Math.max(total, 1);
  const lane = safeTotal === 1 ? 0.5 : index / (safeTotal - 1);
  const side = lane * 2 - 1;
  const midpoint = lerpVec3(orbitPosition, arcTarget, 0.5);
  const lift = 0.22 + Math.abs(side) * 0.07;

  return {
    x: clamp(midpoint.x * 0.84, -0.85, 0.85),
    y: clamp(Math.min(orbitPosition.y, arcTarget.y) - lift, -0.85, 0.2),
    z: clamp(midpoint.z + (0.5 - lane) * 0.12, -0.75, 0.75),
  };
};

export const getBadgeConvergencePosition = ({
  orbitPosition,
  index,
  total,
  state,
  insightLocus = DEFAULT_INSIGHT_LOCUS,
}) => {
  const arcTarget = getBadgeArcTarget(index, total);

  if (state.reducedMotion) {
    return {
      position: { ...insightLocus },
      arcTarget,
      arcControl: { ...insightLocus },
      participates: true,
    };
  }

  const arcControl = getBadgeArcControlPoint(orbitPosition, arcTarget, index, total);
  const arcPosition = quadraticBezierVec3(orbitPosition, arcControl, arcTarget, state.arcMix);
  const mergePosition = lerpVec3(arcTarget, insightLocus, state.mergeMix);

  let position = orbitPosition;
  if (state.stage === CONVERGENCE_STAGES.ARC) {
    position = arcPosition;
  } else if (state.stage === CONVERGENCE_STAGES.MERGE) {
    position = mergePosition;
  } else if (
    state.stage === CONVERGENCE_STAGES.PULSE ||
    state.stage === CONVERGENCE_STAGES.HANDOFF
  ) {
    position = insightLocus;
  }

  return {
    position,
    arcTarget,
    arcControl,
    participates: true,
  };
};

export const getStaticClusterPosition = (index, total, insightLocus = DEFAULT_INSIGHT_LOCUS) => {
  const safeTotal = Math.max(total, 1);
  const angle = (Math.PI * 2 * index) / safeTotal;
  const radiusX = 0.065;
  const radiusY = 0.045;

  return {
    x: insightLocus.x + Math.cos(angle) * radiusX,
    y: insightLocus.y + Math.sin(angle) * radiusY,
    z: insightLocus.z + Math.sin(angle * 1.5) * 0.05,
  };
};

export const getDepthMetrics = (z, state) => {
  const depth = clamp01((z + 0.65) / 1.3);
  const pulseBoost = state.pulseMix * 0.08;

  return {
    depth,
    scale: 0.76 + depth * 0.26 + pulseBoost,
    opacity: (0.48 + depth * 0.5) * (1 - state.handoffMix * 0.3),
    blur: z < -0.28 ? Math.min(2.2, Math.abs(z + 0.28) * 3.5) : 0,
  };
};
