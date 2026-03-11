# insig8 Landing Page - Product Requirements

## Original Problem Statement
Build a landing page for "insig8" - a Post-Sales Relationship Intelligence product. The user provided initial requirements via a text document, then refined through multiple rounds of feedback. The latest direction was to merge the design system (colors, theme, fonts, scroll flow) from a separate GitHub reference repo (`insig8-infra/insig8-landing`) with the text/wording from the existing project, and enhance with animations.

## User Personas
- **CS Leads / Customer Success Managers**: Primary audience. Need tools to track relationship health across portfolios.
- **Founders doing their own CS**: Secondary audience. Want automated signal detection.
- **Delivery Managers**: B2B SaaS and professional services.

## Core Requirements
1. **Design System**: Deep dark blue theme (HSL CSS variables), Outfit headings + Plus Jakarta Sans body fonts, glass-morphism cards, gradient accents
2. **Scroll Flow**: Lenis smooth scroll, framer-motion scroll-driven animations, floating sphere badges that orbit/converge
3. **Hero Section**: Word-swap animation (Pattern → Signal on scroll), badge pill, CTA button, floating badges
4. **Integrations Marquee**: Tool logos (Gmail, Outlook, Calendar, Fathom, Fireflies) in moving marquee
5. **Problem Section**: 3 bento cards with signal tags
6. **Reframe Section**: Word-by-word pull-quote animation
7. **How It Works**: 3 numbered step cards
8. **Outcomes**: 6 bento cards in responsive grid
9. **Stats**: Animated counters (3-6 weeks, 18 min, 40+, 0)
10. **Founder Note**: Video placeholder
11. **CTA Section**: Full-width with gradient glow
12. **Pricing**: 3-tier cards (Starter/Growth/Enterprise)
13. **FAQ**: Accordion with 5 items
14. **Footer**: 4-column layout with brand, links, social
15. **Early Access Modal**: Form submission to backend API, duplicate detection
16. **Backend API**: POST /api/early-access (signup), GET /api/early-access/count
17. **Logo**: Current placeholder logo kept; lighthouse concept paused

## Architecture
```
/app/
├── backend/
│   ├── .env (MONGO_URL, DB_NAME)
│   ├── requirements.txt
│   ├── server.py (FastAPI + early-access API)
│   └── tests/
│       └── test_early_access_api.py
└── frontend/
    ├── .env (REACT_APP_BACKEND_URL)
    ├── package.json
    ├── tailwind.config.js (full design token system)
    ├── src/
    │   ├── App.js, App.css, index.css (design system CSS)
    │   ├── content/
    │   │   └── landingCopy.js (all page text/content centralized)
    │   ├── components/
    │   │   ├── landing/ (all section components + animation utilities)
    │   │   └── ui/ (shadcn components)
    │   └── pages/
    │       └── LandingPage.jsx (page assembly + Lenis init)
```

## Tech Stack
- **Frontend**: React, Tailwind CSS, framer-motion, Lenis, react-fast-marquee, lucide-react
- **Backend**: FastAPI, MongoDB (via Motor), Pydantic
- **Fonts**: Outfit (headings), Plus Jakarta Sans (body)

## What's Been Implemented (as of 2026-03-11)
- [x] Full redesigned landing page with reference repo's design system
- [x] All text/wording carried over from original project
- [x] 14 page sections with framer-motion animations
- [x] Hero word-swap animation (Pattern → Signal)
- [x] Floating sphere badges with scroll convergence
- [x] Lenis smooth scroll
- [x] Integrations marquee with tool chips
- [x] Problem, Reframe, HowItWorks, Outcomes, Stats sections
- [x] Pricing (3 tiers), FAQ (accordion), Footer
- [x] Early Access Modal with form → backend API
- [x] Backend API: signup + duplicate detection + count
- [x] Mobile responsive (hamburger menu, stacked layout)
- [x] Full e2e testing passed (100% backend, 100% frontend)

## Backlog
- **P1**: Implement chosen logo (lighthouse concept - paused by user)
- **P1**: Connect CTA links to Google Sheet database (user requested unclickable for now)
- **P2**: Add Loom video embed to Founder Note section
- **P2**: Add email notification on early-access signup (reference backend has SMTP code)
- **P3**: Add testimonials section (content needed from user)
- **P3**: SEO meta tags and Open Graph optimization
