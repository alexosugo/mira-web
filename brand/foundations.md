# Sellogram visual foundations

This file records the visual system already used by the website. It is descriptive, not a redesign.

## Colour

| Token | Value | Use |
| --- | --- | --- |
| Paper | `#F2F6F3` | Default page background |
| Paper raised | `#E7EEE9` | Raised light surfaces |
| Ink | `#1B2620` | Primary text and dark marks |
| Ink light | `#49584F` | Secondary text |
| Ink faint | `#58685E` | Quiet text that must remain readable on Paper |
| Line | `#DCE6DF` | Hairline borders and dividers |
| Fern | `#177E54` | Primary action colour |
| Fern deep | `#11603F` | Fern hover/darker state |
| Fern bright | `#8BD9B3` | Fern on dark surfaces |
| Dawn | `#A35F0C` | Commerce accent |
| Dawn deep | `#834B0A` | Darker commerce text/accent |
| Dawn bright | `#F0B254` | Commerce accent on dark surfaces |
| Night | `#0E1E17` | Primary dark surface |
| Night raised | `#162C22` | Raised surface on Night |
| Night line | `#264436` | Dividers on Night |

### Colour roles

Fern is the action colour. Use it for primary actions, active product states, Sellogram responses, presence, and success states.

Dawn is the commerce colour. Use it for money, carts, payment, completed sales, and selected commercial emphasis. Do not use Dawn as the normal primary button colour.

Night is the dark surface. Use it for deliberate high-contrast sections and the footer, with the bright Fern and Dawn variants where needed.

Paper and Ink are the default ground and foreground. Most of the public experience should remain here.

## Typography

### Display — Archivo

Use Archivo for major headings and editorial display copy. It provides contrast against the rounded Sellogram wordmark and the functional interface typography.

### Body and UI — Source Sans 3

Use Source Sans 3 for body copy, navigation, buttons, form controls, labels, and interface text.

### Data and utility — IBM Plex Mono

Use IBM Plex Mono for prices, timestamps, compact labels, commerce details, status lines, and small data-led text.

## Shape and surfaces

The current interface already has the required rounded language. Do not make it rounder as part of the rebrand.

- Primary and secondary CTA buttons use `rounded-full`.
- Conversational cards and message surfaces commonly use `rounded-2xl`.
- Small exceptions may tighten one corner to indicate message direction.
- Pricing and structural layouts prefer hairline rules and open columns over heavy cards.
- Borders use the Line tokens rather than strong outlines.
- Shadows are restrained. Prefer borders, spacing, and surface contrast.

## Motion

Use one primary entrance treatment: `fade-in-up`.

- duration: `0.8s`
- easing: `cubic-bezier(0.16, 1, 0.3, 1)`
- movement: short upward rise with opacity fade
- stagger only where it helps reading order
- respect `prefers-reduced-motion`

Do not add a second decorative motion language without a specific product need.

## Small labels

Section kickers use IBM Plex Mono, uppercase, small size, and wide tracking. The implementation utility is `.kicker`.

## Source of truth

- Production tokens: `tailwind.config.js`
- Base typography, focus, selection, kicker, and motion: `src/index.css`
- Brand identity masters: `brand/identity/`

If a future design change alters these foundations, update this file and the corresponding implementation together.
