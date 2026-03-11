import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TrendingDown, AlertTriangle, Users, Calendar } from 'lucide-react';
import { LANDING_COPY } from '../../content/landingCopy';
import { MouseContext } from './shared';
import { SphereBadges } from './SphereBadges';
import { getHeroHeadlineStageFromScroll, HERO_HEADLINE_STAGES } from './heroMotion';

/* ─── Signal Card ─── */
const useCountdown = (from, to, active, duration = 1200) => {
  const [val, setVal] = useState(from);
  useEffect(() => {
    if (!active) return;
    let raf;
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(from + (to - from) * e));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, from, to, duration]);
  return val;
};

const SignalCard = () => {
  const { signalCard } = LANDING_COPY.hero;
  const [entered, setEntered] = useState(false);
  const score = useCountdown(signalCard.healthScoreStart, signalCard.healthScore, entered);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 800);
    return () => clearTimeout(t);
  }, []);

  const scoreColor = score > 60 ? 'text-emerald-400' : score > 40 ? 'text-amber-400' : 'text-rose-400';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, rotateX: 8 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      style={{ transformPerspective: 1200 }}
      className="relative w-[320px] sm:w-[360px] bento-card rounded-2xl p-5 mt-8 mx-auto"
      data-testid="hero-signal-card"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-heading font-semibold text-heading">{signalCard.company}</span>
        <motion.span
          animate={entered ? { scale: [1, 1.08, 1] } : {}}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-semibold flex items-center gap-1"
          data-testid="signal-card-badge"
        >
          <AlertTriangle size={9} /> {signalCard.badge}
        </motion.span>
      </div>
      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-xs text-muted uppercase tracking-wider">Health Score</span>
        <span className={`text-2xl font-heading font-bold ${scoreColor}`} data-testid="signal-card-score">{score}</span>
        <TrendingDown size={14} className="text-rose-400" />
      </div>
      <div className="space-y-2">
        {signalCard.signals.map((sig, i) => (
          <motion.div
            key={sig.type}
            initial={{ opacity: 0, x: -8 }}
            animate={entered ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 1.0 + i * 0.15, duration: 0.4 }}
            className="flex items-start gap-2 text-xs"
            data-testid={`signal-row-${sig.type}`}
          >
            <span className={`mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${sig.severity === 'rose' ? 'bg-rose-400' : 'bg-amber-400'}`} />
            <span className="text-support">{sig.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

/* ─── Hero ─── */
export const HeroSection = ({ onOpenEarlyAccess }) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [headlineStage, setHeadlineStage] = useState(HERO_HEADLINE_STAGES.CHAOS);

  const handleMouseMove = useCallback((e) => {
    setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
  }, []);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => setHeadlineStage(getHeroHeadlineStageFromScroll(v)));
    return unsub;
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
      <section ref={sectionRef} className="relative min-h-[140vh] overflow-hidden" onMouseMove={handleMouseMove} data-testid="hero-section" id="hero">
        <div className="hero-glow absolute inset-0 pointer-events-none" />
        <motion.div className="sticky top-0 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6" style={{ opacity: heroOpacity, y: heroY }}>
          <SphereBadges scrollProgress={scrollYProgress} />
          <div className="relative z-20 max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm mb-8" data-testid="hero-badge">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-support">{copy.badge}</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }} className="text-display-hero hero-headline-main mb-6" data-testid="hero-headline">
              {copy.headlineLead}{' '}
              <span className="relative inline-grid hero-headline-word-slot">
                <span className="hero-headline-word-layer gradient-text-hero row-start-1 col-start-1" style={{ opacity: painOpacity, transition: 'opacity 0.4s ease' }} data-testid="hero-pain-word">
                  {copy.headlinePrimary}
                  <span className="hero-headline-strike" style={{ width: strikeWidth, transition: 'width 0.5s cubic-bezier(0.22, 1, 0.36, 1)' }} aria-hidden="true" />
                </span>
                <span className="hero-headline-word-layer gradient-text-highlight row-start-1 col-start-1" style={{ opacity: clarityOpacity, transition: 'opacity 0.5s ease', transform: `translateY(${clarityOpacity > 0 ? 0 : 8}px)` }} data-testid="hero-clarity-word">
                  {copy.headlineScrollTarget}
                </span>
              </span>?
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="text-body-lg text-support max-w-2xl mx-auto mb-8" data-testid="hero-subheadline">
              {copy.subheadline}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="flex flex-col items-center gap-3">
              <button onClick={onOpenEarlyAccess} className="group relative px-8 py-3.5 rounded-full bg-gradient-hero-focus text-white font-semibold text-base sm:text-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focal-glow-hero" data-testid="hero-cta-btn">
                {copy.cta}
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </button>
              <span className="text-xs text-muted" data-testid="hero-trust-line">{copy.trustLine}</span>
            </motion.div>
            <SignalCard />
          </div>
        </motion.div>
      </section>
    </MouseContext.Provider>
  );
};
