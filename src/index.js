const HTML_PAGE = `<!DOCTYPE html>
<html lang="zh-TW" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Grok Video Studio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300..700&display=swap" rel="stylesheet">
  <style>
    :root {
      --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
      --text-sm: clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
      --text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
      --text-lg: clamp(1.125rem, 1rem + 0.75vw, 1.5rem);
      --space-1:.25rem;--space-2:.5rem;--space-3:.75rem;
      --space-4:1rem;--space-5:1.25rem;--space-6:1.5rem;
      --space-8:2rem;--space-10:2.5rem;--space-12:3rem;
      --radius-sm:.375rem;--radius-md:.5rem;--radius-lg:.75rem;
      --radius-xl:1rem;--radius-full:9999px;
      --transition:180ms cubic-bezier(0.16,1,0.3,1);
      --font-body:'Inter','Helvetica Neue',sans-serif;
    }
    [data-theme="dark"]{
      --bg:#0e0e10;--surface:#16161a;--surface-2:#1c1c21;--surface-3:#242429;
      --border:rgba(255,255,255,0.08);--border-focus:rgba(255,255,255,0.25);
      --text:#e8e8ea;--text-muted:#8a8a9a;--text-faint:#4a4a5a;
      --primary:#7c6af5;--primary-hover:#6a58e0;--primary-active:#5847c4;
      --success:#3ecf8e;--error:#f06060;--warning:#f5a524;
      --primary-bg:rgba(124,106,245,0.15);--success-bg:rgba(62,207,142,0.15);
      --error-bg:rgba(240,96,96,0.15);--warning-bg:rgba(245,165,36,0.15);
      --success-border:rgba(62,207,142,0.3);
      --btn-ghost-bg:rgba(255,255,255,0.04);
      --btn-ghost-hover:rgba(255,255,255,0.08);
      --btn-secondary-bg:rgba(255,255,255,0.06);
      --btn-secondary-hover:rgba(255,255,255,0.10);
    }
    [data-theme="light"]{
      --bg:#f5f5f7;--surface:#ffffff;--surface-2:#f0f0f5;--surface-3:#e8e8ef;
      --border:rgba(0,0,0,0.08);--border-focus:rgba(0,0,0,0.3);
      --text:#1a1a2e;--text-muted:#6a6a7a;--text-faint:#aaaabc;
      --primary:#6558f5;--primary-hover:#5447e0;--primary-active:#4338c8;
      --success:#17a86b;--error:#d94040;--warning:#d48a10;
      --primary-bg:rgba(101,88,245,0.12);--success-bg:rgba(23,168,107,0.12);
      --error-bg:rgba(217,64,64,0.12);--warning-bg:rgba(212,138,16,0.12);
      --success-border:rgba(23,168,107,0.3);
      --btn-ghost-bg:rgba(0,0,0,0.03);
      --btn-ghost-hover:rgba(0,0,0,0.07);
      --btn-secondary-bg:rgba(0,0,0,0.05);
      --btn-secondary-hover:rgba(0,0,0,0.09);
    }
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    html{-webkit-font-smoothing:antialiased;scroll-behavior:smooth;}
    body{
      font-family:var(--font-body);font-size:var(--text-sm);
      background:var(--bg);color:var(--text);min-height:100dvh;
      display:grid;grid-template-columns:220px 1fr 360px;grid-template-rows:52px 1fr;
    }
    @media(max-width:900px){body{grid-template-columns:1fr;grid-template-rows:52px auto auto auto;}}

    /* ── TOPBAR ── */
    .topbar{
      grid-column:1/-1;display:flex;align-items:center;justify-content:space-between;
      padding:0 var(--space-6);background:var(--surface);border-bottom:1px solid var(--border);
    }
    .logo{display:flex;align-items:center;gap:var(--space-2);font-size:var(--text-sm);font-weight:600;letter-spacing:-.02em;}
    .logo svg{flex-shrink:0;}
    .topbar-right{display:flex;align-items:center;gap:var(--space-2);}
    .status-dot{width:7px;height:7px;border-radius:50%;background:var(--success);display:inline-block;}
    .api-status{display:flex;align-items:center;gap:var(--space-2);font-size:var(--text-xs);color:var(--text-muted);}

    /* ── BUTTON SYSTEM ── */
    /* Base reset */
    button{cursor:pointer;background:none;border:none;font-family:var(--font-body);}

    /* Primary — solid accent fill */
    .btn-primary{
      display:inline-flex;align-items:center;justify-content:center;gap:var(--space-2);
      padding:0 var(--space-5);height:40px;
      background:var(--primary);color:#fff;
      border:1.5px solid transparent;border-radius:var(--radius-lg);
      font-size:var(--text-sm);font-weight:600;letter-spacing:.01em;
      transition:background var(--transition),transform var(--transition),box-shadow var(--transition);
      box-shadow:0 1px 3px rgba(0,0,0,.18),0 0 0 0 var(--primary-bg);
    }
    .btn-primary:hover:not(:disabled){
      background:var(--primary-hover);transform:translateY(-1px);
      box-shadow:0 4px 14px rgba(124,106,245,.35);
    }
    .btn-primary:active:not(:disabled){background:var(--primary-active);transform:translateY(0);}
    .btn-primary:disabled{opacity:.45;cursor:not-allowed;box-shadow:none;}

    /* Primary full-width (generate button) */
    .btn-primary-block{
      width:100%;height:48px;padding:0;
      background:var(--primary);color:#fff;
      border:1.5px solid transparent;border-radius:var(--radius-lg);
      font-size:var(--text-sm);font-weight:700;letter-spacing:.02em;
      display:flex;align-items:center;justify-content:center;gap:var(--space-2);
      transition:background var(--transition),transform var(--transition),box-shadow var(--transition);
      box-shadow:0 1px 4px rgba(0,0,0,.2);
      margin-top:var(--space-6);
    }
    .btn-primary-block:hover:not(:disabled){
      background:var(--primary-hover);transform:translateY(-1px);
      box-shadow:0 6px 20px rgba(124,106,245,.38);
    }
    .btn-primary-block:active:not(:disabled){background:var(--primary-active);transform:translateY(0);}
    .btn-primary-block:disabled{opacity:.45;cursor:not-allowed;box-shadow:none;transform:none;}

    /* Secondary — subtle fill, no heavy border */
    .btn-secondary{
      display:inline-flex;align-items:center;justify-content:center;gap:var(--space-2);
      padding:0 var(--space-4);height:36px;
      background:var(--btn-secondary-bg);color:var(--text-muted);
      border:1px solid var(--border);border-radius:var(--radius-md);
      font-size:var(--text-xs);font-weight:500;
      transition:background var(--transition),color var(--transition),border-color var(--transition);
    }
    .btn-secondary:hover{background:var(--btn-secondary-hover);color:var(--text);border-color:var(--border-focus);}
    .btn-secondary:active{background:var(--surface-3);}

    /* Ghost — no fill, minimal border */
    .btn-ghost{
      display:inline-flex;align-items:center;justify-content:center;gap:var(--space-2);
      padding:0 var(--space-3);height:32px;
      background:var(--btn-ghost-bg);color:var(--text-muted);
      border:1px solid transparent;border-radius:var(--radius-md);
      font-size:var(--text-xs);font-weight:500;
      transition:background var(--transition),color var(--transition);
    }
    .btn-ghost:hover{background:var(--btn-ghost-hover);color:var(--text);}
    .btn-ghost:active{background:var(--surface-3);}

    /* Icon-only button (theme toggle, small actions) */
    .btn-icon{
      display:inline-flex;align-items:center;justify-content:center;
      width:34px;height:34px;
      background:var(--btn-ghost-bg);color:var(--text-muted);
      border:1px solid var(--border);border-radius:var(--radius-md);
      transition:background var(--transition),color var(--transition),border-color var(--transition);
    }
    .btn-icon:hover{background:var(--btn-ghost-hover);color:var(--text);border-color:var(--border-focus);}
    .btn-icon:active{background:var(--surface-3);}

    /* Inline text button (toggle show/hide) */
    .btn-inline{
      display:inline-flex;align-items:center;
      padding:2px var(--space-2);height:26px;
      background:var(--surface-3);color:var(--text-muted);
      border:1px solid var(--border);border-radius:var(--radius-sm);
      font-size:var(--text-xs);font-weight:500;
      transition:background var(--transition),color var(--transition);
    }
    .btn-inline:hover{color:var(--text);background:var(--surface-2);}

    /* Download button — success-tinted */
    .btn-download{
      display:flex;align-items:center;justify-content:center;gap:var(--space-2);
      width:100%;height:40px;margin-top:var(--space-3);
      background:var(--success-bg);color:var(--success);
      border:1px solid var(--success-border);border-radius:var(--radius-md);
      font-size:var(--text-xs);font-weight:600;text-decoration:none;
      transition:background var(--transition),box-shadow var(--transition),transform var(--transition);
    }
    .btn-download:hover{
      background:rgba(62,207,142,.22);transform:translateY(-1px);
      box-shadow:0 4px 12px rgba(62,207,142,.2);
    }
    .btn-download:active{transform:translateY(0);}

    /* Example chip button */
    .example-chip{
      background:var(--surface-2);border:1px solid var(--border);
      border-radius:var(--radius-full);padding:4px 12px;
      font-size:var(--text-xs);color:var(--text-muted);
      transition:all var(--transition);
    }
    .example-chip:hover{border-color:var(--primary);color:var(--primary);background:var(--primary-bg);}
    .example-chip:active{transform:scale(.97);}

    /* ── LAYOUT ── */
    .sidebar{
      background:var(--surface);border-right:1px solid var(--border);
      padding:var(--space-6) var(--space-4);display:flex;flex-direction:column;gap:var(--space-6);
      overflow-y:auto;
    }
    @media(max-width:900px){.sidebar{border-right:none;border-bottom:1px solid var(--border);padding:var(--space-4);}}
    .sidebar-section-title{font-size:var(--text-xs);font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--text-faint);margin-bottom:var(--space-2);}
    .stat-card{background:var(--surface-2);border-radius:var(--radius-lg);padding:var(--space-3) var(--space-4);border:1px solid var(--border);}
    .stat-card+.stat-card{margin-top:var(--space-2);}
    .stat-label{font-size:var(--text-xs);color:var(--text-muted);margin-bottom:2px;}
    .stat-value{font-size:var(--text-base);font-weight:600;font-variant-numeric:tabular-nums;}
    .stat-value.ok{color:var(--success);}
    .stat-value.muted{color:var(--text-muted);}
    .model-badge{
      display:inline-flex;align-items:center;background:var(--primary-bg);
      color:var(--primary);font-size:var(--text-xs);font-weight:500;
      border-radius:var(--radius-full);padding:2px 10px;margin-top:var(--space-1);
    }
    .main{padding:var(--space-8) var(--space-6);overflow-y:auto;display:flex;flex-direction:column;gap:var(--space-6);}
    @media(max-width:900px){.main{padding:var(--space-4);}}
    .section-header{margin-bottom:var(--space-4);}
    .section-header h1{font-size:var(--text-lg);font-weight:600;letter-spacing:-.02em;}
    .section-header p{font-size:var(--text-xs);color:var(--text-muted);margin-top:2px;}
    .form-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-xl);padding:var(--space-6);}
    .field{display:flex;flex-direction:column;gap:var(--space-2);}
    .field+.field{margin-top:var(--space-5);}
    label{font-size:var(--text-xs);font-weight:500;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;}
    input,select,textarea{
      width:100%;padding:var(--space-3) var(--space-4);
      background:var(--surface-2);border:1px solid var(--border);
      border-radius:var(--radius-md);color:var(--text);
      font-family:var(--font-body);font-size:var(--text-sm);
      outline:none;transition:border-color var(--transition),box-shadow var(--transition);
      -webkit-appearance:none;appearance:none;
    }
    input:focus,select:focus,textarea:focus{
      border-color:var(--primary);box-shadow:0 0 0 3px var(--primary-bg);
    }
    textarea{resize:vertical;min-height:110px;line-height:1.6;}
    select{padding-right:36px;cursor:pointer;}
    .grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:var(--space-4);}
    @media(max-width:600px){.grid-3{grid-template-columns:1fr;}}
    .api-key-wrap{position:relative;}
    .api-key-wrap input{padding-right:72px;}
    .toggle-key-wrap{position:absolute;right:var(--space-2);top:50%;transform:translateY(-50%);}
    .examples{display:flex;flex-wrap:wrap;gap:var(--space-2);margin-top:var(--space-3);}

    /* ── PANEL ── */
    .panel{background:var(--surface);border-left:1px solid var(--border);display:flex;flex-direction:column;overflow:hidden;}
    @media(max-width:900px){.panel{border-left:none;border-top:1px solid var(--border);}}
    .panel-header{
      padding:var(--space-4) var(--space-5);border-bottom:1px solid var(--border);
      display:flex;align-items:center;justify-content:space-between;flex-shrink:0;
    }
    .panel-title{font-size:var(--text-sm);font-weight:600;}
    .panel-body{flex:1;overflow-y:auto;padding:var(--space-5);}
    .status-block{
      background:var(--surface-2);border:1px solid var(--border);
      border-radius:var(--radius-lg);padding:var(--space-4);display:none;
    }
    .status-block.visible{display:block;}
    .status-row{display:flex;align-items:center;gap:var(--space-2);}
    .status-badge{
      display:inline-flex;align-items:center;gap:5px;
      font-size:var(--text-xs);font-weight:600;padding:2px 10px;
      border-radius:var(--radius-full);
    }
    .status-badge.info{background:var(--primary-bg);color:var(--primary);}
    .status-badge.ok{background:var(--success-bg);color:var(--success);}
    .status-badge.error{background:var(--error-bg);color:var(--error);}
    .status-badge.warning{background:var(--warning-bg);color:var(--warning);}
    .status-msg{font-size:var(--text-xs);color:var(--text-muted);margin-top:var(--space-2);line-height:1.6;white-space:pre-wrap;word-break:break-all;}
    .spinner{display:inline-block;width:12px;height:12px;border:2px solid currentColor;border-top-color:transparent;border-radius:50%;animation:spin .7s linear infinite;}
    @keyframes spin{to{transform:rotate(360deg);}}
    .video-wrap{margin-top:var(--space-5);display:none;}
    .video-wrap.visible{display:block;}
    .video-wrap video{width:100%;border-radius:var(--radius-lg);background:#000;max-height:280px;}
    .task-list{display:flex;flex-direction:column;gap:var(--space-3);margin-top:var(--space-4);}
    .task-node{
      background:var(--surface-2);border-radius:var(--radius-md);
      border:1px solid var(--border);padding:var(--space-3) var(--space-4);
      display:flex;align-items:center;gap:var(--space-3);
    }
    .task-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;background:var(--text-faint);}
    .task-dot.active{background:var(--primary);}
    .task-dot.done{background:var(--success);}
    .task-dot.err{background:var(--error);}
    .task-info{flex:1;}
    .task-label{font-size:var(--text-xs);font-weight:500;}
    .task-sub{font-size:var(--text-xs);color:var(--text-muted);margin-top:1px;}
    .empty-panel{
      display:flex;flex-direction:column;align-items:center;justify-content:center;
      min-height:200px;text-align:center;padding:var(--space-8);color:var(--text-faint);
      gap:var(--space-3);
    }
    .empty-panel svg{opacity:.3;}
    .empty-panel p{font-size:var(--text-xs);}
    .raw-block{
      margin-top:var(--space-4);background:var(--surface-3);border:1px solid var(--border);
      border-radius:var(--radius-md);padding:var(--space-3);
      font-size:var(--text-xs);color:var(--text-muted);white-space:pre-wrap;
      word-break:break-all;max-height:160px;overflow-y:auto;display:none;
    }
    .raw-block.visible{display:block;}
    ::selection{background:var(--primary-bg);color:var(--text);}
    :focus-visible{outline:2px solid var(--primary);outline-offset:2px;border-radius:var(--radius-sm);}
    @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important;}}
    a,button,[role="button"],input,textarea,select{
      transition:color var(--transition),background var(--transition),border-color var(--transition),box-shadow var(--transition),transform var(--transition);
    }
  </style>
</head>
<body>
  <header class="topbar">
    <div class="logo">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-label="logo">
        <rect x="2" y="4" width="14" height="16" rx="2" stroke="currentColor" stroke-width="1.5"/>
        <path d="M16 9l5 3-5 3V9z" fill="currentColor"/>
      </svg>
      Grok Video Studio
    </div>
    <div class="topbar-right">
      <div class="api-status">
        <span class="status-dot"></span>
        <span>ai.ezif.in</span>
      </div>
      <button class="btn-icon" id="themeBtn" aria-label="切換深淺色">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      </button>
    </div>
  </header>

  <aside class="sidebar">
    <div>
      <div class="sidebar-section-title">模型資訊</div>
      <div class="stat-card">
        <div class="stat-label">目前模型</div>
        <div class="stat-value" id="sideModel">grok-video-normal</div>
        <div class="model-badge" id="sideBadge">標準</div>
      </div>
      <div class="stat-card" style="margin-top:var(--space-2)">
        <div class="stat-label">輸出設定</div>
        <div class="stat-value muted" id="sideOutput">5s · 16:9 · 720p</div>
      </div>
    </div>
    <div>
      <div class="sidebar-section-title">本次會話</div>
      <div class="stat-card">
        <div class="stat-label">已生成</div>
        <div class="stat-value ok" id="sideCount">0</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">狀態</div>
        <div class="stat-value muted" id="sideStatus">待機</div>
      </div>
    </div>
  </aside>

  <main class="main">
    <div class="section-header">
      <h1>影片生成台</h1>
      <p>填寫設定後點擊生成，進度會顯示在右側面板</p>
    </div>

    <div class="form-card">
      <div class="field">
        <label for="apiKey">API Key</label>
        <div class="api-key-wrap">
          <input type="password" id="apiKey" placeholder="輸入你的 API Key" autocomplete="off" />
          <span class="toggle-key-wrap">
            <button type="button" class="btn-inline" id="toggleKeyBtn">顯示</button>
          </span>
        </div>
      </div>
      <div class="field">
        <label for="model">模型</label>
        <select id="model">
          <option value="grok-video-normal">grok-video-normal — 標準</option>
          <option value="grok-imagine-video">grok-imagine-video — 高品質</option>
        </select>
      </div>
    </div>

    <div class="form-card">
      <div class="field">
        <label for="prompt">提示詞 Prompt</label>
        <textarea id="prompt" placeholder="描述你想生成的影片，例如：A slow-motion wave crashing on a rocky shore at golden hour"></textarea>
        <div class="examples">
          <button type="button" class="example-chip" data-prompt="A cat walking across a sunny garden in slow motion">貓咪花園</button>
          <button type="button" class="example-chip" data-prompt="Aerial view of a neon city at night, flying between skyscrapers">霓虹城市</button>
          <button type="button" class="example-chip" data-prompt="Cherry blossoms falling in soft wind, cinematic depth of field">櫻花飄落</button>
          <button type="button" class="example-chip" data-prompt="A samurai standing in the rain, fog, dramatic lighting">武士雨中</button>
        </div>
      </div>
      <div class="grid-3" style="margin-top:var(--space-5)">
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
      <button type="button" id="genBtn" class="btn-primary-block">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        生成影片
      </button>
    </div>
  </main>

  <aside class="panel">
    <div class="panel-header">
      <span class="panel-title">輸出面板</span>
      <span id="panelBadge"></span>
    </div>
    <div class="panel-body">
      <div class="empty-panel" id="emptyState">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
          <rect x="2" y="4" width="14" height="16" rx="2"/><path d="M16 9l5 3-5 3V9z"/>
        </svg>
        <p>尚未生成影片<br>填寫左側表單後點擊生成</p>
      </div>
      <div class="status-block" id="statusBlock">
        <div class="status-row"><span class="status-badge info" id="statusBadge">處理中</span></div>
        <div class="status-msg" id="statusMsg"></div>
      </div>
      <div class="video-wrap" id="videoWrap">
        <video id="videoEl" controls playsinline></video>
        <a id="downloadLink" class="btn-download" download="grok-video.mp4" href="#">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          下載影片
        </a>
      </div>
      <div class="task-list" id="taskList"></div>
      <div class="raw-block" id="rawBlock"></div>
    </div>
  </aside>

  <script>
  document.addEventListener('DOMContentLoaded', function() {
    var root = document.documentElement;
    var theme = root.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
    root.setAttribute('data-theme', theme);

    var themeBtn = document.getElementById('themeBtn');
    function renderThemeIcon() {
      themeBtn.innerHTML = theme === 'dark'
        ? '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
        : '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    }
    renderThemeIcon();
    themeBtn.addEventListener('click', function() {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
      renderThemeIcon();
    });

    var toggleKeyBtn = document.getElementById('toggleKeyBtn');
    var apiKeyInp = document.getElementById('apiKey');
    toggleKeyBtn.addEventListener('click', function() {
      if (apiKeyInp.type === 'password') { apiKeyInp.type = 'text'; toggleKeyBtn.textContent = '隱藏'; }
      else { apiKeyInp.type = 'password'; toggleKeyBtn.textContent = '顯示'; }
    });

    document.querySelectorAll('.example-chip').forEach(function(btn) {
      btn.addEventListener('click', function() {
        document.getElementById('prompt').value = btn.getAttribute('data-prompt');
      });
    });

    function syncSidebar() {
      var m = document.getElementById('model').value;
      var d = document.getElementById('duration').value;
      var a = document.getElementById('aspect_ratio').value;
      var r = document.getElementById('resolution').value;
      document.getElementById('sideModel').textContent = m;
      document.getElementById('sideBadge').textContent = m === 'grok-imagine-video' ? '高品質' : '標準';
      document.getElementById('sideOutput').textContent = d + 's \u00b7 ' + a + ' \u00b7 ' + r;
    }
    ['model','duration','aspect_ratio','resolution'].forEach(function(id) {
      document.getElementById(id).addEventListener('change', syncSidebar);
    });
    syncSidebar();

    var genCount = 0;
    function setStatus(msg, type, loading) {
      var block = document.getElementById('statusBlock');
      var badge = document.getElementById('statusBadge');
      var msgEl = document.getElementById('statusMsg');
      document.getElementById('emptyState').style.display = 'none';
      block.style.display = 'block';
      block.className = 'status-block visible';
      badge.className = 'status-badge ' + (type || 'info');
      var labels = { info:'處理中', ok:'完成', error:'錯誤', warning:'等待中' };
      badge.innerHTML = (loading ? '<span class="spinner"></span>' : '') + (labels[type] || '處理中');
      msgEl.textContent = msg;
      document.getElementById('sideStatus').textContent = labels[type] || '處理中';
      var pb = document.getElementById('panelBadge');
      pb.className = 'status-badge ' + (type || 'info');
      pb.textContent = labels[type] || '處理中';
    }
    function showRaw(obj) {
      var el = document.getElementById('rawBlock');
      try { el.textContent = JSON.stringify(obj, null, 2); } catch(e) { el.textContent = String(obj); }
      el.className = 'raw-block visible';
    }
    function addTask(id, label, sub, state) {
      var list = document.getElementById('taskList');
      var node = document.createElement('div');
      node.className = 'task-node'; node.id = 'tn-' + id;
      node.innerHTML = '<div class="task-dot ' + (state||'') + '"></div><div class="task-info"><div class="task-label">' + label + '</div><div class="task-sub task-sub-' + id + '">' + sub + '</div></div>';
      list.appendChild(node);
    }
    function updateTask(id, sub, state) {
      var node = document.getElementById('tn-' + id);
      if (!node) return;
      node.querySelector('.task-dot').className = 'task-dot ' + (state || '');
      node.querySelector('.task-sub').textContent = sub;
    }
    function showVideo(url) {
      var vEl = document.getElementById('videoEl');
      vEl.src = url;
      document.getElementById('downloadLink').href = url;
      document.getElementById('videoWrap').className = 'video-wrap visible';
      setStatus('影片生成成功！', 'ok');
      genCount++;
      document.getElementById('sideCount').textContent = genCount;
      document.getElementById('sideStatus').textContent = '完成';
    }
    function extractError(data) {
      if (!data) return '未知錯誤';
      if (typeof data === 'string') return data;
      if (data.error) {
        if (typeof data.error === 'string') return data.error;
        if (typeof data.error === 'object') return data.error.message || data.error.code || JSON.stringify(data.error);
      }
      if (data.message) return data.message;
      if (data.detail) return typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail);
      return JSON.stringify(data);
    }
    function extractVideoUrl(data) {
      if (!data) return null;
      if (data.video_url) return data.video_url;
      if (data.url) return data.url;
      if (data.output && data.output.video_url) return data.output.video_url;
      if (data.output && data.output.url) return data.output.url;
      if (data.data && Array.isArray(data.data) && data.data[0]) return data.data[0].url || data.data[0].video_url || null;
      if (data.result && data.result.url) return data.result.url;
      if (data.result && data.result.video_url) return data.result.video_url;
      return null;
    }
    function safeJson(resp) {
      return resp.text().then(function(text) {
        try { return { ok: resp.ok, status: resp.status, data: JSON.parse(text) }; }
        catch(e) { return { ok: resp.ok, status: resp.status, data: { error: text || ('HTTP ' + resp.status) } }; }
      });
    }
    function pollStatus(apiKey, taskId, attempt) {
      if (attempt > 60) {
        setStatus('超時，請稍後手動查詢\nTask ID: ' + taskId, 'error');
        updateTask('poll', '超時', 'err'); return;
      }
      fetch('/api/status?task_id=' + encodeURIComponent(taskId) + '&apiKey=' + encodeURIComponent(apiKey))
        .then(safeJson)
        .then(function(res) {
          var data = res.data;
          if (!res.ok) {
            setStatus('查詢失敗 (HTTP ' + res.status + ')：\n' + extractError(data), 'error');
            showRaw(data); updateTask('poll', '查詢失敗', 'err'); return;
          }
          var st = (data.status || data.state || '').toLowerCase();
          if (st === 'succeeded' || st === 'completed' || st === 'success') {
            var url = extractVideoUrl(data);
            updateTask('poll', '生成完成', 'done');
            addTask('ready', '影片就緒', url ? url.substring(0,50) + '...' : '已完成', 'done');
            if (url) showVideo(url);
            else { setStatus('完成，但找不到影片 URL', 'warning'); showRaw(data); }
            return;
          }
          if (st === 'failed' || st === 'error' || st === 'cancelled') {
            setStatus('生成失敗：\n' + extractError(data), 'error');
            showRaw(data); updateTask('poll', '失敗', 'err'); return;
          }
          var prog = data.progress ? ' (' + data.progress + '%)' : '';
          setStatus('狀態：' + (st || '處理中') + prog + '\n已等待 ' + (attempt * 5) + ' 秒...', 'warning', true);
          updateTask('poll', '狀態：' + (st || '處理中') + prog, 'active');
          setTimeout(function() { pollStatus(apiKey, taskId, attempt + 1); }, 5000);
        })
        .catch(function(e) { setStatus('輪詢網路錯誤：' + e.message, 'error'); updateTask('poll', '錯誤', 'err'); });
    }

    var genBtn = document.getElementById('genBtn');
    if (!genBtn) { console.error('[GrokStudio] genBtn not found'); return; }

    genBtn.addEventListener('click', function() {
      var apiKey = apiKeyInp.value.trim();
      var prompt = document.getElementById('prompt').value.trim();
      var model = document.getElementById('model').value;
      var duration = parseInt(document.getElementById('duration').value, 10);
      var aspect_ratio = document.getElementById('aspect_ratio').value;
      var resolution = document.getElementById('resolution').value;

      if (!apiKey) { setStatus('請輸入 API Key', 'error'); return; }
      if (!prompt) { setStatus('請輸入提示詞', 'error'); return; }

      genBtn.disabled = true;
      genBtn.innerHTML = '<span class="spinner"></span> 生成中…';
      document.getElementById('videoWrap').className = 'video-wrap';
      document.getElementById('taskList').innerHTML = '';
      document.getElementById('rawBlock').className = 'raw-block';
      addTask('submit', '提交任務', '正在傳送請求...', 'active');
      setStatus('正在提交影片生成請求...', 'info', true);

      function resetBtn() {
        genBtn.disabled = false;
        genBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="5 3 19 12 5 21 5 3"/></svg> 生成影片';
      }

      fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: apiKey, model: model, prompt: prompt, duration: duration, aspect_ratio: aspect_ratio, resolution: resolution })
      })
      .then(safeJson)
      .then(function(res) {
        var data = res.data;
        resetBtn();
        if (!res.ok) {
          var errMsg = extractError(data);
          showRaw(data);
          setStatus('提交失敗 (HTTP ' + res.status + ')：\n' + errMsg, 'error');
          updateTask('submit', '失敗：' + errMsg, 'err');
          return;
        }
        updateTask('submit', '已成功提交', 'done');
        var taskId = data.id || data.task_id || (data.data && data.data[0] && data.data[0].id);
        if (!taskId) {
          var url = extractVideoUrl(data);
          if (url) { showVideo(url); }
          else { setStatus('任務完成（無需輪詢）', 'ok'); showRaw(data); }
          return;
        }
        addTask('poll', '輪詢狀態', 'Task ID: ' + taskId, 'active');
        setStatus('任務已提交，等待生成...\nTask ID: ' + taskId, 'warning', true);
        pollStatus(apiKey, taskId, 0);
      })
      .catch(function(e) {
        resetBtn();
        setStatus('提交任務失敗：\n' + e.message, 'error');
        updateTask('submit', '失敗：' + e.message, 'err');
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
