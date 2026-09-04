# Slice 1: Shared infra for content pages

> Sub-issue of `linear-issue-mira-content-pages-parent.md`. Must land first;
> slices 2, 3, and 4 all depend on it. No user-facing routes ship here — this is
> the foundation.

## Summary

Build the shared layout, content module, navigation refactor, page-aware
analytics, crawl support, and test harness that every later route depends on.

## Depends on

Nothing. This is the first slice.

## Scope

No routes. Files touched/added:

- `src/layouts/BaseLayout.astro` (edit — add props, fix OG/Twitter, drop keywords meta)
- `src/layouts/ContentLayout.astro` (new)
- `src/content/pages.ts` (new — typed schema + shared canonical copy)
- `src/lib/routes.ts` (new — route registry; drives `llms.txt`/`llms-full.txt` and tests)
- `src/components/Header.tsx` (edit — route-always)
- `src/components/Footer.tsx` (edit — grouped route links)
- `src/lib/page-init.ts` (edit — page-aware page view)
- `astro.config.mjs` (edit — add `@astrojs/sitemap`)
- `public/robots.txt` (edit — add Sitemap line)
- `src/pages/llms.txt.ts` (new — generated endpoint)
- `src/pages/llms-full.txt.ts` (new — generated endpoint)
- tests (new — the automated-assertion harness)

## Requirements

### 1. `BaseLayout` props + head fixes

`BaseLayout.astro` currently derives `canonical` correctly from
`Astro.url.pathname` + `Astro.site`, but hardcodes OG/Twitter URL to
`https://withmira.co/` and OG title/description to homepage values, and ships a
`<meta name="keywords">` tag.

Add props:

- `canonicalPath?: string` (fallback: current path)
- `ogTitle?: string`
- `ogDescription?: string`
- `jsonLd?: object` (page-specific structured data, rendered in addition to site-wide)

Fixes:

- OG/Twitter `og:url`/`twitter:url` use the current canonical URL, not the
  hardcoded homepage URL.
- `og:title`/`og:description`/`twitter:*` use the new props (fallback to current
  homepage values for `/`).
- **Drop** the `<meta name="keywords">` tag entirely (governing constraint 8).

### 2. `ContentLayout`

New `src/layouts/ContentLayout.astro`. Renders `Header`, `<main>`, and `Footer`
as React islands (matching the homepage's `client:load` for Header and
`client:visible` for Footer). Provides:

- A common page hero: kicker, H1, short intro, primary CTA, secondary link.
- Editorial section primitives: split section, numbered list, FAQ block, legal prose.
- A `pageName` prop (governing constraint 10) written to a `data-page-name`
  attribute on `<body>` (or `<main>`) for `page-init` to read.
- A `noindex?: boolean` prop that, when true, renders
  `<meta name="robots" content="noindex, follow">` and omits the route from the
  sitemap (used by `/privacy` and `/terms` in slice 3).

Page bodies are sourced from `pages.ts`; `ContentLayout` consumes typed data, not
ad-hoc props.

### 3. Content module (`pages.ts`)

New `src/content/pages.ts`. Single typed source of truth. Define shared types:

- `Page` — kicker, H1, intro, primaryCta, secondaryLink, sections[], faq[],
  `trackingKey` on CTAs, `pageName` for analytics.
- `ContentSection` — split | numbered list | faq | legal prose variants.
- Re-export `PLANS` and `STEPS` as the canonical values (move the const data out
  of `Pricing.tsx` / `HowItWorks.tsx` so homepage islands and dedicated pages read
  the same objects — governing constraint 4). Homepage components import from here;
  their rendered output must not change.

### 4. Route registry (`routes.ts`)

New `src/lib/routes.ts`. A typed array of `{ path, title, indexable, slice }`
for all 17 routes (see parent epic's route table). This is the single source that
drives `llms.txt`, `llms-full.txt`, and the test assertions. `@astrojs/sitemap`
auto-discovers routes for the sitemap itself; this registry exists for the llms
endpoints and tests.

### 5. Header/Footer route-always refactor

`Header.tsx`:

- Remove `scrollToSection` usage. Logo links to `/` (plain anchor, no scroll
  handler).
- Nav items become real routes: `/how-it-works`, `/pricing`. `Get started`
  stays `https://app.withmira.co`.
- Keep `useCTATracking` on CTA and nav clicks.

`Footer.tsx`:

- Remove `scrollToSection`. Replace anchor links with grouped route links per the
  parent epic's footer spec:
  - Product: Pricing, How it works, Instagram integration
  - Features: Product answers, Orders and checkout, Human handoff
  - Use cases: Instagram shops, Fashion, Beauty
  - Company: About, Contact (no Customers — deferred)
  - Trust: Security, Privacy, Terms, Data deletion, Help
- Keep `hello@withmira.co` and "Made in Nairobi, Kenya".
- Keep the closing CTA + night surface.

These components must render identically from any route (no route awareness).

### 6. Page-aware analytics

`page-init.ts` currently fires `trackPageView('Landing Page', 'main')` on every
page. Change it to read `document.body.dataset.pageName` (set by
`ContentLayout`); fall back to `'Landing Page'` when unset (preserves the
homepage label unchanged — no regression on `/`). Keep scroll-depth and lazy
Mixpanel init as-is.

### 7. Sitemap + robots

- Install `@astrojs/sitemap`; add it to `astro.config.mjs` `integrations`. The
  `site` is already `https://withmira.co`.
- Configure the integration to exclude `/privacy` and `/terms` (noindex routes).
- `public/robots.txt`: keep current crawler-allow behavior (OAI-SearchBot,
  GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot) and add
  `Sitemap: https://withmira.co/sitemap.xml`.

### 8. `llms.txt` + `llms-full.txt` endpoints

New `src/pages/llms.txt.ts` and `src/pages/llms-full.txt.ts`. Both are
**generated** from `routes.ts` + `pages.ts` (governing constraint 9) — never
hand-maintained prose. `/llms.txt` is the concise factual summary; `/llms-full.txt`
is the expanded version rendered from the same page data. Both link to pricing,
how it works, features, security, privacy, terms, data deletion, contact, and
help. Keep content factual and voice-compliant.

### 9. Test harness (automated assertions)

New tests encoding the mechanical guarantees (governing constraint 12):

- Every entry in `routes.ts` resolves and renders without error.
- Every page has a unique `<title>` and a unique canonical URL.
- `pages.ts` contains zero banned terms (the voice-and-tone list).
- `FAQPage` JSON-LD nodes (added in slice 4) match visible FAQ blocks — leave a
  placeholder/skip until slice 4.
- `/privacy` and `/terms` carry `noindex` (skip until slice 3, but the assertion
  exists and is skipped pending those routes).

## Acceptance criteria

- `BaseLayout` accepts the new props; OG/Twitter use the canonical URL; keywords
  meta is gone.
- `ContentLayout` exists, renders Header/main/Footer, sets `data-page-name`, and
  supports `noindex`.
- `pages.ts` exists with typed schema and is the source for `PLANS`/`STEPS`;
  homepage renders unchanged.
- Header and Footer use real route links from any page; no `scrollToSection`.
- `page-init` fires the correct per-page page view; homepage unchanged.
- `@astrojs/sitemap` installed; `/sitemap.xml` returns 200 with `/` and (once
  slices 2–3 land) the indexable routes; excludes `/privacy`/`/terms`.
- `robots.txt` includes the Sitemap line.
- `/llms.txt` and `/llms-full.txt` return 200, generated from the registry.
- The test harness runs and passes for everything in this slice.
- `npm run lint`, `npm run test`, `npm run build` pass.
- Manual: header/footer links work from a throwaway nested test route; keyboard
  focus through header, CTAs, footer is intact.

## Notes for the implementing agent

- This slice changes shared code (`BaseLayout`, `Header`, `Footer`, `page-init`,
  `Pricing.tsx`/`HowItWorks.tsx` const extraction). Run `sem impact` on each.
- The homepage must render pixel/behavior-identical after the const extraction
  into `pages.ts`. Verify with the existing homepage tests.
- Do not ship any content route here. Slices 2 and 3 consume this foundation.
