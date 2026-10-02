(() => {
  "use strict";

  const VERSION = "rev198-mobilefit1";
  const SW_URL = `service-worker.js?v=${VERSION}`;
  let registration = null;
  let overlay = null;
  let statusText = null;
  let detailText = null;
  let progressBar = null;
  let retryButton = null;
  let closeButton = null;
  let completed = false;

  function formatBytes(bytes) {
    if (!Number.isFinite(bytes) || bytes <= 0) return "0 MB";
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  }

  function ensureOverlay() {
    if (overlay) return;
    const style = document.createElement("style");
    style.textContent = `
      #offlinePrepOverlay{position:fixed;inset:0;z-index:1000000;display:flex;align-items:center;justify-content:center;padding:max(18px,env(safe-area-inset-top)) max(18px,env(safe-area-inset-right)) max(18px,env(safe-area-inset-bottom)) max(18px,env(safe-area-inset-left));background:rgba(0,0,0,.94);color:#fff;font-family:-apple-system,BlinkMacSystemFont,"Hiragino Kaku Gothic ProN","Yu Gothic",sans-serif}
      #offlinePrepOverlay[hidden]{display:none}
      #offlinePrepPanel{width:min(620px,92vw);border:1px solid rgba(255,255,255,.22);border-radius:16px;padding:22px;background:linear-gradient(180deg,rgba(40,18,18,.96),rgba(8,8,8,.98));box-shadow:0 20px 70px rgba(0,0,0,.6)}
      #offlinePrepPanel h2{margin:0 0 12px;font-size:clamp(22px,5vw,32px);letter-spacing:.08em}
      #offlinePrepPanel p{margin:8px 0;line-height:1.65;font-size:15px}
      #offlinePrepTrack{height:13px;margin:17px 0 9px;border-radius:999px;overflow:hidden;background:#252525;border:1px solid #444}
      #offlinePrepBar{width:0;height:100%;background:linear-gradient(90deg,#6b1111,#e05050);transition:width .15s linear}
      #offlinePrepDetail{font-variant-numeric:tabular-nums;color:#ddd}
      #offlinePrepButtons{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px}
      #offlinePrepButtons button{min-width:120px;padding:11px 16px;border-radius:10px;border:1px solid #777;background:#191919;color:#fff;font-size:15px;font-weight:700}
      #offlinePrepButtons button:active{transform:translateY(1px)}
      #offlinePrepRetry{background:#641515!important;border-color:#a54a4a!important}
    `;
    document.head.appendChild(style);

    overlay = document.createElement("div");
    overlay.id = "offlinePrepOverlay";
    overlay.innerHTML = `
      <div id="offlinePrepPanel" role="dialog" aria-live="polite" aria-modal="true">
        <h2>オフライン準備</h2>
        <p id="offlinePrepStatus">iPhoneで通信なしでも遊べるよう、ゲームデータを保存しています。</p>
        <div id="offlinePrepTrack"><div id="offlinePrepBar"></div></div>
        <p id="offlinePrepDetail">準備中…</p>
        <p>完了するまでは、このページを閉じたり通信を切ったりしないでください。</p>
        <div id="offlinePrepButtons">
          <button id="offlinePrepRetry" type="button" hidden>再試行</button>
          <button id="offlinePrepClose" type="button" hidden>ゲームへ</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    statusText = overlay.querySelector("#offlinePrepStatus");
    detailText = overlay.querySelector("#offlinePrepDetail");
    progressBar = overlay.querySelector("#offlinePrepBar");
    retryButton = overlay.querySelector("#offlinePrepRetry");
    closeButton = overlay.querySelector("#offlinePrepClose");
    retryButton.addEventListener("click", () => startCaching(true));
    closeButton.addEventListener("click", () => { overlay.hidden = true; });
  }

  function setProgress(done, total, doneBytes, totalBytes) {
    ensureOverlay();
    const pct = total > 0 ? Math.max(0, Math.min(100, Math.round(done / total * 100))) : 0;
    progressBar.style.width = `${pct}%`;
    detailText.textContent = `${done} / ${total} ファイル　${formatBytes(doneBytes)} / ${formatBytes(totalBytes)}　${pct}%`;
  }

  function showError(message) {
    ensureOverlay();
    completed = false;
    statusText.textContent = message || "オフラインデータの保存に失敗しました。通信状態と空き容量を確認してください。";
    retryButton.hidden = false;
    closeButton.hidden = false;
  }

  async function requestPersistentStorage() {
    try {
      if (navigator.storage && navigator.storage.persist) {
        await navigator.storage.persist();
      }
    } catch (_) {
      // Persistent storage is best-effort; failure must not stop the game.
    }
  }

  function postToWorker(message) {
    const worker = registration && (registration.active || registration.waiting || registration.installing);
    if (!worker) throw new Error("Service Worker is not ready");
    worker.postMessage(message);
  }

  async function startCaching(force = false) {
    ensureOverlay();
    overlay.hidden = false;
    retryButton.hidden = true;
    closeButton.hidden = true;
    statusText.textContent = "iPhoneで通信なしでも遊べるよう、ゲームデータを保存しています。";
    if (force) progressBar.style.width = "0%";
    try {
      postToWorker({type:"CACHE_ALL", force});
    } catch (err) {
      showError("オフライン準備を開始できませんでした。ページを再読み込みしてください。");
    }
  }

  function handleWorkerMessage(event) {
    const msg = event.data || {};
    if (msg.type === "CACHE_STATUS") {
      setProgress(msg.done, msg.total, msg.doneBytes, msg.totalBytes);
      if (msg.complete) {
        completed = true;
        statusText.textContent = "オフライン準備完了。通信を切っても起動できます。";
        retryButton.hidden = true;
        closeButton.hidden = false;
        setTimeout(() => { if (overlay && completed) overlay.hidden = true; }, 1400);
      } else {
        startCaching(false);
      }
    } else if (msg.type === "CACHE_PROGRESS") {
      setProgress(msg.done, msg.total, msg.doneBytes, msg.totalBytes);
    } else if (msg.type === "CACHE_COMPLETE") {
      setProgress(msg.total, msg.total, msg.totalBytes, msg.totalBytes);
      completed = true;
      statusText.textContent = "オフライン準備完了。通信を切っても起動できます。";
      retryButton.hidden = true;
      closeButton.hidden = false;
      requestPersistentStorage();
      setTimeout(() => { if (overlay && completed) overlay.hidden = true; }, 1400);
    } else if (msg.type === "CACHE_ERROR") {
      setProgress(msg.done || 0, msg.total || 0, msg.doneBytes || 0, msg.totalBytes || 0);
      const extra = msg.failed && msg.failed.length ? `（未保存: ${msg.failed.length}ファイル）` : "";
      showError(`オフラインデータの保存に失敗しました${extra}。通信状態とiPhoneの空き容量を確認して「再試行」を押してください。`);
    }
  }

  async function init() {
    if (!("serviceWorker" in navigator)) {
      ensureOverlay();
      showError("この環境ではオフラインアプリ機能を利用できません。iPhoneのSafariからHTTPSで開いてください。");
      return;
    }
    ensureOverlay();
    navigator.serviceWorker.addEventListener("message", handleWorkerMessage);
    try {
      registration = await navigator.serviceWorker.register(SW_URL, {scope:"./"});
      await navigator.serviceWorker.ready;
      registration = await navigator.serviceWorker.getRegistration("./") || registration;
      await requestPersistentStorage();
      postToWorker({type:"GET_STATUS"});
    } catch (err) {
      showError("オフライン機能の初期化に失敗しました。HTTPSで公開したページをSafariから開いてください。");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, {once:true});
  } else {
    init();
  }
})();
