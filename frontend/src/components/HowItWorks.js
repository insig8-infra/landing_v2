import React from 'react';
import { Inbox, Activity, Target } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: <Inbox size={20} />,
    title: 'Connect what you already use',
    body: 'Link Gmail or Outlook, your calendar, and your AI meeting notetaker — Fathom, Fireflies, Otter, or similar. That\'s it. No CRM required. No manual data entry. No configuration. If your sales team sends a structured deal-close email to the CSM at handoff, insig8 reads that automatically too — contract value, renewal date, champion, success criteria, all parsed and attached to the account.',
    testId: 'step-connect',
  },
  {
    num: '02',
    icon: <Activity size={20} />,
    title: 'insig8 reads the patterns you can\'t',
    body: 'Across every thread, every meeting note, every calendar event — insig8 is building a live picture of sentiment trajectory, engagement depth, commitment fulfilment, and relationship health for every account in your portfolio. Simultaneously. Without you doing anything.',
    testId: 'step-reads',
  },
  {
    num: '03',
    icon: <Target size={20} />,
    title: 'You see what matters, when it matters',
    body: 'A single portfolio view shows you which accounts need attention, which are primed to expand, which commitments are overdue, and which success stories are worth capturing — before you have to go looking for any of it. insig8 comes to you. You don\'t go looking for insig8.',
    testId: 'step-see',
  },
];

const Connector = () => (
  <div className="step-connector" aria-hidden="true">
    <div className="step-connector__track">
      <div className="step-connector__dot" />
    </div>
  </div>
);

const HowItWorks = () => (
  <section className="how-it-works" data-testid="how-it-works-section">
    <div className="how-it-works__inner">
      <span className="section-eyebrow section-eyebrow--teal" data-testid="how-eyebrow">
        How It Works
      </span>
      <h2 className="section-headline" data-testid="how-headline">
        Set up in 20 minutes.<br />
        Insights before end of day.
      </h2>

      <div className="how-it-works__steps" data-testid="how-steps">
        {steps.map((step, i) => (
          <React.Fragment key={step.num}>
            <div className="step" data-testid={step.testId}>
              <div className="step__number">{step.num}</div>
              <div className="step__icon">{step.icon}</div>
              <h3 className="step__title">{step.title}</h3>
              <p className="step__body">{step.body}</p>
            </div>
            {i < steps.length - 1 && <Connector />}
          </React.Fragment>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
