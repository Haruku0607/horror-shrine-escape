/* Solo-only additive mode. Normal objectives, inventory and saves remain available. */
(() => {
  "use strict";
  const MODE_STORAGE_KEY = "yorumichi_counterattack_mode";
  const BODY_HP = Object.freeze({ tracker:10, armed:10, beast:10, bugmaster:10,
    nightShadow:10, kaishutsubotsu:10, miezaru:10, watcher:15, ugomekimono:20 });
  const ITEMS = Object.freeze({ seal_grenade:"魔封手榴弾", stun_grenade:"スタングレネード",
    seal_mine:"魔封地雷", seal_launcher:"魔封ロケットランチャー" });
  const GUN = "seal_gun";
  const labels = { ...ITEMS, [GUN]:"魔封銃" };
  const state = { enabled:localStorage.getItem(MODE_STORAGE_KEY)==="counter", defeatedBody:false, clock:0, ammo:6, reload:0,
    cooldown:0, shots:[], grenades:[], mines:[], effects:[], fades:[], revivals:[], reaction:null,
    targetCache:[], targetCacheTimer:0, hasSeenHealth:false, hudSignature:"", nightShadowDamageRetreat:false };
  let health = new WeakMap();
  let previousCenters = new WeakMap();
  let gunSlot, hud, reloadButton, titleNote, help, barCanvas, barContext;
  const audioPool = {};
  // User-supplied recordings; keep the source MP3 files unmodified.
  const AUDIO_FILES = Object.freeze({ready:'counter_ready.mp3',shot:'counter_shot.mp3',
    hit:'counter_hit.mp3',reload:'counter_reload.mp3',empty:'counter_empty.mp3',
    explosion:'counter_explosion.mp3',stun:'counter_stun.mp3',rocket:'counter_rocket.mp3'});
  // Source rectangles only affect rendering. Original generated RGBA PNGs are preserved.
  const ART = Object.freeze({
    seal_gun:{file:'seal_gun_icon',crop:[15,1,1233,1252]},
    seal_grenade:{file:'seal_grenade_icon',crop:[243,56,838,1127]},
    stun_grenade:{file:'stun_grenade_icon',crop:[305,34,727,1154]},
    seal_mine:{file:'seal_mine_icon',crop:[83,171,1089,913]},
    seal_launcher:{file:'seal_launcher_icon',crop:[8,126,1246,957]},
    seal_gun_field:{file:'seal_gun_field',crop:[13,187,1241,941]},
    seal_grenade_field:{file:'seal_grenade_field',crop:[266,75,827,1106]},
    stun_grenade_field:{file:'stun_grenade_field',crop:[338,41,686,1144]},
    seal_mine_field:{file:'seal_mine_field',crop:[22,8,1210,1231]},
    seal_launcher_field:{file:'seal_launcher_field',crop:[12,446,1232,401]},
    seal_bullet:{file:'seal_bullet',crop:[316,252,1613,214]},
    seal_rocket:{file:'seal_rocket',crop:[84,252,1529,382]},
    seal_explosion:{file:'seal_explosion',crop:[39,22,1191,1220]},
    seal_hit:{file:'seal_hit',crop:[227,209,845,804]}
  });
  let artworkLoaded=false;
  function ensureArtworkImage(id) {
    const art=ART[id];
    if(!art) return null;
    if(!imageSources[id]) imageSources[id]=`assets/images/counterattack/${art.file}.png`;
    if(!images[id]) { images[id]=new Image(); images[id].src=imageSources[id]; }
    return images[id];
  }
  function loadArtwork() {
    if(artworkLoaded) return;
    artworkLoaded=true;
    // Register every counterattack asset path, but only decode images when they are actually used.
    // The source PNGs are large (roughly 6 MB decoded each), so eager-loading all of them caused a large memory spike.
    for(const [id,art] of Object.entries(ART)) imageSources[id]=`assets/images/counterattack/${art.file}.png`;
    gunSlot.style.backgroundImage=`url("${imageSources[GUN]}")`;
  }
  function drawArt(id,x,y,width,height,anchorX=0.5,anchorY=0.5) {
    const art=ART[id],img=ensureArtworkImage(id);
    if(!art || !img?.complete || !img.naturalWidth) return;
    const [sx,sy,sw,sh]=art.crop,scale=Math.min(width/sw,height/sh),dw=sw*scale,dh=sh*scale;
    wctx.drawImage(img,sx,sy,sw,sh,x-dw*anchorX,y-dh*anchorY,dw,dh);
  }

  function consumeAny(...aliases) {
    let found = false;
    for (const alias of aliases) { if (pressed[alias]) found = true; pressed[alias] = false; }
    return found;
  }
  function usePress() {
    const mobile = typeof window.consumeMobileUsePress === "function" && window.consumeMobileUsePress();
    return mobile || consumeAny(" ", "Space", "Spacebar", "Enter", "NumpadEnter", "32", "13");
  }
  function firePress() { return consumeAny("e", "E", "KeyE", "69", "p", "P", "KeyP", "80"); }
  function clearActionPresses() { usePress(); firePress(); consumeAny("r","R","KeyR","82"); }
  function selectedWeapon() { return selectedItemIndex === 3 ? GUN : itemInventory[selectedItemIndex]; }
  function acceptsItem(id) { return state.enabled && Object.hasOwn(ITEMS,id); }
  function isWeaponReady() { return state.enabled && aimState.active && [GUN,"seal_launcher"].includes(aimState.itemId); }
  function isStunned(object) { return state.enabled && (object?.counterStunUntil || 0) > state.clock; }

  function installUi() {
    Object.assign(ITEM_NAMES, labels);
    gunSlot = document.createElement('button'); gunSlot.type='button';
    gunSlot.id='counterGunSlot'; gunSlot.className='slot counterGunSlot filled';
    gunSlot.dataset.slotNum='4'; gunSlot.title='魔封銃';
    gunSlot.setAttribute('aria-label','魔封銃を選択');
    gunSlot.addEventListener('click',()=>{ if(state.enabled && gameState==='playing') { cancelAim(); selectedItemIndex=3; updateInventoryUI(); } });
    document.getElementById('itemSlots').appendChild(gunSlot);
    hud=document.createElement('div'); hud.id='counterHud'; gameViewport.appendChild(hud);
    reloadButton=document.createElement('button'); reloadButton.id='counterReloadButton'; reloadButton.type='button'; reloadButton.textContent='リロード';
    reloadButton.addEventListener('pointerdown',e=>{ e.preventDefault(); e.stopPropagation(); reload(); });
    gameViewport.appendChild(reloadButton);
    titleNote=document.createElement('p'); titleNote.id='counterTitleNote';
    titleScreen.querySelector('.titlePanel').appendChild(titleNote);
    help=document.createElement('section'); help.id='counterHelp';
    help.innerHTML='<h3>反撃モード</h3><p>神具５つの奉納、または怪異本体の撃破でクリア。眷属・分身・触手を倒しても本体との戦いは続く。</p><p>魔封銃：銃の枠をタップして選択。どうぐボタンを1回タップで構え、構え中にもう1回タップで発射。構え中にどうぐボタンをスワイプすると構え解除。弾を補充するときは「リロード」をタップ。</p><p>手榴弾・スタングレネード：どうぐボタンを押しながらスティックで方向を決め、離して投げる。投てきから３秒後に爆発。地雷：どうぐボタンで足元に設置。ランチャー：銃と同じタップ操作・１発で消費。</p>';
    document.querySelector('#howToScreen .howToContent').appendChild(help);
    barCanvas=document.createElement('canvas'); barCanvas.id='counterBars';
    barCanvas.width=VIEW_WIDTH; barCanvas.height=VIEW_HEIGHT;
    cameraStage.appendChild(barCanvas); barContext=barCanvas.getContext('2d');
    const style=document.createElement('style');
    style.textContent=`#counterGunSlot{position:relative;border-color:#8b4abb;cursor:pointer}#counterGunSlot::after{content:"4";position:absolute;left:4px;top:3px;color:#ead3ff;font:12px sans-serif}#counterGunSlot.selected{box-shadow:0 0 16px #b86de0;border-color:#ecd2ff}#counterHud{position:absolute;left:18px;top:210px;z-index:30;max-width:65%;padding:7px 12px;border:1px solid #8053a8;border-radius:5px;background:rgba(14,5,24,.85);color:#ead3ff;font:14px/1.6 sans-serif;pointer-events:none}#counterTitleNote{color:#dcc0fa;font-size:14px;line-height:1.8;max-width:720px;overflow-wrap:anywhere;margin:18px auto 0}#counterBars{position:absolute;left:0;top:0;z-index:9;pointer-events:none;width:100%;height:100%}#titleScreen.counterMode h1{color:#eedaff;text-shadow:0 0 24px #7c269c}#counterHelp{border-top:1px solid #764297;margin-top:22px;padding-top:10px}#counterReloadButton{position:absolute;right:22px;bottom:112px;z-index:65;padding:8px 12px;border:1px solid #b98ad4;border-radius:999px;background:rgba(31,10,45,.86);color:#f2dcff;font-weight:800;touch-action:manipulation}#counterReloadButton[hidden],#counterGunSlot[hidden],#counterHud[hidden],#counterTitleNote[hidden],#counterHelp[hidden],#counterBars[hidden]{display:none!important}`;
    document.head.appendChild(style);
    if(state.enabled) loadArtwork();
    refreshTitle(); updateHud();
  }

  function refreshTitle() {
    titleScreen.classList.toggle('counterMode',state.enabled);
    titleScreen.querySelector('h1').textContent=state.enabled ? '夜道の反撃者' : '夜道の追跡者 神域';
    document.title=state.enabled ? '夜道の反撃者' : '夜道の追跡者 神域';
    if (titleNote) {
      titleNote.hidden=!state.enabled;
      titleNote.textContent=state.enabled ? '反撃モード：奉納でも、怪異本体の撃破でもクリア。タイトルの「あいことば」で「通常」と入力すると通常モードへ戻る。' : '';
    }
    if (help) help.hidden=!state.enabled;
    window.updatePassphraseStatus?.();
  }
  function setMode(enabled,persist=true) {
    state.enabled=!!enabled;
    if(persist) localStorage.setItem(MODE_STORAGE_KEY,state.enabled?'counter':'normal');
    if(state.enabled) loadArtwork();
    else if(aimState.active && Object.hasOwn(labels,aimState.itemId)) cancelAim();
    if(!state.enabled && selectedItemIndex===3) selectedItemIndex=0;
    refreshTitle();
    updateHud();
    if(typeof updateInventoryUI==='function') updateInventoryUI();
    playSfx('ready');
    return state.enabled;
  }
  function reset() {
    if(state.enabled) loadArtwork();
    state.clock=0; state.ammo=6; state.reload=0; state.cooldown=0; state.defeatedBody=false; state.reaction=null;
    state.targetCache=[]; state.targetCacheTimer=0; state.hasSeenHealth=false; state.hudSignature=""; state.nightShadowDamageRetreat=false;
    for(const key of ['shots','grenades','mines','effects','fades','revivals']) state[key]=[];
    health=new WeakMap(); previousCenters=new WeakMap();
    enemy.counterStunUntil=0; enemy.counterDead=false;
    selectedItemIndex=state.enabled ? 3 : 0;
    clearActionPresses(); updateInventoryUI();
    if(state.enabled) showMessage('反撃モード：魔封銃の枠をタップして選択。奉納・怪異本体の撃破のどちらでもクリア。');
  }
  function pickBoxItem() {
    // Of item-containing boxes: 9 normal items x 4, grenades/stun/mines x 4, launcher x 1.
    const bag=[...NORMAL_ITEM_IDS.flatMap(id=>[id,id,id,id]),
      ...['seal_grenade','stun_grenade','seal_mine'].flatMap(id=>[id,id,id,id]),'seal_launcher'];
    return bag[Math.floor(Math.random()*bag.length)];
  }
  function updateHud() {
    if(!hud) return;
    const reloadText=state.reload>0 ? state.reload.toFixed(1) : '0.0';
    const weaponReady=isWeaponReady();
    const signature=[state.enabled,selectedItemIndex,state.ammo,reloadText,weaponReady].join('|');
    if(state.hudSignature===signature) return;
    state.hudSignature=signature;
    gunSlot.hidden=!state.enabled; hud.hidden=!state.enabled; barCanvas.hidden=!state.enabled;
    gunSlot.classList.toggle('selected',selectedItemIndex===3);
    const next=state.reload>0 ? `魔封銃　装填中 ${reloadText}秒`
      : `魔封銃　${state.ammo} / 6${state.ammo===0 ? '　リロードしてください' : ''}`;
    const full=next;
    if(hud.textContent!==full) hud.textContent=full;
    if(state.enabled && selectedItemIndex===3) selectedItemName.textContent=`選択中：魔封銃　${weaponReady ? 'タップで発射・スワイプで解除' : 'どうぐボタンで構える'}`;
    if(reloadButton) reloadButton.hidden=!(state.enabled && selectedItemIndex===3 && state.ammo<6 && state.reload<=0);
    window.updateTouchUseButtonIcon?.();
  }
  function aim(id) {
    const dir=getFacingDirection(); aimState.active=true; aimState.itemId=id;
    aimState.slotIndex=selectedItemIndex; aimState.dirX=dir.x; aimState.dirY=dir.y;
    playSfx('ready'); updateAimGuide();
  }
  function direction() {
    const dir=typeof getCurrentAimDirection==='function' ? getCurrentAimDirection() : getFacingDirection();
    if(dir) { aimState.dirX=dir.x; aimState.dirY=dir.y; }
    updateAimGuide();
  }
  function reload() {
    if(state.reload>0 || state.ammo===6) return;
    state.reload=3; playSfx('reload'); showMessage('魔封銃をリロード中（３秒）'); updateHud();
  }
  function handleUse() {
    if(!state.enabled) return false;
    if(consumeAny('r','R','KeyR','82')) reload();
    const id=selectedWeapon();
    const ours=id===GUN || Object.hasOwn(ITEMS,id);
    if(aimState.active && Object.hasOwn(labels,aimState.itemId) && (aimState.itemId!==id || aimState.slotIndex!==selectedItemIndex)) cancelAim();
    if(!ours) { firePress(); return false; }
    const fire=firePress(), use=usePress(), down=isUseDown();
    if(id===GUN || id==='seal_launcher') {
      if(use) { if(aimState.active) cancelAim(); else aim(id); }
      if(aimState.active) { direction(); if(fire) shoot(id); }
    } else if(id==='seal_mine') {
      if(use) {
        const pc=getEntityCenter(player);
        state.mines.push({x:pc.x,y:pc.y,armedAt:state.clock+0.35});
        playSfx('ready'); consumeSelectedItem(); showMessage('魔封地雷を設置した。');
      }
    } else {
      if(down && !aimState.active) aim(id);
      if(aimState.active && down) direction();
      if(aimState.active && !down) {
        const pc=getEntityCenter(player);
        state.grenades.push({kind:id,x:pc.x,y:pc.y,vx:aimState.dirX*510,vy:aimState.dirY*510,flight:0.9,fuse:3});
        consumeSelectedItem(); cancelAim();
      }
    }
    updateHud(); return true;
  }

  function isTouchGunSelected() {
    if(!state.enabled) return false;
    const id=selectedWeapon();
    return id===GUN || id==='seal_launcher';
  }
  function touchGunTap() {
    if(!isTouchGunSelected() || gameState!=='playing') return false;
    const id=selectedWeapon();
    if(aimState.active && aimState.itemId===id && aimState.slotIndex===selectedItemIndex) {
      direction();
      shoot(id);
    } else {
      if(aimState.active) cancelAim();
      aim(id);
    }
    updateHud();
    return true;
  }
  function touchGunSwipeCancel() {
    if(aimState.active && Object.hasOwn(labels,aimState.itemId)) cancelAim();
    updateHud();
    return true;
  }
  function isTouchThrowableSelected() {
    if(!state.enabled) return false;
    const id=selectedWeapon();
    return id==='seal_grenade' || id==='stun_grenade';
  }
  function touchThrowableRelease() {
    if(!isTouchThrowableSelected()) return false;
    const id=selectedWeapon();
    if(!aimState.active) aim(id);
    direction();
    const pc=getEntityCenter(player);
    state.grenades.push({kind:id,x:pc.x,y:pc.y,vx:aimState.dirX*510,vy:aimState.dirY*510,flight:0.9,fuse:3});
    consumeSelectedItem();
    cancelAim();
    updateHud();
    return true;
  }

  // Return the earliest segment/rectangle contact, including a start inside a target.
  function segmentRect(x1,y1,x2,y2,r,pad=0) {
    let enter=0,leave=1;
    const dx=x2-x1,dy=y2-y1;
    for(const [p,d,lo,hi] of [[x1,dx,r.x-pad,r.x+r.width+pad],[y1,dy,r.y-pad,r.y+r.height+pad]]) {
      if(Math.abs(d)<1e-9) { if(p<lo || p>hi) return null; }
      else { const a=(lo-p)/d,b=(hi-p)/d; enter=Math.max(enter,Math.min(a,b)); leave=Math.min(leave,Math.max(a,b)); if(enter>leave) return null; }
    }
    return enter;
  }
  function segmentCircle(x1,y1,x2,y2,c,r) {
    const dx=x2-x1,dy=y2-y1,ox=x1-c.x,oy=y1-c.y;
    const cc=ox*ox+oy*oy-r*r;
    if(cc<=0) return 0;
    const a=dx*dx+dy*dy; if(a<1e-9) return null;
    const b=2*(ox*dx+oy*dy),disc=b*b-4*a*cc;
    if(disc<0) return null;
    const t=(-b-Math.sqrt(disc))/(2*a); return t>=0 && t<=1 ? t : null;
  }
  function segmentCapsule(x1,y1,x2,y2,target,pad=0) {
    const {line}=target, dx=line.x2-line.x1,dy=line.y2-line.y1,len=Math.hypot(dx,dy),radius=line.radius+pad;
    if(len<1) return segmentCircle(x1,y1,x2,y2,{x:line.x1,y:line.y1},radius);
    const ux=dx/len,uy=dy/len;
    const local=(x,y)=>({x:(x-line.x1)*ux+(y-line.y1)*uy,y:-(x-line.x1)*uy+(y-line.y1)*ux});
    const a=local(x1,y1),b=local(x2,y2);
    const ts=[segmentRect(a.x,a.y,b.x,b.y,{x:0,y:-radius,width:len,height:radius*2}),
      segmentCircle(a.x,a.y,b.x,b.y,{x:0,y:0},radius),segmentCircle(a.x,a.y,b.x,b.y,{x:len,y:0},radius)].filter(t=>t!==null);
    return ts.length ? Math.min(...ts) : null;
  }
  function targetHit(x1,y1,x2,y2,t,pad=0) {
    return t.line ? segmentCapsule(x1,y1,x2,y2,t,pad) : segmentRect(x1,y1,x2,y2,t.rect,pad);
  }
  function rectAt(x,y,w,h) { return {x:x-w/2,y:y-h/2,width:w,height:h}; }
  function record(target) {
    let h=health.get(target.object);
    if(!h || h.kind!==target.kind) { h={hp:target.max,max:target.max,seen:false,kind:target.kind}; health.set(target.object,h); }
    return h;
  }
  function targets() {
    const list=[];
    function add(object,kind,max,rect,extra={}) {
      if(!object || object.counterDead) return;
      const t={object,kind,max,rect,x:rect.x+rect.width/2,y:rect.y+rect.height/2,...extra};
      record(t); list.push(t);
    }
    if(enemy.visible && !(currentEnemyType==='nightShadow' && ['air','warning'].includes(nightShadowState))) {
      add(enemy,`body:${currentEnemyType}`,BODY_HP[currentEnemyType],{x:enemy.x,y:enemy.y,width:enemy.width,height:enemy.height},{body:true,type:currentEnemyType});
    }
    const pc=getEntityCenter(player);
    if(currentEnemyType==='bugmaster') for(const s of bugSwarmAgents) {
      if(s.respawnTimer>0) continue;
      const at=s.state==='attached';
      add(s,'bug',1,rectAt(at?pc.x:s.x,at?pc.y:s.y,88,88),{attached:at,sheet:'bugSwarmSheet'});
    }
    if(currentEnemyType==='miezaru') for(const c of miezaruClones) add(c,'miezaruClone',1,rectAt(c.x,c.y,enemy.width,enemy.height),{type:'miezaru',barY:c.y-ENEMY_TYPES.miezaru.renderHeight/2-20});
    if(currentEnemyType==='watcher') {
      for(const b of watcherFakeKeyBoxes) add(b,'fakeBox',3,b,{sheet:'sealed_key_box'});
      if(watcherGiantEye) add(watcherGiantEye,'giantEye',50,rectAt(watcherGiantEye.x,watcherGiantEye.y,520,340),{sheet:'watcherGiantEyeSheet',barY:watcherGiantEye.y-320});
      for(const p of watcherPhantoms) add(p,'phantom',1,rectAt(p.x,p.y,Math.min(260,ENEMY_TYPES[p.type].renderWidth),Math.min(260,ENEMY_TYPES[p.type].renderHeight)),{type:p.type});
      for(const p of watcherObjectPhantoms) add(p,'objectPhantom',1,p,{sheet:p.type==='car'?'object_car':'object_pole'});
    }
    if(currentEnemyType==='ugomekimono') {
      for(const t of ugomeTentacles) {
        const root=getUgomeTentacleRoot(t.index), at=ugomeGrab?.tentacleIndex===t.index;
        add(t,'tentacle',3,rectAt(t.x,t.y,90,116),{attached:at,sheet:'ugomekimonoTentacleSheet',line:{x1:root.x,y1:root.y,x2:t.x,y2:t.y,radius:48}});
      }
      for(const t of ugomeGroundTentacles) add(t,'groundTentacle',1,rectAt(t.x,t.y,t.radius*2,t.radius*2),{attached:ugomeGroundBind?.sourceId===t.id,sheet:'ugomekimonoBoundTentacleSheet'});
      for(const g of ugomeTentacleGroups) add(g,'tentacleWall',5,rectAt((g.rootX+g.endX)/2,(g.rootY+g.endY)/2,g.width,g.width),{sheet:'ugomekimonoTentacleSheet',line:{x1:g.rootX,y1:g.rootY,x2:g.endX,y2:g.endY,radius:g.width/2}});
    }
    return list;
  }
  function collide(x1,y1,x2,y2,list,pad=0) {
    let hit=null,tMin=Infinity;
    for(const target of list) {
      if(target.object.counterDead) continue;
      const t=targetHit(x1,y1,x2,y2,target,pad);
      if(t!==null && t<tMin) { tMin=t;hit={t,target}; }
    }
    for(const o of obstacles) {
      // Fake boxes are damageable. Gates represent an invisible enemy-only barrier,
      // not a building; the physical trees, ropes and structures still block bullets.
      if(o.type==='fakeKeyBox' || isSanctuaryBlocker(o)) continue;
      const t=segmentRect(x1,y1,x2,y2,o,pad);
      if(t!==null && t<=tMin) { tMin=t;hit={t,obstacle:o}; }
    }
    return hit;
  }
  function isBodyDamageReactionActive() {
    if(state.reaction) return true;
    // Night Shadow uses the normal ascend/air state for its hit reaction, so track only hit-triggered ascents.
    return currentEnemyType==='nightShadow' && state.nightShadowDamageRetreat;
  }
  function lureEnemyToCounterNoise(x,y,kind) {
    if(!state.enabled || state.defeatedBody || isBodyDamageReactionActive()) return;
    if(typeof forceEnemyInvestigatePoint!=='function') return;
    const explosion=kind==='explosion';
    forceEnemyInvestigatePoint(x,y,explosion?7.0:5.0,explosion?1.7:1.4,explosion?'counter_explosion':'counter_shot');
  }
  function shoot(id) {
    if(state.cooldown>0) return;
    if(id===GUN && state.reload>0) { showMessage(`リロード中：あと${state.reload.toFixed(1)}秒`); return; }
    if(id===GUN && state.ammo<=0) { playSfx('empty');showMessage('弾がない。「リロード」で装填（３秒）');state.cooldown=0.18;return; }
    const rocket=id==='seal_launcher', pc=getEntityCenter(player);
    state.cooldown=rocket?0.45:0.14;
    if(!rocket) state.ammo--;
    playSfx(rocket?'rocket':'shot');
    lureEnemyToCounterNoise(pc.x,pc.y,'shot');
    ensureArtworkImage(rocket?'seal_rocket':'seal_bullet');
    const attachment=targets().find(t=>t.attached);
    if(attachment) {
      if(rocket) explode(pc.x,pc.y,'rocket');
      else { damage(attachment,1); state.effects.push({x:pc.x,y:pc.y,radius:45,life:0.14,max:0.14,kind:'hit'}); }
    } else {
      const speed=rocket?1500:4800;
      state.shots.push({x:pc.x,y:pc.y,vx:aimState.dirX*speed,vy:aimState.dirY*speed,rocket,life:Math.hypot(WORLD_WIDTH,WORLD_HEIGHT)/speed+1});
    }
    if(rocket) { consumeSelectedItem(); cancelAim(); }
    else if(state.ammo===0) showMessage('６発撃ち切った。「リロード」で装填（３秒）');
    updateHud();
  }
  function stagger(target,seconds) {
    // A new short hit must never shorten an existing grenade stun.
    target.object.counterStunUntil=Math.max(target.object.counterStunUntil||0,state.clock+seconds);
    releaseAttached(target);
    if(target.kind==='bug' && target.object.state==='attached') {
      target.object.state='free';target.object.x=target.x;target.object.y=target.y;
    }
  }
  function getBodyHealthRecord() {
    const h=health.get(enemy);
    return h && h.kind===`body:${currentEnemyType}` ? h : null;
  }
  function isBodyFinalForm() {
    if(!state.enabled || state.defeatedBody) return false;
    const h=getBodyHealthRecord();
    return !!h && h.hp>0 && h.hp<=h.max/2;
  }
  function resetBodyAttackStateForReaction(type) {
    enemyPath=[];enemyPathTimer=0;enemyWanderTarget=null;enemyLurePoint=null;enemyLostSightTimer=0;enemyWasSeeingPlayer=false;
    if(type==='tracker') { trackerLeapTimer=0;trackerLeapStart=null;trackerLeapTarget=null;trackerLineAccel=0;trackerFrenzyTimer=0; }
    else if(type==='armed') { armedAxeSlamTimer=0;armedAxeLungeTimer=0;armedGrapple=null; }
    else if(type==='beast') { beastRushTimer=0;beastTargetPoint=null;beastSpiralMode=false;beastSpiralTimer=0; }
    else if(type==='bugmaster') { bugmasterSwarmMode='normal';bugmasterChargeTimer=0;bugmasterChargeTarget=null; }
    else if(type==='kaishutsubotsu') { kaishutsubotsuRushTimer=0;kaishutsubotsuRushTarget=null;kaishutsubotsuWarpFlurryTimer=0; }
    else if(type==='ugomekimono') {
      // Preserve any active grab or ground bind. A body hit must not silently cancel the hindrance.
    }
  }
  function warpBodyFarthest() {
    const p=(typeof getFarthestEnemyTeleportPoint==='function' ? getFarthestEnemyTeleportPoint() : findSafeEnemySpawn(0));
    enemy.x=p.x;enemy.y=p.y;enemyPath=[];enemyPathTimer=0;enemyWanderTarget=null;enemyLurePoint=null;enemyLostSightTimer=0;
  }
  function findArmedRetreatHookPoint() {
    const ec=getEntityCenter(enemy),pc=getEntityCenter(player);
    let best=null,bestScore=-Infinity;
    for(const o of obstacles) {
      if(!o?.blockEnemy || isSanctuaryBlocker(o) || o.type==='fakeKeyBox') continue;
      const p={x:o.x+o.width/2,y:o.y+o.height/2};
      const fromEnemy=distanceBetweenPoints(ec.x,ec.y,p.x,p.y);
      if(fromEnemy<360 || fromEnemy>2300) continue;
      if(segmentIntersectsAnySanctuary(ec.x,ec.y-18,p.x,p.y,36)) continue;
      const fromPlayer=distanceBetweenPoints(pc.x,pc.y,p.x,p.y);
      const score=fromPlayer-fromEnemy*0.12;
      if(score>bestScore) {bestScore=score;best=p;}
    }
    return best;
  }
  function startArmedRetreatGrapple() {
    const p=findArmedRetreatHookPoint();
    if(!p) return false;
    const ec=getEntityCenter(enemy);
    armedGrapple={fromX:ec.x,fromY:ec.y,x:p.x,y:p.y,timer:0.82,maxTimer:0.82};
    playOneShot(sounds.armedThrow);
    return true;
  }
  function findWatcherReactionWarpPoint() {
    const pc=getEntityCenter(player);
    if(typeof findSafeEnemyWarpNearPoint==='function') return findSafeEnemyWarpNearPoint(pc.x,pc.y,180,420,48);
    return findSafeEnemySpawn(0);
  }
  function playBodyDamageReactionSound(type) {
    let audio=null;
    if(type==='kaishutsubotsu') audio=sounds.kaishutsubotsu;
    else if(type==='watcher') audio=sounds.watcher;
    else if(type==='ugomekimono') audio=sounds.ugomekimonoCapture;
    if(!audio) return;
    setAudioVolume(audio,getMasterVolume()*getSeVolume());
    playOneShot(audio);
  }
  function startBodyDamageReaction(target) {
    const type=target.type || currentEnemyType;
    resetBodyAttackStateForReaction(type);
    if(type==='nightShadow') {
      nightShadowComboActive=false;nightShadowDiveComboRemaining=0;nightShadowLinePass=false;
      state.nightShadowDamageRetreat=true;
      returnNightShadowToSky();
      state.reaction=null;
      return;
    }
    if(type==='kaishutsubotsu' || type==='miezaru') warpBodyFarthest();
    if(type==='armed') startArmedRetreatGrapple();
    state.reaction={type,timer:type==='watcher'?2.8:type==='ugomekimono'?3.2:3.0,warpCooldown:0,fatal:false};
  }
  function moveBodyAwayFromPlayer(dt,speed,useMiezaruMove=false) {
    const pc=getEntityCenter(player),ec=getEntityCenter(enemy);
    let dx=ec.x-pc.x,dy=ec.y-pc.y,len=Math.hypot(dx,dy);
    if(len<1) {const a=Math.random()*Math.PI*2;dx=Math.cos(a);dy=Math.sin(a);len=1;}
    const ux=dx/len,uy=dy/len;
    enemyFacingX=ux;enemyFacingY=uy;enemyMode='retreat';
    if(useMiezaruMove) {
      const tx=clamp(ec.x+ux*1800,80,WORLD_WIDTH-80),ty=clamp(ec.y+uy*1800,80,WORLD_HEIGHT-80);
      moveMiezaruTowardPoint(tx,ty,dt,speed);
    } else moveEntitySmart(enemy,ux,uy,speed*60*dt);
  }
  function pushPlayerAwayByUgome(dt) {
    enemyMode='counter_push';
    if(isPlayerInAnySanctuary()) return;
    const ec=getEntityCenter(enemy),pc=getEntityCenter(player);
    let dx=pc.x-ec.x,dy=pc.y-ec.y,len=Math.hypot(dx,dy);
    if(len<1) {dx=1;dy=0;len=1;}
    moveEntitySmart(player,dx/len,dy/len,520*dt);
  }
  function completeBodyDefeat(skipEnemySound=false) {
    state.defeatedBody=true;state.reaction=null;cancelAim();state.shots=[];state.grenades=[];state.mines=[];
    ugomeGrab=null;ugomeGroundBind=null;bugAttachStacks=0;updateUgomeEscapeGauge(false,0);
    startClearEvent(skipEnemySound);clearEventPhase=3;clearEventTimer=0;
    stopAudio(sounds.heartbeat);heartbeatTimer=999;
    showMessage('怪異を封じた。');
  }
  function startFatalWatcherReaction() {
    resetBodyAttackStateForReaction('watcher');
    state.reaction={type:'watcher',timer:2.8,warpCooldown:0,fatal:true};
    enemyMode='watcher_flurry';enemy.visible=true;enemy.alpha=1;
  }
  function updateDamageReaction(dt) {
    const r=state.reaction;
    if(!state.enabled || !r || state.defeatedBody || currentEnemyType!==r.type) return false;
    r.timer-=dt;
    if(r.type==='tracker') moveBodyAwayFromPlayer(dt,20.0);
    else if(r.type==='beast') moveBodyAwayFromPlayer(dt,17.5);
    else if(r.type==='bugmaster') moveBodyAwayFromPlayer(dt,15.5);
    else if(r.type==='armed') {
      if(!armedGrapple) startArmedRetreatGrapple();
      if(armedGrapple) updateArmedGrapple(dt); else moveBodyAwayFromPlayer(dt,12.5);
      enemyMode='retreat_hook';
    } else if(r.type==='kaishutsubotsu') moveBodyAwayFromPlayer(dt,11.5);
    else if(r.type==='miezaru') {moveBodyAwayFromPlayer(dt,10.5,true);enemy.visible=true;enemy.alpha=1;}
    else if(r.type==='watcher') {
      // Match the all-offerings pre-disappearance flurry: rapid teleports around the player.
      // The Watcher never translates between points; visual shake is handled by the sprite transform only.
      enemyMode='watcher_flurry';enemy.visible=true;enemy.alpha=1;r.warpCooldown-=dt;
      if(r.warpCooldown<=0) {
        const p=findWatcherReactionWarpPoint();if(p){enemy.x=p.x;enemy.y=p.y;}
        r.warpCooldown=1/12;
      }
    } else if(r.type==='ugomekimono') pushPlayerAwayByUgome(dt);
    if(r.timer<=0) {
      if(r.type==='watcher') {
        if(r.fatal) { completeBodyDefeat(true); return true; }
        warpBodyFarthest();
      }
      state.reaction=null;enemyPath=[];enemyPathTimer=0;enemyWanderTarget=null;
    }
    return true;
  }
  function damage(target,amount,source='bullet') {
    if(target.object.counterDead) return;
    const h=record(target);h.hp=Math.max(0,h.hp-amount);h.seen=true;state.hasSeenHealth=true;state.hudSignature="";
    playSfx('hit',target.x,target.y);
    if(target.body) playBodyDamageReactionSound(target.type || currentEnemyType);
    if(h.hp===0) defeat(target);
    else if(target.body) startBodyDamageReaction(target);
    else stagger(target,source==='explosion'?3:0.5);
  }
  function releaseAttached(target) {
    if(target.kind==='bug' && target.object.state==='attached') {
      bugAttachStacks=Math.max(0,bugAttachStacks-1);bugEscapeProgress=0;
    }
    if(target.kind==='tentacle' && ugomeGrab?.tentacleIndex===target.object.index) releaseUgomeGrab(false);
    if(target.kind==='groundTentacle' && ugomeGroundBind?.sourceId===target.object.id) {
      ugomeGroundBind=null;updateUgomeEscapeGauge(false,0);
    }
  }
  function spriteSnapshot(t) {
    if(t.type) {
      const d=ENEMY_TYPES[t.type],img=images[d.sheetKey],frame=Math.floor(t.object.frame||0)%(d.frameCount||1);
      return {image:img,sx:frame%(d.cols||1)*d.spriteFrameWidth,sy:Math.floor(frame/(d.cols||1))*d.spriteFrameHeight,sw:d.spriteFrameWidth,sh:d.spriteFrameHeight};
    }
    const img=images[t.sheet],columns=['bug','giantEye','tentacle','groundTentacle','tentacleWall'].includes(t.kind)?4:1;
    const sw=img?.naturalWidth/columns,sh=img?.naturalHeight;
    return {image:img,sx:(Math.floor(t.object.frame||0)%columns)*sw,sy:0,sw,sh};
  }
  function defeat(t) {
    t.object.counterDead=true;releaseAttached(t);
    if(t.body) {
      if((t.type || currentEnemyType)==='watcher') {
        // Even at 0 HP, finish the rapid warp flurry before the normal disappearance fade.
        startFatalWatcherReaction();
        cancelAim();state.shots=[];state.grenades=[];state.mines=[];
        return;
      }
      completeBodyDefeat(false); return;
    }
    state.fades.push({rect:{...t.rect},sprite:spriteSnapshot(t),line:t.line?{...t.line}:null,life:2.2});
    if(['bug','tentacle','groundTentacle','tentacleWall'].includes(t.kind)) state.revivals.push({target:t,at:state.clock+30});
    if(t.kind==='bug') { t.object.state='dead';t.object.respawnTimer=0; }
    else if(t.kind==='tentacle') { t.object.state='dead';stopAudio(sounds[t.object.audioKey]); }
    else if(t.kind==='miezaruClone') { miezaruClones=miezaruClones.filter(v=>v!==t.object);miezaruCloneTimer=Math.max(8,miezaruCloneTimer); }
    else if(t.kind==='fakeBox') {
      watcherFakeKeyBoxes=watcherFakeKeyBoxes.filter(v=>v!==t.object);
      obstacles=obstacles.filter(o=>!(o.type==='fakeKeyBox'&&o.x===t.object.x&&o.y===t.object.y));
    } else if(t.kind==='phantom') watcherPhantoms=watcherPhantoms.filter(v=>v!==t.object);
    else if(t.kind==='objectPhantom') watcherObjectPhantoms=watcherObjectPhantoms.filter(v=>v!==t.object);
    // Ground tentacles/walls remain as inactive slots until revival, so a new spawn
    // cannot instantly replace the defeated part. Their normal lifetimes pause.
  }
  function reviveDue() {
    for(let i=state.revivals.length-1;i>=0;i--) {
      const entry=state.revivals[i];if(entry.at>state.clock) continue;
      state.revivals.splice(i,1);
      const t=entry.target,o=t.object;health.delete(o);o.counterDead=false;o.counterStunUntil=0;
      if(t.kind==='bug') {
        o.state='free';o.respawnTimer=0;const p=BUG_SWARM_PATROL_ROUTES[o.routeIndex][0];
        o.x=p.x;o.y=p.y;advanceBugSwarmRoute(o);
      } else if(t.kind==='tentacle') {
        const root=getUgomeTentacleRoot(o.index);o.x=root.x;o.y=root.y;
        o.state='idle';o.cooldown=2;o.timer=0;
      } else { o.timer=randomRange(12,18); }
    }
  }
  function distanceToTarget(x,y,t) {
    if(!t.line) return rectDistance(x,y,t.rect);
    const l=t.line,dx=l.x2-l.x1,dy=l.y2-l.y1,n=dx*dx+dy*dy;
    const f=n?clamp(((x-l.x1)*dx+(y-l.y1)*dy)/n,0,1):0;
    return Math.max(0,Math.hypot(x-l.x1-dx*f,y-l.y1-dy*f)-l.radius);
  }
  function explode(x,y,kind,targetList=null) {
    const stun=kind==='stun_grenade',radius=stun?420:kind==='rocket'?360:kind==='mine'?240:300;
    playSfx(stun?'stun':'explosion',x,y);
    ensureArtworkImage('seal_explosion');
    state.effects.push({x,y,radius,life:0.65,max:0.65,kind:stun?'stun':'explosion'});
    const list=targetList || targets();
    for(const t of list) {
      if(t.object.counterDead || distanceToTarget(x,y,t)>radius) continue;
      if(stun) {
        stagger(t,10);
      } else damage(t,kind==='rocket'?10:5,'explosion');
    }
    lureEnemyToCounterNoise(x,y,'explosion');
  }
  function update(dt) {
    if(!state.enabled) return;
    state.clock+=dt;state.cooldown=Math.max(0,state.cooldown-dt);
    if(state.nightShadowDamageRetreat && currentEnemyType==='nightShadow' && nightShadowState==='air') state.nightShadowDamageRetreat=false;
    reviveDue();
    if(state.reload>0) {
      state.reload=Math.max(0,state.reload-dt);
      if(state.reload===0) {state.ammo=6;playSfx('ready');showMessage('リロード完了：６発');state.hudSignature="";}
    }
    // Build the target list only when combat logic or visible life bars actually need it.
    // rev195 rebuilt this list every frame and then rebuilt it again while drawing the bars.
    const combatNeedsTargets=state.shots.length>0 || state.mines.length>0;
    let list=[];
    if(combatNeedsTargets) {
      list=targets();state.targetCache=list;state.targetCacheTimer=0.05;
    } else if(state.hasSeenHealth) {
      state.targetCacheTimer-=dt;
      if(state.targetCacheTimer<=0 || !state.targetCache.length) {
        state.targetCache=targets();state.targetCacheTimer=0.05;
      }
      list=state.targetCache;
    } else {
      state.targetCache=[];state.targetCacheTimer=0;
    }
    for(let i=state.shots.length-1;i>=0;i--) {
      const p=state.shots[i]; if(!p) continue;
      const nx=p.x+p.vx*dt,ny=p.y+p.vy*dt,hit=collide(p.x,p.y,nx,ny,list,p.rocket?8:2);
      p.life-=dt;
      if(hit) {
        p.x+=(nx-p.x)*hit.t;p.y+=(ny-p.y)*hit.t;
        state.shots.splice(i,1);
        if(p.rocket) explode(p.x,p.y,'rocket',list);
        else {
          if(hit.target) damage(hit.target,1);else playSfx('hit',p.x,p.y);
          state.effects.push({x:p.x,y:p.y,radius:24,life:0.16,max:0.16,kind:'hit'});
        }
      } else if(nx<0||ny<0||nx>WORLD_WIDTH||ny>WORLD_HEIGHT||p.life<=0) state.shots.splice(i,1);
      else {p.x=nx;p.y=ny;}
      if(state.defeatedBody) break;
    }
    for(let i=state.grenades.length-1;i>=0;i--) {
      const p=state.grenades[i];if(!p)continue;
      p.fuse-=dt;
      if(p.flight>0) {
        const step=Math.min(dt,p.flight),nx=clamp(p.x+p.vx*step,0,WORLD_WIDTH),ny=clamp(p.y+p.vy*step,0,WORLD_HEIGHT);
        const hit=collide(p.x,p.y,nx,ny,[],7);
        if(hit) {p.x+=(nx-p.x)*Math.max(0,hit.t-0.01);p.y+=(ny-p.y)*Math.max(0,hit.t-0.01);p.flight=0;}
        else {p.x=nx;p.y=ny;p.flight-=step;}
      }
      if(p.fuse<=0) {state.grenades.splice(i,1);explode(p.x,p.y,p.kind,list.length?list:null);}
      if(state.defeatedBody) break;
    }
    for(let i=state.mines.length-1;i>=0;i--) {
      const m=state.mines[i];if(!m || m.armedAt>state.clock) continue;
      const triggered=list.some(t=>{
        if(t.object.counterDead) return false;
        if(distanceToTarget(m.x,m.y,t)<28) return true;
        const prev=previousCenters.get(t.object);
        return prev && Math.hypot(t.x-prev.x,t.y-prev.y)<1000 && segmentCircle(prev.x,prev.y,t.x,t.y,m,28+Math.min(t.rect.width,t.rect.height)/2)!==null;
      });
      if(triggered) {state.mines.splice(i,1);explode(m.x,m.y,'mine',list);}
      if(state.defeatedBody) break;
    }
    if(state.mines.length>0) {
      for(const t of list) previousCenters.set(t.object,{x:t.x,y:t.y});
    }
    state.effects=state.effects.filter(e=>(e.life-=dt)>0);
    state.fades=state.fades.filter(e=>(e.life-=dt)>0);
    updateHud();
  }

  function visibleTarget(t) {
    if(!isVisible(t.rect)) return false;
    if(t.body) {
      if(!enemy.visible || enemy.alpha<=0.01) return false;
      if(currentEnemyType==='miezaru' && !isMiezaruVisibleToPlayer()) return false;
      if(currentEnemyType==='nightShadow' && ['air','warning'].includes(nightShadowState)) return false;
    }
    return true;
  }
  const barGradients=new Map();
  function getBarGradient(width) {
    let gradient=barGradients.get(width);
    if(gradient) return gradient;
    gradient=barContext.createLinearGradient(0,0,width,0);
    gradient.addColorStop(0,'#451355');gradient.addColorStop(0.6,'#931bc2');gradient.addColorStop(1,'#d67af8');
    barGradients.set(width,gradient);
    return gradient;
  }
  function drawBars() {
    barContext.clearRect(0,0,barCanvas.width,barCanvas.height);
    if(!state.enabled || gameState!=='playing' || !state.hasSeenHealth) return;
    const list=state.targetCache.length ? state.targetCache : targets();
    barContext.save();barContext.translate(-cameraX,-cameraY);
    for(const t of list) {
      if(t.object.counterDead) continue;
      const h=record(t);if(!h.seen || !visibleTarget(t)) continue;
      const width=t.body?110:70,x=t.x-width/2,y=t.body?enemy.y+enemy.height-getEnemyDef().renderHeight-20:(t.barY??t.rect.y-20);
      barContext.save();barContext.translate(x,y);
      barContext.fillStyle='#14071e';barContext.fillRect(-2,-2,width+4,13);
      barContext.fillStyle=getBarGradient(width);barContext.fillRect(0,0,width*h.hp/h.max,9);
      barContext.strokeStyle='#ba81d4';barContext.strokeRect(-1,-1,width+2,11);
      barContext.restore();
    }
    barContext.restore();
  }
  function draw() {
    if(!barContext) return;
    drawBars();
    if(!state.enabled || !['playing','clearEvent'].includes(gameState)) return;
    wctx.save();wctx.translate(-cameraX,-cameraY);
    if(state.reaction?.type==='ugomekimono' && images.ugomekimonoTentacleSheet?.complete) {
      const ec=getEntityCenter(enemy),pc=getEntityCenter(player),dx=pc.x-ec.x,dy=pc.y-ec.y,len=Math.max(80,Math.hypot(dx,dy));
      wctx.save();wctx.globalAlpha=0.94;wctx.translate(ec.x,ec.y);wctx.rotate(Math.atan2(dy,dx));
      const frame=Math.floor(performance.now()/90)%4;
      wctx.drawImage(images.ugomekimonoTentacleSheet,frame*627,0,627,627,0,-64,len,128);
      wctx.restore();
    }
    for(const p of state.shots) {
      wctx.save();wctx.translate(p.x,p.y);wctx.rotate(Math.atan2(p.vy,p.vx));
      drawArt(p.rocket?'seal_rocket':'seal_bullet',0,0,p.rocket?84:68,p.rocket?24:10,1,0.5);
      wctx.restore();
    }
    for(const p of state.grenades) {
      drawArt(p.kind+'_field',p.x,p.y-(p.flight>0?Math.sin(p.flight/0.9*Math.PI)*40:0),36,40);
    }
    for(const m of state.mines) drawArt('seal_mine_field',m.x,m.y,56,56);
    for(const e of state.effects) {
      wctx.save();const progress=clamp(1-e.life/e.max,0,1);
      wctx.globalAlpha=(1-progress)*(e.kind==='stun'?0.8:1);
      const size=e.radius*2*(0.35+0.65*progress);
      drawArt(e.kind==='hit'?'seal_hit':'seal_explosion',e.x,e.y,size,size);
      if(e.kind==='stun') {
        wctx.strokeStyle='#bfddff';wctx.lineWidth=6;wctx.beginPath();wctx.arc(e.x,e.y,size/2,0,Math.PI*2);wctx.stroke();
      }
      wctx.restore();
    }
    for(const f of state.fades) {
      const s=f.sprite,r=f.rect;wctx.save();wctx.globalAlpha=clamp(f.life/2.2,0,1);
      if(s.image?.complete && s.sw>0 && s.sh>0) {
        if(f.line) {const l=f.line;wctx.translate(l.x1,l.y1);wctx.rotate(Math.atan2(l.y2-l.y1,l.x2-l.x1));wctx.drawImage(s.image,s.sx,s.sy,s.sw,s.sh,0,-l.radius,Math.max(80,Math.hypot(l.x2-l.x1,l.y2-l.y1)),l.radius*2);}
        else wctx.drawImage(s.image,s.sx,s.sy,s.sw,s.sh,r.x,r.y,r.width,r.height);
      }
      wctx.restore();
    }
    if(isWeaponReady()) {
      const pc=getEntityCenter(player),angle=Math.atan2(aimState.dirY,aimState.dirX),launcher=aimState.itemId==='seal_launcher';
      wctx.save();wctx.translate(pc.x,pc.y);wctx.rotate(angle);
      drawArt(aimState.itemId+'_field',14,launcher?8:14,launcher?104:64,launcher?36:50,0,0.5);
      wctx.restore();
    }
    wctx.restore();
  }
  function playSfx(name,x=null,y=null) {
    const pool=getAudioPool(name);
    const audio=pool.find(a=>a.paused)||pool[0];
    const pc=getEntityCenter(player),distance=x===null?0:Math.hypot(x-pc.x,y-pc.y);
    audio.counterGain=(name==='explosion'?0.8:0.64)*Math.pow(clamp(1-distance/2600,0,1),2);
    setAudioVolume(audio,getMasterVolume()*getSeVolume()*audio.counterGain);playOneShot(audio);
  }
  function getAudioPool(name) {
    return audioPool[name] || (audioPool[name]=Array.from({length:name==='hit'?4:2},(_,i)=>{
      const a=createAudio(`assets/audio/${AUDIO_FILES[name]}`,false); sounds[`counter_${name}_${i}`]=a;return a;
    }));
  }
  function updateClearVisuals(dt) {
    if(!state.enabled) return;
    state.effects=state.effects.filter(e=>(e.life-=dt)>0);
    state.fades=state.fades.filter(e=>(e.life-=dt)>0);
  }
  function applyAudioVolumes() {
    for(const pool of Object.values(audioPool)) for(const a of pool) setAudioVolume(a,getMasterVolume()*getSeVolume()*(a.counterGain||0));
  }
  window.counterattack={get enabled(){return state.enabled;},get defeatedBody(){return state.defeatedBody;},
    refreshTitle,setMode,reset,handleUse,update,draw,updateHud,isWeaponReady,isStunned,pickBoxItem,acceptsItem,applyAudioVolumes,updateClearVisuals,
    isBodyFinalForm,updateDamageReaction,isTouchGunSelected,touchGunTap,touchGunSwipeCancel,isTouchThrowableSelected,touchThrowableRelease};
  // Counterattack audio pools are created lazily on first use instead of allocating every sound at page load.
  installUi();
})();
