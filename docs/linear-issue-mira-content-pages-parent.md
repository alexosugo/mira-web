# Epic: Add SEO and AI-discoverable content pages for Mira

> Parent epic. This doc supersedes `linear-issue-mira-content-pages.md`, which is
> kept for reference. Implementation is split into four sequenced sub-issues
> (slices), one file each:
> - `linear-issue-mira-content-pages-slice-1-infra.md`
> - `linear-issue-mira-content-pages-slice-2-product-pages.md`
> - `linear-issue-mira-content-pages-slice-3-trust-legal.md`
> - `linear-issue-mira-content-pages-slice-4-structured-data.md`

## Summary

Create dedicated, crawlable content pages for Mira so search engines, LLMs, AI
agents, and other web entities can understand what Mira does and recommend it
for relevant queries.

Today `https://withmira.co` is a single Astro homepage. Product, feature, trust,
legal, and support topics exist only as homepage sections or not at all. Every
requested content URL currently returns `404`.

## Why an epic, not one issue

18 routes, two new layouts, a Header/Footer navigation refactor, sitemap/robots
rewrites, `llms.txt` endpoints, page-aware analytics, and structured data are
independent risk surfaces that are hard to review, roll back, or verify as one
ticket. Slices let the navigation refactor land before any content depends on
it, isolate the highest-risk legal copy, and add structured data last against
existing HTML.

## Slice breakdown (strict dependency order)

| Slice | Scope | Routes | Depends on |
|-------|-------|--------|------------|
| 1 | Shared infra: `BaseLayout` props, `ContentLayout`, page-aware `page-init` + analytics wiring, Header/Footer route-always refactor, `@astrojs/sitemap`, robots, `/llms.txt` + `/llms-full.txt` endpoints, test harness | 0 (infra only) | — |
| 2 | Product / feature / use-case / integration pages | 10 | Slice 1 |
| 3 | Trust / legal / company pages (2 noindex) | 7 | Slice 1 |
| 4 | JSON-LD / structured-data pass across all pages | 0 (additive) | Slices 2 + 3 |

Total: **17 routes** (`/customers` deferred — see Governing constraint 7).

## Route set (17)

| Route | Slice | Indexable | `<title>` |
|-------|-------|-----------|-----------|
| `/pricing` | 2 | yes | Pricing for Instagram Shops \| Mira |
| `/how-it-works` | 2 | yes | How it works \| Mira |
| `/instagram-dm-automation` | 2 | yes | Instagram DM Automation for Kenyan Shops \| Mira |
| `/integrations/instagram` | 2 | yes | Instagram Integration \| Mira |
| `/features/product-answers` | 2 | yes | Product Answers for Instagram DMs \| Mira |
| `/features/orders-and-checkout` | 2 | yes | Orders and Checkout in Instagram DMs \| Mira |
| `/features/human-handoff` | 2 | yes | Human Handoff for Instagram DMs \| Mira |
| `/use-cases/instagram-shops` | 2 | yes | For Shops That Sell on Instagram DMs \| Mira |
| `/use-cases/fashion` | 2 | yes | DM Help for Fashion Shops \| Mira |
| `/use-cases/beauty` | 2 | yes | DM Help for Beauty Shops \| Mira |
| `/security` | 3 | yes | Security \| Mira |
| `/privacy` | 3 | **noindex** | Privacy Policy \| Mira |
| `/terms` | 3 | **noindex** | Terms of Service \| Mira |
| `/data-deletion` | 3 | yes | Data Deletion \| Mira |
| `/about` | 3 | yes | About \| Mira |
| `/contact` | 3 | yes | Contact \| Mira |
| `/help` | 3 | yes | Help \| Mira |

Title rule: every page uses `{Phrase} | Mira`. If the phrase would contain
"Mira" (e.g. "About Mira", "Help with Mira", "How Mira works"), drop brand from
the phrase so the title never says "Mira" twice. Visible H1s may differ from the
`<title>` and keep their natural wording.

## Governing constraints (apply to every slice)

These decisions were resolved upstream and are binding. Do not re-litigate them
inside a slice; raise a new decision if a constraint blocks work.

1. **Content storage = typed TS module.** All page copy lives in
   `src/content/pages.ts` behind a shared typed schema (kicker, H1, intro, CTA,
   sections[], faq[]). No Astro Content Collections. Route files are thin typed
   wrappers. Add a lint/test that asserts banned terms do not appear in the
   content module.

2. **Navigation = route-always.** `Header` and `Footer` become static-link
   components. Remove `scrollToSection` from global nav. Links are real routes
   (`/pricing`, etc.) everywhere. The components need no route awareness. Logo
   links to `/`. `Get started` stays `https://app.withmira.co`.

3. **Homepage content is frozen.** Do not change homepage section copy. Each
   homepage section gains one outbound link to its full dedicated page. The
   footer gains grouped route links. Homepage sections continue to read from the
   shared content module so homepage and dedicated pages share one source of
   truth.

4. **Source of truth = live homepage copy.** Where a dedicated page and the
   homepage share content (Pricing plans, How-it-works steps), the live homepage
   copy is canonical and is sourced through `pages.ts`. Dedicated pages reuse
   those values verbatim and layer expansion (FAQ, definitions, extra sections).

5. **Sitemap = `@astrojs/sitemap`.** Install the integration; it auto-discovers
   routes. Configure it to exclude the two noindex routes (`/privacy`, `/terms`).
   `/llms.txt` and `/llms-full.txt` still need a hand-maintained link list
   because the integration only emits the sitemap.

6. **Legal = risk-tiered.** `/data-deletion`, `/security`, `/about`, `/contact`,
   `/help` ship indexable. `/privacy` and `/terms` ship **`noindex`** (robots
   meta + excluded from sitemap) until legal review, then flip to index in a
   tracked follow-up. `/privacy` and `/terms` copy must be drafted against the
   actual backend data practices (retention, subprocessors), not invented.

7. **`/customers` is deferred.** A trust page whose job is proof, shipping with
   a guarantee of no proof, signals "no customers." It is removed from this epic
   and will ship behind a concrete trigger: one approved customer quote or one
   usage number. ICP content lives in `/use-cases/instagram-shops`.

8. **`<meta name="keywords">` is dropped.** It is ignored by Google and currently
   leaks voice-violating terms ("AI customer service", "Kenya SME chatbot").
   Removed during the `BaseLayout` refactor.

9. **`/llms.txt` and `/llms-full.txt` are both generated.** Both endpoints ship.
   Both are generated from the shared content/route registry — not hand-maintained
   prose — so they cannot drift from the HTML. `/llms.txt` is the concise summary;
   `/llms-full.txt` is the expanded version rendered from the same `pages.ts` data.

10. **Analytics is page-aware.** `page-init.ts` currently hardcodes
    `trackPageView('Landing Page', 'main')`. `ContentLayout` takes a `pageName`
    prop (sourced from `pages.ts`), writes it to a `data-page-name` attribute;
    `page-init` reads that attribute and falls back to `'Landing Page'` on `/`.
    Each CTA in the content schema carries a `trackingKey` so clicks fire
    `trackCTA` with page context; email links reuse `contact_link_clicked`.

11. **JSON-LD scope.** Site-wide: `WebSite` + `Product` (existing) + `Organization`
    (url, name, contact email). `/pricing`: `Offer` entries for factual prices.
    `/how-it-works`, `/pricing`, `/help`, feature pages: visible FAQ blocks +
    matching `FAQPage`. Legal pages: normal metadata only. **No `BreadcrumbList`**
    (no category index pages exist). Every JSON-LD node must be traceable to
    visible page content — no field that is not also shown on the page.

12. **Testing = automated assertions.** Encode the mechanical guarantees as tests:
    every registry route resolves 200; every page has a unique `<title>` and
    canonical; the content module contains zero banned terms; every `FAQPage`
    node matches a visible FAQ block; `/privacy` and `/terms` carry `noindex`;
    the sitemap includes all indexable routes and excludes the two noindex routes.
    Manual QA shrinks to genuine human-judgment items (visual overflow, keyboard
    focus order, mobile layout).

## Product truth (do not change without a separate product decision)

- Mira is for Kenyan shop owners who sell through Instagram.
- Mira answers Instagram DMs.
- Mira handles product questions, pricing, stock, sizes, recommendations,
  delivery questions, carts, and checkout guidance.
- Mira guides customers toward M-Pesa-ready checkout.
- Mira hands tricky conversations back to the owner.
- Mira is built in Kenya and priced in KES.
- Pricing (from `src/components/Pricing.tsx` `PLANS`):
  - Free: `KES 0/mo`, up to 10 customer conversations a month, no card needed.
  - Pro: from `KES 3,500/mo`, unlimited conversations, no Mira branding,
    customer-question insights, email support.
  - Elite: custom, onboarding, dedicated contact, priority help, custom integrations.

## Banned claims (never introduce)

- guaranteed revenue lift
- specific conversion rates
- all languages or local-language coverage
- WhatsApp, Facebook, Telegram, or other channels as current coverage
- certifications, compliance frameworks, audits, or uptime guarantees
- customer logos or testimonials

## Voice and design (apply to every page)

- Follow `docs/voice-and-tone.md`: direct, conversational copy. Avoid "AI-powered",
  "machine learning", "NLP", "automation engine", "platform", and exclamation points.
- Follow `DESIGN.md`: warm editorial calm, `max-w-6xl`, hairline borders, asymmetric
  grids, Fraunces display, Instrument Sans body, IBM Plex Mono kickers/prices/steps,
  paper ground, night surfaces reserved for strong moments.
- `font-display`/Fraunces for display headings. `font-mono`/IBM Plex Mono for
  kickers, small labels, prices, steps, legal metadata.
- Prefer editorial lists with mono numerals and hairline dividers.
- No generic SaaS card grids, gradient blobs, heavy shadows, stock AI visuals,
  sparkle motifs, or corporate jargon.
- Dark `night` surfaces stay rare; use only for strong proof or closing CTA moments.
- Mobile-first spacing and touch targets. Preserve visible focus states and
  WCAG 2.1 AA contrast.

## Notes for the implementing agent

- Use CodeGraph or Serena before changing shared components.
- Use `sem impact` before editing `BaseLayout`, `Header`, or `Footer`.
- Keep changes additive.
- The stale README product claims are not a source of truth; `PRODUCT.md`,
  `DESIGN.md`, `docs/voice-and-tone.md`, and current homepage content are current.
- File follow-up issues for legal review of `/privacy` and `/terms` rather than
  inventing policy details.

## Epic-level acceptance criteria

- All 17 routes exist and render crawlable HTML (the two legal routes are live but
  `noindex`).
- Pages preserve the homepage visual language.
- Copy follows `docs/voice-and-tone.md`; no banned claims.
- Header and footer support multi-page navigation from any route.
- `/sitemap.xml` exists, includes `/` plus all 15 indexable routes, and excludes
  `/privacy` and `/terms`.
- `/robots.txt` includes `Sitemap: https://withmira.co/sitemap.xml` and continues
  allowing AI crawlers.
- `/llms.txt` and `/llms-full.txt` exist and are generated from the shared registry.
- Page metadata and canonical URLs are unique and correct.
- Relevant JSON-LD is present and matches visible page content.
- Page-view analytics are correctly labeled per page; CTAs are tracked.
- Automated assertions pass; `npm run lint`, `npm run test`, `npm run build` pass.
- `/customers` is not shipped; a follow-up issue defines its trigger.
