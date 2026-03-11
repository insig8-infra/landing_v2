export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export const getScrollY = () =>
  window.scrollY ||
  window.pageYOffset ||
  document.documentElement?.scrollTop ||
  document.body?.scrollTop ||
  0;

export const resolveCompoundsConvergenceAnchors = ({
  heroEl,
  integrationsEl,
  headlineEl,
  compoundsWordEl,
  scrollY = getScrollY(),
  viewportHeight = typeof window === 'undefined' ? 1 : window.innerHeight || 1,
  viewportWidth = typeof window === 'undefined' ? 1 : window.innerWidth || 1,
} = {}) => {
  const heroTop = heroEl ? heroEl.offsetTop : 0;
  const integrationsTop = integrationsEl ? integrationsEl.offsetTop : heroTop + viewportHeight * 0.95;

  const headlineRect = headlineEl ? headlineEl.getBoundingClientRect() : null;
  const headlineHeight = headlineRect ? headlineRect.height : viewportHeight * 0.12;
  const headlineTopAbsolute = headlineRect
    ? scrollY + headlineRect.top
    : integrationsTop + viewportHeight * 0.72;
  const headingFullAtBottomY = headlineTopAbsolute - (viewportHeight - headlineHeight);

  // Keep badges freely flowing through hero + signal-flow bridge, then tighten convergence quickly.
  const freeFlowEnd = Math.max(
    heroTop + viewportHeight * 0.28,
    integrationsTop - viewportHeight * 0.45
  );
  const convergeEnd = Math.max(freeFlowEnd + viewportHeight * 0.05, headingFullAtBottomY);
  const convergeStart = Math.max(heroTop + viewportHeight * 0.24, convergeEnd - viewportHeight * 0.13);

  const compoundsRect = compoundsWordEl ? compoundsWordEl.getBoundingClientRect() : null;
  const targetX = compoundsRect
    ? clamp(((compoundsRect.left + compoundsRect.width * 0.5) / viewportWidth) * 100, 8, 92)
    : 50;
  const targetY = compoundsRect
    ? clamp(((compoundsRect.top + compoundsRect.height * 0.5) / viewportHeight) * 100, 8, 92)
    : 43;

  return {
    heroTop,
    integrationsTop,
    headingFullAtBottomY,
    freeFlowEnd,
    convergeStart,
    convergeEnd,
    target: {
      x: targetX,
      y: targetY,
    },
  };
};
