# Image generation prompts

Prompts for an image model (Midjourney, Flux, Imagen, GPT Image). One prompt per slot on the site.

Two image families:

- **Photography.** Real-feeling Kenyan sellers and products. Carries trust. Like Stur.
- **Spot illustrations.** Flat, warm, one object each. Carries scanability. Like Manychat.

Image models render text badly. Every prompt says "no text". Put DM bubbles, prices, and labels on top in code.

## Shared style blocks

Paste the matching block at the end of each prompt.

**PHOTO**

> Editorial lifestyle photograph, natural window light, warm and grounded, Nairobi Kenya, small independent shop. Real person, candid, not posed. Muted palette: pale sage paper tones (#F2F6F3, #E7EEE9), deep green (#9EEB47), warm amber (#A35F0C), dark green-black shadows (#1B2620). 35mm film look, soft grain, shallow depth of field. No text, no logos, no watermarks, no neon, no glowing screens, no robots, no holograms, no stock-photo smile.

**SPOT**

> Flat vector spot illustration, single object, soft rounded shapes, thick matte fills, subtle paper grain. Palette only: sage paper #E7EEE9, fern green #9EEB47, deep fern #44780C, amber #A35F0C, ink #1B2620. Transparent background. Off-centre composition, one small amber accent. No text, no gradients, no outlines, no 3D, no sparkles, no faces.

**NIGHT**

> Same as PHOTO but night scene. Deep green-black base (#0E1E17, #162C22). Single warm lamp or phone glow in mint (#B5F27C) and soft gold (#F0B254). Quiet, calm, safe. No blue neon, no harsh white light.

## Slots

| # | Slot | Family | Ratio | Prompt |
| --- | --- | --- | --- | --- |
| 1 | Hero, right column behind or beside the chat demo | PHOTO | 4:5 | A young Kenyan woman packs a small order at a wooden table in her clothing shop. Folded dresses, brown paper, twine. Her phone lies face down beside her. She is relaxed, mid-task, looking at the parcel. Morning light from a side window. |
| 2 | Hero, alternate | PHOTO | 4:5 | Close crop of two hands holding a smartphone over a table of sneakers and skincare bottles. The screen is plain matte dark green (#0E1E17), blank, ready for an overlay. Amber price tags on the products. |
| 3 | Handles: prices and stock | SPOT | 1:1 | A hanging paper price tag on a loop of twine, tilted, with a small amber dot in one corner. |
| 4 | Handles: sizes and recommendations | SPOT | 1:1 | A soft tailor's measuring tape draped in a loose S curve next to a folded T-shirt. |
| 5 | Handles: carts and checkout | SPOT | 1:1 | A small paper shopping bag with a single amber coin resting on top. |
| 6 | Handles: delivery questions | SPOT | 1:1 | A motorbike courier box on the back of a boda boda, seen from the side, one amber parcel strap. |
| 7 | Handles: handover to you | SPOT | 1:1 | Two hands passing a smartphone from one to the other, phone screen plain sage. |
| 8 | How it works: connect | SPOT | 1:1 | A phone and a small green plug about to meet, short gap between them. |
| 9 | How it works: teach your products | SPOT | 1:1 | Three polaroid-style product photos fanned out on a table, blank frames, one amber corner tab. |
| 10 | How it works: go live | SPOT | 1:1 | A shop door with a small round "open" sign, sign blank, green sign face. |
| 11 | Night Shift, full-bleed background | NIGHT | 16:9 | A dim Nairobi bedroom at 2 AM. A woman sleeps. On the bedside table a phone lies face up with a faint mint glow on the ceiling. Curtains, a stack of parcels ready for morning by the door. |
| 12 | Night Shift, alternate | NIGHT | 16:9 | A dark shop interior after closing. Shelves of products in shadow. One phone on the counter glows soft mint and gold. The city lights of Nairobi blur through the window. |
| 13 | Proof strip: seller portrait A | PHOTO | 1:1 | Head-and-shoulders portrait of a Kenyan man in his thirties in a sneaker shop, arms crossed, small proud smile, shelves of shoes blurred behind. |
| 14 | Proof strip: seller portrait B | PHOTO | 1:1 | Portrait of a Kenyan woman in her twenties in a skincare shop, holding one product, glass shelves and soft daylight behind. |
| 15 | Proof strip: seller portrait C | PHOTO | 1:1 | Portrait of an older Kenyan woman at a fabric stall, bolts of kitenge fabric behind her, warm afternoon light. |
| 16 | Pricing and footer background texture | SPOT | 21:9 | Abstract paper texture, pale sage, faint hairline grid in #DCE6DF, very low contrast, nothing else. |
| 17 | Open Graph share image | PHOTO | 1.91:1 | Flat lay on pale sage paper: a smartphone with a plain dark green screen, a folded dress, a pair of sneakers, a small parcel with twine, a few amber price tags. Top-down, soft shadows, wide empty space on the left third for a headline overlay. |

## Settings

- Photo family: photorealistic mode, style strength low, generate 4 variants, pick the least posed one.
- Spot family: same seed for all slots 3 to 10 so the set matches.
- Export spot illustrations as SVG or PNG with alpha. Export photos as AVIF or WebP at 2x the rendered size, not larger.

## Anti-references

Do not accept an image that has: gradient blobs, glowing blue UI, chat bubbles rendered by the model, robots or brains, sparkles, stock smiles, or a generic "AI" look. Regenerate.
