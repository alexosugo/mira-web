---
target: features section
total_score: 24
p0_count: 1
p1_count: 2
timestamp: 2026-06-02T12-44-50Z
slug: src-components-features-tsx
---
# Critique: Features section (`src/components/Features.tsx`)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Chat demo auto-plays with typing indicator; canned loop, no replay control |
| 2 | Match System / Real World | 2 | "Instagram"-labeled avatar shows a pink/orange "M" badge; "Serve Everywhere / WhatsApp" contradicts Instagram-DM positioning |
| 3 | User Control and Freedom | 3 | Passive section; demo can't be replayed or paused |
| 4 | Consistency and Standards | 1 | Second chat demo with different bubble colors (blue/purple vs hero's navy); brand palette violated |
| 5 | Error Prevention | 3 | n/a (static marketing content) |
| 6 | Recognition Rather Than Recall | 3 | Cards self-describing |
| 7 | Flexibility and Efficiency | 2 | Six equal-weight cards force linear scanning; no hierarchy shortcut |
| 8 | Aesthetic and Minimalist Design | 1 | 6-card wall + duplicate demo + off-brand gradients + glass chrome |
| 9 | Error Recovery | 3 | n/a |
| 10 | Help and Documentation | 3 | Self-explanatory |
| **Total** | | **24/40** | **Acceptable: significant improvements needed** |

## Anti-Patterns Verdict

**AI slop: YES.** Both assessments converge.

**LLM assessment**: identical 6-card icon+heading+text grid (the named banned pattern), eyebrow pill ("What You'll Love" + heart icon), glassmorphism as default card chrome, and a generic-chatbot color story: Mira's reply bubbles are blue→purple gradient (rgb(59,130,246)→rgb(147,51,234)), the avatar pink→orange. None of it touches navy or lime.

**Deterministic scan**: CLI static scan returned **0 findings — a false-clean**. The slop hides behind `glass-card` (index.css:532: backdrop-blur 20px + 1px translucent border + 32px shadow) and `shadow-premium` (tailwind.config.js:70), which the static JSX scanner can't resolve. The in-browser detector found **14 verified findings inside Features** (0 false positives): 7× thin-border-wide-shadow (all 6 cards + chat wrapper, i.e. the glass chrome), 6× icon-tile-stack (64×64 tile over h3, every card), 1× nested-cards (glass wrapper around the white chat card). Page-wide it found 47 (33 outside Features, worst: 1.3:1 contrast in Benefits).

**Where they agree**: glass cards, icon-tile grid, nested chat card. **Detector caught what review folded together**: the "premium" shadow token itself is part of the signature. **Review caught what the detector can't**: positioning contradiction, duplicate proof surface, off-brand chat palette, 1.82:1 lime icons.

## Overall Impression

The section has the right *ingredient* (a localized DM transcript with M-Pesa and KES doing real commerce) wrapped in the wrong *container*: a generic SaaS feature wall with off-brand chatbot colors. The single biggest opportunity: stop repeating the hero's sell-demo and make this section prove the **handoff**, the one thing a skeptical seller actually fears.

## What's Working

1. **The chat transcript content is on-strategy**: M-Pesa, KES 32,000, "reserve one for you" is proof language, not adjectives. Sequential reveal with typing indicator is a nice touch.
2. **Lime checkmark bullets follow the Lime-on-Navy Rule exactly** (navy ✓ on lime fill). Keep them.
3. **Technical hygiene is solid** (browser-verified): no horizontal overflow at 320/390/1440, dark-theme contrast passes everywhere (6.34:1 to 10.32:1), reduced motion shows all cards.

## Priority Issues

- **[P0] Lime icons fail contrast and blow the lime budget.** Browser-measured: icon #a8c426 on lime tile rgb(244,248,221) = **1.82:1**; eyebrow heart on its badge = **1.80:1** (need 3:1 for graphics). Six lime tiles at once turns the signal into decoration. **Fix**: navy icons on the light tiles; reserve lime for the single card that is the real signal. **Suggested command**: /impeccable quieter + /impeccable colorize.
- **[P1] "Serve Everywhere / WhatsApp" reintroduces dead positioning.** First card a skeptic reads contradicts the Instagram-DM-commerce claim (CLAUDE.md: multi-channel framing is legacy). **Fix**: rewrite to Instagram-DM-specific value; drop WhatsApp. **Suggested command**: /impeccable clarify.
- **[P1] Off-brand chat demo + duplicate proof surface.** Blue/purple Mira bubbles and pink/orange avatar violate the chat-transcript spec (navy bubbles, lime action states); and it is the page's second sell-demo after the hero. **Fix**: recolor to navy/lime, then repurpose the demo to prove the *handoff* (Mira escalating to the owner with context), converting redundancy into a complementary second beat. **Suggested command**: /impeccable shape (handoff demo) then /impeccable craft or polish.
- **[P2] Glass chrome on every card.** `glass-card` (blur 20px) is the resting state of all 6 cards + chat wrapper; renders as plain white-on-white anyway (sampled 255,255,255) while costing GPU on mid-range Androids; detector-verified thin-border-wide-shadow ×7 and nested-cards ×1. **Fix**: replace with solid surfaces + honest 1px border or small shadow; un-nest the chat card. **Suggested command**: /impeccable quieter.
- **[P2] Six undifferentiated cards.** Fails chunking (>4 per group) and hierarchy; textbook grid slop. **Fix**: cut/merge to 3-4 or break the grid (one wide lead feature + supporting); exactly one lime signal. **Suggested command**: /impeccable layout.

## Persona Red Flags

- **Jordan (first-timer)**: the "Instagram" label with a pink/orange "M" avatar; can't tell whether the demo is Instagram or Mira.
- **Casey (distracted mobile)**: 6 cards + 3 bullets + full transcript = long unskimmable scroll; backdrop-blur 20px is GPU cost with zero visual payoff on white.
- **Wanjiru (Kenyan thrift seller, mid-range Android)**: 1.82:1 pale lime icons unreadable in daylight; WhatsApp copy confuses an Instagram-only seller; blue/purple bubbles don't look like her actual Instagram DMs, weakening believability.

## Minor Observations

- Em dash in visible body copy (Features.tsx:205) and in SOLUTION_COPY `full_journey` variant (useExperiments.ts:76); voice doc bans them. Variant copy is a live experiment payload; change deliberately.
- Dead conditional branches (Features.tsx:181-184) checking for "30 minutes" / "24/7" that no feature contains; copy drift.
- Triple framing stack (eyebrow "What You'll Love" + h2 + subhead), repeated as the same scaffold in HowItWorks/Benefits.
- Commented-out "Smart Automation" badge left in source (197-200); "automation" is near-banned vocabulary.
- Timestamp hack `2:3{4+index}` is brittle past 5 messages.
- `min-h-[300px]` chat space reservation prevents CLS; good.

## Questions to Consider

1. If the hero already proves Mira *selling*, why does Features repeat a sell demo instead of proving the **handoff**, the one thing a skeptical owner actually fears?
2. What is the single feature that would make Wanjiru hand over her DMs, and why isn't the section built around it?
3. Strip the logo: could anyone tell this blue/purple demo is *Mira's* and not any generic bot's?
