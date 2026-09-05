# Slice 2: Product, feature, use-case, and integration pages

> Sub-issue of `linear-issue-mira-content-pages-parent.md`. Depends on slice 1.
> Ships 10 indexable routes. All copy lives in `src/content/pages.ts`; route
> files are thin typed wrappers under `src/pages/**`.

## Summary

Build the product-marketing content surface: pricing, how-it-works, the DM
automation landing page, the Instagram integration page, three feature pages, and
three use-case pages.

## Depends on

Slice 1 (`ContentLayout`, `pages.ts`, route-always Header/Footer, page-aware
analytics, test harness).

## Scope (10 routes)

- `src/pages/pricing.astro`
- `src/pages/how-it-works.astro`
- `src/pages/instagram-dm-automation.astro`
- `src/pages/integrations/instagram.astro`
- `src/pages/features/product-answers.astro`
- `src/pages/features/orders-and-checkout.astro`
- `src/pages/features/human-handoff.astro`
- `src/pages/use-cases/instagram-shops.astro`
- `src/pages/use-cases/fashion.astro`
- `src/pages/use-cases/beauty.astro`

## Page-by-page content direction

All H1s, CTAs, FAQs, and copy go in `pages.ts`. Route files import the page data
and render via `ContentLayout`. Each CTA carries a `trackingKey`.

### `/pricing` — "Pricing for Instagram Shops | Mira"

- H1: `Pricing for Instagram shops that sell in the DMs`.
- Reuse the canonical `PLANS` from `pages.ts` verbatim (Free, Pro, Elite). Add
  the FAQ and the "customer conversation" definition as expansion only.
- Define a customer conversation as: `one shopper thread Mira helps with.`
- FAQ: Is there a free plan? Do I need a card to start? Can I upgrade later?
  What happens when Mira needs me? Do you support M-Pesa checkout?
- CTAs: Free/Pro link to `https://app.withmira.co`; Elite opens the existing
  `EliteContactModal` (rendered as a React island with local state, as on the
  homepage).

### `/how-it-works` — "How it works | Mira"

- H1: `How Mira starts selling in your Instagram DMs`.
- Mirror the homepage's exact 3 steps from `pages.ts` verbatim (Connect your
  Instagram; Mira learns your catalog; Go live) — do **not** use the older
  "replies, builds carts, hands over" step wording (governing constraint 4).
- Add expansion sections: owner control (you can step in; tricky conversations
  are handed over; handoff includes context), and the reassurance line verbatim:
  `Mira reads only your shop's DMs, nothing else on your account.`

### `/instagram-dm-automation` — "Instagram DM Automation for Kenyan Shops | Mira"

- H1: `Instagram DM replies that help customers buy`.
- Explain the job in plain words: answer price, stock, size, recommendation,
  delivery, cart, and checkout questions.
- Use the phrase `Instagram DM automation` in title/meta and at least once in body
  for discoverability; keep copy conversational.
- Avoid "AI-powered" and "automation engine".

### `/integrations/instagram` — "Instagram Integration | Mira"

- H1: `Connect Mira to your Instagram shop`.
- Requirements: Instagram Business account; product/catalog source; owner
  permission.
- What Mira handles after connection: DMs, comments, product questions, checkout
  guidance.
- State Instagram is the current channel. Do not present WhatsApp, Facebook, or
  Telegram as current coverage.

### `/features/product-answers` — "Product Answers for Instagram DMs | Mira"

- H1: `Product answers without typing the same reply all day`.
- Cover: price, stock, sizes, recommendations, delivery basics.
- Explain Mira answers from the shop catalog and policies.
- Add examples in DM transcript style.

### `/features/orders-and-checkout` — "Orders and Checkout in Instagram DMs | Mira"

- H1: `From DM question to ready checkout`.
- Cover: add item to cart; confirm size/quantity; total order; delivery cost where
  known; M-Pesa-ready checkout link.
- Use the canonical product wording: `M-Pesa-ready checkout link` and
  `M-Pesa at checkout`. Do not claim payment completes inside Instagram.

### `/features/human-handoff` — "Human Handoff for Instagram DMs | Mira"

- H1: `Mira hands tricky DMs back to you`.
- Cover: owner can step in; handoff includes conversation context; good handoff
  examples (angry customer, unusual delivery request, refund, special discount,
  unclear product request).
- Tone: reassuring, not defensive.

### `/use-cases/instagram-shops` — "For Shops That Sell on Instagram DMs | Mira"

- H1: `For shops that sell through Instagram DMs`.
- Focus on the daily flow: posts/stories create demand, customers DM questions,
  owners answer manually, orders get lost when replies are slow.
- Show Mira as the teammate in that existing workflow. (This page also carries
  the ICP/positioning content that would have gone on `/customers`.)

### `/use-cases/fashion` — "DM Help for Fashion Shops | Mira"

- H1: `DM help for fashion shops`.
- Cover: sizes, colors, stock, styling recommendations, delivery, checkout.
- Kenya-relevant examples only where supported by product truth.

### `/use-cases/beauty` — "DM Help for Beauty Shops | Mira"

- H1: `DM help for beauty shops`.
- Cover: shade/product questions, stock, recommendations, delivery, checkout.
- Avoid medical, dermatology, or guaranteed-results claims.

## Homepage outbound links (governing constraint 3)

Do not change homepage section copy. Add one outbound link per section to its
dedicated page:

- `HowItWorks` section → `/how-it-works`.
- `Pricing` section → `/pricing`.
- (If `Handles` has a natural target, link to `/instagram-dm-automation`; otherwise
  leave handles as-is.)

These are additive links inside existing sections, not content rewrites.

## Metadata (every page)

Unique `<title>`, unique meta description, canonical URL, `og:title`,
`og:description`, `og:url`, Twitter card metadata, `robots` index/follow. Use the
exact titles from the parent route table.

## Acceptance criteria

- All 10 routes exist, render crawlable HTML, return 200.
- All copy is sourced from `pages.ts`; route files are thin wrappers.
- Pricing/how-it-works content reuses the canonical homepage values verbatim.
- No banned claims; no banned terms (test harness enforces).
- Each page's page view is correctly labeled; CTAs fire `trackCTA` with page
  context; Elite modal works on `/pricing`.
- Homepage renders unchanged except for the added outbound links.
- Unique titles/canonicals per page (test harness enforces).
- `npm run lint`, `npm run test`, `npm run build` pass.
- Manual: visit every URL; confirm header/footer work from nested routes like
  `/features/product-answers`; mobile and desktop widths; no text overflow.

## Notes for the implementing agent

- `/use-cases/instagram-shops` absorbs the ICP framing — write it to stand on its
  own as the "who Mira is for" page.
- Do not add `BreadcrumbList` (no category index pages exist — governing
  constraint 11). Do not add JSON-LD beyond site-wide here; slice 4 handles
  `Offer` and `FAQPage`.
