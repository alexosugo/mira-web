---
name: Mira
description: Your shop's teammate in the DMs. Mira answers, builds carts, and sells while you sleep.
colors:
  night-shift-navy: "#13243E"
  navy-deepest: "#0a1628"
  navy-ink: "#0f172a"
  navy-slate: "#2d4a6f"
  navy-mist: "#94adc9"
  navy-haze: "#e0e7f0"
  fresh-lime: "#C0DC2D"
  lime-bright: "#c4e538"
  warm-white: "#fafaf9"
  warm-mist: "#f5f5f4"
  success-green: "#10b981"
  coral: "#f97316"
  amber: "#fbbf24"
typography:
  display:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "80px"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "56px"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "32px"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.5
rounded:
  lg: "12px"
  xl: "16px"
  2xl: "20px"
  3xl: "24px"
  4xl: "32px"
  pill: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.fresh-lime}"
    textColor: "{colors.night-shift-navy}"
    rounded: "{rounded.xl}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.lime-bright}"
  button-secondary:
    backgroundColor: "#1a2942"
    textColor: "#ffffff"
    rounded: "{rounded.xl}"
    padding: "12px 24px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.fresh-lime}"
    rounded: "{rounded.xl}"
    padding: "12px 24px"
  card-solid:
    backgroundColor: "#ffffff"
    rounded: "{rounded.2xl}"
    padding: "32px"
  card-dark:
    backgroundColor: "{colors.navy-deepest}"
    textColor: "{colors.navy-haze}"
    rounded: "{rounded.2xl}"
    padding: "32px"
  input-floating:
    backgroundColor: "rgba(255, 255, 255, 0.05)"
    textColor: "#ffffff"
    rounded: "{rounded.xl}"
    padding: "16px"
---

# Design System: Mira

## 1. Overview

**Creative North Star: "The Shopkeeper's Teammate"**

Mira's interface feels like a capable friend behind the counter: warm light surfaces, plain talk, and one bright lime signal that says "Mira is on." The system is built for Kenyan Instagram sellers on phones, so warmth never comes at the cost of clarity, and every surface earns trust through specifics (a real DM transcript doing commerce) rather than claims. Bricolage Grotesque gives headlines a friendly, characterful confidence; IBM Plex Sans keeps the body grounded and legible; JetBrains Mono appears in small doses where the product shows its working (prices, order numbers, chat metadata).

The system explicitly rejects the generic SaaS landing (gradient blobs, hero metrics, identical card grids), corporate enterprise sobriety, Silicon Valley AI hype (neon glows, sparkle motifs), and the cheap template look. Mira asks shop owners to hand over their DMs; the craft level of the page is the proof it deserves that trust.

Both light and dark themes are first-class (`darkMode: 'class'`). Light is the default storefront; dark is the night shift.

**Key Characteristics:**
- Warm, capable, grounded; a teammate, not a tool
- One accent: Fresh Lime does the signaling, everything else stays calm
- DM-native: chat transcripts and commerce moments are the hero visuals
- Mobile-first density, generous touch targets, friendly tactile components
- Layered depth with glow reserved for state, not decoration

## 2. Colors

A navy foundation that works the night shift, warm neutrals for daylight surfaces, and a single lime signal that means "Mira is on."

### Primary
- **Fresh Lime** (#C0DC2D): The brand's one loud voice. CTAs, the active toggle, focus rings, "Mira is typing" moments. Used on roughly 10% of any screen; paired with Night Shift Navy text, never white.
- **Lime Bright** (#c4e538): Hover state of Fresh Lime surfaces.

### Secondary
- **Night Shift Navy** (#13243E): Headings and body ink on light surfaces; the brand's grounded counterweight to the lime.
- **Navy Deepest** (#0a1628): Dark-theme page background and dark card gradients.
- **Navy Ink** (#0f172a): Dark-theme surface layer.
- **Navy Slate** (#2d4a6f): Secondary button hover, borders on dark surfaces.

### Tertiary
- **Success Green** (#10b981): Confirmations, completed orders, positive states only.
- **Coral** (#f97316): Warnings and secondary highlights, used sparingly.
- **Amber** (#fbbf24): Caution and tertiary accents; decorative use is rationed.

### Neutral
- **Warm White** (#fafaf9): Light-theme page background.
- **Warm Mist** (#f5f5f4): Light-theme section tints and dividers.
- **Navy Haze** (#e0e7f0): Dark-theme body text.
- **Navy Mist** (#94adc9): Dark-theme dimmed text; on light surfaces only at large sizes (fails 4.5:1 for body).

### Named Rules
**The One Signal Rule.** Fresh Lime is the only color allowed to shout. It marks what Mira is doing or what the visitor should do next, never decoration. If lime covers more than ~10% of a screen, something is wrong.

**The Lime-on-Navy Rule.** Fresh Lime text or icons sit on navy; navy text sits on lime. Lime on white and white on lime are both forbidden (contrast failures).

## 3. Typography

**Display Font:** Bricolage Grotesque (with sans-serif fallback)
**Body Font:** IBM Plex Sans (with sans-serif fallback)
**Label/Mono Font:** JetBrains Mono (with monospace fallback)

**Character:** Bricolage's quirky, slightly flared letterforms carry the "helpful friend" personality at display sizes; Plex Sans keeps paragraphs plainspoken and trustworthy. The mono appears only where the product shows real data: prices, stock counts, timestamps in chat mocks.

### Hierarchy
- **Display** (800, 80px desktop scaling down, 0.95 line-height, -0.03em): Hero headline only. One per page.
- **Headline** (700, 56px, 1.1): Section headings.
- **Title** (600, 32px, 1.3): Card titles, subsection heads, pricing plan names.
- **Body** (400, 18px, 1.6): Paragraphs; max line length 65–75ch. Body Large (20px) for hero subcopy.
- **Label** (500, 14px, JetBrains Mono): Chat metadata, prices, badges. Never full sentences.

### Named Rules
**The One Display Rule.** Exactly one display-scale element per page, in the hero. Everything else steps down through the scale; competing displays cancel each other out.

## 4. Elevation

Layered, with glow as state. Surfaces get structure from soft ambient shadows and subtle borders; the lime glow is a *response*, not a decoration. It appears when something is interactive and engaged (hover on a primary CTA, an active input, "Mira is replying") and disappears at rest. Glass treatments (backdrop blur, translucent borders) are reserved for the floating header and overlays, not default card chrome.

### Shadow Vocabulary
- **Resting card** (`0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)`): Default card structure on light surfaces.
- **Lifted** (`0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)`): Hover state of interactive cards, paired with `-translate-y-2`.
- **Glow** (`0 0 20px rgba(192,220,45,0.3)`): Engaged lime elements only.
- **Glow large** (`0 0 40px rgba(192,220,45,0.4)`): Primary CTA hover.
- **Premium** (`0 20px 40px -10px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1)`): Modals and the floating header when scrolled.

### Named Rules
**The Glow-Earns-Its-Keep Rule.** Lime glow appears only on interactive elements in an engaged state (hover, focus, active). A glowing static badge is prohibited.

## 5. Components

Friendly and tactile: generous radii, visible press states, components that invite touching. Built for thumbs first.

### Buttons
- **Shape:** Generously rounded (16px radius at default size; pill in the header nav).
- **Primary:** Fresh Lime background, Night Shift Navy text, semibold, 12px × 24px padding. Hover: lime brightens, lifts 2px, glow-large appears. Active: presses down to 98% scale.
- **Hover / Focus:** 300ms premium ease (`cubic-bezier(0.16, 1, 0.3, 1)`); focus ring is `lime-500/50` with 2px offset, always visible for keyboard users.
- **Secondary:** Navy (#1a2942) surface, white text, navy-slate border. **Outline:** transparent with 2px lime/50 border, lime text, fills to lime/10 on hover. **Ghost:** text-only, for tertiary actions.

### Chips / Badges
- **Style:** Soft tinted gradient backgrounds (emerald, sky, lime, or warm families at 50–100 weight), 1px translucent border in the same hue, icon + short label.
- **State:** Informational only, never interactive. No pulsing or glowing at rest.

### Cards / Containers
- **Corner Style:** 20–24px radius (rounded-2xl default).
- **Background:** White with hairline gray border (light); navy-deepest gradient with a faint lime/10 border (dark variant).
- **Shadow Strategy:** Resting card shadow; lifts with hover shadow + `-translate-y-2` only when the card is genuinely clickable.
- **Internal Padding:** 32px default (24px on small screens).

### Inputs / Fields
- **Style:** Floating label pattern; translucent surface (`white/5` with backdrop blur on dark), 1px `white/15` border, 16px radius, 16px padding.
- **Focus:** Border shifts to lime/50, 2px lime/20 ring, label floats up and turns lime.
- **Error:** Red-500/50 border, red-400 label and message, message slides down 300ms.

### Navigation
- **Style:** Floating pill header, max-width 3xl, glass treatment that solidifies on scroll. Nav links are small pill buttons (14px medium) that tint on hover. Primary CTA lives in the header as a lime pill. Mobile: full-width sheet with stacked links and a full-width lime CTA.

### Chat Transcript (signature component)
The DM conversation mock is Mira's most important proof surface. Customer bubbles align left on a neutral surface; Mira's replies carry the brand (navy in light theme, lime accents for actions like "added to cart"). Prices and order details render in JetBrains Mono. It must read as a believable Instagram DM thread, not a stylized illustration.

## 6. Do's and Don'ts

### Do:
- **Do** reserve Fresh Lime (#C0DC2D) for the one thing that matters on each screen: the CTA, the active state, the "Mira is on" signal.
- **Do** pair lime exclusively with navy: navy text on lime fills, lime icons on navy surfaces.
- **Do** show a believable DM transcript doing commerce wherever the product needs proving; demonstrations over adjectives.
- **Do** keep touch targets ≥44px and test every section at 320px width; the audience is on phones.
- **Do** give every animation a `prefers-reduced-motion: reduce` alternative and keep motion on transform/opacity.
- **Do** verify both themes independently hit WCAG AA contrast (navy-mist #94adc9 is dark-theme-only for body text).

### Don't:
- **Don't** build the "generic SaaS landing": gradient blobs, hero-metric blocks, identical icon-heading-text card grids (PRODUCT.md anti-reference).
- **Don't** drift "corporate enterprise": dense jargon, navy-suit sobriety, Salesforce/IBM energy (PRODUCT.md anti-reference).
- **Don't** touch "Silicon Valley AI hype": neon-glow dark mode as default, sparkle motifs, "magic" framing (PRODUCT.md anti-reference).
- **Don't** ship the "cheap template look": default Bootstrap/ThemeForest patterns that undercut the trust ask (PRODUCT.md anti-reference).
- **Don't** apply glow, shimmer, or float animations to static elements; glow is earned by interaction state.
- **Don't** use gradient text, side-stripe borders, or glassmorphism as default card chrome.
- **Don't** put lime on white or white on lime; both fail contrast.
- **Don't** use exclamation points or banned vocabulary ("AI-powered", "streamline", "our platform") anywhere in UI copy; see `docs/voice-and-tone.md`.
