---
target: typography
total_score: 31
p0_count: 0
p1_count: 2
timestamp: 2026-06-02T14-36-00Z
slug: tailwind-config-js
---
# Critique: typography system (Bricolage Grotesque / IBM Plex Sans / JetBrains Mono)

## Typography Health Score (10 dimensions, 0-4)

| # | Dimension | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Pairing strategy | 4 | Bricolage/Plex/JetBrains contrast axis works; display font verifiably carries personality |
| 2 | Hierarchy / scale | 2 | Flat h3-body step (20px/18px = 1.11, under 1.25); h1 == h2 at 36px on mobile |
| 3 | Weight usage | 3 | Clean 800/700/600/400 ladder, but hierarchy over-relies on weight where scale should carry it |
| 4 | Readability (body) | 3 | Good 1.6 leading; pricing/chat body at 14px; smallest text 11px (handoff caption) |
| 5 | Line length / measure | 4 | Widest body ~67ch, inside 65-75ch |
| 6 | Letter-spacing | 4 | -0.025em on display, above the -0.04em floor; body at normal |
| 7 | Consistency across sections | 2 | All six section h2s byte-identical; zero rogue sizes but zero differentiation |
| 8 | Mono / accent discipline | 2 | Prices render in Bricolage display, NOT JetBrains Mono: contradicts DESIGN.md; mono reduced to chips + copyright year |
| 9 | Loading performance | 3 | 3 woff2 grouped files, display=swap, no italic bloat; 8 of 16 requested weights never render; no hero-font preload |
| 10 | Register fit / personality | 4 | Reads as the shopkeeper's teammate, not corporate SaaS |
| **Total** | | **31/40** | **Good** |

## Measured reality (browser-verified)

- Rendered scale: 72 / 48 / 36 / 24 / 20 / 18 / 16 / 14 / 12.6 / 12 / 11 px; 34 distinct computed combos; 3 families render as configured.
- Loaded faces (document.fonts): Bricolage 600/700/800, Plex 400/500/600/700, JetBrains Mono 400 = 8 of 16 requested (Bricolage 200-500, Plex 300, Mono 500-700 never render).
- font-display: swap (all 75 @font-face decls); preconnect present, no preload; font CSS 1.6KB (woff2 bytes opaque cross-origin; A's earlier capture measured ~148KB total).
- tracking-tight only on large Bricolage headings; no uppercase, no positive tracking anywhere.
- text-wrap: balance verified on h1/h2/h3; clean 3-line hero break at 390px.
- Detector: zero real typography findings. gradient-text x2 = detector self-match (0 bg-clip-text in src); gray-on-color x5 = navy-100-on-navy FP family (12.6:1).

## The headline finding

**The documented type system and the shipped type system are two different systems.** tailwind.config.js defines a full token scale (display-xl 80, h1 64, h2 56, h3 40, body-lg, stat 48 with baked-in line-heights/weights/tracking) and index.css carries mobile overrides for it: all with ZERO usage. Components use raw Tailwind defaults (text-4xl/5xl/7xl). The DESIGN.md 80/56/32 scale never ships.

## What's Working

1. The pairing genuinely earns its keep: Bricolage's flared terminals are visibly not a generic geometric sans, against plainspoken Plex.
2. Tracking and measure are near-flawless: -0.025em display, ~67ch max measure, balance on headings.
3. Lean delivery: 3 grouped woff2 files, swap, no italics, no FOIT.

## Priority Issues

- **[P1] Prices render in display, not mono.** Pricing's KES 0 / KES 3,500 use font-display; DESIGN.md makes prices the canonical JetBrains Mono use ("the product shows its working"). Mono is left as garnish (chips + copyright year). **Fix**: numeric prices in font-mono + tabular-nums (the unused .stat-number/stat token exists for exactly this); "Custom" stays display. **Suggested command**: /impeccable typeset.
- **[P1] Flat h3-body hierarchy step.** Card h3s 20px/700 over 18px/400 body = 1.11 ratio across Problem/Features/Benefits; separation rides on weight alone. **Fix**: card h3 to 22-24px, creating a real third tier. **Suggested command**: /impeccable typeset.
- **[P2] Six byte-identical section h2s** (text-4xl lg:text-5xl font-bold): uniform vocal volume, no climax. **Fix**: step secondary sections (HowItWorks/Benefits) down a tier per the DESIGN.md Headline-vs-Title distinction. **Suggested command**: /impeccable typeset.
- **[P2] Mobile: h1 and h2 both 36px** (weight 800 vs 700 is the only difference) on the audience's primary viewport. **Fix**: h1 text-5xl at base or adopt the display token. **Suggested command**: /impeccable typeset + adapt.
- **[P2] Dead type tokens.** The whole custom fontSize scale + index.css overrides have zero usage; the spec lies. **Fix**: adopt the tokens or delete them (and update DESIGN.md to the real scale). **Suggested command**: /impeccable extract or typeset.
- **[P3] No hero-font preload**: hero h1 (LCP) waits on CSS-then-woff2; preload requires a stable URL (self-hosting). **Suggested command**: /impeccable optimize.

## Minor Observations

- Trim the Google Fonts URL to the 8 faces that render (Bricolage 600-800, Plex 400-700, Mono 400): smaller CSS, same render.
- "Nia, that's you" caption is 11px; chat metadata 12.6px: legibility floor territory on mobile.
- Pricing card body at 14px is debatable for decision-critical copy.
- Header logo 20px vs footer brand 24px: acceptable contextual sizing.

## Questions to Consider

1. If mono "shows the product working," why is it absent from the most product-credible numbers on the page?
2. Six identical 48px headings: does the page have an argument with a climax, or just equal-volume sections?
3. Which is the real design system: the documented 80/56/32 scale or the shipped 72/48/20? They need to become one.
