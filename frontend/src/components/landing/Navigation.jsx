import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { LANDING_COPY } from '../../content/landingCopy';

const LogoMark = () => (
  <svg width="20" height="32" viewBox="0 0 26 40" fill="none" aria-hidden="true">
    <ellipse cx="13" cy="11" rx="10" ry="9" stroke="hsl(var(--brand-primary))" strokeWidth="2" fill="rgba(59,130,246,0.05)" />
    <ellipse cx="13" cy="29" rx="12" ry="9" stroke="hsl(var(--brand-primary))" strokeWidth="2" fill="rgba(59,130,246,0.03)" />
    <circle cx="13" cy="20" r="5" fill="hsl(var(--brand-primary))" className="animate-pulse-glow" style={{ opacity: 0.18 }} />
    <circle cx="13" cy="20" r="2.5" fill="hsl(var(--brand-primary))" />
  </svg>
);

export const Navigation = ({ onOpenEarlyAccess }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { links, cta, signIn } = LANDING_COPY.nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleCTA = useCallback(() => {
    setMobileOpen(false);
    onOpenEarlyAccess?.();
  }, [onOpenEarlyAccess]);

  const scrollTo = useCallback((label) => {
    setMobileOpen(false);
    const id = label.toLowerCase().replace(/\s+/g, '-');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass shadow-lg shadow-black/20' : 'bg-transparent'
        }`}
        data-testid="navigation"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group" data-testid="nav-logo" aria-label="insig8 home">
            <LogoMark />
            <span className="font-heading font-bold text-lg text-display tracking-tight">insig8</span>
          </a>

          <ul className="hidden md:flex items-center gap-8" role="list">
            {links.map((label) => (
              <li key={label}>
                <button
                  onClick={() => scrollTo(label)}
                  className="text-sm text-support hover:text-display transition-colors duration-200"
                  data-testid={`nav-${label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <button className="text-sm text-support hover:text-display transition-colors px-3 py-1.5" data-testid="nav-signin">
              {signIn}
            </button>
            <button
              onClick={handleCTA}
              className="text-sm font-semibold px-5 py-2 rounded-full bg-gradient-hero-focus text-white hover:opacity-90 transition-opacity btn-hover-lift"
              data-testid="nav-early-access"
            >
              {cta} <span aria-hidden="true">→</span>
            </button>
          </div>

          <button
            className="md:hidden p-2 text-support hover:text-display"
            onClick={() => setMobileOpen(true)}
            data-testid="nav-hamburger"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-surface-base/95 backdrop-blur-lg flex flex-col items-center justify-center gap-6"
            data-testid="nav-mobile-overlay"
          >
            <button
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-display"
              onClick={() => setMobileOpen(false)}
              data-testid="nav-mobile-close"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
            {links.map((label, i) => (
              <motion.button
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(label)}
                className="text-xl font-heading font-semibold text-display hover:text-brand-primary transition-colors"
                data-testid={`nav-mobile-${label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.05 }}
              onClick={handleCTA}
              className="mt-4 px-8 py-3 rounded-full bg-gradient-hero-focus text-white font-semibold text-lg"
              data-testid="nav-mobile-cta"
            >
              {cta} →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
