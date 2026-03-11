import React from 'react';
import { motion } from 'framer-motion';
import { LANDING_COPY } from '../../content/landingCopy';
import { fadeUpVariant } from './scrollChoreography';

const ReframeQuote = ({ text }) => {
  const words = text.split(' ');
  return (
    <blockquote className="relative text-xl sm:text-2xl font-heading font-semibold text-display leading-snug max-w-3xl mx-auto text-center">
      <span className="absolute -left-4 -top-4 text-6xl text-brand-primary/20 font-serif" aria-hidden="true">"</span>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: i * 0.03, duration: 0.3 }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </blockquote>
  );
};

export const ReframeSection = () => {
  const { lead, body, pullQuote, closer } = LANDING_COPY.reframe;

  return (
    <section className="relative py-24 sm:py-32" data-testid="reframe-section">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.p
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-body-lg text-display font-semibold text-center mb-10"
          data-testid="reframe-lead"
        >
          {lead}
        </motion.p>

        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-4 text-body-md text-support mb-16 text-center"
          data-testid="reframe-body"
        >
          {body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </motion.div>

        <div className="py-12 border-y border-white/5 mb-16" data-testid="reframe-pull-quote">
          <ReframeQuote text={pullQuote} />
        </div>

        <motion.p
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-body-md text-support text-center"
          data-testid="reframe-closer"
        >
          {closer}
        </motion.p>
      </div>
    </section>
  );
};
