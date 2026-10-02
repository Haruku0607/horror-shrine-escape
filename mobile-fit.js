(() => {
  "use strict";

  const DESIGN_WIDTH = 1120;
  const DESIGN_HEIGHT = 720;
  const EDGE_GAP = 2;

  function visibleViewportSize() {
    const vv = window.visualViewport;
    const width = vv && Number.isFinite(vv.width) ? vv.width : window.innerWidth;
    const height = vv && Number.isFinite(vv.height) ? vv.height : window.innerHeight;
    return {
      width: Math.max(1, width - EDGE_GAP * 2),
      height: Math.max(1, height - EDGE_GAP * 2)
    };
  }

  function fitGameToVisibleViewport() {
    const scaler = document.getElementById("gameViewportScaler");
    if (!scaler) return;

    const viewport = visibleViewportSize();
    const scale = Math.min(viewport.width / DESIGN_WIDTH, viewport.height / DESIGN_HEIGHT, 1);
    const safeScale = Number.isFinite(scale) && scale > 0 ? scale : 1;

    scaler.style.setProperty("--game-fit-scale", safeScale.toFixed(5));
    scaler.dataset.fitScale = safeScale.toFixed(5);
  }

  let rafId = 0;
  function scheduleFit() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      rafId = 0;
      fitGameToVisibleViewport();
    });
  }

  window.addEventListener("resize", scheduleFit, { passive: true });
  window.addEventListener("orientationchange", () => {
    scheduleFit();
    setTimeout(scheduleFit, 120);
    setTimeout(scheduleFit, 420);
  }, { passive: true });

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", scheduleFit, { passive: true });
    window.visualViewport.addEventListener("scroll", scheduleFit, { passive: true });
  }

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) scheduleFit();
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleFit, { once: true });
  } else {
    scheduleFit();
  }

  // Exposed for debugging / future UI changes.
  window.fitGameToVisibleViewport = fitGameToVisibleViewport;
})();
