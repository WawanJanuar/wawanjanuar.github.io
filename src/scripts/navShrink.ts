// Navbar shrink-on-scroll — plain scroll listener toggling a class, matching
// capital-wawan.html's technique exactly (no GSAP/ScrollTrigger involved).

let initialized = false;

export function initNavShrink() {
  if (initialized) return;
  initialized = true;

  const nav = document.querySelector("nav");
  if (!nav) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
