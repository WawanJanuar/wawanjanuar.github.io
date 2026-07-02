import { gsap } from "gsap";

let initialized = false;

export function initMagneticButtons() {
  if (initialized) return;
  initialized = true;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (prefersReducedMotion || !hasFinePointer) return;

  const targets = document.querySelectorAll<HTMLElement>(".magnetic");

  targets.forEach((el) => {
    const strength = 0.35;
    const maxOffset = 10;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      const x = gsap.utils.clamp(-maxOffset, maxOffset, relX * strength);
      const y = gsap.utils.clamp(-maxOffset, maxOffset, relY * strength);
      gsap.to(el, { x, y, duration: 0.4, ease: "power2.out" });
    };

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
  });
}
