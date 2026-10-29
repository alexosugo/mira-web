# Slice 3: Trust, legal, and company pages

> Sub-issue of `linear-issue-mira-content-pages-parent.md`. Depends on slice 1.
> Ships 7 routes. Two (`/privacy`, `/terms`) ship **`noindex`** until legal
> review. This is the highest-risk slice — see governing constraint 6.

## Summary

Build the trust and legal surface: security, privacy, terms, data deletion,
about, contact, and help. Legal copy is drafted conservatively from facts and
real backend data practices, never invented.

## Depends on

Slice 1 (`ContentLayout` with `noindex` support, `pages.ts`, test harness).

## Scope (7 routes)

- `src/pages/security.astro` (indexable)
- `src/pages/privacy.astro` (**noindex**)
- `src/pages/terms.astro` (**noindex**)
- `src/pages/data-deletion.astro` (indexable)
- `src/pages/about.astro` (indexable)
- `src/pages/contact.astro` (indexable)
- `src/pages/help.astro` (indexable)

## Input dependency before drafting legal copy

Before writing `/privacy` and `/terms`, confirm the **actual** backend data
practices: what data is collected from shop owners, what is processed from
customer DMs/orders, retention windows, and subprocessors/third parties. Draft
copy against those facts. If a fact is unknown, state less rather than invent.

## Page-by-page content direction

### `/security` — "Security | Mira" (indexable)

- H1: `Security at Mira`.
- Plain-language explanation: account connection; access scope at a high level;
  owner control; data protection basics; how to contact Mira about security.
- Do not claim certifications, encryption details, access reviews, incident
  policies, SOC 2, ISO 27001, GDPR compliance, or uptime guarantees.

### `/privacy` — "Privacy Policy | Mira" (**noindex**)

- H1: `Privacy Policy`.
- Cover: what information Mira collects from shop owners; what it processes from
  customer DMs/orders; why Mira uses the data; third parties/subprocessors at a
  high level; retention/deletion; contact email.
- `ContentLayout` `noindex` prop = true; excluded from the sitemap.
- Internal PR note for legal/business review only — do not put review notes on the
  public page.
- File a follow-up issue: legal review of `/privacy`, then flip `noindex` to
  indexable and re-include in sitemap.

### `/terms` — "Terms of Service | Mira" (**noindex**)

- H1: `Terms of Service`.
- Cover: use of Mira; account responsibility; acceptable use; payments/pricing;
  service changes; disclaimers/limitations; termination; contact email.
- `ContentLayout` `noindex` prop = true; excluded from the sitemap.
- Same internal-review-only note and follow-up issue as `/privacy`.

### `/data-deletion` — "Data Deletion | Mira" (indexable)

- H1: `Data deletion`.
- Clear request path: email `hello@withmira.co`; include shop name, Instagram
  handle, and account email; Mira confirms deletion request status by email.
- Explain plainly what can be deleted and any retention caveats.
- Required by Meta/Instagram for app review — must be live and discoverable.
- Link from footer and from `/privacy`.

### `/about` — "About | Mira" (indexable)

- H1: `About Mira`.
- State: Mira is built in Kenya; Mira helps Instagram sellers answer DMs and sell
  without being glued to their phones; the product focuses on Instagram sellers
  first.
- Do not add founder names, team names, addresses, phone numbers, or origin-story
  details. The repo only supports `built in Kenya` and `Made in Nairobi, Kenya`.

### `/contact` — "Contact | Mira" (indexable)

- H1: `Contact Mira`.
- Routes: Start/get started → `https://app.withmira.co`; Email →
  `hello@withmira.co`; Elite/custom inquiry → reuse the existing
  `EliteContactModal` flow (React island).
- Do not add a separate contact form. The repo already has validation, analytics,
  Netlify function submission, Slack relay, and tests for `EliteContactModal`.

### `/help` — "Help | Mira" (indexable)

- H1: `Help with Mira`.
- Sections: Getting started; Connecting Instagram; Products and catalog; Orders
  and checkout; Handoffs; Billing; Privacy and data deletion.
- Link to relevant pages.
- Add a visible FAQ block with questions and answers (slice 4 mirrors it as
  `FAQPage` JSON-LD).

## Metadata (every page)

Unique `<title>`, unique meta description, canonical URL, OG/Twitter metadata,
`robots` index/follow — except `/privacy` and `/terms` which render
`<meta name="robots" content="noindex, follow">`.

## Acceptance criteria

- All 7 routes exist and return 200; the two legal routes are live but `noindex`.
- `/privacy` and `/terms` are excluded from `sitemap.xml` (test harness enforces).
- No banned claims; no invented compliance/legal details.
- `/privacy` and `/terms` copy is consistent with actual backend data practices.
- `/data-deletion` is live and linked from footer and `/privacy`.
- Elite modal reuse works on `/contact`; no new contact form.
- Follow-up issues exist for legal review of `/privacy` and `/terms`.
- `npm run lint`, `npm run test`, `npm run build` pass.
- Manual: legal pages have clear contact and deletion links; keyboard focus
  through legal prose and the Elite modal is intact.

## Notes for the implementing agent

- The `noindex` flip for `/privacy` and `/terms` is a tracked follow-up, not part
  of this slice's acceptance. Do not flip until legal signs off.
- `/customers` is **not** in this slice (deferred — governing constraint 7).
- Do not add `BreadcrumbList`. Slice 4 handles `FAQPage` for `/help`.
