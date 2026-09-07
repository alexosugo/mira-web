# Sellogram generated imagery library

This directory contains the complete generated imagery set from the September 2026 Sellogram landing-page art-direction work.

## Reference archive

`./sellogram-generated-reference-library-64.zip` contains all 65 generated images as very small WebP contact-sheet/reference copies, scaled to a maximum dimension of 64 px. These copies exist so every generated frame and filename travels with the branch without adding the full 12+ MB generation archive to source control.

See `manifest.txt` for the complete filename list.

These 64 px files are **not production assets**. They are only for identifying the correct source image. A full-resolution optimized archive was handed to the owner separately with this branch handoff.

## Production use

The approved cobalt hero already has a higher-resolution source path in the branch through the existing hero materialization flow.

When an image from this library is selected for a final placement, use the matching full-resolution WebP from the handoff archive and optimize it for that placement. Do not enlarge the 64 px reference copies.

## Design handoff

Read [`../../docs/imagery-handoff.md`](../../docs/imagery-handoff.md) before changing the homepage imagery. It records the product rules, art direction, homepage structure, hero requirements, and local-market copy constraints from the design session.

The most important product rule is:

> The shopper messages the shop. Sellogram powers the shop's DM behind the shop identity.

Do not present Sellogram as the account the shopper is messaging.
