---
name: Mira
description: Your shop's teammate in the DMs. Mira answers, builds carts, and sells while you sleep.
colors:
  paper: "#FAF7F1"
  paper-raised: "#F3EEE4"
  ink: "#211C15"
  ink-light: "#5E5749"
  ink-faint: "#6E6657"
  line: "#E6DFD1"
  clay: "#B23E1D"
  clay-deep: "#933312"
  clay-bright: "#D96B45"
  night: "#1B1712"
  night-raised: "#262019"
  night-line: "#352D23"
fonts:
  display: Fraunces (variable, 400–600, italic for emphasis)
  body: Instrument Sans (400, 500, 600)
  mono: IBM Plex Mono (400, 500)
---

# Mira Visual System

Direction: **warm editorial calm**. Real hierarchy, intentional whitespace, restraint.
A page that earns trust through quiet craft, not decoration.

## Surfaces

- **Paper** (`#FAF7F1`) is the ground. Cards sit on white with a single hairline
  border (`line`), never a drop shadow.
- **Night** (`#1B1712`) is reserved for exactly two surfaces: the night-shift
  ledger and the footer. One dark moment per scroll gives the page its depth.
- Light theme only. No dark-mode toggle.

## The Clay Rule

Clay (`#B23E1D`) means **a sale closed**. It appears on the cart confirmation
in the hero chat, the "Paid" line in the night ledger, the "Most popular"
pricing tag, and nowhere else. CTAs are ink-filled pills — the accent is never
a button color. If a new surface wants clay, it must be a money moment.

## Typography

- **Fraunces** for display: weight 500, tight leading, optical sizing on.
  Italic is the only emphasis device in headlines (one word, used sparingly).
- **Instrument Sans** for body and UI.
- **IBM Plex Mono** for everything ledger-like: timestamps, KES figures,
  kickers (`.kicker` — 12px uppercase, 0.18em tracking), footnotes, trust
  strips. The mono is the brand's commerce texture.

## Layout

- `max-w-6xl` container, 12-column grid, asymmetric 7/5 or 5/6+offset splits.
- Sections are separated by whitespace (`py-24 → py-40`) or a single hairline,
  never background-color stripes.
- Lists are editorial indexes (mono numerals + hairline dividers), never card
  grids.

## Motion

One gesture: `animate-fade-in-up` (14px rise, 0.8s, ease-out-expo), staggered
by `animation-delay`. Hover states are color transitions only. Everything
respects `prefers-reduced-motion` via the global override in `index.css`.

## Accessibility

- WCAG 2.1 AA: every text style clears 4.5:1 on its surface (`ink-faint` and
  the on-dark `paper/55+` steps are tuned to this floor).
- Focus-visible: 2px clay outline, 3px offset, global.
- Touch targets ≥ 40px; the header CTA is visible at every viewport (no
  hamburger, no sticky bar).
