# insig8 Landing Page - Product Requirements

## Original Problem Statement
Build a landing page for "insig8" - a Post-Sales Relationship Intelligence product. The design system (colors, theme, fonts, scroll flow) comes from a reference GitHub repo (`insig8-infra/insig8-landing`), while text/wording is carried over from the existing project. Enhanced with animations.

## Core Requirements
1. **Design System**: Deep dark blue theme (HSL CSS variables), Outfit headings + Plus Jakarta Sans body fonts, glass-morphism cards, gradient accents
2. **Scroll Flow**: Lenis smooth scroll, framer-motion scroll-driven animations, floating sphere badges
3. **Sections**: Hero (word-swap), IntegrationsMarquee, Problem, Reframe, HowItWorks, Outcomes, Stats, FounderNote, CTA, Pricing, FAQ, Footer
4. **Early Access Modal**: Form → backend API with duplicate detection
5. **Logo**: Current placeholder kept; lighthouse concept paused

## Architecture
```
/app/frontend/src/
├── App.js, App.css, index.css (design system)
├── content/landingCopy.js (centralized text)
├── components/landing/ (14 section components + animation utilities)
├── pages/LandingPage.jsx (page assembly + Lenis)
/app/backend/server.py (FastAPI + /api/early-access)
```

## What's Been Implemented (2026-03-11)
- [x] Full redesigned landing page from reference repo design system
- [x] All text/wording carried over from original project
- [x] 14 sections with framer-motion animations
- [x] Single-row integrations marquee (fixed from 2 rows)
- [x] Proper heading typography hierarchy (font-heading text-3xl/4xl/5xl)
- [x] Tightened section spacing (py-12/py-16 with dividers)
- [x] HowItWorks 3-column grid (fixed from 5-column)
- [x] Hero word-swap animation (Pattern → Signal)
- [x] Floating sphere badges with scroll convergence
- [x] Early Access Modal + backend API (signup + dedup + count)
- [x] Mobile responsive (hamburger menu, stacked layout)
- [x] Testing: 100% pass (iterations 2 & 3)

## Backlog
- **P1**: Implement chosen logo (lighthouse concept - paused by user)
- **P1**: Connect CTA links to Google Sheet database
- **P2**: Add Loom video embed to Founder Note section
- **P2**: Email notification on early-access signup
- **P3**: Testimonials section (needs user content)
- **P3**: SEO meta tags and Open Graph optimization
