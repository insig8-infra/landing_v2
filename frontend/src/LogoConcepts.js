import React, { useEffect, useRef } from 'react';

/*
  ─────────────────────────────────────────────────────────────
  INSIG8  LOGO  CONCEPT  EXPLORER
  4 lighthouse-beam interpretations of the "i" in "insig8".
  All use the same wordmark; only the "i" treatment differs.
  ─────────────────────────────────────────────────────────────
*/

const TEAL   = '#00D4C8';
const WHITE  = '#E5E7EB';
const BG     = '#0A0F1E';
const SURF   = '#111827';
const MUTED  = '#374151';

/* ─── Shared wrapper ─── */
const Panel = ({ label, sub, children, light }) => (
  <div style={{
    background: light ? '#F8FAFC' : SURF,
    border: `1px solid ${light ? '#E2E8F0' : '#1F2937'}`,
    borderRadius: 12,
    padding: '40px 48px',
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
  }}>
    <span style={{
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 10,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: light ? '#9CA3AF' : '#4B5563',
      marginBottom: 6,
    }}>{label}</span>
    <span style={{
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      fontSize: 13,
      color: light ? '#6B7280' : '#6B7280',
      marginBottom: 36,
      lineHeight: 1.5,
    }}>{sub}</span>
    {children}
  </div>
);

/* ═══════════════════════════════════════════════════════════
   CONCEPT A  —  "The Signal Fan"
   i-dot becomes a transmission node; thin rays fan rightward.
   Minimal. Technical. Elegant.
   ═══════════════════════════════════════════════════════════ */
const ConceptA = () => (
  <svg width="340" height="82" viewBox="0 0 340 82" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gA1" x1="10" y1="20" x2="340" y2="0"   gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor={TEAL} stopOpacity="0.55"/>
        <stop offset="100%" stopColor={TEAL} stopOpacity="0"/>
      </linearGradient>
      <linearGradient id="gA2" x1="10" y1="20" x2="340" y2="82" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor={TEAL} stopOpacity="0.35"/>
        <stop offset="100%" stopColor={TEAL} stopOpacity="0"/>
      </linearGradient>
      <radialGradient id="dotGlowA" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={TEAL} stopOpacity="0.5"/>
        <stop offset="100%" stopColor={TEAL} stopOpacity="0"/>
      </radialGradient>
    </defs>

    {/* ── Beam cone (behind text) ── */}
    <path d="M10 20 L340 0 L340 82 Z" fill="url(#gA2)" opacity="0.07"/>

    {/* ── Fan rays ── */}
    <line x1="10" y1="20" x2="340" y2="2"  stroke={TEAL} strokeWidth="0.7" opacity="0.30"/>
    <line x1="10" y1="20" x2="340" y2="22" stroke={TEAL} strokeWidth="0.7" opacity="0.22"/>
    <line x1="10" y1="20" x2="340" y2="42" stroke={TEAL} strokeWidth="0.6" opacity="0.16"/>
    <line x1="10" y1="20" x2="340" y2="62" stroke={TEAL} strokeWidth="0.5" opacity="0.10"/>
    <line x1="10" y1="20" x2="340" y2="80" stroke={TEAL} strokeWidth="0.4" opacity="0.07"/>

    {/* ── Wordmark ── */}
    <text x="0" y="72"
      fontFamily="Syne, sans-serif" fontWeight="800" fontSize="60"
      fill={WHITE}>insig8</text>

    {/* ── i-dot node (on top) ── */}
    <circle cx="10" cy="20" r="14" fill="url(#dotGlowA)"/>
    <circle cx="10" cy="20" r="4"  fill={TEAL}/>
  </svg>
);

/* ═══════════════════════════════════════════════════════════
   CONCEPT B  —  "The Scan Line"
   A single precise beam cuts horizontally across the word —
   like a scanner or a lighthouse sweep caught mid-arc.
   Bold. Precise. Confident.
   ═══════════════════════════════════════════════════════════ */
const ConceptB = () => (
  <svg width="340" height="82" viewBox="0 0 340 82" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gB_beam" x1="10" y1="0" x2="340" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%"   stopColor={TEAL} stopOpacity="0.9"/>
        <stop offset="60%"  stopColor={TEAL} stopOpacity="0.4"/>
        <stop offset="100%" stopColor={TEAL} stopOpacity="0"/>
      </linearGradient>
      <linearGradient id="gB_glow" x1="10" y1="0" x2="340" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%"   stopColor={TEAL} stopOpacity="0.18"/>
        <stop offset="50%"  stopColor={TEAL} stopOpacity="0.05"/>
        <stop offset="100%" stopColor={TEAL} stopOpacity="0"/>
      </linearGradient>
      <radialGradient id="dotGlowB" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={TEAL} stopOpacity="0.5"/>
        <stop offset="100%" stopColor={TEAL} stopOpacity="0"/>
      </radialGradient>
    </defs>

    {/* ── Beam halo ── */}
    <rect x="10" y="12" width="330" height="16" fill="url(#gB_glow)" rx="8"/>

    {/* ── Beam line ── */}
    <line x1="10" y1="20" x2="340" y2="20" stroke="url(#gB_beam)" strokeWidth="1.5"/>

    {/* ── Wordmark ── */}
    <text x="0" y="72"
      fontFamily="Syne, sans-serif" fontWeight="800" fontSize="60"
      fill={WHITE}>insig8</text>

    {/* ── i-dot node ── */}
    <circle cx="10" cy="20" r="14" fill="url(#dotGlowB)"/>
    <circle cx="10" cy="20" r="4"  fill={TEAL}/>

    {/* ── Terminal dot at the "8" — signal received ── */}
    <circle cx="330" cy="20" r="2.5" fill={TEAL} opacity="0.6"/>
    <circle cx="330" cy="20" r="6"   fill={TEAL} opacity="0.12"/>
  </svg>
);

/* ═══════════════════════════════════════════════════════════
   CONCEPT C  —  "The Lantern"
   The "I" is taller with a teal diamond lantern at the top.
   A wide, soft cone of light pours rightward over "nsig8".
   Architectural. Warm. Iconic.
   ═══════════════════════════════════════════════════════════ */
const ConceptC = () => (
  <svg width="340" height="90" viewBox="0 0 340 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gC_cone" x1="14" y1="12" x2="340" y2="45" gradientUnits="userSpaceOnUse">
        <stop offset="0%"   stopColor={TEAL} stopOpacity="0.22"/>
        <stop offset="100%" stopColor={TEAL} stopOpacity="0"/>
      </linearGradient>
      <radialGradient id="lanternGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={TEAL} stopOpacity="0.6"/>
        <stop offset="100%" stopColor={TEAL} stopOpacity="0"/>
      </radialGradient>
    </defs>

    {/* ── Cone of light ── */}
    <path d="M14 10 L340 0 L340 90 Z" fill="url(#gC_cone)"/>

    {/* ── Wordmark — with "i" hidden by covering rect ── */}
    <text x="0" y="78"
      fontFamily="Syne, sans-serif" fontWeight="800" fontSize="62"
      fill={WHITE}>insig8</text>

    {/* ── Custom "I" tower — replaces the rendered "i" ── */}
    {/* Tower body */}
    <rect x="4" y="30" width="7" height="48" fill={WHITE} rx="1"/>
    {/* Lantern room cap */}
    <rect x="0" y="22" width="15" height="8" fill={WHITE} rx="1"/>
    {/* Diamond light */}
    <polygon points="7.5,4  14,14  7.5,18  1,14" fill={TEAL}/>
    <polygon points="7.5,4  14,14  7.5,18  1,14" fill="url(#lanternGlow)" transform="scale(2) translate(-3.75, -4)"/>

    {/* Cover the original "i" from the text render */}
    <rect x="0" y="0" width="16" height="78" fill={BG}/>
    {/* Re-draw tower on top of cover */}
    <rect x="4" y="30" width="7" height="48" fill={WHITE} rx="1"/>
    <rect x="0" y="22" width="15" height="8" fill={WHITE} rx="1"/>
    <polygon points="7.5,4  14,14  7.5,18  1,14" fill={TEAL}/>
    {/* Lantern glow */}
    <circle cx="7.5" cy="11" r="16" fill={TEAL} opacity="0.12"/>
    <circle cx="7.5" cy="11" r="5"  fill={TEAL} opacity="0.5"/>
    <circle cx="7.5" cy="11" r="2.5" fill={TEAL}/>
  </svg>
);

/* ═══════════════════════════════════════════════════════════
   CONCEPT D  —  "The Pulse Arcs"
   Concentric arc segments fan right from the i-dot —
   like radar, like intelligence radiating outward.
   Circular. Dynamic. Signal-driven.
   ═══════════════════════════════════════════════════════════ */
const ConceptD = () => (
  <svg width="340" height="82" viewBox="0 0 340 82" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="dotGlowD" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={TEAL} stopOpacity="0.5"/>
        <stop offset="100%" stopColor={TEAL} stopOpacity="0"/>
      </radialGradient>
    </defs>

    {/* ── Concentric arc rings (fan rightward from i-dot, clipped to right half) ── */}
    {/* Arc 1 - inner, brightest */}
    <path
      d="M10 20 m30 0 a30 30 0 0 1 -21.2 21.2"
      stroke={TEAL} strokeWidth="1.4" opacity="0" fill="none"
    />
    {/* Using actual arc paths: start from dot (10,20), arcs going rightward */}
    <path d="M 10 20 L 40 20  A 30 30 0 0 0 10 -10" stroke={TEAL} strokeWidth="1.4" opacity="0" fill="none"/>

    {/* Proper rightward fan arcs */}
    {/* Arc = from dot going up-right and down-right */}
    <path d="M 10 -7  A 27 27 0 0 1 37 20  A 27 27 0 0 1 10 47"
      stroke={TEAL} strokeWidth="1.4" opacity="0.50" fill="none"
      strokeDasharray="none"
    />
    <path d="M 10 -25  A 45 45 0 0 1 55 20  A 45 45 0 0 1 10 65"
      stroke={TEAL} strokeWidth="1.0" opacity="0.30" fill="none"
    />
    <path d="M 10 -43  A 63 63 0 0 1 73 20  A 63 63 0 0 1 10 83"
      stroke={TEAL} strokeWidth="0.7" opacity="0.16" fill="none"
    />

    {/* ── Wordmark ── */}
    <text x="0" y="72"
      fontFamily="Syne, sans-serif" fontWeight="800" fontSize="60"
      fill={WHITE}>insig8</text>

    {/* ── i-dot node ── */}
    <circle cx="10" cy="20" r="14" fill="url(#dotGlowD)"/>
    <circle cx="10" cy="20" r="4"  fill={TEAL}/>
  </svg>
);

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════ */
const LogoConcepts = () => {
  const concepts = [
    {
      label: 'CONCEPT A  —  SIGNAL FAN',
      sub: 'i-dot as transmission node. Multiple thin rays fan rightward — like a lighthouse casting beams across the sea. Minimal, technical, architectural.',
      Component: ConceptA,
    },
    {
      label: 'CONCEPT B  —  THE SCAN LINE',
      sub: 'A single precise beam from the i-dot, cutting straight across the word. Lands on "8" as a terminal node. Like a scanner sweeping the portfolio.',
      Component: ConceptB,
    },
    {
      label: 'CONCEPT C  —  THE LANTERN',
      sub: 'The "I" is redesigned as a lighthouse tower with a teal diamond lantern cap. A wide soft cone pours rightward over "nsig8". Iconic, warm, structural.',
      Component: ConceptC,
    },
    {
      label: 'CONCEPT D  —  PULSE ARCS',
      sub: 'Concentric arc segments radiate right from the i-dot — like radar or sonar. Intelligence broadcasting outward. Dynamic, circular, signal-driven.',
      Component: ConceptD,
    },
  ];

  return (
    <div style={{
      background: BG,
      minHeight: '100vh',
      padding: '60px 40px',
      fontFamily: 'Plus Jakarta Sans, sans-serif',
    }}>
      {/* Header */}
      <div style={{ marginBottom: 60, borderBottom: `1px solid #1F2937`, paddingBottom: 32 }}>
        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.18em', color: '#4B5563', textTransform: 'uppercase', marginBottom: 10 }}>
          insig8 — logo concept explorer
        </p>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 28, color: WHITE, marginBottom: 8 }}>
          "i as Lighthouse" — 4 Concepts
        </h1>
        <p style={{ fontSize: 14, color: '#6B7280', maxWidth: 520, lineHeight: 1.6 }}>
          All 4 use the same "insig8" wordmark in Syne Bold. The "i" acts as the lighthouse —
          projecting signals (beams) rightward onto "nsig8". One integrated logo, not two separate marks.
        </p>
      </div>

      {/* 2×2 Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 1100, margin: '0 auto' }}>
        {concepts.map(({ label, sub, Component }) => (
          <Panel key={label} label={label} sub={sub}>
            <Component />
          </Panel>
        ))}
      </div>

      {/* Context note */}
      <div style={{
        marginTop: 48, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto',
        padding: 28, background: '#0D1424', borderRadius: 8, border: `1px solid #1F2937`,
      }}>
        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.15em', color: TEAL, textTransform: 'uppercase', marginBottom: 10 }}>
          Design notes
        </p>
        <p style={{ fontSize: 13, color: '#9CA3AF', lineHeight: 1.7 }}>
          <strong style={{ color: WHITE }}>A</strong> — Most versatile. Works at any size. The fan lines are purely decorative, never obscure text.<br/>
          <strong style={{ color: WHITE }}>B</strong> — Most distinctive. The terminal dot at "8" closes the loop: signal sent, signal received.<br/>
          <strong style={{ color: WHITE }}>C</strong> — Most architectural. The custom "I" tower gives insig8 a true pictorial mark, not just a letterform treatment.<br/>
          <strong style={{ color: WHITE }}>D</strong> — Most dynamic. Pulse arcs suggest live, continuous intelligence rather than a static scan.
        </p>
      </div>
    </div>
  );
};

export default LogoConcepts;
