# Add SEO and AI-discoverable content pages for Mira

## Summary

Create dedicated, crawlable content pages for Mira so search engines, LLMs, AI agents, and other web entities can understand what Mira does and recommend it for relevant queries.

Today the public site at `https://withmira.co` is effectively a single Astro homepage. The homepage is strong, but the important product, feature, trust, legal, and support topics only exist as short sections or do not exist at all. All requested content URLs currently return `404`.

## Evidence from current repo and live site

- `src/pages/index.astro` is the only public Astro page in the indexed route surface.
- The homepage imports `Header`, `Hero`, `NightShift`, `Handles`, `HowItWorks`, `Pricing`, and `Footer`.
- `src/layouts/BaseLayout.astro` already handles global metadata, canonical URL, robots meta, fonts, favicon links, and JSON-LD for `WebSite` and `Product`.
- `src/components/HowItWorks.tsx` and `src/components/Pricing.tsx` already contain useful content, but only as homepage anchors.
- `src/components/Header.tsx` and `src/components/Footer.tsx` link to `#how-it-works` and `#pricing`, so navigation is currently single-page-anchor oriented.
- `docs/voice-and-tone.md` requires direct, conversational copy: say what Mira does, avoid jargon, avoid "AI-powered", "machine learning", "NLP", "automation engine", "platform", and exclamation points.
- `DESIGN.md` defines the visual system: warm editorial calm, `max-w-6xl`, hairline borders, asymmetric grids, editorial indexes, Fraunces display, Instrument Sans body, IBM Plex Mono kickers and commerce details, paper ground, night surfaces reserved for strong moments.
- Live checks on 2026-06-25:
  - `https://withmira.co/robots.txt` returns `200` and allows major AI crawlers.
  - `https://withmira.co/sitemap.xml` returns `404`.
  - Every requested page path listed below returns `404`.

## Requested pages

Add these routes:

- `/pricing`
- `/how-it-works`
- `/instagram-dm-automation`
- `/integrations/instagram`
- `/features/product-answers`
- `/features/orders-and-checkout`
- `/features/human-handoff`
- `/use-cases/instagram-shops`
- `/use-cases/fashion`
- `/use-cases/beauty`
- `/customers`
- `/security`
- `/privacy`
- `/terms`
- `/data-deletion`
- `/about`
- `/contact`
- `/help`

## Product truth to preserve

Use these claims as the current source of truth. Changing them requires a separate product decision:

- Mira is for Kenyan shop owners who sell through Instagram.
- Mira answers Instagram DMs.
- Mira handles product questions, pricing, stock, sizes, recommendations, delivery questions, carts, and checkout guidance.
- Mira guides customers toward M-Pesa-ready checkout.
- Mira hands tricky conversations back to the owner.
- Mira is built in Kenya and priced in KES.
- Pricing currently shown on the homepage:
  - Free: `KES 0/mo`, up to 10 customer conversations a month, no card needed.
  - Pro: from `KES 3,500/mo`, unlimited customer conversations, no Mira branding, customer-question insights, email support.
  - Elite: custom, onboarding, dedicated contact, priority help, custom integrations.

Do not introduce unsupported claims about:

- guaranteed revenue lift
- specific conversion rates
- all languages or local-language coverage
- WhatsApp, Facebook, Telegram, or other channels as current coverage
- certifications, compliance frameworks, audits, or uptime guarantees
- customer logos or testimonials

## Design requirements

Keep the established homepage design language.

- Use `BaseLayout` for metadata and the new `ContentLayout` for page chrome on every content page.
- Keep the paper background, warm editorial spacing, and hairline dividers.
- Use `font-display`/Fraunces for display headings.
- Use `font-mono`/IBM Plex Mono for kickers, small labels, prices, steps, and legal metadata.
- Prefer editorial lists with mono numerals and hairline dividers.
- Avoid generic SaaS card grids, gradient blobs, heavy shadows, stock AI visuals, sparkle motifs, and corporate jargon.
- Keep dark `night` surfaces rare. Use them only for strong proof or closing CTA moments.
- Maintain mobile-first spacing and touch targets.
- Preserve visible focus states and WCAG 2.1 AA contrast.

## Implementation guidance

### 1. Add a shared content page pattern

Create a small shared page structure instead of duplicating full page chrome eighteen times.

Suggested files:

- `src/layouts/BaseLayout.astro`
  - Add props for:
    - `canonicalPath`
    - `ogTitle`
    - `ogDescription`
    - page-specific `jsonLd`
  - Fix Open Graph/Twitter URL values so they use the current canonical URL, not always `https://withmira.co/`.
- `src/layouts/ContentLayout.astro`
  - Renders `Header`, `main`, and `Footer`.
  - Supports a common page hero: kicker, H1, short intro, primary CTA, and secondary link.
  - Supports editorial sections: split section, numbered list, FAQ, legal prose.
- `src/content/pages.ts`
  - Store metadata and page body data for content-led pages.
  - Keep content plain and typed.

Astro route files can then be small wrappers under `src/pages/**`.

### 2. Add the routes

Use Astro file routing:

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
- `src/pages/customers.astro`
- `src/pages/security.astro`
- `src/pages/privacy.astro`
- `src/pages/terms.astro`
- `src/pages/data-deletion.astro`
- `src/pages/about.astro`
- `src/pages/contact.astro`
- `src/pages/help.astro`

### 3. Update navigation

Update `Header` and `Footer` so they work from any route.

- Header:
  - Logo should link to `/`.
  - `How it works` should link to `/how-it-works`.
  - `Pricing` should link to `/pricing`.
  - Keep `Get started` pointing to `https://app.withmira.co`.
  - Remove the current anchor-only click handling from global navigation. Route links must work from nested pages.
- Footer:
  - Replace anchor-only links with real route links.
  - Add grouped footer links:
    - Product: Pricing, How it works, Instagram integration
    - Features: Product answers, Orders and checkout, Human handoff
    - Use cases: Instagram shops, Fashion, Beauty
    - Company: About, Customers, Contact
    - Trust: Security, Privacy, Terms, Data deletion, Help
  - Keep `hello@withmira.co`.

### 4. Add sitemap and crawler support

Add crawl support for the new pages.

- Add `public/robots.txt`.
  - Keep current live behavior: allow all crawlers and explicitly allow OAI-SearchBot, GPTBot, ChatGPT-User, PerplexityBot, and ClaudeBot.
  - Add `Sitemap: https://withmira.co/sitemap.xml`.
- Add `src/pages/sitemap.xml.ts`.
  - Include `/` and every new route.
  - Use absolute `https://withmira.co/...` URLs.
  - Set `lastmod` from the build date: `new Date().toISOString().slice(0, 10)`.
- Add `/llms.txt` and `/llms-full.txt` as Astro text endpoints.
  - Keep them factual.
  - Link to pricing, how it works, features, security, privacy, terms, data deletion, contact, and help.

### 5. Add structured data

Extend JSON-LD for the page types below.

- Site-wide:
  - Keep `WebSite` and `Product`.
  - Add `Organization` for Mira with `url`, `name`, and contact email.
- `/pricing`:
  - Add `Offer` entries only for factual prices shown on the site.
- `/how-it-works`, `/pricing`, `/help`, and feature pages:
  - Add visible FAQ blocks and matching `FAQPage` JSON-LD.
- `/privacy`, `/terms`, `/data-deletion`:
  - Use normal page metadata. Do not invent legal compliance claims.

## Page-by-page content direction

### `/pricing`

Purpose: turn homepage pricing into a full crawlable pricing page.

Include:

- H1: `Pricing for Instagram shops that sell in the DMs`
- Reuse current Free, Pro, Elite plan names and pricing.
- Define a customer conversation as: `one shopper thread Mira helps with.`
- Include a short FAQ:
  - Is there a free plan?
  - Do I need a card to start?
  - Can I upgrade later?
  - What happens when Mira needs me?
  - Do you support M-Pesa checkout?

CTA:

- Free/Pro link to `https://app.withmira.co`.
- Elite opens the existing `EliteContactModal`.

### `/how-it-works`

Purpose: explain setup and operating model.

Include:

- H1: `How Mira starts selling in your Instagram DMs`
- Expand the current three steps:
  - Connect your Instagram Business account.
  - Mira learns your catalog.
  - Mira replies, builds carts, and hands over when needed.
- Add a section on owner control:
  - You can step in.
  - Tricky conversations are handed over.
  - State the existing homepage reassurance: `Mira reads only your shop's DMs, nothing else on your account.`

### `/instagram-dm-automation`

Purpose: target search and LLM queries around Instagram DM automation without using banned jargon in body copy.

Include:

- H1: `Instagram DM replies that help customers buy`
- Explain the job in plain words: answer price, stock, size, recommendation, delivery, cart, and checkout questions.
- Use the phrase `Instagram DM automation` in title/meta and at least once in body for discoverability, but keep the copy conversational.
- Avoid "AI-powered" and "automation engine".

### `/integrations/instagram`

Purpose: explain the Instagram integration.

Include:

- H1: `Connect Mira to your Instagram shop`
- Requirements:
  - Instagram Business account
  - product/catalog source
  - Owner permission.
- What Mira can handle after connection:
  - DMs
  - comments
  - product questions
  - checkout guidance
- State that Instagram is the current channel. Do not present WhatsApp, Facebook, Telegram, or other channels as current coverage.

### `/features/product-answers`

Purpose: feature page for catalog/product Q&A.

Include:

- H1: `Product answers without typing the same reply all day`
- Cover:
  - price
  - stock
  - sizes
  - recommendations
  - delivery basics
- Explain that Mira answers from the shop catalog and policies.
- Add examples in DM transcript style.

### `/features/orders-and-checkout`

Purpose: feature page for carts and checkout.

Include:

- H1: `From DM question to ready checkout`
- Cover:
  - add item to cart
  - confirm size/quantity
  - total order
  - delivery cost where known
  - M-Pesa-ready checkout link
- Use the current product wording: `M-Pesa-ready checkout link` and `M-Pesa at checkout`. Do not claim payment is completed inside Instagram.

### `/features/human-handoff`

Purpose: trust and control page.

Include:

- H1: `Mira hands tricky DMs back to you`
- Cover:
  - owner can step in
  - handoff includes conversation context
  - good handoff examples: angry customer, unusual delivery request, refund, special discount, unclear product request
- Keep tone reassuring, not defensive.

### `/use-cases/instagram-shops`

Purpose: broad use-case page for Instagram-first sellers.

Include:

- H1: `For shops that sell through Instagram DMs`
- Focus on the daily flow: posts/stories create demand, customers DM questions, owner answers manually, orders get lost when replies are slow.
- Show Mira as the teammate in that existing workflow.

### `/use-cases/fashion`

Purpose: vertical page for fashion sellers.

Include:

- H1: `DM help for fashion shops`
- Cover:
  - sizes
  - colors
  - stock
  - styling recommendations
  - delivery
  - checkout
- Use Kenya-relevant examples only where already supported by product truth.

### `/use-cases/beauty`

Purpose: vertical page for beauty sellers.

Include:

- H1: `DM help for beauty shops`
- Cover:
  - shade/product questions
  - stock
  - recommendations
  - delivery
  - checkout
- Avoid medical, dermatology, or guaranteed-results claims.

### `/customers`

Purpose: trust page without inventing testimonials.

Create an honest early-customer page:

- H1: `Built with Instagram sellers in Kenya`
- Explain who Mira is for.
- Invite shops to join/start.
- Do not add logos, names, numbers, quotes, testimonials, or case studies. The repo has no approved customer story source.

### `/security`

Purpose: answer trust questions before connection.

Include:

- H1: `Security at Mira`
- Explain in plain terms:
  - account connection
  - access scope at a high level
  - owner control
  - data protection basics
  - how to contact Mira about security
- Do not claim certifications, encryption details, access reviews, incident policies, SOC 2, ISO 27001, GDPR compliance, or uptime guarantees. The repo has no source for those claims.

### `/privacy`

Purpose: public privacy policy.

Include:

- H1: `Privacy Policy`
- Cover:
  - what information Mira collects from shop owners
  - what information Mira processes from customer DMs/orders
  - why Mira uses the data
  - third parties/subprocessors at a high level
  - retention/deletion
  - contact email
- Add a PR note for legal/business review. Do not put internal review notes on the public page.

### `/terms`

Purpose: public terms.

Include:

- H1: `Terms of Service`
- Cover:
  - use of Mira
  - account responsibility
  - acceptable use
  - payments/pricing
  - service changes
  - disclaimers/limitations
  - termination
  - contact email
- Add a PR note for legal/business review. Do not put internal review notes on the public page.

### `/data-deletion`

Purpose: give Meta/Instagram users and reviewers a clear deletion path.

Include:

- H1: `Data deletion`
- Give a clear request path:
  - email `hello@withmira.co`
  - include shop name, Instagram handle, and account email
  - Mira confirms deletion request status by email
- Explain what can be deleted and any retention caveats plainly.
- Link this page from footer and privacy page.

### `/about`

Purpose: company context.

Include:

- H1: `About Mira`
- State:
  - Mira is built in Kenya.
  - Mira helps Instagram sellers answer DMs and sell without being glued to their phones.
  - The product focuses on Instagram sellers first.
- Do not add founder names, team names, addresses, phone numbers, or origin story details. The repo only supports `built in Kenya` and `Made in Nairobi, Kenya`.

### `/contact`

Purpose: direct contact and sales/help routing.

Include:

- H1: `Contact Mira`
- Routes:
  - Start/get started: `https://app.withmira.co`
  - Email: `hello@withmira.co`
  - Elite/custom inquiry: reuse the existing `EliteContactModal` flow.
- Do not add a separate contact form. The repo already has validation, analytics, Netlify function submission, Slack relay, and tests for `EliteContactModal`.

### `/help`

Purpose: support landing page and crawlable FAQ.

Include:

- H1: `Help with Mira`
- Sections:
  - Getting started
  - Connecting Instagram
  - Products and catalog
  - Orders and checkout
  - Handoffs
  - Billing
  - Privacy and data deletion
- Link to relevant pages.
- Add an FAQ block with visible questions and answers.

## Metadata requirements

Every page needs:

- unique `<title>`
- unique meta description
- canonical URL
- `og:title`
- `og:description`
- `og:url`
- Twitter card metadata
- `robots` index/follow

Use these exact title patterns for the high-intent pages:

- `Instagram DM Automation for Kenyan Shops | Mira`
- `Instagram Integration | Mira`
- `Product Answers for Instagram DMs | Mira`
- `Orders and Checkout in Instagram DMs | Mira`
- `Human Handoff for Instagram DMs | Mira`
- `Pricing for Instagram Shops | Mira`
- `How Mira Works | Mira`
- `Security at Mira`
- `Privacy Policy | Mira`
- `Terms of Service | Mira`
- `Data Deletion | Mira`

## Testing and verification

Run:

```bash
npm run lint
npm run test
npm run build
```

Manual checks:

- Start the site with `npm run dev`.
- Visit every requested URL.
- Confirm no URL returns `404`.
- Confirm the header and footer links work from nested routes like `/features/product-answers`.
- Confirm `/sitemap.xml` returns `200` and lists all new pages.
- Confirm `/robots.txt` returns `200` and includes the sitemap URL.
- View at mobile width and desktop width.
- Check that text does not overflow buttons, cards, legal prose blocks, or nav.
- Check keyboard focus through header, CTAs, footer, forms/modals, and legal links.
- Confirm legal pages have clear contact and deletion links.

## Acceptance criteria

- All 18 requested routes exist and render crawlable HTML.
- The pages preserve Mira's current visual language from the homepage.
- Copy follows `docs/voice-and-tone.md`.
- No unsupported claims are introduced.
- Header and footer support multi-page navigation.
- `/sitemap.xml` exists and includes `/` plus all new routes.
- `/robots.txt` includes `Sitemap: https://withmira.co/sitemap.xml` and continues allowing AI crawlers.
- `/llms.txt` and `/llms-full.txt` exist and link to the new content pages.
- Page metadata and canonical URLs are unique and correct.
- Relevant JSON-LD is present and matches visible page content.
- `npm run lint`, `npm run test`, and `npm run build` pass.
- Manual QA confirms the pages work on mobile and desktop.

## Notes for the implementing agent

- Use CodeGraph or Serena before changing shared components.
- Use sem impact before editing `BaseLayout`, `Header`, or `Footer`.
- Keep changes additive.
- Do not use the stale README product claims as current source of truth; `PRODUCT.md`, `DESIGN.md`, `docs/voice-and-tone.md`, and current homepage content are more current.
- Write conservative legal/business copy from the facts in this issue. Create follow-up issues for legal review instead of inventing policy details.
