# Sellogram Gate 2 Compact Identity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create and evaluate three compact Sellogram identity territories for favicon, app-icon, social-avatar, and small UI use without abbreviating the brand as SG.

**Architecture:** Use the selected Disciplined wordmark master as the only geometry source. Produce three compact territories as vector-only SVGs: a proprietary loop/device derived from the rounded counter language, a recognizable fragment derived from the wordmark, and an extreme wordmark crop. Render each at favicon and avatar sizes on the current Sellogram paper/ink/fern/night palette, then select one compact master before channel-kit implementation.

**Tech Stack:** SVG vector geometry; Python/uv rendering helpers; Pillow/CairoSVG or Inkscape for raster review exports; existing Vitest asset-contract tests.

**Spec:** `docs/superpowers/specs/2026-09-03-sellogram-rebrand-design.md`

## Global Constraints

- Canonical public name is `Sellogram`: uppercase `S`, lowercase `ellogram`.
- Sellogram is one cohesive word. Never abbreviate it as `SG` and never create an `SG` monogram.
- Compact marks must derive from the selected wordmark geometry, not from unrelated iconography.
- Avoid Instagram camera/ring visual territory and avoid a mark that reads as an Instagram derivative.
- Master assets are vector SVGs. Raster exports are generated review outputs only.
- Test 16x16, 32x32, 180x180, 192x192, 512x512, and social-avatar scale.

---

### Task 1: Lock Gate 1 master and asset contract

**Files:**
- Create: `brand/identity/wordmark/master/sellogram.svg`
- Modify: `brand/identity/wordmark/README.md`
- Modify: `src/test/brand-wordmark.test.ts`

**Interfaces:**
- Consumes: `brand/identity/wordmark/candidates/disciplined/sellogram-disciplined.svg`.
- Produces: authoritative wordmark geometry for all Gate 2 derivations.

- [ ] Copy the selected Disciplined vector byte-for-byte to the master path.
- [ ] Record Disciplined as selected and mark Faithful/Characterful as historical candidates.
- [ ] Add tests that require the master SVG, vector-only construction, `currentColor`, `1264x300` viewBox, and byte equality with the selected candidate.
- [ ] Run the focused Vitest asset test and commit.

### Task 2: Create the three compact identity territories

**Files:**
- Create: `brand/identity/symbol/candidates/loop/sellogram-loop.svg`
- Create: `brand/identity/symbol/candidates/fragment/sellogram-fragment.svg`
- Create: `brand/identity/symbol/candidates/crop/sellogram-crop.svg`
- Create: `brand/identity/symbol/README.md`
- Modify: `src/test/brand-wordmark.test.ts`

**Interfaces:**
- Consumes: selected wordmark master.
- Produces: three vector-only compact identity candidates.

- [ ] **Loop/device:** build a proprietary rounded device from the wordmark's circular counter and terminal language. It must not read as a letter G, SG, or a camera glyph.
- [ ] **Fragment:** isolate a recognizable non-initial fragment of the wordmark geometry and normalize it into a square without inventing new strokes.
- [ ] **Crop:** define a square clipping/viewBox treatment of the actual wordmark, intentionally oversized, with no abbreviation or replacement lettering.
- [ ] Keep all candidates single-color and `currentColor`-driven.
- [ ] Add tests prohibiting `<text>`, font references, `SG`, and non-square viewBoxes.
- [ ] Run focused tests and commit.

### Task 3: Render real-size evaluation boards

**Files:**
- Create: `scripts/brand/render-compact-identity-review.py`
- Create generated review outputs under `/tmp` or another non-authoritative review location.

**Interfaces:**
- Consumes: three Gate 2 SVG candidates.
- Produces: human-review board with all required sizes and color contexts.

- [ ] Render each SVG directly through a vector rasterizer, never through a thresholded binary mask.
- [ ] Show 512px, 192px, 180px, 32px, and 16px outputs plus circular social-avatar clipping.
- [ ] Show ink-on-paper, paper-on-night, and fern-backed/avatar contexts where appropriate.
- [ ] Reject any candidate that becomes ambiguous at 32px, collapses at 16px, resembles Instagram's camera mark, or implies SG shorthand.
- [ ] Present the three candidates for selection.

### Task 4: Promote the selected compact master

**Files:**
- Create: `brand/identity/symbol/master/sellogram-symbol.svg`
- Modify: `brand/identity/symbol/README.md`
- Modify: `brand/README.md`
- Modify: `src/test/brand-wordmark.test.ts`

**Interfaces:**
- Consumes: explicitly selected Gate 2 candidate.
- Produces: authoritative compact identity for Gate 4 website and Gate 5 channel assets.

- [ ] Copy selected geometry to master.
- [ ] Document intended uses: favicon/app icon/avatar/small UI only; full wordmark remains primary identity where space allows.
- [ ] Run focused tests and repository lint/test/build verification before Gate 3 begins.
