import React, { useEffect, useRef, useState } from 'react';

const cards = [
  {
    icon: '⚠',
    iconStyle: { color: 'var(--accent-amber)' },
    title: 'The account that seemed fine.',
    body: 'Engaged in meetings. Responsive on email. A good relationship by every signal you could see. Then on a Tuesday afternoon, the cancellation email arrived. Looking back — the tone had been shifting for months. The executive had quietly stopped joining calls six weeks ago. The meeting cadence had slipped. The signals were there. They just needed to be seen together, across time.',
    tags: ['tone_shift_detected', 'executive_disengaged', 'meeting_cadence_drop'],
    tagStyle: '',
    animClass: 'anim-in-left',
    side: 'left',
  },
  {
    icon: '⚡',
    iconStyle: { color: 'var(--accent-coral)' },
    title: 'The feeling you couldn\'t act on.',
    body: 'You had a sense something was off. The emails felt slightly different — a little more formal, a little shorter. But the feeling was too soft to act on. You didn\'t want to send an awkward "are we okay?" email on a vague instinct. So you waited for something more concrete. The window to get ahead of it closed quietly. The decision had already been made by the time you knew.',
    tags: ['response_length_decay', 'formality_shift', 'engagement_drop'],
    tagStyle: '',
    animClass: 'anim-in-up',
    side: 'center',
  },
  {
    icon: '↑',
    iconStyle: { color: 'var(--accent-teal)' },
    title: 'The upsell moment you didn\'t see.',
    body: 'One of your accounts was growing in energy — more questions, faster responses, an executive who started joining calls again. The signals of a relationship ready for the next chapter. But your attention was on the red accounts, as it should be. The expansion conversation never happened at the right moment. A competitor had it instead.',
    tags: ['engagement_increasing', 'exec_re-engagement', 'expansion_signal'],
    tagStyle: 'signal-tag--teal',
    animClass: 'anim-in-right',
    side: 'right',
  },
];

const VignetteCard = ({ card, index }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.15 }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  const animDelay = `${index * 80}ms`;

  return (
    <div
      ref={ref}
      className={`vignette-card vignette-card--${card.side}${visible ? ` ${card.animClass}` : ''}`}
      style={visible ? { animationDelay: animDelay } : {}}
      data-testid={`vignette-card-${index + 1}`}
    >
      <div className="vignette-card__icon" style={card.iconStyle}>{card.icon}</div>
      <h3 className="vignette-card__title">{card.title}</h3>
      <p className="vignette-card__body">{card.body}</p>
      <div className="signal-tags">
        {card.tags.map(tag => (
          <span key={tag} className={`signal-tag ${card.tagStyle}`} data-testid={`signal-tag-${tag}`}>
            [{tag}]
          </span>
        ))}
      </div>
    </div>
  );
};

const Problem = () => (
  <section className="problem" data-testid="problem-section">
    <div className="problem__inner">
      <span className="section-eyebrow section-eyebrow--amber" data-testid="problem-eyebrow">
        The Problem
      </span>
      <h2 className="section-headline" data-testid="problem-headline">
        You've been here before.
      </h2>
      <p className="section-subhead" data-testid="problem-subhead">
        Client relationships don't fail in a single email.<br />
        They fail in patterns. And patterns take time to see.
      </p>

      <div className="problem__cards">
        {cards.map((card, i) => <VignetteCard key={i} card={card} index={i} />)}
      </div>
    </div>
  </section>
);

export default Problem;
