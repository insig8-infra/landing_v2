import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { LANDING_COPY } from '../../content/landingCopy';
import { fadeUpVariant } from './scrollChoreography';

const POSTER = 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=640&q=60&auto=format&fit=crop';

export const FounderNote = () => {
  const { eyebrow, headline, body } = LANDING_COPY.founderNote;

  return (
    <section className="relative pt-8 pb-10 sm:pt-10 sm:pb-12" data-testid="founder-note-section">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="text-eyebrow text-support mb-3 block" data-testid="founder-eyebrow">{eyebrow}</span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-display mb-3" data-testid="founder-headline">{headline}</h2>
          <p className="text-base text-support mb-8 leading-relaxed" data-testid="founder-body">{body}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden group cursor-pointer bento-card"
          data-testid="founder-video-placeholder"
        >
          <img
            src={POSTER}
            alt="Founder video poster"
            className="w-full h-56 sm:h-72 object-cover opacity-60 group-hover:opacity-70 transition-opacity"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play size={24} className="text-white ml-1" fill="currentColor" />
            </div>
          </div>
          <p className="absolute bottom-3 left-0 right-0 text-[10px] text-muted text-center" data-testid="founder-caption">
            // Loom embed — replace with your recording
          </p>
        </motion.div>
      </div>
    </section>
  );
};
