import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { LANDING_COPY } from '../../content/landingCopy';
import { fadeUpVariant } from './scrollChoreography';

const FAQItem = ({ item, isOpen, onToggle }) => (
  <div
    className="border-b border-white/5"
    data-testid={`faq-item-${item.q.slice(0, 20).replace(/\s/g, '-').toLowerCase()}`}
  >
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-5 text-left group"
      aria-expanded={isOpen}
    >
      <span className="font-heading font-semibold text-base sm:text-lg text-heading pr-4 group-hover:text-brand-primary transition-colors">
        {item.q}
      </span>
      <ChevronDown
        size={18}
        className={`text-muted flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <p className="text-sm text-support pb-5 leading-relaxed">{item.a}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export const FAQSection = () => {
  const { eyebrow, headline, items } = LANDING_COPY.faq;
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative py-12 sm:py-16" data-testid="faq-section" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-10"
        >
          <span className="text-eyebrow text-brand-primary mb-3 block" data-testid="faq-eyebrow">{eyebrow}</span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-display" data-testid="faq-headline">{headline}</h2>
        </motion.div>

        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {items.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
