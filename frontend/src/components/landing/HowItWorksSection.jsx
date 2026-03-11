import React from 'react';
import { motion } from 'framer-motion';
import { LANDING_COPY } from '../../content/landingCopy';
import { fadeUpVariant } from './scrollChoreography';

const StepCard = ({ step, index }) => (
  <motion.div
    variants={fadeUpVariant}
    className="relative bento-card rounded-2xl p-6 sm:p-8 group h-full"
    data-testid={`how-step-${index}`}
  >
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: index * 0.15 }}
      className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-gradient-hero-focus text-xs font-bold text-white"
      data-testid={`how-step-num-${index}`}
    >
      {step.num}
    </motion.div>
    <div className={`mt-4 mb-4 w-10 h-10 rounded-xl bg-gradient-to-br ${step.gradient} border ${step.border} flex items-center justify-center`}>
      <step.icon size={20} className={step.iconColor} />
    </div>
    <h3 className="font-heading font-semibold text-lg text-heading mb-3">{step.title}</h3>
    <p className="text-sm text-support leading-relaxed">{step.body}</p>
  </motion.div>
);

/* SVG connector line that draws left→right on desktop */
const ConnectorLine = () => (
  <div className="hidden md:block absolute inset-0 pointer-events-none" style={{ top: '50%', transform: 'translateY(-50%)', height: '2px' }} aria-hidden="true">
    <svg width="100%" height="20" className="absolute top-0 left-0" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="lineGrad" x1="16%" y1="0" x2="84%" y2="0">
          <stop offset="0%" stopColor="hsl(var(--brand-primary))" stopOpacity="0.4" />
          <stop offset="100%" stopColor="hsl(var(--brand-tertiary))" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <motion.line
        x1="16.5%" y1="10" x2="83.5%" y2="10"
        stroke="url(#lineGrad)" strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.3 }}
      />
      {[16.5, 50, 83.5].map((cx, i) => (
        <motion.circle
          key={i}
          cx={`${cx}%`} cy="10" r="3"
          fill="hsl(var(--brand-primary))"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 + i * 0.2, type: 'spring', stiffness: 300, damping: 20 }}
        />
      ))}
    </svg>
  </div>
);

export const HowItWorksSection = () => {
  const { eyebrow, headline, steps } = LANDING_COPY.howItWorks;

  return (
    <section className="relative py-12 sm:py-20" data-testid="how-it-works-section" id="how-it-works">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12"
        >
          <span className="text-eyebrow text-brand-tertiary mb-3 block" data-testid="how-eyebrow">{eyebrow}</span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-display" data-testid="how-headline">{headline}</h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="relative"
        >
          <ConnectorLine />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {steps.map((step, i) => (
              <StepCard key={step.num} step={step} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
