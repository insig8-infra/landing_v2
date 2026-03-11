import React from 'react';
import { motion } from 'framer-motion';
import { LANDING_COPY } from '../../content/landingCopy';
import { fadeUpVariant, staggerContainer } from './scrollChoreography';

const StepCard = ({ step, index }) => (
  <motion.div
    variants={fadeUpVariant}
    className="relative bento-card rounded-2xl p-6 sm:p-8 group h-full"
    data-testid={`how-step-${index}`}
  >
    <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-gradient-hero-focus text-xs font-bold text-white">
      {step.num}
    </div>
    <div className="mt-4 mb-4 w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-brand-primary">
      <step.icon size={20} />
    </div>
    <h3 className="font-heading font-semibold text-lg text-heading mb-3">{step.title}</h3>
    <p className="text-sm text-support leading-relaxed">{step.body}</p>
  </motion.div>
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
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {steps.map((step, i) => (
            <StepCard key={step.num} step={step} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
