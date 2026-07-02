let initialized = false;

export function initSpotlight() {
  if (initialized) return;
  initialized = true;

  // Cursor-follow spotlight needs a real hovering pointer — skip it on touch
  // devices instead of forcing a fake/stuck effect from tap events.
  const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!hasFinePointer) return;

  const cards = document.querySelectorAll<HTMLElement>(".ticker-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * 100;
      const my = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--mx", `${mx}%`);
      card.style.setProperty("--my", `${my}%`);
    });
  });
}
