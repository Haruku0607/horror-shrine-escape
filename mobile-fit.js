(() => {
  "use strict";

  const STAGE_WIDTH = 800;
  const STAGE_HEIGHT = 500;
  const MIN_SIDE = 96;
  const MAX_SIDE = 166;
  const EDGE_GAP = 6;

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function visibleViewport() {
    const vv = window.visualViewport;
    return {
      width: Math.max(1, vv?.width || window.innerWidth || document.documentElement.clientWidth || 1),
      height: Math.max(1, vv?.height || window.innerHeight || document.documentElement.clientHeight || 1),
      left: Math.max(0, vv?.offsetLeft || 0),
      top: Math.max(0, vv?.offsetTop || 0)
    };
  }

  function createRail(id, className) {
    let rail = document.getElementById(id);
    if (rail) return rail;
    rail = document.createElement("div");
    rail.id = id;
    rail.className = className;
    return rail;
  }

  function moveIfPresent(id, parent) {
    const el = document.getElementById(id);
    if (el && el.parentElement !== parent) parent.appendChild(el);
    return el;
  }

  function installMobileLayout() {
    document.documentElement.classList.add("mobileUx");
    document.body.classList.add("touchMode", "smartphoneOnly", "mobileUx");

    const gameScreen = document.getElementById("gameScreen");
    const scaler = document.getElementById("gameViewportScaler");
    if (!gameScreen || !scaler) return;

    const leftRail = createRail("mobileHudLeft", "mobileHudRail mobileHudLeft");
    const rightRail = createRail("mobileHudRight", "mobileHudRail mobileHudRight");
    if (!leftRail.parentElement) gameScreen.insertBefore(leftRail, scaler);
    if (!rightRail.parentElement) gameScreen.appendChild(rightRail);

    moveIfPresent("inventoryPanel", leftRail);
    // The selected-item text must not occupy the same lower-left rail as the joystick.
    // Keep it as a compact chip beside the playfield instead.
    moveIfPresent("selectedItemName", gameScreen);
    moveIfPresent("minimap", rightRail);

    // These HUD elements must stay readable and therefore must not be scaled with the playfield.
    ["staminaGauge", "buddhaGauge", "ugomeEscapeGauge", "messageBox", "promptBox", "pauseOverlay"].forEach(id => {
      moveIfPresent(id, gameScreen);
    });

    let rotateNotice = document.getElementById("rotateNotice");
    if (!rotateNotice) {
      rotateNotice = document.createElement("div");
      rotateNotice.id = "rotateNotice";
      rotateNotice.innerHTML = '<strong>横向きでプレイ</strong><span>iPhoneを横向きにしてください</span>';
      gameScreen.appendChild(rotateNotice);
    }

    // Counterattack UI is created after this file runs. Re-home the readable parts when they appear.
    const observer = new MutationObserver(() => {
      const hud = document.getElementById("counterHud");
      const reload = document.getElementById("counterReloadButton");
      // Ammo/reload UI belongs under the minimap, not below the pause button.
      if (hud && hud.parentElement !== rightRail) rightRail.appendChild(hud);
      if (reload && reload.parentElement !== rightRail) rightRail.appendChild(reload);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function fitGameToVisibleViewport() {
    const scaler = document.getElementById("gameViewportScaler");
    const gameScreen = document.getElementById("gameScreen");
    if (!scaler || !gameScreen) return;

    const vp = visibleViewport();
    const landscape = vp.width >= vp.height;
    document.body.classList.toggle("portraitGame", !landscape);

    if (!landscape) {
      const scale = Math.min((vp.width - 12) / STAGE_WIDTH, (vp.height - 110) / STAGE_HEIGHT, 1);
      gameScreen.style.setProperty("--game-fit-scale", Math.max(.35, scale).toFixed(5));
      gameScreen.style.setProperty("--mobile-side", "0px");
      gameScreen.style.setProperty("--stage-width", `${STAGE_WIDTH * Math.max(.35, scale)}px`);
      gameScreen.style.setProperty("--stage-height", `${STAGE_HEIGHT * Math.max(.35, scale)}px`);
      return;
    }

    // Reserve the landscape gutters for HUD and controls instead of shrinking them with the game.
    const desiredSide = clamp(vp.width * 0.145, vp.width < 740 ? MIN_SIDE : 108, MAX_SIDE);
    const widthScale = Math.max(.45, (vp.width - desiredSide * 2 - EDGE_GAP * 2) / STAGE_WIDTH);
    const heightScale = Math.max(.45, (vp.height - EDGE_GAP * 2) / STAGE_HEIGHT);
    const scale = Math.min(widthScale, heightScale, 1.08);
    const stageWidth = STAGE_WIDTH * scale;
    const stageHeight = STAGE_HEIGHT * scale;
    const side = Math.max(0, (vp.width - stageWidth) / 2);

    gameScreen.style.setProperty("--game-fit-scale", scale.toFixed(5));
    gameScreen.style.setProperty("--mobile-side", `${Math.max(84, side - EDGE_GAP)}px`);
    gameScreen.style.setProperty("--stage-width", `${stageWidth}px`);
    gameScreen.style.setProperty("--stage-height", `${stageHeight}px`);
    gameScreen.style.setProperty("--stage-left", `${side}px`);
    gameScreen.style.setProperty("--visible-height", `${vp.height}px`);
  }

  let rafId = 0;
  function scheduleFit() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      rafId = 0;
      fitGameToVisibleViewport();
    });
  }

  function boot() {
    installMobileLayout();
    scheduleFit();
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
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }

  window.fitGameToVisibleViewport = fitGameToVisibleViewport;
})();
