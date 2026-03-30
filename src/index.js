const HTML_PAGE = `<!DOCTYPE html>
<html lang="zh-TW" data-theme="dark">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Grok Video Studio</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300..700&display=swap" rel="stylesheet">
<style>
:root{
  --font:'Inter','Helvetica Neue',sans-serif;
  --tx:clamp(0.75rem,.7rem+.25vw,.875rem);
  --ts:clamp(.875rem,.8rem+.35vw,1rem);
  --tb:clamp(1rem,.95rem+.25vw,1.125rem);
  --tl:clamp(1.125rem,1rem+.75vw,1.5rem);
  --s1:.25rem;--s2:.5rem;--s3:.75rem;--s4:1rem;--s5:1.25rem;--s6:1.5rem;
  --s8:2rem;--s10:2.5rem;--s12:3rem;
  --rm:.375rem;--rmd:.5rem;--rl:.75rem;--rxl:1rem;--rf:9999px;
  --ease:180ms cubic-bezier(.16,1,.3,1);
}
[data-theme="dark"]{
  --bg:#0a0a0c;--sf:#111114;--sf2:#18181c;--sf3:#202026;
  --bd:rgba(255,255,255,.07);--bdf:rgba(255,255,255,.18);
  --tx:#dddde6;--txm:#7b7b8c;--txf:#3e3e50;
  --pr:#6c63ff;--prh:#5a52e6;--pra:#4840cc;
  --prb:rgba(108,99,255,.14);--prr:rgba(108,99,255,.25);
  --ok:#34d58e;--okb:rgba(52,213,142,.14);--okr:rgba(52,213,142,.28);
  --er:#f05555;--erb:rgba(240,85,85,.14);
  --wn:#f5a623;--wnb:rgba(245,166,35,.14);
  --g1:rgba(255,255,255,.04);--g2:rgba(255,255,255,.08);
  --sh:0 0 0 1px rgba(255,255,255,.05),0 4px 16px rgba(0,0,0,.5);
  --shl:0 0 0 1px rgba(108,99,255,.2),0 8px 32px rgba(108,99,255,.25);
}
[data-theme="light"]{
  --bg:#f3f3f8;--sf:#ffffff;--sf2:#f0f0f6;--sf3:#e8e8f0;
  --bd:rgba(0,0,0,.08);--bdf:rgba(0,0,0,.2);
  --tx:#18182a;--txm:#6a6a80;--txf:#b0b0c0;
  --pr:#5750f5;--prh:#4640e0;--pra:#3530c0;
  --prb:rgba(87,80,245,.1);--prr:rgba(87,80,245,.22);
  --ok:#0ea868;--okb:rgba(14,168,104,.1);--okr:rgba(14,168,104,.25);
  --er:#d43535;--erb:rgba(212,53,53,.1);
  --wn:#d4860a;--wnb:rgba(212,134,10,.1);
  --g1:rgba(0,0,0,.03);--g2:rgba(0,0,0,.06);
  --sh:0 0 0 1px rgba(0,0,0,.07),0 2px 8px rgba(0,0,0,.07);
  --shl:0 0 0 1px rgba(87,80,245,.18),0 8px 32px rgba(87,80,245,.18);
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;scroll-behavior:smooth;}
body{
  font-family:var(--font);font-size:var(--ts);color:var(--tx);
  background:var(--bg);min-height:100dvh;
  display:grid;
  grid-template-columns:52px 1fr 380px;
  grid-template-rows:100dvh;
  overflow:hidden;
}
@media(max-width:960px){
  body{grid-template-columns:1fr;grid-template-rows:auto;overflow:auto;height:auto;}
}

/* ── NAV RAIL ── */
.rail{
  background:var(--sf);border-right:1px solid var(--bd);
  display:flex;flex-direction:column;align-items:center;
  padding:var(--s4) 0;gap:var(--s2);
}
@media(max-width:960px){.rail{flex-direction:row;border-right:none;border-bottom:1px solid var(--bd);padding:0 var(--s4);justify-content:space-between;}}
.rail-logo{
  display:flex;align-items:center;justify-content:center;
  width:36px;height:36px;border-radius:var(--rl);
  background:var(--pr);color:#fff;margin-bottom:var(--s4);
  flex-shrink:0;
}
@media(max-width:960px){.rail-logo{margin-bottom:0;}}
.rail-spacer{flex:1;}
@media(max-width:960px){.rail-spacer{display:none;}}
.rail-btn{
  display:flex;align-items:center;justify-content:center;
  width:36px;height:36px;border-radius:var(--rmd);cursor:pointer;
  background:none;border:none;color:var(--txm);
  transition:background var(--ease),color var(--ease);
}
.rail-btn:hover{background:var(--g2);color:var(--tx);}
.rail-btn:active{background:var(--sf3);}

/* ── MAIN SCROLL ── */
.main{overflow-y:auto;display:flex;flex-direction:column;}
@media(max-width:960px){.main{overflow:visible;}}

/* ── TOPBAR ── */
.topbar{
  position:sticky;top:0;z-index:10;
  background:var(--sf);border-bottom:1px solid var(--bd);
  padding:0 var(--s6);height:52px;
  display:flex;align-items:center;justify-content:space-between;
  flex-shrink:0;
  backdrop-filter:blur(8px);
  -webkit-backdrop-filter:blur(8px);
}
.topbar-title{font-size:var(--ts);font-weight:600;letter-spacing:-.02em;}
.topbar-right{display:flex;align-items:center;gap:var(--s2);}
.dot-status{display:flex;align-items:center;gap:var(--s2);font-size:var(--tx);color:var(--txm);}
.dot{width:6px;height:6px;border-radius:50%;background:var(--ok);}

/* ── CONTENT ── */
.content{padding:var(--s8) var(--s6);display:flex;flex-direction:column;gap:var(--s6);flex:1;}
@media(max-width:960px){.content{padding:var(--s4);}}

/* ── CARDS ── */
.card{
  background:var(--sf);border:1px solid var(--bd);
  border-radius:var(--rxl);padding:var(--s6);
  box-shadow:var(--sh);
}
.card-title{font-size:var(--tx);font-weight:600;text-transform:uppercase;letter-spacing:.07em;color:var(--txm);margin-bottom:var(--s5);}

/* ── FIELDS ── */
.field{display:flex;flex-direction:column;gap:var(--s2);}
.field+.field{margin-top:var(--s5);}
label{font-size:var(--tx);font-weight:500;color:var(--txm);letter-spacing:.04em;}
input,select,textarea{
  width:100%;padding:var(--s3) var(--s4);
  background:var(--sf2);border:1px solid var(--bd);
  border-radius:var(--rl);color:var(--tx);
  font-family:var(--font);font-size:var(--ts);
  outline:none;
  transition:border-color var(--ease),box-shadow var(--ease),background var(--ease);
  -webkit-appearance:none;appearance:none;
}
input:focus,select:focus,textarea:focus{
  border-color:var(--pr);box-shadow:0 0 0 3px var(--prb);background:var(--sf);
}
textarea{resize:vertical;min-height:100px;line-height:1.6;}
.key-wrap{position:relative;}
.key-wrap input{padding-right:68px;}
.show-btn{
  position:absolute;right:var(--s2);top:50%;transform:translateY(-50%);
  padding:2px var(--s3);height:26px;
  background:var(--sf3);color:var(--txm);
  border:1px solid var(--bd);border-radius:var(--rm);
  font-size:var(--tx);font-weight:500;cursor:pointer;
  transition:background var(--ease),color var(--ease);
}
.show-btn:hover{color:var(--tx);background:var(--sf2);}

/* ── GRID ── */
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:var(--s4);}
@media(max-width:600px){.g3{grid-template-columns:1fr;}}

/* ── CHIPS ── */
.chips{display:flex;flex-wrap:wrap;gap:var(--s2);margin-top:var(--s3);}
.chip{
  padding:4px 12px;border-radius:var(--rf);
  background:var(--sf2);border:1px solid var(--bd);
  font-size:var(--tx);color:var(--txm);cursor:pointer;
  transition:all var(--ease);
}
.chip:hover{border-color:var(--pr);color:var(--pr);background:var(--prb);}
.chip:active{transform:scale(.96);}

/* ── GENERATE BTN ── */
.gen-btn{
  width:100%;height:50px;margin-top:var(--s6);
  background:var(--pr);color:#fff;
  border:none;border-radius:var(--rl);
  font-family:var(--font);font-size:var(--ts);font-weight:700;letter-spacing:.02em;
  cursor:pointer;display:flex;align-items:center;justify-content:center;gap:var(--s2);
  transition:background var(--ease),transform var(--ease),box-shadow var(--ease);
  box-shadow:0 2px 8px var(--prr);
}
.gen-btn:hover:not(:disabled){background:var(--prh);transform:translateY(-1px);box-shadow:0 6px 24px var(--prr);}
.gen-btn:active:not(:disabled){background:var(--pra);transform:translateY(0);}
.gen-btn:disabled{opacity:.4;cursor:not-allowed;box-shadow:none;transform:none;}

/* ── PANEL ── */
.panel{
  background:var(--sf);border-left:1px solid var(--bd);
  display:flex;flex-direction:column;overflow:hidden;
}
@media(max-width:960px){.panel{border-left:none;border-top:1px solid var(--bd);min-height:360px;}}
.panel-head{
  padding:0 var(--s5);height:52px;
  display:flex;align-items:center;justify-content:space-between;
  border-bottom:1px solid var(--bd);flex-shrink:0;
}
.panel-head-title{font-size:var(--ts);font-weight:600;}
.panel-body{flex:1;overflow-y:auto;padding:var(--s5);}

/* ── BADGE ── */
.badge{
  display:inline-flex;align-items:center;gap:4px;
  font-size:var(--tx);font-weight:600;padding:2px 10px;border-radius:var(--rf);
}
.badge-info{background:var(--prb);color:var(--pr);}
.badge-ok{background:var(--okb);color:var(--ok);}
.badge-err{background:var(--erb);color:var(--er);}
.badge-warn{background:var(--wnb);color:var(--wn);}

/* ── STATUS BLOCK ── */
.status-block{background:var(--sf2);border:1px solid var(--bd);border-radius:var(--rl);padding:var(--s4);display:none;}
.status-block.on{display:block;}
.status-row{display:flex;align-items:center;gap:var(--s2);}
.status-msg{font-size:var(--tx);color:var(--txm);margin-top:var(--s2);line-height:1.7;white-space:pre-wrap;word-break:break-all;}

/* ── VIDEO ── */
.video-wrap{margin-top:var(--s5);display:none;}
.video-wrap.on{display:block;}
video{width:100%;border-radius:var(--rl);background:#000;max-height:260px;}
.dl-btn{
  display:flex;align-items:center;justify-content:center;gap:var(--s2);
  width:100%;height:40px;margin-top:var(--s3);
  background:var(--okb);color:var(--ok);
  border:1px solid var(--okr);border-radius:var(--rmd);
  font-size:var(--tx);font-weight:600;text-decoration:none;
  transition:background var(--ease),transform var(--ease),box-shadow var(--ease);
}
.dl-btn:hover{background:var(--ok);color:#fff;transform:translateY(-1px);box-shadow:0 4px 14px var(--okr);}
.dl-btn:active{transform:translateY(0);}

/* ── TIMELINE ── */
.timeline{display:flex;flex-direction:column;gap:var(--s3);margin-top:var(--s4);}
.tline{
  display:flex;align-items:flex-start;gap:var(--s3);
  background:var(--sf2);border:1px solid var(--bd);
  border-radius:var(--rmd);padding:var(--s3) var(--s4);
}
.tdot{
  width:8px;height:8px;border-radius:50%;flex-shrink:0;
  background:var(--txf);margin-top:4px;
}
.tdot.active{background:var(--pr);}
.tdot.done{background:var(--ok);}
.tdot.err{background:var(--er);}
.tinfo-label{font-size:var(--tx);font-weight:500;}
.tinfo-sub{font-size:var(--tx);color:var(--txm);margin-top:1px;}

/* ── EMPTY ── */
.empty{
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  min-height:220px;text-align:center;padding:var(--s10);
  gap:var(--s3);color:var(--txf);
}
.empty svg{opacity:.25;}
.empty p{font-size:var(--tx);}

/* ── RAW ── */
.raw{
  margin-top:var(--s4);background:var(--sf3);border:1px solid var(--bd);
  border-radius:var(--rmd);padding:var(--s3);
  font-size:var(--tx);color:var(--txm);white-space:pre-wrap;
  word-break:break-all;max-height:150px;overflow-y:auto;display:none;
}
.raw.on{display:block;}

/* ── SPINNER ── */
.spin{
  display:inline-block;width:12px;height:12px;
  border:2px solid currentColor;border-top-color:transparent;
  border-radius:50%;animation:sp .7s linear infinite;
}
@keyframes sp{to{transform:rotate(360deg);}}

/* ── MISC ── */
::selection{background:var(--prb);color:var(--tx);}
:focus-visible{outline:2px solid var(--pr);outline-offset:2px;border-radius:var(--rm);}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important;}}
a,button,[role=button],input,textarea,select{
  transition:color var(--ease),background var(--ease),border-color var(--ease),box-shadow var(--ease),transform var(--ease);
}
</style>
</head>
<body>

<!-- RAIL -->
<nav class="rail">
  <div class="rail-logo" aria-label="Grok Video Studio">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
      <rect x="2" y="4" width="14" height="16" rx="2"/>
      <path d="M16 9l5 3-5 3V9z" fill="currentColor" stroke="none"/>
    </svg>
  </div>
  <div class="rail-spacer"></div>
  <button class="rail-btn" id="themeBtn" aria-label="切換深淺色">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
  </button>
</nav>

<!-- MAIN -->
<div class="main">
  <header class="topbar">
    <span class="topbar-title">Video Studio</span>
    <div class="topbar-right">
      <div class="dot-status">
        <span class="dot"></span>
        <span>ai.ezif.in</span>
      </div>
    </div>
  </header>

  <div class="content">
    <!-- API / Model -->
    <div class="card">
      <div class="card-title">連線設定</div>
      <div class="field">
        <label for="apiKey">API Key</label>
        <div class="key-wrap">
          <input type="password" id="apiKey" placeholder="輸入你的 API Key" autocomplete="off"/>
          <button type="button" class="show-btn" id="toggleKeyBtn">顯示</button>
        </div>
      </div>
      <div class="field" style="margin-top:var(--s5)">
        <label for="model">模型</label>
        <select id="model">
          <option value="grok-video-normal">grok-video-normal — 標準</option>
          <option value="grok-imagine-video">grok-imagine-video — 高品質</option>
        </select>
      </div>
    </div>

    <!-- Prompt / Params -->
    <div class="card">
      <div class="card-title">生成設定</div>
      <div class="field">
        <label for="prompt">提示詞</label>
        <textarea id="prompt" placeholder="描述你想生成的影片，例如：A slow-motion wave crashing on a rocky shore at golden hour"></textarea>
        <div class="chips">
          <button type="button" class="chip" data-p="A cat walking across a sunny garden in slow motion">貓咪花園</button>
          <button type="button" class="chip" data-p="Aerial view of a neon city at night, flying between skyscrapers">霓虹城市</button>
          <button type="button" class="chip" data-p="Cherry blossoms falling in soft wind, cinematic depth of field">櫻花飄落</button>
          <button type="button" class="chip" data-p="A samurai standing in the rain, fog, dramatic lighting">武士雨中</button>
        </div>
      </div>
      <div class="g3" style="margin-top:var(--s5)">
        <div class="field"><label for="duration">時長</label>
          <select id="duration"><option value="5">5 秒</option><option value="10">10 秒</option></select>
        </div>
        <div class="field"><label for="aspect_ratio">比例</label>
          <select id="aspect_ratio"><option value="16:9">16:9</option><option value="9:16">9:16</option><option value="1:1">1:1</option></select>
        </div>
        <div class="field"><label for="resolution">解析度</label>
          <select id="resolution"><option value="720p">720p</option><option value="1080p">1080p</option></select>
        </div>
      </div>
      <button type="button" id="genBtn" class="gen-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        生成影片
      </button>
    </div>
  </div><!-- /content -->
</div><!-- /main -->

<!-- PANEL -->
<aside class="panel">
  <div class="panel-head">
    <span class="panel-head-title">輸出</span>
    <span id="panelBadge"></span>
  </div>
  <div class="panel-body">
    <div class="empty" id="emptyState">
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
        <rect x="2" y="4" width="14" height="16" rx="2"/><path d="M16 9l5 3-5 3V9z"/>
      </svg>
      <p>尚未生成影片<br>填寫設定後點擊生成</p>
    </div>
    <div class="status-block" id="statusBlock">
      <div class="status-row"><span class="badge badge-info" id="statusBadge">處理中</span></div>
      <div class="status-msg" id="statusMsg"></div>
    </div>
    <div class="video-wrap" id="videoWrap">
      <video id="videoEl" controls playsinline></video>
      <a id="dlLink" class="dl-btn" download="grok-video.mp4" href="#">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        下載影片
      </a>
    </div>
    <div class="timeline" id="timeline"></div>
    <div class="raw" id="rawBlock"></div>
  </div>
</aside>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // theme
  var root = document.documentElement;
  var theme = root.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
  root.setAttribute('data-theme', theme);
  var themeBtn = document.getElementById('themeBtn');
  function updateThemeIcon() {
    themeBtn.innerHTML = theme === 'dark'
      ? '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
  updateThemeIcon();
  themeBtn.addEventListener('click', function(){
    theme = theme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', theme);
    updateThemeIcon();
  });

  // key toggle
  var keyInp = document.getElementById('apiKey');
  var showBtn = document.getElementById('toggleKeyBtn');
  showBtn.addEventListener('click', function(){
    if (keyInp.type === 'password') { keyInp.type = 'text'; showBtn.textContent = '隱藏'; }
    else { keyInp.type = 'password'; showBtn.textContent = '顯示'; }
  });

  // chips
  document.querySelectorAll('.chip').forEach(function(c){
    c.addEventListener('click', function(){ document.getElementById('prompt').value = c.getAttribute('data-p'); });
  });

  // helpers
  function $(id){ return document.getElementById(id); }
  function setStatus(msg, type, loading) {
    $('emptyState').style.display = 'none';
    var sb = $('statusBlock'); sb.className = 'status-block on';
    var badge = $('statusBadge');
    var cls = {info:'badge-info',ok:'badge-ok',error:'badge-err',warning:'badge-warn'}[type] || 'badge-info';
    var label = {info:'處理中',ok:'完成',error:'錯誤',warning:'等待中'}[type] || '處理中';
    badge.className = 'badge ' + cls;
    badge.innerHTML = (loading ? '<span class="spin"></span>' : '') + label;
    $('statusMsg').textContent = msg;
    var pb = $('panelBadge'); pb.className = 'badge ' + cls; pb.textContent = label;
  }
  function showRaw(obj){
    var el = $('rawBlock');
    try { el.textContent = JSON.stringify(obj, null, 2); } catch(e){ el.textContent = String(obj); }
    el.className = 'raw on';
  }
  function addNode(id, label, sub, state) {
    var tl = $('timeline');
    var n = document.createElement('div'); n.className = 'tline'; n.id = 'tn-' + id;
    n.innerHTML = '<div class="tdot '+(state||'')+'"></div><div class="tinfo"><div class="tinfo-label">'+label+'</div><div class="tinfo-sub tinfo-sub-'+id+'">'+sub+'</div></div>';
    tl.appendChild(n);
  }
  function updateNode(id, sub, state) {
    var n = $('tn-'+id); if (!n) return;
    n.querySelector('.tdot').className = 'tdot '+(state||'');
    n.querySelector('.tinfo-sub').textContent = sub;
  }
  function showVideo(url) {
    $('videoEl').src = url; $('dlLink').href = url;
    $('videoWrap').className = 'video-wrap on';
    setStatus('影片生成成功！','ok');
    genCount++; $('sideCount') && ($('sideCount').textContent = genCount);
  }
  function extractErr(d) {
    if (!d) return '未知錯誤';
    if (typeof d === 'string') return d;
    if (d.error) return typeof d.error === 'string' ? d.error : (d.error.message||d.error.code||JSON.stringify(d.error));
    if (d.message) return d.message;
    if (d.detail) return typeof d.detail === 'string' ? d.detail : JSON.stringify(d.detail);
    return JSON.stringify(d);
  }
  function extractUrl(d) {
    if (!d) return null;
    if (d.video_url) return d.video_url;
    if (d.url) return d.url;
    if (d.output) return d.output.video_url || d.output.url || null;
    if (d.data && Array.isArray(d.data) && d.data[0]) return d.data[0].url || d.data[0].video_url || null;
    if (d.result) return d.result.url || d.result.video_url || null;
    return null;
  }
  function safeJson(resp) {
    return resp.text().then(function(t){
      try { return {ok:resp.ok,status:resp.status,data:JSON.parse(t)}; }
      catch(e){ return {ok:resp.ok,status:resp.status,data:{error:t||('HTTP '+resp.status)}}; }
    });
  }

  var genCount = 0;
  function poll(apiKey, taskId, attempt) {
    if (attempt > 60) { setStatus('超時，Task ID: '+taskId,'error'); updateNode('poll','超時','err'); return; }
    fetch('/api/status?task_id='+encodeURIComponent(taskId)+'&apiKey='+encodeURIComponent(apiKey))
      .then(safeJson).then(function(res){
        var d = res.data;
        if (!res.ok) { setStatus('查詢失敗 HTTP '+res.status+'：\n'+extractErr(d),'error'); showRaw(d); updateNode('poll','查詢失敗','err'); return; }
        var st = (d.status||d.state||'').toLowerCase();
        if (st==='succeeded'||st==='completed'||st==='success') {
          var url = extractUrl(d); updateNode('poll','生成完成','done');
          addNode('ready','影片就緒',url?url.substring(0,50)+'...':'已完成','done');
          if (url) showVideo(url); else { setStatus('完成，但找不到影片 URL','warning'); showRaw(d); } return;
        }
        if (st==='failed'||st==='error'||st==='cancelled') { setStatus('生成失敗：\n'+extractErr(d),'error'); showRaw(d); updateNode('poll','失敗','err'); return; }
        var prog = d.progress ? ' ('+d.progress+'%)' : '';
        setStatus('狀態：'+(st||'處理中')+prog+'\n已等待 '+(attempt*5)+' 秒...','warning',true);
        updateNode('poll','狀態：'+(st||'處理中')+prog,'active');
        setTimeout(function(){ poll(apiKey,taskId,attempt+1); }, 5000);
      })
      .catch(function(e){ setStatus('輪詢錯誤：'+e.message,'error'); updateNode('poll','錯誤','err'); });
  }

  var genBtn = $('genBtn');
  genBtn.addEventListener('click', function(){
    var apiKey = keyInp.value.trim();
    var prompt = $('prompt').value.trim();
    var model = $('model').value;
    var duration = parseInt($('duration').value,10);
    var aspect_ratio = $('aspect_ratio').value;
    var resolution = $('resolution').value;
    if (!apiKey) { setStatus('請輸入 API Key','error'); return; }
    if (!prompt) { setStatus('請輸入提示詞','error'); return; }

    genBtn.disabled = true;
    genBtn.innerHTML = '<span class="spin"></span> 生成中…';
    $('videoWrap').className = 'video-wrap';
    $('timeline').innerHTML = '';
    $('rawBlock').className = 'raw';
    addNode('submit','提交任務','正在傳送請求...','active');
    setStatus('正在提交影片生成請求...','info',true);

    function resetBtn(){
      genBtn.disabled = false;
      genBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="5 3 19 12 5 21 5 3"/></svg> 生成影片';
    }

    fetch('/api/generate',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({apiKey,model,prompt,duration,aspect_ratio,resolution})
    }).then(safeJson).then(function(res){
      var d = res.data; resetBtn();
      if (!res.ok) { showRaw(d); setStatus('提交失敗 HTTP '+res.status+'：\n'+extractErr(d),'error'); updateNode('submit','失敗：'+extractErr(d),'err'); return; }
      updateNode('submit','已成功提交','done');
      var taskId = d.id||d.task_id||(d.data&&d.data[0]&&d.data[0].id);
      if (!taskId) {
        var url = extractUrl(d);
        if (url) showVideo(url); else { setStatus('任務完成（無需輪詢）','ok'); showRaw(d); } return;
      }
      addNode('poll','輪詢狀態','Task ID: '+taskId,'active');
      setStatus('任務已提交，等待生成...\nTask ID: '+taskId,'warning',true);
      poll(apiKey,taskId,0);
    }).catch(function(e){
      resetBtn(); setStatus('提交失敗：\n'+e.message,'error'); updateNode('submit','失敗','err');
    });
  });
});
</script>
</body>
</html>`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const API_BASE = env.API_BASE_URL || 'https://ai.ezif.in/v1';

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }});
    }

    if (url.pathname === '/' || url.pathname === '') {
      return new Response(HTML_PAGE, { headers: { 'Content-Type': 'text/html;charset=UTF-8' } });
    }

    if (url.pathname === '/api/generate' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { apiKey, model, prompt, duration, aspect_ratio, resolution } = body;
        if (!apiKey || !prompt) return jsonRes({ error: 'Missing apiKey or prompt' }, 400);
        const reqBody = { model, prompt };
        if (duration) reqBody.duration = duration;
        if (aspect_ratio) reqBody.aspect_ratio = aspect_ratio;
        if (resolution) reqBody.resolution = resolution;
        const resp = await fetch(API_BASE + '/videos/generations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiKey },
          body: JSON.stringify(reqBody)
        });
        const text = await resp.text();
        let data;
        try { data = JSON.parse(text); } catch(e) { data = { error: text || ('HTTP ' + resp.status) }; }
        return jsonRes(data, resp.status);
      } catch(e) { return jsonRes({ error: e.message }, 500); }
    }

    if (url.pathname === '/api/status' && request.method === 'GET') {
      const taskId = url.searchParams.get('task_id');
      const apiKey = url.searchParams.get('apiKey');
      if (!taskId || !apiKey) return jsonRes({ error: 'Missing task_id or apiKey' }, 400);
      try {
        const resp = await fetch(API_BASE + '/videos/generations/' + taskId, {
          headers: { 'Authorization': 'Bearer ' + apiKey }
        });
        const text = await resp.text();
        let data;
        try { data = JSON.parse(text); } catch(e) { data = { error: text || ('HTTP ' + resp.status) }; }
        return jsonRes(data, resp.status);
      } catch(e) { return jsonRes({ error: e.message }, 500); }
    }

    return new Response('Not Found', { status: 404 });
  }
};

function jsonRes(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
  });
}
