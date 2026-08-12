// Scroll reveal — plain IntersectionObserver toggling `.in`, CSS transition does the
// tweening (see `.reveal` / `.reveal.in` in global.css). Matches capital-wawan.html's
// technique exactly: no GSAP/ScrollTrigger involved.

let initialized = false;

export function initReveal() {
  if (initialized) return;
  initialized = true;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    // Content is already visible via the CSS fallback in global.css — nothing to animate.
    return;
  }

  const reveals = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
        }
      });
    },
    { threshold: 0.15 }
  );
  reveals.forEach((el) => io.observe(el));
}
