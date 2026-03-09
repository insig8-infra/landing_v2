import React, { useEffect, useRef, useState } from 'react';

const QUOTE = `Client relationships don't fail in a single email. They fail in patterns — and patterns need to be seen across your whole portfolio at once.`;

const PullQuote = ({ isVisible }) => {
  const words = QUOTE.split(' ');
  return (
    <blockquote className="reframe__pull-quote" data-testid="pull-quote">
      {words.map((word, i) => (
        <span
          key={i}
          className={`pull-word${isVisible ? ' pull-word--visible' : ''}`}
          style={isVisible ? { animationDelay: `${i * 45}ms` } : {}}
        >
          {word}{' '}
        </span>
      ))}
    </blockquote>
  );
};

const Reframe = () => {
  const quoteRef = useRef(null);
  const [quoteVisible, setQuoteVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setQuoteVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    const el = quoteRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return (
    <section className="reframe" data-testid="reframe-section">
      <div className="reframe__inner">
        <p className="reframe__p1" data-testid="reframe-p1">
          This isn't a focus problem. It isn't an attention problem.
        </p>

        <div className="reframe__body" data-testid="reframe-body">
          <p>
            You read every email. You know your accounts. The problem is that you're managing
            40 relationships simultaneously — and client relationships don't degrade in a single moment.
            They shift across dozens of interactions over months. A tone here. A response time there.
            An executive who quietly stopped showing up.
          </p>
          <br />
          <p>
            No individual signal is alarming. Together, they tell the whole story. But tracking
            40 of those stories simultaneously — noticing which one has been quietly cooling for
            six weeks, correlating a tone shift with an absent stakeholder with a slower meeting cadence
            — that is not a human-scale problem. That is a pattern recognition at scale problem.
          </p>
        </div>

        <div ref={quoteRef}>
          <PullQuote isVisible={quoteVisible} />
        </div>

        <p className="reframe__p3" data-testid="reframe-p3">
          insig8 is the pattern recognition layer. The part of your CS operation that holds all
          40 relationships in view simultaneously — and tells you which one needs your attention
          today, and why, and when.
        </p>
      </div>
    </section>
  );
};

export default Reframe;
