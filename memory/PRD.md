# insig8 Landing Page — PRD

## Project Overview
**Product**: insig8 — a post-sales relationship intelligence platform for B2B companies  
**Date Created**: February 2026  
**Type**: Marketing landing page (pure frontend, no backend required)

---

## Problem Statement
Build a dark-mode-first, scroll-driven, conversion-focused landing page for insig8. The page has one job: make the right person feel so precisely understood in the first 8 seconds that they scroll. Spec provided in `insig8_landing_page_prompt_v2.txt`.

---

## Target Audience
- Founders doing their own CS at B2B companies (10–100 employees)
- First CS hire managing 20–200 accounts
- Delivery managers at B2B SaaS and professional services companies
- Anyone doing serious customer success without enterprise CS infrastructure

---

## Architecture
- **Stack**: React (CRA + CRACO), TailwindCSS, CSS Custom Properties
- **Fonts**: Syne Bold (headlines), Plus Jakarta Sans (body), JetBrains Mono (data values) — loaded from Google Fonts
- **Animations**: CSS @keyframes + IntersectionObserver (no heavy animation library)
- **Icons**: Lucide React
- **No backend** required — pure static landing page

---

## User Preferences Applied
- Social proof bar replaced with "Built from 60+ real conversations" + tool logos (Gmail, Calendar, Fathom, Fireflies, Outlook)
- Testimonial section replaced with founder video/Loom embed placeholder
- CTAs non-clickable (href="#") — ready for real URL wiring
- Navigation: Product | Pricing | Sign in | Start free only
- Logo: asymmetric infinity SVG — left loop larger (portfolio view), right loop smaller (individual account)

---

## Implemented Features (Feb 2026)

### Changes in Iteration 2 (Feb 2026)
1. Real brand logos for tool chips: Gmail (SiGmail), MS Outlook (custom SVG), Google Calendar (custom SVG), Outlook Calendar (custom SVG), Fathom AI (custom SVG), Fireflies (custom SVG), Teams + Slack as "coming soon" with amber badges
2. Problem card 1 — fixed contradiction: removed "engaged in meetings" opening, rewrote to show subtle degradation signals only
3. Reframe section — removed all "40" references, shortened paragraphs
4. How It Works — drastically shortened step text (1-2 sentences each), more visual
5. Outcomes (What You'll Know) — all 6 card bodies shortened by ~50%
6. Removed "Who It's Not For" section entirely
7. Founder Note — changed to "we" language throughout, "From the Founders"
8. All CTAs: "Start free" → "Get early access"
9. Logo redesign: horizontal infinity replaced with vertical dual-ellipse nexus mark — upper (narrow) = individual account, lower (wider) = portfolio view, nexus glowing dot = the moment of insight

### Page Sections (in order)
1. **Navigation** — Fixed, transparent → blur-on-scroll (backdrop-filter: blur(12px)), infinity mark + "insig8" in teal, Product/Pricing links, Sign in / Start free buttons, mobile hamburger with full-screen overlay
2. **Hero** — Signal node SVG background (atmospheric, opacity 0.18), two-weight headline (light + bold teal), signal card mockup (Meridian Technologies Ltd, health score 47↓, 3 signals, renewal bar, action buttons), ghost cards for portfolio depth effect, page-load animation sequence
3. **Built From Research** — "60+ conversations" statement, tool integration logos
4. **Problem** — "You've been here before" + 3 vignette cards with scroll-triggered slide-in animations and amber hover glow
5. **Reframe** — "Why it's hard" section with pull quote word-by-word fade (50ms stagger)
6. **How It Works** — Light (#F8FAFC) background with dark text, 3 steps, animated connector with traveling dot
7. **Outcomes** — 2×3 grid with scroll-triggered fade-up and hover teal left border
8. **Stats** — 4 stats with count-up animation on scroll: 3–6 weeks, 18 min, 40+, 0
9. **Who It's Not For** — "An Honest Note" trust-builder section
10. **Founder Note** — Video/Loom embed placeholder with poster image and play button
11. **Final CTA** — "Your portfolio is already telling a story. Start reading it." + dense teal signal graph
12. **Footer** — 4-column (brand + Product + Company + Legal), LinkedIn/Twitter icons, copyright 2026

### Design System
- Color palette: bg-base #0A0F1E, bg-surface #111827, accent-teal #00D4C8, accent-amber #F59E0B, accent-green #10B981, accent-coral #F87171
- Amber used exclusively for risk/alerts and CTA hover (intentional subconscious signal)
- JetBrains Mono for all data values (health scores, signal values, tags)
- Generous whitespace throughout
- Fully responsive: mobile (<640px), tablet (640–1024px), desktop (>1024px)
- prefers-reduced-motion respected

---

## File Structure
```
/app/frontend/src/
├── App.js                          # Main app, routes to LandingPage
├── App.css                         # All component styles + keyframes
├── index.css                       # Google Fonts + CSS custom properties
├── hooks/
│   └── useIntersection.js          # IntersectionObserver hook
└── components/
    ├── Navigation.js               # Fixed nav + mobile menu
    ├── Hero.js                     # Hero + SignalGraph + SignalCard (exported)
    ├── BuiltFromResearch.js        # 60+ conversations + tool logos
    ├── Problem.js                  # 3 vignette cards
    ├── Reframe.js                  # Pull quote with word-by-word fade
    ├── HowItWorks.js               # 3 steps + animated connector
    ├── Outcomes.js                 # 6 outcome cards grid
    ├── Stats.js                    # Stats with count-up animation
    ├── WhoItNotFor.js              # Trust builder
    ├── FounderNote.js              # Video placeholder
    ├── FinalCTA.js                 # Final conversion section
    └── Footer.js                  # Site footer
```

---

## Logo Concepts In Progress (Feb 2026)
4 "i as Lighthouse" concepts built at `/logo-concepts` route for client review:
- **A**: Signal Fan — i-dot + multiple thin fan rays rightward
- **B**: Scan Line — single bold beam from i-dot → terminal dot at "8"
- **C**: The Lantern — custom lighthouse tower I + teal diamond cap + cone
- **D**: Pulse Arcs — concentric radar/sonar arcs from i-dot

Pending: client picks a concept → apply to Navigation.js + Footer.js, remove /logo-concepts route.

## Prioritized Backlog

### P0 — Ready to activate when content is available
- Wire CTA buttons to real signup/waitlist URL
- Replace Loom placeholder with actual founder recording
- Replace [Name] placeholders with real testimonials (if added later)

### P1 — Enhancement opportunities
- Add real company logos to "Built with" section
- Add second testimonial card in Founder Note section
- A/B test amber vs teal CTA color for conversion
- Add analytics tracking (Plausible, Segment, or similar) on CTA clicks
- SEO meta tags (og:title, og:image, description)

### P2 — Future features
- Blog section (linked from nav)
- Pricing page
- About page with team section
- Waitlist/email capture integration (Mailchimp, ConvertKit)
- Cookie consent banner

---

## Testing Results
- **Test Date**: February 2026
- **Pass Rate**: 97% (19/19 major features confirmed)
- **Test Report**: `/app/test_reports/iteration_1.json`
