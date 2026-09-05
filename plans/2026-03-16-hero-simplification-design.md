# Hero Simplification Design

## Goal

Simplify the hero section and navbar inspired by Softly's "Digital Minimalism" aesthetic. Remove the floating phone mockup, center-align content, and convert the navbar to a floating pill shape. Keep all existing copy, buttons, fonts, and colors unchanged.

## Navbar (Header.tsx)

- Wrap nav content in `max-w-3xl mx-auto` inner container with `rounded-full`
- Position: `fixed top-4` with `z-50` so it floats over content
- Background: `bg-white/70 backdrop-blur-xl` with subtle `border border-gray-200/30` and `shadow-sm`
- On scroll: shadow strengthens, opacity increases to `bg-white/90`
- Mobile: pill stretches to full width minus `mx-4` padding. Dropdown menu still works from the pill
- Dark mode: `bg-navy-900/70` equivalent

## Hero (Hero.tsx)

### Remove
- Phone mockup (desktop, lines 172-264)
- Mobile chat preview (lines 134-169)
- Feature pills (lines 89-105)
- 2-column grid layout

### Keep
- Badge ("Designed for social-first sellers")
- Headline with gradient underlines on "Shop" and "You"
- Description (experiment-driven copy)
- CTA button (lime-500 pill)
- Analytics tracking and experiment hooks

### Restyle
- Single column, center-aligned (`text-center`, `items-center`)
- Headline: `text-6xl sm:text-7xl lg:text-8xl`
- Description: `max-w-xl mx-auto`
- Background blobs: reduce opacity to ~5%, increase blur, keep float animation
- Vertical padding: `pt-32 pb-24` to account for floating nav

## Unchanged
- All copy text
- All buttons and links
- Fonts (Bricolage Grotesque, IBM Plex Sans)
- Colors (lime/navy)
- Dark mode
- Analytics/experiments
