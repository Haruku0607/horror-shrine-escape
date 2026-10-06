"use strict";

const CACHE_PREFIX = "shrine-offline-";
const CACHE_NAME = "shrine-offline-rev200-mobileux3";
const ASSETS = [
  {
    "path": "./README.txt",
    "bytes": 1850
  },
  {
    "path": "./assets/audio/armed_capture.mp3",
    "bytes": 22568
  },
  {
    "path": "./assets/audio/armed_knife_hit.mp3",
    "bytes": 26496
  },
  {
    "path": "./assets/audio/armed_move.mp3",
    "bytes": 102000
  },
  {
    "path": "./assets/audio/armed_throw.mp3",
    "bytes": 12537
  },
  {
    "path": "./assets/audio/beast_capture.mp3",
    "bytes": 51072
  },
  {
    "path": "./assets/audio/beast_detect.mp3",
    "bytes": 33984
  },
  {
    "path": "./assets/audio/beast_sniff.mp3",
    "bytes": 30533
  },
  {
    "path": "./assets/audio/break.mp3",
    "bytes": 31680
  },
  {
    "path": "./assets/audio/bugmaster_capture.mp3",
    "bytes": 112320
  },
  {
    "path": "./assets/audio/bugmaster_detect.mp3",
    "bytes": 182302
  },
  {
    "path": "./assets/audio/bugmaster_swarm.mp3",
    "bytes": 90499
  },
  {
    "path": "./assets/audio/counter_empty.mp3",
    "bytes": 25703
  },
  {
    "path": "./assets/audio/counter_explosion.mp3",
    "bytes": 97920
  },
  {
    "path": "./assets/audio/counter_hit.mp3",
    "bytes": 23195
  },
  {
    "path": "./assets/audio/counter_ready.mp3",
    "bytes": 25076
  },
  {
    "path": "./assets/audio/counter_reload.mp3",
    "bytes": 24192
  },
  {
    "path": "./assets/audio/counter_rocket.mp3",
    "bytes": 80064
  },
  {
    "path": "./assets/audio/counter_shot.mp3",
    "bytes": 17812
  },
  {
    "path": "./assets/audio/counter_stun.mp3",
    "bytes": 52992
  },
  {
    "path": "./assets/audio/enemy.mp3",
    "bytes": 187527
  },
  {
    "path": "./assets/audio/field.mp3",
    "bytes": 1601619
  },
  {
    "path": "./assets/audio/heartbeat.mp3",
    "bytes": 34480
  },
  {
    "path": "./assets/audio/help.mp3",
    "bytes": 43257
  },
  {
    "path": "./assets/audio/hit.wav",
    "bytes": 15920
  },
  {
    "path": "./assets/audio/kaishutsubotsu.mp3",
    "bytes": 583680
  },
  {
    "path": "./assets/audio/matsuri_bell.mp3",
    "bytes": 63319
  },
  {
    "path": "./assets/audio/miezaru.mp3",
    "bytes": 583680
  },
  {
    "path": "./assets/audio/night_shadow_cry.mp3",
    "bytes": 19774
  },
  {
    "path": "./assets/audio/night_shadow_flap.mp3",
    "bytes": 21002
  },
  {
    "path": "./assets/audio/scream.mp3",
    "bytes": 42004
  },
  {
    "path": "./assets/audio/snatch.mp3",
    "bytes": 27135
  },
  {
    "path": "./assets/audio/title.mp3",
    "bytes": 5249567
  },
  {
    "path": "./assets/audio/tracker_capture.mp3",
    "bytes": 96621
  },
  {
    "path": "./assets/audio/ugomekimono.mp3",
    "bytes": 98188
  },
  {
    "path": "./assets/audio/ugomekimono_capture.mp3",
    "bytes": 57258
  },
  {
    "path": "./assets/audio/ugomekimono_tentacle.mp3",
    "bytes": 271296
  },
  {
    "path": "./assets/audio/watcher.mp3",
    "bytes": 51840
  },
  {
    "path": "./assets/images/armed_axe_slam_sheet.png",
    "bytes": 1018823
  },
  {
    "path": "./assets/images/armed_enemy_capture.png",
    "bytes": 2236937
  },
  {
    "path": "./assets/images/armed_enemy_knife.png",
    "bytes": 1564075
  },
  {
    "path": "./assets/images/armed_enemy_sheet.png",
    "bytes": 2238273
  },
  {
    "path": "./assets/images/beast_enemy_capture.png",
    "bytes": 1182296
  },
  {
    "path": "./assets/images/beast_enemy_sheet.png",
    "bytes": 965506
  },
  {
    "path": "./assets/images/bug_swarm_flood.png",
    "bytes": 393504
  },
  {
    "path": "./assets/images/bug_swarm_overlay.png",
    "bytes": 1039
  },
  {
    "path": "./assets/images/bug_swarm_sheet.png",
    "bytes": 166845
  },
  {
    "path": "./assets/images/bugmaster_enemy_capture.png",
    "bytes": 2020567
  },
  {
    "path": "./assets/images/bugmaster_enemy_sheet.png",
    "bytes": 1902359
  },
  {
    "path": "./assets/images/building_new.png",
    "bytes": 2293642
  },
  {
    "path": "./assets/images/chain_hook.png",
    "bytes": 28161
  },
  {
    "path": "./assets/images/counterattack/prompts.json",
    "bytes": 17689
  },
  {
    "path": "./assets/images/counterattack/seal_bullet.png",
    "bytes": 571672
  },
  {
    "path": "./assets/images/counterattack/seal_explosion.png",
    "bytes": 2089865
  },
  {
    "path": "./assets/images/counterattack/seal_grenade_field.png",
    "bytes": 1570612
  },
  {
    "path": "./assets/images/counterattack/seal_grenade_icon.png",
    "bytes": 1638499
  },
  {
    "path": "./assets/images/counterattack/seal_gun_field.png",
    "bytes": 1292063
  },
  {
    "path": "./assets/images/counterattack/seal_gun_icon.png",
    "bytes": 1400543
  },
  {
    "path": "./assets/images/counterattack/seal_hit.png",
    "bytes": 867347
  },
  {
    "path": "./assets/images/counterattack/seal_launcher_field.png",
    "bytes": 791994
  },
  {
    "path": "./assets/images/counterattack/seal_launcher_icon.png",
    "bytes": 972157
  },
  {
    "path": "./assets/images/counterattack/seal_mine_field.png",
    "bytes": 2344243
  },
  {
    "path": "./assets/images/counterattack/seal_mine_icon.png",
    "bytes": 1853083
  },
  {
    "path": "./assets/images/counterattack/seal_rocket.png",
    "bytes": 754287
  },
  {
    "path": "./assets/images/counterattack/stun_grenade_field.png",
    "bytes": 1572224
  },
  {
    "path": "./assets/images/counterattack/stun_grenade_icon.png",
    "bytes": 1678626
  },
  {
    "path": "./assets/images/effects/shrine_akane_glow.png",
    "bytes": 226489
  },
  {
    "path": "./assets/images/enemy_sheet.png",
    "bytes": 1775180
  },
  {
    "path": "./assets/images/generated_field_map.png",
    "bytes": 2650971
  },
  {
    "path": "./assets/images/generated_sacred_tree.png",
    "bytes": 2594422
  },
  {
    "path": "./assets/images/ground.png",
    "bytes": 515108
  },
  {
    "path": "./assets/images/ground_new.png",
    "bytes": 3151098
  },
  {
    "path": "./assets/images/icons/cracked_mirror.png",
    "bytes": 220140
  },
  {
    "path": "./assets/images/icons/damaged_beads.png",
    "bytes": 205526
  },
  {
    "path": "./assets/images/icons/eternal_magic_mirror.png",
    "bytes": 487964
  },
  {
    "path": "./assets/images/icons/firecrackers.png",
    "bytes": 206277
  },
  {
    "path": "./assets/images/icons/frayed_bell_rope.png",
    "bytes": 219617
  },
  {
    "path": "./assets/images/icons/infinite_omamori.png",
    "bytes": 473655
  },
  {
    "path": "./assets/images/icons/matsuri_bell.png",
    "bytes": 1602191
  },
  {
    "path": "./assets/images/icons/max_stamina_drink.png",
    "bytes": 424883
  },
  {
    "path": "./assets/images/icons/old_talisman.png",
    "bytes": 226481
  },
  {
    "path": "./assets/images/icons/omamori.png",
    "bytes": 80736
  },
  {
    "path": "./assets/images/icons/sacred_matsuri_bell.png",
    "bytes": 484678
  },
  {
    "path": "./assets/images/icons/saisen_coin.png",
    "bytes": 226436
  },
  {
    "path": "./assets/images/icons/small_buddha.png",
    "bytes": 206717
  },
  {
    "path": "./assets/images/icons/small_stone.png",
    "bytes": 169181
  },
  {
    "path": "./assets/images/icons/stamina_drink.png",
    "bytes": 64938
  },
  {
    "path": "./assets/images/icons/tattered_talisman.png",
    "bytes": 209597
  },
  {
    "path": "./assets/images/icons/touch_run_pictogram.png",
    "bytes": 2245
  },
  {
    "path": "./assets/images/icons/worn_kokeshi.png",
    "bytes": 183223
  },
  {
    "path": "./assets/images/item_magic_mirror.png",
    "bytes": 151565
  },
  {
    "path": "./assets/images/jumpscare_enemy.png",
    "bytes": 2120971
  },
  {
    "path": "./assets/images/kaishutsubotsu_capture.png",
    "bytes": 1935078
  },
  {
    "path": "./assets/images/kaishutsubotsu_sheet.png",
    "bytes": 1538115
  },
  {
    "path": "./assets/images/miezaru_capture.png",
    "bytes": 964122
  },
  {
    "path": "./assets/images/miezaru_sheet.png",
    "bytes": 881523
  },
  {
    "path": "./assets/images/mobile/building_new.png",
    "bytes": 450980
  },
  {
    "path": "./assets/images/mobile/cracked_mirror.png",
    "bytes": 29500
  },
  {
    "path": "./assets/images/mobile/crate.png",
    "bytes": 55965
  },
  {
    "path": "./assets/images/mobile/crate_open.png",
    "bytes": 90765
  },
  {
    "path": "./assets/images/mobile/damaged_beads.png",
    "bytes": 30857
  },
  {
    "path": "./assets/images/mobile/eternal_magic_mirror.png",
    "bytes": 28693
  },
  {
    "path": "./assets/images/mobile/firecrackers.png",
    "bytes": 28374
  },
  {
    "path": "./assets/images/mobile/frayed_bell_rope.png",
    "bytes": 31397
  },
  {
    "path": "./assets/images/mobile/generated_sacred_tree.png",
    "bytes": 159411
  },
  {
    "path": "./assets/images/mobile/generated_shimenawa_topdown_square.png",
    "bytes": 85276
  },
  {
    "path": "./assets/images/mobile/ground_new.png",
    "bytes": 538301
  },
  {
    "path": "./assets/images/mobile/infinite_omamori.png",
    "bytes": 26806
  },
  {
    "path": "./assets/images/mobile/locker.png",
    "bytes": 49785
  },
  {
    "path": "./assets/images/mobile/locker_open.png",
    "bytes": 62722
  },
  {
    "path": "./assets/images/mobile/main_altar.png",
    "bytes": 189644
  },
  {
    "path": "./assets/images/mobile/matsuri_bell.png",
    "bytes": 22481
  },
  {
    "path": "./assets/images/mobile/max_stamina_drink.png",
    "bytes": 23239
  },
  {
    "path": "./assets/images/mobile/object_car.png",
    "bytes": 89789
  },
  {
    "path": "./assets/images/mobile/object_pole.png",
    "bytes": 14431
  },
  {
    "path": "./assets/images/mobile/old_talisman.png",
    "bytes": 31242
  },
  {
    "path": "./assets/images/mobile/omamori.png",
    "bytes": 33688
  },
  {
    "path": "./assets/images/mobile/player_single.png",
    "bytes": 40234
  },
  {
    "path": "./assets/images/mobile/road_new.png",
    "bytes": 476718
  },
  {
    "path": "./assets/images/mobile/sacred_matsuri_bell.png",
    "bytes": 32301
  },
  {
    "path": "./assets/images/mobile/saisen_coin.png",
    "bytes": 31333
  },
  {
    "path": "./assets/images/mobile/sealed_key_box.png",
    "bytes": 94636
  },
  {
    "path": "./assets/images/mobile/sealed_key_box_open.png",
    "bytes": 90190
  },
  {
    "path": "./assets/images/mobile/shrine_akane_glow.png",
    "bytes": 62403
  },
  {
    "path": "./assets/images/mobile/small_buddha.png",
    "bytes": 27800
  },
  {
    "path": "./assets/images/mobile/small_shrine.png",
    "bytes": 80831
  },
  {
    "path": "./assets/images/mobile/small_stone.png",
    "bytes": 18472
  },
  {
    "path": "./assets/images/mobile/stamina_drink.png",
    "bytes": 27794
  },
  {
    "path": "./assets/images/mobile/tansu.png",
    "bytes": 64665
  },
  {
    "path": "./assets/images/mobile/tansu_open.png",
    "bytes": 74362
  },
  {
    "path": "./assets/images/mobile/tattered_talisman.png",
    "bytes": 27515
  },
  {
    "path": "./assets/images/mobile/torii.png",
    "bytes": 75981
  },
  {
    "path": "./assets/images/mobile/worn_kokeshi.png",
    "bytes": 22255
  },
  {
    "path": "./assets/images/mobile_counter/seal_bullet.png",
    "bytes": 16670
  },
  {
    "path": "./assets/images/mobile_counter/seal_explosion.png",
    "bytes": 429259
  },
  {
    "path": "./assets/images/mobile_counter/seal_grenade.png",
    "bytes": 55545
  },
  {
    "path": "./assets/images/mobile_counter/seal_grenade_field.png",
    "bytes": 96994
  },
  {
    "path": "./assets/images/mobile_counter/seal_gun.png",
    "bytes": 41366
  },
  {
    "path": "./assets/images/mobile_counter/seal_gun_field.png",
    "bytes": 65079
  },
  {
    "path": "./assets/images/mobile_counter/seal_hit.png",
    "bytes": 96772
  },
  {
    "path": "./assets/images/mobile_counter/seal_launcher.png",
    "bytes": 30246
  },
  {
    "path": "./assets/images/mobile_counter/seal_launcher_field.png",
    "bytes": 58987
  },
  {
    "path": "./assets/images/mobile_counter/seal_mine.png",
    "bytes": 67520
  },
  {
    "path": "./assets/images/mobile_counter/seal_mine_field.png",
    "bytes": 117538
  },
  {
    "path": "./assets/images/mobile_counter/seal_rocket.png",
    "bytes": 38314
  },
  {
    "path": "./assets/images/mobile_counter/stun_grenade.png",
    "bytes": 52230
  },
  {
    "path": "./assets/images/mobile_counter/stun_grenade_field.png",
    "bytes": 87597
  },
  {
    "path": "./assets/images/night_shadow_capture.png",
    "bytes": 1722594
  },
  {
    "path": "./assets/images/night_shadow_sheet.png",
    "bytes": 930446
  },
  {
    "path": "./assets/images/object_car.png",
    "bytes": 1957280
  },
  {
    "path": "./assets/images/object_pole.png",
    "bytes": 1024039
  },
  {
    "path": "./assets/images/player_single.png",
    "bytes": 1265787
  },
  {
    "path": "./assets/images/plaza_tile.png",
    "bytes": 1565426
  },
  {
    "path": "./assets/images/props/crate.png",
    "bytes": 316035
  },
  {
    "path": "./assets/images/props/crate_open.png",
    "bytes": 1919742
  },
  {
    "path": "./assets/images/props/generated_shimenawa_topdown_square.png",
    "bytes": 1387775
  },
  {
    "path": "./assets/images/props/locker.png",
    "bytes": 306261
  },
  {
    "path": "./assets/images/props/locker_open.png",
    "bytes": 1348232
  },
  {
    "path": "./assets/images/props/main_altar.png",
    "bytes": 389413
  },
  {
    "path": "./assets/images/props/sealed_key_box.png",
    "bytes": 2572788
  },
  {
    "path": "./assets/images/props/sealed_key_box_open.png",
    "bytes": 1855735
  },
  {
    "path": "./assets/images/props/small_shrine.png",
    "bytes": 305832
  },
  {
    "path": "./assets/images/props/tansu.png",
    "bytes": 326636
  },
  {
    "path": "./assets/images/props/tansu_open.png",
    "bytes": 1590776
  },
  {
    "path": "./assets/images/props/torii.png",
    "bytes": 291071
  },
  {
    "path": "./assets/images/road_new.png",
    "bytes": 3170046
  },
  {
    "path": "./assets/images/sealed_player_0.png",
    "bytes": 523542
  },
  {
    "path": "./assets/images/sealed_player_1.png",
    "bytes": 571785
  },
  {
    "path": "./assets/images/sealed_player_2.png",
    "bytes": 543304
  },
  {
    "path": "./assets/images/sealed_player_3.png",
    "bytes": 535558
  },
  {
    "path": "./assets/images/snatch_shadow.png",
    "bytes": 19894
  },
  {
    "path": "./assets/images/ugomekimono_bound_tentacle_sheet.png",
    "bytes": 1195090
  },
  {
    "path": "./assets/images/ugomekimono_capture.png",
    "bytes": 2587902
  },
  {
    "path": "./assets/images/ugomekimono_ground_tentacle_sheet.png",
    "bytes": 1178880
  },
  {
    "path": "./assets/images/ugomekimono_sheet.png",
    "bytes": 1776019
  },
  {
    "path": "./assets/images/ugomekimono_tentacle_sheet.png",
    "bytes": 694317
  },
  {
    "path": "./assets/images/ugomekimono_tentacle_wall_sheet.png",
    "bytes": 2027097
  },
  {
    "path": "./assets/images/watcher_capture.png",
    "bytes": 1462602
  },
  {
    "path": "./assets/images/watcher_giant_eye_sheet.png",
    "bytes": 1793733
  },
  {
    "path": "./assets/images/watcher_sheet.png",
    "bytes": 1422294
  },
  {
    "path": "./cheat_commands.txt",
    "bytes": 972
  },
  {
    "path": "./counterattack.js",
    "bytes": 42751
  },
  {
    "path": "./game.js",
    "bytes": 326328
  },
  {
    "path": "./iPhone_setup_guide.txt",
    "bytes": 2542
  },
  {
    "path": "./index.html",
    "bytes": 13154
  },
  {
    "path": "./manifest.webmanifest",
    "bytes": 494
  },
  {
    "path": "./mobile-fit.js",
    "bytes": 6075
  },
  {
    "path": "./pwa.js",
    "bytes": 8544
  },
  {
    "path": "./style.css",
    "bytes": 118342
  }
];
const TOTAL_BYTES = ASSETS.reduce((sum, item) => sum + item.bytes, 0);
const SHELL = [
  "./index.html",
  "./style.css",
  "./game.js",
  "./counterattack.js",
  "./pwa.js",
  "./mobile-fit.js",
  "./manifest.webmanifest",
  "./assets/images/props/torii.png"
];

function assetAbsoluteUrl(path) {
  return new URL(path, self.registration.scope).href;
}

async function cacheShell() {
  const cache = await caches.open(CACHE_NAME);
  for (const path of SHELL) {
    try {
      const response = await fetch(path, {cache:"reload"});
      if (response.ok) await cache.put(path, response.clone());
    } catch (_) {}
  }
}

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    await cacheShell();
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME).map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

async function getStatus() {
  const cache = await caches.open(CACHE_NAME);
  const keys = await cache.keys();
  const present = new Set(keys.map(req => {
    const u = new URL(req.url);
    return u.origin + u.pathname;
  }));
  let done = 0;
  let doneBytes = 0;
  for (const item of ASSETS) {
    const u = new URL(assetAbsoluteUrl(item.path));
    if (present.has(u.origin + u.pathname)) {
      done++;
      doneBytes += item.bytes;
    }
  }
  return {done, total:ASSETS.length, doneBytes, totalBytes:TOTAL_BYTES, complete:done === ASSETS.length};
}

async function sendToClient(clientId, payload) {
  if (!clientId) return;
  const client = await self.clients.get(clientId);
  if (client) client.postMessage(payload);
}

async function cacheAll(clientId, force) {
  const cache = await caches.open(CACHE_NAME);
  if (force) {
    for (const item of ASSETS) {
      try { await cache.delete(item.path, {ignoreSearch:true}); } catch (_) {}
    }
    await cacheShell();
  }

  let status = await getStatus();
  let done = status.done;
  let doneBytes = status.doneBytes;
  const failed = [];
  await sendToClient(clientId, {type:"CACHE_PROGRESS", ...status});

  const cachedNow = new Set();
  const existingKeys = await cache.keys();
  for (const req of existingKeys) {
    const u = new URL(req.url);
    cachedNow.add(u.origin + u.pathname);
  }

  let cursor = 0;
  const workers = Array.from({length:4}, async () => {
    while (cursor < ASSETS.length) {
      const index = cursor++;
      const item = ASSETS[index];
      const abs = new URL(assetAbsoluteUrl(item.path));
      const key = abs.origin + abs.pathname;
      if (cachedNow.has(key)) continue;
      try {
        const response = await fetch(item.path, {cache:"reload"});
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        await cache.put(item.path, response.clone());
        cachedNow.add(key);
        done++;
        doneBytes += item.bytes;
      } catch (err) {
        failed.push(item.path);
      }
      await sendToClient(clientId, {
        type:"CACHE_PROGRESS",
        done,
        total:ASSETS.length,
        doneBytes,
        totalBytes:TOTAL_BYTES,
        complete:false
      });
    }
  });
  await Promise.all(workers);

  status = await getStatus();
  if (status.complete) {
    await sendToClient(clientId, {type:"CACHE_COMPLETE", ...status});
  } else {
    await sendToClient(clientId, {type:"CACHE_ERROR", ...status, failed});
  }
}

self.addEventListener("message", event => {
  const msg = event.data || {};
  if (msg.type === "GET_STATUS") {
    event.waitUntil((async () => {
      const status = await getStatus();
      await sendToClient(event.source && event.source.id, {type:"CACHE_STATUS", ...status});
    })());
  } else if (msg.type === "CACHE_ALL") {
    event.waitUntil(cacheAll(event.source && event.source.id, !!msg.force));
  }
});

async function makeRangeResponse(fullResponse, rangeHeader) {
  const buffer = await fullResponse.arrayBuffer();
  const size = buffer.byteLength;
  const match = /^bytes=(\d*)-(\d*)$/i.exec(String(rangeHeader || "").trim());
  if (!match || size <= 0) return fullResponse;

  let start;
  let end;
  if (match[1] === "" && match[2] !== "") {
    const suffix = Math.max(0, Number(match[2]) || 0);
    start = Math.max(0, size - suffix);
    end = size - 1;
  } else {
    start = Math.max(0, Number(match[1]) || 0);
    end = match[2] === "" ? size - 1 : Math.min(size - 1, Number(match[2]) || 0);
  }

  if (start >= size || end < start) {
    return new Response(null, {
      status: 416,
      headers: { "Content-Range": `bytes */${size}` }
    });
  }

  const chunk = buffer.slice(start, end + 1);
  const headers = new Headers(fullResponse.headers);
  headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
  headers.set("Accept-Ranges", "bytes");
  headers.set("Content-Length", String(chunk.byteLength));
  return new Response(chunk, { status: 206, statusText: "Partial Content", headers });
}

function isCoreAsset(url) {
  return /\.(?:html?|css|js|webmanifest)$/i.test(url.pathname);
}

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // iOS/Safari requests MP3/WAV files with Range headers. Returning a normal
  // cached 200 response breaks playback, so serve a real 206 response from
  // the offline cache when a byte range is requested.
  const rangeHeader = request.headers.get("range");
  if (rangeHeader) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(request, { ignoreSearch: true });
      if (cached) return makeRangeResponse(cached, rangeHeader);
      try {
        return await fetch(request);
      } catch (_) {
        return Response.error();
      }
    })());
    return;
  }

  // While online, refresh the application shell first. This prevents an old
  // Service Worker from pinning stale HTML/CSS/JS after a GitHub Pages update.
  if (request.mode === "navigate" || isCoreAsset(url)) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        const network = await fetch(request, { cache: "no-cache" });
        if (network && network.ok) {
          const key = request.mode === "navigate" ? "./index.html" : request;
          await cache.put(key, network.clone());
        }
        return network;
      } catch (_) {
        const fallback = request.mode === "navigate"
          ? await cache.match("./index.html", { ignoreSearch: true })
          : await cache.match(request, { ignoreSearch: true });
        return fallback || Response.error();
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request, {ignoreSearch:true});
    if (cached) return cached;
    try {
      const network = await fetch(request);
      if (network && network.ok && network.status === 200) await cache.put(request, network.clone());
      return network;
    } catch (_) {
      return Response.error();
    }
  })());
});
