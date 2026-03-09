import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

/*
  LogoMark: Two vertically-stacked ellipses.
  Upper (narrow) = individual account view.
  Lower (wider)  = portfolio view.
  Nexus dot      = the moment of insight where the two levels intersect.
*/
const LogoMark = () => (
  <svg width="20" height="32" viewBox="0 0 26 40" fill="none" aria-hidden="true">
    <ellipse cx="13" cy="11" rx="10" ry="9"
      stroke="#00D4C8" strokeWidth="2" fill="rgba(0,212,200,0.05)"
    />
    <ellipse cx="13" cy="29" rx="12" ry="9"
      stroke="#00D4C8" strokeWidth="2" fill="rgba(0,212,200,0.03)"
    />
    <circle cx="13" cy="20" r="5" fill="#00D4C8" className="logo-nexus-glow"/>
    <circle cx="13" cy="20" r="2.5" fill="#00D4C8"/>
  </svg>
);

const Navigation = () => {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`nav hero-load-logo${scrolled ? ' nav--scrolled' : ''}`}
        data-testid="navigation"
        role="navigation"
        aria-label="Main navigation"
      >
        <a href="#" className="nav__logo" data-testid="nav-logo" aria-label="insig8 home">
          <LogoMark />
          <span className="nav__logo-text">insig8</span>
        </a>

        <ul className="nav__links hero-load-navitems" role="list">
          <li><a href="#" className="nav__link" data-testid="nav-product">Product</a></li>
          <li><a href="#" className="nav__link" data-testid="nav-pricing">Pricing</a></li>
        </ul>

        <div className="nav__actions hero-load-navitems">
          <button className="btn-ghost" data-testid="nav-signin">Sign in</button>
          <button className="btn-primary" data-testid="nav-early-access">
            Get early access <span className="btn-arrow" aria-hidden="true">→</span>
          </button>
        </div>

        <button
          className="nav__hamburger"
          onClick={() => setMobileOpen(true)}
          data-testid="nav-hamburger"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
        >
          <Menu size={22} color="var(--text-primary)" />
        </button>
      </nav>

      {mobileOpen && (
        <div className="nav__mobile-overlay" data-testid="nav-mobile-overlay" role="dialog" aria-modal="true">
          <button
            className="nav__mobile-close"
            onClick={() => setMobileOpen(false)}
            data-testid="nav-mobile-close"
            aria-label="Close menu"
          >
            <X size={22} color="var(--text-muted)" />
          </button>
          <a href="#" className="nav__mobile-link" onClick={() => setMobileOpen(false)} data-testid="nav-mobile-product">Product</a>
          <a href="#" className="nav__mobile-link" onClick={() => setMobileOpen(false)} data-testid="nav-mobile-pricing" style={{ animationDelay: '0.05s' }}>Pricing</a>
          <a href="#" className="nav__mobile-link" onClick={() => setMobileOpen(false)} data-testid="nav-mobile-signin" style={{ animationDelay: '0.10s' }}>Sign in</a>
          <button
            className="btn-primary"
            style={{ fontSize: '1.125rem', padding: '14px 32px', marginTop: '1rem', height: 'auto' }}
            data-testid="nav-mobile-cta"
          >
            Get early access →
          </button>
        </div>
      )}
    </>
  );
};

export default Navigation;
