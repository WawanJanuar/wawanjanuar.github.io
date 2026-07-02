// Hero animated blockchain node network — ported from capital-wawan.html's vanilla
// canvas IIFE. Kept as plain canvas/rAF rather than GSAP: this is a continuous
// per-frame physics simulation (node positions + pairwise distance checks), not a
// tween between defined values, so GSAP's timeline model doesn't fit naturally.
//
// Two additions beyond the reference file, both aimed at the "don't burn CPU
// continuously" requirement: node count scales down on narrow viewports, and the
// loop pauses when the canvas scrolls out of view or the tab is backgrounded.

let initialized = false;

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

export function initHeroNetwork() {
  if (initialized) return;
  initialized = true;

  const canvas = document.getElementById("heroNetwork") as HTMLCanvasElement | null;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const RED = "232,17,45";
  const LINK_DIST = 160;
  const TARGET_FPS = 30;
  const FRAME_INTERVAL = 1000 / TARGET_FPS;

  let w = 0;
  let h = 0;
  let dpr = 1;
  let nodes: Node[] = [];
  let rafId: number | null = null;
  let lastFrameTime = 0;
  let isVisible = true;

  function nodeCountFor(width: number) {
    if (width < 480) return 18;
    if (width < 768) return 26;
    return 42;
  }

  function resize() {
    const rect = canvas!.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = rect.width;
    h = rect.height;
    canvas!.width = w * dpr;
    canvas!.height = h * dpr;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function initNodes() {
    const count = nodeCountFor(w);
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: 1.4 + Math.random() * 1.8,
    }));
  }

  function draw() {
    ctx!.clearRect(0, 0, w, h);

    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    }

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          const alpha = (1 - dist / LINK_DIST) * 0.35;
          ctx!.strokeStyle = `rgba(${RED},${alpha})`;
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.stroke();
        }
      }
    }

    for (const n of nodes) {
      ctx!.beginPath();
      ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx!.fillStyle = `rgba(${RED},0.85)`;
      ctx!.fill();
    }
  }

  function loop(time: number) {
    if (!isVisible) {
      rafId = null;
      return;
    }
    if (time - lastFrameTime >= FRAME_INTERVAL) {
      lastFrameTime = time;
      draw();
    }
    rafId = requestAnimationFrame(loop);
  }

  function start() {
    if (rafId !== null || prefersReducedMotion) return;
    rafId = requestAnimationFrame(loop);
  }

  function stop() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  resize();
  initNodes();
  draw(); // paint one frame immediately — this is also the reduced-motion end state

  if (!prefersReducedMotion) {
    start();

    // This canvas animates continuously, so avoid spending CPU on it once the
    // hero has scrolled out of view or the tab is in the background.
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
        if (isVisible) start();
        else stop();
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stop();
      } else if (isVisible) {
        start();
      }
    });
  }

  window.addEventListener("resize", () => {
    resize();
    initNodes();
    if (prefersReducedMotion) draw();
  });
}
