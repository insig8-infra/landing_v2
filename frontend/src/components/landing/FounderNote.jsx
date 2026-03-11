import React from 'react';
import { motion } from 'framer-motion';
import { LANDING_COPY } from '../../content/landingCopy';
import { fadeUpVariant } from './scrollChoreography';

export const FounderNote = () => {
  const { eyebrow, headline, body } = LANDING_COPY.founderNote;

  return (
    <section className="relative pt-8 pb-10 sm:pt-10 sm:pb-12" data-testid="founder-note-section">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="text-eyebrow text-support mb-3 block" data-testid="founder-eyebrow">{eyebrow}</span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-display mb-3" data-testid="founder-headline">{headline}</h2>
          <p className="text-base text-support mb-8 leading-relaxed" data-testid="founder-body">{body}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden bento-card"
          data-testid="founder-video-placeholder"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 50%, hsl(var(--brand-primary) / 0.05) 0%, transparent 70%)',
          }}
        >
          <div className="flex flex-col items-center justify-center py-16 sm:py-20">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="w-3 h-3 rounded-full bg-rose-500 mb-4"
              aria-hidden="true"
            />
            <span className="text-eyebrow text-support mb-1">Recording coming soon</span>
            <p className="text-xs text-muted">60 seconds from the founders on why we're building insig8</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
