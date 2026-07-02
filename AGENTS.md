# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the dev server at `localhost:4321`. For long-running sessions use `astro dev --background`, managed with `astro dev stop` / `astro dev status` / `astro dev logs`.
- `npm run build` — production build to `./dist/`.
- `npm run preview` — preview the production build locally.

There is no test suite, linter, or type-checker configured in this project (`astro check` is not installed).

## Architecture

This is a single-page static Astro site (`output: 'static'`) — there is only one route, `src/pages/index.astro`, which assembles section components in order (`Navbar`, `Hero`, `Sejarah`, `Thesis`, `Portfolio`, `Founder`, `GrowthChart`, `CTA`, `Footer`), all wrapped in `src/layouts/BaseLayout.astro`. To add or reorder a section, edit `index.astro` and drop a new `.astro` file in `src/components/`.

**Design tokens live in CSS, not `tailwind.config.mjs`.** This project uses Tailwind v4's CSS-first config: `:root` custom properties in `src/styles/global.css` (colors, card radius) are re-declared inside an `@theme inline` block, which is what makes them usable both as raw CSS vars (`var(--red)`) and as Tailwind utilities (`bg-red`, `text-muted`, `rounded-card`). There is intentionally no `tailwind.config.mjs` — add new design tokens by extending both the `:root` block and the `@theme inline` block together, and keep their variable names distinct (the theme key must not `var()`-reference itself under the same name, e.g. `--radius-card` vs `--card-radius`).

**Fonts are self-hosted via `@fontsource`** (imported at the top of `global.css`), not loaded from the Google Fonts CDN. "Archivo Expanded" is not a literal font family — it's the Archivo variable font pushed to `font-weight: 800; font-stretch: 125%` via the `.font-display-expanded` utility class.

**GSAP animation logic is centralized in `src/scripts/*.ts`**, never inlined ad hoc in components. A component that needs animation imports its initializer from `src/scripts/` inside a `<script>` tag (e.g. `GrowthChart.astro` imports `initGrowthChart` from `scripts/growthChart.ts`, `Portfolio.astro` imports `initSpotlight` from `scripts/spotlight.ts`). Every GSAP entry point must check `window.matchMedia('(prefers-reduced-motion: reduce)')` and jump straight to the end state when true instead of animating — follow the pattern in `reveal.ts` and `growthChart.ts` when adding new animations.

**`.reveal` is the global scroll-in convention**: any element with the `.reveal` class starts at `opacity: 0` (declared once in `global.css`) and is animated to visible by the shared `ScrollTrigger` loop in `src/scripts/reveal.ts`, initialized once from `BaseLayout.astro`. Add `.reveal` to new elements instead of writing bespoke scroll-in logic per component.

**`.glass-card`** (in `global.css`) is the shared glassmorphism style (backdrop blur + layered shadow), used by both `PortfolioCard.astro` and `GrowthChart.astro` — reuse it rather than redefining the effect elsewhere.

**Portfolio holdings are data-driven**: `src/data/portfolio.ts` exports the `holdings` array (symbol, category, name, description, sparkline points) consumed by `Portfolio.astro` → `PortfolioCard.astro`. Add or edit assets there, not in markup.

**Decorative visuals are hand-written inline SVG**, not image assets: the blockchain-mesh / candlestick / currency-symbol graphics in `Sejarah.astro` and `Thesis.astro` are generated from hardcoded coordinate arrays in each component's frontmatter (Thesis mirrors Sejarah's layout and coordinates).

**Masking pattern**: full-bleed visuals and the founder photo use CSS `mask-image` (combining `radial-gradient` + `linear-gradient`, with `mask-composite: intersect` and a `-webkit-mask-composite: source-in` fallback for Safari) instead of solid-color overlays — see `Hero.astro`, `Founder.astro`, and `Sejarah.astro`/`Thesis.astro` for the pattern to copy.

## Deployment

- Deploys to GitHub Pages via `.github/workflows/deploy.yml` (`withastro/action` + `actions/deploy-pages`) on push to `main`. `astro.config.mjs` sets `site: 'https://wawanjanuar.github.io'`, which requires the GitHub repo to be named exactly `wawanjanuar.github.io`.
- **Never run `git init`, `git remote add`, `git commit`, or `git push` without the user explicitly confirming first**, even when asked to prepare deploy-related files. This repo is intentionally not yet initialized as a git repository.

## Documentation

Full Astro documentation: https://docs.astro.build
