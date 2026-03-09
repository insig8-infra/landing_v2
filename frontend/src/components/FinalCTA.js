import React from 'react';
import { SignalGraph } from './Hero';

const FinalCTA = () => (
  <section className="final-cta" data-testid="final-cta-section">
    <div className="final-cta__graph">
      <SignalGraph dense />
    </div>

    <div className="final-cta__inner">
      <h2 className="final-cta__headline" data-testid="final-cta-headline">
        Your portfolio is already<br />
        telling a story.
      </h2>
      <h2 className="final-cta__headline final-cta__headline--teal" data-testid="final-cta-headline-teal">
        Start reading it.
      </h2>

      <p className="final-cta__subheading" data-testid="final-cta-subheading">
        Connect your inbox and see your first client health insights today.
        No CRM. No setup. No configuration required.
      </p>

      <button className="btn-cta-large" data-testid="final-cta-btn">
        Start free — 14 days, no card required
        <span className="btn-arrow" aria-hidden="true">→</span>
      </button>

      <p className="final-cta__microcopy" data-testid="final-cta-microcopy">
        Joins the inbox and calendar you already use.<br />
        Doesn't replace anything. Cancel any time.
      </p>
    </div>
  </section>
);

export default FinalCTA;
