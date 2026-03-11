# insig8 Landing Page — PRD

## Problem Statement
Landing page for insig8 (Post-Sales Relationship Intelligence). Design system from reference repo, text from original project, enhanced with scroll animations and visual components per v3 audit document.

## Implemented (2026-03-11)

### Phase 1 — Copy Surgery (v3)
- [x] Hero subheadline trimmed, subPoints removed
- [x] Problem card bodies cut ~50% (62→28, 59→22, 44→22 words)
- [x] ReframeSection rebuilt: body paragraphs removed, pull quote (18 words) + closer (14 words) only
- [x] HowItWorks step bodies trimmed
- [x] All 6 Outcomes card bodies ≤18 words
- [x] CTA body to single sentence

### Phase 2 — Scroll Animations (v3)
- [x] 2px gradient scroll progress bar at page top
- [x] Active section highlighting in nav (IntersectionObserver + underline)
- [x] Problem cards: directional entry (left/bottom/right) + tag secondary stagger
- [x] ReframeSection: centered purple glow + scroll-driven word reveal + gradient last 8 words + delayed closer with "pattern recognition layer" gradient
- [x] HowItWorks: SVG connector line with 3 animated dots + spring step number entrance
- [x] Outcomes: scan-line sweep on entry + typewriter-style tag stagger
- [x] Stats: radial SVG progress rings
- [x] CTA: particle scatter (7 drifting teal dots)

### Phase 3 — Visual Components (v3)
- [x] Hero signal card (Meridian Technologies, health score 68→47 countdown, 3 signal rows, pulsing badge)
- [x] Problem: floating badges marquee strip
- [x] HowItWorks: branded gradient icon containers (blue→purple→teal)
- [x] Outcomes: "Health scores" card featured lg:col-span-2 with inline SVG bar chart
- [x] FounderNote: styled placeholder with pulsing red dot (no stock photo)

### Previously Completed
- [x] Full design system merge (colors/fonts/scroll from reference repo)
- [x] 14 sections with framer-motion animations
- [x] Hero word-swap (Pattern→Signal), Lenis smooth scroll, sphere badges
- [x] IntegrationsMarquee, EarlyAccessModal, Footer, Pricing, FAQ
- [x] Backend API: POST /api/early-access (signup + dedup + count)
- [x] Mobile responsive

## Architecture
```
frontend/src/
├── content/landingCopy.js (centralized copy)
├── components/landing/ (14 sections + animation utilities)
├── pages/LandingPage.jsx (assembly + Lenis)
backend/server.py (FastAPI + early-access API)
```

## Backlog
- **P1**: Implement logo (lighthouse concept — paused)
- **P1**: Connect links to Google Sheet database
- **P2**: Add Loom/video embed to Founder Note
- **P2**: Email notification on early-access signup
- **P3**: Testimonials section
- **P3**: SEO meta tags / Open Graph

## Testing
- iteration_2: 100% (initial build)
- iteration_3: 100% (spacing/typography fixes)
- iteration_4: 100% (v3 audit — 40+ tests, all 3 phases verified)
