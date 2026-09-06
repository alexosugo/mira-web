# Sellogram Landing Page Imagery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Sellogram homepage as an image-led Instagram-commerce landing page while preserving the core product message and product truth.

**Architecture:** Keep the existing Astro/React island structure, but replace the generic feature index with three focused visual sections: supported shops, DM sales journey, and delivery outcome. Ship generated photography as optimized WebP assets under `public/images/`, and keep all DM/product UI as editable HTML/CSS over the images.

**Tech Stack:** Astro 7, React 18, TypeScript, Tailwind CSS, Vitest, Testing Library.

**Spec:** Approved conversation direction in the `feature/imagery` workstream and this plan.

## Global Constraints

- Shopper conversations are with the shop, never with a Sellogram DM identity.
- Sellogram powers the shop DM invisibly.
- Payment examples use contextual mobile money such as M-Pesa, Airtel Money, or MTN MoMo; do not introduce card language.
- DM examples must cover different stages of a sale, not repeat only availability questions.
- No AI-generated slogans or readable decorative copy in image backgrounds.
- Hero photography must remain expansive; do not force it into a small `object-cover` card.
- Use the existing use-case routes from the footer.
- Preserve the existing primary CTA destination.

---

### Task 1: Regression tests for the new homepage structure

**Files:**
- Create: `src/test/homepage-imagery.test.tsx`
- Modify: `src/test/HeroChatDemo.test.tsx`
- Modify: `src/test/hero-image-asset.test.ts`

**Interfaces:**
- Consumes: React components exported by the homepage sections.
- Produces: tests that require seven supported-shop links, four distinct DM journey stages, a delivery outcome, and an expansive hero image asset.

- [ ] **Step 1: Write failing tests for the new sections and hero behavior.**
- [ ] **Step 2: Run `npm run test:coverage` and confirm the new tests fail before implementation.**
- [ ] **Step 3: Commit the failing tests.**

### Task 2: Normalize and ship the photography assets

**Files:**
- Create: `public/images/hero/cobalt-stairwell.webp`
- Create: `public/images/shops/*.webp`
- Create: `public/images/journey/*.webp`
- Create: `public/images/outcomes/piki-piki-delivery.webp`
- Modify: `package.json`
- Delete: `scripts/materialize-hero-image.mjs`
- Delete: `assets/hero/*.b64`

**Interfaces:**
- Produces stable `/images/...` URLs consumed by React components and tests.

- [ ] **Step 1: Convert approved source PNGs to high-quality WebP without destructive cropping.**
- [ ] **Step 2: Commit the binaries directly instead of materializing them from base64 at build time.**
- [ ] **Step 3: Remove materialization hooks and old base64 source assets.**

### Task 3: Rebuild the hero as an expansive commerce scene

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/HeroChatDemo.tsx`

**Interfaces:**
- Hero retains the current headline and CTA.
- `HeroChatDemo` renders the cobalt photograph plus shop-owned DM and product overlay.

- [ ] **Step 1: Remove the narrow `max-w-6xl`/5-7-card feeling from the hero.**
- [ ] **Step 2: Render the hero image with intrinsic 3:2 dimensions and no forced crop.**
- [ ] **Step 3: Keep Nia Thrift as the visible DM identity and preserve natural product-to-delivery dialogue.**
- [ ] **Step 4: Run hero tests.**

### Task 4: Add supported-shop image cards

**Files:**
- Create: `src/components/SupportedShops.tsx`

**Interfaces:**
- Exports `SupportedShops`.
- Renders seven cards linking to the exact existing use-case routes.

- [ ] **Step 1: Implement the seven-shop editorial grid.**
- [ ] **Step 2: Use varied card spans/crops on desktop and simple stacked cards on mobile.**
- [ ] **Step 3: Run section tests.**

### Task 5: Add the DM sales journey

**Files:**
- Create: `src/components/DMSalesJourney.tsx`

**Interfaces:**
- Exports `DMSalesJourney`.
- Renders four stages: product questions, delivery info, payment confirmation, order progress.

- [ ] **Step 1: Build four image-led journey moments with distinct shop-owned DM states.**
- [ ] **Step 2: Keep city/payment language contextual and readable.**
- [ ] **Step 3: Run section tests.**

### Task 6: Add delivery outcome and simplify setup story

**Files:**
- Create: `src/components/DeliveryOutcome.tsx`
- Modify: `src/components/HowItWorks.tsx`
- Modify: `src/components/NightShift.tsx`

**Interfaces:**
- `DeliveryOutcome` renders the piki-piki delivery image and delivery-stage DM proof.
- `HowItWorks` remains three steps and visually quieter than image-led sections.

- [ ] **Step 1: Add the wide `From DM to doorstep` section.**
- [ ] **Step 2: Tighten NightShift copy and remove checkout-link language.**
- [ ] **Step 3: Add one restrained supporting image to HowItWorks while preserving the shared `STEPS` data.**

### Task 7: Recompose the homepage

**Files:**
- Modify: `src/pages/index.astro`

**Interfaces:**
- Final order: Hero → NightShift → SupportedShops → DMSalesJourney → HowItWorks → DeliveryOutcome → Pricing → Footer.

- [ ] **Step 1: Remove `Handles` from the homepage.**
- [ ] **Step 2: Insert the three new visual sections in the approved order.**
- [ ] **Step 3: Run full test suite and build.**

### Task 8: Verification

- [ ] **Step 1: Run `npm run lint`.**
- [ ] **Step 2: Run `npx tsc --noEmit`.**
- [ ] **Step 3: Run `npm run test:coverage`.**
- [ ] **Step 4: Run `npm run build`.**
- [ ] **Step 5: Verify the branch CI/checks.**
- [ ] **Step 6: Inspect the rendered homepage at desktop, tablet, and mobile widths before claiming completion.**
