# Copy, Branding & A/B Testing — Design Doc

**Date:** 2026-03-15
**Status:** Approved
**Context:** Audit of withmira.co copy vs. mira-py agent capabilities revealed undersold features, WhatsApp-styled demos (launch channel is Instagram), and weak CTA copy. This design covers all fixes plus 4 A/B tests via Statsig.

## Goals

1. Fix copy/visual mismatches identified in the audit
2. A/B test 4 key copy changes to measure conversion impact
3. Add missing "How It Works" section
4. Clean up dead code (Testimonials, FinalCTA, waitlist)
5. Update meta content for SEO/social sharing

## A/B Tests (Statsig Feature Gates)

4 independent experiments using Statsig's client SDK. Each experiment has a control (current copy) and 1-3 treatment variants.

### Experiment 1: `hero_cta`
| Variant | CTA Text |
|---|---|
| `control` | Get started |
| `try_free` | Try Mira Free |
| `connect_ig` | Connect Your Instagram |
| `sell_dms` | Start Selling in DMs |

**Components:** Hero.tsx, Header.tsx (CTA buttons match)

### Experiment 2: `hero_sub`
| Variant | Subheadline |
|---|---|
| `control` | Mira handles product questions, recommendations, and orders so customers get fast, accurate answers—without you glued to your phone. |
| `ig_commerce` | Mira replies to your Instagram DMs — answering product questions, helping customers pick the right item, and guiding them all the way to checkout. Your shop sells even when you're away. |

**Components:** Hero.tsx

### Experiment 3: `solution_copy`
| Variant | Description |
|---|---|
| `control` | Mira lives in your DMs and understands your products, replies to customer questions, and guides them through buying wherever they message you. When someone needs you personally, Mira passes the conversation back to you. |
| `full_journey` | Mira works inside your Instagram DMs, answering the questions you answer every day — what's in stock, what it costs, what size to pick. When a customer is ready to buy, Mira adds items to their cart and walks them through checkout. When something needs your personal touch, Mira hands the conversation to you with full context. |

**Components:** SolutionOverview.tsx

### Experiment 4: `product_expert`
| Variant | Title | Description |
|---|---|---|
| `control` | Product Expert | Mira understands your catalog well enough to guide customers with clear, helpful answers |
| `misspell_aware` | Knows Your Products Inside Out | Mira searches your full catalog to find exactly what a customer is asking for — even if they misspell it or describe it vaguely |

**Components:** Features.tsx

## Direct Changes (No A/B Test)

### Instagram DM Reskin
- **Hero.tsx:** Replace WhatsApp-style phone mockup with Instagram DM styling (blue/purple send bubbles, gray receive bubbles, IG header with profile pic + "Active now"). Same conversation content.
- **Features.tsx:** Replace "WhatsApp Business" header + green bubbles with IG DM styling. Same Samsung Galaxy + M-Pesa scenario.

### New "How It Works" Section
- New `HowItWorks.tsx` component between SolutionOverview and Features
- Three steps: Connect your Instagram → Mira learns your catalog → Go live
- Matches existing design system (lime accents, navy/white)

### Pricing Fix
- Fix free tier to "10 contacts" consistently (card and description were conflicting)

### Footer Fixes
- Remove WhatsApp Support button
- Social links left as placeholder `#` (real URLs coming later)

### Dead Code Removal
- Delete `Testimonials.tsx`, `FinalCTA.tsx`, `waitlistService.ts`, `scrollToForm.ts`
- Remove commented-out references in `App.tsx`

### Meta Content
- Page title: "Mira — Your Instagram DM Sales Assistant for Kenyan Businesses"
- Meta description: "Mira replies to your Instagram DMs — answering product questions, building carts, and guiding customers to checkout. Built in Kenya, priced in KES. Try free."
- OG title: "Stop losing DM sales to slow replies"
- OG description: "Mira is the AI assistant that handles your Instagram DM product questions, builds carts, and walks customers through checkout while you focus on running your business."

## Architecture

### New Files
- `src/hooks/useExperiments.ts` — single hook wrapping all 4 Statsig experiments
- `src/lib/statsig.ts` — Statsig client init config
- `src/components/HowItWorks.tsx` — 3-step section
- `docs/voice-and-tone.md` — copy guidelines for future work

### Modified Files
- `src/main.tsx` — add StatsigProvider
- `src/App.tsx` — add HowItWorks, remove dead imports
- `src/components/Hero.tsx` — IG reskin + hero_cta + hero_sub experiments
- `src/components/Header.tsx` — hero_cta experiment
- `src/components/Features.tsx` — IG reskin + product_expert experiment
- `src/components/SolutionOverview.tsx` — solution_copy experiment
- `src/components/Pricing.tsx` — fix free tier count
- `src/components/Footer.tsx` — remove WhatsApp Support
- `index.html` — meta tags
- `.env.local` — add VITE_STATSIG_CLIENT_KEY

### Deleted Files
- `src/components/Testimonials.tsx`
- `src/components/FinalCTA.tsx`
- `src/services/waitlistService.ts`
- `src/utils/scrollToForm.ts`

## Analytics Integration

- Statsig handles experiment exposure tracking automatically
- PostHog continues capturing all CTA clicks, section views, scroll depth
- Experiment variant names are added as properties to PostHog CTA events for cross-referencing
