---
target: features section
total_score: 30
p0_count: 0
p1_count: 2
timestamp: 2026-06-02T13-31-32Z
slug: src-components-features-tsx
---
# Critique: Features section (`src/components/Features.tsx`) — post-rework

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Handoff chip + outcome line convey state well; n/a-ish |
| 2 | Match System / Real World | 4 | DM thread, KES pricing, "Sasa", monogram request ring true for the audience |
| 3 | User Control and Freedom | 3 | Nothing traps the user |
| 4 | Consistency and Standards | 2 | Owner bubble visually identical to Mira's (navy, right-aligned); only an 11px label separates human from bot |
| 5 | Error Prevention | 3 | n/a |
| 6 | Recognition Rather Than Recall | 3 | Hero-thread continuity requires recalling the hero avatar 3 screens later; unsupported on-screen |
| 7 | Flexibility and Efficiency | 3 | Single linear read; fine for a landing section |
| 8 | Aesthetic and Minimalist Design | 3 | Strong, but four enumerations stack (lead card, 3-card grid, checklist, transcript), two redundant |
| 9 | Error Recovery | 3 | n/a |
| 10 | Help and Documentation | 3 | n/a |
| **Total** | | **30/40** | **Good: solid foundation, address weak areas** |

## Anti-Patterns Verdict

**AI slop: leaning no (mixed).** Up from a flat "yes."

**LLM assessment**: the lead-card hierarchy break rescues the grid from template-grade; no gradient text, no glass, no eyebrow, believable DM thread. Residual: the three supporting cards are still an identical icon-tile/heading/body row.

**Deterministic scan**: CLI static scan 0 findings; custom-class audit confirms no glass/gradient/glow/shimmer tokens used by either file. In-browser detector: **3 findings inside Features, all three verified false positives** (gray-on-color heuristic on navy-100-on-navy at a measured 12.49:1; clipped-overflow on the rounded demo card with zero children actually clipped; nested-cards on the handoff chip with no parent card). Down from 14 verified findings pre-rework. Page-wide: 35 findings, concentrated in Benefits (12) and HowItWorks (7).

## Overall Impression

The section now has a reason to exist: the handoff transcript is a precise, demonstrated answer to the trust objection, and the lead card gives the grid a clear #1. What remains is sharpening, not rescue: the human-takeover beat is visually muted, lime is spent on decoration alongside the one true signal, and two enumerations restate each other.

## What's Working

1. **The handoff narrative works**: "let me bring in Nia" → lime chip → owner closing, a demonstrated answer to "will the bot lock me out?" (browser-verified)
2. **Lead-card hierarchy break**: full-width navy bar with solid lime icon avoids flat 4-up monotony; copy is concrete and on-voice.
3. **Accessibility genuinely clean** (browser-verified): every text pair ≥7.56:1 light / ≥7.72:1 dark; zero overflow at 320/390/1440 both themes; reduced motion fully visible; no flash or blank state on scroll entrance.

## Priority Issues

- **[P1] Owner and Mira bubbles are visually identical.** Both navy, right-aligned, same radius; only the 11px "Nia, that's you" label separates the human from the bot, muting the section's entire point. **Fix**: distinct owner treatment (lime-tinted border or name chip) so the human takeover is unmistakable at a glance. **Suggested command**: /impeccable polish.
- **[P1] Lime is decoration, not signal.** 5 lime instances: lead icon tile, 3 solid checkmark circles (static list = decoration), 1 handoff chip (the only true signal). Passes the ≤10% budget; violates the signal-only intent. **Fix**: demote checkmark circles to navy/neutral; reserve solid lime for the chip (and arguably the lead tile). **Suggested command**: /impeccable quieter.
- **[P2] Redundant enumeration.** The 3-card grid and the handoff checklist restate each other ("Product Expert"/"Every DM answered" vs "Handles common product questions"/"Shares clear pricing") one screen apart. **Fix**: cut the checklist; let the transcript carry the proof. **Suggested command**: /impeccable distill.
- **[P2] "Safe and private" is an unsupported claim** in a section built on demonstration. **Fix**: make it specific (what stays private, from whom) or cut it. **Suggested command**: /impeccable clarify.
- **[P3] Continuity between the two DM mockups is invisible.** Same avatar and palette as the hero, but the "same thread, later" link requires recall. Currently leans redundant rather than reinforcing. **Fix**: a light temporal cue in the handoff header ("Later that night"). **Suggested command**: /impeccable polish.

## Persona Red Flags

- **Jordan (first-timer)**: reads two right-aligned navy bubbles and can't tell the second is the human owner; the "you stay in control" message can be lost entirely.
- **Casey (distracted mobile)**: no overflow or breaks, but two overlapping enumerations before the demo tax a skim.
- **Kenyan IG seller (mid-range Android)**: content is reassuring and on-voice. The entrance stagger fires on mount, completing before the user scrolls there; no flash or blank (verified), but the motion is effectively unseen.

## Minor Observations

- Handoff chip is `rounded-full`, hero's cart chip is `rounded-2xl rounded-br-md`; minor signal-chip inconsistency.
- Supporting cards have hover border tints but aren't clickable (mild false affordance, low risk).
- Lead Clock icon duplicates Benefits' first icon.
- Features correctly drops the eyebrow that HowItWorks still carries; sibling divergence until the page-wide pass.
- In-character "Sasa!" exclamation carve-out holds (real-world dialogue, scored under heuristic 2 as a strength).

## Questions to Consider

1. If the handoff transcript is the strongest proof, why is it visually subordinate to a grid of claims? Should the demo lead the section?
2. Would one continuous thread scrolling from sale to handoff prove the narrative better than two separate mockups of the same shop?
3. Is "Safe and private" earning its slot, or is it there to make the grid a tidy 3?
