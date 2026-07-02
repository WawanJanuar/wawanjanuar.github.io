import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

let initialized = false;

export function initGrowthChart() {
  if (initialized) return;
  initialized = true;

  gsap.registerPlugin(ScrollTrigger, CustomEase);

  // Matches capital-wawan.html's `transition: stroke-dashoffset 1.8s cubic-bezier(.16,.84,.44,1)`
  const lineEase = CustomEase.create("growthLine", "0.16, 0.84, 0.44, 1");

  const section = document.getElementById("growth");
  const line = document.querySelector<SVGPathElement>("#growthLine");
  const area = document.querySelector<SVGPathElement>("#growthArea");
  const dots = gsap.utils.toArray<SVGCircleElement>(".growth-points circle");

  if (!section || !line) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    line.style.strokeDashoffset = "0";
    if (area) area.style.opacity = "1";
    dots.forEach((dot) => {
      dot.style.opacity = "1";
    });
    return;
  }

  gsap.set(dots, { opacity: 0 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 70%",
      toggleActions: "play none none reverse",
    },
  });

  // Absolute timeline positions (not chained "-=") to reproduce the original's
  // overlapping timing: line starts at 0s/1.8s, area at 0.3s/1s, points staggered from 0.3s.
  tl.to(line, { strokeDashoffset: 0, duration: 1.8, ease: lineEase }, 0);
  if (area) tl.to(area, { opacity: 1, duration: 1, ease: "power1.inOut" }, 0.3);
  tl.to(
    dots,
    { opacity: 1, duration: 0.5, ease: "power1.inOut", stagger: 0.22 },
    0.3
  );
}
