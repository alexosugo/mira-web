# Sellogram imagery library handoff

Branch: `feature/imagery`

This branch is the active imagery-led Sellogram landing-page work.

The generated image set belongs in `assets/imagery-library/full/`. Keep the original generated filenames so the design notes and manifest continue to map to the source images.

The library contains 65 optimized WebP images from the September 2026 Sellogram art-direction work. `assets/imagery-library/manifest.txt` is the canonical filename list.

Use the library as source material. Move only images selected for a production placement into the relevant served path under `public/images/`, then update the component to reference that production asset. Do not serve the entire source library by default.

Product rules for any DM overlays:

- The shopper messages the shop's Instagram account.
- Sellogram powers the shop's replies behind the shop identity.
- Do not show Sellogram as the shopper-facing DM identity.
- Keep sale progression natural: questions, stock, delivery, payment, order status, and handoff as appropriate.
- Keep Kenya, Ghana, and other local-market details credible.

Primary hero direction: `cobalt_stairwell_street_style.webp`.

Recommended delivery/outcome frame: `cocoa_rose_gate_delivery.webp`.

The current homepage composition was introduced in commit `6e00439`. The branch also contains `docs/imagery-handoff.md` with the wider art direction and homepage structure.

Before merge, run the repository verification on Node >= 22.12 and visually inspect desktop, tablet, and mobile layouts. The repository CI currently needs its Node version aligned with the package engine before CI can be treated as authoritative.
