export const HERO_HEADLINE_STAGES = Object.freeze({
  CHAOS: 'chaos',
  STRIKE: 'strike',
  REPLACE: 'replace',
  SETTLED_CLARITY: 'settled_clarity',
});

const DEFAULT_STAGE_THRESHOLDS = Object.freeze({
  strikeStart: 0.08,
  replaceStart: 0.18,
  settle: 0.36,
  inViewExit: 0.3,
});

const DEFAULT_IDLE_LOOP = Object.freeze({
  idleDelayMs: 1200,
  cycleMs: 5200,
  maxProgress: 0.24,
  strikeWindow: [0.4, 0.68],
  replaceWindow: [0.68, 0.98],
});

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const isFiniteNumber = (value) => Number.isFinite(value);

export const clampProgress = (value) => {
  if (!isFiniteNumber(value)) {
    return 0;
  }
  return clamp(value, 0, 1);
};

const normalizeWindow = (windowValue, fallbackWindow) => {
  if (!Array.isArray(windowValue) || windowValue.length !== 2) {
    return [...fallbackWindow];
  }

  const start = clampProgress(windowValue[0]);
  const end = clampProgress(windowValue[1]);

  if (end <= start) {
    return [...fallbackWindow];
  }

  return [start, end];
};

const normalizePositiveMs = (value, fallback) => {
  if (!isFiniteNumber(value) || value <= 0) {
    return fallback;
  }

  return value;
};

export const buildHeroMotionConfig = (rawConfig = {}) => {
  const stageThresholds = rawConfig.stageThresholds ?? {};
  const idleLoop = rawConfig.idleLoop ?? {};

  const strikeStart = clampProgress(stageThresholds.strikeStart ?? DEFAULT_STAGE_THRESHOLDS.strikeStart);
  const replaceStart = clamp(
    clampProgress(stageThresholds.replaceStart ?? DEFAULT_STAGE_THRESHOLDS.replaceStart),
    strikeStart + 0.01,
    1
  );
  const settle = clamp(
    clampProgress(stageThresholds.settle ?? DEFAULT_STAGE_THRESHOLDS.settle),
    replaceStart + 0.01,
    1
  );
  const inViewExit = clamp(
    clampProgress(stageThresholds.inViewExit ?? DEFAULT_STAGE_THRESHOLDS.inViewExit),
    0,
    settle
  );

  const strikeWindow = normalizeWindow(idleLoop.strikeWindow, DEFAULT_IDLE_LOOP.strikeWindow);
  const replaceWindow = normalizeWindow(idleLoop.replaceWindow, DEFAULT_IDLE_LOOP.replaceWindow);

  return {
    stageThresholds: {
      strikeStart,
      replaceStart,
      settle,
      inViewExit,
    },
    idleLoop: {
      idleDelayMs: normalizePositiveMs(idleLoop.idleDelayMs, DEFAULT_IDLE_LOOP.idleDelayMs),
      cycleMs: normalizePositiveMs(idleLoop.cycleMs, DEFAULT_IDLE_LOOP.cycleMs),
      maxProgress: clamp(
        clampProgress(idleLoop.maxProgress ?? DEFAULT_IDLE_LOOP.maxProgress),
        0,
        settle
      ),
      strikeWindow,
      replaceWindow,
    },
  };
};

export const getHeroHeadlineStageFromScroll = (progress, config) => {
  const normalizedConfig = buildHeroMotionConfig(config);
  const normalizedProgress = clampProgress(progress);
  const { strikeStart, replaceStart, settle } = normalizedConfig.stageThresholds;

  if (normalizedProgress >= settle) {
    return HERO_HEADLINE_STAGES.SETTLED_CLARITY;
  }
  if (normalizedProgress >= replaceStart) {
    return HERO_HEADLINE_STAGES.REPLACE;
  }
  if (normalizedProgress >= strikeStart) {
    return HERO_HEADLINE_STAGES.STRIKE;
  }
  return HERO_HEADLINE_STAGES.CHAOS;
};

export const getHeroLoopHeadlineStage = (loopProgress, config) => {
  const normalizedConfig = buildHeroMotionConfig(config);
  const normalizedLoopProgress = clampProgress(loopProgress);
  const [strikeStart] = normalizedConfig.idleLoop.strikeWindow;
  const [replaceStart] = normalizedConfig.idleLoop.replaceWindow;

  if (normalizedLoopProgress >= replaceStart) {
    return HERO_HEADLINE_STAGES.REPLACE;
  }
  if (normalizedLoopProgress >= strikeStart) {
    return HERO_HEADLINE_STAGES.STRIKE;
  }
  return HERO_HEADLINE_STAGES.CHAOS;
};

export const isHeroInView = (progress, config) => {
  const normalizedConfig = buildHeroMotionConfig(config);
  return clampProgress(progress) <= normalizedConfig.stageThresholds.inViewExit;
};

export const nextHeroSettledState = (wasSettled, progress, config) => {
  if (wasSettled) {
    return true;
  }
  const normalizedConfig = buildHeroMotionConfig(config);
  return clampProgress(progress) >= normalizedConfig.stageThresholds.settle;
};

export const shouldRunHeroIdleLoop = ({
  progress,
  isInView,
  isIdleLoopActive,
  hasSettled,
  config,
}) => {
  const normalizedConfig = buildHeroMotionConfig(config);
  const normalizedProgress = clampProgress(progress);

  return Boolean(
    isInView &&
      isIdleLoopActive &&
      !hasSettled &&
      normalizedProgress <= normalizedConfig.idleLoop.maxProgress
  );
};

const normalizeRange = (value, start, end) => {
  if (end <= start) {
    return 0;
  }
  return clamp((value - start) / (end - start), 0, 1);
};

export const resolveHeroStrikeProgress = ({
  stage,
  progress,
  loopProgress,
  isIdleLoopActive,
  isInView,
  hasSettled,
  config,
}) => {
  if (stage !== HERO_HEADLINE_STAGES.STRIKE) {
    return 0;
  }

  const normalizedConfig = buildHeroMotionConfig(config);
  const useLoopProgress = shouldRunHeroIdleLoop({
    progress,
    isInView,
    isIdleLoopActive,
    hasSettled,
    config: normalizedConfig,
  });

  if (useLoopProgress) {
    const [strikeStart, strikeEnd] = normalizedConfig.idleLoop.strikeWindow;
    return normalizeRange(clampProgress(loopProgress), strikeStart, strikeEnd);
  }

  const { strikeStart, replaceStart } = normalizedConfig.stageThresholds;
  return normalizeRange(clampProgress(progress), strikeStart, replaceStart);
};

export const resolveHeroHeadlineStage = ({
  progress,
  isInView,
  isIdleLoopActive,
  loopProgress,
  hasSettled,
  config,
}) => {
  const normalizedConfig = buildHeroMotionConfig(config);

  if (nextHeroSettledState(hasSettled, progress, normalizedConfig)) {
    return HERO_HEADLINE_STAGES.SETTLED_CLARITY;
  }

  if (
    shouldRunHeroIdleLoop({
      progress,
      isInView,
      isIdleLoopActive,
      hasSettled,
      config: normalizedConfig,
    })
  ) {
    return getHeroLoopHeadlineStage(loopProgress, normalizedConfig);
  }

  return getHeroHeadlineStageFromScroll(progress, normalizedConfig);
};
