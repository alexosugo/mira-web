---
name: Mira
description: Your shop's teammate in the DMs. Mira answers, builds carts, and sells while you sleep.
colors:
  mist: "#F2F6F3"
  mist-raised: "#E7EEE9"
  slate: "#1B2620"
  slate-light: "#49584F"
  slate-faint: "#58685E"
  line: "#DCE6DF"
  fern: "#177E54"
  fern-deep: "#11603F"
  fern-bright: "#8BD9B3"
  fern-tint: "#E4F2EA"
  dawn: "#A35F0C"
  dawn-bright: "#F0B254"
  dawn-tint: "#FBF1E0"
  midnight: "#0E1E17"
  midnight-raised: "#162C22"
  midnight-line: "#264436"
fonts:
  display: Bricolage Grotesque (variable, 400–700)
  body: Figtree (400–700)
  mono: Spline Sans Mono (400, 500)
---

# Mira Visual System

Direction: **morning light**. A calm, warm companion product — SaaS clarity
with personal-assistant friendliness. The page tells the product's own story
in light: a soft garden-fresh ground, one forest-night passage (the night
shift), and dawn amber wherever money lands. Green, not blue: the palette
should feel like a fresh morning, never like developer documentation.

## Surfaces

- **Mist** (`#F2F6F3`) is the ground — soft, green-tinted off-white.
- Cards are white with **soft layered shadows** (`shadow-soft`; the hero demo
  and the highlighted plan step up to `shadow-lifted`). No hairline-only
  cards; the border token (`line`) is for inputs, dividers, and the unscrolled
  pill header.
- **Midnight** (`#0E1E17`) is a deep forest night, reserved for exactly two
  surfaces: the night-shift panel and the footer, both via `.bg-midnight-sky`
  (a hint of green dawn low on the horizon — never a glow or orb).
- Radii are generous: `rounded-3xl` panels and cards, pill buttons and chips.
- Light theme only. No dark-mode toggle.

## The Fern Rule

Fern green (`#177E54`) means **the product is acting**: Mira's chat bubbles,
her ledger lines (`fern-bright` on midnight), her presence dot, section
kickers, and every button and interactive control. One color says "Mira (or
the product) does this" — buttons included.

## The Dawn Rule

Dawn amber means **a sale closed**. It appears on the cart confirmation in
the hero chat (`dawn` on `dawn-tint`), the "Paid" line in the night ledger
(`dawn-bright`), the "Most popular" pricing tag, and the footer payoff line.
Never a button color. If a new surface wants dawn, it must be a money moment.

## Typography

- **Bricolage Grotesque** for display: weight 600, tight leading. Emphasis in
  headlines is a single fern- or dawn-colored word, never italics.
- **Figtree** for body and UI. Buttons are semibold.
- **Spline Sans Mono** for everything ledger-like: timestamps, KES figures,
  kickers (`.kicker` — 12px uppercase, 0.18em tracking), footnotes, trust
  strips. The mono is the brand's commerce texture.

## Atmosphere

`.bg-dawn-sky` is the page's only gradient device: garden light fading into
warm amber, used solely as the stage behind the hero DM demo. Subtle,
directional, and tied to the dawn narrative — not decoration.

## Layout

- `max-w-6xl` container. Section headers are centered (`max-w-2xl`); content
  below is a soft-card composition: a bento grid for what Mira handles
  (first two cards span wide), three connected step cards, three plan cards
  with the middle one lifted and ringed in fern.
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
  on mist, `dawn` on `dawn-tint`, white on `fern`, and the on-midnight
  `white/55+` steps are tuned to this floor).
- Focus-visible: 2px fern outline, 3px offset, global.
- Touch targets ≥ 40px; the header CTA is visible at every viewport (no
  hamburger, no sticky bar).
