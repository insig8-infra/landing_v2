import React from 'react';
import { SiGmail, SiGooglecalendar, SiSlack } from 'react-icons/si';

/* ── Custom brand icons ── */
const OutlookIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="3" width="20" height="18" rx="3" fill="#0078D4" opacity="0.15"/>
    <rect x="2" y="3" width="20" height="18" rx="3" stroke="#0078D4" strokeWidth="1.5"/>
    <path d="M4 7l8 5.5L20 7" stroke="#0078D4" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const GCalIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="3" width="20" height="18" rx="2" stroke="#4285F4" strokeWidth="1.5"/>
    <path d="M2 9h20" stroke="#4285F4" strokeWidth="1.5"/>
    <path d="M8 3v4M16 3v4" stroke="#EA4335" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="15" r="2" fill="#34A853"/>
  </svg>
);

const OutlookCalIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="3" width="20" height="18" rx="3" fill="#0078D4" opacity="0.1"/>
    <rect x="2" y="3" width="20" height="18" rx="3" stroke="#0078D4" strokeWidth="1.5"/>
    <path d="M2 9h20" stroke="#0078D4" strokeWidth="1.5"/>
    <path d="M8 3v4M16 3v4" stroke="#0078D4" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="15.5" r="2" fill="#0078D4" opacity="0.7"/>
  </svg>
);

const FathomIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9.5" stroke="#7C3AED" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="3.5" fill="#7C3AED"/>
    <path d="M12 4v2M12 18v2M4 12H2M22 12h-2" stroke="#7C3AED" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
  </svg>
);

const FirefliesIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2C9 6 7.5 10 9.5 14C10.5 16 11 17.5 12 22C13 17.5 13.5 16 14.5 14C16.5 10 15 6 12 2Z" fill="#F97316"/>
    <circle cx="7" cy="13" r="1.5" fill="#F97316" opacity="0.65"/>
    <circle cx="17" cy="13" r="1.5" fill="#F97316" opacity="0.65"/>
  </svg>
);

const TeamsIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="9" cy="8.5" r="3" stroke="#6264A7" strokeWidth="1.5"/>
    <circle cx="16.5" cy="8.5" r="2.2" stroke="#6264A7" strokeWidth="1.2"/>
    <path d="M2 20c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#6264A7" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M16.5 13.5c2.485 0 4.5 2.015 4.5 4.5" stroke="#6264A7" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

/* ── Tool lists ── */
const active = [
  { Icon: SiGmail,          label: 'Gmail',             color: '#EA4335', isReact: true },
  { Icon: OutlookIcon,      label: 'MS Outlook',        color: '#0078D4', isReact: false },
  { Icon: GCalIcon,         label: 'Google Calendar',   color: '#4285F4', isReact: false },
  { Icon: OutlookCalIcon,   label: 'Outlook Calendar',  color: '#0078D4', isReact: false },
  { Icon: FathomIcon,       label: 'Fathom',            color: '#7C3AED', isReact: false },
  { Icon: FirefliesIcon,    label: 'Fireflies',         color: '#F97316', isReact: false },
];

const soon = [
  { Icon: TeamsIcon,  label: 'Teams', isReact: false },
  { Icon: SiSlack,    label: 'Slack', color: '#4A154B', isReact: true },
];

const BuiltFromResearch = () => (
  <section className="built-from" data-testid="built-from-section">
    <div className="built-from__inner">
      <p className="built-from__eyebrow" data-testid="built-from-eyebrow">
        Built from real conversations with CS teams
      </p>
      <p className="built-from__body" data-testid="built-from-body">
        insig8 was built after <strong>60+ conversations</strong> with CS leads, founders doing their own CS,
        and delivery managers across B2B SaaS and professional services.
        These are the three patterns we kept hearing.
      </p>

      <p className="built-from__tools-label">Connects to what you already use</p>

      <div className="built-from__tools" data-testid="built-from-tools">
        {active.map(({ Icon, label, color, isReact }) => (
          <div
            className="tool-chip"
            key={label}
            data-testid={`tool-chip-${label.toLowerCase().replace(/\s/g, '-')}`}
          >
            {isReact
              ? <Icon size={14} style={{ color }} />
              : <Icon size={14} />
            }
            <span>{label}</span>
          </div>
        ))}
        {soon.map(({ Icon, label, color, isReact }) => (
          <div
            className="tool-chip tool-chip--soon"
            key={label}
            data-testid={`tool-chip-${label.toLowerCase()}`}
          >
            {isReact
              ? <Icon size={14} style={{ color }} />
              : <Icon size={14} />
            }
            <span>{label}</span>
            <span className="tool-chip__badge">soon</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BuiltFromResearch;
