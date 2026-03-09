import React from 'react';
import { Linkedin, Twitter } from 'lucide-react';

const LogoMark = () => (
  <svg width="16" height="26" viewBox="0 0 26 40" fill="none" aria-hidden="true">
    <ellipse cx="13" cy="11" rx="10" ry="9"
      stroke="#00D4C8" strokeWidth="2" fill="rgba(0,212,200,0.05)"
    />
    <ellipse cx="13" cy="29" rx="12" ry="9"
      stroke="#00D4C8" strokeWidth="2" fill="rgba(0,212,200,0.03)"
    />
    <circle cx="13" cy="20" r="4" fill="#00D4C8" opacity="0.18"/>
    <circle cx="13" cy="20" r="2.5" fill="#00D4C8"/>
  </svg>
);

const Footer = () => (
  <footer className="footer" data-testid="footer">
    <div className="footer__inner">
      <div className="footer__grid">
        <div className="footer__brand">
          <div className="footer__logo">
            <LogoMark />
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
