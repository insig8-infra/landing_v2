import React from 'react';
import { Inbox, Activity, Target } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: <Inbox size={20} />,
    title: 'Connect what you already use',
    body: 'Link Gmail or Outlook, your calendar, and your AI notetaker (Fathom, Fireflies, or similar). No CRM. No manual data entry. Up and running in 20 minutes.',
    testId: 'step-connect',
  },
  {
    num: '02',
    icon: <Activity size={20} />,
    title: 'insig8 reads the patterns you can\'t',
    body: 'Across every email, meeting note, and calendar event — insig8 builds a live picture of sentiment, engagement depth, and relationship health for every account. Simultaneously. Automatically.',
    testId: 'step-reads',
  },
  {
    num: '03',
    icon: <Target size={20} />,
    title: 'You see what matters, when it matters',
    body: 'One view. Which accounts need attention. Which are ready to expand. Which commitments are overdue. insig8 surfaces the signal — you decide the action.',
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
