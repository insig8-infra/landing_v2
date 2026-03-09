import React, { useEffect, useRef, useState } from 'react';

const outcomeCards = [
  {
    icon: <span style={{ color: 'var(--accent-amber)', fontSize: '1.1rem' }}>↘</span>,
    title: 'Know when a relationship is cooling',
    body: 'Slower replies, shorter emails, a rescheduled meeting. insig8 shows you the trajectory — not just the current health score.',
    tags: ['sentiment_trajectory', 'response_decay'],
  },
  {
    icon: <span style={{ color: 'var(--accent-green)', fontSize: '1.1rem' }}>↗</span>,
    title: 'Catch the right moment to expand',
    body: 'Faster replies, more questions, senior stakeholders rejoining calls. insig8 shows you which accounts are primed for the next conversation — before you need to ask.',
    tags: ['expansion_signal', 'exec_re-engagement'],
  },
  {
    icon: <span style={{ color: 'var(--accent-teal)', fontSize: '1.1rem' }}>◎</span>,
    title: 'Never lose context when someone leaves',
    body: 'Full relationship history preserved in insig8. When a CSM leaves or a new hire joins, onboarding takes hours — not months. Nothing walks out the door.',
    tags: ['context_preserved', 'handoff_ready'],
  },
  {
    icon: <span style={{ color: 'var(--accent-amber)', fontSize: '1.1rem' }}>◷</span>,
    title: 'Track every commitment you\'ve made',
    body: 'insig8 pulls commitments from your meeting notes and flags what hasn\'t been followed up. The things you promised that quietly slipped.',
    tags: ['commitment_extracted', 'fulfillment_tracked'],
  },
  {
    icon: <span style={{ color: 'var(--accent-teal)', fontSize: '1.1rem' }}>◈</span>,
    title: 'Health scores built from real signals',
    body: 'Not a manual RAG status. A live score built from communication frequency, sentiment, engagement depth, and renewal proximity. Ground-up, honest, automatic.',
    tags: ['health_score', 'signal_based'],
  },
  {
    icon: <span style={{ color: 'var(--accent-green)', fontSize: '1.1rem' }}>★</span>,
    title: 'Capture success stories before they disappear',
    body: 'A client says something genuinely great — insig8 captures it before it disappears into a sent folder. QBR material. Case study material. Collected automatically.',
    tags: ['success_captured', 'value_documented'],
  },
];

const OutcomeCard = ({ card, index }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return (
    <div
      ref={ref}
      className={`outcome-card${visible ? ' anim-in' : ''}`}
      data-testid={`outcome-card-${index + 1}`}
    >
      <div className="outcome-card__icon">{card.icon}</div>
      <h3 className="outcome-card__title">{card.title}</h3>
      <p className="outcome-card__body">{card.body}</p>
      <div className="data-tags">
        {card.tags.map(tag => (
          <span key={tag} className="data-tag" data-testid={`data-tag-${tag}`}>[{tag}]</span>
        ))}
      </div>
    </div>
  );
};

const Outcomes = () => (
  <section className="outcomes" data-testid="outcomes-section">
    <div className="outcomes__inner">
      <span className="section-eyebrow section-eyebrow--amber" data-testid="outcomes-eyebrow">
        What You'll Know
      </span>
      <h2 className="section-headline" data-testid="outcomes-headline">
        What you'll know that you don't know now.
      </h2>

      <div className="outcomes__grid">
        {outcomeCards.map((card, i) => <OutcomeCard key={i} card={card} index={i} />)}
      </div>
    </div>
  </section>
);

export default Outcomes;
