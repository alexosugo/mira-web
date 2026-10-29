# Sellogram Gate 1 Wordmark Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the approved `Sellogram` reference artwork into three high-fidelity vector refinements, present them at real usage sizes, and select one production master before any compact mark or channel asset work begins.

**Architecture:** Preserve the approved artwork as the immutable visual reference. Build a deterministic vectorization/refinement tool that segments the nine letterforms, smooths and normalizes their contours, applies candidate-specific optical spacing and proportional adjustments, and exports outlined SVG masters plus raster review sheets. Automated tests verify casing, vector-only construction, viewBox integrity, candidate naming, and required preview sizes.

**Tech Stack:** Python 3 + Pillow + OpenCV for mask/contour work; SVG path output; existing Node/Vitest test runner for repository validation; PNG review exports generated from SVG/raster geometry.

**Spec:** `docs/superpowers/specs/2026-09-03-sellogram-rebrand-design.md`

## Global Constraints

- Public brand name is `Sellogram`: uppercase `S`, lowercase `ellogram`.
- Sellogram is one cohesive word and must never be abbreviated or represented as `SG`.
- Preserve the approved heavy, rounded, soft, compact wordmark character.
- Gate 1 produces refinements of the same chosen concept, not alternative logo concepts.
- No gradients, shadows, bevels, outlines, decorative marks, or unrelated flourishes.
- Vector masters are authoritative; raster files are generated review/output assets.
- Do not begin the compact identity or channel assets until the Gate 1 master is approved.

---

### Task 1: Establish the Gate 1 source and validation contract

**Files:**
- Create: `brand/README.md`
- Create: `brand/identity/wordmark/README.md`
- Create: `brand/identity/wordmark/source/source-uppercase.png`
- Create: `src/test/brand-wordmark.test.ts`

**Interfaces:**
- Consumes: approved attached reference artwork `source-uppercase(2).png`.
- Produces: repository rules and test expectations used by all Gate 1 assets.

- [ ] **Step 1: Add the approved source artwork unchanged**

Copy the attached reference image byte-for-byte to:

```text
brand/identity/wordmark/source/source-uppercase.png
```

Record its SHA-256 in `brand/identity/wordmark/README.md` so later tooling cannot silently replace the approved reference.

- [ ] **Step 2: Add the authoritative brand rules**

`brand/README.md` must state:

```markdown
# Sellogram Brand

Sellogram is the only active public brand. Mira is retired.

The canonical name is **Sellogram**: uppercase `S`, lowercase `ellogram`.
Sellogram is one cohesive word. Never abbreviate it as `SG`, split it into initials, or create an `SG` monogram.

Vector masters under `brand/identity/` are authoritative. Raster exports are generated outputs.
```

`brand/identity/wordmark/README.md` must document the approved source, the three Gate 1 candidate names (`faithful`, `disciplined`, `characterful`), and the rule that none is final until explicitly selected.

- [ ] **Step 3: Write the failing wordmark asset contract test**

Create `src/test/brand-wordmark.test.ts` with tests that require:

```ts
import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const candidates = ['faithful', 'disciplined', 'characterful'] as const;

describe('Sellogram Gate 1 assets', () => {
  it('documents canonical casing and prohibits SG shorthand', () => {
    const text = fs.readFileSync(path.join(root, 'brand/README.md'), 'utf8');
    expect(text).toContain('**Sellogram**');
    expect(text).toContain('uppercase `S`, lowercase `ellogram`');
    expect(text).toContain('Never abbreviate it as `SG`');
  });

  for (const name of candidates) {
    it(`${name} candidate is an outlined vector master`, () => {
      const svg = fs.readFileSync(
        path.join(root, `brand/identity/wordmark/candidates/${name}/sellogram-${name}.svg`),
        'utf8',
      );
      expect(svg).toMatch(/<svg[^>]+viewBox="0 0 1264 300"/);
      expect(svg).toContain('<path');
      expect(svg).not.toContain('<text');
      expect(svg).not.toMatch(/font-family|font-size/);
    });
  }
});
```

- [ ] **Step 4: Run the test and verify it fails because candidates do not exist yet**

Run:

```bash
npm test -- --run src/test/brand-wordmark.test.ts
```

Expected: FAIL on missing candidate SVG files.

- [ ] **Step 5: Commit the source and contract**

Commit message:

```text
chore(brand): establish Sellogram wordmark source
```

---

### Task 2: Build deterministic source segmentation and SVG contour export

**Files:**
- Create: `scripts/brand/build-wordmark.py`
- Create: `brand/identity/wordmark/generated/letter-metrics.json`
- Modify: `src/test/brand-wordmark.test.ts`

**Interfaces:**
- Consumes: `brand/identity/wordmark/source/source-uppercase.png`.
- Produces: nine ordered letter masks (`S,e,l,l,o,g,r,a,m`), normalized metrics, and vector paths used by all three candidates.

- [ ] **Step 1: Add a metrics test**

Extend the test to require `letter-metrics.json` with exactly nine ordered entries and canonical labels:

```ts
it('segments the approved source into the nine canonical letterforms', () => {
  const metrics = JSON.parse(
    fs.readFileSync(path.join(root, 'brand/identity/wordmark/generated/letter-metrics.json'), 'utf8'),
  );
  expect(metrics.letters.map((letter: { label: string }) => letter.label)).toEqual([
    'S', 'e', 'l', 'l', 'o', 'g', 'r', 'a', 'm',
  ]);
});
```

- [ ] **Step 2: Implement source segmentation**

In `scripts/brand/build-wordmark.py`:

```python
SOURCE_LABELS = ["S", "e", "l", "l", "o", "g", "r", "a", "m"]
INK_THRESHOLD = 128
MIN_COMPONENT_AREA = 1000
TARGET_VIEWBOX = (1264, 300)
```

The script must:

1. open the reference as grayscale;
2. threshold pixels `< 128` as ink;
3. use 8-connected component analysis;
4. discard components smaller than `1000px`;
5. sort the remaining nine components by x-position;
6. map them to `SOURCE_LABELS`;
7. crop to the combined ink bounds;
8. normalize the combined bounds to the target `1264x300` viewBox;
9. extract external and internal contours with `cv2.RETR_CCOMP`;
10. simplify paths with `cv2.approxPolyDP` using epsilon `0.0015 * arcLength`;
11. emit compound SVG paths with `fill-rule="evenodd"` so counters remain open;
12. save original component metrics to `letter-metrics.json`.

- [ ] **Step 3: Run the generator**

Run:

```bash
python scripts/brand/build-wordmark.py --metrics-only
```

Expected: `letter-metrics.json` contains nine letters and source bounds approximately `x=81..1343`, `y=81..380` before normalization.

- [ ] **Step 4: Run the tests**

Run:

```bash
npm test -- --run src/test/brand-wordmark.test.ts
```

Expected: metrics test passes; candidate SVG tests still fail.

- [ ] **Step 5: Commit the deterministic geometry pipeline**

Commit message:

```text
feat(brand): add deterministic wordmark geometry pipeline
```

---

### Task 3: Generate the three high-fidelity candidate masters

**Files:**
- Modify: `scripts/brand/build-wordmark.py`
- Create: `brand/identity/wordmark/candidates/faithful/sellogram-faithful.svg`
- Create: `brand/identity/wordmark/candidates/disciplined/sellogram-disciplined.svg`
- Create: `brand/identity/wordmark/candidates/characterful/sellogram-characterful.svg`

**Interfaces:**
- Consumes: normalized letter contours from Task 2.
- Produces: three vector-only, black-fill SVG candidate masters with identical `1264x300` viewBoxes.

- [ ] **Step 1: Define candidate transforms explicitly**

Implement candidate configuration in Python as:

```python
CANDIDATES = {
    "faithful": {
        "blur_sigma": 0.55,
        "width_scale": [1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00],
        "gap_scale": [1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00],
        "y_shift": [0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    "disciplined": {
        "blur_sigma": 0.85,
        "width_scale": [1.00, 0.98, 0.98, 0.98, 0.99, 0.99, 0.96, 0.99, 0.97],
        "gap_scale": [0.94, 0.90, 0.88, 0.91, 0.91, 0.88, 0.90, 0.92],
        "y_shift": [0, 0, 0, 0, 0, 1, 0, 0, 0],
    },
    "characterful": {
        "blur_sigma": 0.70,
        "width_scale": [1.025, 0.98, 0.96, 0.96, 1.00, 1.015, 0.98, 1.00, 0.98],
        "gap_scale": [0.91, 0.88, 0.86, 0.89, 0.88, 0.86, 0.88, 0.90],
        "y_shift": [0, 0, 0, 0, 0, 2, 0, 0, 0],
    },
}
```

The blur is applied to each binary component before re-thresholding at 50%, which smooths raster-derived contour noise without introducing new stylistic features. Width and gap transforms are optical refinements only.

- [ ] **Step 2: Generate all three SVG masters**

Run:

```bash
python scripts/brand/build-wordmark.py --all-candidates
```

Each SVG must:

- use `viewBox="0 0 1264 300"`;
- contain outlined paths only;
- contain no `<text>` nodes or font references;
- use `fill="currentColor"` so the same master works for dark, reversed, and monochrome use;
- preserve open counters in `e`, `o`, `g`, `a`, and `m`.

- [ ] **Step 3: Run the asset contract tests**

Run:

```bash
npm test -- --run src/test/brand-wordmark.test.ts
```

Expected: all Gate 1 contract tests PASS.

- [ ] **Step 4: Commit the candidate masters**

Commit message:

```text
feat(brand): add Sellogram wordmark refinement candidates
```

---

### Task 4: Produce real-size review boards and comparison exports

**Files:**
- Create: `scripts/brand/render-wordmark-review.py`
- Create: `brand/identity/wordmark/review/gate-1-comparison.png`
- Create: `brand/identity/wordmark/review/faithful-usage.png`
- Create: `brand/identity/wordmark/review/disciplined-usage.png`
- Create: `brand/identity/wordmark/review/characterful-usage.png`
- Modify: `src/test/brand-wordmark.test.ts`

**Interfaces:**
- Consumes: source artwork and the three candidate masters.
- Produces: the exact review surfaces needed for human selection.

- [ ] **Step 1: Add review-output tests**

Extend the test with:

```ts
it('includes the required Gate 1 review exports', () => {
  for (const file of [
    'gate-1-comparison.png',
    'faithful-usage.png',
    'disciplined-usage.png',
    'characterful-usage.png',
  ]) {
    expect(fs.existsSync(path.join(root, 'brand/identity/wordmark/review', file))).toBe(true);
  }
});
```

- [ ] **Step 2: Implement the review renderer**

`render-wordmark-review.py` must create:

1. `gate-1-comparison.png` at 1600x1200 with four labeled rows: `SOURCE`, `FAITHFUL`, `DISCIPLINED`, `CHARACTERFUL`, all rendered dark on `#F2F6F3` at the same visual height.
2. One `*-usage.png` per candidate at 1600x1200 containing:
   - large dark-on-paper mark;
   - reversed `#F2F6F3` mark on `#0E1E17`;
   - black-on-white monochrome;
   - website-header preview at 160px width;
   - small-use preview at 120px width.

Do not add decorative mockup devices. The boards exist to judge geometry, spacing, legibility, and contrast.

- [ ] **Step 3: Render the boards**

Run:

```bash
python scripts/brand/render-wordmark-review.py
```

- [ ] **Step 4: Inspect raster output at 100% and 25% scale**

Reject and regenerate any candidate where:

- a counter closes unexpectedly;
- `Sellogram` is not immediately legible;
- the uppercase `S` loses its visual leadership;
- the double `ll` creates an accidental gap or dark block;
- the `g` descender collides with adjacent optical space;
- 120px rendering loses essential character.

- [ ] **Step 5: Run tests**

Run:

```bash
npm test -- --run src/test/brand-wordmark.test.ts
```

Expected: PASS.

- [ ] **Step 6: Commit the review package**

Commit message:

```text
feat(brand): add Gate 1 wordmark review boards
```

---

### Task 5: Gate 1 verification and selection handoff

**Files:**
- Modify only if verification finds defects: Gate 1 scripts/assets above.

**Interfaces:**
- Consumes: all Gate 1 candidates and review boards.
- Produces: a verified candidate set ready for explicit human master selection.

- [ ] **Step 1: Run focused brand tests**

```bash
npm test -- --run src/test/brand-wordmark.test.ts
```

Expected: PASS.

- [ ] **Step 2: Run repository checks**

```bash
npm run lint
npm test
npm run build
```

Expected: all commands exit 0.

- [ ] **Step 3: Verify repository naming**

Search newly created `brand/` and Gate 1 scripts for accidental `SG`, lowercase-only canonical naming, or Mira references. The only allowed `SG` occurrence is the explicit prohibition sentence in `brand/README.md` and the approved spec/plan documentation.

- [ ] **Step 4: Present the review package for selection**

Present `gate-1-comparison.png` plus the three usage boards. Do not nominate a production master silently. Give a creative-director recommendation with concrete geometry reasons, then wait for explicit selection or requested refinement.

- [ ] **Step 5: Commit any verification corrections**

If corrections were necessary, use:

```text
fix(brand): correct Gate 1 wordmark review defects
```

Gate 1 ends here. The selected candidate is promoted to the production master only after explicit approval.
