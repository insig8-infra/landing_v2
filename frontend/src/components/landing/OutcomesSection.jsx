import React from 'react';
import { motion } from 'framer-motion';
import { LANDING_COPY } from '../../content/landingCopy';
import { fadeUpVariant } from './scrollChoreography';

/* Mini SVG bar chart for the featured "Health Scores" card */
const HealthBarChart = () => {
  const bars = [
    { label: 'A', h: 70, color: '#34d399' },
    { label: 'B', h: 45, color: '#fbbf24' },
    { label: 'C', h: 82, color: '#34d399' },
    { label: 'D', h: 28, color: '#f87171' },
    { label: 'E', h: 60, color: '#fbbf24' },
  ];
  return (
    <div className="mt-4 flex items-end justify-center gap-3 h-[100px]" data-testid="health-bar-chart">
      {bars.map((bar, i) => (
        <div key={bar.label} className="flex flex-col items-center gap-1">
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: bar.h }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-6 rounded-t-sm"
            style={{ backgroundColor: bar.color, opacity: 0.7 }}
          />
          <span className="text-[9px] text-muted font-mono">{bar.label}</span>
        </div>
      ))}
    </div>
  );
};

/* Scan line sweep on card entry */
const ScanLine = () => (
  <motion.div
    initial={{ left: '0%', opacity: 0.08 }}
    whileInView={{ left: '100%', opacity: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: 0.2 }}
    className="absolute top-0 bottom-0 w-[2px] bg-white pointer-events-none z-10"
    aria-hidden="true"
  />
);

const OutcomeCard = ({ card, index }) => {
  const isFeatured = card.featured;

  return (
    <motion.div
      variants={fadeUpVariant}
      className={`relative bento-card rounded-2xl p-6 group hover-lift overflow-hidden ${isFeatured ? 'lg:col-span-2' : ''}`}
      data-testid={`outcome-card-${index}`}
    >
      <ScanLine />
      <div className="mb-3 w-9 h-9 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center">
        <card.icon size={18} className={card.color} />
      </div>
      <h3 className="font-heading font-semibold text-base text-heading mb-2">{card.title}</h3>
      <p className="text-sm text-support leading-relaxed mb-4">{card.body}</p>
      <div className="flex flex-wrap gap-1.5">
        {card.tags.map((tag, ti) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + ti * 0.06, duration: 0.3 }}
            className="text-[10px] px-2 py-0.5 rounded-full border border-white/5 bg-white/[0.02] text-muted font-mono"
            data-testid={`outcome-tag-${tag}`}
          >
            [{tag}]
          </motion.span>
        ))}
      </div>
      {isFeatured && <HealthBarChart />}
    </motion.div>
  );
};

export const OutcomesSection = () => {
  const { eyebrow, headline, cards } = LANDING_COPY.outcomes;

  return (
    <section className="relative py-12 sm:py-20" data-testid="outcomes-section" id="features">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12"
        >
          <span className="text-eyebrow text-amber-400 mb-3 block" data-testid="outcomes-eyebrow">{eyebrow}</span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-display" data-testid="outcomes-headline">{headline}</h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
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
