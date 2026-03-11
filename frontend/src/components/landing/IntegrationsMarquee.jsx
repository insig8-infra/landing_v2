import React from 'react';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import { LANDING_COPY, INTEGRATION_TOOLS } from '../../content/landingCopy';
import { fadeUpVariant } from './scrollChoreography';

const ToolChip = ({ tool }) => (
  <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full glass border border-white/5 mx-2 whitespace-nowrap hover:border-white/10 transition-colors">
    <tool.icon size={18} style={{ color: tool.color }} />
    <span className="text-sm text-support font-medium">{tool.name}</span>
    {tool.comingSoon && (
      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/5 text-muted font-medium">soon</span>
    )}
  </div>
);

export const IntegrationsMarquee = () => {
  const { eyebrow, headline, body } = LANDING_COPY.integrations;

  return (
    <section
      className="relative py-12 sm:py-16 overflow-hidden"
      data-testid="integrations-flow-bridge"
      id="integrations"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-10">
        <motion.p
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-eyebrow text-brand-primary mb-3"
          data-testid="integrations-eyebrow"
        >
          {eyebrow}
        </motion.p>
        <motion.h2
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-display mb-3"
          data-testid="integrations-headline"
        >
          {headline}
        </motion.h2>
        <motion.p
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-base text-support max-w-xl mx-auto leading-relaxed"
          data-testid="integrations-body"
        >
          {body}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Marquee speed={30} gradient={true} gradientColor="#020617" gradientWidth={80} pauseOnHover>
          {[...INTEGRATION_TOOLS, ...INTEGRATION_TOOLS].map((tool, i) => (
            <ToolChip key={`${tool.name}-${i}`} tool={tool} />
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
};
