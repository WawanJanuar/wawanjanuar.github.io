// Growth chart line-draw-on-scroll — plain IntersectionObserver + CSS transitions
// (stroke-dashoffset on .growth-line, opacity on .growth-area/.growth-points), no
// GSAP. Matches capital-wawan.html's technique exactly.

let initialized = false;

export function initGrowthReveal() {
  if (initialized) return;
  initialized = true;

  const growthChart = document.querySelector(".growth-chart");
  if (!growthChart) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const run = () => {
    document.getElementById("growthArea")?.classList.add("in");
    document.getElementById("growthLine")?.classList.add("in");
    const points = document.querySelectorAll(".growth-points circle");
    points.forEach((circle, i) => {
      if (prefersReducedMotion) {
        circle.classList.add("in");
      } else {
        setTimeout(() => circle.classList.add("in"), 300 + i * 220);
      }
    });
  };

  if (prefersReducedMotion) {
    run();
    return;
  }

  const growthIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          run();
          growthIO.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.35 }
  );
  growthIO.observe(growthChart);
}
