# Copy, Branding & A/B Testing — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement all copy/branding fixes from the audit and wire up 4 Statsig A/B experiments to measure which copy variants convert best.

**Architecture:** Statsig client SDK initializes alongside PostHog in the app root. A single `useExperiments()` hook reads all 4 experiment variants. Components conditionally render copy based on variant assignment. Direct fixes (IG reskin, pricing, footer, meta, dead code removal) ship without experiments.

**Tech Stack:** React 18, Vite, Tailwind (custom config), Statsig JS Client SDK, PostHog, TypeScript

**Design doc:** `docs/plans/2026-03-15-copy-branding-audit-design.md`

---

### Task 1: Dead Code Removal

Remove commented-out components and their dependencies before making changes to avoid merge noise.

**Files:**
- Delete: `src/components/Testimonials.tsx`
- Delete: `src/components/FinalCTA.tsx`
- Delete: `src/services/waitlistService.ts`
- Delete: `src/utils/scrollToForm.ts`
- Modify: `src/App.tsx:33-35`

**Step 1: Remove commented-out lines from App.tsx**

In `src/App.tsx`, remove lines 33 and 35:
```tsx
        {/* <Testimonials /> */}
```
and
```tsx
        {/* <FinalCTA /> */}
```

**Step 2: Delete the dead files**

```bash
rm src/components/Testimonials.tsx src/components/FinalCTA.tsx src/services/waitlistService.ts src/utils/scrollToForm.ts
```

**Step 3: Verify build passes**

```bash
npm run build
```
Expected: Clean build, no import errors.

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove Testimonials, FinalCTA, and unused waitlist/scrollToForm utilities"
```

---

### Task 2: Meta Content & SEO Updates

**Files:**
- Modify: `index.html`

**Step 1: Update title, description, keywords, OG tags, and Twitter tags**

In `index.html`, replace lines 23-37 with:

```html
    <title>Mira — Your Instagram DM Sales Assistant for Kenyan Businesses</title>
    <meta name="description" content="Mira replies to your Instagram DMs — answering product questions, building carts, and guiding customers to checkout. Built in Kenya, priced in KES. Try free." />
    <meta name="keywords" content="Instagram DM sales assistant, AI customer service, Instagram automation, Kenya SME chatbot, social selling" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://withmira.co/" />
    <meta property="og:title" content="Stop losing DM sales to slow replies" />
    <meta property="og:description" content="Mira is the AI assistant that handles your Instagram DM product questions, builds carts, and walks customers through checkout while you focus on running your business." />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://withmira.co/" />
    <meta property="twitter:title" content="Stop losing DM sales to slow replies" />
    <meta property="twitter:description" content="Mira is the AI assistant that handles your Instagram DM product questions, builds carts, and walks customers through checkout while you focus on running your business." />
```

**Step 2: Verify build passes**

```bash
npm run build
```

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: update meta tags for Instagram DM positioning and SEO"
```

---

### Task 3: Statsig SDK Setup

**Files:**
- Create: `src/lib/statsig.ts`
- Modify: `src/main.tsx`
- Modify: `.env.local`

**Step 1: Add the Statsig client key to `.env.local`**

Append to `.env.local`:
```
VITE_STATSIG_CLIENT_KEY=client-YOUR_KEY_HERE
```

(Replace with your actual Statsig client SDK key)

**Step 2: Create `src/lib/statsig.ts`**

```ts
import { StatsigClient } from '@statsig/js-client';
import { StatsigSessionReplayPlugin } from '@statsig/session-replay';
import { StatsigAutoCapturePlugin } from '@statsig/web-analytics';

let client: StatsigClient | null = null;

export function getStatsigClient(): StatsigClient {
  if (client) return client;

  client = new StatsigClient(
    import.meta.env.VITE_STATSIG_CLIENT_KEY,
    {},
    {
      plugins: [
        new StatsigSessionReplayPlugin(),
        new StatsigAutoCapturePlugin(),
      ],
    }
  );

  return client;
}

export function initStatsig(): Promise<void> {
  const c = getStatsigClient();
  return c.initializeAsync();
}
```

**Step 3: Modify `src/main.tsx` to initialize Statsig before render**

Replace the contents of `src/main.tsx` with:

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { StatsigProvider } from '@statsig/react-bindings';
import App from './App.tsx';
import './index.css';
import { initializeTracking } from './utils/analytics';
import { PostHogProvider } from 'posthog-js/react';
import { getStatsigClient, initStatsig } from './lib/statsig';

initializeTracking();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

initStatsig().then(() => {
  createRoot(rootElement).render(
    <StrictMode>
      <StatsigProvider client={getStatsigClient()}>
        <PostHogProvider
          apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
          options={{
            api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
            capture_exceptions: true,
            debug: import.meta.env.MODE === 'development',
          }}
        >
          <App />
        </PostHogProvider>
      </StatsigProvider>
    </StrictMode>
  );
});
```

**Step 4: Verify dev server starts without errors**

```bash
npm run dev
```
Expected: App renders, no console errors about Statsig.

**Step 5: Commit**

```bash
git add src/lib/statsig.ts src/main.tsx
git commit -m "feat: add Statsig SDK with session replay and web analytics plugins"
```

---

### Task 4: Experiments Hook

**Files:**
- Create: `src/hooks/useExperiments.ts`

**Step 1: Create the experiments hook**

```ts
import { useExperiment } from '@statsig/react-bindings';
import { trackPostHogEvent } from '../utils/analytics';
import { useEffect, useRef } from 'react';

export type HeroCtaVariant = 'control' | 'try_free' | 'connect_ig' | 'sell_dms';
export type HeroSubVariant = 'control' | 'ig_commerce';
export type SolutionCopyVariant = 'control' | 'full_journey';
export type ProductExpertVariant = 'control' | 'misspell_aware';

export interface ExperimentVariants {
  heroCta: HeroCtaVariant;
  heroSub: HeroSubVariant;
  solutionCopy: SolutionCopyVariant;
  productExpert: ProductExpertVariant;
}

export function useExperiments(): ExperimentVariants {
  const heroCta = useExperiment('hero_cta');
  const heroSub = useExperiment('hero_sub');
  const solutionCopy = useExperiment('solution_copy');
  const productExpert = useExperiment('product_expert');

  const variants: ExperimentVariants = {
    heroCta: (heroCta.get('variant', 'control') as HeroCtaVariant),
    heroSub: (heroSub.get('variant', 'control') as HeroSubVariant),
    solutionCopy: (solutionCopy.get('variant', 'control') as SolutionCopyVariant),
    productExpert: (productExpert.get('variant', 'control') as ProductExpertVariant),
  };

  // Sync experiment variants to PostHog for cross-referencing
  const synced = useRef(false);
  useEffect(() => {
    if (synced.current) return;
    synced.current = true;
    trackPostHogEvent('experiment_exposure', {
      hero_cta: variants.heroCta,
      hero_sub: variants.heroSub,
      solution_copy: variants.solutionCopy,
      product_expert: variants.productExpert,
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return variants;
}

// Copy maps for each experiment
export const HERO_CTA_COPY: Record<HeroCtaVariant, string> = {
  control: 'Get started',
  try_free: 'Try Mira Free',
  connect_ig: 'Connect Your Instagram',
  sell_dms: 'Start Selling in DMs',
};

export const HERO_SUB_COPY: Record<HeroSubVariant, string> = {
  control: 'Mira handles product questions, recommendations, and orders so customers get fast, accurate answers\u2014without you glued to your phone.',
  ig_commerce: 'Mira replies to your Instagram DMs \u2014 answering product questions, helping customers pick the right item, and guiding them all the way to checkout. Your shop sells even when you\u2019re away.',
};

export const SOLUTION_COPY: Record<SolutionCopyVariant, string> = {
  control: 'Mira lives in your DMs and understands your products, replies to customer questions, and guides them through buying wherever they message you. When someone needs you personally, Mira passes the conversation back to you.',
  full_journey: 'Mira works inside your Instagram DMs, answering the questions you answer every day \u2014 what\u2019s in stock, what it costs, what size to pick. When a customer is ready to buy, Mira adds items to their cart and walks them through checkout. When something needs your personal touch, Mira hands the conversation to you with full context.',
};

export const PRODUCT_EXPERT_COPY: Record<ProductExpertVariant, { title: string; description: string }> = {
  control: {
    title: 'Product Expert',
    description: 'Mira understands your catalog well enough to guide customers with clear, helpful answers',
  },
  misspell_aware: {
    title: 'Knows Your Products Inside Out',
    description: 'Mira searches your full catalog to find exactly what a customer is asking for \u2014 even if they misspell it or describe it vaguely',
  },
};
```

**Step 2: Verify build passes**

```bash
npm run build
```

**Step 3: Commit**

```bash
git add src/hooks/useExperiments.ts
git commit -m "feat: add useExperiments hook with typed variants and PostHog sync"
```

---

### Task 5: Wire Experiments into Hero & Header

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/Header.tsx`

**Step 1: Update Hero.tsx — CTA and subheadline experiments**

Import the hook and copy maps at the top of `Hero.tsx`:
```tsx
import { useExperiments, HERO_CTA_COPY, HERO_SUB_COPY } from '../hooks/useExperiments';
```

Inside the `Hero` component, before the `useEffect`:
```tsx
const { heroCta, heroSub } = useExperiments();
```

Replace the hardcoded CTA button text `Get started` (around line 121) with:
```tsx
{HERO_CTA_COPY[heroCta]}
```

Replace the hardcoded subheadline paragraph text (around line 82) with:
```tsx
{HERO_SUB_COPY[heroSub]}
```

Update the `handleCTAClick` tracking to include the variant:
```tsx
const handleCTAClick = () => {
  trackCTA('hero_cta_button', HERO_CTA_COPY[heroCta], 'hero', {
    button_location: 'hero_section',
    button_type: 'primary',
    hero_headline: 'Let Customers Shop Without Waiting For You To Reply',
    experiment_variant: heroCta,
  });
};
```

**Step 2: Update Header.tsx — CTA experiment**

Import at the top of `Header.tsx`:
```tsx
import { useExperiments, HERO_CTA_COPY } from '../hooks/useExperiments';
```

Inside the `Header` component:
```tsx
const { heroCta } = useExperiments();
```

Replace both instances of the hardcoded CTA text `Get started` (desktop ~line 106, mobile ~line 172) with:
```tsx
{HERO_CTA_COPY[heroCta]}
```

Update `handleCTAClick` to include variant:
```tsx
const handleCTAClick = () => {
  trackCTA('header_cta_button', HERO_CTA_COPY[heroCta], 'header', {
    button_location: 'top_navigation',
    button_type: 'primary',
    experiment_variant: heroCta,
  });
};
```

**Step 3: Verify dev server — CTA and subheadline render correctly**

```bash
npm run dev
```
Expected: CTA shows "Get started" (control variant) until Statsig experiments are configured in the console.

**Step 4: Commit**

```bash
git add src/components/Hero.tsx src/components/Header.tsx
git commit -m "feat: wire hero_cta and hero_sub experiments into Hero and Header"
```

---

### Task 6: Wire Experiments into SolutionOverview & Features

**Files:**
- Modify: `src/components/SolutionOverview.tsx`
- Modify: `src/components/Features.tsx`

**Step 1: Update SolutionOverview.tsx**

Import:
```tsx
import { useExperiments, SOLUTION_COPY } from '../hooks/useExperiments';
```

Inside component:
```tsx
const { solutionCopy } = useExperiments();
```

Replace the hardcoded description paragraph (around line 81) with:
```tsx
{SOLUTION_COPY[solutionCopy]}
```

**Step 2: Update Features.tsx — product_expert experiment**

Import:
```tsx
import { useExperiments, PRODUCT_EXPERT_COPY } from '../hooks/useExperiments';
```

Inside component:
```tsx
const { productExpert } = useExperiments();
```

In the `features` array, replace the "Product Expert" entry (index 3, around line 30-33) so it reads from the experiment:
```tsx
{
  icon: Brain,
  name: PRODUCT_EXPERT_COPY[productExpert].title,
  description: PRODUCT_EXPERT_COPY[productExpert].description
},
```

**Step 3: Verify dev server**

```bash
npm run dev
```

**Step 4: Commit**

```bash
git add src/components/SolutionOverview.tsx src/components/Features.tsx
git commit -m "feat: wire solution_copy and product_expert experiments"
```

---

### Task 7: Instagram DM Reskin — Hero Phone Mockup

The hero has a WhatsApp-style phone mockup (desktop, lines 170-262) and a mobile chat preview (lines 131-166). Both need to become Instagram DM styling.

**Files:**
- Modify: `src/components/Hero.tsx`

**Step 1: Replace the desktop phone mockup (lines 170-262)**

Replace the entire `{/* Right: Phone Mockup - Desktop only */}` div with an Instagram DM-styled phone:
- Header: Mira profile circle + "Mira" name + "Active now" in gray text (IG style)
- Customer bubbles: `bg-gray-100` with `rounded-2xl rounded-tl-md` (left-aligned)
- Mira reply bubbles: `bg-gradient-to-br from-blue-500 to-purple-600 text-white` with `rounded-2xl rounded-tr-md` (right-aligned, IG send style)
- Input area: IG-style with camera icon, text input, heart/send icons
- Keep exact same conversation text (City Perfumes / Elie Saab)

**Step 2: Replace the mobile chat preview (lines 131-166)**

Same IG DM styling as the desktop version but in the compact mobile card format:
- Replace green bubble colors with IG blue-purple gradient
- Replace "Always online" indicator with "Active now"
- Replace MessageCircle icon in header with an IG-style profile circle

**Step 3: Verify visually on dev server**

```bash
npm run dev
```
Check both desktop and mobile viewports. Chat should look like Instagram DMs, not WhatsApp.

**Step 4: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: reskin hero chat mockup from WhatsApp to Instagram DM styling"
```

---

### Task 8: Instagram DM Reskin — Features Chat Demo

**Files:**
- Modify: `src/components/Features.tsx`

**Step 1: Replace the chat demo section (around lines 228-289)**

Update the "Feature Showcase" chat demo:
- Replace `bg-[#25D366]` WhatsApp green icon with IG gradient circle (`bg-gradient-to-br from-blue-500 to-purple-600`)
- Replace "WhatsApp Business" header text with "Instagram"
- Replace "Online" status with "Active now"
- Replace `MessageSquare` WhatsApp icon with an IG-styled icon or simple profile avatar
- Bot response bubbles: change from `bg-lime-500` to `bg-gradient-to-br from-blue-500 to-purple-600 text-white`
- Customer bubbles: keep `bg-gray-100` (already IG-like)
- Keep same conversation content (Samsung Galaxy A54 + M-Pesa)

**Step 2: Verify visually**

```bash
npm run dev
```

**Step 3: Commit**

```bash
git add src/components/Features.tsx
git commit -m "feat: reskin features chat demo from WhatsApp to Instagram DM styling"
```

---

### Task 9: How It Works Section

**Files:**
- Create: `src/components/HowItWorks.tsx`
- Modify: `src/App.tsx`

**Step 1: Create `src/components/HowItWorks.tsx`**

A 3-step horizontal section matching the existing design system:

Steps:
1. **Connect Your Instagram** — "Link your Instagram Business account. Takes less than two minutes."
2. **Mira Learns Your Catalog** — "Mira reads your products and learns how to talk about them like you would."
3. **Go Live** — "Mira starts replying to DMs. You step in whenever you want."

Use the existing design patterns: `font-display` headings, `bg-gradient-to-b` section background, lime-500 accent colors, numbered step indicators, `useSectionTracking` hook. Match the visual weight of ProblemStatement (cards in a grid).

The nav item "How It Works" in `Header.tsx` already links to `#features`. Update it to link to `#how-it-works` instead, and give the new section `id="how-it-works"`.

**Step 2: Add to App.tsx**

```tsx
import HowItWorks from './components/HowItWorks';
```

Place `<HowItWorks />` between `<SolutionOverview />` and `<Features />`.

**Step 3: Update Header.tsx nav item**

Change the "How It Works" nav item from `{ id: 'features', label: 'How It Works' }` to `{ id: 'how-it-works', label: 'How It Works' }`.

**Step 4: Verify visually + nav link works**

```bash
npm run dev
```
Click "How It Works" in the nav — should scroll to the new section.

**Step 5: Commit**

```bash
git add src/components/HowItWorks.tsx src/App.tsx src/components/Header.tsx
git commit -m "feat: add How It Works section with 3-step onboarding flow"
```

---

### Task 10: Pricing & Footer Fixes

**Files:**
- Modify: `src/components/Pricing.tsx`
- Modify: `src/components/Footer.tsx`

**Step 1: Fix free tier in Pricing.tsx**

Find the free plan description (around line 97):
```tsx
Get started with access to Mira basic features to engage up to 1,000 contacts FREE OF CHARGE:
```

Replace `1,000` with `10`:
```tsx
Get started with access to Mira basic features to engage up to 10 contacts FREE OF CHARGE:
```

Also update the free features list entry (around line 49):
```tsx
{ bold: 'Automate conversations.', text: 'Unlimited interactions with up to 10 contacts' },
```
This already says 10, so just verify it matches.

**Step 2: Remove WhatsApp Support from Footer.tsx**

Remove the WhatsApp Support list item (around lines 120-127):
```tsx
<li className="flex items-center gap-3 text-gray-400 text-sm">
  <button
    onClick={() => handleContactClick('whatsapp')}
    className="flex items-center gap-3 hover:text-lime-400 transition-colors"
  >
    <MessageCircle className="w-4 h-4 text-lime-500" />
    WhatsApp Support
  </button>
</li>
```

Also remove `MessageCircle` from the lucide-react import if it's no longer used elsewhere in the file.

**Step 3: Verify build**

```bash
npm run build
```

**Step 4: Commit**

```bash
git add src/components/Pricing.tsx src/components/Footer.tsx
git commit -m "fix: correct free tier to 10 contacts, remove WhatsApp Support from footer"
```

---

### Task 11: Voice & Tone Guidelines

**Files:**
- Create: `docs/voice-and-tone.md`

**Step 1: Create the guidelines doc**

```markdown
# Mira — Voice & Tone Guidelines

## Audience
Kenyan shop owners who sell through Instagram. Busy, non-technical, social-first.

## Formality
Casual and conversational. "You" and "your shop" over "our platform" and "users."

## Personality
Helpful friend, not corporate product. Mira is a teammate, not a tool.

## Technical Depth
Zero jargon. Never say "AI-powered", "machine learning", "NLP", or "automation engine." Describe what Mira *does*: "answers questions", "builds a cart", "hands tricky conversations to you."

## Channel Specificity
Say "Instagram DMs" not "messaging channels." Say "your customers' DMs" not "customer touchpoints." Ground copy in the channel they already use.

## Commerce Language
Lean into the buying journey. "Browse, pick, and buy — all in the DM" is the core differentiator. Don't bury it under generic "customer support" framing.

## Proof Language
Use specifics from the product. "Mira handles questions about pricing, stock, sizes, and delivery" beats "Mira handles all your customer inquiries."

## Humor
Light and situational. "Your DMs at 2am? Mira's got it." Not forced puns or corporate wit.

## Words to Avoid
- Streamline, optimize, innovative, leverage, utilize, facilitate
- AI-powered, machine learning, NLP, automation engine
- Our platform, solutions, ecosystem, touchpoints
- Exclamation points (remove them)

## Words to Use
- Your shop, your DMs, your customers
- Answers, replies, finds, picks, builds, hands over
- Instagram, DMs, cart, checkout, order
```

**Step 2: Commit**

```bash
git add docs/voice-and-tone.md
git commit -m "docs: add voice and tone guidelines for copy consistency"
```

---

### Task 12: Final Verification

**Step 1: Full build check**

```bash
npm run build
```
Expected: Clean build, no warnings, no errors.

**Step 2: Dev server visual check**

```bash
npm run dev
```

Verify all changes visually:
- [ ] Hero phone mockup looks like Instagram DMs (blue/purple sends, gray receives)
- [ ] Hero mobile preview matches IG styling
- [ ] Features chat demo shows IG styling, not WhatsApp
- [ ] "How It Works" section appears between Solution and Features
- [ ] Nav "How It Works" link scrolls to the new section
- [ ] CTA button text renders (will show "Get started" until Statsig experiments are configured)
- [ ] Pricing free tier consistently says "10 contacts"
- [ ] Footer has no WhatsApp Support button
- [ ] Page title in browser tab shows new title
- [ ] No Testimonials or FinalCTA sections visible
- [ ] No console errors

**Step 3: Commit any fixes from visual QA**

```bash
git add -A
git commit -m "fix: visual QA adjustments"
```

---

## Statsig Console Setup (Manual)

After deploying the code, create these 4 experiments in the Statsig console:

1. **hero_cta** — Parameter: `variant` (string). Groups: `control`, `try_free`, `connect_ig`, `sell_dms`. 25% traffic each.
2. **hero_sub** — Parameter: `variant` (string). Groups: `control`, `ig_commerce`. 50/50 split.
3. **solution_copy** — Parameter: `variant` (string). Groups: `control`, `full_journey`. 50/50 split.
4. **product_expert** — Parameter: `variant` (string). Groups: `control`, `misspell_aware`. 50/50 split.

Primary metric for all: CTA click rate (tracked via PostHog `cta_click` events with `experiment_variant` property).
