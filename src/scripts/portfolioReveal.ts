// Portfolio card reveal — separate from the generic .reveal mechanic in reveal.ts.
// Toggles `.in` on each `.ticker-card` once it enters the viewport, which is what
// drives the sparkline self-draw (stroke-dashoffset) and trend fade-in via CSS
// transitions in global.css. Matches capital-wawan.html's technique exactly.

let initialized = false;

export function initPortfolioReveal() {
  if (initialized) return;
  initialized = true;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const cards = document.querySelectorAll<HTMLElement>(".ticker-card");

  if (prefersReducedMotion) {
    cards.forEach((card) => card.classList.add("in"));
    return;
  }

  const cardIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          cardIO.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  cards.forEach((card) => cardIO.observe(card));
}
