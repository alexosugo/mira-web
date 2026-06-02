# Product

## Register

brand

## Users

Kenyan shop owners who sell through Instagram. They run small businesses (often solo or with a tiny team), are busy, non-technical, and social-first. Their working day already happens inside Instagram DMs: answering price checks, stock questions, size queries, and delivery logistics, often late at night. The job to be done: stop losing sales to slow replies without hiring staff or learning new software.

Secondary audience: SME owners in adjacent channels (WhatsApp, Facebook) who may join as Mira's channel coverage grows. The site speaks to the Instagram seller first.

## Product Purpose

Mira answers a shop's Instagram DMs and sells in them. It handles questions about pricing, stock, sizes, and delivery, builds a cart, and takes the customer through to checkout, all inside the DM thread. Tricky conversations get handed to the owner. Success looks like: a shop owner wakes up to completed orders, not a backlog of unanswered messages.

The site's own job: convince an Instagram seller to join the waitlist (or book a conversation) in one scroll. Multi-channel coverage is roadmap, not the pitch.

## Brand Personality

Helpful friend, not corporate product. Mira is a teammate, not a tool.

Three words: warm, capable, grounded.

Voice rules (full detail in `docs/voice-and-tone.md`):
- Casual and conversational. "You" and "your shop", never "our platform" and "users".
- Zero jargon. Never "AI-powered", "machine learning", "automation engine". Say what Mira does: answers, replies, builds a cart, hands over.
- Channel-specific. "Instagram DMs", not "messaging channels".
- Proof through specifics: "pricing, stock, sizes, and delivery" beats "all your inquiries".
- Light situational humor ("Your DMs at 2am? Mira's got it."). No exclamation points.

Emotional goal: relief and confidence. The visitor should feel "this gets my life" within the first screen.

## Anti-references

- **Generic SaaS landing**: gradient blobs, hero-metric blocks, identical feature card grids, stock "AI" aesthetics.
- **Corporate enterprise**: navy-suit fintech sobriety, dense jargon, Salesforce/IBM energy. Wrong for a helpful-friend brand.
- **Silicon Valley AI hype**: neon-glow dark mode, sparkle motifs, "magic" framing. The voice doc bans the vocabulary; the visuals should follow.
- **Cheap template look**: default Bootstrap/ThemeForest patterns. Mira asks owners to hand over their DMs; the site must look like it deserves that trust.

## Design Principles

1. **Sell in the DM, show the DM.** The core differentiator is "browse, pick, and buy in the DM". The strongest proof is showing a real-feeling DM conversation doing commerce, not describing it.
2. **Show what Mira does, never what powers it.** Demonstrations over claims. A chat transcript answering a size question beats any "intelligent" adjective.
3. **Talk like a teammate.** Every headline and button reads like a helpful friend texting, not a product announcing itself.
4. **Earn trust for a leap of faith.** Handing your DMs to software is scary. Specifics, proof, and craft quality carry the trust load; hype erodes it.
5. **Respect the seller's time.** One scroll to conviction. Every section earns its place or gets cut; the visitor is busy and on a phone.

## Accessibility & Inclusion

- Target: **WCAG 2.1 AA**. Body text ≥4.5:1 contrast, large text ≥3:1, visible focus states, full keyboard navigation.
- Every animation gets a `prefers-reduced-motion` alternative.
- Audience is mobile-first (Instagram sellers on phones); touch targets and small-viewport layout are first-class, not breakpoint afterthoughts.
- Light and dark themes both exist (`darkMode: 'class'`); both must independently meet contrast targets.
