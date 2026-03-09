import React from 'react';

/* ─── Signal Node Graph ─── */
const nodes = [
  { id:1,  x:8,  y:15, r:3,   t:'teal',  d:'0s',    dur:'3s'   },
  { id:2,  x:22, y:44, r:2.5, t:'grey',  d:'0.4s',  dur:'4s'   },
  { id:3,  x:38, y:18, r:4,   t:'amber', d:'0.8s',  dur:'2.5s' },
  { id:4,  x:15, y:72, r:2,   t:'grey',  d:'1.2s',  dur:'5s'   },
  { id:5,  x:52, y:58, r:3.5, t:'teal',  d:'0.6s',  dur:'3.5s' },
  { id:6,  x:68, y:22, r:2.5, t:'grey',  d:'1.0s',  dur:'4.5s' },
  { id:7,  x:78, y:46, r:4,   t:'amber', d:'0.2s',  dur:'2.8s' },
  { id:8,  x:92, y:20, r:3,   t:'teal',  d:'1.4s',  dur:'3.2s' },
  { id:9,  x:72, y:74, r:2.5, t:'grey',  d:'0.9s',  dur:'4.2s' },
  { id:10, x:88, y:82, r:3.5, t:'teal',  d:'0.3s',  dur:'3.8s' },
  { id:11, x:32, y:85, r:2,   t:'amber', d:'1.1s',  dur:'2.6s' },
  { id:12, x:55, y:88, r:2.5, t:'grey',  d:'0.7s',  dur:'4.8s' },
  { id:13, x:45, y:8,  r:2,   t:'grey',  d:'1.3s',  dur:'5.5s' },
  { id:14, x:60, y:45, r:3,   t:'teal',  d:'0.5s',  dur:'3.3s' },
  { id:15, x:82, y:62, r:2,   t:'grey',  d:'1.5s',  dur:'4.3s' },
  { id:16, x:28, y:28, r:3.5, t:'teal',  d:'0.1s',  dur:'3.6s' },
  { id:17, x:75, y:88, r:3,   t:'amber', d:'0.8s',  dur:'2.9s' },
  { id:18, x:95, y:56, r:2,   t:'grey',  d:'1.6s',  dur:'4.6s' },
  { id:19, x:12, y:92, r:2.5, t:'grey',  d:'0.5s',  dur:'5.2s' },
  { id:20, x:42, y:35, r:2.5, t:'teal',  d:'0.9s',  dur:'3.4s' },
];
const edgeList = [[1,16],[16,2],[2,4],[4,11],[11,12],[12,5],[5,14],[14,6],[6,3],[3,13],[8,7],[7,15],[15,9],[9,10],[10,17],[16,20],[20,5],[20,14],[7,14],[3,8]];
const nodeMap  = Object.fromEntries(nodes.map(n => [n.id, n]));
const colorOf  = t => t==='teal' ? '#00D4C8' : t==='amber' ? '#F59E0B' : '#374151';

export const SignalGraph = ({ dense = false }) => {
  const denseNodes = dense ? [
    ...nodes.map(n => ({ ...n, t: n.t === 'amber' ? 'teal' : n.t })),
    { id:21, x:35, y:50, r:3, t:'teal', d:'0.4s', dur:'3s' },
    { id:22, x:50, y:30, r:2.5, t:'teal', d:'1.0s', dur:'4s' },
    { id:23, x:65, y:55, r:3, t:'teal', d:'0.6s', dur:'2.8s' },
    { id:24, x:20, y:60, r:2, t:'teal', d:'1.3s', dur:'3.5s' },
    { id:25, x:80, y:30, r:3.5, t:'teal', d:'0.2s', dur:'3.1s' },
  ] : nodes;

  const displayNodes = denseNodes;
  const dm = Object.fromEntries(displayNodes.map(n => [n.id, n]));
  const edges = edgeList.filter(([a,b]) => dm[a] && dm[b]);

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      width="100%" height="100%"
      style={{ position: 'absolute', inset: 0 }}
      aria-hidden="true"
    >
      {edges.map(([a, b]) => {
        const na = dm[a]; const nb = dm[b];
        return (
          <line key={`${a}-${b}`}
            x1={`${na.x}%`} y1={`${na.y}%`}
            x2={`${nb.x}%`} y2={`${nb.y}%`}
            stroke="#374151" strokeWidth="0.3" opacity="0.55"
          />
        );
      })}
      {displayNodes.map(node => {
        const c = colorOf(node.t);
        const cls = node.t === 'teal' ? 'sn-teal' : node.t === 'amber' ? 'sn-amber' : '';
        return (
          <g key={node.id}>
            {node.t !== 'grey' && (
              <circle
                cx={`${node.x}%`} cy={`${node.y}%`} r={node.r * 2.5}
                fill={c} opacity="0.12"
                className={cls} style={{ '--d': node.d }}
              />
            )}
            <circle
              cx={`${node.x}%`} cy={`${node.y}%`} r={node.r}
              fill={c}
              className={cls} style={{ '--d': node.d }}
            />
          </g>
        );
      })}
    </svg>
  );
};

/* ─── Signal Card Mockup ─── */
const SignalCard = () => (
  <div className="signal-card-stack hero-load-card">
    <div className="signal-ghost signal-ghost--2" aria-hidden="true" />
    <div className="signal-ghost signal-ghost--1" aria-hidden="true" />
    <div className="signal-card" data-testid="signal-card-mockup">
      <div className="sc-header">
        <div>
          <div className="sc-label">Account</div>
          <div className="sc-account-name">Meridian Technologies Ltd</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="sc-label">Health Score</div>
          <div className="sc-health-score">
            <span>47</span>
            <span style={{ fontSize: '1rem', opacity: 0.8 }}>↓</span>
          </div>
        </div>
      </div>

      <div className="sc-divider" />

      <div className="sc-alert-badge" data-testid="sc-alert-badge">
        <span className="sc-alert-icon">⚠</span>
        <span>3 signals detected this week</span>
      </div>

      <div className="sc-signals">
        <div className="sc-signal-item">
          <div className="sc-signal-row">
            <span className="sc-signal-dot">○</span>
            <span className="sc-signal-label">Executive last seen in meeting</span>
          </div>
          <div className="sc-signal-value sc-signal-value--amber">6 weeks ago</div>
        </div>
        <div className="sc-signal-item">
          <div className="sc-signal-row">
            <span className="sc-signal-dot">○</span>
            <span className="sc-signal-label">Response time increasing</span>
          </div>
          <div className="sc-signal-value sc-signal-value--amber">+340% vs 60-day average</div>
        </div>
        <div className="sc-signal-item">
          <div className="sc-signal-row">
            <span className="sc-signal-dot">○</span>
            <span className="sc-signal-label">Tone shift detected</span>
          </div>
          <div className="sc-signal-value sc-signal-value--coral">Last 4 emails vs baseline</div>
        </div>
      </div>

      <div className="sc-renewal">── Renewal in 47 days ──────────────────────</div>

      <div className="sc-actions">
        <button className="btn-card btn-card--ghost" data-testid="sc-btn-view">View account</button>
        <button className="btn-card btn-card--teal" data-testid="sc-btn-outreach">Draft outreach →</button>
      </div>
    </div>
  </div>
);

/* ─── Hero ─── */
const Hero = () => (
  <section className="hero" data-testid="hero-section">
    <div className="hero__graph">
      <SignalGraph />
    </div>

    <div className="hero__inner">
      <div className="hero__copy">
        <span className="hero__eyebrow hero-load-headline1" data-testid="hero-eyebrow">
          Post-Sales Relationship Intelligence
        </span>

        <h1 className="hero__headline" data-testid="hero-headline">
          <span className="hero-load-headline1">
            <span className="hero__headline--light">You Read Every Email.<br />But Can You See </span>
          </span>
          <span className="hero-load-headline2">
            <span className="hero__headline--bold">Every Pattern?</span>
          </span>
        </h1>

        <p className="hero__subheading hero-load-sub" data-testid="hero-subheading">
          insig8 connects to your email, calendar and meeting notes — and automatically surfaces
          the relationship signals building invisibly across your entire client portfolio.
          <br /><br />
          Catch churn before it becomes a decision.<br />
          Spot expansion before you have to ask.
        </p>

        <div className="hero__cta">
          <button className="btn-hero hero-load-cta" data-testid="hero-cta-btn">
            Connect your inbox — free for 14 days
            <span className="btn-arrow" aria-hidden="true">→</span>
          </button>
          <p className="hero__trust hero-load-trust" data-testid="hero-trust-line">
            No CRM required.&nbsp;&nbsp;·&nbsp;&nbsp;No configuration.&nbsp;&nbsp;·&nbsp;&nbsp;Up and running in 20 min.
          </p>
        </div>
      </div>

      <div className="hero__visual">
        <SignalCard />
      </div>
    </div>
  </section>
);

export default Hero;
