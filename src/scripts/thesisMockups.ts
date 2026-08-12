// Thesis mini-mockup animations (slider fill, data/emosi counter, checklist ticks,
// consistency streak grid) — ported logic-for-logic from capital-wawan.html's inline
// script. Each `.thesis-item` gets its own IntersectionObserver at threshold 0.4 and
// unobserves itself after firing once.

let initialized = false;

export function initThesisMockups() {
  if (initialized) return;
  initialized = true;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  document.querySelectorAll<HTMLElement>(".thesis-item").forEach((item) => {
    const run = () => {
      const mockup = item.querySelector(".thesis-mockup");
      if (!mockup) return;

      // slider mockup
      const fill = mockup.querySelector("#sliderFill");
      if (fill) {
        const dot = mockup.querySelector("#sliderDot");
        const ring = mockup.querySelector("#sliderRing");
        const apply = () => {
          fill.setAttribute("width", "78");
          dot?.setAttribute("cx", "92");
          ring?.setAttribute("cx", "92");
        };
        if (prefersReducedMotion) apply();
        else setTimeout(apply, 150);
      }

      // data counter mockup
      const dataPct = mockup.querySelector("#dataPct");
      if (dataPct) {
        const emosiPct = mockup.querySelector("#emosiPct");
        const animateCount = (el: Element, target: number) => {
          if (prefersReducedMotion) {
            el.textContent = target + "%";
            return;
          }
          let cur = 0;
          const step = () => {
            cur += Math.max(1, Math.round(target / 18));
            if (cur >= target) {
              el.textContent = target + "%";
              return;
            }
            el.textContent = cur + "%";
            requestAnimationFrame(step);
          };
          step();
        };
        const run2 = () => {
          animateCount(dataPct, 92);
          if (emosiPct) animateCount(emosiPct, 8);
        };
        if (prefersReducedMotion) run2();
        else setTimeout(run2, 150);
      }

      // checklist mockup
      const marks = mockup.querySelectorAll(".check-mark");
      marks.forEach((mark) => {
        const order = parseInt(mark.getAttribute("data-order") || "0", 10);
        const ring = mockup.querySelector(`.check-ring[data-order="${order}"]`);
        const apply = () => {
          mark.classList.add("ticked");
          ring?.classList.add("ticked");
        };
        if (prefersReducedMotion) apply();
        else setTimeout(apply, 200 + order * 350);
      });

      // consistency streak grid (github-style contribution grid)
      const streakGrid = mockup.querySelector<SVGGElement>("#streakGrid");
      if (streakGrid && !streakGrid.dataset.built) {
        streakGrid.dataset.built = "1";
        const cols = 18;
        const rows = 4;
        const size = 6;
        const gap = 2.2;
        const startX = 14;
        const startY = 36;
        const levels = ["#1B1B1E", "#3a0d13", "#7A0E1C", "#E8112D"];
        const cells: { rect: SVGRectElement; level: number }[] = [];
        for (let c = 0; c < cols; c++) {
          for (let r = 0; r < rows; r++) {
            const level = Math.random() < 0.25 ? 0 : Math.floor(Math.random() * 3) + 1;
            const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("x", String(startX + c * (size + gap)));
            rect.setAttribute("y", String(startY + r * (size + gap)));
            rect.setAttribute("width", String(size));
            rect.setAttribute("height", String(size));
            rect.setAttribute("rx", "1.5");
            rect.setAttribute("fill", "#1B1B1E");
            rect.classList.add("streak-cell");
            streakGrid.appendChild(rect);
            cells.push({ rect, level });
          }
        }
        cells.forEach((cell, i) => {
          const apply = () => cell.rect.setAttribute("fill", levels[cell.level]);
          if (prefersReducedMotion) apply();
          else setTimeout(apply, 100 + i * 18);
        });
      }
    };

    const itemIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          run();
          itemIO.unobserve(entry.target);
        });
      },
      { threshold: 0.4 }
    );
    itemIO.observe(item);
  });
}
