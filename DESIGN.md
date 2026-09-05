---
name: Mira
description: Mira answers customers and helps them order in your Instagram DMs.
source: /docs in this repo summarise the canonical Mira brand bundle (MIRA-BRAND-SYSTEM.md, visual-tokens.json). When they conflict, the brand bundle wins.
colors:
  paper: "#F2F6F3"
  paper-raised: "#E7EEE9"
  ink: "#1B2620"
  ink-light: "#49584F"
  ink-faint: "#58685E"
  line: "#DCE6DF"
  fern: "#177E54"
  fern-deep: "#11603F"
  fern-bright: "#8BD9B3"
  dawn: "#A35F0C"
  dawn-deep: "#834B0A"
  dawn-bright: "#F0B254"
  night: "#0E1E17"
  night-raised: "#162C22"
  night-line: "#264436"
fonts:
  display: Fraunces (variable, 400–600, occasional italic emphasis)
  body: Instrument Sans (400, 500, 600)
  mono: IBM Plex Mono (400, 500)
---

# Mira Visual System

Direction: **quiet, useful and product-led**. A well-made commerce publication
combined with clear product evidence, not a generic software landing page.
Calm rather than urgency; practical work rather than abstract technology.

## Surfaces

- **Paper** (`#F2F6F3`) is the ground. Panels sit on white or raised paper with
  a single hairline border (`line`), no drop shadows by default.
- **Night** (`#0E1E17`) is for the footer and, at most, one strong dark
  narrative section per page. Intentional depth, not a dark-mode style.
- Light theme only. No dark-mode toggle.

## The Fern Rule

Fern (`#177E54`) means **Mira is acting or the customer takes the main
action**: Mira's reply bubbles, primary buttons, active controls, presence and
processing states (`fern-bright` on dark). Do not cover large areas with
bright fern — it guides attention, it does not dominate.

## The Dawn Rule

Dawn (`#A35F0C`) means **a commerce milestone**: a completed cart, an order
state, payment awaiting confirmation, a pricing highlight. Use sparingly and
never as a general decorative accent or a button color. If a new surface wants
dawn, it must be a money moment.

## Typography

- **Fraunces** for display: page and major section headlines, optical sizing
  on. Italic emphasis is occasional — one word, not every heading.
- **Instrument Sans** for body, navigation, buttons, forms, UI annotations.
- **IBM Plex Mono** for functional commerce detail only: KES figures,
  timestamps, order identifiers, plan limits, status labels, ledger lines.
  Do not use mono as a decorative section kicker — decorative kickers are not
  part of the content-page system.

## Layout

- `max-w-6xl` container, 12-column desktop grid, preferred splits 7/5, 5/7, 6/6.
- Phone first. Comfortable reading widths, generous but purposeful whitespace.
- Sections separate by whitespace or a single hairline — no automatic
  alternating background stripes.
- Cards only when items are genuinely separate or selectable; lists prefer
  editorial indexes (mono numerals + hairline dividers) over card grids.
- Let the subject determine the page structure; asymmetry is welcome where it
  clarifies product evidence.

## Evidence

Product screenshots and DM conversations are the evidence system; photography
is supportive. Customer bubbles stay neutral paper-and-ink; Mira bubbles are
fern; commerce states may use dawn; owner intervention is visually explicit.
Conversations read like real buying conversations. No robots, sparkles,
gradient blobs, floating chat icons or fake dashboards.

## Motion

Motion shows cause and effect: one gesture, `animate-fade-in-up` (14px rise,
0.8s, ease-out-expo), staggered by `animation-delay`. No constant floating or
pulsing. Everything respects `prefers-reduced-motion` via the global override
in `index.css`.

## Accessibility

- WCAG 2.1 AA: every text style clears 4.5:1 on its surface (`ink-faint` and
  the on-dark steps are tuned to this floor).
- Focus-visible: 2px fern outline, 3px offset, global.
- Touch targets ≥ 44px; meaning never carried by color alone.
