import React from 'react';
import { Linkedin, Twitter } from 'lucide-react';

const InfinityMark = () => (
  <svg width="36" height="22" viewBox="0 0 64 36" fill="none" aria-hidden="true">
    <path d="M32 18C28 10 24 3 16 3C8 3 1 9 1 18C1 27 8 33 16 33C24 33 28 26 32 18Z" stroke="#00D4C8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M32 18C36 11 39 6 46 6C53 6 63 10 63 18C63 26 53 30 46 30C39 30 36 25 32 18Z" stroke="#00D4C8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Footer = () => (
  <footer className="footer" data-testid="footer">
    <div className="footer__inner">
      <div className="footer__grid">
        <div className="footer__brand">
          <div className="footer__logo">
            <InfinityMark />
            <span className="footer__logo-text">insig8</span>
          </div>
          <p className="footer__tagline">The post-sales intelligence layer.</p>
          <div className="footer__socials">
            <a href="#" className="footer__social" aria-label="LinkedIn" data-testid="footer-linkedin">
              <Linkedin size={14} />
            </a>
            <a href="#" className="footer__social" aria-label="X / Twitter" data-testid="footer-twitter">
              <Twitter size={14} />
            </a>
          </div>
        </div>

        <div>
          <p className="footer__col-heading">Product</p>
          <ul className="footer__col-links">
            {['Features', 'Pricing', 'Changelog', 'Roadmap'].map(link => (
              <li key={link}><a href="#" className="footer__col-link" data-testid={`footer-link-${link.toLowerCase()}`}>{link}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <p className="footer__col-heading">Company</p>
          <ul className="footer__col-links">
            {['About', 'Blog', 'Contact'].map(link => (
              <li key={link}><a href="#" className="footer__col-link" data-testid={`footer-link-${link.toLowerCase()}`}>{link}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <p className="footer__col-heading">Legal</p>
          <ul className="footer__col-links">
            {['Privacy Policy', 'Terms of Service', 'Security'].map(link => (
              <li key={link}>
                <a href="#" className="footer__col-link" data-testid={`footer-link-${link.toLowerCase().replace(/\s/g,'-')}`}>{link}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <span className="footer__copyright" data-testid="footer-copyright">
          © 2026 insig8. All rights reserved.
        </span>
        <span className="footer__bottom-copy" data-testid="footer-tagline-bottom">
          Built for the CS team doing it properly, without the stack.
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
