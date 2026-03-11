const SHARED_REVEAL_EASE = Object.freeze([0.22, 1, 0.36, 1]);

export const CHOREOGRAPHY_LIMITS = Object.freeze({
  headingLift: 20,
  groupLift: 16,
  cardLift: 16,
  itemLift: 14,
  headingDuration: 0.56,
  groupDuration: 0.5,
  cardDuration: 0.46,
  itemDuration: 0.44,
  staggerStep: 0.07,
  maxStaggerDelay: 0.28,
  headingViewportAmount: 0.3,
  groupViewportAmount: 0.24,
  cardViewportAmount: 0.22,
  itemViewportAmount: 0.2,
});

const toSafeIndex = (index = 0) => {
  const numericIndex = Number.isFinite(index) ? index : 0;
  return numericIndex < 0 ? 0 : numericIndex;
};

const toBoundedStaggerDelay = (index = 0) =>
  Math.min(CHOREOGRAPHY_LIMITS.maxStaggerDelay, toSafeIndex(index) * CHOREOGRAPHY_LIMITS.staggerStep);

const buildRevealPreset = ({ lift, duration, amount, delay = 0 }) => ({
  initial: { opacity: 0, y: lift },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount },
  transition: { duration, delay, ease: SHARED_REVEAL_EASE },
});

export const SECTION_CHOREOGRAPHY = Object.freeze({
  heading: Object.freeze(
    buildRevealPreset({
      lift: CHOREOGRAPHY_LIMITS.headingLift,
      duration: CHOREOGRAPHY_LIMITS.headingDuration,
      amount: CHOREOGRAPHY_LIMITS.headingViewportAmount,
    })
  ),
  group: Object.freeze(
    buildRevealPreset({
      lift: CHOREOGRAPHY_LIMITS.groupLift,
      duration: CHOREOGRAPHY_LIMITS.groupDuration,
      amount: CHOREOGRAPHY_LIMITS.groupViewportAmount,
    })
  ),
});

export const getSectionCardChoreography = (index = 0) =>
  buildRevealPreset({
    lift: CHOREOGRAPHY_LIMITS.cardLift,
    duration: CHOREOGRAPHY_LIMITS.cardDuration,
    amount: CHOREOGRAPHY_LIMITS.cardViewportAmount,
    delay: toBoundedStaggerDelay(index),
  });

export const getSectionItemChoreography = (index = 0) =>
  buildRevealPreset({
    lift: CHOREOGRAPHY_LIMITS.itemLift,
    duration: CHOREOGRAPHY_LIMITS.itemDuration,
    amount: CHOREOGRAPHY_LIMITS.itemViewportAmount,
    delay: toBoundedStaggerDelay(index),
  });

export const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: SHARED_REVEAL_EASE },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

