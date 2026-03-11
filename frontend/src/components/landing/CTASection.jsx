import React from 'react';
import { motion } from 'framer-motion';
import { LANDING_COPY } from '../../content/landingCopy';
import { fadeUpVariant } from './scrollChoreography';

export const CTASection = ({ onOpenEarlyAccess }) => {
  const { headline, headlineAccent, body, buttonText, microcopy } = LANDING_COPY.cta;

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden" data-testid="cta-section">
      <div className="absolute inset-0 hero-glow opacity-50 pointer-events-none" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <motion.h2
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-display-section mb-2"
          data-testid="cta-headline"
        >
          {headline}
        </motion.h2>
        <motion.h2
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-display-section gradient-text-highlight mb-6"
          data-testid="cta-headline-accent"
        >
          {headlineAccent}
        </motion.h2>
        <motion.p
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-body-lg text-support mb-8 max-w-lg mx-auto"
          data-testid="cta-body"
        >
          {body}
        </motion.p>
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center gap-3"
        >
          <button
            onClick={onOpenEarlyAccess}
            className="group px-8 py-3.5 rounded-full bg-gradient-hero-focus text-white font-semibold text-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focal-glow-hero"
            data-testid="cta-btn"
          >
            {buttonText}
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
          </button>
          <p className="text-xs text-muted" data-testid="cta-microcopy">{microcopy}</p>
        </motion.div>
      </div>
    </section>
  );
};
