# Slice 4: Structured data (JSON-LD) pass

> Sub-issue of `linear-issue-mira-content-pages-parent.md`. Depends on slices 2
> and 3 (HTML must exist before structured data mirrors it). Ships no routes;
> additive only.

## Summary

Add and verify JSON-LD structured data across all content pages so search engines
and LLMs can parse Mira's product, pricing, and FAQs. Every node must be
traceable to visible page content (governing constraint 11).

## Depends on

Slices 2 and 3 (all 17 routes exist and render).

## Scope

No new routes. Edits to:

- `src/layouts/BaseLayout.astro` (site-wide `Organization`)
- `src/content/pages.ts` (per-page `jsonLd` data feeding the `BaseLayout` `jsonLd`
  prop added in slice 1)
- the relevant route files / page data

## Requirements

### 1. Site-wide (all pages)

- Keep existing `WebSite` and `Product` nodes.
- Add `Organization` for Mira: `url`, `name`, contact email (`hello@withmira.co`).
  Rendered via `BaseLayout` on every page.

### 2. `/pricing`

- Add `Offer` entries only for the factual prices shown (the canonical `PLANS`).
  `Free` KES 0; `Pro` from KES 3,500; `Elite` custom. Do not invent list prices
  or currencies beyond what the page shows.

### 3. `/how-it-works`, `/pricing`, `/help`, and feature pages

- Add a visible FAQ block where specified in slices 2–3.
- Add matching `FAQPage` JSON-LD that mirrors the visible questions and answers
  verbatim. One `FAQPage` per page; each `Question`/`Answer` must match a visible
  block on the same page.

### 4. Legal pages

- `/privacy`, `/terms`, `/data-deletion`: normal page metadata only. Do not add
  compliance or policy structured data. Do not invent legal claims.

## Traceability rule (hard)

Every JSON-LD field must correspond to something visible on the same page. No
`aggregateRating`, no `review`, no certification fields, no invented availability
or price. If it is not shown to a human on the page, it does not go in JSON-LD.

## Test harness (slice 1 harness, extended here)

Enable the assertions left as pending in slice 1:

- Every `FAQPage` node matches a visible FAQ block on the same page (Question text
  appears in the rendered HTML).
- No JSON-LD node contains a banned claim (revenue lift, conversion rates,
  certifications, other-channel coverage, customer testimonials).
- `Offer` nodes match the canonical `PLANS` prices.

## Acceptance criteria

- `Organization` is present on every page.
- `Offer` nodes on `/pricing` match the visible plan prices.
- `FAQPage` nodes mirror visible FAQs on `/how-it-works`, `/pricing`, `/help`, and
  feature pages.
- Every JSON-LD node is traceable to visible content (test harness enforces).
- Legal pages carry no compliance/policy structured data.
- `npm run lint`, `npm run test`, `npm run build` pass.
- Manual: validate a sample of pages with Google's Rich Results Test; confirm no
  warnings about mismatched or invented data.

## Notes for the implementing agent

- Do not add `BreadcrumbList` (no category index pages exist — governing
  constraint 11).
- This slice is purely additive. If any JSON-LD change requires altering visible
  copy, stop and raise it — structured data mirrors content, it does not drive it.
