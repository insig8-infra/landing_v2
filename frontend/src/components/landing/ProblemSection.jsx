import React from 'react';
import { motion } from 'framer-motion';
import { LANDING_COPY } from '../../content/landingCopy';
import { fadeUpVariant, staggerContainer } from './scrollChoreography';

export const ProblemSection = () => {
  const { eyebrow, headline, subheadline, cards } = LANDING_COPY.problem;

  return (
    <section className="relative py-12 sm:py-20" data-testid="problem-section" id="problem">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12"
        >
          <span className="text-eyebrow text-amber-400 mb-3 block" data-testid="problem-eyebrow">{eyebrow}</span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-display mb-4" data-testid="problem-headline">{headline}</h2>
          <p className="text-lg sm:text-xl text-support max-w-2xl mx-auto leading-relaxed font-medium" data-testid="problem-subheadline">{subheadline}</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {cards.map((card, i) => (
            <motion.div
              key={i}
              variants={fadeUpVariant}
              className="bento-card rounded-2xl p-6 sm:p-8 group"
              data-testid={`problem-card-${i}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-2xl ${card.color}`}>{card.icon}</span>
                <h3 className="font-heading font-semibold text-lg text-heading">{card.title}</h3>
              </div>
              <p className="text-sm text-support mb-5 leading-relaxed">{card.body}</p>
              <div className="flex flex-wrap gap-1.5">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-full border border-white/5 bg-white/[0.02] text-muted font-mono"
                    data-testid={`problem-tag-${tag}`}
                  >
                    [{tag}]
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
