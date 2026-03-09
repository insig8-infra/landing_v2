import React, { useEffect, useRef, useState } from 'react';

const useCounter = (end, isActive, duration = 1500) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isActive || end === 0) { setCount(end); return; }
    let raf;
    const start = Date.now();
    const animate = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(end * eased));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isActive, end, duration]);
  return count;
};

const StatItem = ({ stat, isActive }) => {
  const count = useCounter(stat.countTo, isActive);
  const display = stat.range
    ? stat.label
    : `${count}${stat.suffix || ''}`;

  return (
    <div className="stat-item" data-testid={`stat-${stat.id}`}>
      <div className={`stat-number ${stat.color}`} data-testid={`stat-number-${stat.id}`}>
        {display}
      </div>
      {stat.unit && <div className="stat-unit">{stat.unit}</div>}
      <p className="stat-desc">{stat.desc}</p>
    </div>
  );
};

const stats = [
  {
    id: 'weeks',
    range: true,
    label: '3–6',
    unit: 'weeks',
    color: 'color-amber',
    countTo: 6,
    desc: 'Average lead time insig8 surfaces churn risk before a renewal decision is made',
  },
  {
    id: 'minutes',
    label: '',
    unit: 'min',
    color: 'color-teal',
    countTo: 18,
    suffix: '',
    desc: 'Average time from account connection to first portfolio insight',
  },
  {
    id: 'signals',
    label: '',
    unit: '',
    color: 'color-primary',
    countTo: 40,
    suffix: '+',
    desc: 'Relationship signals tracked per account, automatically, without manual input',
  },
  {
    id: 'entry',
    label: '',
    unit: '',
    color: 'color-green',
    countTo: 0,
    suffix: '',
    desc: 'Manual data entry required to get started. Connect and go.',
  },
];

const Stats = () => {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return (
    <section className="stats" data-testid="stats-section">
      <div className="stats__inner" ref={ref}>
        {stats.map(stat => <StatItem key={stat.id} stat={stat} isActive={active} />)}
      </div>
    </section>
  );
};

export default Stats;
