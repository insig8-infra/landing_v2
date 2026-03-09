import React from 'react';

const WhoItNotFor = () => (
  <section className="who-not-for" data-testid="who-not-for-section">
    <div className="who-not-for__inner">
      <span className="section-eyebrow section-eyebrow--muted" data-testid="who-eyebrow">
        An Honest Note
      </span>
      <h2 className="who-not-for__headline" data-testid="who-headline">
        insig8 is not for everyone.
      </h2>
      <div className="who-not-for__body" data-testid="who-body">
        <p>
          If you're running a 200-person CS org with a configured Gainsight instance, a RevOps team
          maintaining your CRM, and a CSM for every ten accounts — those tools exist and they're good.
          This isn't for you.
        </p>
        <p>
          insig8 is for the team doing serious customer success without any of that infrastructure yet.
          The founder who is also the CSM. The first CS hire managing 60 accounts with a great inbox
          and no system. The company that needs something that works from day one — not month three.
        </p>
        <p>
          If that's you, we built this for you.
        </p>
      </div>
    </div>
  </section>
);

export default WhoItNotFor;
