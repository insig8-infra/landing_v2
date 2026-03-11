import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LANDING_COPY } from '../../content/landingCopy';
import { MouseContext } from './shared';
import { SphereBadges } from './SphereBadges';
import {
  getHeroHeadlineStageFromScroll,
  HERO_HEADLINE_STAGES,
} from './heroMotion';

export const HeroSection = ({ onOpenEarlyAccess }) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [headlineStage, setHeadlineStage] = useState(HERO_HEADLINE_STAGES.CHAOS);

  const handleMouseMove = useCallback((e) => {
    setMousePos({
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    });
  }, []);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const stage = getHeroHeadlineStageFromScroll(v);
      setHeadlineStage(stage);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

  const painOpacity = useMemo(() => {
    if (headlineStage === HERO_HEADLINE_STAGES.CHAOS) return 1;
    if (headlineStage === HERO_HEADLINE_STAGES.STRIKE) return 0.85;
    if (headlineStage === HERO_HEADLINE_STAGES.REPLACE) return 0.3;
    return 0;
  }, [headlineStage]);

  const strikeWidth = useMemo(() => {
    if (headlineStage === HERO_HEADLINE_STAGES.STRIKE) return '50%';
    if (headlineStage === HERO_HEADLINE_STAGES.REPLACE || headlineStage === HERO_HEADLINE_STAGES.SETTLED_CLARITY) return '100%';
    return '0%';
  }, [headlineStage]);

  const clarityOpacity = useMemo(() => {
    if (headlineStage === HERO_HEADLINE_STAGES.REPLACE) return 0.6;
    if (headlineStage === HERO_HEADLINE_STAGES.SETTLED_CLARITY) return 1;
    return 0;
  }, [headlineStage]);

  const copy = LANDING_COPY.hero;

  return (
    <MouseContext.Provider value={mousePos}>
      <section
        ref={sectionRef}
        className="relative min-h-[140vh] overflow-hidden"
        onMouseMove={handleMouseMove}
        data-testid="hero-section"
        id="hero"
      >
        <div className="hero-glow absolute inset-0 pointer-events-none" />

        <motion.div
          className="sticky top-0 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          <SphereBadges scrollProgress={scrollYProgress} />

          <div className="relative z-20 max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm mb-8"
              data-testid="hero-badge"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-support">{copy.badge}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-display-hero hero-headline-main mb-6"
              data-testid="hero-headline"
            >
              {copy.headlineLead}{' '}
              <span className="relative inline-grid hero-headline-word-slot">
                <span
                  className="hero-headline-word-layer gradient-text-hero row-start-1 col-start-1"
                  style={{
                    opacity: painOpacity,
                    transition: 'opacity 0.4s ease',
                  }}
                  data-testid="hero-pain-word"
                >
                  {copy.headlinePrimary}
                  <span
                    className="hero-headline-strike"
                    style={{
                      width: strikeWidth,
                      transition: 'width 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                    aria-hidden="true"
                  />
                </span>
                <span
                  className="hero-headline-word-layer gradient-text-highlight row-start-1 col-start-1"
                  style={{
                    opacity: clarityOpacity,
                    transition: 'opacity 0.5s ease',
                    transform: `translateY(${clarityOpacity > 0 ? 0 : 8}px)`,
                  }}
                  data-testid="hero-clarity-word"
                >
                  {copy.headlineScrollTarget}
                </span>
              </span>
              ?
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-body-lg text-support max-w-2xl mx-auto mb-4"
              data-testid="hero-subheadline"
            >
              {copy.subheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-support/80 mb-8"
            >
              {copy.subPoints.map((point, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-emerald-400" />
                  {point}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-col items-center gap-3"
            >
              <button
                onClick={onOpenEarlyAccess}
                className="group relative px-8 py-3.5 rounded-full bg-gradient-hero-focus text-white font-semibold text-base sm:text-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focal-glow-hero"
                data-testid="hero-cta-btn"
              >
                {copy.cta}
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </button>
              <span className="text-xs text-muted" data-testid="hero-trust-line">{copy.trustLine}</span>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </MouseContext.Provider>
  );
};
