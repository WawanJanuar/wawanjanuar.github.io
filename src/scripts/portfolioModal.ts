// Asset detail modal — opens on .asset-chip click, populated from its dataset.
// Plain DOM, no framework: matches the rest of this codebase's animation approach.

let initialized = false;

export function initPortfolioModal() {
  if (initialized) return;
  initialized = true;

  const backdrop = document.getElementById("asset-modal-backdrop");
  const modal = document.getElementById("asset-modal");
  const closeBtn = document.getElementById("asset-modal-close");
  const icon = document.getElementById("asset-modal-icon") as HTMLImageElement | null;
  const category = document.getElementById("asset-modal-category");
  const name = document.getElementById("asset-modal-name");
  const symbol = document.getElementById("asset-modal-symbol");
  const desc = document.getElementById("asset-modal-desc");
  const spark = document.getElementById("asset-modal-spark");
  const sparkPath = document.getElementById("asset-modal-spark-path");

  if (!backdrop || !modal || !closeBtn || !icon || !category || !name || !symbol || !desc || !spark || !sparkPath) {
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let lastFocused: HTMLElement | null = null;

  function openModal(chip: HTMLElement) {
    icon!.src = chip.dataset.icon ?? "";
    icon!.alt = `${chip.dataset.name ?? ""} logo`;
    category!.textContent = chip.dataset.category ?? "";
    name!.textContent = chip.dataset.name ?? "";
    symbol!.textContent = chip.dataset.symbol ?? "";
    desc!.textContent = chip.dataset.desc ?? "";
    sparkPath!.setAttribute("d", chip.dataset.sparkline ?? "");

    spark!.classList.remove("in");
    backdrop!.hidden = false;
    lastFocused = document.activeElement as HTMLElement;

    requestAnimationFrame(() => {
      backdrop!.classList.add("is-open");
      if (!prefersReducedMotion) {
        requestAnimationFrame(() => spark!.classList.add("in"));
      } else {
        spark!.classList.add("in");
      }
    });

    document.body.style.overflow = "hidden";
    closeBtn!.focus();
  }

  function closeModal() {
    backdrop!.classList.remove("is-open");
    document.body.style.overflow = "";
    lastFocused?.focus();
    window.setTimeout(
      () => {
        if (!backdrop!.classList.contains("is-open")) backdrop!.hidden = true;
      },
      prefersReducedMotion ? 0 : 300
    );
  }

  document.querySelectorAll<HTMLElement>(".asset-chip").forEach((chip) => {
    chip.addEventListener("click", () => openModal(chip));
  });

  closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && backdrop.classList.contains("is-open")) closeModal();
  });
}
