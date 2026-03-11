import React from 'react';
import { motion } from 'framer-motion';
import { LANDING_COPY } from '../../content/landingCopy';
import { fadeUpVariant, staggerContainer } from './scrollChoreography';

const StepCard = ({ step, index }) => (
  <motion.div
    variants={fadeUpVariant}
    className="relative bento-card rounded-2xl p-6 sm:p-8 group"
    data-testid={`how-step-${index}`}
  >
    <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-gradient-hero-focus text-xs font-bold text-white">
      {step.num}
    </div>
    <div className="mt-4 mb-4 w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-brand-primary">
      <step.icon size={20} />
    </div>
    <h3 className="font-heading font-semibold text-lg text-heading mb-2">{step.title}</h3>
    <p className="text-body-sm text-support leading-relaxed">{step.body}</p>
  </motion.div>
);

const ConnectorLine = () => (
  <div className="hidden md:flex items-center justify-center" aria-hidden="true">
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-12 h-px bg-gradient-to-r from-brand-primary/40 to-brand-secondary/40 origin-left"
    />
  </div>
);

export const HowItWorksSection = () => {
  const { eyebrow, headline, steps } = LANDING_COPY.howItWorks;

  return (
    <section className="relative py-24 sm:py-32" data-testid="how-it-works-section" id="how-it-works">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <span className="text-eyebrow text-brand-tertiary mb-4 block" data-testid="how-eyebrow">{eyebrow}</span>
          <h2 className="text-display-section" data-testid="how-headline">{headline}</h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-5 gap-4 items-stretch"
        >
          {steps.map((step, i) => (
            <React.Fragment key={step.num}>
              <div className="md:col-span-1">
                <StepCard step={step} index={i} />
              </div>
              {i < steps.length - 1 && <ConnectorLine />}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
