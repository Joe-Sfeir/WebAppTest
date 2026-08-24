# Lumière Dental — Spline concept demonstration

Lumière is a fictional Beirut dental-site concept with a warm examination-lens visual system. It is not an operating clinic and does not accept appointments or use patient data.

## Production files

- `index.html` — semantic single-page experience and all factual disclosures
- `style.css` — Lumière materials, comparison control, and responsive refinements
- `script.js` — GSAP motion and native range-input behavior
- `tailwind.generated.css` — local production utility CSS; no runtime Tailwind CDN
- `assets/` — generated dental study models in AVIF/WebP plus source files
- `docs/` — design brief, motion specification, asset provenance, and visual QA
- `tests/` — content-truth and interaction-contract checks

## Commands

```powershell
npm install
npm run check
py -m http.server 3102 --bind 127.0.0.1
```

The only external runtime scripts are pinned GSAP 3.12.5 and ScrollTrigger sources. Reduced-motion users receive stable content without continuous motion. The treatment comparison is a native range input that supports pointer, touch, arrow keys, Home, and End.

All contact actions go to Spline at `+961 76 300 011`. The WhatsApp demo-bot number is intentionally not used in this concept.
