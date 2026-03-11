import React from 'react';
import { motion } from 'framer-motion';
import { LANDING_COPY, floatingBadges } from '../../content/landingCopy';
import { fadeUpVariant } from './scrollChoreography';

/* Directional entry: left, bottom, right */
const cardVariants = [
  { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } },
  { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 } } },
  { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 } } },
];

const ProblemCard = ({ card, index }) => (
  <motion.div
    variants={cardVariants[index]}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.15 }}
    className="bento-card rounded-2xl p-6 sm:p-8 group"
    data-testid={`problem-card-${index}`}
  >
    <div className="flex items-center gap-3 mb-4">
      <span className={`text-2xl ${card.color}`}>{card.icon}</span>
      <h3 className="font-heading font-semibold text-lg text-heading">{card.title}</h3>
    </div>
    <p className="text-sm text-support mb-5 leading-relaxed">{card.body}</p>
    <div className="flex flex-wrap gap-1.5">
      {card.tags.map((tag, ti) => (
        <motion.span
          key={tag}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + ti * 0.06, duration: 0.3 }}
          className="text-[10px] px-2 py-0.5 rounded-full border border-white/5 bg-white/[0.02] text-muted font-mono"
          data-testid={`problem-tag-${tag}`}
        >
          [{tag}]
        </motion.span>
      ))}
    </div>
  </motion.div>
);

/* Muted signal stream marquee between header and cards */
const SignalStream = () => (
  <div className="overflow-hidden opacity-25 mb-10 pointer-events-none" aria-hidden="true" data-testid="problem-signal-stream">
    <div className="flex gap-3 animate-marquee whitespace-nowrap">
      {[...floatingBadges, ...floatingBadges].map((b, i) => (
        <span key={i} className="glass px-3 py-1 rounded-full text-xs font-mono flex items-center gap-1.5 flex-shrink-0">
          <b.icon size={11} className={b.color} />
          {b.label}
        </span>
      ))}
    </div>
  </div>
);

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
          className="text-center mb-10"
        >
          <span className="text-eyebrow text-amber-400 mb-3 block" data-testid="problem-eyebrow">{eyebrow}</span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-display mb-4" data-testid="problem-headline">{headline}</h2>
          <p className="text-lg sm:text-xl text-support max-w-2xl mx-auto leading-relaxed font-medium" data-testid="problem-subheadline">{subheadline}</p>
        </motion.div>

        <SignalStream />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <ProblemCard key={i} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
