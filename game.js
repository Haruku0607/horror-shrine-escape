// ==============================
// 基本設定
// ==============================

let Speed = 4.2;
const SLOWED_SPEED = 2.1;
const RUN_SPEED_MULTIPLIER = 1.65;
const TIRED_SPEED_MULTIPLIER = 0.62;
const STAMINA_MAX = 100;
const STAMINA_DRAIN_PER_SECOND = 28;
const STAMINA_RECOVER_PER_SECOND = 18;
const STAMINA_TIRED_RECOVER_PER_SECOND = 9;

const VIEW_WIDTH = 800;
const VIEW_HEIGHT = 500;
const WORLD_WIDTH = 8000;
const WORLD_HEIGHT = 5000;

const ENEMY_VIEW_DISTANCE = 1750;
const ENEMY_VIEW_ANGLE = Math.PI * 1.05;
const ENEMY_WANDER_SPEED = 2.9;
const ENEMY_CHASE_SPEED = 8.8;

const GRID_SIZE = 100;
const GRID_COLS = Math.ceil(WORLD_WIDTH / GRID_SIZE);
const GRID_ROWS = Math.ceil(WORLD_HEIGHT / GRID_SIZE);

// ==============================
// DOM
// ==============================

const warningScreen = document.getElementById("warningScreen");
const titleScreen = document.getElementById("titleScreen");
const galleryScreen = document.getElementById("galleryScreen");
const howToScreen = document.getElementById("howToScreen");
const settingsScreen = document.getElementById("settingsScreen");
const recordsScreen = document.getElementById("recordsScreen");
const gameScreen = document.getElementById("gameScreen");
const movieScreen = document.getElementById("movieScreen");
const resultScreen = document.getElementById("resultScreen");

const startButton = document.getElementById("startButton");
const howToButton = document.getElementById("howToButton");
const kaiiButton = document.getElementById("kaiiButton");
const galleryBackButton = document.getElementById("galleryBackButton");
const howToBackButton = document.getElementById("howToBackButton");
const settingsButton = document.getElementById("settingsButton");
const titleRecordButton = document.getElementById("titleRecordButton");
const resetDataButton = document.getElementById("resetDataButton");
const recordsBackButton = document.getElementById("recordsBackButton");
const backButton = document.getElementById("backButton");
const retryButton = document.getElementById("retryButton");
const titleButton = document.getElementById("titleButton");

const pauseResumeButton = document.getElementById("pauseResumeButton");
const pauseSettingsButton = document.getElementById("pauseSettingsButton");
const pauseTitleButton = document.getElementById("pauseTitleButton");
const pauseRestartButton = document.getElementById("pauseRestartButton");
const passphraseButton = document.getElementById("passphraseButton");
const passphrasePanel = document.getElementById("passphrasePanel");
const passphraseInput = document.getElementById("passphraseInput");
const passphraseSubmitButton = document.getElementById("passphraseSubmitButton");
const passphraseCloseButton = document.getElementById("passphraseCloseButton");
const passphraseStatus = document.getElementById("passphraseStatus");

const masterVolume = document.getElementById("masterVolume");
const bgmVolume = document.getElementById("bgmVolume");
const seVolume = document.getElementById("seVolume");
const masterVolumeText = document.getElementById("masterVolumeText");
const bgmVolumeText = document.getElementById("bgmVolumeText");
const seVolumeText = document.getElementById("seVolumeText");

const worldCanvas = document.getElementById("worldCanvas");
const wctx = worldCanvas.getContext("2d");

const minimap = document.getElementById("minimap");
const mctx = minimap.getContext("2d");

const gameViewport = document.getElementById("gameViewport");
const cameraStage = document.getElementById("cameraStage");
const playerWrap = document.getElementById("playerWrap");
const enemyWrap = document.getElementById("enemyWrap");
const playerSprite = document.getElementById("playerSprite");
const enemySprite = document.getElementById("enemySprite");

const messageBox = document.getElementById("messageBox");
const promptBox = document.getElementById("promptBox");
const selectedItemName = document.getElementById("selectedItemName");
const buddhaGauge = document.getElementById("buddhaGauge");
const buddhaGaugeFill = document.getElementById("buddhaGaugeFill");
const staminaGauge = document.getElementById("staminaGauge");
const staminaGaugeFill = document.getElementById("staminaGaugeFill");
const ugomeEscapeGauge = document.getElementById("ugomeEscapeGauge");
const ugomeEscapeGaugeFill = document.getElementById("ugomeEscapeGaugeFill");
const aimGuide = document.getElementById("aimGuide");
const spiderWebOverlay = document.getElementById("spiderWebOverlay");
const snatchOverlay = document.getElementById("snatchOverlay");
const clearCelebrationOverlay = document.getElementById("clearCelebrationOverlay");
const whiteFadeOverlay = document.getElementById("whiteFadeOverlay");

const pauseOverlay = document.getElementById("pauseOverlay");
const pauseItems = document.getElementById("pauseItems");
const pauseKeys = document.getElementById("pauseKeys");

const resultTitle = document.getElementById("resultTitle");
const resultTime = document.getElementById("resultTime");
const resultObjective = document.getElementById("resultObjective");
const resultRank = document.getElementById("resultRank");
const galleryList = document.getElementById("galleryList");
const recordsList = document.getElementById("recordsList");
const recordDetail = document.getElementById("recordDetail");
const recordSortSelect = document.getElementById("recordSortSelect");
const movieEnemyEl = document.querySelector(".movieEnemy");
const movieStage = document.getElementById("movieStage");

const bugAttachLayer = document.createElement("div");
bugAttachLayer.id = "bugAttachLayer";
cameraStage.appendChild(bugAttachLayer);
const bugAttachSprites = [];
for (let i = 0; i < 10; i++) {
  const el = document.createElement("div");
  el.className = "bugAttachSprite";
  bugAttachLayer.appendChild(el);
  bugAttachSprites.push(el);
}

const movieBugSwarmLayer = document.createElement("div");
movieBugSwarmLayer.id = "movieBugSwarmLayer";
movieStage.appendChild(movieBugSwarmLayer);

const itemSlots = Array.from(document.querySelectorAll(".itemSlot"));
const keySlots = Array.from(document.querySelectorAll(".keySlot"));

function createMovieBugSwarm() {
  movieBugSwarmLayer.innerHTML = "";
  for (let i = 0; i < 72; i++) {
    const bug = document.createElement("div");
    bug.className = "movieBug";
    const side = i % 4;
    const delay = (i % 18) * 0.018;
    const size = 38 + (i % 5) * 8;
    const endX = (Math.random() * 58 - 29).toFixed(1) + "vw";
    const endY = (Math.random() * 42 - 21).toFixed(1) + "vh";
    const startOffset = (Math.random() * 26 + 6).toFixed(1) + "%";
    bug.style.setProperty("--delay", delay + "s");
    bug.style.setProperty("--size", size + "px");
    bug.style.setProperty("--end-x", endX);
    bug.style.setProperty("--end-y", endY);
    bug.style.setProperty("--jitter-rot", ((Math.random() * 24) - 12).toFixed(1) + "deg");
    if (side === 0) { bug.classList.add("left"); bug.style.top = startOffset; }
    else if (side === 1) { bug.classList.add("right"); bug.style.top = startOffset; }
    else if (side === 2) { bug.classList.add("top"); bug.style.left = startOffset; }
    else { bug.classList.add("bottom"); bug.style.left = startOffset; }
    movieBugSwarmLayer.appendChild(bug);
  }
}

function clearMovieBugSwarm() {
  movieBugSwarmLayer.innerHTML = "";
}

// ==============================
// 画像
// ==============================

const imageSources = {
  generated_field_map: "assets/images/generated_field_map.png",
  ground: "assets/images/ground_new.png",
  road_tile: "assets/images/road_new.png",
  plaza_tile: "assets/images/plaza_tile.png",
  building_roof_tile: "assets/images/building_new.png",
  playerSingle: "assets/images/player_single.png",
  enemySheet: "assets/images/enemy_sheet.png",
  jumpscareEnemy: "assets/images/jumpscare_enemy.png",
  armedEnemySheet: "assets/images/armed_enemy_sheet.png",
  armedEnemyCapture: "assets/images/armed_enemy_capture.png",
  armedEnemyKnife: "assets/images/armed_enemy_knife.png",
  chainHook: "assets/images/chain_hook.png",
  armedAxeSlamSheet: "assets/images/armed_axe_slam_sheet.png",
  beastEnemySheet: "assets/images/beast_enemy_sheet.png",
  beastEnemyCapture: "assets/images/beast_enemy_capture.png",
  bugmasterEnemySheet: "assets/images/bugmaster_enemy_sheet.png",
  bugmasterEnemyCapture: "assets/images/bugmaster_enemy_capture.png",
  nightShadowSheet: "assets/images/night_shadow_sheet.png",
  nightShadowCapture: "assets/images/night_shadow_capture.png",
  bugSwarmOverlay: "assets/images/bug_swarm_overlay.png",
  bugSwarmSheet: "assets/images/bug_swarm_sheet.png",
  bugSwarmFlood: "assets/images/bug_swarm_flood.png",
  kaishutsubotsuSheet: "assets/images/kaishutsubotsu_sheet.png",
  kaishutsubotsuCapture: "assets/images/kaishutsubotsu_capture.png",
  miezaruSheet: "assets/images/miezaru_sheet.png",
  miezaruCapture: "assets/images/miezaru_capture.png",
  watcherSheet: "assets/images/watcher_sheet.png",
  watcherCapture: "assets/images/watcher_capture.png",
  watcherGiantEyeSheet: "assets/images/watcher_giant_eye_sheet.png",
  ugomekimonoSheet: "assets/images/ugomekimono_sheet.png",
  ugomekimonoCapture: "assets/images/ugomekimono_capture.png",
  ugomekimonoTentacleSheet: "assets/images/ugomekimono_tentacle_sheet.png",
  ugomekimonoBoundTentacleSheet: "assets/images/ugomekimono_bound_tentacle_sheet.png",
  ugomekimonoTentacleWallSheet: "assets/images/ugomekimono_tentacle_wall_sheet.png",
  ugomekimonoGroundTentacleSheet: "assets/images/ugomekimono_ground_tentacle_sheet.png",
  magic_mirror: "assets/images/item_magic_mirror.png",
  stamina_drink: "assets/images/icons/stamina_drink.png",
  omamori: "assets/images/icons/omamori.png",

  old_talisman: "assets/images/icons/old_talisman.png",
  damaged_beads: "assets/images/icons/damaged_beads.png",
  frayed_bell_rope: "assets/images/icons/frayed_bell_rope.png",
  worn_kokeshi: "assets/images/icons/worn_kokeshi.png",
  cracked_mirror: "assets/images/icons/cracked_mirror.png",

  tattered_talisman: "assets/images/icons/tattered_talisman.png",
  small_stone: "assets/images/icons/small_stone.png",
  firecrackers: "assets/images/icons/firecrackers.png",
  saisen_coin: "assets/images/icons/saisen_coin.png",
  small_buddha: "assets/images/icons/small_buddha.png",
  matsuri_bell: "assets/images/icons/matsuri_bell.png",
  stamina_drink: "assets/images/icons/stamina_drink.png",
  omamori: "assets/images/icons/omamori.png",
  sacred_matsuri_bell: "assets/images/icons/sacred_matsuri_bell.png",
  eternal_magic_mirror: "assets/images/icons/eternal_magic_mirror.png",
  max_stamina_drink: "assets/images/icons/max_stamina_drink.png",
  infinite_omamori: "assets/images/icons/infinite_omamori.png",

  torii: "assets/images/props/torii.png",
  small_shrine: "assets/images/props/small_shrine.png",
  generated_shimenawa_topdown_square: "assets/images/props/generated_shimenawa_topdown_square.png",
  shrine_akane_glow: "assets/images/effects/shrine_akane_glow.png",
  main_altar: "assets/images/props/main_altar.png",
  locker: "assets/images/props/locker.png",
  crate: "assets/images/props/crate.png",
  tansu: "assets/images/props/tansu.png",
  sealed_key_box: "assets/images/props/sealed_key_box.png",
  locker_open: "assets/images/props/locker_open.png",
  crate_open: "assets/images/props/crate_open.png",
  tansu_open: "assets/images/props/tansu_open.png",
  sealed_key_box_open: "assets/images/props/sealed_key_box_open.png",
  sacred_tree: "assets/images/generated_sacred_tree.png",
  snatch_shadow: "assets/images/snatch_shadow.png",
  object_car: "assets/images/object_car.png",
  object_pole: "assets/images/object_pole.png"
};

const images = {};
for (const key in imageSources) {
  images[key] = new Image();
  images[key].src = imageSources[key];
}

// ==============================
// 音声
// ==============================

const sounds = {
  title: createAudio("assets/audio/title.mp3", true),
  field: createAudio("assets/audio/field.mp3", true),
  heartbeat: createAudio("assets/audio/heartbeat.mp3", false),
  scream: createAudio("assets/audio/scream.mp3", false),
  break: createAudio("assets/audio/break.mp3", false),
  enemyVoice: createAudio("assets/audio/enemy.mp3", false),
  trackerCapture: createAudio("assets/audio/tracker_capture.mp3", false),
  armedMove: createAudio("assets/audio/armed_move.mp3", true),
  armedThrow: createAudio("assets/audio/armed_throw.mp3", false),
  armedKnifeHit: createAudio("assets/audio/armed_knife_hit.mp3", false),
  armedCapture: createAudio("assets/audio/armed_capture.mp3", false),
  beastDetect: createAudio("assets/audio/beast_detect.mp3", false),
  beastSniff: createAudio("assets/audio/beast_sniff.mp3", true),
  beastCapture: createAudio("assets/audio/beast_capture.mp3", false),
  bugmasterDetect: createAudio("assets/audio/bugmaster_detect.mp3", true),
  bugmasterSwarm: createAudio("assets/audio/bugmaster_swarm.mp3", true),
  bugmasterCapture: createAudio("assets/audio/bugmaster_capture.mp3", false),
  bugmasterArmor: createAudio("assets/audio/bugmaster_capture.mp3", true),
  nightShadowCry: createAudio("assets/audio/night_shadow_cry.mp3", false),
  nightShadowFlap: createAudio("assets/audio/night_shadow_flap.mp3", true),
  kaishutsubotsu: createAudio("assets/audio/kaishutsubotsu.mp3", false),
  miezaru: createAudio("assets/audio/miezaru.mp3", false),
  watcher: createAudio("assets/audio/watcher.mp3", false),
  ugomekimonoMove: createAudio("assets/audio/ugomekimono.mp3", true),
  ugomekimonoTentacleA: createAudio("assets/audio/ugomekimono_tentacle.mp3", true),
  ugomekimonoTentacleB: createAudio("assets/audio/ugomekimono_tentacle.mp3", true),
  ugomekimonoTentacleC: createAudio("assets/audio/ugomekimono_tentacle.mp3", true),
  ugomekimonoTentacleD: createAudio("assets/audio/ugomekimono_tentacle.mp3", true),
  ugomekimonoTentacleE: createAudio("assets/audio/ugomekimono_tentacle.mp3", true),
  ugomekimonoTentacleF: createAudio("assets/audio/ugomekimono_tentacle.mp3", true),
  ugomekimonoTentacleG: createAudio("assets/audio/ugomekimono_tentacle.mp3", true),
  ugomekimonoTentacleH: createAudio("assets/audio/ugomekimono_tentacle.mp3", true),
  ugomekimonoTentacleI: createAudio("assets/audio/ugomekimono_tentacle.mp3", true),
  ugomekimonoTentacleJ: createAudio("assets/audio/ugomekimono_tentacle.mp3", true),
  ugomekimonoCapture: createAudio("assets/audio/ugomekimono_capture.mp3", false),
  snatch: createAudio("assets/audio/snatch.mp3", false),
  hit: createAudio("assets/audio/hit.wav", false),
  matsuriBell: createAudio("assets/audio/matsuri_bell.mp3", false)
};

function createAudio(src, loop) {
  const audio = new Audio(src);
  audio.loop = loop;
  audio.preload = "auto";
  audio.setAttribute("playsinline", "");
  audio.setAttribute("webkit-playsinline", "");
  return audio;
}

function clamp01(value) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(1, value));
}

function setAudioVolume(audio, value) {
  if (!audio) return;
  audio.volume = clamp01(value);
}

const BUG_SWARM_COUNT = 5;
const BUG_SWARM_AUDIO_COUNT = 4;
const BUG_SWARM_MIN_SEPARATION = 230;
const BUG_SWARM_PATROL_ROUTES = [
  [
    { x: 560, y: 760 }, { x: 1860, y: 850 }, { x: 2940, y: 760 },
    { x: 2760, y: 1840 }, { x: 1480, y: 2060 }, { x: 520, y: 1560 }
  ],
  [
    { x: 5080, y: 760 }, { x: 7240, y: 840 }, { x: 7640, y: 1940 },
    { x: 6520, y: 2160 }, { x: 5040, y: 1660 }
  ],
  [
    { x: 560, y: 2920 }, { x: 1780, y: 2880 }, { x: 3040, y: 3680 },
    { x: 2680, y: 4620 }, { x: 820, y: 4560 }
  ],
  [
    { x: 5000, y: 3040 }, { x: 7200, y: 3020 }, { x: 7640, y: 4140 },
    { x: 6120, y: 4620 }, { x: 4740, y: 4000 }
  ],
  [
    { x: 3860, y: 560 }, { x: 4560, y: 1520 }, { x: 3860, y: 2240 },
    { x: 3260, y: 1520 }, { x: 3860, y: 560 }
  ]
];
const BUG_SWARM_ATTACK_OFFSETS = [
  { x: -62, y: -42 },
  { x: 62, y: -42 },
  { x: -62, y: 42 },
  { x: 62, y: 42 },
  { x: 0, y: 76 }
];
const bugSwarmLoopAudios = Array.from(
  { length: BUG_SWARM_AUDIO_COUNT },
  () => createAudio("assets/audio/bugmaster_swarm.mp3", true)
);


const ALL_ENEMY_TYPES = ["tracker", "armed", "beast", "bugmaster", "nightShadow", "kaishutsubotsu", "miezaru", "watcher", "ugomekimono"];

const STORAGE_KEYS = {
  master: "shrine_master",
  bgm: "shrine_bgm",
  se: "shrine_se",
  progress: "shrine_progress_v2",
  forceNextEnemy: "shrine_force_next_enemy_v1"
};

const DEFAULT_PROGRESS = {
  unlockedArmed: false,
  unlockedBeast: false,
  unlockedBugmaster: false,
  unlockedNightShadow: false,
  unlockedKaishutsubotsu: false,
  unlockedMiezaru: false,
  unlockedWatcher: false,
  unlockedUgomekimono: false,
  clearedEnemies: { tracker: false, armed: false, beast: false, bugmaster: false, nightShadow: false, kaishutsubotsu: false, miezaru: false, watcher: false, ugomekimono: false },
  records: []
};

let progressData = normalizeProgressData(null);
let currentEnemyType = "tracker";
let enemyKnifeCooldown = 0;
let beastSniffTimer = 0;
let beastRushTimer = 0;
let beastTargetPoint = null;
let beastSniffAudioActive = false;
let beastHasScent = false;
let beastScentLostTimer = 0;
let magicMirrorTimer = 0;
let bugRevealTimer = 0;
let nightShadowState = "air";
let nightShadowTimer = 0;
let nightShadowTargetPoint = null;
let nightShadowDiveOrigin = null;
let nightShadowGroundTimer = 0;
let nightShadowLastKnownPoint = null;
let bugSwarmAgents = [];
let bugSwarmFrame = 0;
let bugAttachStacks = 0;
let bugEscapeProgress = 0;
let bugSwarmSeparationAccumulator = 0;
let bugSwarmAudioAccumulator = 0;
let bugAttachVisualLastUpdate = 0;
let enemyProjectiles = [];
let playerKnifeSlowTimers = [];
let clearResultProcessed = false;
let selectedRecordId = null;
let staminaDrinkTimer = 0;
let omamoriCharges = 0;
let playerInvincible = false;
let ultimateCheatActive = false;
let infiniteOmamoriActive = false;
let maxStaminaDrinkActive = false;
let eternalMagicMirrorActive = false;
let sacredBellRevealActive = false;
let nightShadowClearDiveTarget = null;
let kaishutsubotsuNearWarpTimer = 0;
let kaishutsubotsuRushCooldown = 0;
let kaishutsubotsuInitialRushLockTimer = 0;
let kaishutsubotsuRushTimer = 0;
let kaishutsubotsuRushTarget = null;
let kaishutsubotsuForcedEnemyForThisRun = null;
let nightShadowAscendTarget = null;
let miezaruWarpTimer = 0;
let watcherWarpTimer = 0;
let watcherPhantomTimer = 0;
let watcherFakeBoxTimer = 0;
let watcherFakeKeyBoxes = [];
let watcherPhantoms = [];
let watcherObjectPhantoms = [];
let watcherObjectPhantomTimer = 0;
let ugomeTentacles = [];
let ugomeGrab = null;
let ugomeEscapeProgress = 0;

let trackerFrenzyTimer = 0;
let trackerLineAccel = 0;
let armedNoKnifeHitTimer = 0;
let armedAxeCooldown = 0;
let armedAxeSlamTimer = 0;
let armedAxeLungeTimer = 0;
let armedAxeLungeDirX = 0;
let armedAxeLungeDirY = 0;
let armedChainCooldown = 0;
let playerStunTimer = 0;
let bugmasterSwarmMode = "normal";
let bugmasterSwarmModeTimer = 0;
let bugmasterChargeCooldown = 0;
let bugmasterChargeTimer = 0;
let bugmasterChargeTarget = null;
let nightShadowDiveComboRemaining = 0;
let nightShadowComboActive = false;
let nightShadowComboPassPoint = null;
let nightShadowPassedStrikePoint = false;
let watcherGiantEye = null;
let ugomeCapturePulseTimer = 0;
let ugomeGroundTentacles = [];
let ugomeGroundTentacleTimer = 0;
let ugomeGroundBind = null;
let ugomeTentacleGroups = [];
let ugomeTentacleGroupTimer = 0;
let trackerLeapTimer = 0;
let trackerLeapCooldown = 0;
let trackerLeapStart = null;
let trackerLeapTarget = null;
let armedGrappleCooldown = 0;
let armedGrapple = null;
let beastSpiralMode = false;
let beastSpiralTimer = 0;
let beastSpiralIndex = 0;
let beastSpiralStartCorner = 0;
let beastSpiralEntry = null;
let nightShadowLineDiveCooldown = 0;
let nightShadowLinePass = false;
let kaishutsubotsuWarpFlurryTimer = 0;
let kaishutsubotsuWarpFlurryCooldown = 0;
let kaishutsubotsuWarpFlurryStep = 0;
let miezaruClones = [];
let miezaruCloneTimer = 0;



const ENEMY_TYPES = {
  tracker: {
    id: "tracker",
    name: "追跡者",
    sheetKey: "enemySheet",
    galleryKey: "jumpscareEnemy",
    jumpscareKey: "jumpscareEnemy",
    spriteFrameWidth: 180,
    spriteFrameHeight: 180,
    frameCount: 6,
    cols: 3,
    rows: 2,
    renderWidth: 180,
    renderHeight: 180,
    entityWidth: 180,
    entityHeight: 210,
    collisionWidth: 86,
    collisionHeight: 84,
    wanderSpeed: 2.9,
    chaseSpeed: 8.8,
    frenzyChaseSpeed: 12.4,
    viewDistance: 1750,
    endgameViewDistance: 2450,
    viewAngle: Math.PI * 1.05,
    detectionSfx: "enemyVoice",
    captureSfx: "trackerCapture",
    description: "現実離れした速さで迫る、飢えたような怪異。視界に入ったあなたを執拗に追い続ける。",
    movieWidth: 640,
    movieHeight: 800
  },
  armed: {
    id: "armed",
    name: "武装者",
    sheetKey: "armedEnemySheet",
    galleryKey: "armedEnemyCapture",
    jumpscareKey: "armedEnemyCapture",
    knifeKey: "armedEnemyKnife",
    spriteFrameWidth: 760,
    spriteFrameHeight: 980,
    frameCount: 4,
    cols: 4,
    rows: 1,
    renderWidth: 260,
    renderHeight: 335,
    entityWidth: 170,
    entityHeight: 220,
    collisionWidth: 88,
    collisionHeight: 128,
    wanderSpeed: 1.55,
    chaseSpeed: 4.35,
    viewDistance: 2550,
    viewAngle: Math.PI * 1.12,
    knifeRange: 2550,
    knifeInterval: 1.9,
    knifeSpeed: 27.5,
    detectionSfx: null,
    moveLoop: "armedMove",
    throwSfx: "armedThrow",
    captureSfx: "armedCapture",
    axeSlamCooldown: 9.0,
    description: "血塗れの大斧を引きずり、あなたを見つけると投げナイフで足を削いでくる武装した怪異。",
    movieWidth: 760,
    movieHeight: 1080
  },
  beast: {
    id: "beast",
    name: "飢えし獣",
    sheetKey: "beastEnemySheet",
    galleryKey: "beastEnemyCapture",
    jumpscareKey: "beastEnemyCapture",
    spriteFrameWidth: 760,
    spriteFrameHeight: 420,
    frameCount: 4,
    cols: 4,
    rows: 1,
    renderWidth: 300,
    renderHeight: 166,
    entityWidth: 260,
    entityHeight: 145,
    collisionWidth: 150,
    collisionHeight: 84,
    wanderSpeed: 1.7,
    chaseSpeed: 10.9,
    endgameChaseSpeed: 13.6,
    viewDistance: 0,
    viewAngle: 0,
    sniffIntervalMin: 2.6,
    sniffIntervalMax: 4.3,
    sniffDuration: 5.0,
    scentError: 390,
    exactScentRange: 680,
    loseScentRange: 2850,
    loseScentTime: 4.5,
    scentSfx: "beastSniff",
    detectionSfx: "beastDetect",
    captureSfx: "beastCapture",
    description: "目を持たず、匂いであなたの大まかな位置を嗅ぎ当てる四足歩行の怪異。嗅ぎ終えると凄まじい速さで推定地点へ走る。",
    movieWidth: 760,
    movieHeight: 760
  },
  bugmaster: {
    id: "bugmaster",
    name: "蟲使い",
    sheetKey: "bugmasterEnemySheet",
    galleryKey: "bugmasterEnemyCapture",
    jumpscareKey: "bugmasterEnemyCapture",
    spriteFrameWidth: 760,
    spriteFrameHeight: 560,
    frameCount: 4,
    cols: 4,
    rows: 1,
    renderWidth: 280,
    renderHeight: 206,
    entityWidth: 200,
    entityHeight: 170,
    collisionWidth: 112,
    collisionHeight: 120,
    wanderSpeed: 1.15,
    chaseSpeed: 2.6,
    swarmArmorSpeed: 8.8,
    swarmArmorRushSpeed: 13.2,
    swarmSpeed: 4.35,
    viewDistance: 2400,
    viewAngle: Math.PI * 0.85,
    moveLoop: "bugmasterDetect",
    swarmLoop: "bugmasterSwarm",
    captureSfx: "bugmasterCapture",
    description: "無数の黒羽虫を従える不気味な怪異。本体は鈍重だが、羽虫群があなたを見つけて纏わりつき、居場所を暴く。",
    movieWidth: 1180,
    movieHeight: 1180
  },
  nightShadow: {
    id: "nightShadow",
    name: "夜の影",
    sheetKey: "nightShadowSheet",
    galleryKey: "nightShadowCapture",
    jumpscareKey: "nightShadowCapture",
    spriteFrameWidth: 667,
    spriteFrameHeight: 564,
    frameCount: 4,
    cols: 4,
    rows: 1,
    renderWidth: 360,
    renderHeight: 300,
    entityWidth: 240,
    entityHeight: 210,
    collisionWidth: 120,
    collisionHeight: 110,
    wanderSpeed: 0,
    chaseSpeed: 8.8,
    diveSpeed: 58.0,
    skyIntervalMin: 22.0,
    skyIntervalMax: 34.0,
    groundLostTime: 3.2,
    viewDistance: 1750,
    viewAngle: Math.PI * 1.05,
    detectionSfx: null,
    captureSfx: "nightShadowCry",
    crySfx: "nightShadowCry",
    flapSfx: "nightShadowFlap",
    description: "空に潜み、一定時間ごと、または居場所が暴かれた瞬間に急降下してくる巨大な黒い怪鳥。地上に降りた後は追跡者と同じ速さで走って追う。",
    movieWidth: 920,
    movieHeight: 720
  },
  kaishutsubotsu: {
    id: "kaishutsubotsu",
    name: "怪出異没",
    sheetKey: "kaishutsubotsuSheet",
    galleryKey: "kaishutsubotsuCapture",
    jumpscareKey: "kaishutsubotsuCapture",
    spriteFrameWidth: 627,
    spriteFrameHeight: 627,
    frameCount: 4,
    cols: 4,
    rows: 1,
    renderWidth: 220,
    renderHeight: 220,
    entityWidth: 170,
    entityHeight: 200,
    collisionWidth: 82,
    collisionHeight: 110,
    wanderSpeed: 1.55,
    chaseSpeed: 4.35,
    rushSpeed: 60.0,
    viewDistance: 1720,
    viewAngle: Math.PI * 1.15,
    nearWarpMin: 5.0,
    nearWarpMax: 9.0,
    initialRushDelayMin: 18.0,
    initialRushDelayMax: 28.0,
    rushCooldownMin: 12.0,
    rushCooldownMax: 20.0,
    warpNearRadiusMin: 360,
    warpNearRadiusMax: 540,
    captureSfx: "kaishutsubotsu",
    rushSfx: "kaishutsubotsu",
    description: "全身が黒く細長い、人ならざる怪異。一定時間ごとにあなたの傍へ現れ、さらに長い間隔で遠方から一気に突っ込んでくる。",
    movieWidth: 980,
    movieHeight: 980
  },

  miezaru: {
    id: "miezaru",
    name: "見えざる者",
    sheetKey: "miezaruSheet",
    galleryKey: "miezaruCapture",
    jumpscareKey: "miezaruCapture",
    spriteFrameWidth: 590,
    spriteFrameHeight: 590,
    frameCount: 4,
    cols: 4,
    rows: 1,
    renderWidth: 210,
    renderHeight: 210,
    entityWidth: 155,
    entityHeight: 185,
    collisionWidth: 72,
    collisionHeight: 92,
    wanderSpeed: 1.15,
    chaseSpeed: 2.6,
    endgameChaseSpeed: 7.6,
    viewDistance: 1850,
    viewAngle: Math.PI * 1.05,
    revealDistance: 180,
    nearWarpMin: 8.0,
    nearWarpMax: 14.0,
    captureSfx: "miezaru",
    description: "蒼黒く半透明の浮遊霊。近づいた時と魔鏡の力の中でのみ姿が見え、ときおり近くへ音もなく現れる。",
    movieWidth: 980,
    movieHeight: 980
  },
  watcher: {
    id: "watcher",
    name: "監視者",
    sheetKey: "watcherSheet",
    galleryKey: "watcherCapture",
    jumpscareKey: "watcherCapture",
    spriteFrameWidth: 627,
    spriteFrameHeight: 627,
    frameCount: 4,
    cols: 4,
    rows: 1,
    renderWidth: 250,
    renderHeight: 250,
    entityWidth: 210,
    entityHeight: 130,
    collisionWidth: 140,
    collisionHeight: 72,
    wanderSpeed: 0,
    chaseSpeed: 0,
    viewDistance: 0,
    viewAngle: 0,
    nearWarpMin: 4.5,
    nearWarpMax: 7.5,
    phantomMin: 9.0,
    phantomMax: 16.0,
    fakeBoxMin: 10.0,
    fakeBoxMax: 17.0,
    captureSfx: "watcher",
    description: "地面に張り付く巨大な目玉。基本は動かず、数歩先へ突然現れ、幻影と偽の神具箱であなたを誘う。",
    movieWidth: 980,
    movieHeight: 980
  },

  ugomekimono: {
    id: "ugomekimono",
    name: "蠢く者",
    sheetKey: "ugomekimonoSheet",
    galleryKey: "ugomekimonoCapture",
    jumpscareKey: "ugomekimonoCapture",
    spriteFrameWidth: 627,
    spriteFrameHeight: 627,
    frameCount: 4,
    cols: 4,
    rows: 1,
    renderWidth: 900,
    renderHeight: 900,
    entityWidth: 860,
    entityHeight: 720,
    collisionWidth: 470,
    collisionHeight: 350,
    wanderSpeed: 0.75,
    chaseSpeed: 0.95,
    endgameChaseSpeed: 2.6,
    viewDistance: 0,
    viewAngle: 0,
    tentacleSpeed: 720,
    tentacleCooldownMin: 4.6,
    tentacleCooldownMax: 7.2,
    tentacleReachTime: 30.0,
    captureSfx: "ugomekimonoCapture",
    description: "とてつもなく巨大な黒い肉の塊。無数の触手、目、口を持ち、ゆっくり迫りながら触手であなたを引き寄せる。",
    movieWidth: 1180,
    movieHeight: 1180
  },

};

function normalizeProgressData(raw) {
  let data = raw;
  if (!data) data = {};
  return {
    unlockedArmed: !!data.unlockedArmed,
    unlockedBeast: !!data.unlockedBeast,
    unlockedBugmaster: !!data.unlockedBugmaster,
    unlockedNightShadow: !!data.unlockedNightShadow,
    unlockedKaishutsubotsu: !!data.unlockedKaishutsubotsu,
    unlockedMiezaru: !!data.unlockedMiezaru,
    unlockedWatcher: !!data.unlockedWatcher,
    unlockedUgomekimono: !!data.unlockedUgomekimono,
    clearedEnemies: {
      tracker: !!(data.clearedEnemies && data.clearedEnemies.tracker),
      armed: !!(data.clearedEnemies && data.clearedEnemies.armed),
      beast: !!(data.clearedEnemies && data.clearedEnemies.beast),
      bugmaster: !!(data.clearedEnemies && data.clearedEnemies.bugmaster),
      nightShadow: !!(data.clearedEnemies && data.clearedEnemies.nightShadow),
      kaishutsubotsu: !!(data.clearedEnemies && data.clearedEnemies.kaishutsubotsu),
      miezaru: !!(data.clearedEnemies && data.clearedEnemies.miezaru),
      watcher: !!(data.clearedEnemies && data.clearedEnemies.watcher),
      ugomekimono: !!(data.clearedEnemies && data.clearedEnemies.ugomekimono)
    },
    disabledEnemySpawns: {
      tracker: !!(data.disabledEnemySpawns && data.disabledEnemySpawns.tracker),
      armed: !!(data.disabledEnemySpawns && data.disabledEnemySpawns.armed),
      beast: !!(data.disabledEnemySpawns && data.disabledEnemySpawns.beast),
      bugmaster: !!(data.disabledEnemySpawns && data.disabledEnemySpawns.bugmaster),
      nightShadow: !!(data.disabledEnemySpawns && data.disabledEnemySpawns.nightShadow),
      kaishutsubotsu: !!(data.disabledEnemySpawns && data.disabledEnemySpawns.kaishutsubotsu),
      miezaru: !!(data.disabledEnemySpawns && data.disabledEnemySpawns.miezaru),
      watcher: !!(data.disabledEnemySpawns && data.disabledEnemySpawns.watcher),
      ugomekimono: !!(data.disabledEnemySpawns && data.disabledEnemySpawns.ugomekimono)
    },
    records: Array.isArray(data.records) ? data.records.map((r, idx) => ({
      id: r.id ?? `${Date.now()}_${idx}`,
      enemyType: ["tracker", "armed", "beast", "bugmaster", "nightShadow", "kaishutsubotsu", "miezaru", "watcher", "ugomekimono"].includes(r.enemyType) ? r.enemyType : "tracker",
      enemyName: r.enemyName || (r.enemyType === "watcher" ? "監視者" : r.enemyType === "ugomekimono" ? "蠢く者" : r.enemyType === "watcher" ? "監視者" : r.enemyType === "miezaru" ? "見えざる者" : r.enemyType === "kaishutsubotsu" ? "怪出異没" : r.enemyType === "nightShadow" ? "夜の影" : r.enemyType === "bugmaster" ? "蟲使い" : r.enemyType === "beast" ? "飢えし獣" : r.enemyType === "armed" ? "武装者" : "追跡者"),
      time: Number(r.time || 0),
      deposited: Number(r.deposited ?? 5),
      mode: r.mode === "counterattack" ? "counterattack" : "normal",
      clearMethod: r.clearMethod === "defeat" ? "defeat" : "offering",
      createdAt: r.createdAt || new Date().toISOString()
    })).sort((a,b)=>a.time-b.time) : []
  };
}

function loadProgressData() {
  try {
    progressData = normalizeProgressData(JSON.parse(localStorage.getItem(STORAGE_KEYS.progress) || "null"));
  } catch (e) {
    progressData = normalizeProgressData(null);
  }
  renderKaiiGallery();
  renderRecords();
}

function saveProgressData() {
  progressData = normalizeProgressData(progressData);
  localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(progressData));
}

function resetGameData() {
  localStorage.removeItem(STORAGE_KEYS.progress);
  localStorage.removeItem(STORAGE_KEYS.master);
  localStorage.removeItem(STORAGE_KEYS.bgm);
  localStorage.removeItem(STORAGE_KEYS.se);
  localStorage.removeItem(STORAGE_KEYS.forceNextEnemy);
  progressData = normalizeProgressData(null);
  loadSettings();
  saveProgressData();
  renderKaiiGallery();
  renderRecords();
}


function hasAnyClearData() {
  if (!progressData) return false;
  if (Array.isArray(progressData.records) && progressData.records.length > 0) return true;
  return Object.values(progressData.clearedEnemies || {}).some(Boolean);
}

function updateTitleUnlockButtons() {
  const unlocked = hasAnyClearData();
  if (kaiiButton) kaiiButton.hidden = !unlocked;
  if (titleRecordButton) titleRecordButton.hidden = !unlocked;
}


function toggleEnemySpawnSwitch(enemyType) {
  if (!progressData.clearedEnemies[enemyType]) return;
  progressData.disabledEnemySpawns[enemyType] = !progressData.disabledEnemySpawns[enemyType];
  saveProgressData();
  renderKaiiGallery();
}

function toggleAllEnemySpawnSwitches() {
  const cleared = ALL_ENEMY_TYPES.filter(enemyType => progressData.clearedEnemies[enemyType]);
  if (!cleared.length) return;
  const allEnabled = cleared.every(enemyType => !progressData.disabledEnemySpawns[enemyType]);
  for (const enemyType of cleared) {
    progressData.disabledEnemySpawns[enemyType] = allEnabled;
  }
  saveProgressData();
  renderKaiiGallery();
}

function isEnemySpawnEnabledBySwitch(enemyType) {
  return !(progressData.clearedEnemies[enemyType] && progressData.disabledEnemySpawns[enemyType]);
}

function renderKaiiGallery() {
  if (!galleryList) return;
  galleryList.innerHTML = "";

  const cleared = Object.entries(progressData.clearedEnemies).filter(([,v]) => v).map(([k]) => k);
  if (!cleared.length) {
    galleryList.innerHTML = '<div class="galleryEmpty">まだクリアした怪異はいない。</div>';
    return;
  }

  if (hasAllEnemiesCleared()) {
    const complete = document.createElement("div");
    complete.className = "completeGalleryBanner";
    complete.innerHTML = "<strong>COMPLETE</strong><span>全怪異の記録が揃った。夜道の神域を制した。</span>";
    galleryList.appendChild(complete);
  }

  const note = document.createElement("div");
  note.className = "spawnSwitchNote";
  note.textContent = "出現スイッチ：クリックでON/OFFを切り替え。OFFの怪異は通常抽選で出現しない。";
  galleryList.appendChild(note);

  const allEnabled = cleared.every(enemyType => !progressData.disabledEnemySpawns[enemyType]);
  const allDisabled = cleared.every(enemyType => !!progressData.disabledEnemySpawns[enemyType]);
  const allSwitch = document.createElement("button");
  allSwitch.type = "button";
  allSwitch.className = `spawnSwitchAllButton ${allEnabled ? "on" : allDisabled ? "off" : "mixed"}`;
  allSwitch.setAttribute("aria-pressed", allEnabled ? "true" : "false");
  allSwitch.innerHTML = `<span>All ON/OFF</span><strong>${allEnabled ? "ALL ON" : allDisabled ? "ALL OFF" : "MIXED"}</strong>`;
  allSwitch.addEventListener("click", toggleAllEnemySpawnSwitches);
  galleryList.appendChild(allSwitch);

  for (const enemyType of ["tracker", "armed", "beast", "bugmaster", "nightShadow", "kaishutsubotsu", "miezaru", "watcher", "ugomekimono"]) {
    if (!progressData.clearedEnemies[enemyType]) continue;
    const def = ENEMY_TYPES[enemyType];
    const disabled = !!progressData.disabledEnemySpawns[enemyType];
    const card = document.createElement("button");
    card.type = "button";
    card.className = "galleryCard spawnSwitchCard" + (disabled ? " off" : " on");
    card.setAttribute("aria-pressed", disabled ? "false" : "true");
    card.addEventListener("click", () => toggleEnemySpawnSwitch(enemyType));
    card.innerHTML = `
      <span class="spawnSwitchBadge">${disabled ? "出現 OFF" : "出現 ON"}</span>
      <img src="${imageSources[def.galleryKey]}" alt="${def.name}">
      <h3>${def.name}</h3>
      <p>${def.description}</p>
    `;
    galleryList.appendChild(card);
  }
}

function renderRecords() {
  if (!recordsList || !recordDetail) return;
  recordsList.innerHTML = "";

  const sortMode = recordSortSelect ? recordSortSelect.value : "time";
  const records = [...progressData.records].sort((a, b) => {
    if (sortMode === "date") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return a.time - b.time;
  });

  if (!records.length) {
    recordsList.innerHTML = '<p class="recordPlaceholder">まだクリア記録はありません。</p>';
    recordDetail.innerHTML = '<p class="recordPlaceholder">記録を選択してください。</p>';
    selectedRecordId = null;
    return;
  }

  if (!selectedRecordId || !records.some(r => r.id === selectedRecordId)) {
    selectedRecordId = records[0].id;
  }

  for (const rec of records) {
    const row = document.createElement("button");
    row.type = "button";
    row.className = "recordRow" + (rec.id === selectedRecordId ? " active" : "");
    row.innerHTML = `
      <span class="recordMeta"><strong>${rec.enemyName}</strong><span>${new Date(rec.createdAt).toLocaleString("ja-JP")}</span></span>
      <span class="recordTimeBadge">${rec.time.toFixed(1)}秒</span>
    `;
    row.addEventListener("click", () => {
      selectedRecordId = rec.id;
      renderRecords();
    });
    recordsList.appendChild(row);
  }

  const selected = records.find(r => r.id === selectedRecordId) || records[0];
  const def = ENEMY_TYPES[selected.enemyType] || ENEMY_TYPES.tracker;
  recordDetail.innerHTML = `
    <div class="recordDetailCard">
      <img src="${imageSources[def.galleryKey]}" alt="${selected.enemyName}">
      <h3>${selected.enemyName}</h3>
      <p>クリア時間：${selected.time.toFixed(1)}秒</p>
      <p>奉納数：${selected.deposited}/5</p>
      <p>モード：${selected.mode === "counterattack" ? "反撃者" : "通常"}　/　クリア方法：${selected.clearMethod === "defeat" ? "怪異本体の撃破" : "奉納"}</p>
      <p>達成日時：${new Date(selected.createdAt).toLocaleString("ja-JP")}</p>
      <p>${getClearRankByTime(selected.time)}</p>
    </div>
  `;
}

function chooseEnemyTypeForRun() {
  const forced = kaishutsubotsuForcedEnemyForThisRun || localStorage.getItem(STORAGE_KEYS.forceNextEnemy);
  if (forced && ENEMY_TYPES[forced]) {
    kaishutsubotsuForcedEnemyForThisRun = null;
    localStorage.removeItem(STORAGE_KEYS.forceNextEnemy);
    return forced;
  }

  if (!progressData.unlockedArmed) return "tracker";

  const pool = ["tracker", "armed"];
  if (progressData.unlockedBeast) pool.push("beast");
  if (progressData.unlockedBugmaster) pool.push("bugmaster");
  if (progressData.unlockedNightShadow) pool.push("nightShadow");
  if (progressData.unlockedKaishutsubotsu) pool.push("kaishutsubotsu");
  if (progressData.unlockedMiezaru) pool.push("miezaru");
  if (progressData.unlockedWatcher) pool.push("watcher");
  if (progressData.unlockedUgomekimono) pool.push("ugomekimono");

  let filtered = pool.filter(enemyType => isEnemySpawnEnabledBySwitch(enemyType));

  if (!filtered.length) {
    const fallback = pool[pool.length - 1] || "tracker";
    if (progressData.disabledEnemySpawns) {
      delete progressData.disabledEnemySpawns[fallback];
      saveProgressData();
    }
    filtered = [fallback];
  }

  return filtered[Math.floor(Math.random() * filtered.length)];
}

function getEnemyDef() {
  return ENEMY_TYPES[currentEnemyType] || ENEMY_TYPES.tracker;
}

function applyEnemyTypeConfig() {
  const def = getEnemyDef();
  enemy.width = def.entityWidth;
  enemy.height = def.entityHeight;
  enemy.collisionWidth = def.collisionWidth;
  enemy.collisionHeight = def.collisionHeight;

  enemySprite.style.width = def.renderWidth + "px";
  enemySprite.style.height = def.renderHeight + "px";
  enemySprite.style.backgroundImage = `url(${imageSources[def.sheetKey]})`;
  // 表示フレーム基準でシートを縮小する。元画像サイズ基準にすると透明部分だけが表示される。
  enemySprite.style.backgroundSize = `${def.renderWidth * def.cols}px ${def.renderHeight * def.rows}px`;
  enemySprite.style.backgroundPosition = `0px 0px`;

  if (movieEnemyEl) {
    movieEnemyEl.style.backgroundImage = `url(${imageSources[def.jumpscareKey]})`;
    movieEnemyEl.style.width = (def.movieWidth || 640) + "px";
    movieEnemyEl.style.height = (def.movieHeight || 800) + "px";
  }
}

function saveClearRecord() {
  if (clearResultProcessed || resultType !== "clear") return;
  clearResultProcessed = true;

  progressData.clearedEnemies[currentEnemyType] = true;
  if (currentEnemyType === "tracker") {
    progressData.unlockedArmed = true;
  }
  if (currentEnemyType === "armed") {
    progressData.unlockedBeast = true;
  }
  // 蟲使いは、飢えし獣でクリアした後にだけ解放。
  if (currentEnemyType === "beast") {
    progressData.unlockedBugmaster = true;
  }
  // 夜の影は、蟲使いでクリアした後にだけ解放。
  if (currentEnemyType === "bugmaster") {
    progressData.unlockedNightShadow = true;
  }
  // 怪出異没は、夜の影でクリアした後にだけ解放。
  if (currentEnemyType === "nightShadow") {
    progressData.unlockedKaishutsubotsu = true;
  }
  // 見えざる者は、怪出異没でクリアした後にだけ解放。
  if (currentEnemyType === "kaishutsubotsu") {
    progressData.unlockedMiezaru = true;
  }
  // 監視者は、見えざる者でクリアした後にだけ解放。
  if (currentEnemyType === "miezaru") {
    progressData.unlockedWatcher = true;
  }
  // 蠢く者は、監視者でクリアした後にだけ解放。
  if (currentEnemyType === "watcher") {
    progressData.unlockedUgomekimono = true;
  }

  progressData.records.push({
    id: `${Date.now()}_${Math.random().toString(36).slice(2,8)}`,
    enemyType: currentEnemyType,
    enemyName: getEnemyDef().name,
    time: Number(survivalTime.toFixed(1)),
    deposited: getDepositedCount(),
    mode: window.counterattack?.enabled ? "counterattack" : "normal",
    clearMethod: window.counterattack?.defeatedBody ? "defeat" : "offering",
    createdAt: new Date().toISOString()
  });
  progressData.records.sort((a,b)=>a.time-b.time);
  saveProgressData();
  renderKaiiGallery();
  renderRecords();
}

// ==============================
// どうぐ
// ==============================

const KEY_ITEM_IDS = ["old_talisman", "damaged_beads", "frayed_bell_rope", "worn_kokeshi", "cracked_mirror"];
const NORMAL_ITEM_IDS = ["tattered_talisman", "small_stone", "firecrackers", "saisen_coin", "small_buddha", "matsuri_bell", "magic_mirror", "stamina_drink", "omamori"];
const PHANTOM_ITEM_IDS = ["infinite_omamori", "max_stamina_drink", "eternal_magic_mirror", "sacred_matsuri_bell"];
const CHEAT_ITEM_IDS = [...NORMAL_ITEM_IDS, ...PHANTOM_ITEM_IDS];

const ITEM_NAMES = {
  old_talisman: "古い札",
  damaged_beads: "傷ついた数珠",
  frayed_bell_rope: "解れた鈴緒",
  worn_kokeshi: "禿げたこけし",
  cracked_mirror: "ひび割れた神鏡",
  tattered_talisman: "ボロボロの札",
  small_stone: "小石",
  firecrackers: "爆竹",
  saisen_coin: "賽銭",
  small_buddha: "小さな仏像",
  matsuri_bell: "祭鈴",
  magic_mirror: "魔鏡",
  stamina_drink: "スタミナドリンク",
  omamori: "お守り",
  infinite_omamori: "無限のお守り",
  max_stamina_drink: "マックススタミナドリンク",
  eternal_magic_mirror: "永続の魔鏡",
  sacred_matsuri_bell: "神聖な祭鈴"
};

const itemInventory = [null, null, null];
const keyInventory = {};
const depositedKeys = {};

for (const keyId of KEY_ITEM_IDS) {
  keyInventory[keyId] = false;
  depositedKeys[keyId] = false;
}

let selectedItemIndex = 0;
let selectedItemUseHold = 0;

// ==============================
// ゲーム状態
// ==============================

let gameState = "title";
let pausedFromState = "playing";
let settingsReturnTarget = "title";
let lastTime = performance.now();
let startTime = 0;
let survivalTime = 0;

let cameraX = 0;
let cameraY = 0;
let minimumDistance = Infinity;

let movementSlowTimer = 0;
let stamina = STAMINA_MAX;
let isRunning = false;
let isTired = false;
let runInputBuffer = 0;
let runAssistTimer = 0;
let staminaVisibleTimer = 0;
let collisionSoundCooldown = 0;
let heartbeatTimer = 0;

let enemyMode = "wander";
let enemyFacingX = -1;
let enemyFacingY = 0;
let enemyPath = [];
let enemyPathTimer = 0;
let enemyWanderTarget = null;
let enemyLostSightTimer = 0;
let enemyStunTimer = 0;
let enemyLurePoint = null;
let enemyLastX = 0;
let enemyLastY = 0;
let enemyStuckTimer = 0;
let enemyWarpCooldown = 0;
let enemyCanEnterSanctuary = false;
let enemyWasSeeingPlayer = false;
let enemyVoiceCooldown = 0;

let promptText = "";
let messageText = "";
let messageTimer = 0;

let resultType = "gameover";
let clearEventPhase = 0;
let clearEventTimer = 0;
let shrineFlashTimer = 0;
let trapVfxTimer = 0;

let playerAnimClock = 0;
let enemyAnimClock = 0;
let enemyFrameIndex = 0;

let worldZones = [];
let obstacles = [];
let decorativeObjects = [];
let walkGrid = [];
let boxes = [];
let keyItemBoxes = [];
let revealedKeyBoxId = null;
let revealAllKeyBoxesOnMinimap = false;
let looseItems = [];
let interactables = [];
let shrines = [];
let mainShrine = null;
let projectiles = [];
let firecrackerLures = [];
let enemyVisualMoveAudioActive = false;
let armedMoveTargetVolume = 0;
let armedMoveCurrentVolume = 0;
let bugmasterDetectPulseDelay = 0.8;
let bugmasterDetectPulseTimer = 0;
let bugmasterDetectCurrentVolume = 0;

const aimState = {
  active: false,
  itemId: null,
  slotIndex: -1,
  dirX: 1,
  dirY: 0
};


const performanceStats = {
  slowFrames: 0,
  totalSlowFrames: 0,
  lastReportAt: 0,
  worstFrameMs: 0,
  loggingEnabled: false,
  lastSnapshot: null
};

function getPerformanceSnapshot() {
  return {
    enemy: currentEnemyType,
    mode: enemyMode,
    boxes: boxes.length,
    keyBoxes: keyItemBoxes.length,
    obstacles: obstacles.length,
    projectiles: projectiles.length,
    enemyProjectiles: enemyProjectiles.length,
    bugSwarms: bugSwarmAgents.length,
    watcherPhantoms: watcherPhantoms.length,
    watcherObjectPhantoms: watcherObjectPhantoms.length,
    ugomeTentacles: ugomeTentacles.length,
    slowFrames: performanceStats.slowFrames,
    totalSlowFrames: performanceStats.totalSlowFrames,
    worstFrameMs: Math.round(performanceStats.worstFrameMs)
  };
}

function monitorPerformanceFrame(rawFrameMs) {
  if (gameState !== "playing" && gameState !== "clearEvent") return;

  if (rawFrameMs >= 80) {
    performanceStats.slowFrames += 1;
    performanceStats.totalSlowFrames += 1;
    performanceStats.worstFrameMs = Math.max(performanceStats.worstFrameMs, rawFrameMs);
    performanceStats.lastSnapshot = getPerformanceSnapshot();
  }

  // Console警告の大量出力自体が重さの原因になるため、通常は出さない。
  // 必要な時だけ Console で horrorPerfLogging(true) を実行する。
  const now = performance.now();
  if (performanceStats.loggingEnabled && performanceStats.slowFrames > 0 && now - performanceStats.lastReportAt > 15000) {
    performanceStats.lastReportAt = now;
    console.warn("[Performance] slow frames detected", getPerformanceSnapshot());
    performanceStats.slowFrames = 0;
    performanceStats.worstFrameMs = 0;
  }
}

window.horrorPerf = function() {
  return getPerformanceSnapshot();
};

window.horrorPerfLogging = function(enabled = true) {
  performanceStats.loggingEnabled = !!enabled;
  console.log("performance logging:", performanceStats.loggingEnabled ? "ON" : "OFF");
  return performanceStats.loggingEnabled;
};

let lastMinimapDrawAt = 0;
const MINIMAP_DRAW_INTERVAL_MS = 120;

function drawMinimapOptimized(now, force = false) {
  if (force || now - lastMinimapDrawAt >= MINIMAP_DRAW_INTERVAL_MS) {
    drawMinimap();
    lastMinimapDrawAt = now;
  }
}


// ==============================
// キャラクター
// ==============================

const player = {
  x: 520,
  y: 4380,
  width: 92,
  height: 92,
  collisionWidth: 30,
  collisionHeight: 30,
  lastMoveX: 1,
  lastMoveY: 0,
  isMoving: false,
  canControl: true
};

const enemy = {
  x: 6900,
  y: 4300,
  width: 180,
  height: 180,
  collisionWidth: 86,
  collisionHeight: 84,
  alpha: 1,
  visible: true
};

// ==============================
// 入力
// ==============================

const keys = {};
const pressed = {};
// Physical key identities stay independent of key order and letter case.
const heldKeyboardCodes = new Set();
const SMARTPHONE_ONLY = true;
let mobileInputActive = false;
let mobileMoveX = 0;
let mobileMoveY = 0;
let mobileRunDown = false;
let mobileUsePressed = false;
let mobileUseDown = false;
let mobileInteractPressed = false;
let mobileUseGestureMoved = false;
let mobileUseGestureStart = null;
let touchStickPointer = null;

window.addEventListener("keydown", (event) => {
  const targetTag = String(event.target?.tagName || "").toUpperCase();
  if (SMARTPHONE_ONLY && !["INPUT", "TEXTAREA", "SELECT"].includes(targetTag)) return;
  if (event.key === "Escape") {
    if (gameState === "playing" || gameState === "clearEvent") {
      openPauseMenu();
    } else if (gameState === "pause") {
      closePauseMenu();
    }
    event.preventDefault();
    return;
  }

  const keyCode = String(event.keyCode || event.which || "");

  setKeyboardKeyState(event, true);

  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " ", "Enter", "Space", "NumpadEnter"].includes(event.key) ||
      ["Space", "Enter", "NumpadEnter", "Slash", "KeyX", "KeyZ", "KeyC", "ShiftLeft", "ShiftRight", "KeyW", "KeyA", "KeyS", "KeyD"].includes(event.code) ||
      ["87", "65", "83", "68", "88", "90", "67", "16", "191"].includes(keyCode)) {
    event.preventDefault();
  }
});

window.addEventListener("keyup", (event) => {
  const targetTag = String(event.target?.tagName || "").toUpperCase();
  if (SMARTPHONE_ONLY && !["INPUT", "TEXTAREA", "SELECT"].includes(targetTag)) return;
  setKeyboardKeyState(event, false);
});

function setKeyboardKeyState(event, down) {
  if (event.code) {
    if (down) heldKeyboardCodes.add(event.code);
    else heldKeyboardCodes.delete(event.code);
  }
  const aliases = new Set([event.key, event.code, String(event.keyCode || event.which || "")]);
  // Shift can change event.key between keydown and keyup. Clear both cases together.
  if (event.key && event.key.length === 1) {
    aliases.add(event.key.toLowerCase());
    aliases.add(event.key.toUpperCase());
  }
  for (const key of aliases) {
    if (!key) continue;
    if (down && !keys[key]) pressed[key] = true;
    keys[key] = down;
  }
}

function clearKeyboardInput() {
  heldKeyboardCodes.clear();
  for (const key of Object.keys(keys)) keys[key] = false;
  for (const key of Object.keys(pressed)) pressed[key] = false;
  runInputBuffer = 0;
  runAssistTimer = 0;
}

window.addEventListener("blur", clearKeyboardInput);

function consumePress(key) {
  if (pressed[key]) {
    pressed[key] = false;
    return true;
  }
  return false;
}
function consumeRunPress() {
  return consumePress("x") || consumePress("X") || consumePress("KeyX") || consumePress("88") ||
         consumePress("/") || consumePress("?") || consumePress("Slash") ||
         consumePress("IntlRo") || consumePress("NumpadDivide") || consumePress("191") || consumePress("111");
}

function isRunKeyDown() {
  return !!(mobileRunDown || heldKeyboardCodes.has("KeyX") || heldKeyboardCodes.has("Slash") || 
    keys["x"] || keys["X"] || keys["KeyX"] || keys["88"] ||
    keys["z"] || keys["Z"] || keys["KeyZ"] || keys["90"] ||
    keys["c"] || keys["C"] || keys["KeyC"] || keys["67"] ||
    keys["Shift"] || keys["ShiftLeft"] || keys["ShiftRight"] || keys["16"] ||
    keys["/"] || keys["?"] || keys["Slash"] || keys["IntlRo"] || keys["NumpadDivide"] || keys["191"] || keys["111"]
  );
}

function consumeMobileUsePress() {
  if (!mobileUsePressed) return false;
  mobileUsePressed = false;
  return true;
}
window.consumeMobileUsePress = consumeMobileUsePress;
window.isMobileUseDown = () => !!mobileUseDown;

function consumeUsePress() {
  return consumeMobileUsePress() || consumePress(" ") || consumePress("Space") || consumePress("Spacebar") ||
         consumePress("Enter") || consumePress("NumpadEnter");
}

function isUseDown() {
  return !!(mobileUseDown || keys[" "] || keys["Space"] || keys["Spacebar"] || keys["Enter"] || keys["NumpadEnter"]);
}



// タイトル画面用の直接起動保険。
// 通常のボタン登録が失敗しても、HTML側 onclick から直接呼べるようにする。
window.__forceStartFromTitle = function() {
  try {
    startGame();
  } catch (error) {
    console.error("startGame failed:", error);
    alert("ゲーム開始時にエラーが発生しました。Consoleを確認してください。");
  }
};
window.__forceShowHowTo = function() { try { showHowTo(); } catch (e) { console.error(e); } };
window.__forceShowGallery = function() { try { showGallery(); } catch (e) { console.error(e); } };
window.__forceShowRecords = function() { try { settingsReturnTarget = "title"; showRecords(); } catch (e) { console.error(e); } };
window.__forceShowSettings = function() { try { settingsReturnTarget = "title"; showSettings(); } catch (e) { console.error(e); } };

// ==============================
// スマホ専用操作
// ==============================

function setTouchRunToggle(value) {
  mobileRunDown = !!value;
  const runBtn = document.getElementById("touchRunButton");
  if (runBtn) runBtn.classList.toggle("active", mobileRunDown);
}

function resetTouchStick() {
  mobileInputActive = false;
  mobileMoveX = 0;
  mobileMoveY = 0;
  touchStickPointer = null;
  const knob = document.getElementById("touchStickKnob");
  if (knob) knob.style.transform = "translate(0,0)";
}

function updateMobileControlsVisibility() {
  const controls = document.getElementById("touchControls");
  const pauseBtn = document.getElementById("touchPauseButton");
  const activeGame = gameScreen?.classList.contains("active") && (gameState === "playing" || gameState === "clearEvent");
  const paused = gameState === "pause" || pauseOverlay?.classList.contains("show");
  const visible = !!activeGame && !paused;
  if (controls) controls.classList.toggle("show", visible);
  if (pauseBtn) pauseBtn.classList.toggle("show", visible);
  if (!visible) {
    resetTouchStick();
    mobileUseDown = false;
    mobileUsePressed = false;
  }
}

function pointHitsBoxTarget(x, y, box, pad = 0) {
  return !!box && x >= box.x - pad && x <= box.x + box.width + pad && y >= box.y - pad && y <= box.y + box.height + pad;
}

function getTouchAimDirection8() {
  if (!mobileInputActive) return null;
  const x = Number(mobileMoveX) || 0;
  const y = Number(mobileMoveY) || 0;
  if (Math.hypot(x, y) < 0.18) return null;
  const angle = Math.atan2(y, x);
  const step = Math.PI / 4;
  const snapped = Math.round(angle / step) * step;
  return { x: Math.cos(snapped), y: Math.sin(snapped) };
}

function getCurrentAimDirection() {
  const touchDir = getTouchAimDirection8();
  if (touchDir) return touchDir;
  return getFacingDirection();
}
window.getCurrentAimDirection = getCurrentAimDirection;

function mobileInteractAtWorld(x, y) {
  if (gameState !== "playing" || !player.canControl) return;
  const pc = getEntityCenter(player);

  for (const box of boxes) {
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;
    if (!box.opened && distanceBetweenPoints(pc.x, pc.y, cx, cy) < 150 && pointHitsBoxTarget(x, y, box, 8)) {
      openBox(box);
      return;
    }
  }
  for (const box of keyItemBoxes) {
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;
    if (!box.opened && distanceBetweenPoints(pc.x, pc.y, cx, cy) < 165 && pointHitsBoxTarget(x, y, box, 8)) {
      openKeyItemBox(box);
      return;
    }
  }
  for (const box of watcherFakeKeyBoxes || []) {
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;
    if (!box.opened && distanceBetweenPoints(pc.x, pc.y, cx, cy) < 165 && pointHitsBoxTarget(x, y, box, 8)) {
      openWatcherFakeKeyBox(box);
      return;
    }
  }
  for (const item of looseItems) {
    if (item.collected || depositedKeys[item.id]) continue;
    const cx = item.x + 24;
    const cy = item.y + 24;
    if (distanceBetweenPoints(pc.x, pc.y, cx, cy) < 132 && distanceBetweenPoints(x, y, cx, cy) < 70) {
      pickupLooseItem(item);
      return;
    }
  }
  if (mainShrine?.depositZone) {
    const z = mainShrine.depositZone;
    if (rectDistance(pc.x, pc.y, z) < 86 && x >= z.x - 20 && x <= z.x + z.width + 20 && y >= z.y - 20 && y <= z.y + z.height + 20) {
      depositKeysAtMainShrine();
      return;
    }
  }
  for (const shrine of shrines) {
    if (!isInsideRect(pc, shrine)) continue;
    if (x >= shrine.x && x <= shrine.x + shrine.width && y >= shrine.y && y <= shrine.y + shrine.height) {
      if (shrine.charged) activateSmallShrine(shrine);
      else showMessage("この社の力は尽きている。");
      return;
    }
  }
}

function updateTouchUseButtonIcon() {
  const btn = document.getElementById("touchUseButton");
  if (!btn) return;
  let itemId = itemInventory[selectedItemIndex] || null;
  if (window.counterattack?.enabled && selectedItemIndex === 3) itemId = "seal_gun";
  btn.classList.toggle("hasItem", !!itemId);
  btn.classList.toggle("aiming", !!(aimState.active && window.counterattack?.isTouchGunSelected?.()));
  const src = itemId ? imageSources[itemId] : "";
  if (src) btn.style.setProperty("background-image", `url("${src}")`, "important");
  else btn.style.removeProperty("background-image");
  btn.setAttribute("aria-label", itemId ? `どうぐ使用：${ITEM_NAMES[itemId] || itemId}` : "どうぐ使用");
}
window.updateTouchUseButtonIcon = updateTouchUseButtonIcon;

function releaseMobileUseButton(e = null, cancelled = false) {
  const useBtn = document.getElementById("touchUseButton");
  const isGun = !!window.counterattack?.isTouchGunSelected?.();
  const moved = mobileUseGestureMoved;

  if (isGun) {
    if (cancelled || moved) window.counterattack?.touchGunSwipeCancel?.();
    else window.counterattack?.touchGunTap?.();
    mobileUseDown = false;
    mobileUsePressed = false;
  } else {
    const itemId = itemInventory[selectedItemIndex];
    const wasDown = mobileUseDown;
    mobileUseDown = false;

    if (itemId === "small_stone" || itemId === "firecrackers") {
      if (!cancelled && aimState.active) {
        handleThrowAim(itemId, false);
      } else if (!cancelled && wasDown) {
        const dir = getCurrentAimDirection();
        throwProjectile(itemId === "small_stone" ? "stone" : "firecracker", dir.x, dir.y);
        cancelAim();
      }
      mobileUsePressed = false;
    } else if (window.counterattack?.isTouchThrowableSelected?.()) {
      if (!cancelled) window.counterattack?.touchThrowableRelease?.();
      else window.counterattack?.touchGunSwipeCancel?.();
      mobileUsePressed = false;
    }
  }

  mobileUseGestureStart = null;
  mobileUseGestureMoved = false;
  if (useBtn) useBtn.classList.remove("gestureActive");
  updateTouchUseButtonIcon();
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
}

function setupMobileControls() {
  document.body.classList.add("touchMode", "smartphoneOnly");
  if (document.getElementById("touchControls")) return;

  const overlay = document.createElement("div");
  overlay.id = "touchControls";
  overlay.innerHTML = `
    <div id="touchStick"><div id="touchStickKnob"></div></div>
    <div id="touchActionCluster">
      <button id="touchRunButton" type="button" aria-label="走る"></button>
      <button id="touchUseButton" type="button" aria-label="どうぐ使用"></button>
    </div>`;
  document.body.appendChild(overlay);

  const pauseBtn = document.createElement("button");
  pauseBtn.id = "touchPauseButton";
  pauseBtn.type = "button";
  pauseBtn.textContent = "ポーズ";
  pauseBtn.setAttribute("aria-label", "ポーズ");
  document.body.appendChild(pauseBtn);

  const stick = document.getElementById("touchStick");
  const knob = document.getElementById("touchStickKnob");
  const runBtn = document.getElementById("touchRunButton");
  const useBtn = document.getElementById("touchUseButton");

  function setStickFromEvent(e) {
    const rect = stick.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const max = rect.width * 0.36;
    const len = Math.max(1, Math.hypot(dx, dy));
    const clamped = Math.min(max, len);
    mobileMoveX = (dx / len) * (clamped / max);
    mobileMoveY = (dy / len) * (clamped / max);
    knob.style.transform = `translate(${(dx / len) * clamped}px, ${(dy / len) * clamped}px)`;
    mobileInputActive = clamped / max > 0.08;
  }

  stick.addEventListener("pointerdown", e => {
    if (gameState !== "playing") return;
    touchStickPointer = e.pointerId;
    stick.setPointerCapture?.(e.pointerId);
    setStickFromEvent(e);
    e.preventDefault();
  });
  stick.addEventListener("pointermove", e => {
    if (touchStickPointer !== e.pointerId) return;
    setStickFromEvent(e);
    e.preventDefault();
  });
  stick.addEventListener("pointerup", resetTouchStick);
  stick.addEventListener("pointercancel", resetTouchStick);

  runBtn.addEventListener("pointerdown", e => {
    if (gameState !== "playing") return;
    setTouchRunToggle(!mobileRunDown);
    e.preventDefault();
    e.stopPropagation();
  });

  useBtn.addEventListener("pointerdown", e => {
    if (gameState !== "playing" || !player.canControl) return;
    mobileUseGestureStart = { x: e.clientX, y: e.clientY, id: e.pointerId };
    mobileUseGestureMoved = false;
    useBtn.classList.add("gestureActive");
    useBtn.setPointerCapture?.(e.pointerId);

    if (!window.counterattack?.isTouchGunSelected?.()) {
      mobileUseDown = true;
      mobileUsePressed = true;
      const itemId = itemInventory[selectedItemIndex];
      if ((itemId === "small_stone" || itemId === "firecrackers") && !aimState.active) {
        const dir = getCurrentAimDirection();
        aimState.active = true;
        aimState.itemId = itemId;
        aimState.slotIndex = selectedItemIndex;
        aimState.dirX = dir.x;
        aimState.dirY = dir.y;
        updateAimGuide();
      }
    }
    e.preventDefault();
    e.stopPropagation();
  });
  useBtn.addEventListener("pointermove", e => {
    if (!mobileUseGestureStart || mobileUseGestureStart.id !== e.pointerId) return;
    if (Math.hypot(e.clientX - mobileUseGestureStart.x, e.clientY - mobileUseGestureStart.y) >= 22) {
      mobileUseGestureMoved = true;
    }
    e.preventDefault();
  });
  useBtn.addEventListener("pointerup", e => releaseMobileUseButton(e, false));
  useBtn.addEventListener("pointercancel", e => releaseMobileUseButton(e, true));

  pauseBtn.addEventListener("click", e => {
    if (gameState === "playing" || gameState === "clearEvent") openPauseMenu();
    e.preventDefault();
  });

  document.addEventListener("pointerdown", e => {
    if (gameState !== "playing" || !gameViewport?.contains(e.target)) return;
    if (e.target.closest("#touchControls, #touchPauseButton, #inventoryPanel, #minimap, #pauseOverlay, button, input")) return;
    const rect = worldCanvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = (e.clientX - rect.left) * (worldCanvas.width / rect.width) + cameraX;
    const y = (e.clientY - rect.top) * (worldCanvas.height / rect.height) + cameraY;
    mobileInteractAtWorld(x, y);
  }, { passive: true });

  let lastSlotTapAt = 0;
  let lastSlotIndex = -1;
  itemSlots.forEach((slot, i) => {
    slot.addEventListener("pointerdown", e => {
      selectedItemIndex = i;
      cancelAim();
      updateInventoryUI();
      e.preventDefault();
      e.stopPropagation();
    });
    slot.addEventListener("pointerup", e => {
      const now = performance.now();
      if (lastSlotIndex === i && now - lastSlotTapAt <= 330 && itemInventory[i]) {
        dropSelectedItem();
        lastSlotTapAt = 0;
        lastSlotIndex = -1;
      } else {
        lastSlotTapAt = now;
        lastSlotIndex = i;
      }
      e.preventDefault();
      e.stopPropagation();
    });
  });

  updateTouchUseButtonIcon();
  updateMobileControlsVisibility();
}

function updatePassphraseStatus(message = "") {
  if (!passphraseStatus) return;
  if (message) {
    passphraseStatus.textContent = message;
    return;
  }
  passphraseStatus.textContent = window.counterattack?.enabled ? "現在：反撃モード" : "現在：通常モード";
}
window.updatePassphraseStatus = updatePassphraseStatus;

function openPassphrasePanel() {
  if (!passphrasePanel) return;
  passphrasePanel.hidden = false;
  updatePassphraseStatus();
  setTimeout(() => passphraseInput?.focus(), 0);
}
function closePassphrasePanel() {
  if (!passphrasePanel) return;
  passphrasePanel.hidden = true;
  if (passphraseInput) passphraseInput.value = "";
}
function submitPassphrase() {
  const value = String(passphraseInput?.value || "").trim();
  if (value === "反撃") {
    window.counterattack?.setMode?.(true, true);
    updatePassphraseStatus("反撃モードに切り替えた。");
  } else if (value === "通常") {
    window.counterattack?.setMode?.(false, true);
    updatePassphraseStatus("通常モードに切り替えた。");
  } else {
    updatePassphraseStatus("あいことばが違う。");
  }
  if (passphraseInput) {
    passphraseInput.value = "";
    passphraseInput.focus();
  }
}

// ==============================
// 初期化
// ==============================

let __gameInitialized = false;
function initializeGameSafely() {
  if (__gameInitialized) return;
  __gameInitialized = true;

  try {
    loadSettings();
    loadProgressData();
    updateInventoryUI();
    setupMobileControls();
    showWarningIntro();
    requestAnimationFrame(gameLoop);
  } catch (error) {
    console.error("初期化エラー:", error);
    gameState = "warning";
    if (warningScreen) warningScreen.classList.add("active");
    titleScreen.classList.remove("active");
    galleryScreen.classList.remove("active");
    howToScreen.classList.remove("active");
    settingsScreen.classList.remove("active");
    recordsScreen.classList.remove("active");
    gameScreen.classList.remove("active");
    movieScreen.classList.remove("active");
    resultScreen.classList.remove("active");
  }
}

// ==============================
// UIイベント
// ==============================

function safeOn(element, type, handler) {
  if (!element) {
    console.warn("missing element for listener", type);
    return;
  }
  element.addEventListener(type, handler);
}

safeOn(warningScreen, "pointerdown", () => {
  // iOS requires the first media play to happen directly inside a user gesture.
  // Prime the title BGM here (before the click/fade) so later game audio can start normally.
  if (sounds.title && sounds.title.paused) {
    try {
      sounds.title.currentTime = 0;
      setAudioVolume(sounds.title, Math.max(0.01, getMasterVolume() * getBgmVolume() * 0.8));
      sounds.title.play().catch(() => {});
    } catch (_) {}
  }
});
safeOn(warningScreen, "click", dismissWarningIntro);
safeOn(startButton, "click", startGame);
safeOn(howToButton, "click", showHowTo);
safeOn(kaiiButton, "click", showGallery);
safeOn(galleryBackButton, "click", showTitle);
safeOn(howToBackButton, "click", showTitle);
safeOn(settingsButton, "click", () => {
  settingsReturnTarget = "title";
  showSettings();
});
safeOn(titleRecordButton, "click", () => {
  settingsReturnTarget = "title";
  showRecords();
});
safeOn(resetDataButton, "click", handleResetData);
safeOn(recordSortSelect, "change", renderRecords);
safeOn(recordsBackButton, "click", () => {
  if (settingsReturnTarget === "title") showTitle();
  else showSettings();
});
safeOn(backButton, "click", handleSettingsBack);
safeOn(retryButton, "click", startGame);
safeOn(titleButton, "click", showTitle);
safeOn(passphraseButton, "click", openPassphrasePanel);
safeOn(passphraseSubmitButton, "click", submitPassphrase);
safeOn(passphraseCloseButton, "click", closePassphrasePanel);
safeOn(passphraseInput, "keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    submitPassphrase();
  }
});
safeOn(pauseResumeButton, "click", closePauseMenu);

safeOn(pauseSettingsButton, "click", () => {
  settingsReturnTarget = "pause";
  closePauseMenu();
  showSettings();
});

safeOn(pauseTitleButton, "click", () => {
  closePauseMenu();
  showTitle();
});

safeOn(pauseRestartButton, "click", () => {
  closePauseMenu();
  startGame();
});

safeOn(masterVolume, "input", updateVolume);
safeOn(bgmVolume, "input", updateVolume);
safeOn(seVolume, "input", updateVolume);

// ボタン登録後に初期化する。
initializeGameSafely();


var warningIntroClosing = false;

function showWarningIntro() {
  gameState = "warning";
  warningIntroClosing = false;
  stopAllAudio();
  applyVolumes(0);
  if (!warningScreen) {
    showTitle();
    return;
  }

  showOnly(warningScreen);
  warningScreen.classList.add("active");
  warningScreen.classList.remove("closing");
  requestAnimationFrame(() => {
    warningScreen.classList.add("visible");
  });
}

function dismissWarningIntro() {
  if (!warningScreen || warningIntroClosing) return;
  warningIntroClosing = true;

  // Start the title media element inside the actual click gesture. Browsers may reject
  // a first play() that happens only after the warning fade's setTimeout.
  if (sounds.title) {
    try {
      sounds.title.currentTime = 0;
      setAudioVolume(sounds.title, 0);
      sounds.title.play().catch(() => {});
    } catch (e) {}
  }

  warningScreen.classList.remove("visible");
  warningScreen.classList.add("closing");

  setTimeout(() => {
    warningScreen.classList.remove("closing");
    showTitle();
    titleScreen.classList.add("titleIntroFadeIn");
    setTimeout(() => titleScreen.classList.remove("titleIntroFadeIn"), 1100);
  }, 820);
}


// ==============================
// 画面
// ==============================

function showOnly(screen) {
  if (warningScreen) warningScreen.classList.remove("active", "visible", "closing");
  titleScreen.classList.remove("active");
  galleryScreen.classList.remove("active");
  howToScreen.classList.remove("active");
  settingsScreen.classList.remove("active");
  recordsScreen.classList.remove("active");
  gameScreen.classList.remove("active");
  movieScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  screen.classList.add("active");
  requestAnimationFrame(updateMobileControlsVisibility);
}

function showTitle() {
  resultScreen.classList.remove("clearResult");
  if (gameState === "warning" && sounds.title && !sounds.title.paused) {
    try { sounds.title.currentTime = 0; } catch (e) {}
  }
  updateTitleUnlockButtons();
  renderKaiiGallery();
  renderRecords();
  gameState = "title";
  titleScreen.classList.toggle("completeMode", hasAllEnemiesCleared());
  switchToTitleBgmFromNonTitleAudio();
  showOnly(titleScreen);
  window.counterattack?.refreshTitle();
}

function showGallery() {
  if (!hasAnyClearData()) {
    showMessage("初めてクリアするまで、怪異は確認できない。");
    showTitle();
    return;
  }
  gameState = "gallery";
  ensureTitleBgmPlaying();
  renderKaiiGallery();
  showOnly(galleryScreen);
}

function showHowTo() {
  gameState = "howTo";
  ensureTitleBgmPlaying();
  showOnly(howToScreen);
}

function showSettings() {
  gameState = "settings";
  ensureTitleBgmPlaying();
  showOnly(settingsScreen);
}

function showRecords() {
  if (!hasAnyClearData()) {
    showMessage("初めてクリアするまで、きろくは確認できない。");
    showTitle();
    return;
  }
  gameState = "records";
  ensureTitleBgmPlaying();
  renderRecords();
  showOnly(recordsScreen);
}

function handleResetData() {
  const ok = window.confirm("保存された記録やクリアデータを初期化します。よろしいですか？");
  if (!ok) return;
  const really = window.confirm("本当に初期化します。元には戻せません。続けますか？");
  if (!really) return;
  resetGameData();
  showMessage("データを初期化した。");
  showTitle();
}

function handleSettingsBack() {
  if (settingsReturnTarget === "pause") {
    stopAllAudio();
    applyVolumes(getDanger());
    gameState = "pause";
    pauseOverlay.classList.add("show");
    updatePauseMenu();
    showOnly(gameScreen);
    return;
  }

  showTitle();
}

function openPauseMenu() {
  if (gameState !== "playing" && gameState !== "clearEvent") return;

  pausedFromState = gameState;
  gameState = "pause";
  pauseOverlay.classList.add("show");
  updatePauseMenu();
  updateMobileControlsVisibility();
  sounds.field.pause();
}

function closePauseMenu() {
  if (gameState !== "pause") return;

  gameState = pausedFromState;
  pauseOverlay.classList.remove("show");
  updatePauseMenu();
  updateMobileControlsVisibility();

  if (gameState === "playing") {
    sounds.field.play().catch(() => {});
  }
}

function showResult() {
  if (clearCelebrationOverlay) clearCelebrationOverlay.classList.remove("show");
  if (whiteFadeOverlay) whiteFadeOverlay.classList.remove("show");
  if (resultType === "clear") saveClearRecord();
  gameState = "result";
  stopAllAudio();
  pauseOverlay.classList.remove("show");
  resultScreen.classList.toggle("clearResult", resultType === "clear");
  showOnly(resultScreen);

  resultTime.textContent = "経過時間：" + survivalTime.toFixed(1) + "秒";
  resultObjective.textContent = `神具：${getCollectedKeyCount()}/5　/　奉納：${getDepositedCount()}/5　/　怪異：${getEnemyDef().name}`;

  if (resultType === "clear") {
    resultTitle.textContent = "GAME CLEAR";
    if (window.counterattack?.defeatedBody) resultObjective.textContent += "　/　魔封による撃破";
    if (hasAllEnemiesCleared()) resultObjective.textContent += "　全怪異クリア！タイトルの「あいことば」から反撃モードへ切り替えられる。";
    resultRank.textContent = getClearRankByTime(survivalTime);
  } else {
    resultTitle.textContent = "GAME OVER";
    resultRank.textContent = getGameOverRankByProgress();
  }
}

// ==============================
// 音量
// ==============================

function loadSettings() {
  masterVolume.value = localStorage.getItem(STORAGE_KEYS.master) ?? "70";
  bgmVolume.value = localStorage.getItem(STORAGE_KEYS.bgm) ?? "70";
  seVolume.value = localStorage.getItem(STORAGE_KEYS.se) ?? "85";
  updateVolumeText();
}

function updateVolume() {
  updateVolumeText();

  localStorage.setItem(STORAGE_KEYS.master, masterVolume.value);
  localStorage.setItem(STORAGE_KEYS.bgm, bgmVolume.value);
  localStorage.setItem(STORAGE_KEYS.se, seVolume.value);

  applyVolumes(getDanger());
}

function updateVolumeText() {
  masterVolumeText.textContent = masterVolume.value;
  bgmVolumeText.textContent = bgmVolume.value;
  seVolumeText.textContent = seVolume.value;
}

function getMasterVolume() { return Number(masterVolume.value) / 100; }
function getBgmVolume() { return Number(bgmVolume.value) / 100; }
function getSeVolume() { return Number(seVolume.value) / 100; }

function applyVolumes(danger) {
  const master = getMasterVolume();
  const bgm = getBgmVolume();
  const se = getSeVolume();

  setAudioVolume(sounds.title, master * bgm * 0.8);
  setAudioVolume(sounds.field, master * bgm * (0.26 + danger * 0.74));
  setAudioVolume(sounds.heartbeat, master * se * (0.25 + danger * 0.75));
  setAudioVolume(sounds.scream, master * se);
  setAudioVolume(sounds.break, master * se * 0.95);
  setAudioVolume(sounds.enemyVoice, master * se);
  setAudioVolume(sounds.trackerCapture, master * se);
  // armedMove is controlled only by updateAudio() distance fade.
  // Do not set it here, or it will jump in volume.
  setAudioVolume(sounds.armedThrow, master * se * 0.42);
  setAudioVolume(sounds.armedKnifeHit, master * se * 0.48);
  setAudioVolume(sounds.armedCapture, master * se);
  setAudioVolume(sounds.beastDetect, master * se * 0.85);
  setAudioVolume(sounds.beastSniff, master * bgm * 0.68);
  setAudioVolume(sounds.beastCapture, master * se);
  // bugmasterDetect and each swarm loop are controlled by updateAudio().
  // Do not zero them here, or they become inaudible every frame.
  setAudioVolume(sounds.bugmasterCapture, master * se);
  setAudioVolume(sounds.nightShadowCry, master * se);
  setAudioVolume(sounds.nightShadowFlap, master * Math.max(bgm * 1.15, se * 0.9) * 0.95);
  setAudioVolume(sounds.kaishutsubotsu, master * se * 0.88);
  setAudioVolume(sounds.miezaru, master * se * 0.92);
  setAudioVolume(sounds.watcher, master * se * 0.92);
  setAudioVolume(sounds.snatch, master * se);
  setAudioVolume(sounds.hit, master * se * 0.72);
  setAudioVolume(sounds.matsuriBell, master * se * 0.95);
  window.counterattack?.applyAudioVolumes();
}

function playLoop(audio) {
  audio.currentTime = 0;
  audio.play().catch(() => {});
}


function ensureTitleBgmPlaying() {
  applyVolumes(0);
  if (!sounds.title) return;
  if (sounds.title.paused) {
    sounds.title.play().catch(() => {});
  }
}

function switchToTitleBgmFromNonTitleAudio() {
  for (const key in sounds) {
    if (key !== "title") stopAudio(sounds[key]);
  }
  if (typeof bugSwarmLoopAudios !== "undefined") {
    for (const audio of bugSwarmLoopAudios) {
      stopAudio(audio);
    }
  }
  ensureTitleBgmPlaying();
}

function playOneShot(audio) {
  try { audio.currentTime = 0; } catch (e) {}
  audio.play().catch(() => {});
}

function stopAudio(audio) {
  if (!audio) return;
  try { audio.pause(); } catch (e) {}
  try { audio.currentTime = 0; } catch (e) {}
}

function stopAllAudio() {
  for (const key in sounds) {
    stopAudio(sounds[key]);
  }
  if (typeof bugSwarmLoopAudios !== "undefined") {
    for (const audio of bugSwarmLoopAudios) {
      stopAudio(audio);
    }
  }
}

// ==============================
// 開始
// ==============================

function resetInventories() {
  for (let i = 0; i < itemInventory.length; i++) itemInventory[i] = null;
  for (const keyId of KEY_ITEM_IDS) {
    keyInventory[keyId] = false;
    depositedKeys[keyId] = false;
  }
  selectedItemIndex = 0;
  updateInventoryUI();
}

let __lastStartGameAt = 0;
function startGame() {
  clearKeyboardInput();
  setTouchRunToggle(false);
  resetTouchStick();
  mobileUseDown = false;
  mobileUsePressed = false;
  const nowStart = performance.now();
  if (gameState === "starting" || nowStart - __lastStartGameAt < 350) return;
  __lastStartGameAt = nowStart;
  gameState = "starting";
  performanceStats.slowFrames = 0;
  performanceStats.worstFrameMs = 0;
  performanceStats.lastSnapshot = null;
  lastMinimapDrawAt = 0;
  playerInvincible = false;
  ultimateCheatActive = false;
  infiniteOmamoriActive = false;
  maxStaminaDrinkActive = false;
  eternalMagicMirrorActive = false;
  sacredBellRevealActive = false;
  revealAllKeyBoxesOnMinimap = false;
  resetInventories();
  revealedKeyBoxId = null; // rev24 reset matsuri bell marker

  ugomeGroundTentacles = [];
  ugomeGroundTentacleTimer = randomRange(1.0, 2.0);
  ugomeGroundBind = null;
  ugomeTentacleGroups = [];
  ugomeTentacleGroupTimer = randomRange(2.0, 4.0);
  trackerLeapTimer = 0;
  trackerLeapCooldown = randomRange(6.0, 10.0);
  trackerLeapStart = null;
  trackerLeapTarget = null;
  armedGrappleCooldown = randomRange(5.5, 9.5);
  armedGrapple = null;
  beastSpiralMode = false;
  beastSpiralTimer = randomRange(7.0, 12.0);
  beastSpiralIndex = 0;
  beastSpiralEntry = null;
  beastSpiralStartCorner = 0;
  nightShadowLineDiveCooldown = randomRange(7.0, 12.0);
  nightShadowLinePass = false;
  kaishutsubotsuWarpFlurryTimer = 0;
  kaishutsubotsuWarpFlurryCooldown = randomRange(8.0, 14.0);
  kaishutsubotsuWarpFlurryStep = 0;
  miezaruClones = [];
  miezaruCloneTimer = randomRange(5.0, 9.0);

  currentEnemyType = chooseEnemyTypeForRun();
  applyEnemyTypeConfig();

  player.x = 520;
  player.y = 4380;
  player.lastMoveX = 1;
  player.lastMoveY = 0;
  player.isMoving = false;
  player.canControl = true;

  enemy.x = 6900;
  enemy.y = 4300;
  enemy.alpha = 1;
  enemy.visible = true;

  enemyMode = "wander";
  enemyFacingX = -1;
  enemyFacingY = 0;
  enemyPath = [];
  enemyPathTimer = 0;
  enemyWanderTarget = null;
  enemyLostSightTimer = 0;
  enemyStunTimer = 0;
  enemyLurePoint = null;
  enemyCanEnterSanctuary = false;
  enemyWasSeeingPlayer = false;
  enemyVoiceCooldown = 0;
  enemyKnifeCooldown = getEnemyDef().knifeInterval || 0;
  beastSniffTimer = 0.9;
  beastRushTimer = 0;
  beastTargetPoint = null;
  beastSniffAudioActive = false;
  beastHasScent = false;
  beastScentLostTimer = 0;
  magicMirrorTimer = 0;
  staminaDrinkTimer = 0;
  omamoriCharges = itemInventory.includes("omamori") ? Math.max(omamoriCharges, 10) : 0;
  nightShadowClearDiveTarget = null;
  bugRevealTimer = 0;
  nightShadowState = "air";
  nightShadowTimer = randomRange(getEnemyDef().skyIntervalMin || 16.0, getEnemyDef().skyIntervalMax || 25.0);
  nightShadowTargetPoint = null;
  nightShadowDiveOrigin = null;
  nightShadowGroundTimer = 0;
  nightShadowLastKnownPoint = null;
  bugAttachStacks = 0;
  bugEscapeProgress = 0;
  bugSwarmFrame = 0;
  bugSwarmSeparationAccumulator = 0;
  bugSwarmAudioAccumulator = 0;
  bugAttachVisualLastUpdate = 0;
  bugSwarmAgents = [];
  stopAudio(sounds.beastSniff);
  stopAudio(sounds.bugmasterDetect);
  stopAudio(sounds.bugmasterSwarm);
  stopAudio(sounds.nightShadowFlap);
  stopAudio(sounds.ugomekimonoMove);
  stopAudio(sounds.ugomekimonoTentacleA);
  stopAudio(sounds.ugomekimonoTentacleB);
  stopAudio(sounds.ugomekimonoTentacleC);
  stopAudio(sounds.ugomekimonoTentacleD);
  stopAudio(sounds.ugomekimonoTentacleE);
  stopAudio(sounds.ugomekimonoTentacleF);
  stopAudio(sounds.ugomekimonoTentacleG);
  stopAudio(sounds.ugomekimonoTentacleH);
  stopAudio(sounds.ugomekimonoTentacleI);
  stopAudio(sounds.ugomekimonoTentacleJ);
  enemyProjectiles = [];
  watcherFakeKeyBoxes = [];
  obstacles = obstacles.filter(o => o.type !== "fakeKeyBox");
  watcherPhantoms = [];
  playerKnifeSlowTimers = [];
  if (currentEnemyType === "bugmaster") initBugSwarmAgents();
  if (currentEnemyType === "nightShadow") {
    enemy.visible = false;
    enemy.alpha = 0;
    enemyMode = "air";
  }
  if (currentEnemyType === "kaishutsubotsu") {
    const def = getEnemyDef();
    kaishutsubotsuNearWarpTimer = randomRange(def.nearWarpMin || 18.0, def.nearWarpMax || 30.0);
    kaishutsubotsuInitialRushLockTimer = randomRange(def.initialRushDelayMin || 38.0, def.initialRushDelayMax || 55.0);
    kaishutsubotsuRushCooldown = kaishutsubotsuInitialRushLockTimer;
    kaishutsubotsuRushTimer = 0;
    kaishutsubotsuRushTarget = null;
  }
  if (currentEnemyType === "watcher") {
    const def = getEnemyDef();
    enemy.visible = true;
    enemy.alpha = 1;
    watcherWarpTimer = randomRange(def.nearWarpMin || 4.5, def.nearWarpMax || 7.5);
    watcherPhantomTimer = randomRange(getEnemyDef().phantomMin || 9.0, getEnemyDef().phantomMax || 16.0);
    watcherObjectPhantomTimer = randomRange(4.0, 8.0);
    watcherFakeBoxTimer = randomRange(def.fakeBoxMin || 10.0, def.fakeBoxMax || 17.0);
    watcherFakeKeyBoxes = [];
    watcherPhantoms = [];
    watcherObjectPhantoms = [];
  }
  if (currentEnemyType === "ugomekimono") {
    enemy.visible = true;
    enemy.alpha = 1;
    ugomeGrab = null;
    ugomeEscapeProgress = 0;
    initUgomeTentacles();
  }
  armedMoveTargetVolume = 0;
  armedMoveCurrentVolume = 0;
  enemyLastX = enemy.x;
  enemyLastY = enemy.y;
  enemyStuckTimer = 0;
  enemyWarpCooldown = 0;

  movementSlowTimer = 0;
  stamina = STAMINA_MAX;
  isRunning = false;
  isTired = false;
  staminaVisibleTimer = 0;
  collisionSoundCooldown = 0;
  updateStaminaGauge(false);
  heartbeatTimer = 0;
  messageText = "";
  messageTimer = 0;
  promptText = "";

  clearEventPhase = 0;
  clearEventTimer = 0;
  shrineFlashTimer = 0;
  resultType = "gameover";
  clearResultProcessed = false;

  trackerFrenzyTimer = 0;
  trackerLineAccel = 0;
  armedNoKnifeHitTimer = 0;
  armedAxeCooldown = 0;
  armedAxeSlamTimer = 0;
  armedAxeLungeTimer = 0;
  armedAxeLungeDirX = 0;
  armedAxeLungeDirY = 0;
  armedChainCooldown = randomRange(5.5, 9.0);
  playerStunTimer = 0;
  bugmasterSwarmMode = "normal";
  bugmasterSwarmModeTimer = 0;
  bugmasterChargeCooldown = 0;
  bugmasterChargeTimer = 0;
  bugmasterChargeTarget = null;
  nightShadowDiveComboRemaining = 0;
  nightShadowComboActive = false;
  watcherGiantEye = null;
  ugomeCapturePulseTimer = randomRange(5.0, 9.0);

  aimState.active = false;
  aimState.itemId = null;
  aimState.slotIndex = -1;
  aimState.dirX = 1;
  aimState.dirY = 0;
  aimGuide.style.display = "none";
  updateBuddhaGauge(false, 0);
  trapVfxTimer = 0;
  spiderWebOverlay.classList.remove("show");
  if (whiteFadeOverlay) whiteFadeOverlay.classList.remove("show");
  snatchOverlay.classList.remove("show");
  gameViewport.classList.remove("snatchShake");

  playerAnimClock = 0;
  enemyAnimClock = 0;
  enemyFrameIndex = 0;

  createWorld();
  applyEnemyTypeConfig();
  warpEnemyToNonStuckPoint("start");

  startTime = performance.now();
  survivalTime = 0;
  minimumDistance = Infinity;

  gameState = "playing";
  stopAllAudio();
  applyVolumes(0);
  playLoop(sounds.field);
  if (currentEnemyType === "armed") {
    setAudioVolume(sounds.armedMove, 0);
    if (sounds.armedMove.paused) sounds.armedMove.play().catch(() => {});
  }
  showOnly(gameScreen);
  window.counterattack?.reset();
}

// ==============================
// ワールド構築
// ==============================

function createWorld() {
  worldZones = [];
  obstacles = [];
  decorativeObjects = [];
  boxes = [];
  keyItemBoxes = [];
  looseItems = [];
  interactables = [];
  shrines = [];
  mainShrine = null;
  projectiles = [];
  firecrackerLures = [];
  enemyProjectiles = [];

  createTaggedFieldLayout();
  createMainShrine();
  createSmallShrines();
  createRandomDecorativeObjects();
  createRandomBoxes();
  createKeyItemBoxes();
  createLooseKeyItems();
  buildWalkGrid();

  const spawn = findSafeEnemySpawn();
  enemy.x = spawn.x;
  enemy.y = spawn.y;
}

function createTaggedFieldLayout() {
  // タグ付き地形
  // road: 必ず通行可能・何も置かない
  // space: 通行可能・箱/社/キー箱/小物配置可能
  // building: 壁として当たり判定あり。道路には置かない。

  worldZones.push({ tag: "road", x: 0, y: 2320, width: WORLD_WIDTH, height: 360 });
  worldZones.push({ tag: "road", x: 3820, y: 0, width: 360, height: WORLD_HEIGHT });

  worldZones.push({ tag: "space", x: 3180, y: 1500, width: 1640, height: 1440, name: "main_shrine_space" });

  const spaces = [
    [760, 1220, 760, 620], [1840, 1160, 760, 620], [5480, 1160, 760, 620], [6500, 1280, 760, 620],
    [760, 3040, 760, 650], [1880, 3100, 760, 650], [5480, 3100, 760, 650], [6500, 3040, 760, 650],
    [830, 4100, 740, 420], [2460, 4080, 740, 420], [5280, 4080, 740, 420], [6760, 4080, 740, 420]
  ];

  for (const s of spaces) {
    worldZones.push({ tag: "space", x: s[0], y: s[1], width: s[2], height: s[3] });
  }

  // 建物は道路と交差しない位置だけに配置
  const buildings = [
    [180, 180, 680, 420], [1180, 180, 680, 420], [2220, 180, 720, 420],
    [5000, 180, 720, 420], [6100, 180, 720, 420], [7120, 180, 650, 420],

    [180, 1240, 500, 460], [2720, 1240, 500, 460],
    [4780, 1240, 500, 460], [7300, 1240, 420, 460],

    [180, 2140, 680, 420], [1180, 2140, 680, 420], [2220, 2140, 720, 420],
    [5000, 2140, 720, 420], [6100, 2140, 720, 420], [7120, 2140, 650, 420],

    [180, 3520, 500, 420], [1660, 3520, 560, 420],
    [4300, 3520, 560, 420], [6220, 3520, 560, 420],

    [180, 4540, 680, 360], [1180, 4540, 680, 360],
    [5000, 4540, 680, 360], [6100, 4540, 680, 360], [7120, 4540, 620, 360]
  ];

  for (const b of buildings) {
    if (isOnRoad(b[0], b[1], b[2], b[3])) continue;
    worldZones.push({ tag: "building", x: b[0], y: b[1], width: b[2], height: b[3] });
    addObstacle(b[0], b[1], b[2], b[3], "building", true, true);
  }

  // 小物は createRandomDecorativeObjects() で毎回ランダム配置する。

}



function rectForPlacement(x, y, width, height, margin = 0) {
  return {
    left: x - margin,
    top: y - margin,
    right: x + width + margin,
    bottom: y + height + margin
  };
}

function overlapsExistingPlacement(x, y, width, height, margin = 0) {
  const rect = rectForPlacement(x, y, width, height, margin);

  for (const o of obstacles) {
    const or = { left: o.x, top: o.y, right: o.x + o.width, bottom: o.y + o.height };
    if (rectsOverlap(rect, or)) return true;
  }

  for (const d of decorativeObjects) {
    const dr = { left: d.x, top: d.y, right: d.x + d.width, bottom: d.y + d.height };
    if (rectsOverlap(rect, dr)) return true;
  }

  for (const b of boxes) {
    const br = { left: b.x, top: b.y, right: b.x + b.width, bottom: b.y + b.height };
    if (rectsOverlap(rect, br)) return true;
  }

  for (const k of keyItemBoxes) {
    const kr = { left: k.x, top: k.y, right: k.x + k.width, bottom: k.y + k.height };
    if (rectsOverlap(rect, kr)) return true;
  }

  return false;
}

function randomSpaceZone(includeMain = false) {
  const zones = worldZones.filter(z => z.tag === "space" && (includeMain || z.name !== "main_shrine_space"));
  return zones[Math.floor(Math.random() * zones.length)];
}

function canPlaceFieldObject(x, y, width, height, options = {}) {
  const toriiMargin = options.toriiMargin ?? 240;
  const shrineMargin = options.shrineMargin ?? 150;
  const objectMargin = options.objectMargin ?? 24;

  if (x < 40 || y < 40 || x + width > WORLD_WIDTH - 40 || y + height > WORLD_HEIGHT - 40) return false;
  if (isOnRoad(x, y, width, height)) return false;
  if (isNearAnyTorii(x, y, width, height, toriiMargin)) return false;
  if (isTooCloseToShrine(x, y, width, height, shrineMargin)) return false;
  if (overlapsExistingPlacement(x, y, width, height, objectMargin)) return false;
  return true;
}

function generateRandomPlacementCandidates(count, typeTable, includeMain = false) {
  const result = [];

  for (let i = 0; i < count * 18 && result.length < count; i++) {
    const zone = randomSpaceZone(includeMain);
    if (!zone) break;

    const typeDef = typeTable[Math.floor(Math.random() * typeTable.length)];
    const width = typeDef.width;
    const height = typeDef.height;
    const x = randomRange(zone.x + 42, zone.x + zone.width - width - 42);
    const y = randomRange(zone.y + 42, zone.y + zone.height - height - 42);

    result.push({
      x: Math.round(x),
      y: Math.round(y),
      width,
      height,
      type: typeDef.type || typeDef.sprite,
      sprite: typeDef.sprite || typeDef.type
    });
  }

  shuffleArray(result);
  return result;
}

function createRandomDecorativeObjects() {
  const typeTable = [
    { type: "car", width: 132, height: 72 },
    { type: "car", width: 132, height: 72 },
    { type: "pole", width: 48, height: 92 },
    { type: "pole", width: 48, height: 92 }
  ];

  const candidates = generateRandomPlacementCandidates(220, typeTable, false);
  let placed = 0;

  for (const c of candidates) {
    if (placed >= 14) break;
    if (!canPlaceFieldObject(c.x, c.y, c.width, c.height, {
      toriiMargin: 300,
      shrineMargin: 210,
      objectMargin: 55
    })) continue;

    decorativeObjects.push({ x: c.x, y: c.y, width: c.width, height: c.height, type: c.type });
    addObstacle(c.x, c.y, c.width, c.height, c.type, true, true);
    placed++;
  }
}


function createMainShrine() {
  const x = 3380;
  const y = 1720;
  const w = 1240;
  const h = 1160;
  const gateW = 300;
  const gateX = x + w / 2 - gateW / 2;

  mainShrine = {
    x, y, width: w, height: h,
    gate: { x: gateX, y: y + h - 20, width: gateW, height: 130 },
    altar: { x: x + w / 2 - 90, y: y + 270, width: 180, height: 180 },
    shrineBody: { x: x + w / 2 - 210, y: y + 160, width: 420, height: 250 },
    depositZone: { x: x + w / 2 - 140, y: y + 430, width: 280, height: 150 },
    entryZone: { x: x + w / 2 - 170, y: y + h - 200, width: 340, height: 170 }
  };

  addObstacle(x, y, w, 62, "sacredTreeWall", true, true);
  addObstacle(x, y, 62, h, "sacredTreeWall", true, true);
  addObstacle(x + w - 62, y, 62, h, "sacredTreeWall", true, true);
  addObstacle(x, y + h - 62, gateX - x, 62, "sacredTreeWall", true, true);
  addObstacle(gateX + gateW, y + h - 62, x + w - (gateX + gateW), 62, "sacredTreeWall", true, true);

  addObstacle(mainShrine.shrineBody.x, mainShrine.shrineBody.y, mainShrine.shrineBody.width, mainShrine.shrineBody.height, "mainShrineBody", true, true);

  addObstacle(gateX, y + h - 34, gateW, 92, "sanctuaryGate", false, true);

  interactables.push({
    type: "mainAltar",
    rect: { x: mainShrine.depositZone.x, y: mainShrine.depositZone.y, width: mainShrine.depositZone.width, height: mainShrine.depositZone.height }
  });
}

function createSmallShrines() {
  const data = [
    { x: 980, y: 1280, keyId: "old_talisman" },
    { x: 6060, y: 1260, keyId: "damaged_beads" },
    { x: 6080, y: 3100, keyId: "frayed_bell_rope" },
    { x: 1040, y: 3120, keyId: "worn_kokeshi" }
  ];

  for (const s of data) {
    const area = { x: s.x, y: s.y, width: 340, height: 340 };
    const gate = { x: s.x + 85, y: s.y + 280, width: 170, height: 90 };
    const altar = { x: s.x + 120, y: s.y + 70, width: 100, height: 90 };

    const shrine = {
      x: s.x, y: s.y, width: 340, height: 340, gate, altar,
      keyId: s.keyId,
      charged: true,
      exhausted: false,
      id: "shrine_" + s.keyId
    };

    shrines.push(shrine);

    addObstacle(area.x, area.y, area.width, 22, "smallShrineRope", true, true);
    addObstacle(area.x, area.y, 22, area.height, "smallShrineRope", true, true);
    addObstacle(area.x + area.width - 22, area.y, 22, area.height, "smallShrineRope", true, true);
    addObstacle(area.x, area.y + area.height - 22, gate.x - area.x, 22, "smallShrineRope", true, true);
    addObstacle(gate.x + gate.width, area.y + area.height - 22, area.x + area.width - (gate.x + gate.width), 22, "smallShrineRope", true, true);

    addObstacle(gate.x, gate.y, gate.width, 52, "smallSanctuaryGate", false, true);

    interactables.push({ type: "smallShrine", shrine });
  }
}

function createRandomBoxes() {
  const typeTable = [
    { sprite: "locker", width: 92, height: 110 },
    { sprite: "crate", width: 96, height: 96 },
    { sprite: "tansu", width: 100, height: 96 },
    { sprite: "crate", width: 96, height: 96 },
    { sprite: "locker", width: 92, height: 110 }
  ];

  const candidates = generateRandomPlacementCandidates(360, typeTable, false);

  const contentPool = [
    "empty", "empty", "empty", "empty", "empty", "empty",
    "item", "item", "item", "item", "item", "item", "item", "item",
    "trap_noise", "trap_noise", "trap_web", "trap_web", "trap_steal", "trap_steal"
  ];

  shuffleArray(contentPool);

  let index = 0;

  for (const c of candidates) {
    if (boxes.length >= 20) break;

    const rect = { x: c.x, y: c.y, width: c.width, height: c.height };
    if (!canPlaceFieldObject(rect.x, rect.y, rect.width, rect.height, {
      toriiMargin: 300,
      shrineMargin: 200,
      objectMargin: 42
    })) continue;

    const box = {
      id: "box_" + boxes.length,
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
      sprite: c.sprite,
      content: contentPool[index % contentPool.length],
      opened: false
    };

    index++;
    boxes.push(box);
    interactables.push({ type: "box", box });
    addObstacle(box.x, box.y, box.width, box.height, "box", true, true);
  }
}


function createKeyItemBoxes() {
  const typeTable = [
    { sprite: "sealed_key_box", width: 122, height: 106 }
  ];
  const candidates = generateRandomPlacementCandidates(160, typeTable, false);

  for (const c of candidates) {
    if (keyItemBoxes.length >= KEY_ITEM_IDS.length) break;

    const keyId = KEY_ITEM_IDS[keyItemBoxes.length];
    const rect = { x: c.x, y: c.y, width: 122, height: 106 };

    if (!canPlaceFieldObject(rect.x, rect.y, rect.width, rect.height, {
      toriiMargin: 340,
      shrineMargin: 230,
      objectMargin: 58
    })) continue;

    const box = {
      id: "key_box_" + keyId,
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
      sprite: "sealed_key_box",
      keyId,
      opened: false,
      isKeyBox: true
    };

    keyItemBoxes.push(box);
    interactables.push({ type: "keyBox", box });
    addObstacle(box.x, box.y, box.width, box.height, "keyBox", true, true);
  }

  // ランダム候補が極端に偏った場合の保険。通常はここには来ない。
  let guard = 0;
  while (keyItemBoxes.length < KEY_ITEM_IDS.length && guard < 500) {
    guard++;
    const zone = randomSpaceZone(false);
    if (!zone) break;

    const keyId = KEY_ITEM_IDS[keyItemBoxes.length];
    const box = {
      id: "key_box_" + keyId,
      x: Math.round(zone.x + zone.width / 2 + randomRange(-180, 180)),
      y: Math.round(zone.y + zone.height / 2 + randomRange(-130, 130)),
      width: 122,
      height: 106,
      sprite: "sealed_key_box",
      keyId,
      opened: false,
      isKeyBox: true
    };
    if (!canPlaceFieldObject(box.x, box.y, box.width, box.height, {
      toriiMargin: 300,
      shrineMargin: 180,
      objectMargin: 48
    })) continue;
    keyItemBoxes.push(box);
    interactables.push({ type: "keyBox", box });
    addObstacle(box.x, box.y, box.width, box.height, "keyBox", true, true);
  }
}


function createLooseKeyItems() {
  looseItems = [];
}

function buildWalkGrid() {
  walkGrid = [];

  for (let row = 0; row < GRID_ROWS; row++) {
    const line = [];

    for (let col = 0; col < GRID_COLS; col++) {
      const x = col * GRID_SIZE + GRID_SIZE / 2 - enemy.width / 2;
      const y = row * GRID_SIZE + GRID_SIZE / 2 - enemy.height / 2;
      line.push(!isCollidingWithObstacle(enemy, x, y, true));
    }

    walkGrid.push(line);
  }
}

// ==============================
// ループ
// ==============================

function gameLoop(now) {
  requestAnimationFrame(gameLoop);

  const rawFrameMs = now - lastTime;
  monitorPerformanceFrame(rawFrameMs);
  const dt = Math.min(rawFrameMs / 1000, 0.05);
  lastTime = now;

  if (gameState === "playing") {
    updatePlaying(now, dt);
    drawWorld();
    drawMinimapOptimized(now);
  } else if (gameState === "clearEvent") {
    updateClearEvent(dt);
    drawWorld();
    drawMinimapOptimized(now);
  } else if (gameState === "pause") {
    drawWorld();
    drawMinimapOptimized(now);
  }

  pressed["e"] = false;
  pressed["E"] = false;
  pressed[" "] = false;
  pressed["Space"] = false;
  pressed["Spacebar"] = false;
  pressed["Enter"] = false;
  pressed["NumpadEnter"] = false;
  pressed["1"] = false;
  pressed["2"] = false;
  pressed["3"] = false;
  pressed["4"] = false;
}

function updateBoxFlashTimers(dt) {
  for (const box of keyItemBoxes) {
    if (box.flashTimer > 0) {
      box.flashTimer = Math.max(0, box.flashTimer - dt);
    }
  }
}

function updatePlaying(now, dt) {
  if (shrineFlashTimer > 0) shrineFlashTimer -= dt;
  magicMirrorTimer = Math.max(0, magicMirrorTimer - dt);
  staminaDrinkTimer = Math.max(0, staminaDrinkTimer - dt);
  survivalTime = (now - startTime) / 1000;
  if (collisionSoundCooldown > 0) collisionSoundCooldown -= dt;

  handleSelectionKeys();
  handlePlayer(dt);
  if (!window.counterattack?.isWeaponReady()) handleInteractions();
  else promptText = "どうぐボタン：発射　スワイプ：構え解除";
  handleSelectedItemUse(dt);
  window.counterattack?.update(dt);
  if (gameState !== "playing") return;
  updateProjectiles(dt);
  updateEnemyProjectiles(dt);
  updateBoxFlashTimers(dt);
  updateEnemy(dt);
  updateEnemyStuckMonitor(dt);
  updateAudio(dt);
  updateCamera();
  updateSpriteAnimation(dt);
  updateOverlay();
  updatePromptAndMessages(dt);
  checkCapture();
}

function updateClearEvent(dt) {
  window.counterattack?.updateClearVisuals(dt);
  if (enemyVoiceCooldown > 0) enemyVoiceCooldown -= dt;
  if (shrineFlashTimer > 0) shrineFlashTimer -= dt;
  magicMirrorTimer = Math.max(0, magicMirrorTimer - dt);
  staminaDrinkTimer = Math.max(0, staminaDrinkTimer - dt);
  survivalTime = (performance.now() - startTime) / 1000;
  clearEventTimer += dt;
  updateAudio(dt, true);

  if (clearEventPhase === 0) {
    player.canControl = false;
    enemyCanEnterSanctuary = true;
    stopAudio(sounds.field);

    if (clearEventTimer > 0.65) {
      clearEventTimer = 0;

      if (currentEnemyType === "watcher") {
        startWatcherClearWarpFlurry();
      } else if (currentEnemyType === "nightShadow") {
        clearEventPhase = 0.5;
        nightShadowClearDiveTarget = {
          x: mainShrine.gate.x + mainShrine.gate.width / 2,
          y: mainShrine.gate.y + 280
        };
        enemy.x = nightShadowClearDiveTarget.x - enemy.width / 2;
        enemy.y = -enemy.height - 80;
        enemy.visible = true;
        enemy.alpha = 1;
        enemyMode = "dive";
        playLoop(sounds.nightShadowFlap);
        showMessage("夜の影が鳥居の前へ急降下してくる。");
      } else {
        clearEventPhase = 1;

        // 鳥居の外へ強制配置。必ず鳥居を通る経路にする。
        enemy.x = mainShrine.gate.x + mainShrine.gate.width / 2 - enemy.width / 2;
        enemy.y = mainShrine.gate.y + 280;
        enemyPath = [];
        enemyPathTimer = 0;
        showMessage(`鳥居の外に、${getEnemyDef().name}が立っている。`);
      }
    }
  } else if (clearEventPhase === 0.5) {
    const target = nightShadowClearDiveTarget || {
      x: mainShrine.gate.x + mainShrine.gate.width / 2,
      y: mainShrine.gate.y + 280
    };

    moveNightShadowDirect(target.x, target.y, dt, (getEnemyDef().diveSpeed || 24.5) * 1.35);

    const ec = getEntityCenter(enemy);
    if (distanceBetweenPoints(ec.x, ec.y, target.x, target.y) < 70 || clearEventTimer > 2.2) {
      clearEventPhase = 1;
      clearEventTimer = 0;
      stopAudio(sounds.nightShadowFlap);
      enemy.x = target.x - enemy.width / 2;
      enemy.y = target.y - enemy.height / 2;
      enemyPath = [];
      enemyPathTimer = 0;
      showMessage("夜の影が鳥居の前に降り立った。");
    }
  } else if (clearEventPhase === 1) {
    // まず鳥居の中央を通る。
    const gateTargetX = mainShrine.gate.x + mainShrine.gate.width / 2;
    const gateTargetY = mainShrine.gate.y + 20;
    moveEnemyTowardPoint(gateTargetX, gateTargetY, dt, getEnemyDef().chaseSpeed + 2.4);

    const ec = getEntityCenter(enemy);
    if (distanceBetweenPoints(ec.x, ec.y, gateTargetX, gateTargetY) < 62 || clearEventTimer > 3.0) {
      clearEventPhase = 2;
      clearEventTimer = 0;
      enemyPath = [];
      enemyPathTimer = 0;
      showMessage(`${getEnemyDef().name}が鳥居をくぐった。`);
    }
  } else if (clearEventPhase === 2) {
    // その後、必ずキャラの目の前まで来る。
    const playerCenter = getEntityCenter(player);
    const face = getFacingDirection();
    const targetX = playerCenter.x + face.x * 60;
    const targetY = playerCenter.y + face.y * 60;

    moveEnemyTowardPoint(targetX, targetY, dt, ENEMY_CHASE_SPEED + 2.8);

    const ec = getEntityCenter(enemy);
    if (distanceBetweenPoints(ec.x, ec.y, targetX, targetY) < 70 || clearEventTimer > 5.0) {
      clearEventPhase = 3;
      clearEventTimer = 0;
      shrineFlashTimer = 0.72;
      stopAudio(sounds.heartbeat);
      heartbeatTimer = 999;
      showMessage("神社が一瞬まばゆく発光し、神域の力が怪異を縛る！");
    }
  } else if (clearEventPhase === 2.7) {
    const pc = getEntityCenter(player);
    enemyMode = "watcher_flurry";
    if (clearEventTimer < 2.8) {
      if (Math.floor(clearEventTimer * 12) !== Math.floor((clearEventTimer - dt) * 12)) {
        const p = findSafeEnemyWarpNearPoint(pc.x, pc.y, 180, 420, 40);
        if (p) { enemy.x = p.x; enemy.y = p.y; }
      }
      enemy.alpha = 1;
    } else {
      clearEventPhase = 3;
      clearEventTimer = 0;
      shrineFlashTimer = 0.72;
      showMessage("神域の力が監視者を縛り、無数の目がもがき苦しむ！");
    }
  } else if (clearEventPhase === 3) {
    // もがき苦しむ間、鼓動と接近演出を止める。
    stopAudio(sounds.heartbeat);
    stopAudio(sounds.field);
    heartbeatTimer = 999;
    gameViewport.style.setProperty("--danger-opacity", "0");
    gameViewport.style.transform = "translate(0,0)";

    if (currentEnemyType === "tracker" && enemyVoiceCooldown <= 0) {
      playOneShot(sounds.enemyVoice);
      enemyVoiceCooldown = 2.5;
    }

    enemy.alpha = Math.max(0, 1 - clearEventTimer / 2.2);
    if (currentEnemyType !== "watcher") {
      enemy.x += Math.sin(clearEventTimer * 22) * 4;
      enemy.y += Math.cos(clearEventTimer * 24) * 3;
    }

    if (clearEventTimer > 2.4) {
      clearEventPhase = 4;
      clearEventTimer = 0;
      enemy.visible = false;
      resultType = "clear";
      showMessage("怪異は消え、夜が更けていく。");
    }
  } else if (clearEventPhase === 4) {
    // クリア前演出は控えめにし、白フェードだけ挟む。
    if (clearEventTimer > 0.55 && whiteFadeOverlay && !whiteFadeOverlay.classList.contains("show")) {
      whiteFadeOverlay.classList.add("show");
    }

    if (clearEventTimer > 1.85) {
      showResult();
      if (clearCelebrationOverlay) clearCelebrationOverlay.classList.remove("show");
      if (whiteFadeOverlay) whiteFadeOverlay.classList.remove("show");
    }
  }

  updateCamera();
  updateSpriteAnimation(dt);
  updateOverlay(true);
  updatePromptAndMessages(dt);
  updateInventoryUI();
}


// ==============================
// プレイヤー
// ==============================

function handleSelectionKeys() {
  const before = selectedItemIndex;
  if (consumePress("1")) selectedItemIndex = 0;
  if (consumePress("2")) selectedItemIndex = 1;
  if (consumePress("3")) selectedItemIndex = 2;
  if (window.counterattack?.enabled && consumePress("4")) selectedItemIndex = 3;
  if (before !== selectedItemIndex) {
    updateInventoryUI();
  }
  if (consumePress("Shift")) {
    dropSelectedItem();
  }
}

function dropSelectedItem() {
  const itemId = itemInventory[selectedItemIndex];
  if (!itemId) return;

  cancelAim();
  selectedItemUseHold = 0;
  itemInventory[selectedItemIndex] = null;
  updateBuddhaGauge(false, 0);
  updateInventoryUI();
  showMessage(ITEM_NAMES[itemId] + " を捨てた。");
}

function handlePlayer(dt) {
  if (updateUgomeGroundBind(dt)) {
    return;
  }

  if (playerStunTimer > 0) {
    playerStunTimer = Math.max(0, playerStunTimer - dt);
    player.isMoving = false;
    isRunning = false;
    updateStamina(dt);
    return;
  }

  if (!player.canControl) {
    player.isMoving = false;
    isRunning = false;
    updateStamina(dt);
    return;
  }

  let mx = 0;
  let my = 0;

  if (mobileInputActive) {
    mx = mobileMoveX;
    my = mobileMoveY;
  } else if (!SMARTPHONE_ONLY) {
    if (keys["ArrowUp"] || keys["w"] || keys["W"] || keys["KeyW"] || keys["87"]) my -= 1;
    if (keys["ArrowDown"] || keys["s"] || keys["S"] || keys["KeyS"] || keys["83"]) my += 1;
    if (keys["ArrowLeft"] || keys["a"] || keys["A"] || keys["KeyA"] || keys["65"]) mx -= 1;
    if (keys["ArrowRight"] || keys["d"] || keys["D"] || keys["KeyD"] || keys["68"]) mx += 1;
  }

  const moveLength = Math.hypot(mx, my);
  if (moveLength > 1) {
    mx /= moveLength;
    my /= moveLength;
  }

  const movingInput = mx !== 0 || my !== 0;
  const runKeyDown = isRunKeyDown();

  // 入力イベント境界の短い途切れを吸収する猶予。
  // キーボード自体が送らない同時押し入力までは補完しない。
  if (runKeyDown) {
    runInputBuffer = 0.34;
    runAssistTimer = 0.34;
  } else {
    runInputBuffer = Math.max(0, runInputBuffer - dt);
    runAssistTimer = Math.max(0, runAssistTimer - dt);
  }

  if (!movingInput) {
    runInputBuffer = 0;
    runAssistTimer = 0;
  }

  const wantsRun = runKeyDown || runInputBuffer > 0 || runAssistTimer > 0;
  isRunning = movingInput && wantsRun && !isTired && stamina > 0;

  let speed = movementSlowTimer > 0 ? SLOWED_SPEED : Speed;
  const knifeSlowStacks = playerKnifeSlowTimers.length;
  if (knifeSlowStacks > 0) {
    speed *= Math.max(0.14, 1 - knifeSlowStacks * 0.26);
  }
  if (typeof bugAttachStacks !== "undefined" && bugAttachStacks > 0) {
    speed *= Math.max(0.55, 1 - bugAttachStacks * 0.12);
  }
  if (isTired) {
    speed *= TIRED_SPEED_MULTIPLIER;
  }
  if (isRunning) {
    speed *= RUN_SPEED_MULTIPLIER;
  }

  const frameSpeed = speed * 60 * dt;

  const beforeX = player.x;
  const beforeY = player.y;
  const intendedMoveX = mx * frameSpeed;
  const intendedMoveY = my * frameSpeed;
  moveEntity(player, intendedMoveX, intendedMoveY, false);

  const actualMoveX = player.x - beforeX;
  const actualMoveY = player.y - beforeY;
  player.isMoving = Math.abs(actualMoveX) > 0.01 || Math.abs(actualMoveY) > 0.01;

  if ((Math.abs(intendedMoveX) > 0.01 || Math.abs(intendedMoveY) > 0.01) &&
      (Math.abs(actualMoveX - intendedMoveX) > 1.2 || Math.abs(actualMoveY - intendedMoveY) > 1.2)) {
    playCollisionSound();
  }

  if (mx !== 0 || my !== 0) {
    player.lastMoveX = mx;
    player.lastMoveY = my;
  }

  if (movementSlowTimer > 0) movementSlowTimer -= dt;
  if (playerKnifeSlowTimers.length) {
    playerKnifeSlowTimers = playerKnifeSlowTimers.map(v => v - dt).filter(v => v > 0);
  }

  updateStamina(dt);
}

function updateStamina(dt) {
  if (isRunning) {
    if (staminaDrinkTimer <= 0 && !maxStaminaDrinkActive && !ultimateCheatActive) {
      stamina -= STAMINA_DRAIN_PER_SECOND * dt;
    }
    staminaVisibleTimer = 1.2;

    if (stamina <= 0) {
      stamina = 0;
      isTired = true;
      isRunning = false;
            staminaVisibleTimer = 2.0;
      showMessage("息が切れた。たいりょくが戻るまで走れない。");
    }
  } else {
    const recover = isTired ? STAMINA_TIRED_RECOVER_PER_SECOND : STAMINA_RECOVER_PER_SECOND;
    stamina += recover * dt;

    if (stamina >= STAMINA_MAX) {
      stamina = STAMINA_MAX;
      isTired = false;
    }

    if (staminaVisibleTimer > 0) {
      staminaVisibleTimer -= dt;
    }
  }

  updateStaminaGauge(isRunning || staminaVisibleTimer > 0 || isTired);
}

function updateStaminaGauge(show) {
  if (!staminaGauge || !staminaGaugeFill) return;

  const ratio = Math.max(0, Math.min(1, stamina / STAMINA_MAX));
  const shouldShow = !!show || isTired || ratio < 0.999;

  staminaGauge.classList.toggle("show", shouldShow);
  staminaGauge.classList.toggle("tired", !!isTired);

  // 両端から中央に向かって減るよう、中央基準の幅にする。
  staminaGaugeFill.style.width = (ratio * 100).toFixed(1) + "%";

  if (!isTired) {
    let red, green, blue, center;
    if (staminaDrinkTimer > 0) {
      red = 168;
      green = 255;
      blue = 96;
      center = "#f0ffd5";
    } else {
      // 最大は黄色、減るほど赤へ寄る。
      red = 255;
      green = Math.round(48 + 204 * ratio);
      blue = Math.round(30 - 15 * ratio);
      center = ratio > 0.78 ? "#fff7a8" : `rgb(${red}, ${green}, ${blue})`;
    }
    const core = `rgb(${red}, ${green}, ${blue})`;
    const shadowStrength = 0.48 + ratio * 0.42;

    staminaGaugeFill.style.setProperty("background", `linear-gradient(90deg, ${core}, ${center}, ${core})`, "important");
    staminaGaugeFill.style.setProperty(
      "box-shadow",
      `0 0 ${5 + ratio * 13}px rgba(${red}, ${green}, ${blue}, .96), 0 0 ${11 + ratio * 28}px rgba(${red}, ${green}, ${blue}, ${shadowStrength})`,
      "important"
    );
  }
}

function pulseStaminaGauge() {
  if (!staminaGauge || !staminaGaugeFill) return;

  // 心電図風に、中央線から急激に上下へ跳ねる折れ線形状を作る。
  const points = [
    "0% 50%",
    "7% 50%",
    "10% 44%",
    "13% 58%",
    "16% 48%",
    "20% 50%",
    "24% 50%",
    "27% 7%",
    "30% 94%",
    "33% 17%",
    "36% 78%",
    "39% 50%",
    "47% 50%",
    "50% 35%",
    "54% 63%",
    "59% 50%",
    "66% 50%",
    "70% 12%",
    "74% 88%",
    "78% 43%",
    "82% 56%",
    "88% 50%",
    "100% 50%"
  ];

  // 幅方向の上下を少しだけ毎回ずらして、完全な固定アニメに見えないようにする。
  const randomized = points.map((p, index) => {
    const [xPart, yPart] = p.split(" ");
    const y = parseFloat(yPart);
    if (index === 0 || index === points.length - 1) return p;
    const jitter = Math.round((Math.random() - 0.5) * 16);
    return `${xPart} ${Math.max(0, Math.min(100, y + jitter))}%`;
  });

  staminaGauge.style.setProperty("--stamina-chaos-x", `${Math.round((Math.random() - 0.5) * 18)}px`);
  staminaGauge.style.setProperty("--stamina-chaos-y", `${Math.round((Math.random() - 0.5) * 12)}px`);
  staminaGaugeFill.style.setProperty("--stamina-ecg-path", `polygon(${randomized.join(", ")})`);

  staminaGauge.classList.remove("heartbeat");
  void staminaGauge.offsetWidth;
  staminaGauge.classList.add("heartbeat");

  setTimeout(() => {
    if (staminaGauge) staminaGauge.classList.remove("heartbeat");
    if (staminaGaugeFill) staminaGaugeFill.style.removeProperty("--stamina-ecg-path");
  }, 760);
}


function playCollisionSound() {
  if (collisionSoundCooldown > 0) return;

  playOneShot(sounds.hit);
  collisionSoundCooldown = 0.22;
}

// ==============================
// インタラクション
// ==============================

function handleInteractions() {
  promptText = "";
  const target = getNearestInteractable();
  const inputLabel = "タップ";

  if (!target || target.distance >= 86) return;

  if (target.type === "box") {
    promptText = target.box.opened ? "開いたままだ…" : `${inputLabel}：どうぐ箱を調べる`;
  } else if (target.type === "keyBox") {
    promptText = target.box.opened ? "開いたままだ…" : `${inputLabel}：神具箱を開ける`;
  } else if (target.type === "fakeKeyBox") {
    promptText = target.box.opened ? "開いたままだ…" : `${inputLabel}：神具箱を開ける`;
  } else if (target.type === "looseItem") {
    promptText = `${inputLabel}：拾う`;
  } else if (target.type === "mainAltar") {
    promptText = `${inputLabel}：祭壇に奉納`;
  } else if (target.type === "smallShrine") {
    promptText = target.shrine.charged ? `${inputLabel}：社の力を使う` : "力は尽きている";
  }
}

function openBox(box) {
  box.opened = true;

  if (box.content === "empty") {
    showMessage("中は空だった。");
  } else if (box.content === "item") {
    const itemId = window.counterattack?.enabled ? window.counterattack.pickBoxItem() : NORMAL_ITEM_IDS[Math.floor(Math.random() * NORMAL_ITEM_IDS.length)];
    if (addItemToInventory(itemId)) {
      showMessage(`${ITEM_NAMES[itemId]} を手に入れた。`);
    } else {
      showMessage("持ち物がいっぱいだ。");
    }
  } else if (box.content === "trap_noise") {
    if (useOmamoriProtection("割れる音の罠")) return;
    playOneShot(sounds.break);
    forceEnemyInvestigatePoint(box.x + box.width / 2, box.y + box.height / 2, 5.5, 1.65, "trap_noise");
    showMessage("何かが落ちて割れた！怪異が音へ向かう。");
  } else if (box.content === "trap_web") {
    if (useOmamoriProtection("蜘蛛の糸")) return;
    movementSlowTimer = 7.0;
    triggerSpiderWebVfx();
    showMessage("大量の蜘蛛の糸が視界いっぱいに飛び出した！");
  } else if (box.content === "trap_steal") {
    if (useOmamoriProtection("ひったくり")) return;
    triggerSnatchVfx();
    stealRandomThing();
  }
}

function openKeyItemBox(box) {
  box.opened = true;
  box.flashTimer = 0.72;
  if (revealedKeyBoxId === box.id) {
    revealedKeyBoxId = null;
  }

  if (!useOmamoriProtection("神具箱の気配漏れ")) {
    revealPlayerPositionToEnemy(7.0, 1.75);
  }

  if (depositedKeys[box.keyId]) {
    updateInventoryUI();
    showMessage("中は空だった。");
    return;
  }

  keyInventory[box.keyId] = true;
  updateInventoryUI();
  lastMinimapDrawAt = 0;
  showMessage(`${ITEM_NAMES[box.keyId]} を手に入れた。${findOmamoriSlot() >= 0 ? "お守りが気配を抑えた。" : "怪異に居場所がばれた。"}`);
}

function ensureSpiderOverlayOnBody() {
  return document.body;
}

function triggerSpiderWebVfx() {
  // 既存DOMを流用せず、毎回body直下に専用オーバーレイを作る。
  // これでゲーム画面内のtransform/overflow/scaleの影響を受けない。
  const overlay = document.createElement("div");
  overlay.className = "spiderWebFullScreenVfx";
  overlay.setAttribute("aria-hidden", "true");
  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    overlay.classList.add("show");
  });

  setTimeout(() => {
    overlay.classList.remove("show");
    setTimeout(() => overlay.remove(), 260);
  }, 1850);
}

function triggerSnatchVfx() {
  playOneShot(sounds.snatch);

  if (!snatchOverlay) return;

  snatchOverlay.classList.remove("show");
  snatchOverlay.style.display = "none";
  snatchOverlay.style.opacity = "0";
  gameViewport.classList.remove("snatchShake");
  void snatchOverlay.offsetWidth;

  snatchOverlay.style.display = "block";
  snatchOverlay.style.opacity = "1";
  snatchOverlay.classList.add("show");
  gameViewport.classList.add("snatchShake");

  setTimeout(() => {
    snatchOverlay.classList.remove("show");
    snatchOverlay.style.opacity = "0";
    snatchOverlay.style.display = "none";
    gameViewport.classList.remove("snatchShake");
  }, 1300);
}

function triggerTrapCheat(type = "web") {
  const normalized = String(type).toLowerCase();

  if (normalized === "web" || normalized === "spider" || normalized === "蜘蛛" || normalized === "蜘蛛の糸") {
    if (useOmamoriProtection("蜘蛛の糸")) return "web-blocked";
    movementSlowTimer = 7.0;
    triggerSpiderWebVfx();
    showMessage("チート：蜘蛛の糸罠を発生させた。");
    return "web";
  }

  if (normalized === "noise" || normalized === "break" || normalized === "割れる" || normalized === "音") {
    if (useOmamoriProtection("割れる音の罠")) return "noise-blocked";
    playOneShot(sounds.break);
    const pc = getEntityCenter(player);
    forceEnemyInvestigatePoint(pc.x, pc.y, 5.5, 1.65, "trap_noise");
    showMessage("チート：割れる音の罠を発生させた。");
    return "noise";
  }

  if (normalized === "steal" || normalized === "snatch" || normalized === "ひったくり") {
    if (useOmamoriProtection("ひったくり")) return "steal-blocked";
    triggerSnatchVfx();
    stealRandomThing();
    showMessage("チート：ひったくり罠を発生させた。");
    return "steal";
  }

  console.warn("trap(type): type must be web / noise / steal");
  return null;
}

function depositAllKeysCheat() {
  for (const box of keyItemBoxes) box.opened = true;
  for (const keyId of KEY_ITEM_IDS) {
    keyInventory[keyId] = false;
    depositedKeys[keyId] = true;
  }
  updateInventoryUI();
  lastMinimapDrawAt = 0;
  showMessage("チート：全奉納後イベントへ強制移動する。");
  startClearEvent();
  return true;
}

function giveAllKeyItemsCheat() {
  for (const keyId of KEY_ITEM_IDS) {
    keyInventory[keyId] = true;
  }
  updateInventoryUI();
  showMessage("チート：神具をすべて入手した。");
}

function forceCaughtCheat() {
  startJumpscare(true);
}

function warpEnemyNearCheat() {
  const pc = getEntityCenter(player);
  const p = findSafeEnemyWarpNearPoint(pc.x, pc.y, 220, 420, 60) || findSafeEnemySpawn(0);
  enemy.x = p.x;
  enemy.y = p.y;
  enemyPath = [];
  enemyPathTimer = 0;
  showMessage("チート：怪異を近くに移動した。");
}

function giveItemCheat(itemId = "small_stone") {
  if (!CHEAT_ITEM_IDS.includes(itemId) && !window.counterattack?.acceptsItem(itemId)) {
    console.warn("Unknown itemId:", itemId);
    return false;
  }

  const ok = addItemToInventory(itemId);
  if (ok) {
    showMessage(`チート：${ITEM_NAMES[itemId]} を入手した。`);
  } else {
    showMessage("チート失敗：どうぐ欄がいっぱい。");
  }
  return ok;
}



function revealAllKeyBoxesCheat() {
  revealAllKeyBoxesOnMinimap = true;
  revealedKeyBoxId = null;
  lastMinimapDrawAt = 0;
  drawMinimapOptimized(performance.now(), true);
  showMessage("チート：未開封の神具箱をすべてミニマップに表示した。");
  console.log("未開封の神具箱をすべてミニマップに表示します。このゲーム中のみ有効です。");
  return keyItemBoxes.filter(box => !box.opened).map(box => ({ id: box.id, keyId: box.keyId, x: box.x, y: box.y }));
}

function setUltimateCheat() {
  ultimateCheatActive = true;
  playerInvincible = true;
  infiniteOmamoriActive = true;
  maxStaminaDrinkActive = true;
  eternalMagicMirrorActive = true;
  sacredBellRevealActive = true;
  staminaDrinkTimer = 999999;
  magicMirrorTimer = 999999;
  revealAllKeyBoxesOnMinimap = true;
  revealedKeyBoxId = null;
  lastMinimapDrawAt = 0;
  updateInventoryUI();
  drawMinimapOptimized(performance.now(), true);
  showMessage("チート：最強化した。");
  return true;
}

function clearUltimateCheat() {
  ultimateCheatActive = false;
  playerInvincible = false;
  infiniteOmamoriActive = false;
  maxStaminaDrinkActive = false;
  eternalMagicMirrorActive = false;
  sacredBellRevealActive = false;
  staminaDrinkTimer = 0;
  magicMirrorTimer = 0;
  revealAllKeyBoxesOnMinimap = false;
  revealedKeyBoxId = null;
  lastMinimapDrawAt = 0;
  updateInventoryUI();
  drawMinimapOptimized(performance.now(), true);
  showMessage("チート：最強化を解除した。");
  return true;
}

function setInvincibleCheat() {
  playerInvincible = true;
  showMessage("チート：このゲーム中、あなたは無敵になった。");
  console.log("無敵を有効化しました。このゲームが終わるか、horrorCheat.vulnerable() を実行するまで有効です。");
  return true;
}

function unsetInvincibleCheat() {
  playerInvincible = false;
  showMessage("チート：無敵を解除した。");
  console.log("無敵を解除しました。");
  return true;
}

function setNextEnemyCheat(enemyType = "tracker") {
  const id = String(enemyType || "").trim();
  if (!ENEMY_TYPES[id]) {
    console.warn("Unknown enemy type:", enemyType, "available:", Object.keys(ENEMY_TYPES));
    return false;
  }
  localStorage.setItem(STORAGE_KEYS.forceNextEnemy, id);
  console.log(`次回のみの怪異を ${ENEMY_TYPES[id].name} に固定した。`);
  return true;
}

window.horrorCheat = {
  trap: triggerTrapCheat,
  keyItems: giveAllKeyItemsCheat,
  depositAll: depositAllKeysCheat,
  "全奉納": depositAllKeysCheat,
  caught: forceCaughtCheat,
  enemyNear: warpEnemyNearCheat,
  item: giveItemCheat,
  revealKeyBoxes: revealAllKeyBoxesCheat,
  invincible: setInvincibleCheat,
  vulnerable: unsetInvincibleCheat,
  ultimate: setUltimateCheat,
  "最強化": setUltimateCheat,
  clearUltimate: clearUltimateCheat,
  "最強化解除": clearUltimateCheat,
  nextEnemy: setNextEnemyCheat,
  listItems: () => [...CHEAT_ITEM_IDS, ...(window.counterattack?.enabled ? ["seal_grenade", "stun_grenade", "seal_mine", "seal_launcher"] : [])],
  listEnemies: () => Object.keys(ENEMY_TYPES),
  help: () => ({
    "horrorCheat.help()": "チート一覧を返す",
    "console.table(horrorCheat.help())": "チート一覧を表で表示",
    "horrorCheat.listItems()": "どうぐID一覧",
    "horrorCheat.listEnemies()": "怪異ID一覧",
    'horrorCheat.trap("web")': "蜘蛛の糸罠",
    'horrorCheat.trap("noise")': "何かが割れる罠",
    'horrorCheat.trap("steal")': "ひったくり罠",
    'horrorCheat.keyItems()': "神具を全入手",
    'horrorCheat.depositAll()': "全神具を奉納し、全奉納後イベントへ移動",
    'horrorCheat["全奉納"]()': "全神具を奉納し、全奉納後イベントへ移動",
    'horrorCheat.caught()': "強制捕獲",
    'horrorCheat.enemyNear()': "怪異を近くへ移動",
    'horrorCheat.item("small_stone")': "任意どうぐ入手",
    'horrorCheat.item("infinite_omamori")': "幻の道具：無限のお守りを入手",
    'horrorCheat.item("max_stamina_drink")': "幻の道具：マックススタミナドリンクを入手",
    'horrorCheat.item("eternal_magic_mirror")': "幻の道具：永続の魔鏡を入手",
    'horrorCheat.item("sacred_matsuri_bell")': "幻の道具：神聖な祭鈴を入手",
    'horrorCheat.revealKeyBoxes()': "開いていない神具箱をすべてミニマップに表示",
    'horrorCheat.invincible()': "捕獲無効だけを有効化",
    'horrorCheat.vulnerable()': "捕獲無効を解除",
    'horrorCheat.ultimate()': "最強化",
    'horrorCheat["最強化"]()': "最強化",
    'horrorCheat.clearUltimate()': "最強化解除",
    'horrorCheat["最強化解除"]()': "最強化解除",
    'horrorCheat.nextEnemy("tracker")': "次回のみ追跡者に固定",
    'horrorCheat.nextEnemy("armed")': "次回のみ武装者に固定",
    'horrorCheat.nextEnemy("beast")': "次回のみ飢えし獣に固定",
    'horrorCheat.nextEnemy("bugmaster")': "次回のみ蟲使いに固定",
    'horrorCheat.nextEnemy("nightShadow")': "次回のみ夜の影に固定",
    'horrorCheat.nextEnemy("kaishutsubotsu")': "次回のみ怪出異没に固定",
    'horrorCheat.nextEnemy("miezaru")': "次回のみ見えざる者に固定",
    'horrorCheat.nextEnemy("watcher")': "次回のみ監視者に固定",
    'horrorCheat.nextEnemy("ugomekimono")': "次回のみ蠢く者に固定"
  })
};

function stealRandomThing() {
  const candidates = [];

  for (let i = 0; i < itemInventory.length; i++) {
    if (itemInventory[i]) candidates.push({ type: "item", slot: i, id: itemInventory[i] });
  }

  for (const keyId of KEY_ITEM_IDS) {
    if (keyInventory[keyId]) candidates.push({ type: "key", id: keyId });
  }

  if (candidates.length === 0) {
    showMessage("何かが飛び出したが、奪われるものはなかった。");
    return;
  }

  const picked = candidates[Math.floor(Math.random() * candidates.length)];

  if (picked.type === "item") {
    itemInventory[picked.slot] = null;
    updateInventoryUI();
    showMessage(`${ITEM_NAMES[picked.id]} をひったくられた！`);
  } else {
    keyInventory[picked.id] = false;

    const keyBox = keyItemBoxes.find(box => box.keyId === picked.id);
    if (keyBox && !depositedKeys[picked.id]) {
      keyBox.opened = false;
    }

    updateInventoryUI();
    lastMinimapDrawAt = 0;
    showMessage(`${ITEM_NAMES[picked.id]} を奪われ、元の箱へ戻ってしまった！`);
  }
}

function pickupLooseItem(item) {
  if (item.collected) return;

  if (item.type === "key") {
    keyInventory[item.id] = true;
    item.collected = true;
    updateInventoryUI();
    lastMinimapDrawAt = 0;
    showMessage(`${ITEM_NAMES[item.id]} を手に入れた。`);
  }
}

function depositKeysAtMainShrine() {
  let depositedAny = false;

  for (const keyId of KEY_ITEM_IDS) {
    if (keyInventory[keyId]) {
      keyInventory[keyId] = false;
      depositedKeys[keyId] = true;
      depositedAny = true;
    }
  }

  if (!depositedAny) {
    showMessage("奉納するものがない。");
    return;
  }

  updateInventoryUI();
  lastMinimapDrawAt = 0;
  restoreAllShrines();
  showMessage("神具を祭壇に納めた。すべての社の力が戻った。");

  if (getDepositedCount() < 5) {
    warpEnemyToNonStuckPoint("offering");
  }

  if (getDepositedCount() >= 5) {
    startClearEvent();
  }
}

// ==============================
// どうぐ使用
// ==============================

function handleSelectedItemUse(dt) {
  if (window.counterattack?.handleUse(dt)) return;
  const itemId = itemInventory[selectedItemIndex];
  const useDown = isUseDown();
  const usePressed = consumeUsePress();

  if (!itemId) {
    cancelAim();
    selectedItemUseHold = 0;
    updateBuddhaGauge(false, 0);
    return;
  }

  if (itemId === "small_stone" || itemId === "firecrackers") {
    updateBuddhaGauge(false, 0);
    handleThrowAim(itemId, useDown);
    return;
  }

  cancelAim();

  if (itemId === "small_buddha") {
    selectedItemUseHold = useDown ? selectedItemUseHold + dt : 0;
    updateBuddhaGauge(useDown, selectedItemUseHold / 3.0);

    if (selectedItemUseHold >= 3.0) {
      warpToMainShrine();
      consumeSelectedItem();
      selectedItemUseHold = 0;
      updateBuddhaGauge(false, 0);
    }

    return;
  }

  if (itemId === "tattered_talisman" && usePressed) {
    forceEnemyLosePlayerFromTalisman();
    consumeSelectedItem();
    updateBuddhaGauge(false, 0);
    return;
  }

  if (itemId === "magic_mirror" && usePressed) {
    useMagicMirror();
    consumeSelectedItem();
    updateBuddhaGauge(false, 0);
    return;
  }

  if (itemId === "stamina_drink" && usePressed) {
    useStaminaDrink();
    consumeSelectedItem();
    updateBuddhaGauge(false, 0);
    return;
  }

  if (itemId === "omamori" && usePressed) {
    showMessage(`お守りは脅威を自動で防ぐ。残り${omamoriCharges || 10}回。`);
    updateBuddhaGauge(false, 0);
    return;
  }

  if (itemId === "infinite_omamori" && usePressed) {
    infiniteOmamoriActive = true;
    showMessage("無限のお守りの加護が宿った。捕まるまで何度でも災いを防ぐ。");
    consumeSelectedItem();
    updateBuddhaGauge(false, 0);
    return;
  }

  if (itemId === "max_stamina_drink" && usePressed) {
    maxStaminaDrinkActive = true;
    staminaDrinkTimer = 999999;
    showMessage("マックススタミナドリンクを飲んだ。捕まるまでスタミナが減らない。");
    consumeSelectedItem();
    updateBuddhaGauge(false, 0);
    return;
  }

  if (itemId === "eternal_magic_mirror" && usePressed) {
    eternalMagicMirrorActive = true;
    magicMirrorTimer = 999999;
    showMessage("永続の魔鏡が怪異の気配を映し続ける。");
    consumeSelectedItem();
    updateBuddhaGauge(false, 0);
    return;
  }

  if (itemId === "sacred_matsuri_bell" && usePressed) {
    sacredBellRevealActive = true;
    revealAllKeyBoxesOnMinimap = true;
    revealedKeyBoxId = null;
    lastMinimapDrawAt = 0;
    drawMinimapOptimized(performance.now(), true);
    playOneShot(sounds.matsuriBell);
    revealPlayerPositionToEnemy(7.0, 1.65);
    showMessage("神聖な祭鈴が、全ての未開封神具箱を示した。");
    consumeSelectedItem();
    updateBuddhaGauge(false, 0);
    return;
  }

  updateBuddhaGauge(false, 0);

  if (usePressed && itemId === "matsuri_bell") {
    useMatsuriBell();
    consumeSelectedItem();
    return;
  }

  if (usePressed && itemId === "saisen_coin") {
    if (canUseSaisenAtMainAltar()) {
      restoreAllShrines();
      resetOpenedStorageBoxes(false);
      consumeSelectedItem();
      showMessage("賽銭を納め、力を失っていた社が回復し、どうぐ箱も閉じた。");
    } else {
      showMessage("賽銭は神社の祭壇前でしか使えない。");
    }
  }
}


function forceEnemyLosePlayerFromTalisman() {
  enemyPath = [];
  enemyPathTimer = 0;
  enemyWanderTarget = findWanderTarget();
  enemyMode = "wander";
  enemyLurePoint = null;
  enemyLostSightTimer = 0;
  enemyWasSeeingPlayer = false;
  enemyVoiceCooldown = 0;

  beastHasScent = false;
  beastScentLostTimer = 0;
  beastRushTimer = 0;
  beastTargetPoint = null;
  stopAudio(sounds.beastSniff);
  beastSniffAudioActive = false;

  bugRevealTimer = 0;
  if (currentEnemyType === "nightShadow" && nightShadowState === "ground") {
    returnNightShadowToSky();
  }

  if (currentEnemyType === "kaishutsubotsu") {
    kaishutsubotsuRushTarget = null;
    kaishutsubotsuRushTimer = 0;
    kaishutsubotsuRushCooldown = Math.max(kaishutsubotsuRushCooldown, 12.0);
  }

  if (currentEnemyType === "miezaru") {
    miezaruWarpTimer = Math.max(miezaruWarpTimer, 8.0);
  }

  showMessage("ボロボロのお札が裂け、怪異はあなたを見失った。");
}

function revealPlayerPositionToEnemy(timer = 6.0, speedMultiplier = 1.5) {
  const pc = getEntityCenter(player);

  if (currentEnemyType === "watcher") {
    // 監視者本体は地面に張り付いて動かない。居場所がばれても本体は誘導移動しない。
    enemyLurePoint = null;
    enemyPath = [];
    enemyPathTimer = 0;
    enemyLostSightTimer = 0;
    enemyMode = "watch";
    watcherPhantomTimer = Math.min(watcherPhantomTimer, 1.2);
    watcherObjectPhantomTimer = Math.min(watcherObjectPhantomTimer, 1.4);
    return;
  }

  if (currentEnemyType === "nightShadow") {
    // 夜の影は居場所がばれたら、地上誘導ではなく即座に急降下準備へ入る。
    enemyLurePoint = null;
    enemyPath = [];
    enemyPathTimer = 0;
    nightShadowComboActive = false;
    nightShadowDiveComboRemaining = 0;
    nightShadowComboPassPoint = null;
    nightShadowPassedStrikePoint = false;
    beginNightShadowDive(pc, "revealed");
    return;
  }

  enemyLurePoint = {
    x: pc.x,
    y: pc.y,
    timer,
    speedMultiplier
  };

  enemyLostSightTimer = 2.0;
  enemyMode = "investigate";
  enemyPath = [];
  enemyPathTimer = 0;

  if (currentEnemyType === "tracker" && enemyVoiceCooldown <= 0) {
    playOneShot(sounds.enemyVoice);
    enemyVoiceCooldown = 4.0;
  }
}


function useMagicMirror() {
  magicMirrorTimer = 60.0;
  showMessage("魔鏡が怪異の位置をミニマップに映し出した。");
}

function useStaminaDrink() {
  staminaDrinkTimer = 60.0;
  showMessage("スタミナドリンクを飲み、しばらくの間たいりょくが減らなくなった。");
}

function useMatsuriBell() {
  playOneShot(sounds.matsuriBell);

  const target = findNearestUnopenedKeyItemBox();

  if (!target) {
    showMessage("祭鈴を鳴らしたが、反応はない。");
  } else {
    revealedKeyBoxId = target.id;
    showMessage("祭鈴が、近くの封じられた箱の気配を示した。");
  }

  revealPlayerPositionToEnemy(7.0, 1.65);
}

function findNearestUnopenedKeyItemBox() {
  const pc = getEntityCenter(player);
  let best = null;

  for (const box of keyItemBoxes) {
    if (box.opened) continue;

    const d = distanceBetweenPoints(pc.x, pc.y, box.x + box.width / 2, box.y + box.height / 2);
    if (!best || d < best.distance) {
      best = { ...box, distance: d };
    }
  }

  return best;
}

function handleThrowAim(itemId, useDown) {
  if (useDown && !aimState.active) {
    aimState.active = true;
    aimState.itemId = itemId;
    aimState.slotIndex = selectedItemIndex;
    const dir = getCurrentAimDirection();
    aimState.dirX = dir.x;
    aimState.dirY = dir.y;
  }

  if (aimState.active && useDown) {
    const dir = getCurrentAimDirection();
    aimState.dirX = dir.x;
    aimState.dirY = dir.y;
    updateAimGuide();
  }

  if (aimState.active && !useDown) {
    if (aimState.slotIndex === selectedItemIndex && itemInventory[selectedItemIndex] === aimState.itemId) {
      throwProjectile(aimState.itemId === "small_stone" ? "stone" : "firecracker", aimState.dirX, aimState.dirY);
    }
    cancelAim();
  }
}

function getThrowOrigin() {
  const dir = getFacingDirection();
  return {
    x: player.x + player.width / 2 + dir.x * 20,
    y: player.y + player.height / 2 - 4 + dir.y * 20
  };
}

function updateAimGuide() {
  if (!aimState.active) return;

  const origin = getThrowOrigin();
  const stageRect = cameraStage.getBoundingClientRect();
  const viewportRect = gameViewport.getBoundingClientRect();
  // getBoundingClientRect() reflects the iPhone fit scale. aimGuide itself is
  // positioned in the game's unscaled 1120x720 coordinate system, so convert
  // the measured offsets back into logical game pixels.
  const viewportScaleX = gameViewport.offsetWidth > 0 ? viewportRect.width / gameViewport.offsetWidth : 1;
  const viewportScaleY = gameViewport.offsetHeight > 0 ? viewportRect.height / gameViewport.offsetHeight : 1;
  const stageOffsetX = (stageRect.left - viewportRect.left) / Math.max(0.0001, viewportScaleX);
  const stageOffsetY = (stageRect.top - viewportRect.top) / Math.max(0.0001, viewportScaleY);
  const sx = stageOffsetX + origin.x - cameraX;
  const sy = stageOffsetY + origin.y - cameraY;
  const angle = Math.atan2(aimState.dirY, aimState.dirX);

  aimGuide.style.display = "block";
  aimGuide.style.left = sx + "px";
  aimGuide.style.top = sy + "px";
  aimGuide.style.transform = `translateY(-50%) rotate(${angle}rad)`;
}

function cancelAim() {
  aimState.active = false;
  aimState.itemId = null;
  aimState.slotIndex = -1;
  aimGuide.style.display = "none";
  updateBuddhaGauge(false, 0);
  trapVfxTimer = 0;
  spiderWebOverlay.classList.remove("show");
  snatchOverlay.classList.remove("show");
  gameViewport.classList.remove("snatchShake");
}

function throwProjectile(kind, dirX, dirY) {
  const origin = getThrowOrigin();
  const len = Math.max(0.001, Math.sqrt(dirX * dirX + dirY * dirY));
  const dx = dirX / len;
  const dy = dirY / len;

  if (kind === "stone") {
    projectiles.push({
      kind,
      x: origin.x,
      y: origin.y,
      vx: dx * 540,
      vy: dy * 540,
      timer: 1.0
    });
    consumeSelectedItem();
    showMessage("小石を投げた。");
  } else if (kind === "firecracker") {
    projectiles.push({
      kind,
      x: origin.x,
      y: origin.y,
      vx: dx * 420,
      vy: dy * 420,
      timer: 1.0
    });
    consumeSelectedItem();
    showMessage("爆竹を投げた。");
  }
}

function isProjectileHittingEnemy(projectile, radius) {
  if (projectile.kind === "stone" && (currentEnemyType === "miezaru" || currentEnemyType === "ugomekimono")) return false;
  if (!enemy.visible || gameState === "clearEvent") return false;

  const ec = getEntityCenter(enemy);
  if (distanceBetweenPoints(projectile.x, projectile.y, ec.x, ec.y) <= radius) return true;

  const rect = getCollisionRect(enemy, enemy.x, enemy.y);
  return projectile.x >= rect.left - 18 &&
         projectile.x <= rect.right + 18 &&
         projectile.y >= rect.top - 18 &&
         projectile.y <= rect.bottom + 18;
}

function updateProjectiles(dt) {
  for (let i = projectiles.length - 1; i >= 0; i--) {
    const p = projectiles[i];

    p.timer -= dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;

    if (p.kind === "stone" && isProjectileHittingEnemy(p, 96)) {
      enemyStunTimer = 3.8;
      enemyPath = [];
      enemyPathTimer = 0;
      enemyLurePoint = null;
      showMessage("小石が怪異に当たり、数秒だけ動きが止まった！");
      projectiles.splice(i, 1);
      continue;
    }

    if (p.timer <= 0 || collidesWithWorldPoint(p.x, p.y)) {
      if (p.kind === "stone") {
        forceEnemyInvestigatePoint(p.x, p.y, 7.0, 1.45, "stone");
        showMessage("小石の着弾音に、怪異が反応した。");
      } else if (p.kind === "firecracker") {
        firecrackerLures.push({ x: p.x, y: p.y, timer: 14.0 });
        forceEnemyInvestigatePoint(p.x, p.y, 14.0, 1.85, "firecracker");
        showMessage("爆竹が鳴り始めた！怪異が強制的に爆竹へ向かう。");
      }

      projectiles.splice(i, 1);
    }
  }

  for (let i = firecrackerLures.length - 1; i >= 0; i--) {
    firecrackerLures[i].timer -= dt;
    if (firecrackerLures[i].timer <= 0) firecrackerLures.splice(i, 1);
  }

}

function updateBuddhaGauge(show, ratio) {
  if (!buddhaGauge || !buddhaGaugeFill) return;

  if (!show) {
    buddhaGauge.classList.remove("show");
    buddhaGaugeFill.style.width = "0%";
    return;
  }

  const percent = Math.max(0, Math.min(100, ratio * 100));
  buddhaGauge.classList.add("show");
  buddhaGaugeFill.style.width = percent.toFixed(1) + "%";
}


function updateUgomeEscapeGauge(show, ratio) {
  if (!ugomeEscapeGauge || !ugomeEscapeGaugeFill) return;
  if (!show) {
    ugomeEscapeGauge.classList.remove("show");
    ugomeEscapeGaugeFill.style.width = "0%";
    return;
  }
  const percent = Math.max(0, Math.min(100, ratio * 100));
  ugomeEscapeGauge.classList.add("show");
  ugomeEscapeGaugeFill.style.width = percent.toFixed(1) + "%";
}

function warpToMainShrine() {
  player.x = mainShrine.entryZone.x + mainShrine.entryZone.width / 2 - player.width / 2;
  player.y = mainShrine.entryZone.y + mainShrine.entryZone.height / 2 - player.height / 2;
  showMessage("仏像の力で神社へ転移した。");
}

// ==============================
// 社
// ==============================

function findSafeEnemyWarpNearPoint(centerX, centerY, minDistance = 180, maxDistance = 520, attempts = 36) {
  for (let i = 0; i < attempts; i++) {
    const a = Math.random() * Math.PI * 2;
    const d = randomRange(minDistance, maxDistance);
    const x = clamp(centerX + Math.cos(a) * d - enemy.width / 2, 80, WORLD_WIDTH - enemy.width - 80);
    const y = clamp(centerY + Math.sin(a) * d - enemy.height / 2, 80, WORLD_HEIGHT - enemy.height - 80);
    const c = { x: x + enemy.width / 2, y: y + enemy.height / 2 };
    if (isPointInAnySanctuary(c)) continue;
    if (isCollidingWithObstacle(enemy, x, y, true)) continue;
    return { x, y };
  }
  return null;
}

function getFarthestEnemyTeleportPoint() {
  const pc = getEntityCenter(player);
  const options = [
    { x: 7000, y: 4300 },
    { x: 700, y: 700 },
    { x: 6800, y: 800 },
    { x: 700, y: 4100 },
    { x: 7150, y: 2500 },
    { x: 1300, y: 2500 }
  ];
  let best = null;
  let bestD = -1;
  for (const p of options) {
    const x = clamp(p.x, 80, WORLD_WIDTH - enemy.width - 80);
    const y = clamp(p.y, 80, WORLD_HEIGHT - enemy.height - 80);
    const c = { x: x + enemy.width / 2, y: y + enemy.height / 2 };
    if (isPointInAnySanctuary(c)) continue;
    if (isCollidingWithObstacle(enemy, x, y, true)) continue;
    const d = distanceBetweenPoints(pc.x, pc.y, c.x, c.y);
    if (d > bestD) { bestD = d; best = { x, y }; }
  }
  return best || findSafeEnemySpawn(0);
}

function resetEnemyAwarenessByShrinePower() {
  enemyPath = [];
  enemyPathTimer = 0;
  enemyWanderTarget = findWanderTarget();
  enemyMode = "wander";
  enemyLurePoint = null;
  enemyLostSightTimer = 0;
  enemyWasSeeingPlayer = false;
  enemyVoiceCooldown = 0;

  beastHasScent = false;
  beastScentLostTimer = 0;
  beastRushTimer = 0;
  beastTargetPoint = null;
  stopAudio(sounds.beastSniff);
  beastSniffAudioActive = false;

  if (currentEnemyType === "bugmaster") {
    bugRevealTimer = 0;
    bugAttachStacks = 0;
    bugEscapeProgress = 0;
    for (const swarm of bugSwarmAgents) {
    if (swarm.counterDead) continue;
      if (!swarm) continue;
      swarm.state = "free";
      swarm.respawnTimer = 0;
      const route = BUG_SWARM_PATROL_ROUTES[swarm.routeIndex % BUG_SWARM_PATROL_ROUTES.length];
      const start = route[0];
      swarm.x = start.x;
      swarm.y = start.y;
      swarm.waypointIndex = 1 % route.length;
      swarm.targetX = route[swarm.waypointIndex].x;
      swarm.targetY = route[swarm.waypointIndex].y;
    }
  }

  if (currentEnemyType === "nightShadow") {
    nightShadowState = "ground";
    nightShadowGroundTimer = 0;
    nightShadowLastKnownPoint = null;
    stopAudio(sounds.nightShadowFlap);
    enemy.visible = true;
    enemy.alpha = 1;
  }
  if (currentEnemyType === "kaishutsubotsu") {
    kaishutsubotsuRushTimer = 0;
    kaishutsubotsuRushTarget = null;
    kaishutsubotsuNearWarpTimer = randomRange(getEnemyDef().nearWarpMin || 2.8, getEnemyDef().nearWarpMax || 4.4);
    kaishutsubotsuRushCooldown = randomRange(getEnemyDef().initialRushDelayMin || 50.0, getEnemyDef().initialRushDelayMax || 75.0);
  }
}


function activateSmallShrine(shrine) {
  if (!shrine.charged) {
    showMessage("この社の力は尽きている。");
    return;
  }

  shrine.charged = false;
  shrine.exhausted = true;

  resetOpenedStorageBoxes();

  const far = getFarthestEnemyTeleportPoint();
  enemy.x = far.x;
  enemy.y = far.y;
  resetEnemyAwarenessByShrinePower();

  showMessage("社の力が爆ぜ、怪異はあなたを見失い、遠くへ吹き飛ばされた！");
}


function randomStorageBoxContent() {
  const pool = [
    "empty", "empty", "empty", "empty", "empty", "empty",
    "item", "item", "item", "item", "item", "item", "item", "item",
    "trap_noise", "trap_noise", "trap_web", "trap_web", "trap_steal", "trap_steal"
  ];
  return pool[Math.floor(Math.random() * pool.length)];
}

function resetOpenedStorageBoxes(showText = true) {
  let changed = 0;
  for (const box of boxes) {
    if (box.opened) {
      box.content = randomStorageBoxContent();
      changed++;
    }
    box.opened = false;
  }
  if (showText) {
    showMessage(changed > 0
      ? "社の力で、開いていたどうぐ箱が閉じ、中身も補充された。"
      : "社の力で、どうぐ箱が閉じた。");
  }
}

function restoreAllShrines() {
  for (const shrine of shrines) {
    shrine.charged = true;
    shrine.exhausted = false;
  }
}

function playClearEventEnemySound() {
  const def = getEnemyDef();
  let audio = null;
  if (currentEnemyType === "tracker") audio = sounds.enemyVoice;
  else if (currentEnemyType === "armed") audio = sounds.armedMove;
  else if (currentEnemyType === "beast") audio = sounds.beastDetect;
  else if (currentEnemyType === "bugmaster") audio = sounds.bugmasterDetect;
  else if (currentEnemyType === "nightShadow") audio = sounds.nightShadowCry;
  else if (currentEnemyType === "kaishutsubotsu") audio = sounds.kaishutsubotsu;
  else if (currentEnemyType === "miezaru") audio = sounds.miezaru;
  else if (currentEnemyType === "watcher") audio = sounds.watcher;
  else if (currentEnemyType === "ugomekimono") audio = sounds.ugomekimonoMove;
  else if (def.captureSfx && sounds[def.captureSfx]) audio = sounds[def.captureSfx];

  if (!audio) return;
  try {
    audio.currentTime = 0;
    setAudioVolume(audio, getMasterVolume() * getSeVolume());
    audio.play().catch(() => {});
    if (audio.loop) setTimeout(() => stopAudio(audio), 1800);
  } catch (e) {}
}

function startClearEvent(skipEnemySound = false) {
  gameState = "clearEvent";
  clearEventPhase = 0;
  clearEventTimer = 0;
  player.canControl = false;
  enemyCanEnterSanctuary = true;
  stopAudio(sounds.field);
  if (!skipEnemySound) playClearEventEnemySound();
  showMessage("祭壇の力が満ちる――");
}

// ==============================
// インベントリ
// ==============================

function findOmamoriSlot() {
  return itemInventory.findIndex(id => id === "omamori");
}

function useOmamoriProtection(threatName = "脅威") {
  if (infiniteOmamoriActive || ultimateCheatActive) {
    showMessage("無限のお守りが災いを防いだ。");
    return true;
  }

  if (playerInvincible) {
    showMessage(`無敵状態のため、${threatName}を受け付けない。`);
    return true;
  }

  const slot = findOmamoriSlot();
  if (slot < 0) return false;

  if (omamoriCharges <= 0) omamoriCharges = 10;
  omamoriCharges -= 1;

  if (omamoriCharges <= 0) {
    itemInventory[slot] = null;
    omamoriCharges = 0;
    showMessage(`お守りが${threatName}を防ぎ、力を使い果たした。`);
  } else {
    showMessage(`お守りが${threatName}を防いだ。残り${omamoriCharges}回。`);
  }

  updateInventoryUI();
  return true;
}

function addItemToInventory(itemId) {
  for (let i = 0; i < itemInventory.length; i++) {
    if (itemInventory[i] === null) {
      itemInventory[i] = itemId;
      if (itemId === "omamori") omamoriCharges = Math.max(omamoriCharges, 10);
      updateInventoryUI();
      return true;
    }
  }
  return false;
}

function consumeSelectedItem() {
  if (itemInventory[selectedItemIndex] === "omamori") omamoriCharges = 0;
  itemInventory[selectedItemIndex] = null;
  updateInventoryUI();
}

function updateInventoryUI() {
  itemSlots.forEach((slot, i) => {
    slot.classList.remove("filled", "selected");
    slot.style.backgroundImage = "";

    if (i === selectedItemIndex) slot.classList.add("selected");

    const itemId = itemInventory[i];
    if (itemId) {
      slot.classList.add("filled");
      slot.style.backgroundImage = `url(${imageSources[itemId]})`;
    }
  });

  keySlots.forEach((slot) => {
    const keyId = slot.dataset.key;

    slot.classList.remove("filled", "deposited");
    slot.style.backgroundImage = "";

    if (keyInventory[keyId] || depositedKeys[keyId]) {
      slot.classList.add("filled");
      slot.style.backgroundImage = `url(${imageSources[keyId]})`;
    }

    if (depositedKeys[keyId]) slot.classList.add("deposited");
  });

  const itemId = itemInventory[selectedItemIndex];
  const itemLabel = itemId === "omamori" ? `${ITEM_NAMES[itemId]}（残り${omamoriCharges || 10}回）` : (itemId ? ITEM_NAMES[itemId] : "");
  selectedItemName.textContent = itemId ? `選択中：${itemLabel}` : "選択中：なし";

  window.counterattack?.updateHud();
  updateTouchUseButtonIcon();
  if (gameState === "pause") updatePauseMenu();
}

function updatePauseMenu() {
  pauseItems.innerHTML = "";
  pauseKeys.innerHTML = "";

  for (let i = 0; i < itemInventory.length; i++) {
    const itemId = itemInventory[i];
    const div = document.createElement("div");
    div.className = "pauseItem";

    if (itemId) {
      div.style.backgroundImage = `url(${imageSources[itemId]})`;
      const span = document.createElement("span");
      span.textContent = itemId === "omamori" ? `${ITEM_NAMES[itemId]} 残り${omamoriCharges || 10}` : ITEM_NAMES[itemId];
      div.appendChild(span);
    }

    pauseItems.appendChild(div);
  }

  for (const keyId of KEY_ITEM_IDS) {
    const div = document.createElement("div");
    div.className = "pauseItem";

    if (keyInventory[keyId] || depositedKeys[keyId]) {
      div.style.backgroundImage = `url(${imageSources[keyId]})`;
      const span = document.createElement("span");
      span.textContent = ITEM_NAMES[keyId];
      div.appendChild(span);
    }

    pauseKeys.appendChild(div);
  }
}

function getCollectedKeyCount() {
  return KEY_ITEM_IDS.filter(keyId => keyInventory[keyId] || depositedKeys[keyId]).length;
}


function getSecuredKeyCount() {
  let count = 0;
  for (const keyId of KEY_ITEM_IDS) {
    if (keyInventory[keyId] || depositedKeys[keyId]) count++;
  }
  return count;
}

function isFinalForm() {
  // Normal mode keeps the four-sacred-item trigger. In counterattack mode,
  // the enemy enters its final form once its body life falls to half or below.
  if (window.counterattack?.enabled && typeof window.counterattack.isBodyFinalForm === "function") {
    return window.counterattack.isBodyFinalForm();
  }
  return getSecuredKeyCount() >= 4;
}

function isFourKeyPhase() {
  return isFinalForm();
}

function getClearRankByTime(time) {
  if (time <= 180) return "評価：神域を駆け抜けた";
  if (time <= 300) return "評価：俊足の生還者";
  if (time <= 480) return "評価：冷静な生還者";
  if (time <= 720) return "評価：夜明け前の帰還者";
  return "評価：恐怖を耐え抜いた";
}

function getGameOverRankByProgress() {
  const collected = getCollectedKeyCount();
  const deposited = getDepositedCount();
  const score = collected + deposited * 2;

  if (deposited >= 4) return "評価：あと一歩で夜を越えた";
  if (deposited >= 2) return "評価：神域に近づいた者";
  if (collected >= 4) return "評価：神具を抱えた迷い子";
  if (score >= 3) return "評価：抗った痕跡あり";
  if (collected >= 1) return "評価：恐怖の入口に触れた";
  return "評価：何も掴めぬまま消えた";
}

function getDepositedCount() {
  let count = 0;
  for (const keyId of KEY_ITEM_IDS) {
    if (depositedKeys[keyId]) count++;
  }
  return count;
}

// ==============================
// 怪異
// ==============================

function getEnemyStuckProfile() {
  if (currentEnemyType === "ugomekimono" || currentEnemyType === "watcher" || currentEnemyType === "nightShadow") {
    return { enabled: false, moveThreshold: 0, timeThreshold: Infinity };
  }

  const slowProfiles = {
    armed: { moveThreshold: 0.55, timeThreshold: 7.5 },
    bugmaster: { moveThreshold: 0.35, timeThreshold: 7.8 },
    miezaru: { moveThreshold: 0.30, timeThreshold: 9.0 },
    kaishutsubotsu: { moveThreshold: 0.55, timeThreshold: 8.5 },
    beast: { moveThreshold: 0.75, timeThreshold: 5.8 }
  };

  return slowProfiles[currentEnemyType] || { moveThreshold: 2.0, timeThreshold: 2.2 };
}

function updateEnemyStuckMonitor(dt) {
  if (window.counterattack?.isStunned(enemy)) {
    enemyStuckTimer = 0; enemyLastX = enemy.x; enemyLastY = enemy.y; return;
  }
  if (gameState !== "playing") return;

  if (enemyWarpCooldown > 0) {
    enemyWarpCooldown -= dt;
  }

  const moved = distanceBetweenPoints(enemy.x, enemy.y, enemyLastX, enemyLastY);
  const profile = getEnemyStuckProfile();

  const shouldMove =
    profile.enabled !== false &&
    (enemyMode === "chase" || enemyMode === "investigate" || enemyMode === "wander");

  if (shouldMove && moved < profile.moveThreshold && enemyStunTimer <= 0) {
    enemyStuckTimer += dt;
  } else {
    enemyStuckTimer = 0;
  }

  enemyLastX = enemy.x;
  enemyLastY = enemy.y;

  if (enemyStuckTimer >= profile.timeThreshold && enemyWarpCooldown <= 0) {
    warpEnemyFromStuck();
  }
}

function warpEnemyFromStuck() {
  const target = findEnemyRecoveryWarpPoint();

  enemy.x = target.x;
  enemy.y = target.y;
  enemyPath = [];
  enemyPathTimer = 0;
  enemyWanderTarget = null;
  enemyLurePoint = null;
  enemyStuckTimer = 0;
  enemyWarpCooldown = 5.0;
  enemyMode = "wander";
  enemyLastX = enemy.x;
  enemyLastY = enemy.y;

  showMessage("遠くで気配が歪んだ……");
}

function findEnemyRecoveryWarpPoint() {
  const pc = getEntityCenter(player);

  const candidates = [
    { x: pc.x + 900, y: pc.y + 420 },
    { x: pc.x - 900, y: pc.y + 420 },
    { x: pc.x + 900, y: pc.y - 420 },
    { x: pc.x - 900, y: pc.y - 420 },
    { x: 6900, y: 4300 },
    { x: 7200, y: 1450 },
    { x: 900, y: 900 },
    { x: 7200, y: 3300 }
  ];

  for (const c of candidates) {
    const x = clamp(c.x, 120, WORLD_WIDTH - enemy.width - 120);
    const y = clamp(c.y, 120, WORLD_HEIGHT - enemy.height - 120);

    if (distanceBetweenPoints(x, y, player.x, player.y) < 550) continue;
    if (isCollidingWithObstacle(enemy, x, y, true)) continue;

    return { x, y };
  }

  return findSafeEnemySpawn();
}


function bugSwarmRect(x, y, radius = 30) {
  return {
    left: x - radius,
    top: y - radius,
    right: x + radius,
    bottom: y + radius
  };
}

function rectFromPlain(r) {
  return {
    left: r.x,
    top: r.y,
    right: r.x + r.width,
    bottom: r.y + r.height
  };
}

function isBugSwarmBlockedAt(x, y) {
  if (x < 70 || y < 70 || x > WORLD_WIDTH - 70 || y > WORLD_HEIGHT - 70) return true;

  const rect = bugSwarmRect(x, y, 30);

  if (mainShrine && rectsOverlap(rect, rectFromPlain(mainShrine))) return true;

  for (const shrine of shrines) {
    if (rectsOverlap(rect, rectFromPlain(shrine))) return true;
  }

  return false;
}

function getBugSwarmRoutePoint(swarm) {
  const route = BUG_SWARM_PATROL_ROUTES[swarm.routeIndex % BUG_SWARM_PATROL_ROUTES.length];
  return route[swarm.waypointIndex % route.length];
}

function advanceBugSwarmRoute(swarm) {
  const route = BUG_SWARM_PATROL_ROUTES[swarm.routeIndex % BUG_SWARM_PATROL_ROUTES.length];
  swarm.waypointIndex = (swarm.waypointIndex + 1) % route.length;
  const next = getBugSwarmRoutePoint(swarm);
  swarm.targetX = next.x;
  swarm.targetY = next.y;
}

function moveBugSwarmToward(swarm, targetX, targetY, speed, dt) {
  if (swarm.counterDead || window.counterattack?.isStunned(swarm)) return;
  const dx = targetX - swarm.x;
  const dy = targetY - swarm.y;
  const len = Math.max(1, Math.hypot(dx, dy));
  const step = speed * 60 * dt;
  const baseX = dx / len;
  const baseY = dy / len;

  const candidates = [
    [baseX, baseY],
    [baseY, -baseX],
    [-baseY, baseX],
    [baseX * 0.72 + baseY * 0.42, baseY * 0.72 - baseX * 0.42],
    [baseX * 0.72 - baseY * 0.42, baseY * 0.72 + baseX * 0.42],
    [-baseX, -baseY]
  ];

  for (const c of candidates) {
    const nx = clamp(swarm.x + c[0] * step, 70, WORLD_WIDTH - 70);
    const ny = clamp(swarm.y + c[1] * step, 70, WORLD_HEIGHT - 70);
    if (!isBugSwarmBlockedAt(nx, ny)) {
      swarm.x = nx;
      swarm.y = ny;
      return;
    }
  }

  advanceBugSwarmRoute(swarm);
}

function separateBugSwarms() {
  for (let i = 0; i < bugSwarmAgents.length; i++) {
    const a = bugSwarmAgents[i];
    if (a.counterDead || window.counterattack?.isStunned(a)) continue;
    if (!a || a.state === "attached" || a.respawnTimer > 0) continue;

    for (let j = i + 1; j < bugSwarmAgents.length; j++) {
      const b = bugSwarmAgents[j];
      if (b.counterDead || window.counterattack?.isStunned(b)) continue;
      if (!b || b.state === "attached" || b.respawnTimer > 0) continue;

      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.max(0.001, Math.hypot(dx, dy));
      if (dist >= BUG_SWARM_MIN_SEPARATION) continue;

      const push = (BUG_SWARM_MIN_SEPARATION - dist) / 2;
      const ux = dx / dist;
      const uy = dy / dist;
      const ax = clamp(a.x - ux * push, 70, WORLD_WIDTH - 70);
      const ay = clamp(a.y - uy * push, 70, WORLD_HEIGHT - 70);
      const bx = clamp(b.x + ux * push, 70, WORLD_WIDTH - 70);
      const by = clamp(b.y + uy * push, 70, WORLD_HEIGHT - 70);

      if (!isBugSwarmBlockedAt(ax, ay)) {
        a.x = ax;
        a.y = ay;
      }
      if (!isBugSwarmBlockedAt(bx, by)) {
        b.x = bx;
        b.y = by;
      }
    }
  }
}


function getBugSwarmTargetCount() {
  return currentEnemyType === "bugmaster" && isFourKeyPhase() ? BUG_SWARM_COUNT * 2 : BUG_SWARM_COUNT;
}

function appendBugSwarmAgent(index) {
  const route = BUG_SWARM_PATROL_ROUTES[index % BUG_SWARM_PATROL_ROUTES.length];
  const start = route[0];
  const next = route[1 % route.length];

  bugSwarmAgents.push({
    id: index,
    x: start.x,
    y: start.y,
    state: "free",
    timer: 0,
    angle: Math.random() * Math.PI * 2,
    routeIndex: index % BUG_SWARM_PATROL_ROUTES.length,
    waypointIndex: 1 % route.length,
    targetX: next.x,
    targetY: next.y,
    wanderTimer: 0,
    attackOffsetX: BUG_SWARM_ATTACK_OFFSETS[index % BUG_SWARM_ATTACK_OFFSETS.length].x,
    attackOffsetY: BUG_SWARM_ATTACK_OFFSETS[index % BUG_SWARM_ATTACK_OFFSETS.length].y,
    detectRadius: 600 + index * 70,
    respawnTimer: 0
  });
}

function ensureBugSwarmPhaseCount() {
  const target = getBugSwarmTargetCount();
  while (bugSwarmAgents.length < target) {
    appendBugSwarmAgent(bugSwarmAgents.length);
  }
}


function initBugSwarmAgents() {
  bugSwarmAgents = [];
  const count = getBugSwarmTargetCount();
  for (let i = 0; i < count; i++) {
    appendBugSwarmAgent(i);
  }
}



function findPointOutsideSanctuary(rect) {
  const pad = 120;
  const candidates = [
    { x: rect.x + rect.width / 2, y: rect.y + rect.height + pad },
    { x: rect.x + rect.width / 2, y: rect.y - pad },
    { x: rect.x - pad, y: rect.y + rect.height / 2 },
    { x: rect.x + rect.width + pad, y: rect.y + rect.height / 2 }
  ];

  for (const c of candidates) {
    const testX = clamp(c.x - enemy.width / 2, 0, WORLD_WIDTH - enemy.width);
    const testY = clamp(c.y - enemy.height / 2, 0, WORLD_HEIGHT - enemy.height);
    if (!isCollidingWithObstacle(enemy, testX, testY, true)) {
      return {
        x: testX + enemy.width / 2,
        y: testY + enemy.height / 2
      };
    }
  }

  const fallbackX = clamp(rect.x + rect.width / 2, 140, WORLD_WIDTH - 140);
  const fallbackY = clamp(rect.y + rect.height + pad, 140, WORLD_HEIGHT - 140);
  return { x: fallbackX, y: fallbackY };
}

function resolveNightShadowDiveTarget(target) {
  if (mainShrine && isInsideRect(target, mainShrine)) {
    return findPointOutsideSanctuary(mainShrine);
  }

  for (const shrine of shrines) {
    if (isInsideRect(target, shrine)) {
      return findPointOutsideSanctuary(shrine);
    }
  }

  return {
    x: clamp(target.x, 140, WORLD_WIDTH - 140),
    y: clamp(target.y, 140, WORLD_HEIGHT - 140)
  };
}


function getNightShadowRandomDiveOrigin(target) {
  const margin = 520;
  const side = Math.floor(Math.random() * 4);
  if (side === 0) return { x: target.x + randomRange(-900, 900), y: -enemy.height - margin };
  if (side === 1) return { x: WORLD_WIDTH + margin, y: target.y + randomRange(-700, 700) };
  if (side === 2) return { x: target.x + randomRange(-900, 900), y: WORLD_HEIGHT + margin };
  return { x: -enemy.width - margin, y: target.y + randomRange(-700, 700) };
}

function getNightShadowEdgePassTarget(origin, strikePoint) {
  const dirX = strikePoint.x - origin.x;
  const dirY = strikePoint.y - origin.y;
  const len = Math.max(0.001, Math.hypot(dirX, dirY));
  const nx = dirX / len;
  const ny = dirY / len;

  const candidates = [];
  if (Math.abs(nx) > 0.0001) {
    const tLeft = (0 - strikePoint.x) / nx;
    const tRight = (WORLD_WIDTH - strikePoint.x) / nx;
    if (tLeft > 0) candidates.push(tLeft);
    if (tRight > 0) candidates.push(tRight);
  }
  if (Math.abs(ny) > 0.0001) {
    const tTop = (0 - strikePoint.y) / ny;
    const tBottom = (WORLD_HEIGHT - strikePoint.y) / ny;
    if (tTop > 0) candidates.push(tTop);
    if (tBottom > 0) candidates.push(tBottom);
  }

  // 最後以外の連続急降下は、狙った地点を通過してフィールド外まで抜ける。
  const t = (candidates.length ? Math.min(...candidates) : 1) + 780;
  return {
    x: strikePoint.x + nx * t,
    y: strikePoint.y + ny * t
  };
}

function startNightShadowComboIfNeeded() {
  if (!isFourKeyPhase() || nightShadowComboActive) return;
  nightShadowComboActive = true;
  nightShadowDiveComboRemaining = 2 + Math.floor(Math.random() * 2);
}

function beginNightShadowDive(targetPoint, reason = "timer") {
  const def = getEnemyDef();
  const target = targetPoint || getEntityCenter(player);
  const resolvedTarget = resolveNightShadowDiveTarget(target);

  startNightShadowComboIfNeeded();
  nightShadowState = "warning";
  nightShadowTargetPoint = {
    x: resolvedTarget.x,
    y: resolvedTarget.y
  };
  nightShadowDiveOrigin = getNightShadowRandomDiveOrigin(nightShadowTargetPoint);
  nightShadowGroundTimer = 0;
  nightShadowTimer = 1.0;

  enemy.visible = false;
  enemy.alpha = 0;
  enemyMode = "warning";
  enemyPath = [];
  enemyPathTimer = 0;

  stopAudio(sounds[def.flapSfx]);
  if (sounds[def.crySfx]) playOneShot(sounds[def.crySfx]);

  showMessage(reason === "revealed"
    ? "夜空に鳴き声が響く。1秒後、夜の影がどこかから急降下する。"
    : "夜の影の鳴き声が夜空を裂いた。");
}


function getNearestSmallShrineForPoint(point) {
  for (const shrine of shrines) {
    if (isInsideRect(point, shrine)) return shrine;
  }
  return null;
}

function getNightShadowSafeTarget(point) {
  if (!point) return getEntityCenter(player);
  if (mainShrine && isInsideRect(point, mainShrine)) {
    return {
      x: mainShrine.gate.x + mainShrine.gate.width / 2,
      y: mainShrine.gate.y + 290
    };
  }
  const shrine = getNearestSmallShrineForPoint(point);
  if (shrine) {
    return {
      x: shrine.gate.x + shrine.gate.width / 2,
      y: shrine.gate.y + 150
    };
  }
  return { x: point.x, y: point.y };
}

function beginNightShadowAscend() {
  const def = getEnemyDef();
  nightShadowState = "ascend";
  nightShadowTargetPoint = null;
  nightShadowDiveOrigin = null;
  nightShadowGroundTimer = 0;
  enemyMode = "ascend";
  enemyPath = [];
  enemyPathTimer = 0;
  nightShadowAscendTarget = { x: enemy.x + enemy.width / 2, y: -enemy.height - 220 };
  if (sounds[def.flapSfx]) {
    setAudioVolume(sounds[def.flapSfx], getMasterVolume() * Math.max(getBgmVolume() * 1.15, getSeVolume() * 0.9) * 0.95);
    playLoop(sounds[def.flapSfx]);
  }
}

function finishNightShadowAirState() {
  const def = getEnemyDef();
  nightShadowState = "air";
  nightShadowTimer = randomRange(def.skyIntervalMin || 16.0, def.skyIntervalMax || 25.0);
  nightShadowTargetPoint = null;
  nightShadowDiveOrigin = null;
  nightShadowGroundTimer = 0;
  nightShadowAscendTarget = null;
  nightShadowComboPassPoint = null;
  nightShadowPassedStrikePoint = false;
  nightShadowComboPassPoint = null;
  nightShadowPassedStrikePoint = false;
  enemy.visible = false;
  enemy.alpha = 0;
  enemy.x = -9999;
  enemy.y = -9999;
  enemyMode = "air";
  enemyPath = [];
  enemyPathTimer = 0;
  stopAudio(sounds[def.flapSfx]);
}

function returnNightShadowToSky() {
  beginNightShadowAscend();
}

function startNightShadowActualDive() {
  const def = getEnemyDef();
  const strikeTarget = getNightShadowSafeTarget(nightShadowTargetPoint || getEntityCenter(player));

  nightShadowState = "dive";
  const origin = nightShadowDiveOrigin || getNightShadowRandomDiveOrigin(strikeTarget);
  enemy.x = origin.x - enemy.width / 2;
  enemy.y = origin.y - enemy.height / 2;
  enemy.visible = true;
  enemy.alpha = 1;
  enemyMode = "dive";
  enemyPath = [];
  enemyPathTimer = 0;
  nightShadowPassedStrikePoint = false;
  nightShadowComboPassPoint = { x: strikeTarget.x, y: strikeTarget.y };

  if (nightShadowLinePass) {
    nightShadowTargetPoint = getNightShadowEdgePassTarget(origin, strikeTarget);
  } else if (nightShadowComboActive && nightShadowDiveComboRemaining > 0) {
    nightShadowTargetPoint = getNightShadowEdgePassTarget(origin, strikeTarget);
  } else {
    nightShadowTargetPoint = { x: strikeTarget.x, y: strikeTarget.y };
  }

  if (sounds[def.flapSfx]) {
    setAudioVolume(sounds[def.flapSfx], getMasterVolume() * Math.max(getBgmVolume() * 1.15, getSeVolume() * 0.9) * 0.95);
    playLoop(sounds[def.flapSfx]);
  }
}

function moveNightShadowDirect(targetX, targetY, dt, speedValue, allowOutOfField = false) {
  const ec = getEntityCenter(enemy);
  const dx = targetX - ec.x;
  const dy = targetY - ec.y;
  const len = Math.max(1, Math.hypot(dx, dy));
  const nx = dx / len;
  const ny = dy / len;

  enemyFacingX = nx;
  enemyFacingY = ny;

  const nextX = enemy.x + nx * speedValue * 60 * dt;
  const nextY = enemy.y + ny * speedValue * 60 * dt;

  if (allowOutOfField) {
    enemy.x = nextX;
    enemy.y = nextY;
  } else {
    enemy.x = clamp(nextX, 0, WORLD_WIDTH - enemy.width);
    enemy.y = clamp(nextY, 0, WORLD_HEIGHT - enemy.height);
  }
}

function updateNightShadowEnemy(dt) {
  if (moveEnemyTowardUniversalLure(dt)) return;
  const def = getEnemyDef();

  if (enemyStunTimer > 0) {
    enemyStunTimer -= dt;
    enemyMode = "stun";
    return;
  }

  if (isFourKeyPhase()) {
    kaishutsubotsuWarpFlurryCooldown = Math.max(0, kaishutsubotsuWarpFlurryCooldown - dt);
    if (updateKaishutsubotsuWarpFlurry(dt)) return;
    if (kaishutsubotsuWarpFlurryCooldown <= 0 && kaishutsubotsuRushTimer <= 0) {
      startKaishutsubotsuWarpFlurry();
      return;
    }
  }

  const pc = getEntityCenter(player);

  if (nightShadowState === "air") {
    enemy.visible = false;
    enemy.alpha = 0;
    enemyMode = "air";
    nightShadowTimer -= dt;

    if (enemyLurePoint) {
      beginNightShadowDive(enemyLurePoint, "revealed");
      enemyLurePoint = null;
      return;
    }

    if (nightShadowTimer <= 0) {
      beginNightShadowDive(pc, "timer");
      return;
    }

    return;
  }

  if (nightShadowState === "warning") {
    enemy.visible = false;
    enemy.alpha = 0;
    enemyMode = "warning";
    nightShadowTimer -= dt;

    if (nightShadowTimer <= 0) {
      startNightShadowActualDive();
    }
    return;
  }

  enemy.visible = true;
  enemy.alpha = 1;

  if (nightShadowState === "ascend") {
    enemyMode = "ascend";
    enemy.visible = true;
    enemy.alpha = 1;
    const ascendSpeed = (def.diveSpeed || 34.5) * 2.15;
    enemy.y -= ascendSpeed * 60 * dt;
    enemy.x += Math.sin(performance.now() / 70) * 0.35;
    enemyFacingY = -1;
    if (enemy.y <= -enemy.height - 90) {
      finishNightShadowAirState();
    }
    return;
  }

  if (nightShadowState === "dive") {
    enemyMode = "dive";
    const target = nightShadowTargetPoint || pc;
    const strikePoint = nightShadowComboPassPoint || target;
    moveNightShadowDirect(target.x, target.y, dt, def.diveSpeed || 58.0, nightShadowComboActive && nightShadowDiveComboRemaining > 0);

    const ec = getEntityCenter(enemy);
    if (!nightShadowPassedStrikePoint && distanceBetweenPoints(ec.x, ec.y, strikePoint.x, strikePoint.y) <= 100) {
      nightShadowPassedStrikePoint = true;
      const playerEscapedAtStrike = distanceBetweenPoints(pc.x, pc.y, strikePoint.x, strikePoint.y) > 150;
      if (!playerEscapedAtStrike && !isPlayerInAnySanctuary()) {
        startJumpscare();
        return;
      }
    }

    if (distanceBetweenPoints(ec.x, ec.y, target.x, target.y) <= 75) {
      const playerEscaped = distanceBetweenPoints(pc.x, pc.y, strikePoint.x, strikePoint.y) > 150;
      if (nightShadowLinePass) {
        nightShadowLinePass = false;
        returnNightShadowToSky();
        return;
      }
      if (nightShadowComboActive && nightShadowDiveComboRemaining > 0) {
        // フィールド外に消えてから、次の急降下へ移る。
        enemy.visible = false;
        enemy.alpha = 0;
        nightShadowDiveComboRemaining--;
        const nextTarget = getEntityCenter(player);
        nightShadowDiveOrigin = getNightShadowRandomDiveOrigin(nextTarget);
        nightShadowTargetPoint = getNightShadowSafeTarget(nextTarget);
        nightShadowComboPassPoint = null;
        nightShadowPassedStrikePoint = false;
        nightShadowState = "warning";
        nightShadowTimer = 0.42;
        playLoop(sounds.nightShadowFlap);
        return;
      }
      nightShadowComboActive = false;
      nightShadowDiveComboRemaining = 0;
      nightShadowComboPassPoint = null;
      nightShadowPassedStrikePoint = false;
      if (!playerEscaped && !isPlayerInAnySanctuary()) {
        startJumpscare();
        return;
      }

      nightShadowState = "ground";
      nightShadowGroundTimer = 0;
      enemyMode = "chase";
      enemyLostSightTimer = def.groundLostTime || 3.2;
      nightShadowLastKnownPoint = { x: pc.x, y: pc.y };
      stopAudio(sounds[def.flapSfx]);
    }
    return;
  }

  // ground chase mode
  const canSee = canEnemySeePlayer();
  if (canSee) {
    enemyMode = "chase";
    enemyLostSightTimer = def.groundLostTime || 3.2;
    nightShadowLastKnownPoint = { x: pc.x, y: pc.y };
  } else if (enemyLostSightTimer > 0) {
    enemyMode = "chase";
    enemyLostSightTimer -= dt;
  } else {
    returnNightShadowToSky();
    return;
  }

  if (enemyMode === "chase") {
    nightShadowLineDiveCooldown = Math.max(0, nightShadowLineDiveCooldown - dt);
    const ec = getEntityCenter(enemy);
    const straight = isFourKeyPhase() && nightShadowLineDiveCooldown <= 0 &&
      distanceBetweenPoints(ec.x, ec.y, pc.x, pc.y) > 520 && !isLineBlocked(ec.x, ec.y, pc.x, pc.y);
    if (straight) {
      startNightShadowLinePassDive();
      return;
    }
    const target = nightShadowLastKnownPoint || pc;
    moveEnemyTowardPoint(target.x, target.y, dt, def.chaseSpeed || ENEMY_TYPES.tracker.chaseSpeed);
  }
}


function startBugmasterSwarmRecall() {
  if (!bugSwarmAgents.length) initBugSwarmAgents();
  bugmasterSwarmMode = "recall";
  bugmasterSwarmModeTimer = 3.8;
  clearAttachedBugSwarmsBeforeCharge(true);
  for (const swarm of bugSwarmAgents) {
    if (swarm.counterDead || window.counterattack?.isStunned(swarm)) continue;
    swarm.state = "recall";
    swarm.respawnTimer = 0;
  }
  showMessage("蟲使いが羽虫群を呼び戻している。");
}

function updateBugmasterSwarmArmorAudio(dt) {
  const audio = sounds.bugmasterArmor;
  if (!audio) return;
  const active = currentEnemyType === "bugmaster" &&
    (gameState === "playing" || gameState === "clearEvent") &&
    (bugmasterSwarmMode === "armored" || bugmasterSwarmMode === "charge");
  const d = active ? getEntityDistance(player, enemy) : 2500;
  const t = clamp(1 - d / 2500, 0, 1);
  const volume = getMasterVolume() * getSeVolume() * t * t * 0.64;
  setAudioVolume(audio, volume);
  if (!active || volume <= 0.001) {
    audio.pause();
    return;
  }
  if (audio.paused) audio.play().catch(() => {});
}


function clearAttachedBugSwarmsBeforeCharge(showNotice = true) {
  let cleared = 0;
  const body = getEntityCenter(enemy);
  const targetState = bugmasterSwarmMode === "recall" ? "recall" : "armor";

  for (const swarm of bugSwarmAgents) {
    if (swarm.counterDead) continue;
    if (swarm.state === "attached") {
      swarm.state = targetState;
      swarm.respawnTimer = 0;
      swarm.x = body.x + randomRange(-70, 70);
      swarm.y = body.y + randomRange(-60, 60);
      cleared += 1;
    }
  }

  if (cleared > 0 || bugAttachStacks > 0) {
    bugAttachStacks = 0;
    bugEscapeProgress = 0;
    movementSlowTimer = Math.min(movementSlowTimer, 0.12);
    if (showNotice) showMessage("羽虫群が蟲使いの元へ戻り、まとわりつきが消えた。");
  }
}

function forceAllBugSwarmsToArmor() {
  const body = getEntityCenter(enemy);
  for (const swarm of bugSwarmAgents) {
    if (swarm.counterDead || window.counterattack?.isStunned(swarm)) continue;
    swarm.state = "armor";
    swarm.respawnTimer = 0;
    swarm.x += (body.x + randomRange(-70, 70) - swarm.x) * 0.75;
    swarm.y += (body.y + randomRange(-60, 60) - swarm.y) * 0.75;
  }
  bugAttachStacks = 0;
  bugEscapeProgress = 0;
}


function updateBugmasterEnemy(dt) {
  if (moveEnemyTowardUniversalLure(dt)) return;
  const def = getEnemyDef();
  if (!bugSwarmAgents.length) initBugSwarmAgents();
  ensureBugSwarmPhaseCount();

  const pc = getEntityCenter(player);
  const beastSwarmSpeed = (ENEMY_TYPES.beast && ENEMY_TYPES.beast.chaseSpeed) ? ENEMY_TYPES.beast.chaseSpeed : def.swarmSpeed;

  if (bugmasterSwarmMode === "normal" && Math.random() < dt * 0.022) {
    startBugmasterSwarmRecall();
  }

  if (bugmasterSwarmMode === "recall") {
    clearAttachedBugSwarmsBeforeCharge(false);
    enemyMode = "recall";
    bugmasterSwarmModeTimer -= dt;
    let allNear = true;
    const body = getEntityCenter(enemy);
    for (const swarm of bugSwarmAgents) {
    if (swarm.counterDead || window.counterattack?.isStunned(swarm)) continue;
      swarm.state = "recall";
      moveBugSwarmToward(swarm, body.x + randomRange(-50, 50), body.y + randomRange(-44, 44), beastSwarmSpeed * 1.25, dt);
      if (distanceBetweenPoints(swarm.x, swarm.y, body.x, body.y) > 130) allNear = false;
    }
    if (allNear || bugmasterSwarmModeTimer <= 0) {
      bugmasterSwarmMode = "armored";
      bugmasterSwarmModeTimer = randomRange(9.5, 15.0);
      bugmasterChargeCooldown = 1.2;
      forceAllBugSwarmsToArmor();
      showMessage("蟲使いが羽虫群を纏った。");
    }
    return;
  }

  if (bugmasterSwarmMode === "armored" || bugmasterSwarmMode === "charge") {
    clearAttachedBugSwarmsBeforeCharge(false);
    bugmasterSwarmModeTimer -= dt;
    bugmasterChargeCooldown -= dt;
    const canSee = canEnemySeePlayer();

    if (bugmasterSwarmMode === "armored" && canSee && bugmasterChargeCooldown <= 0) {
      clearAttachedBugSwarmsBeforeCharge();
      bugmasterSwarmMode = "charge";
      bugmasterChargeTimer = 1.2;
      bugmasterChargeTarget = { x: pc.x, y: pc.y };
      bugmasterChargeCooldown = randomRange(3.2, 5.6);
    }

    if (bugmasterSwarmMode === "charge" && bugmasterChargeTarget) {
      enemyMode = "charge";
      bugmasterChargeTimer -= dt;
      moveEnemyTowardPoint(bugmasterChargeTarget.x, bugmasterChargeTarget.y, dt, def.swarmArmorRushSpeed || 13.2);
      if (distanceBetweenPoints(getEntityCenter(enemy).x, getEntityCenter(enemy).y, bugmasterChargeTarget.x, bugmasterChargeTarget.y) < 90 || bugmasterChargeTimer <= 0) {
        bugmasterSwarmMode = "armored";
        bugmasterChargeTarget = null;
      }
    } else {
      enemyMode = canSee ? "chase" : "wander";
      if (canSee) moveEnemyTowardPoint(pc.x, pc.y, dt, def.swarmArmorSpeed || 8.8);
      else {
        if (!enemyWanderTarget || distanceBetweenPoints(enemy.x, enemy.y, enemyWanderTarget.x, enemyWanderTarget.y) < 140) {
          enemyWanderTarget = findWanderTarget();
          enemyPath = [];
          enemyPathTimer = 0;
        }
        moveEnemyTowardPoint(enemyWanderTarget.x, enemyWanderTarget.y, dt, def.swarmArmorSpeed || 8.8);
      }
    }

    const body = getEntityCenter(enemy);
    for (const swarm of bugSwarmAgents) {
    if (swarm.counterDead || window.counterattack?.isStunned(swarm)) continue;
      swarm.state = "armor";
      swarm.x += (body.x + randomRange(-70, 70) - swarm.x) * Math.min(1, dt * 7.0);
      swarm.y += (body.y + randomRange(-60, 60) - swarm.y) * Math.min(1, dt * 7.0);
    }

    if (bugmasterSwarmModeTimer <= 0) {
      bugmasterSwarmMode = "normal";
      for (const swarm of bugSwarmAgents) {
    if (swarm.counterDead || window.counterattack?.isStunned(swarm)) continue;
        if (swarm.state !== "attached") {
          swarm.state = "free";
          advanceBugSwarmRoute(swarm);
        }
      }
      showMessage("蟲使いの羽虫群が散った。");
    }

    return;
  }

  let playerKnown = bugAttachStacks > 0 || bugRevealTimer > 0 || getEntityDistance(player, enemy) < 360;

  for (const swarm of bugSwarmAgents) {
    if (swarm.counterDead || window.counterattack?.isStunned(swarm)) continue;
    if (swarm.state === "attached") { playerKnown = true; continue; }
    if (swarm.respawnTimer > 0) {
      swarm.respawnTimer -= dt;
      if (swarm.respawnTimer <= 0) { swarm.state = "free"; advanceBugSwarmRoute(swarm); }
      continue;
    }
    const distToPlayer = distanceBetweenPoints(pc.x, pc.y, swarm.x, swarm.y);
    if (distToPlayer <= swarm.detectRadius) {
      playerKnown = true;
      bugRevealTimer = Math.max(bugRevealTimer, 7.5);
    }
  }

  if (enemyStunTimer > 0) {
    enemyStunTimer -= dt;
    enemyMode = "stun";
  } else if (playerKnown) {
    enemyMode = "chase";
    moveEnemyTowardPoint(pc.x, pc.y, dt, isFourKeyPhase() ? (def.endgameChaseSpeed || def.chaseSpeed) : def.chaseSpeed);
  } else {
    enemyMode = "wander";
    if (!enemyWanderTarget || distanceBetweenPoints(enemy.x, enemy.y, enemyWanderTarget.x, enemyWanderTarget.y) < 140) {
      enemyWanderTarget = findWanderTarget();
      enemyPath = [];
      enemyPathTimer = 0;
    }
    moveEnemyTowardPoint(enemyWanderTarget.x, enemyWanderTarget.y, dt, def.wanderSpeed);
  }

  for (const swarm of bugSwarmAgents) {
    if (swarm.counterDead || window.counterattack?.isStunned(swarm)) continue;
    if (swarm.state === "attached") continue;
    if (swarm.respawnTimer > 0) continue;

    let tx, ty;
    const dToPlayer = distanceBetweenPoints(swarm.x, swarm.y, pc.x, pc.y);
    if (playerKnown || dToPlayer <= swarm.detectRadius) {
      tx = pc.x + swarm.attackOffsetX;
      ty = pc.y + swarm.attackOffsetY;
      if (isBugSwarmBlockedAt(tx, ty)) { tx = pc.x; ty = pc.y; }
      moveBugSwarmToward(swarm, tx, ty, beastSwarmSpeed, dt);
    } else {
      const target = getBugSwarmRoutePoint(swarm);
      tx = target.x; ty = target.y;
      if (distanceBetweenPoints(swarm.x, swarm.y, tx, ty) < 90) advanceBugSwarmRoute(swarm);
      moveBugSwarmToward(swarm, swarm.targetX, swarm.targetY, beastSwarmSpeed, dt);
    }

    if (!window.counterattack?.isStunned(swarm) && distanceBetweenPoints(swarm.x, swarm.y, pc.x, pc.y) < 92) {
      if (useOmamoriProtection("羽虫群")) {
        swarm.state = "cooldown";
        swarm.respawnTimer = 5.0;
        advanceBugSwarmRoute(swarm);
        bugAttachStacks = Math.max(0, bugAttachStacks - 1);
        bugEscapeProgress = 0;
        showMessage("お守りの力で羽虫群をすぐさま振り払った。");
        continue;
      }
      swarm.state = "attached";
      bugAttachStacks += 1;
      bugRevealTimer = Math.max(bugRevealTimer, 7.5);
      showMessage("羽虫群がまとわりついた！");
    }
  }

  // Separation is visual spacing, not gameplay-critical collision. Running it at 20 Hz
  // avoids the O(n^2) pair scan on every frame when the final form has 10 swarms.
  bugSwarmSeparationAccumulator += dt;
  if (bugSwarmSeparationAccumulator >= 0.05) {
    separateBugSwarms();
    bugSwarmSeparationAccumulator = 0;
  }

  // Keep the hindrance stack in sync with actual attached agents. This prevents the slow
  // effect from disappearing after a counterattack stun/revival or state transition.
  bugAttachStacks = bugSwarmAgents.reduce((n, s) => n + (!s.counterDead && s.state === "attached" ? 1 : 0), 0);

  if (bugRevealTimer > 0) bugRevealTimer -= dt;

  if (bugAttachStacks > 0) {
    if (findOmamoriSlot() >= 0 && useOmamoriProtection("羽虫群")) {
      let releasedCount = 0;
      for (const lost of bugSwarmAgents) {
        if (lost.state === "attached") {
          lost.state = "cooldown";
          lost.respawnTimer = 5.0;
          advanceBugSwarmRoute(lost);
          releasedCount += 1;
        }
      }
      bugAttachStacks = 0;
      bugEscapeProgress = 0;
      showMessage(releasedCount > 1 ? "お守りの力で羽虫群をまとめて振り払った。" : "お守りの力で羽虫群を振り払った。");
    } else {
      movementSlowTimer = Math.max(movementSlowTimer, 0.06 * bugAttachStacks);
      if (isRunning) {
        bugEscapeProgress += dt;
        if (bugEscapeProgress >= 1.9) {
          let releasedCount = 0;
          for (const lost of bugSwarmAgents) {
            if (lost.state === "attached") {
              lost.state = "cooldown";
              lost.respawnTimer = 5.0;
              advanceBugSwarmRoute(lost);
              releasedCount += 1;
            }
          }
          bugAttachStacks = 0;
          bugEscapeProgress = 0;
          showMessage(releasedCount > 1 ? "まとわりついた羽虫群をまとめて振り払った！" : "羽虫群を振り払った！");
        }
      }
    }
  } else {
    bugEscapeProgress = 0;
  }
}

function updateBeastEnemy(dt) {
  if (moveEnemyTowardUniversalLure(dt)) return;
  const def = getEnemyDef();
  const pc = getEntityCenter(player);
  const ec = getEntityCenter(enemy);
  const distanceToPlayer = distanceBetweenPoints(ec.x, ec.y, pc.x, pc.y);

  if (enemyStunTimer > 0) {
    enemyStunTimer -= dt;
    enemyMode = "stun";
    stopAudio(sounds.beastSniff);
    beastSniffAudioActive = false;
    return;
  }

  if (beastSpiralMode && updateBeastSpiral(dt)) return;
  if (isFourKeyPhase() && !beastHasScent && !beastTargetPoint) {
    beastSpiralTimer -= dt;
    if (!beastSpiralMode && beastSpiralTimer <= 0) {
      startBeastSpiralRun();
      return;
    }
  }

  // Rev44: 匂いで居場所を把握した後は、撒かれるまで追跡者のように追い続ける。
  if (beastHasScent) {
    enemyMode = "chase";
    stopAudio(sounds.beastSniff);
    beastSniffAudioActive = false;
    beastRushTimer = 0;
    beastTargetPoint = null;

    moveEnemyTowardPoint(pc.x, pc.y, dt, def.chaseSpeed);

    if (distanceToPlayer > (def.loseScentRange || 2850)) {
      beastScentLostTimer -= dt;
      if (beastScentLostTimer <= 0) {
        beastHasScent = false;
        beastScentLostTimer = 0;
        beastSniffTimer = 0.8 + Math.random() * 1.2;
        showMessage("飢えし獣の匂い追跡を撒いた。");
      }
    } else {
      beastScentLostTimer = def.loseScentTime || 4.5;
    }

    return;
  }

  // Rev44: 嗅覚範囲内に近づいた場合、嗅ぎ終えるのを待たず居場所を把握する。
  if (distanceToPlayer <= (def.exactScentRange || 1750) * 0.72) {
    if (useOmamoriProtection("匂い察知")) {
      beastSniffTimer = def.sniffIntervalMin + Math.random() * (def.sniffIntervalMax - def.sniffIntervalMin);
      return;
    }
    beastHasScent = true;
    beastScentLostTimer = def.loseScentTime || 4.5;
    stopAudio(sounds.beastSniff);
    beastSniffAudioActive = false;
    playOneShot(isFourKeyPhase() ? sounds.beastCapture : sounds.beastDetect);
    showMessage("飢えし獣が、あなたの匂いを捉えた。");
    return;
  }

  if (beastRushTimer > 0 && beastTargetPoint) {
    beastRushTimer -= dt;
    enemyMode = "chase";
    stopAudio(sounds.beastSniff);
    beastSniffAudioActive = false;

    moveEnemyTowardPoint(beastTargetPoint.x, beastTargetPoint.y, dt, def.chaseSpeed);

    const ec2 = getEntityCenter(enemy);
    if (distanceBetweenPoints(ec2.x, ec2.y, beastTargetPoint.x, beastTargetPoint.y) < 90 || beastRushTimer <= 0) {
      beastRushTimer = 0;
      beastTargetPoint = null;
      beastSniffTimer = 0.8 + Math.random() * 1.2;
    }
    return;
  }

  beastSniffTimer -= dt;

  // 匂いを嗅いでいる間は、ほとんど動かない
  if (beastSniffTimer <= 0) {
    enemyMode = "sniff";

    if (!beastSniffAudioActive) {
      sounds.beastSniff.currentTime = 0;
      sounds.beastSniff.play().catch(() => {});
      beastSniffAudioActive = true;
    }

    const elapsed = Math.abs(beastSniffTimer);
    if (elapsed >= def.sniffDuration) {
      stopAudio(sounds.beastSniff);
      beastSniffAudioActive = false;

      const currentPc = getEntityCenter(player);
      const currentEc = getEntityCenter(enemy);
      const currentDistance = distanceBetweenPoints(currentEc.x, currentEc.y, currentPc.x, currentPc.y);

      if (currentDistance <= (def.exactScentRange || 1750)) {
        // 嗅覚範囲内なら、その場から継続追跡へ移行する。
        if (useOmamoriProtection("匂い察知")) {
          beastSniffTimer = def.sniffIntervalMin + Math.random() * (def.sniffIntervalMax - def.sniffIntervalMin);
          return;
        }
        beastHasScent = true;
        beastScentLostTimer = def.loseScentTime || 4.5;
        playOneShot(isFourKeyPhase() ? sounds.beastCapture : sounds.beastDetect);
        showMessage("飢えし獣が、あなたの匂いを正確に嗅ぎ当てた。");
        return;
      }

      // 範囲外の場合は、従来どおり大まかな位置に突進する。
      const angle = Math.random() * Math.PI * 2;
      const error = Math.random() * def.scentError;
      beastTargetPoint = {
        x: clamp(currentPc.x + Math.cos(angle) * error, 140, WORLD_WIDTH - 140),
        y: clamp(currentPc.y + Math.sin(angle) * error, 140, WORLD_HEIGHT - 140)
      };

      playOneShot(isFourKeyPhase() ? sounds.beastCapture : sounds.beastDetect);
      beastRushTimer = 2.8;
      beastSniffTimer = def.sniffIntervalMin + Math.random() * (def.sniffIntervalMax - def.sniffIntervalMin);
    }

    return;
  }

  // 嗅ぐ前の待機中は周辺をゆっくり徘徊
  enemyMode = "wander";
  stopAudio(sounds.beastSniff);
  beastSniffAudioActive = false;

  if (!enemyWanderTarget || distanceBetweenPoints(enemy.x, enemy.y, enemyWanderTarget.x, enemyWanderTarget.y) < 140) {
    enemyWanderTarget = findWanderTarget();
    enemyPath = [];
    enemyPathTimer = 0;
  }
  moveEnemyTowardPoint(enemyWanderTarget.x, enemyWanderTarget.y, dt, def.wanderSpeed);
}

function findKaishutsubotsuNearWarpPoint() {
  const def = getEnemyDef();
  const pc = getEntityCenter(player);
  for (let i = 0; i < 26; i++) {
    const ang = Math.random() * Math.PI * 2;
    const dist = randomRange(def.warpNearRadiusMin || 360, def.warpNearRadiusMax || 540);
    const x = clamp(pc.x + Math.cos(ang) * dist - enemy.width / 2, 120, WORLD_WIDTH - enemy.width - 120);
    const y = clamp(pc.y + Math.sin(ang) * dist - enemy.height / 2, 120, WORLD_HEIGHT - enemy.height - 120);
    const center = { x: x + enemy.width / 2, y: y + enemy.height / 2 };
    if (mainShrine && isInsideRect(center, mainShrine)) continue;
    if (shrines.some(shrine => isInsideRect(center, shrine))) continue;
    if (isCollidingWithObstacle(enemy, x, y, true)) continue;
    if (distanceBetweenPoints(center.x, center.y, pc.x, pc.y) < 180) continue;
    return { x, y };
  }
  return getFarthestEnemyTeleportPoint();
}


function segmentIntersectsRect(ax, ay, bx, by, rect, margin = 0) {
  // Inclusive slab test: also handles collinear edges and zero-length segments.
  let entry = 0, exit = 1;
  for (const [origin, delta, low, high] of [
    [ax, bx - ax, rect.x - margin, rect.x + rect.width + margin],
    [ay, by - ay, rect.y - margin, rect.y + rect.height + margin]
  ]) {
    if (Math.abs(delta) < 1e-9) {
      if (origin < low || origin > high) return false;
    } else {
      const a = (low - origin) / delta, b = (high - origin) / delta;
      entry = Math.max(entry, Math.min(a, b));
      exit = Math.min(exit, Math.max(a, b));
      if (entry > exit) return false;
    }
  }
  return true;
}

function segmentIntersectsAnySanctuary(ax, ay, bx, by, margin = 0) {
  if (mainShrine && segmentIntersectsRect(ax, ay, bx, by, mainShrine, margin)) return true;
  for (const shrine of shrines) {
    if (segmentIntersectsRect(ax, ay, bx, by, shrine, margin)) return true;
  }
  return false;
}

function startKaishutsubotsuRush() {
  const def = getEnemyDef();
  if (useOmamoriProtection("怪出異没の猛突進")) {
    kaishutsubotsuRushCooldown = randomRange(def.rushCooldownMin || 34.0, def.rushCooldownMax || 56.0);
    return;
  }
  const target = getEntityCenter(player);
  const far = getFarthestEnemyTeleportPoint();
  enemy.x = far.x;
  enemy.y = far.y;
  enemy.visible = true;
  enemy.alpha = 1;
  const start = getEntityCenter(enemy);
  const dx = target.x - start.x;
  const dy = target.y - start.y;
  const len = Math.max(1, Math.hypot(dx, dy));
  const nx = dx / len;
  const ny = dy / len;
  let t = 9999;
  if (nx > 0) t = Math.min(t, (WORLD_WIDTH + 220 - start.x) / nx);
  if (nx < 0) t = Math.min(t, (-220 - start.x) / nx);
  if (ny > 0) t = Math.min(t, (WORLD_HEIGHT + 220 - start.y) / ny);
  if (ny < 0) t = Math.min(t, (-220 - start.y) / ny);
  kaishutsubotsuRushTarget = { x: start.x + nx * t, y: start.y + ny * t };
  kaishutsubotsuRushTimer = 3.84;
  enemyMode = "rush";
  enemyLostSightTimer = 1.5;
  enemyPath = [];
  enemyPathTimer = 0;
  if (sounds[def.rushSfx]) playOneShot(sounds[def.rushSfx]);
  showMessage("怪出異没が、遠くから一直線に迫ってくる！");
}

function updateKaishutsubotsuEnemy(dt) {
  if (moveEnemyTowardUniversalLure(dt)) return;
  const def = getEnemyDef();
  if (enemyStunTimer > 0) {
    enemyStunTimer -= dt;
    enemyMode = "stun";
    return;
  }

  // ワープ/猛突進頻度を強化。4神具以上ではさらに短縮。
  const freqBoost = isFourKeyPhase() ? 1.65 : 1.0;
  kaishutsubotsuNearWarpTimer -= dt * freqBoost;
  if (kaishutsubotsuInitialRushLockTimer > 0) {
    kaishutsubotsuInitialRushLockTimer -= dt * freqBoost;
    kaishutsubotsuRushCooldown = Math.max(kaishutsubotsuRushCooldown, kaishutsubotsuInitialRushLockTimer);
  } else {
    kaishutsubotsuRushCooldown -= dt * freqBoost;
  }

  const canSee = canEnemySeePlayer();
  if (canSee) {
    enemyMode = "chase";
    enemyLostSightTimer = 1.5;
  } else if (enemyLostSightTimer > 0) {
    enemyLostSightTimer -= dt;
    enemyMode = "chase";
  } else {
    enemyMode = "wander";
  }

  if (kaishutsubotsuRushTimer > 0 && kaishutsubotsuRushTarget) {
    kaishutsubotsuRushTimer -= dt;
    enemyMode = "rush";
    const before = getEntityCenter(enemy);
    const pc = getEntityCenter(player);
    // 夜の影の急降下と同じく、安置そのものは貫通する。
    moveNightShadowDirect(kaishutsubotsuRushTarget.x, kaishutsubotsuRushTarget.y, dt, def.rushSpeed || 60.0, true);
    const ec = getEntityCenter(enemy);

    // ただし、プレイヤーが安置内にいる間は被弾しない。
    if (!isPlayerInAnySanctuary() && distancePointToSegment(pc.x, pc.y, before.x, before.y, ec.x, ec.y) < 95) {
      startJumpscare();
      return;
    }
    if (distanceBetweenPoints(ec.x, ec.y, kaishutsubotsuRushTarget.x, kaishutsubotsuRushTarget.y) < 80 || kaishutsubotsuRushTimer <= 0) {
      kaishutsubotsuRushTarget = null;
      kaishutsubotsuRushTimer = 0;
      enemyMode = "wander";
      kaishutsubotsuRushCooldown = randomRange(def.rushCooldownMin || 12.0, def.rushCooldownMax || 20.0);
      kaishutsubotsuNearWarpTimer = randomRange(def.nearWarpMin || 5.0, def.nearWarpMax || 9.0);
    }
    return;
  }

  if (kaishutsubotsuInitialRushLockTimer <= 0 && kaishutsubotsuRushCooldown <= 0) {
    startKaishutsubotsuRush();
    return;
  }

  if (kaishutsubotsuNearWarpTimer <= 0) {
    if (useOmamoriProtection("怪出異没のワープ")) {
      kaishutsubotsuNearWarpTimer = randomRange(def.nearWarpMin || 5.0, def.nearWarpMax || 9.0);
      return;
    }
    const spot = findKaishutsubotsuNearWarpPoint();
    enemy.x = spot.x;
    enemy.y = spot.y;
    enemyPath = [];
    enemyPathTimer = 0;
    enemyLostSightTimer = 1.0;
    enemyMode = "chase";
    kaishutsubotsuNearWarpTimer = randomRange(def.nearWarpMin || 5.0, def.nearWarpMax || 9.0);
  }

  if (enemyMode === "chase") {
    const pc = getEntityCenter(player);
    moveEnemyTowardPoint(pc.x, pc.y, dt, def.chaseSpeed || 8.9);
  } else {
    if (!enemyWanderTarget || distanceBetweenPoints(enemy.x, enemy.y, enemyWanderTarget.x, enemyWanderTarget.y) < 140) {
      enemyWanderTarget = findWanderTarget();
      enemyPath = [];
      enemyPathTimer = 0;
    }
    moveEnemyTowardPoint(enemyWanderTarget.x, enemyWanderTarget.y, dt, def.wanderSpeed || 2.8);
  }
}



function wouldMiezaruEnterSanctuary(testX, testY) {
  const center = getEntityCenter({ ...enemy, x: testX, y: testY });
  if (isPointInAnySanctuary(center)) return true;

  const rect = getCollisionRect(enemy, testX, testY);
  for (const o of obstacles) {
    if (!isSanctuaryBlocker(o)) continue;
    const or = { left: o.x, top: o.y, right: o.x + o.width, bottom: o.y + o.height };
    if (rectsOverlap(rect, or)) return true;
  }

  return false;
}

function moveMiezaruTowardPoint(x, y, dt, speedValue) {
  const ec = getEntityCenter(enemy);
  const dx = x - ec.x;
  const dy = y - ec.y;
  const dist = Math.max(0.001, Math.hypot(dx, dy));
  const dirX = dx / dist;
  const dirY = dy / dist;
  const step = speedValue * 60 * dt;

  enemyFacingX = dirX;
  enemyFacingY = dirY;

  const nextX = enemy.x + dirX * step;
  if (!wouldMiezaruEnterSanctuary(nextX, enemy.y)) {
    enemy.x = nextX;
  }

  const nextY = enemy.y + dirY * step;
  if (!wouldMiezaruEnterSanctuary(enemy.x, nextY)) {
    enemy.y = nextY;
  }

  enemy.x = clamp(enemy.x, 0, WORLD_WIDTH - enemy.width);
  enemy.y = clamp(enemy.y, 0, WORLD_HEIGHT - enemy.height);
}


function findMiezaruWarpPoint() {
  const pc = getEntityCenter(player);

  for (let i = 0; i < 28; i++) {
    const ang = Math.random() * Math.PI * 2;
    const dist = randomRange(220, 520);
    const x = clamp(pc.x + Math.cos(ang) * dist - enemy.width / 2, 120, WORLD_WIDTH - enemy.width - 120);
    const y = clamp(pc.y + Math.sin(ang) * dist - enemy.height / 2, 120, WORLD_HEIGHT - enemy.height - 120);
    const center = { x: x + enemy.width / 2, y: y + enemy.height / 2 };

    if (isCollidingWithObstacle(enemy, x, y, true)) continue;
    if (mainShrine && isInsideRect(center, mainShrine)) continue;
    if (shrines.some(shrine => isInsideRect(center, shrine))) continue;
    if (distanceBetweenPoints(center.x, center.y, pc.x, pc.y) < 180) continue;

    return { x, y };
  }

  return getFarthestEnemyTeleportPoint();
}

function updateMiezaruEnemy(dt) {
  if (moveEnemyTowardUniversalLure(dt)) return;
  const def = getEnemyDef();

  if (enemyStunTimer > 0) {
    enemyStunTimer -= dt;
    enemyMode = "stun";
    enemy.visible = true;
    enemy.alpha = (magicMirrorTimer > 0 || isFourKeyPhase()) ? 1 : ((typeof isMiezaruVisibleToPlayer === "function" && isMiezaruVisibleToPlayer()) ? 0.92 : 0);
    return;
  }

  miezaruWarpTimer -= dt;
  if (miezaruWarpTimer <= 0) {
    const spot = findMiezaruWarpPoint();
    enemy.x = spot.x;
    enemy.y = spot.y;
    enemyPath = [];
    enemyPathTimer = 0;
    miezaruWarpTimer = randomRange(def.nearWarpMin || 8.0, def.nearWarpMax || 14.0);
  }

  const canSee = canEnemySeePlayer();
  if (canSee) {
    enemyMode = "chase";
    enemyLostSightTimer = 1.7;
  } else if (enemyLostSightTimer > 0) {
    enemyLostSightTimer -= dt;
    enemyMode = "chase";
  } else {
    enemyMode = "wander";
  }

  if (enemyMode === "chase") {
    const pc = getEntityCenter(player);
    moveMiezaruTowardPoint(pc.x, pc.y, dt, isFourKeyPhase() ? (def.endgameChaseSpeed || 7.6) : (def.chaseSpeed || 2.6));
  } else {
    if (!enemyWanderTarget || distanceBetweenPoints(enemy.x, enemy.y, enemyWanderTarget.x, enemyWanderTarget.y) < 140) {
      enemyWanderTarget = findWanderTarget();
      enemyPath = [];
      enemyPathTimer = 0;
    }
    moveMiezaruTowardPoint(enemyWanderTarget.x, enemyWanderTarget.y, dt, isFourKeyPhase() ? (def.endgameChaseSpeed || 7.6) * 0.72 : (def.wanderSpeed || 1.15));
  }

  enemy.visible = true;
  enemy.alpha = (magicMirrorTimer > 0 || isFourKeyPhase()) ? 1 : ((typeof isMiezaruVisibleToPlayer === "function" && isMiezaruVisibleToPlayer()) ? 0.92 : 0);
  ensureMiezaruClones(dt);
}


function isPlayerInAnySanctuary() {
  const pc = getEntityCenter(player);
  return isPointInAnySanctuary(pc);
}

function isPointInAnySanctuary(point) {
  if (mainShrine && isInsideRect(point, mainShrine)) return true;
  for (const shrine of shrines) {
    if (isInsideRect(point, shrine)) return true;
  }
  return false;
}

function distancePointToSegment(px, py, ax, ay, bx, by) {
  const abx = bx - ax;
  const aby = by - ay;
  const apx = px - ax;
  const apy = py - ay;
  const abLen2 = abx * abx + aby * aby;
  const t = abLen2 <= 0 ? 0 : clamp((apx * abx + apy * aby) / abLen2, 0, 1);
  const cx = ax + abx * t;
  const cy = ay + aby * t;
  return distanceBetweenPoints(px, py, cx, cy);
}

function findWatcherWarpPointAhead() {
  const dir = getFacingDirection();
  const pc = getEntityCenter(player);
  const attempts = [
    { x: pc.x + dir.x * 165, y: pc.y + dir.y * 165 },
    { x: pc.x + dir.x * 230 + dir.y * 90, y: pc.y + dir.y * 230 - dir.x * 90 },
    { x: pc.x + dir.x * 230 - dir.y * 90, y: pc.y + dir.y * 230 + dir.x * 90 },
    { x: pc.x - dir.x * 180, y: pc.y - dir.y * 180 }
  ];

  for (const p of attempts) {
    const x = clamp(p.x - enemy.width / 2, 80, WORLD_WIDTH - enemy.width - 80);
    const y = clamp(p.y - enemy.height / 2, 80, WORLD_HEIGHT - enemy.height - 80);
    const center = { x: x + enemy.width / 2, y: y + enemy.height / 2 };
    if (isPointInAnySanctuary(center)) continue;
    if (isCollidingWithObstacle(enemy, x, y, true)) continue;
    return { x, y };
  }

  return findSafeEnemySpawn();
}

function findWatcherFakeBoxPoint() {
  const dummy = { width: 122, height: 106, collisionWidth: 90, collisionHeight: 72 };
  for (let i = 0; i < 60; i++) {
    const zone = worldZones[Math.floor(Math.random() * worldZones.length)];
    if (!zone || zone.tag !== "space") continue;
    const x = randomRange(zone.x + 40, zone.x + zone.width - 170);
    const y = randomRange(zone.y + 40, zone.y + zone.height - 150);
    const center = { x: x + 61, y: y + 53 };
    if (isPointInAnySanctuary(center)) continue;
    if (distanceBetweenPoints(center.x, center.y, player.x, player.y) < 520) continue;
    if (isNearAnyTorii(x, y, 122, 106, 170)) continue;
    if (isCollidingWithObstacle(dummy, x, y, false)) continue;
    return { x, y };
  }
  return null;
}

function getWatcherFakeBoxLimit() {
  return isFourKeyPhase() ? 12 : 3;
}

function spawnWatcherFakeBox() {
  if (watcherFakeKeyBoxes.length >= getWatcherFakeBoxLimit()) return false;
  const p = findWatcherFakeBoxPoint();
  if (!p) return false;
  const box = {
    id: "fake_" + Date.now() + "_" + Math.random().toString(36).slice(2, 6),
    x: p.x,
    y: p.y,
    width: 122,
    height: 106,
    sprite: "sealed_key_box",
    opened: false,
    fake: true,
    eyeX: randomRange(30, 92),
    eyeY: randomRange(24, 82)
  };
  watcherFakeKeyBoxes.push(box);
  addObstacle(box.x, box.y, box.width, box.height, "fakeKeyBox", true, true);
  return true;
}

function ensureWatcherFakeBoxes() {
  if (!isFourKeyPhase()) return;
  let guard = 0;
  while (watcherFakeKeyBoxes.length < 10 && guard < 18) {
    guard++;
    if (!spawnWatcherFakeBox()) break;
  }
}

function getWatcherPhantomSound(type) {
  if (type === "tracker") return sounds.enemyVoice;
  if (type === "armed") return sounds.armedCapture;
  if (type === "beast") return sounds.beastDetect;
  if (type === "bugmaster") return sounds.bugmasterCapture;
  if (type === "nightShadow") return sounds.nightShadowCry;
  if (type === "kaishutsubotsu") return sounds.kaishutsubotsu;
  if (type === "miezaru") return sounds.miezaru;
  return sounds.enemyVoice;
}

function playWatcherPhantomSound(type) {
  const audio = getWatcherPhantomSound(type);
  if (!audio) return;
  try {
    setAudioVolume(audio, getMasterVolume() * getSeVolume() * 0.62);
    audio.currentTime = 0;
    audio.play().catch(() => {});
  } catch (e) {}
}

function spawnWatcherPhantom() {
  const type = currentEnemyType === "watcher" && isFourKeyPhase()
    ? "watcher"
    : ["tracker", "armed", "beast", "bugmaster", "nightShadow", "kaishutsubotsu", "miezaru"][Math.floor(Math.random() * 7)];
  const pc = getEntityCenter(player);
  const angle = Math.random() * Math.PI * 2;
  const dist = randomRange(260, 720);
  const startX = clamp(pc.x + Math.cos(angle) * dist, 160, WORLD_WIDTH - 160);
  const startY = clamp(pc.y + Math.sin(angle) * dist, 160, WORLD_HEIGHT - 160);

  watcherPhantoms.push({
    type,
    x: startX,
    y: startY,
    vx: 0,
    vy: 0,
    wobble: randomRange(0, Math.PI * 2),
    frame: 0,
    timer: currentEnemyType === "watcher" && isFourKeyPhase() ? 999 : 6.0,
    maxTimer: currentEnemyType === "watcher" && isFourKeyPhase() ? 999 : 6.0,
    clone: currentEnemyType === "watcher" && isFourKeyPhase()
  });
  playWatcherPhantomSound(type);
  const maxPhantoms = currentEnemyType === "watcher" && isFourKeyPhase() ? 5 : 7;
  if (watcherPhantoms.length > maxPhantoms) watcherPhantoms.shift();
}


function spawnWatcherObjectPhantom() {
  const pc = getEntityCenter(player);
  const type = Math.random() < 0.55 ? "car" : "pole";
  const size = type === "car" ? { width: 132, height: 72 } : { width: 48, height: 92 };

  for (let i = 0; i < 14; i++) {
    const angle = Math.random() * Math.PI * 2;
    const dist = randomRange(150, 520);
    const x = clamp(pc.x + Math.cos(angle) * dist - size.width / 2, 80, WORLD_WIDTH - size.width - 80);
    const y = clamp(pc.y + Math.sin(angle) * dist - size.height / 2, 80, WORLD_HEIGHT - size.height - 80);

    if (isOnRoad(x, y, size.width, size.height)) continue;
    if (isPointInAnySanctuary({ x: x + size.width / 2, y: y + size.height / 2 })) continue;

    watcherObjectPhantoms.push({
      type,
      x,
      y,
      width: size.width,
      height: size.height,
      timer: randomRange(5.0, 8.0),
      maxTimer: 8.0,
      wobble: randomRange(0, Math.PI * 2)
    });

    const maxObjects = 5;
    if (watcherObjectPhantoms.length > maxObjects) watcherObjectPhantoms.shift();
    return;
  }
}

function updateWatcherObjectPhantoms(dt) {
  for (let i = watcherObjectPhantoms.length - 1; i >= 0; i--) {
    const ph = watcherObjectPhantoms[i];
    if (window.counterattack?.isStunned(ph)) continue;
    ph.timer -= dt;
    ph.wobble += dt * 5;
    if (ph.timer <= 0) watcherObjectPhantoms.splice(i, 1);
  }
}

function drawWatcherObjectPhantoms() {
  if (!watcherObjectPhantoms || watcherObjectPhantoms.length === 0) return;
  wctx.save();
  wctx.translate(-cameraX, -cameraY);

  for (const ph of watcherObjectPhantoms) {
    if (!isVisible(ph)) continue;
    const alpha = Math.max(0.16, clamp(ph.timer / ph.maxTimer, 0, 1) * 0.46);
    const bob = Math.sin(ph.wobble) * 4;
    wctx.save();
    wctx.globalAlpha = alpha;
    wctx.filter = isFourKeyPhase() ? "none" : "blur(.65px) drop-shadow(0 0 16px rgba(255,255,255,.34))";
    if (ph.type === "car") {
      drawImageCentered(images.object_car, ph.x + ph.width / 2, ph.y + ph.height / 2 + bob, ph.width + 28, ph.height + 46);
    } else {
      drawImageCentered(images.object_pole, ph.x + ph.width / 2, ph.y + ph.height / 2 + bob, ph.width + 26, ph.height + 26);
    }
    wctx.restore();
  }

  wctx.restore();
}




function getWatcherGiantEyeSafePoint() {
  const pc = getEntityCenter(player);
  const baseAngle = Math.atan2(player.lastMoveY || 0.35, player.lastMoveX || 0.75) + Math.PI;
  const distances = [620, 760, 900, 1040];

  for (let d of distances) {
    for (let i = 0; i < 16; i++) {
      const angle = baseAngle + (i - 8) * (Math.PI / 16);
      const x = clamp(pc.x + Math.cos(angle) * d, 120, WORLD_WIDTH - 120);
      const y = clamp(pc.y + Math.sin(angle) * d, 120, WORLD_HEIGHT - 120);
      if (isPointInAnySanctuary({ x, y })) continue;
      if (segmentIntersectsAnySanctuary(x, y, pc.x, pc.y, 220)) continue;
      return { x, y };
    }
  }

  // 最終保険。画面端寄りに逃がす。
  const fallback = [
    { x: 180, y: 180 },
    { x: WORLD_WIDTH - 180, y: 180 },
    { x: 180, y: WORLD_HEIGHT - 180 },
    { x: WORLD_WIDTH - 180, y: WORLD_HEIGHT - 180 }
  ];
  for (const p of fallback) {
    if (!isPointInAnySanctuary(p)) return p;
  }
  return { x: 180, y: 180 };
}

function keepWatcherGiantEyeOutOfSanctuary(prevX, prevY, nextX, nextY) {
  const nextPoint = { x: nextX, y: nextY };

  if (isPointInAnySanctuary(nextPoint) || segmentIntersectsAnySanctuary(prevX, prevY, nextX, nextY, 220)) {
    const p = getWatcherGiantEyeSafePoint();
    watcherGiantEye.x = p.x;
    watcherGiantEye.y = p.y;
    return false;
  }

  watcherGiantEye.x = nextX;
  watcherGiantEye.y = nextY;
  return true;
}

function initWatcherGiantEye() {
  const pc = getEntityCenter(player);
  watcherGiantEye = { x: pc.x - 360, y: pc.y + 280, width: 520, height: 340, frame: 0 };
}
function updateWatcherGiantEye(dt) {
  if (currentEnemyType !== "watcher" || !isFourKeyPhase()) { watcherGiantEye = null; return; }
  if (!watcherGiantEye) initWatcherGiantEye();
  if (watcherGiantEye.counterDead || window.counterattack?.isStunned(watcherGiantEye)) return;

  const pc = getEntityCenter(player);

  // 安置内・安置に食い込む位置にいた場合は即座に外へ出す。
  if (isPointInAnySanctuary({ x: watcherGiantEye.x, y: watcherGiantEye.y })) {
    const p = getWatcherGiantEyeSafePoint();
    watcherGiantEye.x = p.x;
    watcherGiantEye.y = p.y;
  }

  const d = distanceBetweenPoints(watcherGiantEye.x, watcherGiantEye.y, pc.x, pc.y);
  if (d > 1100) {
    const p = getWatcherGiantEyeSafePoint();
    watcherGiantEye.x = p.x;
    watcherGiantEye.y = p.y;
  }

  const beforeX = watcherGiantEye.x;
  const beforeY = watcherGiantEye.y;
  const dx = pc.x - watcherGiantEye.x;
  const dy = pc.y - watcherGiantEye.y;
  const len = Math.max(1, Math.hypot(dx, dy));
  const speed = ENEMY_TYPES.ugomekimono.chaseSpeed || 0.95;
  const nextX = watcherGiantEye.x + (dx / len) * speed * 60 * dt;
  const nextY = watcherGiantEye.y + (dy / len) * speed * 60 * dt;

  keepWatcherGiantEyeOutOfSanctuary(beforeX, beforeY, nextX, nextY);

  watcherGiantEye.frame = (watcherGiantEye.frame + dt * 9) % 4;
  if (!isPlayerInAnySanctuary() && distanceBetweenPoints(watcherGiantEye.x, watcherGiantEye.y, pc.x, pc.y) < 135) startJumpscare();
}
function drawWatcherGiantEye() {
  if (!watcherGiantEye || watcherGiantEye.counterDead || currentEnemyType !== "watcher" || !isFourKeyPhase()) return;
  const img = images.watcherGiantEyeSheet || images.watcherSheet;
  if (!img || !img.complete) return;
  const frame = document.body.classList.contains("touchMode") ? 0 : (Math.floor(watcherGiantEye.frame) % 4);
  wctx.save();
  wctx.translate(-cameraX, -cameraY);
  wctx.globalAlpha = 0.94;
  // サイズは変更せず、重いdrop-shadowだけ外して軽量化する。
  wctx.filter = "none";
  if (img === images.watcherGiantEyeSheet) {
    wctx.drawImage(img, frame * 640, 0, 640, 640, watcherGiantEye.x - 300, watcherGiantEye.y - 300, 600, 600);
  } else {
    wctx.drawImage(img, frame * 627, 0, 627, 627, watcherGiantEye.x - 260, watcherGiantEye.y - 260, 520, 520);
  }
  wctx.restore();
}

function updateWatcherEnemy(dt) {
  // 監視者本体は誘導点に向かって動かない。残っていた誘導点は破棄する。
  enemyLurePoint = null;
  const def = getEnemyDef();
  enemy.visible = true;
  enemy.alpha = 1;
  enemyMode = "watch";

  if (enemyStunTimer > 0) {
    enemyStunTimer -= dt;
    return;
  }

  updateWatcherGiantEye(dt);
  const endgame = isFourKeyPhase();
  ensureWatcherBodyClones(dt);

  // 神具4つ以上でも幻影数・幻影頻度は増やさない。
  watcherWarpTimer -= dt;
  watcherPhantomTimer -= dt;
  watcherObjectPhantomTimer -= dt;
  watcherFakeBoxTimer -= dt;
  updateWatcherObjectPhantoms(dt);

  if (watcherWarpTimer <= 0) {
    const p = findWatcherWarpPointAhead();
    enemy.x = p.x;
    enemy.y = p.y;
    enemyPath = [];
    enemyPathTimer = 0;
    watcherWarpTimer = randomRange(def.nearWarpMin || 4.5, def.nearWarpMax || 7.5);
  }

  if (watcherPhantomTimer <= 0) {
    spawnWatcherPhantom();
    watcherPhantomTimer = randomRange(def.phantomMin || 9.0, def.phantomMax || 16.0);
  }

  if (watcherObjectPhantomTimer <= 0) {
    spawnWatcherObjectPhantom();
    watcherObjectPhantomTimer = randomRange(4.0, 8.0);
  }

  if (endgame) {
    ensureWatcherFakeBoxes();
  }

  if (watcherFakeBoxTimer <= 0) {
    spawnWatcherFakeBox();
    watcherFakeBoxTimer = endgame
      ? randomRange(5.0, 8.0)
      : randomRange(def.fakeBoxMin || 10.0, def.fakeBoxMax || 17.0);
  }

  updateWatcherPhantomAgents(dt);

  const maxPhantoms = 7;
  while (watcherPhantoms.length > maxPhantoms) watcherPhantoms.shift();
  const maxObjects = 5;
  while (watcherObjectPhantoms.length > maxObjects) watcherObjectPhantoms.shift();
}

function openWatcherFakeKeyBox(box) {
  if (box.counterDead || window.counterattack?.isStunned(box)) return;
  box.opened = true;
  showMessage("箱の中で、目が開いた。");
  startJumpscare();
}


function initUgomeTentacles() {
  ugomeTentacles = Array.from({ length: isFourKeyPhase() ? 20 : 10 }, (_, index) => createUgomeTentacle(index));
}

function createUgomeTentacle(index) {
  const root = getUgomeTentacleRoot(index);
  const audioKeys = [
    "ugomekimonoTentacleA",
    "ugomekimonoTentacleB",
    "ugomekimonoTentacleC",
    "ugomekimonoTentacleD",
    "ugomekimonoTentacleE",
    "ugomekimonoTentacleF",
    "ugomekimonoTentacleG",
    "ugomekimonoTentacleH",
    "ugomekimonoTentacleI",
    "ugomekimonoTentacleJ"
  ];
  return {
    index,
    x: root.x,
    y: root.y,
    startX: root.x,
    startY: root.y,
    targetX: root.x,
    targetY: root.y,
    vx: 0,
    vy: 0,
    state: "idle",
    timer: 0,
    cooldown: randomRange(2.2 + index * 0.75, 4.8 + index * 0.75),
    frame: 0,
    audioKey: audioKeys[index] || "ugomekimonoTentacleA"
  };
}

function getUgomeTentacleRoot(index) {
  const ec = getEntityCenter(enemy);
  const count = Math.max(1, ugomeTentacles.length || (isFourKeyPhase() ? 20 : 10));
  const t = count === 1 ? 0.5 : index / (count - 1);
  const span = enemy.width * 0.72;
  const offset = -span / 2 + t * span;
  const vertical = -enemy.height * 0.17 - Math.sin(t * Math.PI) * 55;
  return { x: ec.x + offset, y: ec.y + vertical };
}

function launchUgomeTentacle(t) {
  const pc = getEntityCenter(player);
  const root = getUgomeTentacleRoot(t.index);
  t.startX = root.x;
  t.startY = root.y;
  t.x = root.x;
  t.y = root.y;
  const lead = {
    x: pc.x + player.lastMoveX * 80,
    y: pc.y + player.lastMoveY * 80
  };
  t.targetX = lead.x;
  t.targetY = lead.y;
  const angle = Math.atan2(t.targetY - t.y, t.targetX - t.x);
  const speed = getEnemyDef().tentacleSpeed || 630;
  t.vx = Math.cos(angle) * speed;
  t.vy = Math.sin(angle) * speed;
  t.timer = Math.max(getEnemyDef().tentacleReachTime || 9.0, distanceBetweenPoints(t.x, t.y, t.targetX, t.targetY) / Math.max(1, speed) + 1.2);
  t.state = "reaching";
}

function releaseUgomeGrab(message = true) {
  ugomeGrab = null;
  ugomeEscapeProgress = 0;
  for (const t of ugomeTentacles) {
    if (t.counterDead) continue;
    if (t.state === "grabbing") {
      t.state = "returning";
      t.cooldown = randomRange(3.5, 6.0);
    }
  }
  updateUgomeEscapeGauge(false, 0);
  if (message) showMessage("触手を振りほどいた！");
}


function wouldUgomeEnterSanctuary(testX, testY) {
  const center = getEntityCenter({ ...enemy, x: testX, y: testY });
  if (isPointInAnySanctuary(center)) return true;

  const rect = getCollisionRect(enemy, testX, testY);
  for (const o of obstacles) {
    if (!isSanctuaryBlocker(o)) continue;
    const or = { left: o.x, top: o.y, right: o.x + o.width, bottom: o.y + o.height };
    if (rectsOverlap(rect, or)) return true;
  }

  return false;
}

function moveUgomekimonoTowardPoint(x, y, dt, speedValue) {
  const ec = getEntityCenter(enemy);
  const dx = x - ec.x;
  const dy = y - ec.y;
  const dist = Math.max(0.001, Math.hypot(dx, dy));
  const dirX = dx / dist;
  const dirY = dy / dist;
  const step = speedValue * 60 * dt;

  enemyFacingX = dirX;
  enemyFacingY = dirY;

  const nextX = enemy.x + dirX * step;
  if (!wouldUgomeEnterSanctuary(nextX, enemy.y)) {
    enemy.x = nextX;
  }

  const nextY = enemy.y + dirY * step;
  if (!wouldUgomeEnterSanctuary(enemy.x, nextY)) {
    enemy.y = nextY;
  }

  enemy.x = clamp(enemy.x, 0, WORLD_WIDTH - enemy.width);
  enemy.y = clamp(enemy.y, 0, WORLD_HEIGHT - enemy.height);
}

function pullPlayerByUgome(dx, dy, dt) {
  const pullSpeed = 185;
  const dist = Math.max(1, Math.hypot(dx, dy));
  const moveX = (dx / dist) * pullSpeed * dt;
  const moveY = (dy / dist) * pullSpeed * dt;

  const beforeX = player.x;
  const beforeY = player.y;
  moveEntity(player, moveX, moveY, false);

  const actualX = player.x - beforeX;
  const actualY = player.y - beforeY;
  const intended = Math.hypot(moveX, moveY);
  const actual = Math.hypot(actualX, actualY);

  return {
    moved: actual,
    blocked: intended > 0.5 && actual < intended * 0.35
  };
}


function updateUgomeTentacles(dt) {
  if (!ugomeTentacles.length) initUgomeTentacles();
  if (isFourKeyPhase() && ugomeTentacles.length < 20) {
    // Keep damage/death state of existing tentacles when entering the final form.
    if (window.counterattack?.enabled) {
      while (ugomeTentacles.length < 20) ugomeTentacles.push(createUgomeTentacle(ugomeTentacles.length));
    } else initUgomeTentacles();
  }
  const pc = getEntityCenter(player);

  for (const t of ugomeTentacles) {
    if (t.counterDead) continue;
    if (window.counterattack?.isStunned(t)) continue;
    t.frame = Math.floor(performance.now() / 110 + t.index) % 4;
    const root = getUgomeTentacleRoot(t.index);

    if (t.state === "idle") {
      t.x += (root.x - t.x) * Math.min(1, dt * 5);
      t.y += (root.y - t.y) * Math.min(1, dt * 5);
      t.cooldown -= dt;
      if (!ugomeGrab && t.cooldown <= 0) launchUgomeTentacle(t);
    } else if (t.state === "reaching") {
      t.timer -= dt;
      t.x += t.vx * dt;
      t.y += t.vy * dt;
      if (!isPlayerInAnySanctuary() && !ugomeGrab && distanceBetweenPoints(t.x, t.y, pc.x, pc.y) < 62) {
        if (useOmamoriProtection("触手")) {
          t.state = "returning";
          continue;
        }
        ugomeGrab = { tentacleIndex: t.index, snagged: false };
        ugomeEscapeProgress = 0;
        t.state = "grabbing";
        showMessage("触手が巻き付いた！走って振りほどけ！");
      } else if (t.timer <= 0 || isPointInAnySanctuary({ x: t.x, y: t.y })) {
        t.state = "returning";
      }
    } else if (t.state === "returning") {
      t.x += (root.x - t.x) * Math.min(1, dt * 8);
      t.y += (root.y - t.y) * Math.min(1, dt * 8);
      if (distanceBetweenPoints(t.x, t.y, root.x, root.y) < 30) {
        t.state = "idle";
        t.cooldown = randomRange(getEnemyDef().tentacleCooldownMin || 4.6, getEnemyDef().tentacleCooldownMax || 7.2);
      }
    } else if (t.state === "grabbing") {
      t.x = pc.x;
      t.y = pc.y;
    }
  }

  if (ugomeGrab) {
    if (findOmamoriSlot() >= 0 && useOmamoriProtection("触手")) {
      releaseUgomeGrab(false);
      showMessage("お守りの力で触手をすぐさま振り払った。");
      return;
    }

    const ec = getEntityCenter(enemy);
    const pc2 = getEntityCenter(player);
    const dx = ec.x - pc2.x;
    const dy = ec.y - pc2.y;

    if (!ugomeGrab.snagged) {
      const pullResult = pullPlayerByUgome(dx, dy, dt);
      if (pullResult.blocked) {
        ugomeGrab.snagged = true;
        showMessage("触手が障害物に引っかかった。走って振りほどけ！");
      }
    }

    // 体力ゲージ半分ぶん「走る」ことで解除。
    // スタミナドリンク中でも、走った量としては加算する。
    if (isRunning && player.isMoving) {
      ugomeEscapeProgress += STAMINA_DRAIN_PER_SECOND * dt;
    } else {
      ugomeEscapeProgress = Math.max(0, ugomeEscapeProgress - STAMINA_RECOVER_PER_SECOND * 0.16 * dt);
    }

    const requiredRun = STAMINA_MAX * 0.5;
    updateUgomeEscapeGauge(true, Math.min(1, ugomeEscapeProgress / requiredRun));
    if (ugomeEscapeProgress >= requiredRun) releaseUgomeGrab(true);
  }
}


function hasAllEnemiesCleared() {
  if (!progressData || !progressData.clearedEnemies) return false;
  const enemyTypes = Array.isArray(ALL_ENEMY_TYPES) ? ALL_ENEMY_TYPES : ["tracker", "armed", "beast", "bugmaster", "nightShadow", "kaishutsubotsu", "miezaru", "watcher", "ugomekimono"];
  return enemyTypes.every(type => !!progressData.clearedEnemies[type]);
}

function getRandomFieldPointAvoidingSanctuary(margin = 220) {
  for (let i = 0; i < 120; i++) {
    const x = randomRange(margin, WORLD_WIDTH - margin);
    const y = randomRange(margin, WORLD_HEIGHT - margin);
    if (isPointInAnySanctuary({ x, y })) continue;
    return { x, y };
  }
  return { x: WORLD_WIDTH / 2, y: WORLD_HEIGHT / 2 };
}

function rectForCenter(x, y, width, height) {
  return {
    left: x - width / 2,
    right: x + width / 2,
    top: y - height / 2,
    bottom: y + height / 2
  };
}

function ugomeBindPlayer(source = "触手", sourceId = null) {
  if (playerInvincible || useOmamoriProtection(source)) return;
  ugomeGroundBind = { progress: 0, source, sourceId };
  player.isMoving = false;
  isRunning = false;
  showMessage(`${source}に絡みつかれ、動けない！走って振りほどけ。`);
}

function updateUgomeGroundBind(dt) {
  if (!ugomeGroundBind) return false;

  const runKey = isRunKeyDown();
  const moving = mobileInputActive && Math.hypot(mobileMoveX, mobileMoveY) > 0.12;

  isRunning = runKey && moving && stamina > 0 && !isTired;
  if (isRunning) {
    ugomeGroundBind.progress += dt;
    if (staminaDrinkTimer <= 0) stamina = Math.max(0, stamina - STAMINA_DRAIN_PER_SECOND * dt);
    staminaVisibleTimer = 1.2;
  } else {
    ugomeGroundBind.progress = Math.max(0, ugomeGroundBind.progress - dt * 0.25);
  }

  updateStaminaGauge(isRunning, staminaVisibleTimer > 0 || isRunning);
  updateUgomeEscapeGauge(true, clamp(ugomeGroundBind.progress / 1.9, 0, 1));

  if (ugomeGroundBind.progress >= 1.9) {
    const escapedSourceId = ugomeGroundBind.sourceId;
    if (escapedSourceId) {
      ugomeGroundTentacles = ugomeGroundTentacles.filter(t => t.id !== escapedSourceId);
    }
    ugomeGroundBind = null;
    updateUgomeEscapeGauge(false, 0);
    showMessage("触手を振りほどいた！");
  }

  player.isMoving = false;
  return true;
}

function spawnUgomeGroundTentacle() {
  const p = getRandomFieldPointAvoidingSanctuary(280);
  ugomeGroundTentacles.push({
    id: "ugt_" + Date.now() + "_" + Math.random().toString(36).slice(2),
    x: p.x,
    y: p.y,
    radius: randomRange(46, 70),
    timer: randomRange(12.0, 18.0),
    frame: Math.floor(Math.random() * 4),
    wobble: Math.random() * Math.PI * 2
  });
  while (ugomeGroundTentacles.length > (isFourKeyPhase() ? 28 : 16)) ugomeGroundTentacles.shift();
}

function spawnUgomeTentacleGroup() {
  const pc = getEntityCenter(player);
  const ec = getEntityCenter(enemy);
  const p = getRandomFieldPointAvoidingSanctuary(260);
  const endX = clamp(p.x + randomRange(-480, 480), 120, WORLD_WIDTH - 120);
  const endY = clamp(p.y + randomRange(-480, 480), 120, WORLD_HEIGHT - 120);
  const count = 5 + Math.floor(Math.random() * 4);
  const group = {
    rootX: ec.x,
    rootY: ec.y,
    endX,
    endY,
    timer: randomRange(12.0, 18.0),
    width: randomRange(80, 116),
    count,
    wobble: Math.random() * Math.PI * 2
  };
  ugomeTentacleGroups.push(group);
  while (ugomeTentacleGroups.length > (isFourKeyPhase() ? 4 : 2)) ugomeTentacleGroups.shift();
}

function getUgomeTentacleGroupRects() {
  const rects = [];
  if (!ugomeTentacleGroups || !ugomeTentacleGroups.length) return rects;

  for (const g of ugomeTentacleGroups) {
    if (g.counterDead) continue;
    const dx = g.endX - g.rootX;
    const dy = g.endY - g.rootY;
    const len = Math.max(1, Math.hypot(dx, dy));
    const steps = Math.max(3, Math.ceil(len / 260));
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const x = g.rootX + dx * t;
      const y = g.rootY + dy * t;
      rects.push(rectForCenter(x, y, g.width, g.width));
    }
  }
  return rects;
}

function updateUgomeExtraTentacles(dt) {
  if (currentEnemyType !== "ugomekimono") {
    ugomeGroundTentacles = [];
    ugomeTentacleGroups = [];
    ugomeGroundBind = null;
    return;
  }

  ugomeGroundTentacleTimer -= dt;
  ugomeTentacleGroupTimer -= dt;

  const targetGroundTentacles = isFourKeyPhase() ? 18 : 10;
  const targetGroups = isFourKeyPhase() ? 5 : 2;
  const minGroups = 1;

  // 一気に増やさない。神具4つ以上でも10秒ごとに1つずつ増やす。
  if (ugomeGroundTentacles.length < targetGroundTentacles && ugomeGroundTentacleTimer <= 0) {
    spawnUgomeGroundTentacle();
    ugomeGroundTentacleTimer = isFourKeyPhase() ? 10.0 : randomRange(1.4, 2.8);
  }

  if (ugomeTentacleGroups.length < Math.max(minGroups, targetGroups) && ugomeTentacleGroupTimer <= 0) {
    spawnUgomeTentacleGroup();
    ugomeTentacleGroupTimer = isFourKeyPhase() ? 10.0 : randomRange(5.0, 8.0);
  }

  while (ugomeGroundTentacles.length > targetGroundTentacles) ugomeGroundTentacles.shift();
  while (ugomeTentacleGroups.length > targetGroups) ugomeTentacleGroups.shift();

  const pc = getEntityCenter(player);
  for (let i = ugomeGroundTentacles.length - 1; i >= 0; i--) {
    const t = ugomeGroundTentacles[i];
    if (t.counterDead || window.counterattack?.isStunned(t)) continue;
    t.timer -= dt;
    t.wobble += dt * 8;
    t.frame = (t.frame + dt * 9) % 4;

    if (t.timer <= 0) {
      ugomeGroundTentacles.splice(i, 1);
      continue;
    }

    if (!ugomeGroundBind && distanceBetweenPoints(pc.x, pc.y, t.x, t.y) < t.radius + 36) {
      ugomeBindPlayer("地面から生えた触手", t.id);
    }
  }

  for (let i = ugomeTentacleGroups.length - 1; i >= 0; i--) {
    if (ugomeTentacleGroups[i].counterDead || window.counterattack?.isStunned(ugomeTentacleGroups[i])) continue;
    ugomeTentacleGroups[i].timer -= dt;
    ugomeTentacleGroups[i].wobble += dt * 3.4;
    if (ugomeTentacleGroups[i].timer <= 0 && ugomeTentacleGroups.length > minGroups) {
      ugomeTentacleGroups.splice(i, 1);
    }
  }
}

function drawUgomeExtraTentacles() {
  if (currentEnemyType !== "ugomekimono") return;
  const sheet = images.ugomekimonoTentacleSheet;
  const bound = images.ugomekimonoBoundTentacleSheet;
  wctx.save();
  wctx.translate(-cameraX, -cameraY);

  if (sheet && sheet.complete) {
    for (const g of ugomeTentacleGroups) {
    if (g.counterDead) continue;
      const dx = g.endX - g.rootX;
      const dy = g.endY - g.rootY;
      const angle = Math.atan2(dy, dx);
      const len = Math.max(80, Math.hypot(dx, dy));
      const frame = Math.floor((performance.now() / 120 + g.wobble) % 4);
      wctx.save();
      wctx.globalAlpha = 0.9;
      wctx.translate(g.rootX, g.rootY);
      wctx.rotate(angle);
      const visualWidth = g.width * 1.45;
      wctx.drawImage(sheet, frame * 627, 0, 627, 627, 0, -visualWidth / 2, len, visualWidth);
      wctx.restore();

      wctx.save();
      wctx.globalAlpha = 0.78;
      wctx.fillStyle = "rgba(35,5,8,.75)";
      wctx.beginPath();
      wctx.arc(g.endX, g.endY, g.width * 0.68, 0, Math.PI * 2);
      wctx.fill();
      wctx.restore();
    }
  }

  for (const t of ugomeGroundTentacles) {
    if (t.counterDead) continue;
    const frame = Math.floor(t.frame) % 4;
    const pulse = 1 + Math.sin(t.wobble) * 0.08;
    wctx.save();
    wctx.globalAlpha = clamp(t.timer / 1.2, 0.35, 0.95);
    if (bound && bound.complete) {
      wctx.drawImage(bound, frame * 627, 0, 627, 627, t.x - t.radius * pulse, t.y - t.radius * 1.2 * pulse, t.radius * 2 * pulse, t.radius * 2.1 * pulse);
    } else {
      wctx.fillStyle = "rgba(26,6,10,.88)";
      wctx.beginPath();
      wctx.arc(t.x, t.y, t.radius * pulse, 0, Math.PI * 2);
      wctx.fill();
    }
    wctx.restore();
  }

  wctx.restore();
}

function keepUgomeVisualOutOfSanctuary() {
  if (currentEnemyType !== "ugomekimono" || gameState === "clearEvent") return;
  const ec = getEntityCenter(enemy);
  const buffers = [];
  if (mainShrine) buffers.push({ x: mainShrine.x - 360, y: mainShrine.y - 360, width: mainShrine.width + 720, height: mainShrine.height + 720 });
  for (const s of shrines) buffers.push({ x: s.x - 260, y: s.y - 260, width: s.width + 520, height: s.height + 520 });
  for (const r of buffers) {
    const inside = ec.x >= r.x && ec.x <= r.x + r.width && ec.y >= r.y && ec.y <= r.y + r.height;
    if (!inside) continue;
    const cx = r.x + r.width / 2;
    const cy = r.y + r.height / 2;
    const dx = ec.x - cx;
    const dy = ec.y - cy;
    const len = Math.max(1, Math.hypot(dx, dy));
    enemy.x += (dx / len) * 22;
    enemy.y += (dy / len) * 22;
    enemy.x = clamp(enemy.x, 0, WORLD_WIDTH - enemy.width);
    enemy.y = clamp(enemy.y, 0, WORLD_HEIGHT - enemy.height);
  }
}

function startTrackerLeapToPlayer() {
  const pc = getEntityCenter(player);
  const ec = getEntityCenter(enemy);
  const angle = Math.atan2(pc.y - ec.y, pc.x - ec.x);
  const dist = Math.min(980, Math.max(420, distanceBetweenPoints(ec.x, ec.y, pc.x, pc.y) - 260));
  trackerLeapStart = { x: enemy.x, y: enemy.y };
  trackerLeapTarget = {
    x: clamp(ec.x + Math.cos(angle) * dist - enemy.width / 2, 0, WORLD_WIDTH - enemy.width),
    y: clamp(ec.y + Math.sin(angle) * dist - enemy.height / 2, 0, WORLD_HEIGHT - enemy.height)
  };
  trackerLeapTimer = 0.62;
  trackerLeapCooldown = randomRange(9.0, 13.5);
  showMessage("追跡者が宙を描くように跳んだ！");
}

function updateTrackerLeap(dt) {
  if (currentEnemyType !== "tracker" || trackerLeapTimer <= 0 || !trackerLeapStart || !trackerLeapTarget) return false;
  trackerLeapTimer -= dt;
  const t = clamp(1 - trackerLeapTimer / 0.62, 0, 1);
  const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const arc = Math.sin(Math.PI * t) * 220;
  enemy.x = trackerLeapStart.x + (trackerLeapTarget.x - trackerLeapStart.x) * ease;
  enemy.y = trackerLeapStart.y + (trackerLeapTarget.y - trackerLeapStart.y) * ease - arc;
  enemyMode = "leap";
  if (trackerLeapTimer <= 0) {
    enemy.y += arc;
    trackerLeapStart = null;
    trackerLeapTarget = null;
  }
  return true;
}

function findArmedGrappleObstaclePoint() {
  const ec = getEntityCenter(enemy);
  const candidates = obstacles.filter(o => o.blockEnemy && !isSanctuaryBlocker(o) && o.type !== "fakeKeyBox");
  let best = null;
  let bestD = Infinity;
  for (let i = 0; i < 80; i++) {
    const o = candidates[Math.floor(Math.random() * candidates.length)];
    if (!o) continue;
    const p = { x: o.x + o.width / 2, y: o.y + o.height / 2 };
    const d = distanceBetweenPoints(ec.x, ec.y, p.x, p.y);
    if (segmentIntersectsAnySanctuary(ec.x, ec.y - 18, p.x, p.y, 36)) continue;
    if (d > 420 && d < 1800 && d < bestD) { best = p; bestD = d; }
  }
  return best;
}

function startArmedGrappleMove() {
  const p = findArmedGrappleObstaclePoint();
  if (!p) return false;
  const ec = getEntityCenter(enemy);
  armedGrapple = {
    fromX: ec.x,
    fromY: ec.y,
    x: p.x,
    y: p.y,
    timer: 0.7,
    maxTimer: 0.7
  };
  armedGrappleCooldown = randomRange(8.0, 12.0);
  playOneShot(sounds.armedThrow);
  showMessage("武装者がチェーンフックを障害物に突き刺した！");
  return true;
}

function updateArmedGrapple(dt) {
  if (currentEnemyType !== "armed" || !armedGrapple) return false;
  armedGrapple.timer -= dt;
  const ec = getEntityCenter(enemy);
  if (segmentIntersectsAnySanctuary(ec.x, ec.y - 18, armedGrapple.x, armedGrapple.y, 36)) {
    armedGrapple = null;
    return false;
  }
  const dx = armedGrapple.x - ec.x;
  const dy = armedGrapple.y - ec.y;
  const len = Math.max(1, Math.hypot(dx, dy));
  enemyFacingX = dx / len;
  enemyFacingY = dy / len;
  moveEntitySmart(enemy, enemyFacingX, enemyFacingY, 34.0 * 60 * dt);
  if (distanceBetweenPoints(ec.x, ec.y, armedGrapple.x, armedGrapple.y) < 90 || armedGrapple.timer <= 0) {
    armedGrapple = null;
  }
  return true;
}

function drawArmedGrappleLine() {
  if (!armedGrapple || currentEnemyType !== "armed") return;
  const ec = getEntityCenter(enemy);
  if (segmentIntersectsAnySanctuary(ec.x, ec.y - 18, armedGrapple.x, armedGrapple.y, 36)) return;
  wctx.save();
  wctx.translate(-cameraX, -cameraY);
  wctx.strokeStyle = "rgba(210,210,220,.86)";
  wctx.lineWidth = 5;
  wctx.setLineDash([12, 9]);
  wctx.beginPath();
  wctx.moveTo(ec.x, ec.y - 18);
  wctx.lineTo(armedGrapple.x, armedGrapple.y);
  wctx.stroke();
  wctx.setLineDash([]);
  if (images.chainHook && images.chainHook.complete) {
    const a = Math.atan2(armedGrapple.y - ec.y, armedGrapple.x - ec.x);
    wctx.translate(armedGrapple.x, armedGrapple.y);
    wctx.rotate(a);
    wctx.drawImage(images.chainHook, -24, -24, 60, 60);
  }
  wctx.restore();
}

function startBeastSpiralRun() {
  beastSpiralMode = true;
  beastSpiralTimer = 0; // cooldown only; active spirals do not expire.
  beastSpiralIndex = 0;
  const ec = getEntityCenter(enemy);
  const corners = getBeastSpiralCorners(0);
  beastSpiralStartCorner = 0;
  for (let i = 1; i < corners.length; i++) {
    const a = corners[i], b = corners[beastSpiralStartCorner];
    if (Math.hypot(a.x - ec.x, a.y - ec.y) < Math.hypot(b.x - ec.x, b.y - ec.y)) beastSpiralStartCorner = i;
  }
  beastSpiralEntry = corners[beastSpiralStartCorner];
  stopAudio(sounds.beastSniff);
  beastSniffAudioActive = false;
}

function getBeastSpiralCorners(lap) {
  // One inset per complete lap (the former 95px per corner becomes 380px per lap).
  // Shrink toward the shrine's existing center, never relocate the shrine.
  const centerX = mainShrine ? mainShrine.x + mainShrine.width / 2 : WORLD_WIDTH / 2;
  const centerY = mainShrine ? mainShrine.y + mainShrine.height / 2 : WORLD_HEIGHT / 2;
  const inset = 280 + lap * 380;
  const left = Math.min(centerX, inset), right = Math.max(centerX, WORLD_WIDTH - inset);
  const top = Math.min(centerY, inset), bottom = Math.max(centerY, WORLD_HEIGHT - inset);
  return [{x:left,y:top},{x:right,y:top},{x:right,y:bottom},{x:left,y:bottom}];
}

function getBeastSpiralTarget() {
  if (beastSpiralEntry) return beastSpiralEntry;
  const lap = Math.floor(beastSpiralIndex / 4);
  return getBeastSpiralCorners(lap)[(beastSpiralStartCorner + beastSpiralIndex + 1) % 4];
}

function updateBeastSpiral(dt) {
  if (currentEnemyType !== "beast" || !beastSpiralMode) return false;
  enemyMode = "spiral";
  const target = getBeastSpiralTarget();
  const before = getEntityCenter(enemy);
  const dx = target.x - before.x, dy = target.y - before.y;
  const distance = Math.hypot(dx, dy);
  const step = Math.min(distance, 38.0 * 60 * dt);
  const nx = distance > 0 ? dx / distance : 0, ny = distance > 0 ? dy / distance : 0;
  const next = {x: before.x + nx * step, y: before.y + ny * step};
  enemyFacingX = nx; enemyFacingY = ny;
  if (segmentTouchesSacredTree(before.x, before.y, next.x, next.y)) {
    // Stop on the outside of the tree even when one frame crosses its entire wall.
    let low = 0, high = 1;
    for (let i = 0; i < 16; i++) {
      const mid = (low + high) / 2;
      if (segmentTouchesSacredTree(before.x, before.y, before.x + nx * step * mid, before.y + ny * step * mid)) high = mid;
      else low = mid;
    }
    enemy.x += nx * step * low; enemy.y += ny * step * low;
    beastSpiralMode = false;
    beastSpiralEntry = null;
    beastSpiralTimer = randomRange(7.0, 12.0);
    beastSniffTimer = 0.4;
    return true;
  }
  enemy.x = next.x - enemy.width / 2;
  enemy.y = next.y - enemy.height / 2;
  if (distance <= step + 0.01) {
    if (beastSpiralEntry) beastSpiralEntry = null;
    else beastSpiralIndex++;
  }
  return true;
}

function segmentTouchesSacredTree(x1, y1, x2, y2) {
  for (const o of obstacles) {
    if (o.type !== "sacredTreeWall") continue;
    if (x2 >= o.x && x2 <= o.x + o.width && y2 >= o.y && y2 <= o.y + o.height) return true;
    if (segmentIntersectsRect(x1, y1, x2, y2, o, 30)) return true;
  }
  return false;
}

function startNightShadowLinePassDive() {
  const pc = getEntityCenter(player);
  nightShadowLinePass = true;
  nightShadowComboActive = false;
  nightShadowDiveComboRemaining = 0;
  beginNightShadowDive(pc, "linePass");
  nightShadowLineDiveCooldown = randomRange(8.0, 13.0);
}

function startKaishutsubotsuWarpFlurry() {
  kaishutsubotsuWarpFlurryTimer = 2.0;
  kaishutsubotsuWarpFlurryStep = 0;
  kaishutsubotsuWarpFlurryCooldown = randomRange(11.0, 16.0);
  showMessage("怪出異没が周囲を荒ぶりながら飛び回る！");
}

function updateKaishutsubotsuWarpFlurry(dt) {
  if (currentEnemyType !== "kaishutsubotsu" || kaishutsubotsuWarpFlurryTimer <= 0) return false;
  kaishutsubotsuWarpFlurryTimer -= dt;
  kaishutsubotsuWarpFlurryStep -= dt;
  enemyMode = "warpFlurry";
  if (kaishutsubotsuWarpFlurryStep <= 0) {
    const pc = getEntityCenter(player);
    const p = findSafeEnemyWarpNearPoint(pc.x, pc.y, 220, 520, 36);
    if (p) { enemy.x = p.x; enemy.y = p.y; }
    kaishutsubotsuWarpFlurryStep = 0.16;
  }
  if (kaishutsubotsuWarpFlurryTimer <= 0) startKaishutsubotsuRush();
  return true;
}

function ensureMiezaruClones(dt) {
  if (currentEnemyType !== "miezaru" || !isFourKeyPhase()) {
    miezaruClones = [];
    return;
  }
  miezaruCloneTimer -= dt;
  if ((!window.counterattack?.enabled && miezaruClones.length < 2) || miezaruCloneTimer <= 0) {
    const count = Math.max(2, miezaruClones.length);
    while (miezaruClones.length < count + 1 && miezaruClones.length < 4) {
      const p = findMiezaruWarpPoint();
      miezaruClones.push({
        x: p.x, y: p.y, timer: randomRange(10.0, 16.0), frame: 0, alpha: 0.72,
        targetX: p.x, targetY: p.y, retargetTimer: 0, orbitRadius: randomRange(170, 410)
      });
    }
    miezaruCloneTimer = randomRange(8.0, 13.0);
  }
  const pc = getEntityCenter(player);
  for (let i = miezaruClones.length - 1; i >= 0; i--) {
    const c = miezaruClones[i];
    if (window.counterattack?.isStunned(c)) continue;
    c.timer -= dt;
    c.frame = (c.frame + dt * 8) % 4;
    if (c.timer <= 0) { miezaruClones.splice(i, 1); continue; }
    c.retargetTimer = (Number(c.retargetTimer) || 0) - dt;
    const playerDistance = distanceBetweenPoints(c.x, c.y, pc.x, pc.y);
    const targetDistance = distanceBetweenPoints(c.x, c.y, Number(c.targetX) || pc.x, Number(c.targetY) || pc.y);
    if (c.retargetTimer <= 0 || targetDistance < 34 || playerDistance < 125 || playerDistance > 650) {
      const angle = Math.random() * Math.PI * 2;
      const radius = playerDistance > 650 ? randomRange(210, 340) : randomRange(170, 430);
      c.orbitRadius = radius;
      c.targetX = clamp(pc.x + Math.cos(angle) * radius, 100, WORLD_WIDTH - 100);
      c.targetY = clamp(pc.y + Math.sin(angle) * radius, 100, WORLD_HEIGHT - 100);
      c.retargetTimer = randomRange(0.65, 1.55);
    }
    const dx = c.targetX - c.x, dy = c.targetY - c.y, len = Math.max(1, Math.hypot(dx, dy));
    const speed = 8.8 * 0.42 * 60;
    c.x += (dx / len) * Math.min(len, speed * dt);
    c.y += (dy / len) * Math.min(len, speed * dt);
  }
}

function drawMiezaruClones() {
  if (!miezaruClones.length || currentEnemyType !== "miezaru") return;
  const def = ENEMY_TYPES.miezaru;
  const img = images[def.sheetKey];
  if (!img || !img.complete) return;
  const fw = def.spriteFrameWidth || 760, fh = def.spriteFrameHeight || 760;
  wctx.save();
  wctx.translate(-cameraX, -cameraY);
  for (const c of miezaruClones) {
    const frame = Math.floor(c.frame) % (def.frameCount || 4);
    wctx.save();
    wctx.globalAlpha = c.alpha;
    wctx.filter = "drop-shadow(0 0 16px rgba(56,189,248,.35))";
    wctx.drawImage(img, frame * fw, 0, fw, fh, c.x - def.renderWidth / 2, c.y - def.renderHeight / 2, def.renderWidth, def.renderHeight);
    wctx.restore();
  }
  wctx.restore();
}

function ensureWatcherBodyClones(dt) {
  if (currentEnemyType !== "watcher" || !isFourKeyPhase()) return;
  if (!watcherGiantEye) return;
  watcherPhantomTimer -= dt;
  if (watcherPhantoms.length <= 0) watcherPhantomTimer = Math.max(watcherPhantomTimer, 10.0);
  if (watcherPhantomTimer <= 0 && watcherPhantoms.length < 5) {
    spawnWatcherPhantom();
    watcherPhantomTimer = 10.0;
  }
}

function startWatcherClearWarpFlurry() {
  clearEventPhase = 2.7;
  clearEventTimer = 0;
  enemyCanEnterSanctuary = false;
  showMessage("監視者があなたの周囲で荒ぶりながら瞬いている。");
}


function updateUgomekimonoEnemy(dt) {
  if (moveEnemyTowardUniversalLure(dt)) return;
  const def = getEnemyDef();
  enemy.visible = true;
  enemy.alpha = 1;
  enemyMode = "chase";

  if (enemyStunTimer > 0) {
    enemyStunTimer -= dt;
    enemyMode = "stun";
    return;
  }

  const pc = getEntityCenter(player);
  moveUgomekimonoTowardPoint(pc.x, pc.y, dt, isFourKeyPhase() ? (def.endgameChaseSpeed || 2.6) : (def.chaseSpeed || 0.95));
  keepUgomeVisualOutOfSanctuary();
  updateUgomeTentacles(dt);
  updateUgomeExtraTentacles(dt);
}

function drawUgomeTentacles() {
  if (currentEnemyType !== "ugomekimono") return;
  if (!ugomeTentacles || !ugomeTentacles.length) return;

  const sheet = images.ugomekimonoTentacleSheet;
  const bound = images.ugomekimonoBoundTentacleSheet;
  if (!sheet || !sheet.complete) return;

  wctx.save();
  wctx.translate(-cameraX, -cameraY);

  for (const t of ugomeTentacles) {
    if (t.counterDead) continue;
    if (t.state === "grabbing") continue;
    const root = getUgomeTentacleRoot(t.index);
    const angle = Math.atan2(t.y - root.y, t.x - root.x);
    const len = Math.max(80, distanceBetweenPoints(root.x, root.y, t.x, t.y));
    const fw = 627;
    const fh = 627;
    const frame = t.frame % 4;

    wctx.save();
    wctx.translate(root.x, root.y);
    wctx.rotate(angle);
    wctx.globalAlpha = t.state === "idle" ? 0.72 : 0.96;
    wctx.drawImage(sheet, frame * fw, 0, fw, fh, 0, -58, len, 116);
    wctx.restore();
  }

  if (ugomeGrab && bound && bound.complete) {
    const pc = getEntityCenter(player);
    const fw = 627;
    const fh = 627;
    const frame = Math.floor(performance.now() / 105) % 4;
    wctx.save();
    wctx.globalAlpha = 0.96;
    wctx.translate(pc.x, pc.y + Math.sin(performance.now() / 70) * 2);
    wctx.drawImage(bound, frame * fw, 0, fw, fh, -96, -90, 192, 180);
    wctx.restore();
  }

  wctx.restore();
}

function updateUgomekimonoAudio(dt) {
  if (currentEnemyType !== "ugomekimono" || !(gameState === "playing" || gameState === "clearEvent")) {
    stopAudio(sounds.ugomekimonoMove);
    stopAudio(sounds.ugomekimonoTentacleA);
    stopAudio(sounds.ugomekimonoTentacleB);
    stopAudio(sounds.ugomekimonoTentacleC);
    stopAudio(sounds.ugomekimonoTentacleD);
    return;
  }

  const pc = getEntityCenter(player);
  const ec = getEntityCenter(enemy);
  const bodyD = distanceBetweenPoints(pc.x, pc.y, ec.x, ec.y);
  const bodyT = clamp(1 - bodyD / 2600, 0, 1);
  setAudioVolume(sounds.ugomekimonoMove, getMasterVolume() * getBgmVolume() * Math.pow(bodyT, 2.2) * 0.62);
  if (sounds.ugomekimonoMove.paused) sounds.ugomekimonoMove.play().catch(() => {});

  for (const t of ugomeTentacles) {
    if (t.counterDead) continue;
    const audio = sounds[t.audioKey];
    if (!audio) continue;
    const d = distanceBetweenPoints(pc.x, pc.y, t.x, t.y);
    const tt = clamp(1 - d / 1600, 0, 1);
    const active = t.state === "reaching" || t.state === "grabbing";
    setAudioVolume(audio, active ? getMasterVolume() * getSeVolume() * Math.pow(tt, 1.65) * 0.72 : 0);
    if (active && audio.paused) audio.play().catch(() => {});
    if (!active && !audio.paused) audio.pause();
  }
}


function forceEnemyInvestigatePoint(x, y, timer = 6.0, speedMultiplier = 1.0, reason = "lure") {
  if (!enemy || !Number.isFinite(x) || !Number.isFinite(y)) return;

  const isFirecracker = reason === "firecracker";
  const isCounterNoise = reason === "counter_shot" || reason === "counter_explosion";
  const isNoiseTrap = reason === "trap_noise";
  const isForcedNoise = isFirecracker || isCounterNoise;
  if (enemyLurePoint && enemyLurePoint.reason === "firecracker" && enemyLurePoint.timer > 0 && !isFirecracker) {
    return;
  }
  if (isFirecracker) {
    timer = Math.max(10.5, Number(timer) || 10.5);
    speedMultiplier = Math.max(2.05, Number(speedMultiplier) || 2.05);
  }

  if (currentEnemyType === "watcher") {
    enemyLurePoint = null;
    enemyPath = [];
    enemyPathTimer = 0;
    enemyWanderTarget = null;
    enemyLostSightTimer = 0;
    enemyStuckTimer = 0;
    enemyMode = "watch";
    if (isForcedNoise) {
      // The Watcher may react to a shot/explosion only by teleporting; it never walks.
      const p = findSafeEnemyWarpNearPoint(x, y, 0, 180, 48) || findSafeEnemyWarpNearPoint(x, y, 180, 360, 48);
      if (p) { enemy.x = p.x; enemy.y = p.y; }
      watcherWarpTimer = Math.max(watcherWarpTimer, 1.2);
    } else {
      watcherPhantomTimer = Math.min(watcherPhantomTimer, 1.0);
      watcherObjectPhantomTimer = Math.min(watcherObjectPhantomTimer, 1.2);
      watcherFakeBoxTimer = Math.min(watcherFakeBoxTimer, isFourKeyPhase() ? 0.25 : 1.0);
    }
    return;
  }

  enemyLurePoint = {
    x: clamp(x, 60, WORLD_WIDTH - 60),
    y: clamp(y, 60, WORLD_HEIGHT - 60),
    timer,
    speedMultiplier,
    reason,
    priority: isFirecracker ? 99 : 3
  };

  enemyPath = [];
  enemyPathTimer = 0;
  enemyWanderTarget = null;
  enemyLostSightTimer = Math.max(enemyLostSightTimer, timer);
  enemyStuckTimer = 0;
  enemyWarpCooldown = Math.max(enemyWarpCooldown, 0.8);
  enemyMode = "investigate";

  if (currentEnemyType === "nightShadow") {
    const noisePoint = { x: enemyLurePoint.x, y: enemyLurePoint.y };
    if ((isCounterNoise || isNoiseTrap) && ["air", "warning", "ascend"].includes(nightShadowState)) {
      enemyLurePoint = null;
      nightShadowComboActive = false;
      nightShadowDiveComboRemaining = 0;
      nightShadowComboPassPoint = null;
      nightShadowPassedStrikePoint = false;
      beginNightShadowDive(noisePoint, "noise");
      return;
    }
    if ((isCounterNoise || isNoiseTrap) && nightShadowState === "dive") {
      const safePoint = getNightShadowSafeTarget(noisePoint);
      enemyLurePoint = null;
      nightShadowTargetPoint = { x: safePoint.x, y: safePoint.y };
      nightShadowComboPassPoint = { x: safePoint.x, y: safePoint.y };
      nightShadowPassedStrikePoint = false;
      return;
    }
    nightShadowState = "ground";
    nightShadowTargetPoint = null;
    nightShadowDiveOrigin = null;
    nightShadowGroundTimer = 0;
    nightShadowLastKnownPoint = noisePoint;
    enemy.visible = true;
    enemy.alpha = 1;
    stopAudio(sounds.nightShadowFlap);
  }

  if (currentEnemyType === "kaishutsubotsu") {
    kaishutsubotsuRushTarget = null;
    kaishutsubotsuRushTimer = 0;
    kaishutsubotsuRushCooldown = Math.max(kaishutsubotsuRushCooldown, timer);
  }

  if (currentEnemyType === "bugmaster") {
    bugmasterSwarmMode = "normal";
    bugmasterChargeTarget = null;
    bugmasterChargeTimer = 0;
  }

  if (currentEnemyType === "miezaru") {
    miezaruWarpTimer = Math.max(miezaruWarpTimer, timer);
    enemy.visible = true;
    enemy.alpha = 1;
  }
}

function moveEnemyTowardUniversalLure(dt) {
  if (currentEnemyType === "watcher") {
    // The Watcher is teleport-only. Never let a stale lure point make the body walk.
    enemyLurePoint = null;
    enemyPath = [];
    enemyPathTimer = 0;
    enemyMode = "watch";
    return false;
  }
  if (!enemyLurePoint) return false;

  enemyLurePoint.timer -= dt;
  if (enemyLurePoint.timer <= 0) {
    enemyLurePoint = null;
    enemyMode = "wander";
    return false;
  }

  enemyMode = "investigate";
  const def = getEnemyDef();
  const targetX = enemyLurePoint.x;
  const targetY = enemyLurePoint.y;

  let baseSpeed = def.chaseSpeed || def.swarmArmorSpeed || def.wanderSpeed || 6.0;
  if (currentEnemyType === "watcher") baseSpeed = 5.2;
  if (currentEnemyType === "nightShadow") {
    nightShadowState = "ground";
    enemy.visible = true;
    enemy.alpha = 1;
    baseSpeed = Math.max(baseSpeed, def.groundSpeed || 8.8);
  }

  const speed = baseSpeed * (enemyLurePoint.speedMultiplier || 1.0);

  if (currentEnemyType === "miezaru" && typeof moveMiezaruTowardPoint === "function") {
    moveMiezaruTowardPoint(targetX, targetY, dt, speed);
  } else if (currentEnemyType === "ugomekimono" && typeof moveUgomekimonoTowardPoint === "function") {
    moveUgomekimonoTowardPoint(targetX, targetY, dt, speed);
  } else {
    moveEnemyTowardPoint(targetX, targetY, dt, speed);
  }

  const ec = getEntityCenter(enemy);
  const dist = distanceBetweenPoints(ec.x, ec.y, targetX, targetY);
  if (dist < 90 && enemyLurePoint.reason !== "firecracker") {
    enemyLurePoint = null;
    enemyMode = "wander";
  }
  // 爆竹は到着しても最低10秒以上、その場への注視を維持する。
  return true;
}


function updateEnemy(dt) {
  if (window.counterattack?.updateDamageReaction?.(dt)) {
    // Body hit reactions must not disable already-active auxiliary hindrances.
    if (currentEnemyType === "ugomekimono") {
      updateUgomeTentacles(dt);
      updateUgomeExtraTentacles(dt);
    }
    return;
  }
  if (window.counterattack?.isStunned(enemy)) {
    if (currentEnemyType === "bugmaster") updateBugmasterEnemy(dt);
    if (currentEnemyType === "ugomekimono") { updateUgomeTentacles(dt); updateUgomeExtraTentacles(dt); }
    if (currentEnemyType === "miezaru") ensureMiezaruClones(dt);
    if (currentEnemyType === "watcher") { updateWatcherGiantEye(dt); updateWatcherPhantomAgents(dt); updateWatcherObjectPhantoms(dt); }
    enemyMode = "stun";
    return;
  }
  if (moveEnemyTowardUniversalLure(dt)) return;

  if (currentEnemyType === "ugomekimono") { updateUgomekimonoEnemy(dt); return; }
  if (currentEnemyType === "watcher") { updateWatcherEnemy(dt); return; }
  if (currentEnemyType === "miezaru") { updateMiezaruEnemy(dt); return; }
  if (currentEnemyType === "nightShadow") { updateNightShadowEnemy(dt); return; }
  if (currentEnemyType === "kaishutsubotsu") { updateKaishutsubotsuEnemy(dt); return; }
  if (currentEnemyType === "beast") { updateBeastEnemy(dt); return; }
  if (currentEnemyType === "bugmaster") { updateBugmasterEnemy(dt); return; }

  if (enemyVoiceCooldown > 0) enemyVoiceCooldown -= dt;
  if (enemyKnifeCooldown > 0) enemyKnifeCooldown -= dt;
  if (trackerFrenzyTimer > 0) trackerFrenzyTimer -= dt;
  if (armedAxeCooldown > 0) armedAxeCooldown -= dt;
  if (armedAxeSlamTimer > 0) armedAxeSlamTimer -= dt;
  if (armedAxeLungeTimer > 0) armedAxeLungeTimer -= dt;
  if (armedChainCooldown > 0) armedChainCooldown -= dt;
  armedNoKnifeHitTimer += dt;

  const def = getEnemyDef();

  if (enemyStunTimer > 0) {
    enemyStunTimer -= dt;
    enemyMode = "stun";
    return;
  }

  if (updateTrackerLeap(dt)) return;
  if (updateArmedGrapple(dt)) return;
  if (updateArmedAxeLunge(dt)) return;

  const canSee = canEnemySeePlayer();

  if (currentEnemyType === "tracker" && isFourKeyPhase() && canSee && enemyMode === "chase" && trackerFrenzyTimer <= 0 && Math.random() < dt * 0.14) {
    trackerFrenzyTimer = 3.0;
  }

  if (currentEnemyType === "tracker" && isFourKeyPhase()) {
    trackerLeapCooldown = Math.max(0, trackerLeapCooldown - dt);
    const dToPlayer = getEntityDistance(player, enemy);
    if (trackerLeapCooldown <= 0 && dToPlayer > 1500) {
      startTrackerLeapToPlayer();
      return;
    }
  }

  if (currentEnemyType === "armed" && isFourKeyPhase()) {
    armedGrappleCooldown = Math.max(0, armedGrappleCooldown - dt);
    if (armedGrappleCooldown <= 0 && Math.random() < 0.35) {
      if (startArmedGrappleMove()) return;
    }
  }

  if (currentEnemyType === "armed" && isFourKeyPhase() && canSee && armedChainCooldown <= 0 && getEntityDistance(player, enemy) <= 1900) {
    throwArmedChainHook();
    armedChainCooldown = randomRange(7.0, 11.0);
  }

  if (currentEnemyType === "armed" && armedNoKnifeHitTimer >= 12.0 && canSee && armedAxeCooldown <= 0) {
    startArmedAxeSlam();
  }

  if (def.detectionSfx && canSee && !enemyWasSeeingPlayer && enemyVoiceCooldown <= 0 && sounds[def.detectionSfx]) {
    playOneShot(sounds[def.detectionSfx]);
    enemyVoiceCooldown = 4.0;
  }
  enemyWasSeeingPlayer = canSee;

  if (enemyLurePoint) {
    enemyMode = "investigate";
    const lureSpeed = (def.chaseSpeed || 6) * (enemyLurePoint.speedMultiplier || 1);
    moveEnemyTowardPoint(enemyLurePoint.x, enemyLurePoint.y, dt, lureSpeed);
    enemyLurePoint.timer -= dt;
    if (enemyLurePoint.timer <= 0 || distanceBetweenPoints(enemy.x, enemy.y, enemyLurePoint.x, enemyLurePoint.y) < 95) {
      enemyLurePoint = null;
      enemyPath = [];
      enemyPathTimer = 0;
    }
    return;
  }

  if (canSee) {
    enemyMode = "chase";
    enemyLostSightTimer = 2.2;
  } else if (enemyLostSightTimer > 0) {
    enemyLostSightTimer -= dt;
    enemyMode = "chase";
  } else {
    enemyMode = "wander";
  }

  if (enemyMode === "chase") {
    const pc = getEntityCenter(player);
    let speed = def.chaseSpeed;

    if (currentEnemyType === "tracker" && isFourKeyPhase()) {
      const ec = getEntityCenter(enemy);
      const dx = pc.x - ec.x;
      const dy = pc.y - ec.y;
      const dist = Math.hypot(dx, dy);
      const straightLine = dist > 520 && !isLineBlocked(ec.x, ec.y, pc.x, pc.y);

      if (straightLine) {
        // 距離があり、直線で見えている間はみるみる加速する。
        trackerLineAccel = clamp(trackerLineAccel + dt * 0.95, 0, 2.4);
        const rampedSpeed = def.chaseSpeed * (1.0 + trackerLineAccel * 0.72);
        const burstSpeed = Math.min(rampedSpeed, 24.0);
        enemyFacingX = dx / Math.max(0.001, dist);
        enemyFacingY = dy / Math.max(0.001, dist);
        moveEntitySmart(enemy, enemyFacingX, enemyFacingY, burstSpeed * 60 * dt);
        return;
      }

      trackerLineAccel = Math.max(0, trackerLineAccel - dt * 1.8);
      speed = trackerFrenzyTimer > 0 ? (def.frenzyChaseSpeed || def.chaseSpeed * 1.35) : def.chaseSpeed;
    } else {
      trackerLineAccel = Math.max(0, trackerLineAccel - dt * 2.0);
    }

    moveEnemyTowardPoint(pc.x, pc.y, dt, speed);
  } else {
    if (!enemyWanderTarget || distanceBetweenPoints(enemy.x, enemy.y, enemyWanderTarget.x, enemyWanderTarget.y) < 140) {
      enemyWanderTarget = findWanderTarget();
      enemyPath = [];
      enemyPathTimer = 0;
    }
    moveEnemyTowardPoint(enemyWanderTarget.x, enemyWanderTarget.y, dt, def.wanderSpeed);
  }

  if (currentEnemyType === "armed" && canSee && getEntityDistance(player, enemy) <= def.knifeRange && enemyKnifeCooldown <= 0) {
    throwArmedKnife();
    enemyKnifeCooldown = def.knifeInterval || 2.5;
  }
}


function isMiezaruVisibleToPlayer() {
  if (currentEnemyType !== "miezaru") return false;
  if (!enemy || !player) return false;
  if (gameState === "clearEvent") return true;
  if (magicMirrorTimer > 0 || isFourKeyPhase()) return true;

  const def = getEnemyDef();
  const revealDistance = def.revealDistance || 320;

  try {
    return getEntityDistance(player, enemy) <= revealDistance;
  } catch (e) {
    return false;
  }
}

function canEnemySeePlayer() {
  if (currentEnemyType === "beast") return false;
  if (currentEnemyType === "nightShadow" && nightShadowState !== "ground") return false;
  const ec = getEntityCenter(enemy);
  const pc = getEntityCenter(player);

  const dx = pc.x - ec.x;
  const dy = pc.y - ec.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  const def = getEnemyDef();
  const effectiveViewDistance = currentEnemyType === "tracker" && isFourKeyPhase()
    ? (def.endgameViewDistance || def.viewDistance || ENEMY_VIEW_DISTANCE)
    : (def.viewDistance || ENEMY_VIEW_DISTANCE);
  const effectiveViewAngle = def.viewAngle || ENEMY_VIEW_ANGLE;

  if (dist > effectiveViewDistance) return false;

  const dirX = dx / Math.max(0.001, dist);
  const dirY = dy / Math.max(0.001, dist);

  const dot = dirX * enemyFacingX + dirY * enemyFacingY;
  const angle = Math.acos(clamp(dot, -1, 1));

  if (angle > effectiveViewAngle / 2) return false;
  if (isLineBlocked(ec.x, ec.y, pc.x, pc.y)) return false;

  if (!enemyCanEnterSanctuary) {
    if (isInsideMainShrine(player)) return false;
    for (const shrine of shrines) {
      if (isInsideRect(pc, shrine)) return false;
    }
  }

  return true;
}

function moveEnemyTowardPoint(x, y, dt, speedValue) {
  if (window.counterattack?.isStunned(enemy)) return;
  const target = { x, y };

  if (enemyPathTimer <= 0 || enemyPath.length === 0) {
    enemyPath = findPath(getEntityCenter(enemy), target);
    enemyPathTimer = enemyMode === "chase" ? 0.42 : enemyMode === "investigate" ? 0.55 : 1.2;
  } else {
    enemyPathTimer -= dt;
  }

  if (enemyPath.length > 0) {
    const next = enemyPath[0];
    const ec = getEntityCenter(enemy);
    const dx = next.x - ec.x;
    const dy = next.y - ec.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 44) {
      enemyPath.shift();
      return;
    }

    const dirX = dx / dist;
    const dirY = dy / dist;

    enemyFacingX = dirX;
    enemyFacingY = dirY;
    moveEntitySmart(enemy, dirX, dirY, speedValue * 60 * dt);
  } else {
    const ec = getEntityCenter(enemy);
    const dx = x - ec.x;
    const dy = y - ec.y;
    const dist = Math.max(0.001, Math.sqrt(dx * dx + dy * dy));

    const dirX = dx / dist;
    const dirY = dy / dist;

    enemyFacingX = dirX;
    enemyFacingY = dirY;
    moveEntitySmart(enemy, dirX, dirY, speedValue * 60 * dt);
  }
}

function findWanderTarget() {
  for (let i = 0; i < 260; i++) {
    const spaceZones = worldZones.filter(z => z.tag === "space");
    const zone = spaceZones[Math.floor(Math.random() * spaceZones.length)];
    const x = randomRange(zone.x + 80, zone.x + zone.width - 80);
    const y = randomRange(zone.y + 80, zone.y + zone.height - 80);
    if (!isCollidingWithObstacle(enemy, x - enemy.width / 2, y - enemy.height / 2, true)) {
      return { x, y };
    }
  }

  return { x: 7000, y: 4300 };
}

function findSafeEnemySpawn(minDistance = 2200) {
  const pc = getEntityCenter(player);
  const fixedPoints = [
    { x: 6900, y: 4300 },
    { x: 7200, y: 1450 },
    { x: 900, y: 900 },
    { x: 7200, y: 3300 },
    { x: 900, y: 4100 },
    { x: 3900, y: 780 },
    { x: 3900, y: 4320 }
  ];

  const candidates = [];

  for (const p of fixedPoints) {
    candidates.push({ x: p.x, y: p.y, fixed: true });
  }

  for (let i = 0; i < 140; i++) {
    const zone = randomSpaceZone ? randomSpaceZone(false) : null;
    if (!zone) continue;
    candidates.push({
      x: randomRange(zone.x + 160, zone.x + zone.width - 160),
      y: randomRange(zone.y + 160, zone.y + zone.height - 160),
      fixed: false
    });
  }

  let best = null;
  let bestScore = -Infinity;

  for (const p of candidates) {
    const testX = clamp(p.x - enemy.width / 2, 0, WORLD_WIDTH - enemy.width);
    const testY = clamp(p.y - enemy.height / 2, 0, WORLD_HEIGHT - enemy.height);
    const center = { x: testX + enemy.width / 2, y: testY + enemy.height / 2 };

    if (isPointInAnySanctuary(center)) continue;
    if (isCollidingWithObstacle(enemy, testX, testY, true)) continue;

    const distanceFromPlayer = distanceBetweenPoints(center.x, center.y, pc.x, pc.y);
    if (distanceFromPlayer < minDistance) continue;

    const grid = worldToGrid(center.x, center.y);
    const safeCell = findNearestWalkableCell(grid.col, grid.row);
    if (!safeCell) continue;

    const score =
      distanceFromPlayer +
      (p.fixed ? 80 : 0) -
      Math.abs(center.x - WORLD_WIDTH / 2) * 0.03 -
      Math.abs(center.y - WORLD_HEIGHT / 2) * 0.02;

    if (score > bestScore) {
      bestScore = score;
      best = { x: testX, y: testY };
    }
  }

  if (best) return best;

  // 最終保険。距離条件を緩めてでも障害物外へ出す。
  for (const p of fixedPoints) {
    const testX = clamp(p.x - enemy.width / 2, 0, WORLD_WIDTH - enemy.width);
    const testY = clamp(p.y - enemy.height / 2, 0, WORLD_HEIGHT - enemy.height);
    if (!isCollidingWithObstacle(enemy, testX, testY, true)) return { x: testX, y: testY };
  }

  // Absolute fallback: scan coarse world cells rather than ever placing the body inside an obstacle.
  for (let y = 120; y <= WORLD_HEIGHT - enemy.height - 120; y += 240) {
    for (let x = 120; x <= WORLD_WIDTH - enemy.width - 120; x += 240) {
      const center = { x: x + enemy.width / 2, y: y + enemy.height / 2 };
      if (isPointInAnySanctuary(center)) continue;
      if (isCollidingWithObstacle(enemy, x, y, true)) continue;
      return { x, y };
    }
  }

  // The map should always contain a valid cell. If not, do not perform an unsafe warp.
  return { x: enemy.x, y: enemy.y };
}

function warpEnemyToNonStuckPoint(reason = "safe") {
  const spawn = findSafeEnemySpawn(reason === "offering" ? 1650 : 2200);
  enemy.x = spawn.x;
  enemy.y = spawn.y;
  enemyPath = [];
  enemyPathTimer = 0;
  enemyWanderTarget = null;
  enemyStuckTimer = 0;
  enemyWarpCooldown = 2.4;
  enemyLostSightTimer = 0;
  enemyLurePoint = null;
  enemyMode = currentEnemyType === "nightShadow" ? enemyMode : "wander";
  enemyLastX = enemy.x;
  enemyLastY = enemy.y;

  if (currentEnemyType === "kaishutsubotsu") {
    kaishutsubotsuRushTarget = null;
    kaishutsubotsuRushTimer = 0;
    kaishutsubotsuRushCooldown = Math.max(kaishutsubotsuRushCooldown, 8.0);
  }
}

// ==============================
// 経路探索
// ==============================

function findPath(startPoint, goalPoint) {
  const start = worldToGrid(startPoint.x, startPoint.y);
  const goal = worldToGrid(goalPoint.x, goalPoint.y);
  const safeStart = findNearestWalkableCell(start.col, start.row);
  const safeGoal = findNearestWalkableCell(goal.col, goal.row);

  if (!safeStart || !safeGoal) return [];

  const key = (c, r) => c + "," + r;
  const open = [safeStart];
  const cameFrom = new Map();
  const gScore = new Map();
  const fScore = new Map();

  gScore.set(key(safeStart.col, safeStart.row), 0);
  fScore.set(key(safeStart.col, safeStart.row), heuristic(safeStart, safeGoal));

  let guard = 0;

  while (open.length > 0 && guard < 2500) {
    guard++;

    open.sort((a, b) => (fScore.get(key(a.col, a.row)) ?? Infinity) - (fScore.get(key(b.col, b.row)) ?? Infinity));
    const current = open.shift();
    const currentKey = key(current.col, current.row);

    if (current.col === safeGoal.col && current.row === safeGoal.row) {
      return reconstructPath(cameFrom, current).slice(1);
    }

    for (const n of getNeighbors(current)) {
      const nk = key(n.col, n.row);
      const tentative = (gScore.get(currentKey) ?? Infinity) + heuristic(current, n);

      if (tentative < (gScore.get(nk) ?? Infinity)) {
        cameFrom.set(nk, current);
        gScore.set(nk, tentative);
        fScore.set(nk, tentative + heuristic(n, safeGoal));

        if (!open.some(c => c.col === n.col && c.row === n.row)) {
          open.push(n);
        }
      }
    }
  }

  return [];
}

function reconstructPath(cameFrom, current) {
  const path = [gridToWorld(current.col, current.row)];
  const key = (c, r) => c + "," + r;

  while (cameFrom.has(key(current.col, current.row))) {
    current = cameFrom.get(key(current.col, current.row));
    path.unshift(gridToWorld(current.col, current.row));
  }

  return path;
}

function getNeighbors(cell) {
  const dirs = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
  const result = [];

  for (const d of dirs) {
    const c = cell.col + d[0];
    const r = cell.row + d[1];
    if (isWalkableCell(c, r)) result.push({ col: c, row: r });
  }

  return result;
}

function isWalkableCell(col, row) {
  if (col < 0 || row < 0 || col >= GRID_COLS || row >= GRID_ROWS) return false;
  return walkGrid[row] && walkGrid[row][col];
}

function findNearestWalkableCell(col, row) {
  if (isWalkableCell(col, row)) return { col, row };

  for (let radius = 1; radius < 9; radius++) {
    for (let dy = -radius; dy <= radius; dy++) {
      for (let dx = -radius; dx <= radius; dx++) {
        const c = col + dx;
        const r = row + dy;
        if (isWalkableCell(c, r)) return { col: c, row: r };
      }
    }
  }

  return null;
}

function worldToGrid(x, y) {
  return {
    col: clamp(Math.floor(x / GRID_SIZE), 0, GRID_COLS - 1),
    row: clamp(Math.floor(y / GRID_SIZE), 0, GRID_ROWS - 1)
  };
}

function gridToWorld(col, row) {
  return {
    x: col * GRID_SIZE + GRID_SIZE / 2,
    y: row * GRID_SIZE + GRID_SIZE / 2
  };
}

function heuristic(a, b) {
  const dx = a.col - b.col;
  const dy = a.row - b.row;
  return Math.sqrt(dx * dx + dy * dy);
}

// ==============================
// 衝突
// ==============================

function addObstacle(x, y, width, height, type = "obstacle", blockPlayer = true, blockEnemy = true) {
  obstacles.push({ x, y, width, height, type, blockPlayer, blockEnemy });
}

function moveEntity(entity, moveX, moveY, isEnemyEntity) {
  const nextX = entity.x + moveX;
  if (!isCollidingWithObstacle(entity, nextX, entity.y, isEnemyEntity)) {
    entity.x = nextX;
  }

  const nextY = entity.y + moveY;
  if (!isCollidingWithObstacle(entity, entity.x, nextY, isEnemyEntity)) {
    entity.y = nextY;
  }

  entity.x = clamp(entity.x, 0, WORLD_WIDTH - entity.width);
  entity.y = clamp(entity.y, 0, WORLD_HEIGHT - entity.height);
}

function moveEntitySmart(entity, dirX, dirY, speed) {
  const dirs = [
    [dirX, dirY],
    [dirY, -dirX],
    [-dirY, dirX],
    [dirX * 0.72 + dirY * 0.28, dirY * 0.72 - dirX * 0.28],
    [dirX * 0.72 - dirY * 0.28, dirY * 0.72 + dirX * 0.28]
  ];

  for (const d of dirs) {
    const len = Math.max(0.001, Math.sqrt(d[0] * d[0] + d[1] * d[1]));
    const mx = (d[0] / len) * speed;
    const my = (d[1] / len) * speed;

    const beforeX = entity.x;
    const beforeY = entity.y;

    moveEntity(entity, mx, my, entity === enemy);

    if (distanceBetweenPoints(beforeX, beforeY, entity.x, entity.y) > 0.3) return true;
  }

  return false;
}

function isCollidingWithObstacle(entity, testX, testY, isEnemyEntity) {
  const rect = getCollisionRect(entity, testX, testY);

  if (currentEnemyType === "ugomekimono" && ugomeTentacleGroups && ugomeTentacleGroups.length) {
    for (const gr of getUgomeTentacleGroupRects()) {
      if (rectsOverlap(rect, gr)) return true;
    }
  }

  for (const o of obstacles) {
    const or = { left: o.x, top: o.y, right: o.x + o.width, bottom: o.y + o.height };
    if (!rectsOverlap(rect, or)) continue;

    if (isEnemyEntity) {
      if (!o.blockEnemy) continue;
      if (enemyCanEnterSanctuary && isSanctuaryBlocker(o)) continue;
      if (currentEnemyType === "ugomekimono" && gameState === "clearEvent" && o.type === "sacredTreeWall") continue;
      return true;
    }

    if (o.blockPlayer) return true;
  }

  return false;
}

function isSanctuaryBlocker(o) {
  return o.type === "sanctuaryGate" || o.type === "smallSanctuaryGate";
}

function getCollisionRect(entity, x, y) {
  const ox = (entity.width - entity.collisionWidth) / 2;
  const oy = entity.height - entity.collisionHeight - 10;

  return {
    left: x + ox,
    right: x + ox + entity.collisionWidth,
    top: y + oy,
    bottom: y + oy + entity.collisionHeight
  };
}

function collidesWithWorldPoint(x, y) {
  if (x < 0 || y < 0 || x > WORLD_WIDTH || y > WORLD_HEIGHT) return true;

  for (const o of obstacles) {
    if (x >= o.x && x <= o.x + o.width && y >= o.y && y <= o.y + o.height) return true;
  }

  return false;
}

function isLineBlocked(x1, y1, x2, y2) {
  const dist = distanceBetweenPoints(x1, y1, x2, y2);
  const steps = Math.ceil(dist / 42);

  for (let i = 1; i < steps; i++) {
    const t = i / steps;
    const x = x1 + (x2 - x1) * t;
    const y = y1 + (y2 - y1) * t;

    for (const o of obstacles) {
      if (enemyCanEnterSanctuary && isSanctuaryBlocker(o)) continue;
      if (o.type === "smallShrineRope" || o.type === "sacredTreeWall") continue;
      if (x >= o.x && x <= o.x + o.width && y >= o.y && y <= o.y + o.height) return true;
    }
  }

  return false;
}

// ==============================
// 捕獲/結果
// ==============================

function useTatteredTalismanForCapture(source = "怪異") {
  const talismanSlot = itemInventory.findIndex(id => id === "tattered_talisman");
  if (talismanSlot < 0) return false;

  itemInventory[talismanSlot] = null;
  ugomeGrab = null;
  ugomeGroundBind = null;
  ugomeEscapeProgress = 0;
  updateUgomeEscapeGauge(false, 0);
  updateInventoryUI();
  enemyStunTimer = Math.max(enemyStunTimer, 4.0);
  const far = findSafeEnemySpawn();
  enemy.x = far.x;
  enemy.y = far.y;
  enemyPath = [];
  enemyPathTimer = 0;
  enemyLurePoint = null;
  enemyLostSightTimer = 0;
  showMessage(`ボロボロの札が砕け、${source}から逃れた！`);
  return true;
}

function checkCapture() {
  if (window.counterattack?.isStunned(enemy)) return;
  if (enemyStunTimer > 0 || !enemy.visible) return;
  if (currentEnemyType === "nightShadow" && (nightShadowState === "air" || nightShadowState === "warning" || nightShadowState === "ascend")) return;
  if (isPlayerInAnySanctuary()) return;

  const p = getCollisionRect(player, player.x, player.y);
  const e = getCollisionRect(enemy, enemy.x, enemy.y);

  if (!rectsOverlap(p, e)) return;

  if (useTatteredTalismanForCapture(getEnemyDef().name)) return;

  startJumpscare();
}

function clearArmedCaptureCamera() {
  document.querySelectorAll(".armedCaptureCameraLayer").forEach(el => el.remove());
  if (movieEnemyEl) {
    movieEnemyEl.style.display = "";
  }
}

function createArmedCaptureCamera() {
  if (!movieStage) return;

  clearArmedCaptureCamera();

  const layer = document.createElement("div");
  layer.className = "armedCaptureCameraLayer";

  const img = document.createElement("img");
  img.className = "armedCaptureCameraImage";
  img.src = imageSources.armedEnemyCapture;
  img.alt = "";

  layer.appendChild(img);
  movieStage.appendChild(layer);

  if (movieEnemyEl) {
    movieEnemyEl.style.display = "none";
  }

  requestAnimationFrame(() => {
    layer.classList.add("play");
  });
}

function startJumpscare(ignoreSanctuary = false) {
  // All capture paths protect sanctuaries before consuming any defensive item.
  if (!ignoreSanctuary && isPlayerInAnySanctuary()) return;
  if (playerInvincible) {
    ugomeGrab = null;
    ugomeEscapeProgress = 0;
    updateUgomeEscapeGauge(false, 0);
    enemyStunTimer = Math.max(enemyStunTimer, 1.2);
    enemyLostSightTimer = 0;
    showMessage("無敵状態のため、捕獲されなかった。");
    return;
  }

  // 急降下・突進・巨大な目・偽神具箱・触手など、直接接触以外もここへ集約する。
  if (useTatteredTalismanForCapture(getEnemyDef().name)) return;

  ugomeGrab = null;
  ugomeEscapeProgress = 0;
  updateUgomeEscapeGauge(false, 0);
  gameState = "movie";
  resultType = "gameover";
  stopAllAudio();
  applyVolumes(1);

  const def = getEnemyDef();
  clearArmedCaptureCamera();

  if (movieEnemyEl) {
    movieEnemyEl.style.backgroundImage = `url(${imageSources[def.jumpscareKey]})`;
    movieEnemyEl.style.width = (def.movieWidth || 640) + "px";
    movieEnemyEl.style.height = (def.movieHeight || 800) + "px";
  }

  if (def.captureSfx && sounds[def.captureSfx]) playOneShot(sounds[def.captureSfx]);

  showOnly(movieScreen);
  movieScreen.classList.remove("play", "armedMovie", "bugmasterMovie");
  if (currentEnemyType === "armed") {
    movieScreen.classList.add("armedMovie");
    createArmedCaptureCamera();
  }
  if (currentEnemyType === "bugmaster") {
    movieScreen.classList.add("bugmasterMovie");
    createMovieBugSwarm();
  }
  void movieScreen.offsetWidth;
  movieScreen.classList.add("play");

  setTimeout(() => {
    movieScreen.classList.remove("play", "armedMovie", "bugmasterMovie");
    clearArmedCaptureCamera();
    clearMovieBugSwarm();
    showResult();
  }, currentEnemyType === "armed" ? 1120 : 980);
}

function getFailureRank() {
  if (survivalTime >= 120) return "よく逃げた";
  if (survivalTime >= 80) return "かなり粘った";
  if (survivalTime >= 45) return "悪くない";
  if (survivalTime >= 20) return "まだ甘い";
  return "すぐに捕まった";
}

// ==============================
// 描画
// ==============================

function drawWorld() {
  drawGround();
  drawRoads();
  drawTaggedBuildings();
  drawMapObjects();
  drawWatcherObjectPhantoms();
  drawShrines();
  drawShrineFlash();
  drawBoxes();
  drawLooseItems();
  drawWatcherPhantoms();
  drawWatcherGiantEye();
  drawUgomeTentacles();
  drawUgomeExtraTentacles();
  drawMiezaruClones();
  drawProjectiles();
  drawArmedGrappleLine();
  drawArmedAxeSlamEffect();
  drawWorldBorder();
  window.counterattack?.draw();
}

function drawGround() {
  wctx.clearRect(0, 0, VIEW_WIDTH, VIEW_HEIGHT);

  wctx.save();
  wctx.translate(-cameraX, -cameraY);
  drawPatternRect(images.ground, 0, 0, WORLD_WIDTH, WORLD_HEIGHT, "#1b241d");
  if (bugAttachStacks > 0) {
    wctx.save();
    wctx.fillStyle = "rgba(0,0,0,.08)";
    wctx.fillRect(0, 0, VIEW_WIDTH, VIEW_HEIGHT);
    wctx.restore();
  }

  wctx.restore();
}

function drawRoads() {
  wctx.save();
  wctx.translate(-cameraX, -cameraY);

  for (const z of worldZones) {
    if (z.tag === "road") {
      drawPatternRect(images.road_tile, z.x, z.y, z.width, z.height, "#2d2f31");
    }
  }

  wctx.restore();
}

function drawPatternRect(img, x, y, width, height, fallback) {
  const visibleLeft = cameraX - 80;
  const visibleTop = cameraY - 80;
  const visibleRight = cameraX + VIEW_WIDTH + 80;
  const visibleBottom = cameraY + VIEW_HEIGHT + 80;

  const left = Math.max(x, visibleLeft);
  const top = Math.max(y, visibleTop);
  const right = Math.min(x + width, visibleRight);
  const bottom = Math.min(y + height, visibleBottom);

  if (right <= left || bottom <= top) return;

  if (!img || !img.complete || img.naturalWidth <= 0) {
    wctx.fillStyle = fallback;
    wctx.fillRect(left, top, right - left, bottom - top);
    return;
  }

  const tileW = img.naturalWidth;
  const tileH = img.naturalHeight;

  wctx.save();
  wctx.beginPath();
  wctx.rect(left, top, right - left, bottom - top);
  wctx.clip();

  const sx = x + Math.floor((left - x) / tileW) * tileW;
  const sy = y + Math.floor((top - y) / tileH) * tileH;

  for (let tx = sx; tx < right + tileW; tx += tileW) {
    for (let ty = sy; ty < bottom + tileH; ty += tileH) {
      wctx.drawImage(img, tx, ty, tileW, tileH);
    }
  }

  wctx.restore();
}

function drawTaggedBuildings() {
  wctx.save();
  wctx.translate(-cameraX, -cameraY);

  for (const zone of worldZones) {
    if (zone.tag !== "building" || !isVisible(zone)) continue;
    drawPatternRect(images.building_roof_tile, zone.x, zone.y, zone.width, zone.height, "#30343a");
  }

  wctx.restore();
}

function drawShrines() {
  wctx.save();
  wctx.translate(-cameraX, -cameraY);

  if (mainShrine) {
    wctx.fillStyle = "rgba(20,22,26,.52)";
    wctx.fillRect(mainShrine.x + 64, mainShrine.y + 64, mainShrine.width - 128, mainShrine.height - 128);

    drawSacredTreeWall(mainShrine);

    wctx.fillStyle = "rgba(30,25,22,.86)";
    wctx.fillRect(mainShrine.shrineBody.x, mainShrine.shrineBody.y, mainShrine.shrineBody.width, mainShrine.shrineBody.height);
    wctx.strokeStyle = "rgba(150,120,85,.82)";
    wctx.lineWidth = 4;
    wctx.strokeRect(mainShrine.shrineBody.x, mainShrine.shrineBody.y, mainShrine.shrineBody.width, mainShrine.shrineBody.height);

    drawMirroredShrineImage(images.torii, mainShrine.gate.x + mainShrine.gate.width / 2, mainShrine.gate.y + 2, 220, 170, 280 / 512);
    drawMirroredShrineImage(images.main_altar, mainShrine.altar.x + mainShrine.altar.width / 2, mainShrine.altar.y + 50, 250, 250, 200 / 512);

    // 奉納数による常時の膜表現は神社には出さない。
    // クリアイベント直前の一瞬発光のみ drawShrineFlash() で表示する。
  }

  for (const shrine of shrines) {
    wctx.fillStyle = "rgba(18,20,24,.62)";
    wctx.fillRect(shrine.x + 24, shrine.y + 24, shrine.width - 48, shrine.height - 48);

    drawSmallShrineBarrierGlow(shrine);

    drawImageCentered(
      images.generated_shimenawa_topdown_square,
      shrine.x + shrine.width / 2,
      shrine.y + shrine.height / 2,
      shrine.width * 1.18,
      shrine.height * 1.18
    );

    drawImageCentered(images.torii, shrine.gate.x + shrine.gate.width / 2, shrine.gate.y - 10, 140, 110);
    drawImageCentered(images.small_shrine, shrine.altar.x + shrine.altar.width / 2, shrine.altar.y + 40, 160, 160);

    if (!shrine.charged) {
      wctx.fillStyle = "rgba(120,120,130,.08)";
      wctx.beginPath();
      wctx.arc(shrine.x + shrine.width / 2, shrine.y + shrine.height / 2, 110, 0, Math.PI * 2);
      wctx.fill();
    }
  }

  wctx.restore();
}

function drawSmallShrineBarrierGlow(shrine) {
  if (!shrine.charged) return;

  const cx = shrine.x + shrine.width / 2;
  const cy = shrine.y + shrine.height / 2;
  const img = images.shrine_akane_glow;
  if (!img || !img.complete || img.naturalWidth <= 0) return;

  const pulse = (Math.sin(performance.now() / 850) + 1) / 2;
  const size = 390 + pulse * 20;
  wctx.save();
  wctx.globalCompositeOperation = "lighter";
  wctx.globalAlpha = 0.68 + pulse * 0.10;
  wctx.drawImage(img, cx - size / 2, cy - size / 2, size, size);
  wctx.restore();
}

function drawMirroredShrineImage(img, cx, cy, width, height, sourceAxis) {
  if (!img || !img.complete || !img.naturalWidth) return;
  // The artwork has asymmetric padding. Its roof/gate axis, not the file edge,
  // is placed on the existing world center; the opposite side is mirrored.
  const axis = img.naturalWidth * sourceAxis;
  const half = Math.min(axis, img.naturalWidth - axis);
  wctx.save();
  wctx.translate(cx, cy);
  wctx.drawImage(img, axis - half, 0, half, img.naturalHeight, -width / 2, -height / 2, width / 2, height);
  wctx.scale(-1, 1);
  wctx.drawImage(img, axis - half, 0, half, img.naturalHeight, -width / 2, -height / 2, width / 2, height);
  wctx.restore();
}

function drawSacredTreeWall(area) {
  const spots = [];
  const centerX = area.x + area.width / 2;
  const half = area.width / 2 - 28;
  const columns = Math.max(1, Math.round(half / 74));
  // Paired centers, equal spacing, and mirrored tree art; never move the shrine.
  for (let i = 0; i < columns; i++) {
    const offset = half * (i + 0.5) / columns;
    for (const side of [-1, 1]) {
      const x = centerX + side * offset;
      spots.push([x, area.y + 36, side]);
      if (x < area.gate.x - 20 || x > area.gate.x + area.gate.width + 20) {
        spots.push([x, area.y + area.height - 34, side]);
      }
    }
  }
  for (let y = area.y + 44; y <= area.y + area.height - 44; y += 74) {
    spots.push([area.x + 34, y, -1], [area.x + area.width - 34, y, 1]);
  }
  const img = images.sacred_tree;
  for (const [tx, ty, side] of spots) {
    if (img && img.complete) {
      const w = 112 * 0.92, h = 148 * 0.92;
      wctx.save();
      wctx.translate(tx, ty);
      wctx.scale(side < 0 ? 1 : -1, 1);
      wctx.drawImage(img, -w / 2, -h * 0.72, w, h);
      wctx.restore();
    } else {
      wctx.fillStyle = "rgba(28,65,32,.95)";
      wctx.beginPath();
      wctx.arc(tx, ty, 35, 0, Math.PI * 2);
      wctx.fill();
    }
  }
}


function drawMapObjects() {
  wctx.save();
  wctx.translate(-cameraX, -cameraY);

  for (const obj of decorativeObjects) {
    if (!isVisible(obj)) continue;

    if (obj.type === "car") {
      drawImageCentered(images.object_car, obj.x + obj.width / 2, obj.y + obj.height / 2, obj.width + 28, obj.height + 46);
    } else if (obj.type === "pole") {
      drawImageCentered(images.object_pole, obj.x + obj.width / 2, obj.y + obj.height / 2, obj.width + 26, obj.height + 26);
    } else {
      wctx.fillStyle = "rgba(255,0,255,.2)";
      wctx.fillRect(obj.x, obj.y, obj.width, obj.height);
    }
  }

  wctx.restore();
}

function drawShrineFlash() {
  if (!mainShrine || shrineFlashTimer <= 0) return;

  const alpha = Math.min(1, shrineFlashTimer / 0.55);
  const cx = mainShrine.x + mainShrine.width / 2;
  const cy = mainShrine.y + mainShrine.height / 2;

  wctx.save();
  wctx.translate(-cameraX, -cameraY);

  const radius = 360 + (1 - alpha) * 240;
  const grad = wctx.createRadialGradient(cx, cy, 20, cx, cy, radius);
  grad.addColorStop(0, `rgba(255,255,240,${0.92 * alpha})`);
  grad.addColorStop(0.35, `rgba(210,235,255,${0.46 * alpha})`);
  grad.addColorStop(1, "rgba(210,235,255,0)");

  wctx.fillStyle = grad;
  wctx.beginPath();
  wctx.arc(cx, cy, radius, 0, Math.PI * 2);
  wctx.fill();

  wctx.restore();
}

function drawBoxes() {
  wctx.save();
  wctx.translate(-cameraX, -cameraY);

  const allBoxes = boxes.concat(keyItemBoxes, watcherFakeKeyBoxes || []);

  for (const box of allBoxes) {
    if (!isVisible(box)) continue;

    const spriteKey = box.opened ? `${box.sprite}_open` : box.sprite;
    const img = images[spriteKey] || images[box.sprite];

    wctx.save();
    drawImageCentered(img, box.x + box.width / 2, box.y + box.height / 2, box.width + 18, box.height + 18);

    if (box.fake && !box.opened) {
      const ex = box.x + (box.eyeX || box.width / 2);
      const ey = box.y + (box.eyeY || box.height / 2);
      wctx.fillStyle = "rgba(20,8,8,.92)";
      wctx.beginPath();
      wctx.ellipse(ex, ey, 8, 5, 0, 0, Math.PI * 2);
      wctx.fill();
      wctx.fillStyle = "rgba(240,240,210,.88)";
      wctx.beginPath();
      wctx.arc(ex, ey, 2.2, 0, Math.PI * 2);
      wctx.fill();
    }

    if ((box.isKeyBox || box.fake) && !box.opened) {
      wctx.strokeStyle = "rgba(180,220,255,.75)";
      wctx.lineWidth = 3;
      wctx.shadowColor = "rgba(120,180,255,.65)";
      wctx.shadowBlur = 12;
      wctx.strokeRect(box.x - 3, box.y - 3, box.width + 6, box.height + 6);
      wctx.shadowBlur = 0;
    }

    if (box.isKeyBox && box.flashTimer > 0) {
      const alpha = Math.min(1, box.flashTimer / 0.72);
      const cx = box.x + box.width / 2;
      const cy = box.y + box.height / 2;
      const r = 100 + (1 - alpha) * 90;

      const grad = wctx.createRadialGradient(cx, cy, 8, cx, cy, r);
      grad.addColorStop(0, `rgba(255,255,220,${0.95 * alpha})`);
      grad.addColorStop(0.36, `rgba(250,204,21,${0.62 * alpha})`);
      grad.addColorStop(1, "rgba(250,204,21,0)");

      wctx.fillStyle = grad;
      wctx.beginPath();
      wctx.arc(cx, cy, r, 0, Math.PI * 2);
      wctx.fill();

      wctx.strokeStyle = `rgba(255,255,220,${0.85 * alpha})`;
      wctx.lineWidth = 5;
      wctx.shadowColor = `rgba(250,204,21,${0.95 * alpha})`;
      wctx.shadowBlur = 22;
      wctx.strokeRect(box.x - 6, box.y - 6, box.width + 12, box.height + 12);
      wctx.shadowBlur = 0;
    }

    wctx.restore();
  }

  wctx.restore();
}

function drawLooseItems() {
  wctx.save();
  wctx.translate(-cameraX, -cameraY);

  for (const item of looseItems) {
    if (item.collected || depositedKeys[item.id]) continue;
    if (!isVisible({ x: item.x, y: item.y, width: 48, height: 48 })) continue;

    drawImageCentered(images[item.id], item.x + 24, item.y + 24, 52, 52);

    wctx.fillStyle = "rgba(200,220,255,.12)";
    wctx.beginPath();
    wctx.arc(item.x + 24, item.y + 24, 28, 0, Math.PI * 2);
    wctx.fill();
  }

  wctx.restore();
}


function drawWatcherPhantoms() {
  if (!watcherPhantoms || watcherPhantoms.length === 0) return;
  wctx.save();
  wctx.translate(-cameraX, -cameraY);

  for (const ph of watcherPhantoms) {
    if (ph.timer <= 0) continue;
    const def = ENEMY_TYPES[ph.type] || ENEMY_TYPES.tracker;
    const img = images[def.sheetKey];
    if (!img || !img.complete) continue;

    const alpha = Math.max(0.24, clamp(ph.timer / ph.maxTimer, 0, 1) * 0.82);
    const fw = def.spriteFrameWidth || img.naturalWidth;
    const fh = def.spriteFrameHeight || img.naturalHeight;
    const rw = Math.min(def.renderWidth || 180, 260);
    const rh = Math.min(def.renderHeight || 180, 260);
    const frame = (ph.frame || 0) % (def.frameCount || 1);
    const col = frame % (def.cols || 1);
    const row = Math.floor(frame / (def.cols || 1));
    const drawX = ph.x - rw / 2 + Math.sin((ph.wobble || 0) * 1.5) * 5;
    const drawY = ph.y - rh / 2 + Math.cos((ph.wobble || 0) * 1.2) * 5;

    wctx.save();
    wctx.globalAlpha = alpha;
    wctx.filter = isFourKeyPhase() ? "none" : "blur(.35px) drop-shadow(0 0 18px rgba(255,255,255,.42)) drop-shadow(0 0 24px rgba(127,29,29,.34))";
    if ((ph.vx || 0) < 0) {
      wctx.translate(drawX + rw, drawY);
      wctx.scale(-1, 1);
      wctx.drawImage(img, col * fw, row * fh, fw, fh, 0, 0, rw, rh);
    } else {
      wctx.drawImage(img, col * fw, row * fh, fw, fh, drawX, drawY, rw, rh);
    }
    wctx.restore();
  }

  wctx.restore();
}

function drawProjectiles() {
  wctx.save();
  wctx.translate(-cameraX, -cameraY);

  const now = performance.now();

  for (const p of projectiles) {
    if (p.kind === "firecracker") {
      const flicker = 0.55 + Math.abs(Math.sin(now / 38)) * 0.45;
      const r = 26 + flicker * 20;

      const grad = wctx.createRadialGradient(p.x, p.y, 2, p.x, p.y, r);
      grad.addColorStop(0, `rgba(255,255,180,${0.95 * flicker})`);
      grad.addColorStop(0.35, `rgba(250,204,21,${0.75 * flicker})`);
      grad.addColorStop(1, "rgba(250,204,21,0)");

      wctx.fillStyle = grad;
      wctx.beginPath();
      wctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      wctx.fill();

      drawImageCentered(images.firecrackers, p.x, p.y, 38, 38);
    } else {
      wctx.fillStyle = "#d1d5db";
      wctx.beginPath();
      wctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
      wctx.fill();
    }
  }

  for (const f of firecrackerLures) {
    const flicker = 0.45 + Math.abs(Math.sin(now / 42)) * 0.55;
    const r = 56 + Math.sin(now / 78) * 12;

    const grad = wctx.createRadialGradient(f.x, f.y, 6, f.x, f.y, r);
    grad.addColorStop(0, `rgba(255,255,180,${0.95 * flicker})`);
    grad.addColorStop(0.28, `rgba(250,204,21,${0.72 * flicker})`);
    grad.addColorStop(1, "rgba(250,204,21,0)");

    wctx.fillStyle = grad;
    wctx.beginPath();
    wctx.arc(f.x, f.y, r, 0, Math.PI * 2);
    wctx.fill();

    drawImageCentered(images.firecrackers, f.x, f.y, 44 + flicker * 8, 44 + flicker * 8);
  }

  if (currentEnemyType === "bugmaster") {
    bugSwarmFrame = Math.floor(performance.now() / 110) % 4;
    for (const swarm of bugSwarmAgents) {
    if (swarm.counterDead) continue;
      if (swarm.state !== "free") continue;
      const alpha = 0.96;
      if (images.bugSwarmSheet && images.bugSwarmSheet.complete) {
        wctx.save();
        wctx.globalAlpha = alpha;
        const fw = images.bugSwarmSheet.width / 4;
        const fh = images.bugSwarmSheet.height;
        const drawSize = 62;
        wctx.drawImage(images.bugSwarmSheet, fw * bugSwarmFrame, 0, fw, fh, swarm.x - drawSize / 2, swarm.y - drawSize / 2, drawSize, drawSize);
        wctx.restore();
      } else if (images.bugSwarmOverlay && images.bugSwarmOverlay.complete) {
        wctx.save();
        wctx.globalAlpha = alpha;
        wctx.drawImage(images.bugSwarmOverlay, swarm.x - 26, swarm.y - 26, 52, 52);
        wctx.restore();
      } else {
        wctx.fillStyle = "rgba(20,20,20,.95)";
        wctx.beginPath();
        wctx.arc(swarm.x, swarm.y, 8, 0, Math.PI * 2);
        wctx.fill();
      }
    }
  }

  for (const knife of enemyProjectiles) {
    if (knife.kind === "chainHook") {
      if (segmentIntersectsAnySanctuary(knife.originX, knife.originY, knife.x, knife.y, 36)) continue;
      wctx.save();
      wctx.strokeStyle = "rgba(180,180,190,.88)";
      wctx.lineWidth = 5;
      wctx.setLineDash([10, 8]);
      wctx.beginPath();
      wctx.moveTo(knife.originX || knife.x, knife.originY || knife.y);
      wctx.lineTo(knife.x, knife.y);
      wctx.stroke();
      wctx.setLineDash([]);

      wctx.translate(knife.x, knife.y);
      wctx.rotate(knife.rotation || 0);
      if (images.chainHook && images.chainHook.complete) {
        wctx.filter = "drop-shadow(0 0 12px rgba(220,220,230,.55))";
        wctx.drawImage(images.chainHook, -24, -24, 60, 60);
      } else {
        wctx.fillStyle = "rgba(28,28,32,.96)";
        wctx.strokeStyle = "rgba(230,230,235,.95)";
        wctx.lineWidth = 3;
        wctx.beginPath();
        wctx.moveTo(28, 0);
        wctx.lineTo(-8, -18);
        wctx.lineTo(-2, 0);
        wctx.lineTo(-8, 18);
        wctx.closePath();
        wctx.fill();
        wctx.stroke();
      }
      wctx.restore();
      continue;
    }

    wctx.save();
    wctx.translate(knife.x, knife.y);
    wctx.rotate(knife.rotation || 0);
    if (images.armedEnemyKnife && images.armedEnemyKnife.complete) {
      wctx.drawImage(images.armedEnemyKnife, -26, -26, 52, 52);
    } else {
      wctx.fillStyle = "#b91c1c";
      wctx.fillRect(-20, -4, 40, 8);
    }
    wctx.restore();
  }

  wctx.restore();
}

function drawWorldBorder() {
  wctx.save();
  wctx.translate(-cameraX, -cameraY);

  wctx.strokeStyle = "rgba(127,29,29,.34)";
  wctx.lineWidth = 8;
  wctx.strokeRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

  wctx.restore();
}


function shouldShowEnemyOnMinimap() {
  if (currentEnemyType === "miezaru") {
    if (!enemy.visible || enemy.alpha <= 0.05) return false;
    if (magicMirrorTimer > 0) return true;
    const def = getEnemyDef();
    const revealDistance = def.revealDistance || 180;
    return getEntityDistance(player, enemy) <= revealDistance;
  }
  if (currentEnemyType === "ugomekimono") {
    return magicMirrorTimer > 0 && enemy.visible;
  }
  return enemy.visible && (enemyMode === "chase" || enemyMode === "dive" || gameState === "clearEvent" || magicMirrorTimer > 0);
}

function drawMinimap() {
  mctx.clearRect(0, 0, minimap.width, minimap.height);

  mctx.fillStyle = "rgba(2,6,23,.82)";
  mctx.fillRect(0, 0, minimap.width, minimap.height);

  const sx = minimap.width / WORLD_WIDTH;
  const sy = minimap.height / WORLD_HEIGHT;

  for (const z of worldZones) {
    if (z.tag === "road") {
      mctx.fillStyle = "rgba(180,180,190,.25)";
    } else if (z.tag === "space") {
      mctx.fillStyle = "rgba(80,130,80,.12)";
    } else {
      mctx.fillStyle = "rgba(40,40,45,.55)";
    }

    mctx.fillRect(z.x * sx, z.y * sy, Math.max(1, z.width * sx), Math.max(1, z.height * sy));
  }

  if (mainShrine) {
    mctx.fillStyle = "rgba(59,130,246,.30)";
    mctx.fillRect(mainShrine.x * sx, mainShrine.y * sy, mainShrine.width * sx, mainShrine.height * sy);
  }

  for (const shrine of shrines) {
    mctx.fillStyle = shrine.charged ? "rgba(180,220,255,.18)" : "rgba(120,120,130,.12)";
    mctx.fillRect(shrine.x * sx, shrine.y * sy, shrine.width * sx, shrine.height * sy);
  }

  // 神具箱は通常はミニマップに表示しない。
  // 祭鈴で示された未開封の箱、またはチートで全未開封箱を表示する。
  const visibleKeyBoxes = revealAllKeyBoxesOnMinimap
    ? keyItemBoxes.filter(box => !box.opened)
    : [];

  if (revealedKeyBoxId && !revealAllKeyBoxesOnMinimap) {
    const revealed = keyItemBoxes.find(box => box.id === revealedKeyBoxId && !box.opened);
    if (revealed) visibleKeyBoxes.push(revealed);
    else revealedKeyBoxId = null;
  }

  if (visibleKeyBoxes.length) {
    for (const revealed of visibleKeyBoxes) {
      mctx.fillStyle = revealAllKeyBoxesOnMinimap ? "rgba(56,189,248,.96)" : "rgba(253,230,138,.95)";
      mctx.fillRect(revealed.x * sx, revealed.y * sy, Math.max(4, revealed.width * sx), Math.max(4, revealed.height * sy));
      mctx.strokeStyle = "rgba(255,255,255,.9)";
      mctx.lineWidth = 1.5;
      mctx.strokeRect(revealed.x * sx - 1, revealed.y * sy - 1, Math.max(5, revealed.width * sx + 2), Math.max(5, revealed.height * sy + 2));
    }
  }

  mctx.fillStyle = "rgba(180,180,190,.30)";
  for (const box of boxes) {
    mctx.fillRect(box.x * sx, box.y * sy, Math.max(2, box.width * sx), Math.max(2, box.height * sy));
  }

  const pc = getEntityCenter(player);
  mctx.fillStyle = "#86efac";
  mctx.beginPath();
  mctx.arc(pc.x * sx, pc.y * sy, 3.5, 0, Math.PI * 2);
  mctx.fill();

  if (shouldShowEnemyOnMinimap()) {
    const ec = getEntityCenter(enemy);
    mctx.fillStyle = magicMirrorTimer > 0 ? "rgba(250,204,21,.98)" : "#f87171";
    mctx.beginPath();
    mctx.arc(ec.x * sx, ec.y * sy, magicMirrorTimer > 0 ? 5.2 : 3.5, 0, Math.PI * 2);
    mctx.fill();

    if (magicMirrorTimer > 0) {
      mctx.strokeStyle = "rgba(255,255,255,.95)";
      mctx.lineWidth = 1.5;
      mctx.beginPath();
      mctx.arc(ec.x * sx, ec.y * sy, 7.2, 0, Math.PI * 2);
      mctx.stroke();

      // 蟲使いの場合、魔鏡中は羽虫群も表示する。
      if (currentEnemyType === "bugmaster") {
        mctx.fillStyle = "rgba(20,20,20,.95)";
        for (const swarm of bugSwarmAgents) {
    if (swarm.counterDead) continue;
          if (swarm.state === "free") {
            mctx.beginPath();
            mctx.arc(swarm.x * sx, swarm.y * sy, 2.8, 0, Math.PI * 2);
            mctx.fill();
          }
        }
      }
    }
  }

  mctx.strokeStyle = "rgba(255,255,255,.45)";
  mctx.lineWidth = 1;
  mctx.strokeRect(cameraX * sx, cameraY * sy, VIEW_WIDTH * sx, VIEW_HEIGHT * sy);
}

function drawImageCentered(img, cx, cy, w, h) {
  if (!img || !img.complete) return;
  wctx.drawImage(img, cx - w / 2, cy - h / 2, w, h);
}

// ==============================
// 表示更新
// ==============================

function updateCamera() {
  cameraX = clamp(player.x + player.width / 2 - VIEW_WIDTH / 2, 0, WORLD_WIDTH - VIEW_WIDTH);
  cameraY = clamp(player.y + player.height / 2 - VIEW_HEIGHT / 2, 0, WORLD_HEIGHT - VIEW_HEIGHT);

  const lx = player.x + player.width / 2 - cameraX;
  const ly = player.y + player.height / 2 - cameraY;

  gameViewport.style.setProperty("--light-x", lx + "px");
  gameViewport.style.setProperty("--light-y", ly + "px");
}

function updateSpriteAnimation(dt) {
  const moving = !!player.isMoving;
  const enemyMoving = enemyMode !== "stun";
  const def = getEnemyDef();

  if (currentEnemyType === "nightShadow" && (nightShadowState === "air" || nightShadowState === "warning")) {
    enemyWrap.style.opacity = "0";
  }
  if (currentEnemyType === "miezaru" && (typeof isMiezaruVisibleToPlayer !== "function" || !isMiezaruVisibleToPlayer())) {
    enemyWrap.style.opacity = "0";
  }

  if (moving && player.canControl) {
    playerAnimClock += dt * 9;
  }

  enemyAnimClock += dt * (
    currentEnemyType === "watcher" && isFourKeyPhase() ? 14 :
    enemyMode === "chase" ? (currentEnemyType === "armed" ? 7.2 : currentEnemyType === "miezaru" ? 5.2 : 10) :
    (currentEnemyType === "armed" ? 4.4 : currentEnemyType === "miezaru" ? 3.2 : 6)
  );
  enemyFrameIndex = enemyMoving ? Math.floor(enemyAnimClock) % def.frameCount : 0;

  playerSprite.style.backgroundPosition = "center";

  const enemyCol = enemyFrameIndex % def.cols;
  const enemyRow = Math.floor(enemyFrameIndex / def.cols);
  enemySprite.style.backgroundPosition = `${-enemyCol * def.renderWidth}px ${-enemyRow * def.renderHeight}px`;

  playerWrap.style.left = (player.x - cameraX - 18) + "px";
  playerWrap.style.top = (player.y - cameraY - 24) + "px";

  enemyWrap.style.left = (enemy.x - cameraX + (enemy.width - def.renderWidth) / 2) + "px";
  enemyWrap.style.top = (enemy.y - cameraY + (enemy.height - def.renderHeight)) + "px";
  enemyWrap.style.opacity = enemy.alpha;
  if (currentEnemyType === "armed" && armedAxeSlamTimer > 0) {
    enemyWrap.style.opacity = "0";
  }

  const time = performance.now() / 1000;

  const pbob = moving ? Math.sin(time * 14) * 3.5 : 0;
  const psquash = moving ? 1 + Math.sin(time * 14) * 0.03 : 1;
  const plean = moving ? clamp(player.lastMoveX * 12, -12, 12) : 0;
  const ptilt = moving ? Math.sin(time * 7) * 2 : 0;
  const pFloatX = moving ? Math.sin(time * 10) * 2.2 : 0;

  playerWrap.style.transform = `translate(${pFloatX}px, ${pbob}px) rotate(${plean + ptilt}deg) scale(${psquash}, ${2 - psquash})`;

  if (player.lastMoveX < 0) playerSprite.classList.add("faceLeft");
  else if (player.lastMoveX > 0) playerSprite.classList.remove("faceLeft");

  let ebob = Math.sin(time * (enemyMode === "chase" ? 13 : 6)) * (enemyMode === "chase" ? (currentEnemyType === "armed" ? 3.2 : 4.2) : (currentEnemyType === "armed" ? 1.4 : 2.0));
  let esquash = enemyMode === "chase" ? 1 + Math.sin(time * 13) * 0.04 : 1 + Math.sin(time * 5) * 0.02;
  let eroll = Math.sin(time * 8) * (enemyMode === "chase" ? (currentEnemyType === "armed" ? 2.5 : 4) : 1.5);
  const elean = clamp(enemyFacingX * 10, -10, 10);
  let extraX = 0;
  let extraY = 0;

  if ((bugmasterSwarmMode === "armored" || bugmasterSwarmMode === "charge") && currentEnemyType === "bugmaster") {
    extraX += Math.sin(time * 34) * 4;
    extraY += Math.cos(time * 28) * 3;
    eroll += Math.sin(time * 30) * 4;
  }

  if (isFourKeyPhase() && (currentEnemyType === "miezaru" || currentEnemyType === "tracker")) {
    const trackerShake = currentEnemyType === "tracker" ? (1 + trackerLineAccel * 0.9) : 1;
    extraX += (Math.sin(time * 62) * 5 + Math.cos(time * 37) * 3) * trackerShake;
    extraY += Math.cos(time * 58) * 4 * trackerShake;
    eroll += Math.sin(time * 70) * 8 * trackerShake;
  }

  if (currentEnemyType === "kaishutsubotsu") {
    extraX = Math.sin(time * 55) * 4 + Math.cos(time * 41) * 2.2;
    extraY = Math.cos(time * 60) * 3.2;
    eroll += Math.sin(time * 70) * 7;
    esquash += Math.sin(time * 36) * 0.02;
  }
  if (currentEnemyType === "watcher" && enemyMode === "watcher_flurry") {
    extraX += Math.sin(time * 64) * 6;
    extraY += Math.cos(time * 68) * 5;
    eroll += Math.sin(time * 72) * 8;
  }

  enemyWrap.style.transform = `translate(${extraX}px, ${ebob + extraY}px) rotate(${elean + eroll}deg) scale(${esquash}, ${2 - esquash})`;

  if (enemyFacingX < 0) enemySprite.classList.add("faceLeft");
  else if (enemyFacingX > 0) enemySprite.classList.remove("faceLeft");

  updateBugAttachVisuals();
  if (aimState.active) updateAimGuide();
}

function updateBugAttachVisuals() {
  if (currentEnemyType !== "bugmaster" || bugAttachStacks <= 0 || gameState !== "playing") {
    bugAttachLayer.style.display = "none";
    return;
  }

  const now = performance.now();
  if (now - bugAttachVisualLastUpdate < 33) return;
  bugAttachVisualLastUpdate = now;
  bugAttachLayer.style.display = "block";
  const px = player.x - cameraX - 22;
  const py = player.y - cameraY - 22;
  bugAttachLayer.style.left = px + "px";
  bugAttachLayer.style.top = py + "px";
  bugAttachLayer.style.width = "150px";
  bugAttachLayer.style.height = "150px";

  const frame = Math.floor(performance.now() / 110) % 4;
  const time = performance.now() / 1000;
  const visible = Math.min(bugAttachSprites.length, 3 + bugAttachStacks * 2);
  const fw = images.bugSwarmSheet && images.bugSwarmSheet.complete ? images.bugSwarmSheet.width / 4 : 0;
  const fh = images.bugSwarmSheet && images.bugSwarmSheet.complete ? images.bugSwarmSheet.height : 0;

  for (let i = 0; i < bugAttachSprites.length; i++) {
    const el = bugAttachSprites[i];
    if (i >= visible) { el.style.display = "none"; continue; }
    el.style.display = "block";
    const ang = time * (2.8 + (i % 4)) + i * 0.9;
    const radius = 18 + (i % 4) * 8 + Math.sin(time * 4 + i) * 2;
    const x = 75 + Math.cos(ang) * radius + Math.sin(time * 18 + i) * 3;
    const y = 72 + Math.sin(ang * 1.2) * radius + Math.cos(time * 14 + i) * 3;
    const size = 18 + (i % 3) * 5;
    el.style.left = (x - size / 2) + "px";
    el.style.top = (y - size / 2) + "px";
    el.style.width = size + "px";
    el.style.height = size + "px";
    if (images.bugSwarmSheet && images.bugSwarmSheet.complete) {
      el.style.backgroundImage = `url(${imageSources.bugSwarmSheet})`;
      el.style.backgroundSize = `${size * 4}px ${size}px`;
      el.style.backgroundPosition = `${-frame * size}px 0px`;
    }
    el.style.transform = `rotate(${Math.sin(time * 19 + i) * 18}deg) scale(${1 + Math.sin(time * 13 + i) * 0.08})`;
    el.style.opacity = String(0.74 + ((i % 3) * 0.08));
  }
}

function updateOverlay() {
  let danger = getDanger();

  if (gameState === "clearEvent" && clearEventPhase >= 3) {
    danger = 0;
  }

  gameViewport.style.setProperty("--danger-opacity", danger.toFixed(2));

  const clearGlow = gameState === "clearEvent" ? (clearEventPhase >= 2 ? 0.70 : 0.25) : 0;
  gameViewport.style.setProperty("--clear-glow", clearGlow.toFixed(2));

  if (!gameViewport.classList.contains("snatchShake") && danger > 0.12 && !(gameState === "clearEvent" && clearEventPhase >= 3)) {
    const shake = Math.pow(danger, 1.45) * 13;
    const x = (Math.random() - 0.5) * shake;
    const y = (Math.random() - 0.5) * shake;
    gameViewport.style.transform = `translate(${x}px, ${y}px)`;
  } else {
    gameViewport.style.transform = "translate(0,0)";
  }
}

function updatePromptAndMessages(dt) {
  promptBox.textContent = promptText;
  promptBox.classList.toggle("show", !!promptText);

  if (messageTimer > 0) {
    messageTimer -= dt;
    messageBox.textContent = messageText;
    messageBox.classList.add("show");
  } else {
    messageBox.classList.remove("show");
  }
}

function isEnemyBehaviorMessage(text) {
  return /^(?:追跡者が|武装者が|飢えし獣(?:が|の匂い追跡)|蟲使い(?:が|の羽虫群)|怪出異没が|監視者が|夜の影(?:が|の鳴き声)|夜空に鳴き声|鳥居の外に、|遠くで気配が歪んだ|箱の中で、目が開いた)/.test(String(text)) ||
    /が鳥居をくぐった。$/.test(String(text)) ||
    /^(?:神社が一瞬まばゆく発光|神域の力が監視者を縛り|怪異は消え、)/.test(String(text));
}

function showMessage(text) {
  if (isEnemyBehaviorMessage(text)) return;
  messageText = text;
  messageTimer = 2.8;
}

// ==============================
// 音更新
// ==============================

function updateBugSwarmAudio(dt) {
  if (typeof bugSwarmLoopAudios === "undefined") return;

  if (currentEnemyType !== "bugmaster" || !(gameState === "playing" || gameState === "clearEvent")) {
    for (const audio of bugSwarmLoopAudios) {
      audio.pause();
      try { audio.currentTime = 0; } catch (e) {}
      setAudioVolume(audio, 0);
    }
    if (sounds.bugmasterSwarm) stopAudio(sounds.bugmasterSwarm);
    bugSwarmAudioAccumulator = 0;
    return;
  }

  bugSwarmAudioAccumulator += dt;
  if (bugSwarmAudioAccumulator < 0.05) return;
  const audioDt = bugSwarmAudioAccumulator;
  bugSwarmAudioAccumulator = 0;

  if (sounds.bugmasterSwarm) {
    sounds.bugmasterSwarm.pause();
    setAudioVolume(sounds.bugmasterSwarm, 0);
  }

  const pc = getEntityCenter(player);
  const loudest = bugSwarmAgents
    .filter(swarm => swarm && !swarm.counterDead)
    .map(swarm => {
      let volume = 0;
      if (swarm.state === "attached") volume = getMasterVolume() * getSeVolume() * 0.82;
      else if (swarm.state === "free") {
        const d = distanceBetweenPoints(pc.x, pc.y, swarm.x, swarm.y);
        const t = clamp(1 - d / 820, 0, 1);
        volume = t <= 0 ? 0 : getMasterVolume() * getSeVolume() * (0.02 + Math.pow(t, 2.15) * 0.58);
      }
      return volume;
    })
    .filter(v => v > 0.006)
    .sort((a, b) => b - a)
    .slice(0, BUG_SWARM_AUDIO_COUNT);

  // Four shared audio voices are enough because every swarm uses the same recording.
  // This avoids allocating/decoding ten simultaneous MP3 elements in the final form.
  for (let i = 0; i < bugSwarmLoopAudios.length; i++) {
    const audio = bugSwarmLoopAudios[i];
    const targetVolume = loudest[i] || 0;
    audio.volume += (targetVolume - audio.volume) * Math.min(1, audioDt * 3.6);
    if (audio.volume > 0.006 && targetVolume > 0) {
      if (audio.paused) audio.play().catch(() => {});
    } else {
      audio.pause();
      try { audio.currentTime = 0; } catch (e) {}
      setAudioVolume(audio, 0);
    }
  }
}


function updateMiezaruEndgameAudio(dt) {
  if (currentEnemyType !== "miezaru" || !isFourKeyPhase() || !(gameState === "playing" || gameState === "clearEvent")) return;
  const d = getEntityDistance(player, enemy);
  const t = clamp(1 - d / 2400, 0, 1);
  setAudioVolume(sounds.miezaru, getMasterVolume() * getSeVolume() * Math.pow(t, 2.1) * 0.62);
  if (t > 0.01 && sounds.miezaru.paused) sounds.miezaru.play().catch(() => {});
}
function updateEndgameThreatAudio(dt) {
  if (!isFourKeyPhase() || !(gameState === "playing" || gameState === "clearEvent")) return;
  const d = getEntityDistance(player, enemy);
  const t = clamp(1 - d / 2600, 0, 1);
  if (currentEnemyType === "tracker") {
    setAudioVolume(sounds.trackerCapture, getMasterVolume() * getSeVolume() * Math.pow(t, 2.0) * 0.55);
    if (t > 0.02 && sounds.trackerCapture.paused) sounds.trackerCapture.play().catch(() => {});
  }
  if (currentEnemyType === "beast") {
    setAudioVolume(sounds.beastCapture, getMasterVolume() * getSeVolume() * Math.pow(t, 1.8) * 0.62);
    if (t > 0.02 && sounds.beastCapture.paused) sounds.beastCapture.play().catch(() => {});
  }
}
function updateUgomeCapturePulse(dt) {
  if (currentEnemyType !== "ugomekimono" || !isFourKeyPhase() || !(gameState === "playing" || gameState === "clearEvent")) return;
  ugomeCapturePulseTimer -= dt;
  if (ugomeCapturePulseTimer <= 0) {
    const d = getEntityDistance(player, enemy);
    const t = clamp(1 - d / 2800, 0, 1);
    setAudioVolume(sounds.ugomekimonoCapture, getMasterVolume() * getSeVolume() * (0.15 + Math.pow(t, 1.8) * 0.55));
    playOneShot(sounds.ugomekimonoCapture);
    ugomeCapturePulseTimer = randomRange(9.0, 15.0);
  }
}

function updateAudio(dt, forceHeartbeatOnly = false) {
  const danger = getDanger();
  applyVolumes(danger);
  updateBugmasterSwarmArmorAudio(dt);

  const def = getEnemyDef();
  updateUgomekimonoAudio(dt);
  updateMiezaruEndgameAudio(dt);
  updateEndgameThreatAudio(dt);
  updateUgomeCapturePulse(dt);

  const moving = enemyMode === "wander" || enemyMode === "chase" || enemyMode === "investigate";
  if (sounds.armedMove) {
    if (currentEnemyType === "armed" && (gameState === "playing" || gameState === "clearEvent")) {
      const def = getEnemyDef();
      const d = getEntityDistance(player, enemy);
      const audibleRange = (def.viewDistance || 2200) + 1100;
      const t = clamp(1 - d / audibleRange, 0, 1);

      // 完全無音から始まり、聞こえ始めは1%。最大音量も低めに制限。
      // powで遠距離側を強く抑え、急に聞こえるのを防ぐ。
      const eased = t <= 0 ? 0 : Math.pow(t, 4.2);
      const audible = eased <= 0 ? 0 : 0.01 + eased * 0.24;
      armedMoveTargetVolume = getMasterVolume() * getBgmVolume() * audible;

      // 補間をさらに遅くして、距離変化による音量ジャンプを抑える。
      armedMoveCurrentVolume += (armedMoveTargetVolume - armedMoveCurrentVolume) * Math.min(1, dt * 0.32);

      setAudioVolume(sounds.armedMove, Math.max(0, Math.min(0.28, armedMoveCurrentVolume)));

      if (sounds.armedMove.paused) {
        setAudioVolume(sounds.armedMove, 0);
        armedMoveCurrentVolume = 0;
        sounds.armedMove.play().catch(() => {});
      }
    } else {
      armedMoveTargetVolume = 0;
      armedMoveCurrentVolume = 0;
      sounds.armedMove.pause();
      try { sounds.armedMove.currentTime = 0; } catch (e) {}
    }
  }


  if (sounds.bugmasterDetect) {
    if (currentEnemyType === "bugmaster" && (gameState === "playing" || gameState === "clearEvent")) {
      const d = getEntityDistance(player, enemy);
      const audibleRange = Math.min((def.viewDistance || 2400) + 260, 2650);
      const t = clamp(1 - d / audibleRange, 0, 1);
      const eased = t <= 0 ? 0 : Math.pow(t, 3.45);
      const baseVolume = eased <= 0 ? 0 : getMasterVolume() * Math.max(getSeVolume(), getBgmVolume()) * Math.min(0.42, eased * 0.38 + (d < 560 ? 0.045 : 0));

      if (baseVolume > 0.004) {
        if (bugmasterDetectPulseTimer > 0) {
          bugmasterDetectPulseTimer -= dt;
        } else {
          bugmasterDetectPulseDelay -= dt;
          if (bugmasterDetectPulseDelay <= 0) {
            bugmasterDetectPulseTimer = randomRange(1.0, 1.8);
            bugmasterDetectPulseDelay = randomRange(d < 900 ? 4.5 : 7.5, d < 900 ? 7.5 : 12.0);
            try { sounds.bugmasterDetect.currentTime = 0; } catch (e) {}
          }
        }
      } else {
        bugmasterDetectPulseTimer = 0;
        bugmasterDetectPulseDelay = Math.max(bugmasterDetectPulseDelay, 1.5);
      }

      const targetVolume = bugmasterDetectPulseTimer > 0 ? baseVolume : 0;
      bugmasterDetectCurrentVolume += (targetVolume - bugmasterDetectCurrentVolume) * Math.min(1, dt * 2.1);
      setAudioVolume(sounds.bugmasterDetect, Math.max(0, Math.min(0.44, bugmasterDetectCurrentVolume)));

      if (sounds.bugmasterDetect.volume > 0.006) {
        if (sounds.bugmasterDetect.paused) sounds.bugmasterDetect.play().catch(() => {});
      } else {
        sounds.bugmasterDetect.pause();
        setAudioVolume(sounds.bugmasterDetect, 0);
      }
    } else {
      bugmasterDetectPulseTimer = 0;
      bugmasterDetectPulseDelay = 0.8;
      bugmasterDetectCurrentVolume = 0;
      sounds.bugmasterDetect.pause();
      try { sounds.bugmasterDetect.currentTime = 0; } catch (e) {}
      setAudioVolume(sounds.bugmasterDetect, 0);
    }
  }

  updateBugSwarmAudio(dt);


  if (forceHeartbeatOnly) {
    sounds.field.pause();
  }

  if ((danger > 0.2 || gameState === "clearEvent") && !(gameState === "clearEvent" && clearEventPhase >= 3)) {
    heartbeatTimer -= dt;

    if (heartbeatTimer <= 0) {
      playOneShot(sounds.heartbeat);
      pulseStaminaGauge();
      heartbeatTimer = gameState === "clearEvent" ? 0.42 : Math.max(0.24, 0.92 - danger * 0.56);
    }
  } else {
    heartbeatTimer = 0;
  }
}

function getDanger() {
  const d = getEntityDistance(player, enemy);
  minimumDistance = Math.min(minimumDistance, d);
  return clamp(1 - (d - 180) / 1200, 0, 1);
}


// ==============================
// デバッグ用チートコード
// ブラウザのコンソールで window.HorrorCheat.xxx() と入力して使う。
// ==============================

window.HorrorCheat = {
  getAllKeys() {
    for (const keyId of KEY_ITEM_IDS) {
      keyInventory[keyId] = true;
      depositedKeys[keyId] = false;
      const box = keyItemBoxes.find(b => b.keyId === keyId);
      if (box) box.opened = true;
    }
    updateInventoryUI();
    showMessage("チート：神具を全入手");
    return "神具を全入手しました。";
  },

  forceCatch() {
    enemy.x = player.x;
    enemy.y = player.y;
    enemyStunTimer = 0;
    checkCapture();
    return "強制捕獲を実行しました。";
  },

  warpEnemyNear() {
    const pc = getEntityCenter(player);
    const p = findSafeEnemyWarpNearPoint(pc.x, pc.y, 220, 420, 60) || findSafeEnemySpawn(0);
    enemy.x = p.x;
    enemy.y = p.y;
    enemyPath = [];
    enemyPathTimer = 0;
    enemyMode = "chase";
    enemyLostSightTimer = 1.5;
    enemyStunTimer = 0;
    showMessage("チート：怪異を近くに転移");
    return "怪異を近くにワープさせました。";
  },

  addItem(itemId) {
    if (!ITEM_NAMES[itemId]) {
      return "存在しないIDです: " + itemId;
    }

    if (KEY_ITEM_IDS.includes(itemId)) {
      keyInventory[itemId] = true;
      const box = keyItemBoxes.find(b => b.keyId === itemId);
      if (box) box.opened = true;
      updateInventoryUI();
      showMessage("チート：" + ITEM_NAMES[itemId] + "を入手");
      return ITEM_NAMES[itemId] + " を入手しました。";
    }

    if (!NORMAL_ITEM_IDS.includes(itemId) && !window.counterattack?.acceptsItem(itemId)) {
      return "通常どうぐではありません: " + itemId;
    }

    if (addItemToInventory(itemId)) {
      showMessage("チート：" + ITEM_NAMES[itemId] + "を入手");
      return ITEM_NAMES[itemId] + " を入手しました。";
    }

    return "どうぐ欄がいっぱいです。";
  },

  itemIds() {
    return {
      normal: NORMAL_ITEM_IDS.slice(),
      key: KEY_ITEM_IDS.slice()
    };
  }
};

// ==============================
// 補助
// ==============================

function getNearestInteractable() {
  const center = getEntityCenter(player);
  let best = null;

  for (const box of boxes) {
    const d = distanceBetweenPoints(center.x, center.y, box.x + box.width / 2, box.y + box.height / 2);
    if (!best || d < best.distance) best = { type: "box", box, distance: d };
  }

  for (const box of keyItemBoxes) {
    const d = distanceBetweenPoints(center.x, center.y, box.x + box.width / 2, box.y + box.height / 2);
    if (!best || d < best.distance) best = { type: "keyBox", box, distance: d };
  }

  for (const box of watcherFakeKeyBoxes || []) {
    if (box.opened) continue;
    const d = distanceBetweenPoints(center.x, center.y, box.x + box.width / 2, box.y + box.height / 2);
    if (!best || d < best.distance) best = { type: "fakeKeyBox", box, distance: d };
  }

  for (const item of looseItems) {
    if (item.collected || depositedKeys[item.id]) continue;
    const d = distanceBetweenPoints(center.x, center.y, item.x + 24, item.y + 24);
    if (!best || d < best.distance) best = { type: "looseItem", item, distance: d };
  }

  if (mainShrine) {
    const d = rectDistance(center.x, center.y, mainShrine.depositZone);
    if (!best || d < best.distance) best = { type: "mainAltar", distance: d };
  }

  for (const shrine of shrines) {
    const d = rectDistance(center.x, center.y, shrine);
    if (isInsideRect(center, shrine) && (!best || d < best.distance)) {
      best = { type: "smallShrine", shrine, distance: 20 };
    }
  }

  return best;
}

function getFacingDirection() {
  if (mobileInputActive && Math.hypot(mobileMoveX, mobileMoveY) >= 0.12) {
    const len = Math.max(0.001, Math.hypot(mobileMoveX, mobileMoveY));
    return { x: mobileMoveX / len, y: mobileMoveY / len };
  }

  let x = player.lastMoveX || 1;
  let y = player.lastMoveY || 0;

  if (!SMARTPHONE_ONLY && (keys["ArrowUp"] || keys["w"] || keys["W"] || keys["ArrowDown"] || keys["s"] || keys["S"] ||
      keys["ArrowLeft"] || keys["a"] || keys["A"] || keys["ArrowRight"] || keys["d"] || keys["D"])) {
    x = 0;
    y = 0;
    if (keys["ArrowUp"] || keys["w"] || keys["W"]) y -= 1;
    if (keys["ArrowDown"] || keys["s"] || keys["S"]) y += 1;
    if (keys["ArrowLeft"] || keys["a"] || keys["A"]) x -= 1;
    if (keys["ArrowRight"] || keys["d"] || keys["D"]) x += 1;
  }

  const len = Math.max(0.001, Math.sqrt(x * x + y * y));
  return { x: x / len, y: y / len };
}

function canUseSaisenAtMainAltar() {
  if (!mainShrine) return false;

  const center = getEntityCenter(player);
  return rectDistance(center.x, center.y, mainShrine.depositZone) <= 105;
}

function isInsideMainShrine(entity) {
  return isInsideRect(getEntityCenter(entity), mainShrine);
}

function isInsideRect(point, rect) {
  return point.x >= rect.x && point.x <= rect.x + rect.width && point.y >= rect.y && point.y <= rect.y + rect.height;
}

function rectDistance(px, py, rect) {
  const dx = Math.max(rect.x - px, 0, px - (rect.x + rect.width));
  const dy = Math.max(rect.y - py, 0, py - (rect.y + rect.height));
  return Math.sqrt(dx * dx + dy * dy);
}

function isVisible(rect) {
  return rect.x + rect.width > cameraX - 240 &&
         rect.x < cameraX + VIEW_WIDTH + 240 &&
         rect.y + rect.height > cameraY - 240 &&
         rect.y < cameraY + VIEW_HEIGHT + 240;
}

function isOnRoad(x, y, width, height) {
  const rect = { left: x, top: y, right: x + width, bottom: y + height };
  return worldZones.some(z => z.tag === "road" && rectsOverlap(rect, {
    left: z.x,
    top: z.y,
    right: z.x + z.width,
    bottom: z.y + z.height
  }));
}

function isNearAnyTorii(x, y, width, height, margin) {
  const rect = { left: x - margin, top: y - margin, right: x + width + margin, bottom: y + height + margin };

  const gates = [];
  if (mainShrine) gates.push(mainShrine.gate);
  for (const shrine of shrines) gates.push(shrine.gate);

  return gates.some(g => rectsOverlap(rect, {
    left: g.x,
    top: g.y,
    right: g.x + g.width,
    bottom: g.y + g.height
  }));
}

function isTooCloseToShrine(x, y, width, height, margin) {
  const rect = { left: x - margin, top: y - margin, right: x + width + margin, bottom: y + height + margin };

  return shrines.some(s => rectsOverlap(rect, {
    left: s.x,
    top: s.y,
    right: s.x + s.width,
    bottom: s.y + s.height
  }));
}

function getEntityCenter(entity) {
  return { x: entity.x + entity.width / 2, y: entity.y + entity.height / 2 };
}

function getEntityDistance(a, b) {
  const ac = getEntityCenter(a);
  const bc = getEntityCenter(b);
  return distanceBetweenPoints(ac.x, ac.y, bc.x, bc.y);
}

function distanceBetweenPoints(x1, y1, x2, y2) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}

function rectsOverlap(a, b) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function randomRange(min, max) {
  return min + Math.random() * (max - min);
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
function updateEnemyProjectiles(dt) {
  for (let i = enemyProjectiles.length - 1; i >= 0; i--) {
    const p = enemyProjectiles[i];
    p.timer -= dt;
    const oldX = p.x;
    const oldY = p.y;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.rotation = Math.atan2(p.vy, p.vx);

    if (p.kind === "chainHook" && segmentIntersectsAnySanctuary(oldX, oldY, p.x, p.y, 36)) {
      enemyProjectiles.splice(i, 1);
      continue;
    }
    if (p.kind === "chainHook") {
      p.traveled = (p.traveled || 0) + Math.hypot(p.x - oldX, p.y - oldY);
    }

    if (collidesWithWorldPoint(p.x, p.y) || p.timer <= 0 || (p.kind === "chainHook" && p.traveled >= p.maxDistance)) {
      enemyProjectiles.splice(i, 1);
      continue;
    }

    const hitSize = p.kind === "chainHook" ? 24 : 18;
    const pr = { left: p.x - hitSize, right: p.x + hitSize, top: p.y - hitSize, bottom: p.y + hitSize };
    const pl = getCollisionRect(player, player.x, player.y);
    if (rectsOverlap(pr, pl)) {
      if (p.kind === "chainHook") {
        if (isPlayerInAnySanctuary()) { enemyProjectiles.splice(i, 1); continue; }
        if (useOmamoriProtection("チェーンフック")) {
          enemyProjectiles.splice(i, 1);
          continue;
        }
        pullPlayerToArmedClose();
        enemyProjectiles.splice(i, 1);
        continue;
      }

      if (useOmamoriProtection("投げナイフ")) {
        enemyProjectiles.splice(i, 1);
        continue;
      }
      armedNoKnifeHitTimer = 0;
      playerKnifeSlowTimers.push(9.5);
      playOneShot(sounds.armedKnifeHit);
      showMessage(`投げナイフが刺さった…移動速度が大きく低下 ${playerKnifeSlowTimers.length}重。`);
      enemyProjectiles.splice(i, 1);
    }
  }
}



function updateArmedAxeLunge(dt) {
  if (currentEnemyType !== "armed" || armedAxeLungeTimer <= 0) return false;

  enemyMode = "axeLunge";
  enemyFacingX = armedAxeLungeDirX || enemyFacingX || -1;
  enemyFacingY = armedAxeLungeDirY || enemyFacingY || 0;

  // 一瞬で座標を飛ばさず、数フレームかけて俊足で前進する。
  const burstSpeed = 36.0; // px/frame相当を速度化。かなり速いがワープではない。
  moveEntitySmart(enemy, enemyFacingX, enemyFacingY, burstSpeed * 60 * dt);

  if (armedAxeLungeTimer <= 0) {
    armedAxeLungeDirX = 0;
    armedAxeLungeDirY = 0;
  }

  return true;
}

function startArmedAxeSlam() {
  const def = getEnemyDef();
  const ec = getEntityCenter(enemy);
  const pc = getEntityCenter(player);
  const dx = pc.x - ec.x;
  const dy = pc.y - ec.y;
  const len = Math.max(1, Math.hypot(dx, dy));
  const nx = dx / len;
  const ny = dy / len;

  // 範囲スタンは廃止。ワープではなく、短時間の高速前進として処理。
  armedAxeLungeDirX = nx;
  armedAxeLungeDirY = ny;
  armedAxeLungeTimer = 0.30;

  armedAxeCooldown = def.axeSlamCooldown || 9.0;
  armedAxeSlamTimer = 0.62;
  playOneShot(sounds.armedCapture);
  showMessage("武装者が斧を振り下ろし、俊足で前方へ踏み込んだ！");
}

function drawArmedAxeSlamEffect() {
  if (currentEnemyType !== "armed" || armedAxeSlamTimer <= 0) return;
  const img = images.armedAxeSlamSheet;
  if (!img || !img.complete) return;

  const ec = getEntityCenter(enemy);
  const alpha = clamp(armedAxeSlamTimer / 0.62, 0, 1);
  const progress = clamp(1 - armedAxeSlamTimer / 0.62, 0, 0.999);
  const frame = Math.min(3, Math.floor(progress * 4));

  // 既存武装者の表示サイズ(renderWidth=260/renderHeight=335)に合わせる。
  const drawW = 270;
  const drawH = 348;

  wctx.save();
  wctx.translate(-cameraX, -cameraY);
  wctx.globalAlpha = Math.max(0.72, alpha);
  wctx.filter = "drop-shadow(0 0 18px rgba(255,220,120,.55)) drop-shadow(0 0 22px rgba(127,29,29,.62))";

  if (img === images.armedAxeSlamSheet) {
    wctx.drawImage(img, frame * 640, 0, 640, 640, ec.x - drawW / 2, ec.y - drawH + 64, drawW, drawH);
  } else {
    wctx.drawImage(img, ec.x - drawW / 2, ec.y - drawH + 64, drawW, drawH);
  }

  wctx.restore();
}

function throwArmedChainHook() {
  const ec = getEntityCenter(enemy);
  if (segmentIntersectsAnySanctuary(ec.x, ec.y - 18, ec.x, ec.y - 18, 36)) return;
  const pc = getEntityCenter(player);
  const dx = pc.x - ec.x;
  const dy = pc.y - ec.y;
  const len = Math.max(0.001, Math.hypot(dx, dy));
  const speed = 31.0;

  enemyProjectiles.push({
    kind: "chainHook",
    originX: ec.x,
    originY: ec.y - 18,
    x: ec.x,
    y: ec.y - 18,
    vx: (dx / len) * speed * 60,
    vy: (dy / len) * speed * 60,
    timer: 0.92,
    maxDistance: 1900,
    traveled: 0,
    rotation: Math.atan2(dy, dx)
  });

  playOneShot(sounds.armedThrow);
  showMessage("武装者がチェーンフックを放った！");
}

function pullPlayerToArmedClose() {
  if (isPlayerInAnySanctuary()) return;
  const ec = getEntityCenter(enemy);
  const pc = getEntityCenter(player);
  const dx = pc.x - ec.x;
  const dy = pc.y - ec.y;
  const len = Math.max(1, Math.hypot(dx, dy));
  const targetDistance = 105;

  player.x = clamp(ec.x + (dx / len) * targetDistance - player.width / 2, 0, WORLD_WIDTH - player.width);
  player.y = clamp(ec.y + (dy / len) * targetDistance - player.height / 2, 0, WORLD_HEIGHT - player.height);
  movementSlowTimer = Math.max(movementSlowTimer, 0.65);
  showMessage("チェーンフックに捕らえられ、武装者の至近距離まで引き寄せられた！");
}

function throwArmedKnife() {
  const def = getEnemyDef();
  const ec = getEntityCenter(enemy);
  const pc = getEntityCenter(player);
  const dx = pc.x - ec.x;
  const dy = pc.y - ec.y;
  const len = Math.max(0.001, Math.hypot(dx, dy));
  const spd = def.knifeSpeed || 10;
  enemyProjectiles.push({
    kind: "armedKnife",
    x: ec.x,
    y: ec.y - 20,
    vx: (dx / len) * spd * 60,
    vy: (dy / len) * spd * 60,
    timer: 3.8,
    rotation: Math.atan2(dy, dx)
  });
  if (def.throwSfx && sounds[def.throwSfx]) playOneShot(sounds[def.throwSfx]);
}

function updateWatcherPhantomAgents(dt) {
  for (let i = watcherPhantoms.length - 1; i >= 0; i--) {
    const ph = watcherPhantoms[i];
    if (window.counterattack?.isStunned(ph)) continue;
    ph.timer -= dt;
    ph.wobble += dt * 8;
    if (ph.clone) {
      const pc = getEntityCenter(player);
      const d = distanceBetweenPoints(ph.x, ph.y, pc.x, pc.y);
      if (d > 760 || Math.random() < dt * 0.22) {
        const a = Math.random() * Math.PI * 2;
        ph.x = clamp(pc.x + Math.cos(a) * randomRange(220, 560), 120, WORLD_WIDTH - 120);
        ph.y = clamp(pc.y + Math.sin(a) * randomRange(220, 560), 120, WORLD_HEIGHT - 120);
      }
    } else {
      ph.x += ph.vx * dt + Math.sin(ph.wobble) * 18 * dt;
      ph.y += ph.vy * dt + Math.cos(ph.wobble * 0.85) * 18 * dt;
    }
    ph.frame = Math.floor((ph.maxTimer - ph.timer) * 10) % ((ENEMY_TYPES[ph.type] && ENEMY_TYPES[ph.type].frameCount) || 4);

    if (ph.x < -220 || ph.y < -220 || ph.x > WORLD_WIDTH + 220 || ph.y > WORLD_HEIGHT + 220 || ph.timer <= 0) {
      watcherPhantoms.splice(i, 1);
    }
  }

}
