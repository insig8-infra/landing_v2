import React from 'react';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import { LANDING_COPY, INTEGRATION_TOOLS } from '../../content/landingCopy';
import { fadeUpVariant } from './scrollChoreography';

const ToolChip = ({ tool }) => (
  <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/5 mx-2 whitespace-nowrap">
    <tool.icon size={16} style={{ color: tool.color }} />
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
      className="relative py-20 sm:py-28 overflow-hidden"
      data-testid="integrations-flow-bridge"
      id="integrations"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-12">
        <motion.p
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-eyebrow text-brand-primary mb-4"
          data-testid="integrations-eyebrow"
        >
          {eyebrow}
        </motion.p>
        <motion.h2
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-display-section mb-4"
          data-testid="integrations-headline"
        >
          {headline}
        </motion.h2>
        <motion.p
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-body-md text-support max-w-xl mx-auto"
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
          {INTEGRATION_TOOLS.map((tool) => (
            <ToolChip key={tool.name} tool={tool} />
          ))}
        </Marquee>
        <div className="mt-3">
          <Marquee speed={25} gradient={true} gradientColor="#020617" gradientWidth={80} direction="right" pauseOnHover>
            {[...INTEGRATION_TOOLS].reverse().map((tool) => (
              <ToolChip key={`rev-${tool.name}`} tool={tool} />
            ))}
          </Marquee>
        </div>
      </motion.div>
    </section>
  );
};
