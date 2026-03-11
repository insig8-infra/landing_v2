import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LANDING_COPY } from '../../content/landingCopy';

/* Scroll-driven word reveal: each word appears based on scroll progress */
const ScrollRevealQuote = ({ text }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'start 0.15'] });
  const words = text.split(' ');

  return (
    <div ref={ref} className="relative py-8" data-testid="reframe-pull-quote">
      <h2 className="font-heading text-2xl sm:text-3xl lg:text-[clamp(2rem,4vw,3.5rem)] font-bold leading-snug text-center max-w-4xl mx-auto">
        {words.map((word, i) => (
          <ScrollWord key={i} word={word} index={i} total={words.length} scrollYProgress={scrollYProgress} />
        ))}
      </h2>
    </div>
  );
};

const ScrollWord = ({ word, index, total, scrollYProgress }) => {
  const start = index / total;
  const end = Math.min((index + 1) / total + 0.05, 1);
  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
  /* Last 8 words get highlight treatment = "seen across your whole portfolio at once." */
  const isHighlight = index >= total - 8;

  return (
    <motion.span
      style={{ opacity }}
      className={`inline-block mr-[0.3em] ${isHighlight ? 'gradient-text-highlight' : 'text-display'}`}
    >
      {word}
    </motion.span>
  );
};

export const ReframeSection = () => {
  const { pullQuote, closer, closerHighlight } = LANDING_COPY.reframe;

  /* Split closer to highlight "pattern recognition layer" */
  const parts = closer.split(closerHighlight);

  return (
    <section
      className="relative py-12 sm:py-16"
      data-testid="reframe-section"
      style={{
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, hsl(263 80% 66% / 0.06) 0%, transparent 70%)',
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <ScrollRevealQuote text={pullQuote} />
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-base sm:text-lg text-support text-center mt-8 max-w-2xl mx-auto leading-relaxed"
          data-testid="reframe-closer"
        >
          {parts[0]}<span className="gradient-text-highlight font-semibold">{closerHighlight}</span>{parts[1]}
        </motion.p>
      </div>
    </section>
  );
};
