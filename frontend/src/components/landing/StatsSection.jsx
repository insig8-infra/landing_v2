import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { LANDING_COPY } from '../../content/landingCopy';
import { fadeUpVariant } from './scrollChoreography';

const useCounter = (end, isActive, duration = 1800) => {
  const [count, setCount] = useState(0);
  const numericEnd = parseInt(end, 10);

  useEffect(() => {
    if (!isActive || isNaN(numericEnd) || numericEnd === 0) {
      setCount(numericEnd || 0);
      return;
    }
    let raf;
    const start = Date.now();
    const animate = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(numericEnd * eased));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isActive, numericEnd, duration]);

  return count;
};

const StatItem = ({ stat, isActive }) => {
  const isRange = stat.value.includes('-');
  const numericValue = isRange ? 0 : parseInt(stat.value.replace(/\D/g, ''), 10);
  const hasSuffix = stat.value.includes('+');
  const count = useCounter(numericValue, isActive);
  const display = isRange ? stat.value : `${count}${hasSuffix ? '+' : ''}`;

  return (
    <motion.div variants={fadeUpVariant} className="text-center" data-testid={`stat-${stat.id}`}>
      <div className="text-4xl sm:text-5xl font-heading font-bold gradient-text-hero mb-1" data-testid={`stat-number-${stat.id}`}>
        {display}
      </div>
      {stat.unit && (
        <div className="text-xs font-semibold text-support uppercase tracking-wider mb-2">{stat.unit}</div>
      )}
      <p className="text-sm text-muted max-w-[200px] mx-auto leading-snug">{stat.desc}</p>
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
        <motion.div
          ref={ref}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 border-y border-white/5"
        >
          {LANDING_COPY.stats.map((stat) => (
            <StatItem key={stat.id} stat={stat} isActive={active} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
