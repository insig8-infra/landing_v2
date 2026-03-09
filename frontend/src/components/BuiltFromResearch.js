import React from 'react';
import { Mail, Calendar, Mic, Inbox } from 'lucide-react';

const tools = [
  { icon: <Mail size={14} />,     label: 'Gmail'            },
  { icon: <Calendar size={14} />, label: 'Google Calendar'  },
  { icon: <Mic size={14} />,      label: 'Fathom'           },
  { icon: <Mic size={14} />,      label: 'Fireflies'        },
  { icon: <Inbox size={14} />,    label: 'Outlook'          },
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
        {tools.map(tool => (
          <div className="tool-chip" key={tool.label} data-testid={`tool-chip-${tool.label.toLowerCase().replace(/\s/g,'-')}`}>
            {tool.icon}
            <span>{tool.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BuiltFromResearch;
