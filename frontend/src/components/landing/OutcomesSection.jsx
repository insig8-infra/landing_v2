import React from 'react';
import { motion } from 'framer-motion';
import { LANDING_COPY } from '../../content/landingCopy';
import { fadeUpVariant, staggerContainer } from './scrollChoreography';

const OutcomeCard = ({ card, index }) => (
  <motion.div
    variants={fadeUpVariant}
    className="bento-card rounded-2xl p-6 group hover-lift"
    data-testid={`outcome-card-${index}`}
  >
    <div className="mb-3 w-9 h-9 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center">
      <card.icon size={18} className={card.color} />
    </div>
    <h3 className="font-heading font-semibold text-base text-heading mb-2">{card.title}</h3>
    <p className="text-body-sm text-support leading-relaxed mb-4">{card.body}</p>
    <div className="flex flex-wrap gap-1.5">
      {card.tags.map((tag) => (
        <span
          key={tag}
          className="text-[10px] px-2 py-0.5 rounded-full border border-white/5 bg-white/[0.02] text-muted font-mono"
          data-testid={`outcome-tag-${tag}`}
        >
          [{tag}]
        </span>
      ))}
    </div>
  </motion.div>
);

export const OutcomesSection = () => {
  const { eyebrow, headline, cards } = LANDING_COPY.outcomes;

  return (
    <section className="relative py-24 sm:py-32" data-testid="outcomes-section" id="features">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <span className="text-eyebrow text-amber-400 mb-4 block" data-testid="outcomes-eyebrow">{eyebrow}</span>
          <h2 className="text-display-section" data-testid="outcomes-headline" id="features-headline">{headline}</h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {cards.map((card, i) => (
            <OutcomeCard key={i} card={card} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
