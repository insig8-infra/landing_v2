import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { LANDING_COPY } from '../../content/landingCopy';
import { fadeUpVariant } from './scrollChoreography';

/* CTA particle scatter: 6-8 drifting teal dots around the button */
const Particles = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 120,
      y: (Math.random() - 0.5) * 80,
      dur: 4 + Math.random() * 4,
      delay: Math.random() * 3,
      size: 1.5 + Math.random() * 1.5,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: 'hsl(var(--brand-tertiary))',
            left: '50%',
            top: '50%',
          }}
          animate={{
            x: [0, p.x, -p.x * 0.5, 0],
            y: [0, p.y, -p.y * 0.8, 0],
            opacity: [0, 0.4, 0.3, 0],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export const CTASection = ({ onOpenEarlyAccess }) => {
  const { headline, headlineAccent, body, buttonText, microcopy } = LANDING_COPY.cta;

  /* Highlight "telling a story" in the headline */
  const parts = headline.split('telling a story');

  return (
    <section className="relative py-10 sm:py-12 overflow-hidden" data-testid="cta-section">
      <div className="absolute inset-0 hero-glow opacity-60 pointer-events-none" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <motion.h2
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-display mb-1"
          data-testid="cta-headline"
        >
          {parts[0]}<span className="gradient-text-highlight">telling a story</span>{parts[1] || '.'}
        </motion.h2>
        <motion.h2
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text-highlight mb-5"
          data-testid="cta-headline-accent"
        >
          {headlineAccent}
        </motion.h2>
        <motion.p
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-base sm:text-lg text-support mb-8 max-w-lg mx-auto leading-relaxed"
          data-testid="cta-body"
        >
          {body}
        </motion.p>
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative inline-block"
        >
          <Particles />
          <button
            onClick={onOpenEarlyAccess}
            className="relative z-10 group px-8 py-3.5 rounded-full bg-gradient-hero-focus text-white font-semibold text-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focal-glow-hero"
            data-testid="cta-btn"
          >
            {buttonText}
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
          </button>
        </motion.div>
        <p className="text-xs text-muted mt-3" data-testid="cta-microcopy">{microcopy}</p>
      </div>
    </section>
  );
};
