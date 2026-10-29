# Sellogram Rebrand Design

Date: 2026-09-03
Branch: `feature/rebrand`
Status: Approved design direction; implementation pending final spec review

## 1. Brand decision

Sellogram replaces Mira everywhere as the public product and brand.

Mira is retired.

Sellogram is always treated as one cohesive word. It must never be abbreviated, split, or represented as `SG`. The identity must not create an `SG` monogram or any secondary naming system that enters Instagram's visual or naming territory.

The canonical wordmark casing is `Sellogram`: uppercase leading `S`, followed by lowercase `ellogram`.

## 2. Chosen identity direction

The supplied `Sellogram` artwork is the approved creative direction, not the final production geometry.

The production identity must preserve:

- uppercase leading `S` with lowercase `ellogram`
- one horizontal custom wordmark
- heavy, rounded, soft geometry
- compact, dense silhouette
- friendly but confident character
- strong rhythm through repeated rounded forms
- clear legibility as the single word `Sellogram`

The high-fidelity pass may refine geometry, spacing, counters, terminals, curves, optical balance, and small-size performance. It must not redesign the mark into a different concept.

## 3. Creative strategy

Use editorial continuity with a stronger logo.

Keep the strongest parts of the current website direction while making the Sellogram identity the primary distinctive brand object.

The working visual base is the current production system:

- pale green paper ground
- dark green-black ink
- fern green for Sellogram/product action
- dawn/amber for commerce moments
- Fraunces for editorial display
- Instrument Sans for body and UI
- IBM Plex Mono for commerce/data texture

These are starting points rather than immutable values. They may receive modest optical or contrast adjustments after the wordmark is tested in context.

The brand may borrow a controlled amount of rounded geometry from the wordmark, but the UI must not become bubbly, childish, or generic friendly-SaaS design.

## 4. Identity architecture

The authoritative Sellogram system has four layers.

### 4.1 Core identity

- primary Sellogram wordmark
- reversed/light wordmark
- monochrome black wordmark
- monochrome white wordmark
- compact non-initial identity for favicon/avatar/app-icon use
- clear-space rules
- minimum-size rules
- small-use optical correction only if required

### 4.2 Brand tokens

- official colors and semantic usage
- typography hierarchy
- surface/background rules
- logo/background pairings
- border and radius tendencies
- graphic shape language
- screenshot/photography treatment
- social layout principles

### 4.3 Channel kits

- website identity kit
- Instagram kit
- X kit
- email kit

### 4.4 Practical guidelines

A short, operational brand guide. It must be useful to people and agents and must not become a large presentation for its own sake.

## 5. Production order

Implementation proceeds through six gates. Downstream work must not be finalized before the upstream identity decision is approved.

### Gate 1 — High-fidelity wordmark

Refine the approved source into production geometry.

Primary refinement areas:

- `S` width, opening, weight balance, and relationship to the lowercase letters
- `e` aperture and counter
- repeated `l` rhythm
- `o` proportion
- `g` bowl and descender relationship
- `r` shoulder and exit
- `a` counter and terminal
- `m` width, arches, and ending balance
- stroke consistency
- corner softness
- terminal consistency
- curve tension
- rounded-letter overshoot
- pair spacing across `Se`, `el`, `ll`, `lo`, `og`, `gr`, `ra`, and `am`

The wordmark is treated as one optical object rather than typed letters.

#### First design round

Produce three serious refinements of the same chosen concept:

1. **Faithful** — closest to the supplied drawing; mainly geometry and spacing cleanup.
2. **Disciplined** — stronger optical consistency, counters, rhythm, and balance.
3. **Characterful** — preserves the concept but pushes the most distinctive successful traits slightly further.

These are not three new logo concepts.

For each candidate, present:

- large dark-on-paper wordmark
- reversed light-on-night wordmark
- monochrome treatment
- website-header-size preview
- approximately 120–160 px width preview
- side-by-side comparison with the source direction

Selection criteria:

- recognition: clearly the chosen logo idea
- distinctiveness: not typed text in a rounded font
- legibility: immediately reads `Sellogram`
- balance: no weak, swollen, or accidental letter
- ownability: credible as a long-lived identity
- versatility: works on light, dark, monochrome, web, social, and email surfaces

Preferred outcome: slightly tighter, cleaner, and better balanced, but not more polite or generic.

### Gate 2 — Compact identity

The compact identity must work from 16x16 favicon size through social avatar size.

It must never use `SG`.

Explore three territories derived from the wordmark:

- a recognizable wordmark fragment
- a proprietary loop/device derived from the wordmark's rounded counter geometry
- an extreme crop of the actual wordmark

Current preference: develop the loop/device territory first; keep extreme wordmark cropping available as a secondary graphic treatment.

Test candidates at:

- 16x16
- 32x32
- 180x180
- 192x192
- 512x512
- social-avatar scale

### Gate 3 — Core brand system

Start from current production tokens and test them beside the final identity.

Working palette:

- paper `#F2F6F3`
- ink `#1B2620`
- fern `#177E54`
- dawn `#A35F0C`

Working typography:

- Fraunces
- Instrument Sans
- IBM Plex Mono

Preserve the semantic distinction:

- fern = Sellogram/product action
- dawn = commerce/money moment

Do not spread accent colors indiscriminately.

### Gate 4 — Website production kit and implementation

Create and integrate:

- header wordmark
- footer/reversed wordmark
- favicon SVG
- favicon ICO
- 16x16 favicon
- 32x32 favicon
- 180x180 Apple touch icon
- 192x192 PWA icon
- 512x512 PWA icon
- default Open Graph image
- X/social sharing image

Replace Mira across current production implementation:

- visible name
- page titles
- metadata
- Open Graph metadata
- X metadata
- schema.org Product/Brand/WebSite data
- web manifest
- favicon references
- relevant theme metadata
- header/footer identity

The current website structure should not be redesigned merely to complete the rebrand.

### Gate 5 — Public channel kit

#### Instagram

Create:

- profile avatar
- 1080x1350 feed master
- 1080x1350 carousel master
- 1080x1920 story/reel-cover master
- launch/rebrand artwork
- product-feature format
- editorial/text format
- proof/customer-result format

Avoid template proliferation.

#### X

Create:

- profile avatar
- header/banner
- 1600x900 image-post master
- 1200x630 link/announcement card

X assets should be designed for X rather than resized Instagram compositions.

#### Email

Create:

- sender/avatar artwork
- compact wordmark
- lightweight HTML signature
- simple branded email header if required

Do not use image-heavy signatures.

### Gate 6 — Source of truth

Create an authoritative `brand/` structure:

```text
brand/
├── README.md
├── identity/
│   ├── wordmark/
│   └── symbol/
├── tokens/
│   ├── colors.json
│   └── typography.md
├── web/
├── social/
│   ├── instagram/
│   └── x/
├── email/
└── guidelines/
```

`brand/README.md` must state at minimum:

- Sellogram is the only active public brand.
- Mira is retired.
- The canonical wordmark casing is `Sellogram`: uppercase `S`, lowercase `ellogram`.
- Sellogram is one word.
- Sellogram must never be abbreviated as SG.
- master/vector sources are authoritative; PNGs are generated outputs.

## 6. Repository rules

The obsolete Mira `brand-assets/` package and obsolete `DESIGN.md` have already been removed from `feature/rebrand`.

Current production implementation and production design tokens remain as the starting context until deliberately replaced.

Do not resurrect removed Mira visual guidance during implementation.

Generated raster exports must not become the source of truth. Editable/vector masters are authoritative.

## 7. Quality controls

Before any gate is accepted:

- compare against the approved source direction
- inspect at intended real-world sizes
- test light, dark, and monochrome usage where relevant
- ensure `Sellogram` is legible as one word with its canonical casing
- verify no `SG` shorthand or split-word treatment has appeared
- verify no obsolete Mira visual assets or naming remain in the affected channel
- check accessibility contrast for web-facing uses

For website implementation, run the repository's normal lint, test, and build checks before completion.

## 8. Out of scope for this rebrand

Do not spend time on assets without a current public-channel use, including:

- business cards
- stationery systems
- merchandise
- presentation templates
- large-format print systems
- a long-form brand deck

These can be added later if a real use appears.
