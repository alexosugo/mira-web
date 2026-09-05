# Sellogram Rebrand → Staging Merge Plan

Status: draft, no changes made yet.
Scope: merge `vega/feature/rebrand` (Mira → Sellogram rename, new brand identity/assets) into `staging`, without losing the content-pages system that landed on `staging` after the two branches diverged.

## Common ancestor

Both branches share `81607a5` (Jun 25, right after PR #9 astro migration). From there:

- `staging` (now `3807b35`) built the content-pages system: `src/lib/routes.ts`, `src/lib/page-variant.ts`, `src/lib/llms.ts`, `src/lib/structured-data.ts`, `src/lib/voice.ts`, `src/layouts/ContentLayout.astro`, `src/content/pages.ts`, `src/components/PricingMatrix.tsx`, `src/components/content/*.astro`, and ~15 new `.astro` pages (use-cases, features, trust/legal).
- `feature/rebrand` (now `0cff77e`) renamed Mira → Sellogram across active brand-facing files, replaced favicons/wordmark/web manifest, added `brand/` (identity system) and `brand-assets/` (exported logo/social/template files), dropped `DESIGN.md` in favor of `brand/foundations.md`, and made a small dependency/lockfile cleanup in its last commit.

A raw diff between the two branches looks like it "deletes" the whole content-pages system — it doesn't. `feature/rebrand` never saw those files; they don't exist on that branch. This is a stale-base artifact, not an intentional removal.

## Independent review (Opus, 2026-09-04)

An independent agent re-derived every claim in this plan directly from git rather than trusting the summary. Verdict: the true-conflict file list, the typography conflict, the color non-conflict, the domain/email claims, and the rebrand-name.test.ts gap all checked out exactly as written. It also found blockers and scope gaps this plan missed — folded in below, and the merge mechanics changed as a result (squash, not rebase).

**Blockers found (not optional, must be handled before/during resolution):**

1. **`@astrojs/sitemap` removal breaks the build.** `staging`'s `astro.config.mjs` imports and calls it (`import sitemap from '@astrojs/sitemap'` / `sitemap({…})`); rebrand's `package.json` drops the dependency, and rebrand's own `astro.config.mjs` never imports it. Merging rebrand's `package.json` onto staging's `astro.config.mjs` as-is is a hard build failure. **Keep `@astrojs/sitemap`** in `package.json` regardless of what rebrand's diff says; `@types/three` and `three` are safe to drop (confirmed unused on staging).
2. **`src/test/brand-foundations.test.ts` (rebrand-only, applies cleanly) asserts the exact Fraunces/Instrument Sans strings** in both `tailwind.config.js` and `brand/foundations.md`. Since typography stays on staging's Archivo/Source Sans 3, this test goes red on merge and must be rewritten to assert the actual shipped fonts, not just left alone.
3. **`rebrand-name.test.ts`'s own third assertion is already broken on `feature/rebrand` HEAD** — it asserts both `elite`/`footer` contain `'hello@sellogram.co'` and then, in the same loop, that neither contains `'sellogram.co'`. That's a live self-contradiction, confirmed against real file content. Fix to a narrower assertion (e.g. `not.toContain('app.sellogram.co')`) as part of extending this file, not after.
4. **`BaseLayout.astro`'s typography resolution is bigger than `tailwind.config.js`.** Rebrand's version has a Google Fonts `<link>` for Fraunces/Instrument Sans and an inline `font-family` on `<body>`; staging's has the Archivo/Source Sans 3 equivalents plus a `data-page-name={pageName}` attribute rebrand's version lacks. Resolving only `tailwind.config.js` in staging's favor and taking rebrand's `BaseLayout.astro` as-is would ship Archivo/Source Sans 3 Tailwind classes against Fraunces/Instrument Sans font downloads — no test failure, silently wrong rendering. Resolve both files together, and preserve `data-page-name`.
5. **`brand-assets/` is a delete-vs-add, not a clean add.** Rebrand deletes all 17 files under `brand-assets/` (replaced by the new `brand/` tree). Staging separately added `brand-assets/screenshot.png` (2.6MB) into that same directory. Nothing on staging references it (grep-confirmed) — call: keep or drop that one file before finishing the merge.

**Rename scope was undercounted:**

6. **`mira` is a data field name, not just prose, and the case-sensitive `\bMira\b` regex the test uses won't catch it.** `src/content/pages.ts` declares `mira: string` and `miraHelps: string[]`, consumed by `DmThread.astro` (`item.mira`), `ContentLayout.astro` (`miraHelps={section.miraHelps}` into `PairedLedger`), and `llms.ts`. Extending `activeBrandFiles` per step 8 below can go green while `item.mira` still exists in the codebase. Needs its own explicit call: rename the field (touches the type def, ~15 data literals, two component prop signatures, and 3 test files) or leave it as an internal-only identifier.
7. **Two more staging tests assert literal "Mira" copy and need edits, not just re-verification**: `src/test/llms.test.ts` (`toStartWith('# Mira\n')`, `toContain('> Mira answers Instagram DMs')`) and `src/test/routes.test.ts` (`const SUFFIX = '| Mira'`).

**Corrections to earlier claims in this plan:**

- Rebrand branch is **61 commits** ahead of the common ancestor, not ~50.
- `PricingMatrix.tsx` needs **no** rename sweep — it has zero "Mira" matches, only a `withmira.co` URL that the deferred-domain decision already keeps as-is.
- The "clean-apply" list below was also missing `PRODUCT.md` and `README.md` (rebrand touched, staging didn't).

## Merge mechanics

**Use `git merge --squash`, not a rebase.** With this many judgment calls already locked in (typography reverts to staging, the sitemap dependency must survive, `brand-assets/` needs a keep/drop call, the `mira` field needs a scope decision), a 61-commit rebase would force resolving `tailwind.config.js` and `BaseLayout.astro` repeatedly against intermediate trees where the right answer isn't visible yet. A squash resolves the 15 true-conflict files once, against the final tree, with every decision already in view:

```
git switch -c rebrand-merge vega/staging
git merge --squash vega/feature/rebrand
```

Rebrand's 61 commits are mostly wordmark-candidate iteration and favicon regeneration — nothing worth preserving individually or bisecting later. Skim `git log --oneline 81607a5..vega/feature/rebrand` once to note the handful of real behavior-change commits (`0cff77e removes obsolete files`, `26f0702 fix(brand): increase header wordmark size`) in the squash commit message.

### True conflict files (touched on both sides since the common ancestor)

```
CLAUDE.md
DESIGN.md                      → rebrand deletes it in favor of brand/foundations.md; confirm that's still wanted
docs/voice-and-tone.md
package-lock.json              → don't hand-merge; resolve code conflicts, then regenerate
package.json                   → rebrand drops @astrojs/sitemap, @types/three; bumps vite ^5.4.2 → ^8.2.2
src/components/EliteContactModal.tsx
src/components/Footer.tsx
src/components/Handles.tsx
src/components/Header.tsx
src/components/Hero.tsx
src/components/HowItWorks.tsx
src/components/NightShift.tsx
src/components/Pricing.tsx
src/layouts/BaseLayout.astro
tailwind.config.js
```

### Clean-apply files (rebrand touched, staging left untouched since the common ancestor — no real conflict, just review on merge)

```
src/components/HeroChatDemo.tsx   → renames chat actor id 'mira' → 'sellogram'
src/test/HeroChatDemo.test.tsx
```

### Files rebrand adds outright (brand system, assets, scripts, tests)

`brand/`, `brand-assets/`, `scripts/brand/*.py`, `public/mstile-150x150.png`, `docs/superpowers/plans/2026-09-03-sellogram-*.md`, `docs/superpowers/specs/2026-09-03-sellogram-rebrand-design.md`, `src/test/brand-foundations.test.ts`, `src/test/brand-wordmark.test.ts`, `src/test/rebrand-name.test.ts`, `src/test/web-brand-assets.test.ts`. These apply cleanly; no staging equivalent exists yet.

### Files rebrand replaces in place (exist on staging unmodified since the common ancestor)

`public/favicon.svg`, `public/favicon.ico`, `public/favicon.png`, `public/favicon-light.svg`, `public/favicon-16x16.png`, `public/favicon-32x32.png`, `public/apple-touch-icon.png`, `public/android-chrome-192x192.png`, `public/android-chrome-512x512.png`, `public/browserconfig.xml`, `public/site.webmanifest`. Rebase applies cleanly (staging never touched these), but this is a real asset swap, not an addition — worth eyeballing the rendered favicons/manifest after rebase. Note `site.webmanifest`'s `theme_color`/`background_color` also change (`#C0DC2D`/`#13243E` → `#F2F6F3`/`#F2F6F3`), consistent with the new palette.

## The real gap: the rename contract doesn't know about content-pages

`src/test/rebrand-name.test.ts` enforces the rename via a hardcoded `activeBrandFiles` list:

```
EliteContactModal.tsx, Footer.tsx, Handles.tsx, Header.tsx, Hero.tsx,
HeroChatDemo.tsx, HowItWorks.tsx, NightShift.tsx, Pricing.tsx,
BaseLayout.astro, PRODUCT.md, README.md, CLAUDE.md,
docs/voice-and-tone.md, public/site.webmanifest
```

That list was correct for the tree `feature/rebrand` branched from. It has **no idea the content-pages system exists**. After rebase, these files will still say "Mira" and pass CI green while being inconsistent with the rest of the site:

```
src/content/pages.ts            229 word-boundary matches of "mira" (plans, page copy, structured data)
src/lib/routes.ts                39 matches
src/lib/llms.ts                  10 matches
src/layouts/ContentLayout.astro   4 matches
src/lib/structured-data.ts        2 matches
src/lib/voice.ts                  1 match
src/components/content/ContentHero.astro
src/components/content/DmThread.astro
src/components/content/PairedLedger.astro
src/components/content/ThreadScene.astro
src/test/routes.test.ts          asserts route phrases don't contain 'mira' — keep, but verify it still passes after rename
```

**Action**: extend `activeBrandFiles` (or add a second assertion block) to cover these files, then do the actual string rename across them. Don't treat "rebrand-name.test.ts passes" as proof the rename is complete — it only covers the file list as of Jun 25.

## Domain and email: a mixed, deliberate state — not a blanket find/replace

`feature/rebrand` explicitly defers the domain cutover (test: `'does not migrate legacy URLs until the domain cutover is explicitly requested'`):

- `app.withmira.co` — **kept** in Header, Hero, Pricing, EliteContactModal, BaseLayout, README (app isn't live at a new domain yet)
- `hello@withmira.co` → **changed** to `hello@sellogram.co` in EliteContactModal on the rebrand branch
- `public/robots.txt` sitemap URL (`https://withmira.co/sitemap-index.xml`) — staging-only edit, rebrand never touched it; decide whether this cutover is in scope now or stays deferred alongside the rest of the domain

Carry the mixed state forward deliberately during conflict resolution in `EliteContactModal.tsx` — don't resolve it as a blanket "keep ours" or "keep theirs".

## Typography conflict — a real design decision, not a rename artifact

`tailwind.config.js` conflict is not just Mira→Sellogram comment text. Both branches changed the actual font stack, in opposite directions, on the same day:

- `staging` (`036b2fe`, `8b0196c`, today): `display: Archivo`, `body: "Source Sans 3"`, plus a new `letterSpacing.tight: '-0.05em'` token — used across 24 call sites in `src/`.
- `feature/rebrand`: `display: Fraunces`, `body: "Instrument Sans"` — matching the original `DESIGN.md` pairing, and **explicitly locked in `brand/foundations.md`** ("Use Fraunces for major headings... Use Instrument Sans for body copy, navigation, buttons, form controls, labels, and interface text").

Colors are not in conflict — both branches carry the same "Morning light" palette (`paper`/`fern`/`dawn` hex values match), confirmed by staging's own `ec0f599 feat: align website with the Mira brand bundle`. Only the type system is contested.

**Decision (user, 2026-09-04): keep staging's typography.** `display: Archivo`, `body: "Source Sans 3"`, and the `letterSpacing.tight: '-0.05em'` token stay as-is. During the `tailwind.config.js` conflict, resolve the `fontFamily`/`letterSpacing` block in favor of `staging`, take rebrand's side only for the Mira→Sellogram comment text and any color/asset-related additions. `brand/foundations.md` needs a follow-up edit to drop the Fraunces/Instrument Sans language so the brand doc matches what's actually shipping — flagging as a required edit during the merge, not optional cleanup.

## PricingMatrix.tsx — not a deletion, just doesn't exist yet on rebrand

`PricingMatrix.tsx` didn't exist at the common ancestor; it's a `staging`-only addition (pricing table reading `PLANS` from `src/content/pages.ts`, used by `ContentLayout.astro`). It survives the merge untouched by rebrand. Correction: it needs **no** rename sweep of its own — it has zero "Mira" matches; its only string reference is the `app.withmira.co` URL, which the deferred-domain decision already keeps as-is.

## Other things worth deciding, not assuming

1. **`DESIGN.md` removal — decided: keep it.** Reject rebrand's deletion during conflict resolution; `DESIGN.md` stays in the tree alongside `brand/foundations.md`. Confirm nothing in `staging`'s newer docs (`docs/mixpanel-handoff.md`, content-page linear issue docs) needs updating as a result — they still point at `DESIGN.md` by name, which stays valid.
2. **Vite `^5.4.2` → `^8.2.2` — decided: keep the bump.** Accept it as part of `package.json` conflict resolution. Still worth a build/dev-server smoke test after rebase since it's a major version jump, even though it's accepted.
3. **`@astrojs/sitemap` and `@types/three` removed** — confirm nothing added by `staging`'s content-pages work (structured-data, sitemap routes) still depends on `@astrojs/sitemap`.
4. **`package-lock.json`** — don't hand-resolve; resolve `package.json` first, then run the package manager's install to regenerate the lockfile.
5. **Test suite churn** — rebrand's diff appears to delete `content-voice.test.ts`, `routes.test.ts`, `use-cases.test.ts`, `page-variant.test.ts`, etc. These are stale-base artifacts (files rebrand never had), not deliberate removals — they must survive the rebase since the features they cover are still on `staging`.
6. **`.playwright-mcp/*.yml`** — staging has ~17 committed Playwright MCP page snapshots referencing `withmira.co`. Unrelated to this merge but flagging as repo hygiene; not blocking.
7. **`public/robots.txt` sitemap domain — decided (revised, 2026-09-04): change to `sellogram.co`.** Update `Sitemap: https://withmira.co/sitemap-index.xml` to the `sellogram.co` domain during the merge. Note this is a deliberate exception to the otherwise-deferred domain cutover (`app.withmira.co` still stays as-is per `rebrand-name.test.ts`, and this doesn't change that) — only the sitemap reference moves. Also update `astro.config.mjs`'s `site: 'https://withmira.co'` at the same time, since it drives sitemap generation and canonical URLs; leaving it on the old domain while `robots.txt` points at the new one would produce a mismatched sitemap.
8. **`rebrand-name.test.ts` coverage gap — decided: extend it, then do the rename.** Add `src/content/pages.ts`, `src/lib/routes.ts`, `src/lib/llms.ts`, `src/lib/structured-data.ts`, `src/lib/voice.ts`, `src/layouts/ContentLayout.astro`, and the 4 `src/components/content/*.astro` files to `activeBrandFiles` (or a parallel assertion block, since some of these are `.astro` not plain string files), then perform the actual Mira→Sellogram rename across them so the test passes on real content, not just an unchanged file list.

## Sequence

1. Create `rebrand-merge` off current `vega/staging` (don't touch `feature/rebrand` directly): `git switch -c rebrand-merge vega/staging`.
2. `git merge --squash vega/feature/rebrand`, resolving the 15 true-conflict files per the notes above — including the blockers (keep `@astrojs/sitemap`, resolve `BaseLayout.astro`'s fonts alongside `tailwind.config.js`, decide `brand-assets/screenshot.png`).
3. Sweep the rename across the content-pages files listed under "the real gap," fix `rebrand-name.test.ts`'s broken third assertion, extend its file coverage, rewrite `brand-foundations.test.ts` to assert the actual shipped fonts, update `llms.test.ts` and `routes.test.ts`, and make an explicit call on the `mira`/`miraHelps` field rename.
4. Resolve `package.json` conflicts (keep `@astrojs/sitemap`, drop `@types/three`/`three`, accept the Vite bump), then regenerate `package-lock.json` via install (don't hand-merge the lockfile).
5. Update `public/robots.txt` and `astro.config.mjs`'s `site` value to the `sellogram.co` domain together, per the decision above.
6. **Hard gate before anything else**: `astro build` plus the full vitest run, given the three-major Vite jump landing alongside an Astro 7 / Vitest 4 stack. Don't proceed past a failure here.
7. Run the full test suite, lint, and typecheck again after all resolution work.
8. ~~Reconcile `origin/staging` and `vega/staging`.~~ **Resolved (2026-09-04): not needed.** Re-checked immediately before execution — both remotes are identical, no divergence.
9. Open a PR from `rebrand-merge` into `vega/staging`, then mirror the same merge to `origin/staging`.

## Final calls (user, 2026-09-04)

- `mira`/`miraHelps` fields in `pages.ts`: **rename** to `sellogram`/`sellogramHelps` (and all consumers), for full consistency with the brand change.
- `brand-assets/screenshot.png` (2.6MB, added on staging, unreferenced): **drop it**. Rebrand's deletion of the folder wins.
