---
name: Mira
description: Your shop's teammate in the DMs. Mira answers, builds carts, and sells while you sleep.
colors:
  mist: "#F3F6FB"
  mist-raised: "#E9EEF7"
  slate: "#1C2433"
  slate-light: "#4D5A70"
  slate-faint: "#5C6A80"
  line: "#DFE6F1"
  dusk: "#4757D6"
  dusk-deep: "#3848BE"
  dusk-bright: "#9DACF8"
  dusk-tint: "#E8ECFB"
  dawn: "#A35F0C"
  dawn-bright: "#F0B254"
  dawn-tint: "#FBF1E0"
  midnight: "#10172B"
  midnight-raised: "#1A2240"
  midnight-line: "#28335C"
fonts:
  display: Bricolage Grotesque (variable, 400–700)
  body: Figtree (400–700)
  mono: Spline Sans Mono (400, 500)
---

# Mira Visual System

Direction: **morning light**. A calm, airy companion product — SaaS clarity
with personal-assistant warmth. The page tells the product's own story in
light: a soft daytime ground, one midnight passage (the night shift), and
dawn amber wherever money lands.

## Surfaces

- **Mist** (`#F3F6FB`) is the ground — cool, airy, blue-white.
- Cards are white with **soft layered shadows** (`shadow-soft`; the hero demo
  and the highlighted plan step up to `shadow-lifted`). No hairline-only
  cards; the border token (`line`) is for inputs, dividers, and the unscrolled
  pill header.
- **Midnight** (`#10172B`) is reserved for exactly two surfaces: the
  night-shift panel and the footer, both via `.bg-midnight-sky` (a hint of
  dusk light low on the horizon — never a glow or orb).
- Radii are generous: `rounded-3xl` panels and cards, pill buttons and chips.
- Light theme only. No dark-mode toggle.

## The Dusk Rule

Dusk indigo (`#4757D6`) means **the product is acting**: Mira's chat bubbles,
her ledger lines (`dusk-bright` on midnight), her presence dot, section
kickers, and every button and interactive control. One color says "Mira (or
the product) does this" — buttons included, unlike the old clay system.

## The Dawn Rule

Dawn amber means **a sale closed**. It appears on the cart confirmation in
the hero chat (`dawn` on `dawn-tint`), the "Paid" line in the night ledger
(`dawn-bright`), the "Most popular" pricing tag, and the footer payoff line.
Never a button color. If a new surface wants dawn, it must be a money moment.

## Typography

- **Bricolage Grotesque** for display: weight 600, tight leading. Emphasis in
  headlines is a single dusk- or dawn-colored word, never italics.
- **Figtree** for body and UI. Buttons are semibold.
- **Spline Sans Mono** for everything ledger-like: timestamps, KES figures,
  kickers (`.kicker` — 12px uppercase, 0.18em tracking), footnotes, trust
  strips. The mono is the brand's commerce texture.

## Atmosphere

`.bg-dawn-sky` is the page's only gradient device: periwinkle light fading
into warm amber, used solely as the stage behind the hero DM demo. Subtle,
directional, and tied to the dawn narrative — not decoration.

## Layout

- `max-w-6xl` container. Section headers are centered (`max-w-2xl`); content
  below is a soft-card composition: a bento grid for what Mira handles
  (first two cards span wide), three connected step cards, three plan cards
  with the middle one lifted and ringed in dusk.
- The night-shift ledger is a left-rail **timeline** (dots colored by actor)
  inside the inset midnight panel.
- The header is a floating pill (`max-w-5xl`) that lifts to white + shadow
  on scroll.
- Sections breathe with `py-20 → py-28`; depth comes from shadows and the
  two sky panels, never background stripes.

## Motion

One gesture: `animate-fade-in-up` (14px rise, 0.8s, ease-out-expo), staggered
by `animation-delay`. Hover states are color transitions only. Everything
respects `prefers-reduced-motion` via the global override in `index.css`.

## Accessibility

- WCAG 2.1 AA: every text style clears 4.5:1 on its surface (`slate-faint`
  on mist, `dawn` on `dawn-tint`, white on `dusk`, and the on-midnight
  `white/55+` steps are tuned to this floor).
- Focus-visible: 2px dusk outline, 3px offset, global.
- Touch targets ≥ 40px; the header CTA is visible at every viewport (no
  hamburger, no sticky bar).
