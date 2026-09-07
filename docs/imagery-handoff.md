# Sellogram imagery handoff

## Branch

Work from `feature/imagery`. Draft PR: #25.

The current direction is an editorial commerce landing page, not a SaaS page with decorative photography.

North star:

> Instagram commerce happening in the real world, with Sellogram visibly moving the sale through the shop's DM.

## Product truth

- The shopper messages the **shop's Instagram DM**. They do not message Sellogram.
- Sellogram powers the shop's replies behind the shop identity.
- Do not put a Sellogram avatar in shopper-facing DM threads.
- Use natural sale progression. Do not force every conversation from `is it available?` straight to payment.
- Show different stages: product facts, sizing/shade/scent questions, stock, delivery details, payment confirmation, order progress, handoff, and delivery.
- Kenya examples can use M-Pesa and Airtel Money. Ghana examples can use MTN MoMo/AirtelTigo Money where appropriate. Keep Lagos examples locally credible. Do not introduce generic card-payment language.
- Do not invent pickup flows such as `hold it, I'm coming to Tao` unless a real shop supports that behavior.

## Visual direction

- Human, editorial, contemporary, Instagram-native.
- Nairobi + Accra + Lagos / broader African context without stereotypical visual shorthand.
- Vary gender, location, product category, camera distance, light, and color.
- Avoid perfect AI skin and over-polished lifestyle photography.
- Avoid fake environmental slogans and generated background copy.
- Do not let the site collapse into beige, terracotta, and muted earth tones. The cobalt work is an important reference for sharper color and graphic contrast.
- Photography establishes the merchant world. Product UI shows Sellogram acting inside it.

## Hero

The cobalt stairwell fashion scene is the primary hero direction.

The user explicitly wants the photograph to remain **expansive**. Do not put it back inside a small SaaS card or crop away the photographer/model/environment relationship merely to preserve the old page grid.

Keep the message:

> Sellogram answers your DMs and sells in them.

The DM overlay should be real HTML/CSS, not baked text inside the photograph. Current example shop: `Nia Thrift`.

Example conversation:

- Customer: `Hii denim set bado iko in M?`
- Shop: `Iko. Full set ni KSh 6,000.`
- Customer: `Na delivery Kilimani?`
- Shop: `KSh 250. Ukichukua leo rider can bring it this afternoon.`

## Homepage structure

Target rhythm:

1. Header
2. Expansive hero + shop DM/product overlay
3. Dark NightShift section
4. Supported shop types image grid
5. DM sales journey
6. How it works
7. From DM to doorstep / piki-piki outcome
8. Pricing
9. Final CTA
10. Footer

The supported-shop section should promote the existing footer use cases into the page:

- `/use-cases/daily-drop-shops`
- `/use-cases/fashion`
- `/use-cases/beauty`
- `/use-cases/accessories`
- `/use-cases/fragrances`
- `/use-cases/home-bakeries-food-brands`
- `/use-cases/skincare-haircare-makers`

## Recommended imagery

### Hero
- `cobalt_stairwell_street_style.webp`

### Daily drops / fashion
- `boutique_studio_styling_session.webp`
- `measuring_garments_in_a_cosy_boutique_studio.webp`
- `nairobi_denim_social_commerce_shoot.webp`
- `nairobi_street_thrift_red_bomber_jacket.webp`

### Beauty
- `beauty_studio_orders_and_shades.webp`
- `bright_beauty_product_packing_studio.webp`
- `cocoa_rose_gloss_on_nairobi_rooftop.webp`

### Accessories
- `boutique_gift_packing_studio.webp`

### Fragrance
- `artisanal_fragrance_studio_in_warm_daylight.webp`
- `amber_citrus_rooftop_fragrance_flow.webp`
- `amber_citrus_rooftop_social_commerce.webp`

### Bakeries / food
- `warm_artisan_bakery_packing_orders.webp`
- `warm_artisanal_bakery_workspace.webp`

### Skincare / haircare
- `artisanal_skincare_studio_crafting.webp`
- `sunlit_skincare_studio_packing_orders.webp`

### Delivery / outcome
- `cocoa_rose_gate_delivery.webp`

## Generated composites

Some generated images contain exploratory DM/UI overlays and older copy. Treat these as **art-direction references**, not final production UI.

For production:

1. use a clean photographic frame where possible;
2. rebuild readable product/DM UI in code;
3. keep the shop as the visible DM identity;
4. review every message for product truth and local context.

## Image library

A complete reference set of the generated images is being stored under `assets/imagery-library/`. The reference copies are intentionally web-sized so the branch does not absorb a large unoptimized generation archive. The existing hero materialization path remains the source for the larger hero asset.

When a reference image is selected for a large final placement, replace that specific reference with a larger optimized source before shipping.

## Current implementation

Commit `6e00439` introduced the imagery-led homepage composition, including the new supported-shop / DM-journey / delivery sections.

The design implementation plan is in `docs/superpowers/plans/2026-09-06-imagery-led-landing-page.md`.

Do not assume the current composition is final. The next pass should be visual tuning at real viewport sizes, especially the hero scale and crop.

## Verification

Before merge, run with Node >= 22.12:

```bash
npm install
npm run lint
npx tsc --noEmit
npm run test:coverage
npm run build
```

Then inspect at minimum:

- 1440 px desktop
- 1024 px tablet
- 768 px tablet
- 390 px mobile

Visual inspection is required. Tests cannot tell whether an expansive image has accidentally become a small card.

Note: the repository CI workflow currently configures Node 20 while `package.json` requires Node >= 22.12.0. Align CI before treating engine warnings as meaningful application failures.
