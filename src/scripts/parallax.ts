import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let initialized = false;

export function initParallax() {
  if (initialized) return;
  initialized = true;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) return;

  gsap.registerPlugin(ScrollTrigger);

  const heroLogo = document.querySelector(".hero-logo-mask");
  if (heroLogo) {
    gsap.to(heroLogo, {
      y: 70,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  const sejarahVisual = document.querySelector(".sejarah-visual");
  if (sejarahVisual) {
    gsap.fromTo(
      sejarahVisual,
      { y: -30 },
      {
        y: 30,
        ease: "none",
        scrollTrigger: {
          trigger: ".sejarah",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  }

  const thesisVisual = document.querySelector(".thesis-visual");
  if (thesisVisual) {
    gsap.fromTo(
      thesisVisual,
      { y: -30 },
      {
        y: 30,
        ease: "none",
        scrollTrigger: {
          trigger: ".thesis-masked",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  }
}
