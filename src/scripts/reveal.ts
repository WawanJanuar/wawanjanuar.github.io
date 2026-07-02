import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let initialized = false;

export function initReveal() {
  if (initialized) return;
  initialized = true;

  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    // Content is already visible via the CSS fallback in global.css — nothing to animate.
    return;
  }

  const elements = gsap.utils.toArray<HTMLElement>(".reveal");

  // Matches capital-wawan.html: `.reveal{transition:opacity .8s ease, transform .8s ease}`
  // triggered by an IntersectionObserver at threshold 0.15, no stagger between elements.
  elements.forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  });
}
