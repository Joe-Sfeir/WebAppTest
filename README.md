# Lumière Dental Landing Page

A premium, mobile-first single-page marketing site for a fictional cosmetic and restorative dental clinic in Beirut, built to turn visits into WhatsApp consultations.

## Stack and file structure

- `index.html` — semantic page structure and ordered CDN references
- `style.css` — palette tokens, visual treatments, and small custom utilities
- `script.js` — GSAP and ScrollTrigger timelines, responsive motion, and interaction logic
- Tailwind CSS via CDN for layout and utility styling
- GSAP core + ScrollTrigger via CDN for all animation

There is no framework, package manager, build step, webfont, or raster image payload.

## ScrollTrigger fix

The previous version registered ScrollTrigger, but initialized it through a retry loop and returned before creating any scroll triggers when the operating system reported reduced motion. The revised page loads scripts deterministically in this order:

1. GSAP core
2. ScrollTrigger
3. `script.js`

`script.js` registers the plugin once, initializes after DOM readiness, checks that primary trigger elements have measurable height, uses refresh-safe trigger settings, and calls `ScrollTrigger.refresh(true)` after initial layout and again after the window load event. Reduced-motion users now receive restrained opacity-based reveals rather than an empty trigger set.

## Hero effect

On desktop, the hero pins while a scrubbed timeline separates the editorial copy, smile lens, orbit lines, scan marker, and treatment labels into a layered clinical “examination.” Mobile uses a lighter unpinned parallax variant.

## Palette

- Warm ivory base — `#F3EBDD`
- Cream surface — `#FAF6EE`
- Sage-grey-green — `#A7B0A0`
- Accessible deep sage — `#637268`
- Deep forest — `#243A34`
- Forest shadow — `#192A25`
- Charcoal text — `#242A27`
- Ambient gold — `#D8B978`
- Warm golden-white glow — `#F5E5BD`
- Accessible gold text — `#826128`
- Warm divider — `#D8CCB8`

## Feedback wanted

Feedback is especially useful on the balance between the hero’s editorial character, the warmer lobby-inspired palette, and immediate booking clarity.
