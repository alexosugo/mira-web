---
target: hero
total_score: 31
p0_count: 0
p1_count: 1
timestamp: 2026-06-02T12-17-27Z
slug: src-components-hero-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | "Opening Mira..." busy state present |
| 2 | Match System / Real World | 4 | DM demo speaks the seller's world: Sasa, KES, CBD, M-Pesa |
| 3 | User Control and Freedom | 3 | Smooth-scroll secondary path; no traps |
| 4 | Consistency and Standards | 2 | Duplicate "Get started" CTAs; resting lime glow violates Glow rule |
| 5 | Error Prevention | 3 | Redirect double-fire guarded |
| 6 | Recognition Rather Than Recall | 4 | Demo shows the product instead of describing it |
| 7 | Flexibility and Efficiency | 3 | Clear single path; A/B infra intact |
| 8 | Aesthetic and Minimalist Design | 3 | Eyebrow pill and duplicate CTA add noise |
| 9 | Error Recovery | 3 | No failure surfaces in hero |
| 10 | Help and Documentation | 3 | "See how Mira works" anchors to explanation |
| **Total** | | **31/40** | **Good** |

## Anti-Patterns Verdict

Browser-verified this run (Playwright + dev server). Not slop at first glance. Contrast pixel-measured: all pairs AA in both themes (h1 15.6:1, subcopy 7.5/12.1:1, chip 14.5/~10:1, order line 7.6:1). No 320px overflow. Reduced-motion renders visible. Remaining generic accessories: "Built for Instagram sellers" eyebrow pill (banned kicker pattern) and duplicate "Get started" CTA pair.

Deterministic scan: CLI clean (exit 0). In-page detector (injected via live-server, headless, console-captured): 47 findings page-wide, 4 in hero scope, 3 of them verified false positives (overflow-clip heuristics, chip-as-nested-card); 1 true match (chat card 1px border + shadow-xl, design judgment). Remaining 43 findings are in Features/Benefits/How-it-works/Footer: icon-tile-stack x13, low-contrast x9 (incl. real 2.0:1 lime-on-white), bounce-easing, nested-cards x3.

## Priority Issues

- [P1] Mobile buries the proof (Hero.tsx:34,49): at 320px the ~6-line 48px headline + subcopy + CTAs fill the fold; DM demo entirely below it. Fix: text-4xl on mobile and/or reorder so a compact demo enters the first viewport.
- [P2] Resting lime glow on hero CTA (Hero.tsx:83-84): shadow-lg shadow-lime-500/20 at rest violates Glow-Earns-Its-Keep. Fix: neutral resting shadow, glow on hover only.
- [P2] Lime-signal dilution + duplicate CTA (Hero.tsx:74-90, Header.tsx:106-114): ~4 lime touches in first viewport, two identical "Get started" buttons; underline is lime-as-decoration. Fix: differentiate header CTA; consider navy underline.
- [P3] Eyebrow pill (Hero.tsx:38-44): banned kicker pattern. Fold qualifier into subcopy or cut.
- [P3] No-JS renders blank (verified blank page). Add noscript fallback or prerender.

## Persona Red Flags

- Jordan: pauses at two identical "Get started" buttons.
- Casey: headline eats the mobile fold; DM not visible without scrolling.
- Wanjiru: buried demo hits hardest; header toggle/hamburger 36x36 under the 44px project rule; JS drop = blank page.

## Minor Observations

- Default subcopy vaguer than voice doc ("product questions, recommendations, and orders" vs "pricing, stock, sizes, delivery").
- index.css ships unused chrome (shimmer, glass-card, pulse-glow, confetti).
- Reduced-motion leaves inline animationDelay un-zeroed (harmless).

## Questions to Consider

1. What would it cost to lead with the DM on small screens?
2. Is the header "Get started" earning its viewport space?
3. The detector found 43 issues outside the hero: is the hero now ahead of the rest of the page?
