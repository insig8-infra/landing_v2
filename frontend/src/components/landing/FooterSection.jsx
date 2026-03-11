import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter } from 'lucide-react';
import { LANDING_COPY } from '../../content/landingCopy';
import { fadeUpVariant } from './scrollChoreography';

const LogoMark = () => (
  <svg width="16" height="26" viewBox="0 0 26 40" fill="none" aria-hidden="true">
    <ellipse cx="13" cy="11" rx="10" ry="9" stroke="hsl(var(--brand-primary))" strokeWidth="2" fill="rgba(59,130,246,0.05)" />
    <ellipse cx="13" cy="29" rx="12" ry="9" stroke="hsl(var(--brand-primary))" strokeWidth="2" fill="rgba(59,130,246,0.03)" />
    <circle cx="13" cy="20" r="4" fill="hsl(var(--brand-primary))" opacity="0.18" />
    <circle cx="13" cy="20" r="2.5" fill="hsl(var(--brand-primary))" />
  </svg>
);

export const FooterSection = () => {
  const { tagline, bottomLine, columns } = LANDING_COPY.footer;

  return (
    <footer className="relative border-t border-white/5 pt-16 pb-8" data-testid="footer">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12"
        >
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <LogoMark />
              <span className="font-heading font-bold text-lg text-display">insig8</span>
            </div>
            <p className="text-sm text-support mb-4">{tagline}</p>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-muted hover:text-display transition-colors" aria-label="LinkedIn" data-testid="footer-linkedin">
                <Linkedin size={14} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-muted hover:text-display transition-colors" aria-label="X / Twitter" data-testid="footer-twitter">
                <Twitter size={14} />
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-display uppercase tracking-wider mb-3">Product</p>
            <ul className="space-y-2">
              {columns.product.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-support hover:text-display transition-colors" data-testid={`footer-link-${link.toLowerCase()}`}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-display uppercase tracking-wider mb-3">Company</p>
            <ul className="space-y-2">
              {columns.company.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-support hover:text-display transition-colors" data-testid={`footer-link-${link.toLowerCase()}`}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-display uppercase tracking-wider mb-3">Legal</p>
            <ul className="space-y-2">
              {columns.legal.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-support hover:text-display transition-colors" data-testid={`footer-link-${link.toLowerCase().replace(/\s+/g, '-')}`}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-white/5 gap-2">
          <span className="text-xs text-muted" data-testid="footer-copyright">
            &copy; {new Date().getFullYear()} insig8. All rights reserved.
          </span>
          <span className="text-xs text-muted" data-testid="footer-tagline-bottom">
            {bottomLine}
          </span>
        </div>
      </div>
    </footer>
  );
};
