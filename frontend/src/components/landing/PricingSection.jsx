import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { LANDING_COPY } from '../../content/landingCopy';
import { fadeUpVariant, staggerContainer } from './scrollChoreography';

const PricingCard = ({ plan, onCTA }) => (
  <motion.div
    variants={fadeUpVariant}
    className={`relative bento-card rounded-2xl p-6 sm:p-8 flex flex-col ${
      plan.highlighted ? 'border-brand-primary/30 ring-1 ring-brand-primary/20' : ''
    }`}
    data-testid={`pricing-card-${plan.name.toLowerCase()}`}
  >
    {plan.highlighted && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-hero-focus text-xs font-bold text-white">
        Most Popular
      </div>
    )}
    <div className="mb-6">
      <h3 className="font-heading font-semibold text-lg text-heading mb-1">{plan.name}</h3>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl sm:text-4xl font-heading font-bold text-display">{plan.price}</span>
        {plan.period && <span className="text-sm text-muted">{plan.period}</span>}
      </div>
      <p className="text-body-sm text-support mt-2">{plan.description}</p>
    </div>
    <ul className="space-y-3 mb-8 flex-1">
      {plan.features.map((feature) => (
        <li key={feature} className="flex items-start gap-2 text-sm text-support">
          <Check size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <button
      onClick={onCTA}
      className={`w-full py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
        plan.highlighted
          ? 'bg-gradient-hero-focus text-white hover:opacity-90'
          : 'border border-white/10 text-display hover:bg-white/5'
      }`}
      data-testid={`pricing-cta-${plan.name.toLowerCase()}`}
    >
      {plan.cta}
    </button>
  </motion.div>
);

export const PricingSection = ({ onOpenEarlyAccess }) => {
  const { eyebrow, headline, plans } = LANDING_COPY.pricing;

  return (
    <section className="relative py-24 sm:py-32" data-testid="pricing-section" id="pricing">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <span className="text-eyebrow text-brand-primary mb-4 block" data-testid="pricing-eyebrow">{eyebrow}</span>
          <h2 className="text-display-section" data-testid="pricing-headline">{headline}</h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} onCTA={onOpenEarlyAccess} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
