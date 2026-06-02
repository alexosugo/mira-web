---
target: hero
total_score: 25
p0_count: 2
p1_count: 2
timestamp: 2026-06-02T11-37-03Z
slug: src-components-hero-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | CTA has hover/active/focus feedback, but window.location.href redirect fires with no pending state (Hero.tsx:91-95) |
| 2 | Match System / Real World | 3 | "Instagram sellers", "Shop", "DMs" land; headline itself is generic, subcopy carries em dashes |
| 3 | User Control and Freedom | 3 | Global prefers-reduced-motion honored (index.css:451); no traps |
| 4 | Consistency and Standards | 2 | The hero violates its own DESIGN.md: gradient text, blobs, sparkle, lime-on-white |
| 5 | Error Prevention | 2 | No forms here; only risk is the feedback-less hard redirect |
| 6 | Recognition Rather Than Recall | 4 | Single CTA, plain language, nothing to memorize |
| 7 | Flexibility and Efficiency | 2 | Header CTA and hero CTA are the same label, same URL: a duplicate, not a second path |
| 8 | Aesthetic and Minimalist Design | 2 | Clean column undermined by blobs, shimmer, sparkle, bottom fade |
| 9 | Error Recovery | 2 | N/A for a static hero; honest neutral |
| 10 | Help and Documentation | 2 | No orientation microcopy near the CTA; "How it works" only in nav |
| **Total** | | **25/40** | **Acceptable: significant improvements needed** |

## Anti-Patterns Verdict

Yes, reads AI-generated within two seconds. Every tell is a named ban in the project's own spec:
- Gradient text on "Shop" and "You" (Hero.tsx:58, 64 -> index.css:765-772), animated infinitely
- Three floating gradient blobs with animate-float-gentle + blur-3xl (Hero.tsx:33-35)
- Sparkles icon in a glass eyebrow badge (Hero.tsx:49): the "Silicon Valley AI hype" anti-reference verbatim
- Glassmorphism badge chrome (backdrop-blur-sm on a static span, Hero.tsx:44-48)
- Em dashes in rendered experiment subcopy (useExperiments.ts:70-71)

Deterministic scan: detect.mjs returned 0 findings (exit 0) on Hero.tsx. False clean: every tell hides behind a custom class defined in index.css that the static markup scanner cannot resolve. Browser overlay skipped (no Playwright, no dev server).

## Priority Issues

- [P0] Gradient text makes headline key words unreadable in light theme. Lime #C0DC2D on #fafaf9 is ~1.5:1 (needs 3:1 for large text). Breaks gradient-text ban, Lime-on-Navy Rule, animation-on-static. Fix: delete .gradient-text from both spans; keep the lime underline as the emphasis. (Hero.tsx:58,64)
- [P0] No DM transcript: violates "Sell in the DM, show the DM" (PRODUCT.md principle 1). Fix: build the signature Chat Transcript component (DESIGN.md section 5) as the hero visual.
- [P1] Blobs + sparkle + glass badge are the banned anti-references; also GPU-expensive blur-3xl on mid-range Android. Fix: delete blob layer (Hero.tsx:33-35) and bottom fade (Hero.tsx:109); drop Sparkles; restyle badge as plain navy chip.
- [P1] Eyebrow badge text-lime-600 on lime-500/10 near-white ~1.9:1 at 14px (needs 4.5:1). Fix: navy text on light chip or lime on navy chip. (Hero.tsx:44-48)
- [P2] Duplicate CTA (Header.tsx:112 / Hero.tsx:100, same label+URL) and content gated on JS-triggered reveal (opacity-0 until isVisible, Hero.tsx:55). Fix: anchor secondary action to How-it-works; visible-by-default content with enhancing animation.

## Persona Red Flags

- Jordan (first-timer): headline never says what Mira is; no transcript; leaves first screen guessing.
- Casey (mobile): blobs + shimmering headline compete with CTA; text-6xl at 320px risks awkward wraps.
- Wanjiru (Kenyan IG seller, mid-range Android): ~1.5:1 lime words near-invisible in daylight; blur-3xl stutter risk; gets a sparkle and slogan instead of a DM doing a real sale.

## Minor Observations

- Headline hardcoded while CTA/subcopy are experiment-driven; not A/B-testable (Hero.tsx:57-68)
- min-h-[90vh] can clip on short landscape phones; consider svh units (Hero.tsx:29)
- Underline SVGs need aria-hidden (Hero.tsx:59, 65)
- will-change left on permanently after entrance animations (index.css:207)
- Subcopy em dashes violate copy rules (useExperiments.ts:70-71)

## Questions to Consider

1. If the first principle is "show the DM," why does the highest-attention surface spend its pixels on banned blobs and zero DMs?
2. The two emphasized words are the two words a seller in daylight cannot read. What is the gradient buying?
3. What would this hero look like if the chat transcript WERE the hero, and the copy merely captioned it?
