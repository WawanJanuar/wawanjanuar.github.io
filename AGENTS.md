# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the dev server at `localhost:4321`.
- `npm run build` — production build to `./dist/`.
- `npm run preview` — preview the production build locally.

There is no test suite, linter, or type-checker configured in this project (`astro check` is not installed).

**If a CSS/markup change doesn't seem to take effect in the dev server**, don't assume the code is wrong first — this project has repeatedly hit stale Vite/HMR caching during long edit sessions (new rules compiled correctly on disk but not reflected in the running page). Fix: `rm -rf .astro node_modules/.vite` and restart `npm run dev`.

## Design source of truth

`capital-wawan.html` (repo root) is a **static HTML/CSS/vanilla-JS reference file** the user treats as the final, approved design — colors, spacing, SVG coordinates, and animation timing in this Astro codebase were pixel-ported from it, not freely reinterpreted. If a visual/behavioral question comes up ("what should this padding be," "what's the exact hover easing"), check `capital-wawan.html` first before guessing. Note: its `<head>` references a Google Fonts family `"Archivo Expanded"` that does not actually exist in Google's catalog (verified against it directly) — the reference file itself silently falls back to a system sans-serif for headings. This codebase intentionally deviates there: it uses the real Archivo variable font pushed to `font-weight: 800; font-stretch: 108%` (see `h1, h2, h3` in `global.css`) for the intended bold-display look, dialed back from an initial 125% after the width read as too heavy.

## Architecture

Single-page static Astro site (`output: 'static'`) — one route, `src/pages/index.astro`, assembling section components in order (`Navbar`, `Hero`, `Sejarah`, `Thesis`, `Portfolio`, `Founder`, `GrowthChart`, `CTA`, `Footer`), wrapped in `src/layouts/BaseLayout.astro`.

**No `tailwind.config.mjs`** — this uses Tailwind v4's CSS-first config. `:root` custom properties in `src/styles/global.css` are re-declared inside `@theme inline`, making them usable both as raw CSS vars (`var(--red)`) and Tailwind utilities. Keep theme keys and their underlying `:root` var distinctly named (e.g. `--radius-card` vs `--card-radius`) — a same-named `@theme` key that `var()`-references itself resolves to nothing.

**Most component CSS intentionally does NOT use Tailwind utility classes.** Per the pixel-port mandate, each component's `<style>` block largely mirrors `capital-wawan.html`'s original CSS almost verbatim (same class names like `.ticker-card`, `.founder-photo`, `.growth-chart`, same property values), rather than being translated into Tailwind utilities or a shared abstraction. There is no shared `.glass-card` class — `PortfolioCard.astro`'s `.ticker-card` and `GrowthChart.astro`'s `.growth-chart` each define their own glassmorphism values because the source file's actual values differ between them (18px vs 20px radius, 20px vs 24px blur, different shadow layers). Don't "clean up" this apparent duplication without checking the reference file first.

**CSS media-query source order matters here.** Mobile overrides must be placed *after* the base rule they override, in the same `<style>` block — a mobile `@media` rule placed earlier in the file than the base (non-media) rule for the same selector loses the cascade tie (equal specificity, later source wins) regardless of whether the media query matches. This caused a real bug once (Founder photo height override silently doing nothing on mobile) — if a responsive override "isn't working" despite the media query correctly matching, check source order before anything else.

**GSAP animation logic lives in `src/scripts/*.ts`**, never inlined ad hoc in components: `reveal.ts` (global `.reveal` scroll-in, initialized once from `BaseLayout.astro`), `growthChart.ts` (line-draw-on-scroll, uses `CustomEase` to match the reference file's exact cubic-bezier and `stroke-dasharray: 1600` as a literal hardcoded value, not a computed path length — intentional, matches source), `growthTooltip.ts` (hover/focus tooltip on chart points, flips below the point near the top edge to avoid clipping), `parallax.ts` (hero watermark + Sejarah/Thesis visual scroll parallax), `spotlight.ts` (portfolio card cursor-follow), `magneticButton.ts` (CTA button cursor-follow). Every entry point checks `window.matchMedia('(prefers-reduced-motion: reduce)')` and skips straight to the end state instead of animating. `spotlight.ts` and `magneticButton.ts` additionally check `window.matchMedia('(hover: hover) and (pointer: fine)')` and skip entirely on touch devices, since a cursor-follow effect doesn't make sense there — follow this pattern for any new cursor-tracking effect.

**Mobile nav (`Navbar.astro`) is a floating frosted-glass dropdown**, not an edge-to-edge panel — deliberately redesigned (initial edge-to-edge version read as "not modern" per user feedback) to look like iOS Control Center: rounded floating card, heavy `backdrop-filter: blur(46px)` + `rgba(30,30,32,0.9)` background (opacity leans high — real dark-mode "glass" needs to be fairly opaque or bold text behind it stays legible through the blur), plus a dim backdrop scrim. Breakpoints: `780px` (nav links ↔ hamburger), `860px` (most section grid → single column), a few components add narrower breakpoints (e.g. `420px` for Founder's photo height) for further scaling — check the existing breakpoint before introducing a new one.

**`overflow-x: hidden` must be on both `html` and `body`,** not just `body`. Chromium's mobile-viewport emulation (`isMobile: true`, matches real Chrome-for-Android — verified with Playwright device presets, confirmed real Safari/WebKit is unaffected) expands the layout viewport to fit content and avoid a phantom horizontal scroll if only `body` has the constraint — e.g. 390px silently became 507px, pushing the mobile nav hamburger off-frame. Don't remove `overflow-x: hidden` from `html` in `global.css` thinking it's redundant with `body`'s.

**Portfolio holdings are data-driven**: `src/data/portfolio.ts` exports `holdings` (symbol, category, name, description, and an SVG path `d` string for the sparkline, ported exactly from the reference file). Edit there, not in markup.

**Decorative visuals (blockchain mesh, candlesticks, currency glyphs) are hand-written inline SVG** with hardcoded coordinates in `Sejarah.astro`/`Thesis.astro`, copied exactly from `capital-wawan.html` — not freely drawn.

**Masking pattern**: full-bleed visuals and the founder photo use CSS `mask-image` (`radial-gradient` + `linear-gradient` combos, `mask-composite: intersect` with a `-webkit-mask-composite: source-in` Safari fallback) instead of solid-color overlays — see `Hero.astro`, `Founder.astro`, `Sejarah.astro`/`Thesis.astro`.

## SEO / metadata

`BaseLayout.astro`'s `<head>` (title, description, Open Graph, Twitter Card, two JSON-LD blocks for Person + Organization) was supplied by the user as a finished, final block (originally in a `METADATA.html` file at the repo root, now also kept there as a reference copy) — treat its content as fixed unless the user asks to change it. The favicon is **not** just `logo-cw.png` directly — that file is a wide rectangle (454×156) that browsers squish unreadably into a 16-32px tab icon. `favicon.ico` / `favicon-32x32.png` / `favicon-16x16.png` / `apple-touch-icon.png` in `public/` are square-padded versions generated from the same source logo (Pillow, centered with ~14% padding) — regenerate from `public/assets/logo-cw.png` the same way if the logo ever changes, don't point icon links back at the raw rectangular file.

## Deployment

- **Live at https://wawanjanuar.github.io**, deployed via `.github/workflows/deploy.yml` (`withastro/action` + `actions/deploy-pages`) on push to `main`. Repo is `WawanJanuar/wawanjanuar.github.io` (GitHub Pages user-site convention — the exact name is load-bearing for the URL scheme).
- The deploy workflow pins `node-version: 22` explicitly on the `withastro/action` step — `withastro/action`'s runner otherwise defaults to Node 20, but Astro 7 requires ≥22.12 (this project's own `package.json` engines field). If deploy ever fails with "Node.js vX is not supported by Astro," this is the first thing to check.
- GitHub Pages must stay in **"workflow" build mode**, not the "legacy branch deploy" GitHub auto-enables the first time you push to a new `username.github.io` repo. If Pages ever reverts to legacy (e.g. after a repo transfer) and the deploy starts failing/no-oping, fix with `gh api -X PUT repos/WawanJanuar/wawanjanuar.github.io/pages -f build_type=workflow`.
- **Still confirm with the user before any git action that changes shared/remote state** (`push`, force operations, etc.) even though the repo is now live — this project's owner has been explicit about wanting to review before anything goes public, and that standing preference doesn't lapse just because a first deploy already happened.

## Documentation

Full Astro documentation: https://docs.astro.build
