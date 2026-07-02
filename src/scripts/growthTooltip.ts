let initialized = false;

export function initGrowthTooltip() {
  if (initialized) return;
  initialized = true;

  const chart = document.querySelector<HTMLElement>(".growth-chart");
  const svg = document.querySelector<SVGSVGElement>("#growthSvg");
  const tooltip = document.querySelector<HTMLElement>("#growthTooltip");
  const ageEl = tooltip?.querySelector<HTMLElement>(".gt-age");
  const valEl = tooltip?.querySelector<HTMLElement>(".gt-val");
  const hitPoints = document.querySelectorAll<SVGCircleElement>(".growth-hit-points circle");

  if (!chart || !svg || !tooltip || !ageEl || !valEl) return;

  const position = (circle: SVGCircleElement) => {
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const pt = svg.createSVGPoint();
    pt.x = circle.cx.baseVal.value;
    pt.y = circle.cy.baseVal.value;
    const screenPt = pt.matrixTransform(ctm);
    const chartRect = chart.getBoundingClientRect();
    const top = screenPt.y - chartRect.top;
    tooltip.style.left = `${screenPt.x - chartRect.left}px`;
    tooltip.style.top = `${top}px`;
    // Flip below the point when there isn't enough room above for the tooltip
    // to render without getting clipped by the chart's own overflow:hidden.
    tooltip.classList.toggle("flip-below", top < 60);
  };

  hitPoints.forEach((circle) => {
    const show = () => {
      ageEl.textContent = `Tahap ${circle.dataset.age}`;
      valEl.textContent = circle.dataset.val ?? "";
      position(circle);
      tooltip.classList.add("is-visible");
    };
    const hide = () => tooltip.classList.remove("is-visible");

    circle.addEventListener("pointerenter", show);
    circle.addEventListener("pointerleave", hide);
    circle.addEventListener("focus", show);
    circle.addEventListener("blur", hide);
  });
}
