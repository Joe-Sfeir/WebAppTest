# Lumière motion specification

## System principles

Motion behaves like an examination: slow enough to read, precise enough to imply calibration, and interruptible at every point. Hero motion establishes depth; the treatment comparison belongs to the visitor. Reduced motion renders stable final states and never hides content.

## M01 — Examination lens

- Purpose: establish Lumière's warm clinical/editorial material world.
- Trigger: page entry, then native hero scroll.
- Timeline: copy is visible immediately; lens settles over 900 ms; desktop scroll gently separates copy and lens.
- Desktop: bounded pin with no blocked reading.
- Mobile: unpinned, shorter vertical travel.
- Keyboard/touch: no content or control depends on pointer movement.
- Reduced motion: final layout with no transform timeline.
- Tool: GSAP/ScrollTrigger with CSS fallback.
- Acceptance: no layout jump, dead zone, or missing copy at 1440×900 and 390×844.

## M02 — Treatment-record comparison

- Purpose: show how context can be compared without patient photography or outcome claims.
- Trigger: direct range input; pointer drag, touch drag, arrow keys, Home, and End.
- Start/end: 0–100 percent reveal; initializes at 50 percent.
- Timeline: immediate input response; 180 ms visual settling only for programmatic changes.
- Desktop/mobile: full-width handle with a minimum 44 px touch target and portrait media below 640 px.
- Reduced motion: no autonomous progress; control remains fully operational.
- Performance: clip-path and one CSS custom property; no layout-property animation.
- Tool: native range input plus CSS.
- Acceptance: value is announced as percent of the planned illustrative model visible; focus is visible.

## M03 — Supporting section reveals

- Purpose: establish reading order without becoming the visual system.
- Trigger: first section entry.
- Behavior: short translate/opacity with no repeated flourish.
- Reduced motion: visible immediately.
- Performance: transforms and opacity only.
