import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { LANDING_COPY } from '../../content/landingCopy';

const useCounter = (end, isActive, duration = 1800) => {
  const [count, setCount] = useState(0);
  const numericEnd = parseInt(end, 10);
  useEffect(() => {
    if (!isActive || isNaN(numericEnd) || numericEnd === 0) { setCount(numericEnd || 0); return; }
    let raf;
    const start = Date.now();
    const animate = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      setCount(Math.round(numericEnd * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isActive, numericEnd, duration]);
  return count;
};

/* SVG radial progress ring */
const ProgressRing = ({ progress, size = 80, stroke = 2 }) => {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} className="absolute inset-0 m-auto pointer-events-none" style={{ transform: 'rotate(-90deg)' }} aria-hidden="true">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="hsl(var(--surface-border))" strokeWidth={stroke} opacity={0.3} />
      <motion.circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke="url(#ringGrad)" strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        whileInView={{ strokeDashoffset: circ * (1 - progress) }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      />
      <defs>
        <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(var(--gradient-hero-start))" />
          <stop offset="100%" stopColor="hsl(var(--gradient-hero-end))" />
        </linearGradient>
      </defs>
    </svg>
  );
};

/* Progress mappings: approximate visual fill for each stat */
const RING_PROGRESS = { weeks: 0.5, minutes: 0.45, signals: 0.8, entry: 0 };

const StatItem = ({ stat, isActive }) => {
  const isRange = stat.value.includes('-');
  const numericValue = isRange ? 0 : parseInt(stat.value.replace(/\D/g, ''), 10);
  const hasSuffix = stat.value.includes('+');
  const count = useCounter(numericValue, isActive);
  const display = isRange ? stat.value : `${count}${hasSuffix ? '+' : ''}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative text-center py-4"
      data-testid={`stat-${stat.id}`}
    >
      <ProgressRing progress={RING_PROGRESS[stat.id] || 0} />
      <div className="relative z-10">
        <div className="text-4xl sm:text-5xl font-heading font-bold gradient-text-hero mb-1" data-testid={`stat-number-${stat.id}`}>{display}</div>
        {stat.unit && <div className="text-xs font-semibold text-support uppercase tracking-wider mb-2">{stat.unit}</div>}
        <p className="text-sm text-muted max-w-[200px] mx-auto leading-snug">{stat.desc}</p>
      </div>
    </motion.div>
  );
};

export const StatsSection = () => {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return (
    <section className="relative py-10 sm:py-12" data-testid="stats-section">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 border-y border-white/5">
          {LANDING_COPY.stats.map((stat) => (
            <StatItem key={stat.id} stat={stat} isActive={active} />
          ))}
        </div>
      </div>
    </section>
  );
};
