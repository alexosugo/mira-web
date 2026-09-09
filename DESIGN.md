---
name: Sellogram
description: Sellogram answers customers and helps them order in a shop's Instagram DMs.
source: The product rules in docs/imagery-handoff.md and the tokens in this file define the current landing-page system.
colors:
  paper: "#F2F6F3"
  paper-raised: "#E7EEE9"
  ink: "#1B2620"
  ink-light: "#49584F"
  ink-faint: "#58685E"
  line: "#DCE6DF"
  cobalt: "#0D5DA8"
  cobalt-deep: "#09477F"
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
  display: Archivo (400, 500, 600, 700)
  body: Source Sans 3 (400, 500, 600)
  mono: IBM Plex Mono (400, 500)
---

# Sellogram visual system

Direction: **editorial, sharp, colorful, and product-led**. Generated photography
shows the merchant world. Live HTML/CSS shows Sellogram acting in the shop DM.
The page must feel Instagram-native, not like a generic software landing page.

## Surfaces

- **Paper** (`#F2F6F3`) is the ground. Panels sit on white or raised paper with
  a single hairline border (`line`), no drop shadows by default.
- **Night** (`#0E1E17`) is for the footer and the NightShift section.
- **Cobalt** (`#0D5DA8`) can hold a full editorial chapter. Use its deep step
  for supporting surfaces. Rose, amber, and bright studio color stay in the
  photography. Do not mute them with beige or terracotta overlays.
- Light theme only. No dark-mode toggle.

## The Fern Rule

Fern (`#177E54`) means **Sellogram is acting or the customer takes the main
action**: shop reply bubbles, primary buttons, active controls, presence and
processing states (`fern-bright` on dark). Do not cover large areas with
bright fern — it guides attention, it does not dominate.

## The Dawn Rule

Dawn (`#A35F0C`) means **a commerce milestone**: a completed cart, an order
state, payment awaiting confirmation, a pricing highlight. Use sparingly and
never as a general decorative accent or a button color. If a new surface wants
dawn, it must be a money moment.

## Typography

- **Archivo** for display: page and major section headlines, tightly tracked.
- **Source Sans 3** for body, navigation, buttons, forms, and UI annotations.
- **IBM Plex Mono** for functional commerce detail only: KES figures,
  timestamps, order identifiers, plan limits, status labels, ledger lines.
  Do not use mono as decoration.
- Marketing kickers are banned. Start each section with its heading or the
  content itself. Functional status, time, price, and order labels can remain.

## Layout

- Most content uses a 12-column container between 1280 and 1440 px.
- The homepage hero image can extend to 1600 px. It must keep its full 3:2
  frame and remain larger than the DM UI that sits over it.
- Phone first. Comfortable reading widths, generous but purposeful whitespace.
- Sections separate by whitespace or a single hairline — no automatic
  alternating background stripes.
- Cards only when items are separate or selectable. Category collections use
  a stable grid and one image ratio. They must scan as one clear set.
- Let the subject determine the page structure. Use asymmetry only when it
  makes the message or sequence clearer.

## Primitives

- **Shop DM card:** live HTML/CSS with the shop name and neutral customer
  bubbles. The shop replies in fern.
- **Editorial image link:** photography, a hairline, a plain heading, and one
  useful line of copy. No shadowed software card surface.
- **Primary action:** a fern pill on light surfaces or a paper pill on cobalt.
- **Section heading:** Archivo display type with no kicker above it.

## Evidence

Photography establishes the merchant world. DM and product UI is live HTML/CSS,
not baked text. The shopper always messages the shop. Sellogram stays behind
the shop identity. Customer bubbles stay neutral paper-and-ink. Shop replies
use fern. Commerce states may use dawn. Conversations must read like real local
buying conversations. No robots, sparkles, gradient blobs, floating chat icons,
fake dashboards, generic card payments, or invented pickup flows.

## Motion

Motion shows cause and effect: one gesture, `animate-fade-in-up` (14px rise,
0.8s, ease-out-expo), staggered by `animation-delay`. No constant floating or
pulsing. Everything respects `prefers-reduced-motion` via the global override
in `index.css`.

The DM sales journey is the exception. It uses one pinned frame while normal
page scroll selects five discrete stages. The frame and progress dots do not
move. Stage content changes with a short opacity fade only. The dots have no
connector line.

## Accessibility

- WCAG 2.1 AA: every text style clears 4.5:1 on its surface (`ink-faint` and
  the on-dark steps are tuned to this floor).
- Focus-visible: 2px fern outline, 3px offset, global.
- Touch targets ≥ 44px; meaning never carried by color alone.
