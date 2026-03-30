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
      --text-xl: clamp(1.5rem, 1.2rem + 1.25vw, 2.25rem);
      --space-1: 0.25rem; --space-2: 0.5rem; --space-3: 0.75rem;
      --space-4: 1rem; --space-5: 1.25rem; --space-6: 1.5rem;
      --space-8: 2rem; --space-10: 2.5rem; --space-12: 3rem;
      --radius-sm: 0.375rem; --radius-md: 0.5rem; --radius-lg: 0.75rem;
      --radius-xl: 1rem; --radius-full: 9999px;
      --transition: 180ms cubic-bezier(0.16, 1, 0.3, 1);
      --font-body: 'Inter', 'Helvetica Neue', sans-serif;
    }
    [data-theme="dark"] {
      --bg: #0e0e10;
      --surface: #16161a;
      --surface-2: #1c1c21;
      --surface-3: #242429;
      --border: rgba(255,255,255,0.08);
      --border-focus: rgba(255,255,255,0.25);
      --text: #e8e8ea;
      --text-muted: #8a8a9a;
      --text-faint: #4a4a5a;
      --primary: #7c6af5;
      --primary-hover: #6a58e0;
      --primary-active: #5847c4;
      --success: #3ecf8e;
      --error: #f06060;
      --warning: #f5a524;
      --shadow: 0 4px 24px rgba(0,0,0,0.4);
    }
    [data-theme="light"] {
      --bg: #f5f5f7;
      --surface: #ffffff;
      --surface-2: #f0f0f5;
      --surface-3: #e8e8ef;
      --border: rgba(0,0,0,0.08);
      --border-focus: rgba(0,0,0,0.3);
      --text: #1a1a2e;
      --text-muted: #6a6a7a;
      --text-faint: #aaaabc;
      --primary: #6558f5;
      --primary-hover: #5447e0;
      --primary-active: #4338c8;
      --success: #17a86b;
      --error: #d94040;
      --warning: #d48a10;
      --shadow: 0 4px 24px rgba(0,0,0,0.1);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { -webkit-font-smoothing: antialiased; scroll-behavior: smooth; }
    body {
      font-family: var(--font-body);
      font-size: var(--text-sm);
      background: var(--bg);
      color: var(--text);
      min-height: 100dvh;
      display: grid;
      grid-template-columns: 220px 1fr 360px;
      grid-template-rows: auto 1fr;
    }
    @media (max-width: 900px) {
      body { grid-template-columns: 1fr; grid-template-rows: auto auto auto; }
    }

    /* ── Topbar ── */
    .topbar {
      grid-column: 1 / -1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--space-3) var(--space-6);
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      height: 52px;
    }
    .logo {
      display: flex; align-items: center; gap: var(--space-2);
      font-size: var(--text-sm); font-weight: 600; letter-spacing: -0.02em;
    }
    .logo svg { flex-shrink: 0; }
    .topbar-right { display: flex; align-items: center; gap: var(--space-3); }
    .theme-btn {
      background: var(--surface-2); border: 1px solid var(--border);
      border-radius: var(--radius-md); padding: var(--space-1) var(--space-2);
      color: var(--text-muted); cursor: pointer; display: flex; align-items: center;
      transition: all var(--transition);
    }
    .theme-btn:hover { color: var(--text); border-color: var(--border-focus); }
    .status-dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: var(--success); display: inline-block;
      box-shadow: 0 0 6px var(--success);
    }
    .api-status { display: flex; align-items: center; gap: var(--space-2); font-size: var(--text-xs); color: var(--text-muted); }

    /* ── Sidebar ── */
    .sidebar {
      background: var(--surface);
      border-right: 1px solid var(--border);
      padding: var(--space-6) var(--space-4);
      display: flex; flex-direction: column; gap: var(--space-6);
    }
    @media (max-width: 900px) { .sidebar { border-right: none; border-bottom: 1px solid var(--border); padding: var(--space-4); } }
    .sidebar-section-title {
      font-size: var(--text-xs); font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.08em; color: var(--text-faint); margin-bottom: var(--space-2);
    }
    .stat-card {
      background: var(--surface-2); border-radius: var(--radius-lg);
      padding: var(--space-3) var(--space-4); border: 1px solid var(--border);
    }
    .stat-card + .stat-card { margin-top: var(--space-2); }
    .stat-label { font-size: var(--text-xs); color: var(--text-muted); margin-bottom: 2px; }
    .stat-value { font-size: var(--text-base); font-weight: 600; font-variant-numeric: tabular-nums; }
    .stat-value.success { color: var(--success); }
    .stat-value.muted { color: var(--text-muted); }
    .model-badge {
      display: inline-flex; align-items: center; gap: var(--space-1);
      background: color-mix(in srgb, var(--primary) 12%, transparent);
      color: var(--primary); font-size: var(--text-xs); font-weight: 500;
      border-radius: var(--radius-full); padding: 2px 10px; margin-top: var(--space-1);
    }

    /* ── Main Form ── */
    .main {
      padding: var(--space-8) var(--space-6);
      overflow-y: auto;
      display: flex; flex-direction: column; gap: var(--space-6);
    }
    @media (max-width: 900px) { .main { padding: var(--space-4); } }
    .section-header { margin-bottom: var(--space-4); }
    .section-header h1 { font-size: var(--text-lg); font-weight: 600; letter-spacing: -0.02em; }
    .section-header p { font-size: var(--text-xs); color: var(--text-muted); margin-top: 2px; }

    .form-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      padding: var(--space-6);
    }
    .form-card + .form-card { margin-top: 0; }
    .field { display: flex; flex-direction: column; gap: var(--space-2); }
    .field + .field { margin-top: var(--space-5); }
    label {
      font-size: var(--text-xs); font-weight: 500; color: var(--text-muted);
      text-transform: uppercase; letter-spacing: 0.06em;
    }
    input, select, textarea {
      width: 100%; padding: var(--space-3) var(--space-4);
      background: var(--surface-2); border: 1px solid var(--border);
      border-radius: var(--radius-md); color: var(--text);
      font-family: var(--font-body); font-size: var(--text-sm);
      outline: none; transition: border-color var(--transition), box-shadow var(--transition);
      appearance: none;
    }
    input:focus, select:focus, textarea:focus {
      border-color: var(--primary); box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 18%, transparent);
    }
    textarea { resize: vertical; min-height: 110px; line-height: 1.6; }
    select { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238a8a9a' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; padding-right: 36px; cursor: pointer; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); }
    .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: var(--space-4); }
    @media (max-width: 600px) { .grid-2, .grid-3 { grid-template-columns: 1fr; } }

    .api-key-wrap { position: relative; }
    .api-key-wrap input { padding-right: 70px; }
    .toggle-key {
      position: absolute; right: var(--space-2); top: 50%; transform: translateY(-50%);
      background: var(--surface-3); border: 1px solid var(--border);
      border-radius: var(--radius-sm); color: var(--text-muted); cursor: pointer;
      font-size: var(--text-xs); padding: 3px 10px; transition: all var(--transition);
      font-family: var(--font-body);
    }
    .toggle-key:hover { color: var(--text); }

    .examples { display: flex; flex-wrap: wrap; gap: var(--space-2); margin-top: var(--space-3); }
    .example-chip {
      background: var(--surface-2); border: 1px solid var(--border);
      border-radius: var(--radius-full); padding: 4px 12px;
      font-size: var(--text-xs); color: var(--text-muted); cursor: pointer;
      transition: all var(--transition);
    }
    .example-chip:hover { border-color: var(--primary); color: var(--primary); background: color-mix(in srgb, var(--primary) 8%, var(--surface-2)); }

    .gen-btn {
      width: 100%; padding: var(--space-4);
      background: var(--primary); border: none;
      border-radius: var(--radius-lg); color: #fff;
      font-family: var(--font-body); font-size: var(--text-sm);
      font-weight: 600; cursor: pointer; letter-spacing: 0.01em;
      transition: background var(--transition), transform var(--transition), box-shadow var(--transition);
      margin-top: var(--space-6);
    }
    .gen-btn:hover { background: var(--primary-hover); transform: translateY(-1px); box-shadow: 0 4px 16px color-mix(in srgb, var(--primary) 35%, transparent); }
    .gen-btn:active { background: var(--primary-active); transform: translateY(0); }
    .gen-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }

    /* ── Right Panel ── */
    .panel {
      background: var(--surface);
      border-left: 1px solid var(--border);
      display: flex; flex-direction: column;
      overflow: hidden;
    }
    @media (max-width: 900px) { .panel { border-left: none; border-top: 1px solid var(--border); } }
    .panel-header {
      padding: var(--space-4) var(--space-5);
      border-bottom: 1px solid var(--border);
      display: flex; align-items: center; justify-content: space-between;
    }
    .panel-title { font-size: var(--text-sm); font-weight: 600; }
    .panel-body { flex: 1; overflow-y: auto; padding: var(--space-5); }

    .status-block {
      background: var(--surface-2); border: 1px solid var(--border);
      border-radius: var(--radius-lg); padding: var(--space-4);
      display: none;
    }
    .status-block.visible { display: block; }
    .status-block.error { border-color: color-mix(in srgb, var(--error) 30%, var(--border)); }
    .status-block.success { border-color: color-mix(in srgb, var(--success) 30%, var(--border)); }
    .status-row { display: flex; align-items: center; gap: var(--space-2); }
    .status-badge {
      display: inline-flex; align-items: center; gap: 5px;
      font-size: var(--text-xs); font-weight: 600; padding: 2px 10px;
      border-radius: var(--radius-full);
    }
    .status-badge.info { background: color-mix(in srgb, var(--primary) 15%, transparent); color: var(--primary); }
    .status-badge.success { background: color-mix(in srgb, var(--success) 15%, transparent); color: var(--success); }
    .status-badge.error { background: color-mix(in srgb, var(--error) 15%, transparent); color: var(--error); }
    .status-badge.warning { background: color-mix(in srgb, var(--warning) 15%, transparent); color: var(--warning); }
    .status-msg { font-size: var(--text-xs); color: var(--text-muted); margin-top: var(--space-2); line-height: 1.6; white-space: pre-wrap; word-break: break-all; }

    .spinner {
      display: inline-block; width: 12px; height: 12px;
      border: 2px solid currentColor; border-top-color: transparent;
      border-radius: 50%; animation: spin 0.7s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    .video-wrap { margin-top: var(--space-5); display: none; }
    .video-wrap.visible { display: block; }
    .video-wrap video { width: 100%; border-radius: var(--radius-lg); background: #000; max-height: 280px; }
    .download-btn {
      display: flex; align-items: center; justify-content: center; gap: var(--space-2);
      width: 100%; margin-top: var(--space-3);
      padding: var(--space-3); background: color-mix(in srgb, var(--success) 12%, var(--surface-2));
      border: 1px solid color-mix(in srgb, var(--success) 30%, var(--border));
      border-radius: var(--radius-md); color: var(--success);
      font-size: var(--text-xs); font-weight: 600; text-decoration: none;
      transition: all var(--transition);
    }
    .download-btn:hover { background: color-mix(in srgb, var(--success) 20%, var(--surface-2)); }

    .task-list { display: flex; flex-direction: column; gap: var(--space-3); margin-top: var(--space-4); }
    .task-node {
      background: var(--surface-2); border-radius: var(--radius-md);
      border: 1px solid var(--border); padding: var(--space-3) var(--space-4);
      display: flex; align-items: center; gap: var(--space-3);
    }
    .task-node-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; background: var(--text-faint); }
    .task-node-dot.active { background: var(--primary); box-shadow: 0 0 6px var(--primary); }
    .task-node-dot.done { background: var(--success); }
    .task-node-dot.err { background: var(--error); }
    .task-node-info { flex: 1; }
    .task-node-label { font-size: var(--text-xs); font-weight: 500; }
    .task-node-sub { font-size: var(--text-xs); color: var(--text-muted); margin-top: 1px; }

    .empty-panel {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      height: 100%; text-align: center; padding: var(--space-8); color: var(--text-faint);
      gap: var(--space-3);
    }
    .empty-panel svg { opacity: 0.3; }
    .empty-panel p { font-size: var(--text-xs); }

    ::selection { background: color-mix(in srgb, var(--primary) 25%, transparent); color: var(--text); }
    :focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; border-radius: var(--radius-sm); }
    @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }
  </style>
</head>
<body>
  <!-- Topbar -->
  <header class="topbar">
    <div class="logo">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Grok Video Studio logo">
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
      <button class="theme-btn" data-theme-toggle aria-label="切換深淺色">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      </button>
    </div>
  </header>

  <!-- Sidebar -->
  <aside class="sidebar">
    <div>
      <div class="sidebar-section-title">模型資訊</div>
      <div class="stat-card">
        <div class="stat-label">目前模型</div>
        <div class="stat-value" id="sideModelName">grok-video-normal</div>
        <div class="model-badge" id="sideModelBadge">標準</div>
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
        <div class="stat-value success" id="sideCount">0</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">狀態</div>
        <div class="stat-value muted" id="sideStatus">待機</div>
      </div>
    </div>
  </aside>

  <!-- Main -->
  <main class="main">
    <div class="section-header">
      <h1>影片生成台</h1>
      <p>填寫以下設定，點擊生成後在右側面板查看進度</p>
    </div>

    <div class="form-card">
      <div class="field">
        <label for="apiKey">API Key</label>
        <div class="api-key-wrap">
          <input type="password" id="apiKey" placeholder="輸入你的 API Key" autocomplete="off" />
          <button type="button" class="toggle-key" onclick="toggleKey(this)">顯示</button>
        </div>
      </div>

      <div class="field">
        <label for="model">模型</label>
        <select id="model" onchange="updateSidebar()">
          <option value="grok-video-normal">grok-video-normal — 標準</option>
          <option value="grok-imagine-video">grok-imagine-video — 高品質</option>
        </select>
      </div>
    </div>

    <div class="form-card">
      <div class="field">
        <label for="prompt">提示詞 Prompt</label>
        <textarea id="prompt" placeholder="描述你想生成的影片，例如：A slow-motion wave crashing on a rocky shore at golden hour" oninput="updateSidebar()"></textarea>
        <div class="examples" id="exampleChips">
          <button class="example-chip" onclick="setPrompt('A cat walking across a sunny garden in slow motion')">貓咪花園</button>
          <button class="example-chip" onclick="setPrompt('Aerial view of a neon city at night, flying between skyscrapers')">霓虹城市</button>
          <button class="example-chip" onclick="setPrompt('Cherry blossoms falling in soft wind, cinematic depth of field')">櫻花飄落</button>
          <button class="example-chip" onclick="setPrompt('A samurai standing in the rain, fog, dramatic lighting')">武士雨中</button>
        </div>
      </div>

      <div class="grid-3" style="margin-top:var(--space-5)">
        <div class="field">
          <label for="duration">時長</label>
          <select id="duration" onchange="updateSidebar()">
            <option value="5">5 秒</option>
            <option value="10">10 秒</option>
          </select>
        </div>
        <div class="field">
          <label for="aspect_ratio">比例</label>
          <select id="aspect_ratio" onchange="updateSidebar()">
            <option value="16:9">16:9</option>
            <option value="9:16">9:16</option>
            <option value="1:1">1:1</option>
          </select>
        </div>
        <div class="field">
          <label for="resolution">解析度</label>
          <select id="resolution" onchange="updateSidebar()">
            <option value="720p">720p</option>
            <option value="1080p">1080p</option>
          </select>
        </div>
      </div>

      <button type="button" id="genBtn" class="gen-btn" onclick="generate()">
        生成影片
      </button>
    </div>
  </main>

  <!-- Right Panel -->
  <aside class="panel">
    <div class="panel-header">
      <span class="panel-title">輸出面板</span>
      <span id="panelBadge"></span>
    </div>
    <div class="panel-body">
      <div class="empty-panel" id="emptyState">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
          <rect x="2" y="4" width="14" height="16" rx="2"/>
          <path d="M16 9l5 3-5 3V9z"/>
        </svg>
        <p>尚未生成影片<br>填寫左側表單後點擊生成</p>
      </div>

      <div class="status-block" id="statusBlock">
        <div class="status-row">
          <span class="status-badge info" id="statusBadge">處理中</span>
        </div>
        <div class="status-msg" id="statusMsg"></div>
      </div>

      <div class="video-wrap" id="videoWrap">
        <video id="videoEl" controls></video>
        <a id="downloadLink" class="download-btn" download="grok-video.mp4" href="#">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          下載影片
        </a>
      </div>

      <div class="task-list" id="taskList"></div>
    </div>
  </aside>

  <script>
    // Theme toggle
    (function(){
      var r = document.documentElement;
      var d = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      r.setAttribute('data-theme', d);
      var t = document.querySelector('[data-theme-toggle]');
      function setIcon(mode) {
        t.innerHTML = mode === 'dark'
          ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
          : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
      }
      setIcon(d);
      t && t.addEventListener('click', function(){
        d = d === 'dark' ? 'light' : 'dark';
        r.setAttribute('data-theme', d);
        setIcon(d);
      });
    })();

    var genCount = 0;

    function updateSidebar() {
      var model = document.getElementById('model').value;
      var dur = document.getElementById('duration').value;
      var ar = document.getElementById('aspect_ratio').value;
      var res = document.getElementById('resolution').value;
      document.getElementById('sideModelName').textContent = model;
      document.getElementById('sideModelBadge').textContent = model === 'grok-imagine-video' ? '高品質' : '標準';
      document.getElementById('sideOutput').textContent = dur + 's · ' + ar + ' · ' + res;
    }

    function setPrompt(text) {
      document.getElementById('prompt').value = text;
    }

    function toggleKey(btn) {
      var inp = document.getElementById('apiKey');
      if (inp.type === 'password') { inp.type = 'text'; btn.textContent = '隱藏'; }
      else { inp.type = 'password'; btn.textContent = '顯示'; }
    }

    function addTask(label, sub, state) {
      var list = document.getElementById('taskList');
      var node = document.createElement('div');
      node.className = 'task-node';
      node.id = 'task-' + label.replace(/\s/g,'');
      var dotClass = state === 'active' ? 'active' : state === 'done' ? 'done' : state === 'err' ? 'err' : '';
      node.innerHTML = '<div class="task-node-dot ' + dotClass + '"></div><div class="task-node-info"><div class="task-node-label">' + label + '</div><div class="task-node-sub">' + sub + '</div></div>';
      list.appendChild(node);
      return node;
    }

    function updateTask(id, sub, state) {
      var node = document.getElementById('task-' + id.replace(/\s/g,''));
      if (!node) return;
      var dot = node.querySelector('.task-node-dot');
      dot.className = 'task-node-dot' + (state ? ' ' + state : '');
      node.querySelector('.task-node-sub').textContent = sub;
    }

    function setStatus(msg, type, loading) {
      var block = document.getElementById('statusBlock');
      var badge = document.getElementById('statusBadge');
      var msgEl = document.getElementById('statusMsg');
      var empty = document.getElementById('emptyState');
      empty.style.display = 'none';
      block.style.display = 'block';
      block.className = 'status-block visible ' + (type || 'info');
      badge.className = 'status-badge ' + (type || 'info');
      badge.innerHTML = loading ? '<span class="spinner"></span>' : '';
      var labels = { info: '處理中', success: '完成', error: '錯誤', warning: '等待中' };
      badge.innerHTML += labels[type] || '處理中';
      msgEl.textContent = msg;
      document.getElementById('sideStatus').textContent = labels[type] || '處理中';
      var panelBadge = document.getElementById('panelBadge');
      panelBadge.className = 'status-badge ' + (type || 'info');
      panelBadge.textContent = labels[type] || '處理中';
    }

    async function generate() {
      var apiKey = document.getElementById('apiKey').value.trim();
      var prompt = document.getElementById('prompt').value.trim();
      var model = document.getElementById('model').value;
      var duration = parseInt(document.getElementById('duration').value);
      var aspect_ratio = document.getElementById('aspect_ratio').value;
      var resolution = document.getElementById('resolution').value;
      if (!apiKey) return setStatus('請輸入 API Key', 'error');
      if (!prompt) return setStatus('請輸入提示詞', 'error');

      var btn = document.getElementById('genBtn');
      btn.disabled = true;
      btn.textContent = '生成中...';
      document.getElementById('videoWrap').className = 'video-wrap';
      document.getElementById('taskList').innerHTML = '';

      addTask('提交任務', '正在傳送請求...', 'active');
      setStatus('正在提交影片生成請求...', 'info', true);

      try {
        var resp = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ apiKey, model, prompt, duration, aspect_ratio, resolution })
        });
        var data = await resp.json();
        if (!resp.ok) throw new Error(data.error || JSON.stringify(data));
        updateTask('提交任務', '已成功提交', 'done');

        var taskId = data.id || data.task_id;
        if (!taskId) {
          if (data.video_url) { showVideo(data.video_url); }
          else if (data.data && data.data[0] && data.data[0].url) { showVideo(data.data[0].url); }
          else { setStatus(JSON.stringify(data, null, 2), 'success'); }
          return;
        }

        addTask('輪詢狀態', 'Task ID: ' + taskId, 'active');
        setStatus('任務已提交，正在等待生成...\nTask ID: ' + taskId, 'warning', true);
        await pollStatus(apiKey, taskId, 0);
      } catch(e) {
        setStatus('錯誤：' + e.message, 'error');
        updateTask('提交任務', '失敗：' + e.message, 'err');
      } finally {
        btn.disabled = false;
        btn.textContent = '生成影片';
      }
    }

    async function pollStatus(apiKey, taskId, attempt) {
      if (attempt > 60) {
        setStatus('超時：請稍後手動查詢\nTask ID: ' + taskId, 'error');
        updateTask('輪詢狀態', '超時', 'err');
        return;
      }
      try {
        var resp = await fetch('/api/status?task_id=' + encodeURIComponent(taskId) + '&apiKey=' + encodeURIComponent(apiKey));
        var data = await resp.json();
        var status = data.status || data.state;
        if (status === 'succeeded' || status === 'completed' || status === 'success') {
          var url = data.video_url || (data.output && data.output.video_url) || (data.data && data.data[0] && data.data[0].url);
          updateTask('輪詢狀態', '生成完成', 'done');
          addTask('影片就緒', url ? url.substring(0, 40) + '...' : '已完成', 'done');
          if (url) showVideo(url);
          else setStatus(JSON.stringify(data, null, 2), 'success');
          return;
        }
        if (status === 'failed' || status === 'error') {
          setStatus('生成失敗：' + JSON.stringify(data), 'error');
          updateTask('輪詢狀態', '失敗', 'err');
          return;
        }
        var progress = data.progress ? ' (' + data.progress + '%)' : '';
        setStatus('狀態：' + (status || '處理中') + progress + '\n已等待 ' + (attempt * 5) + ' 秒...', 'warning', true);
        updateTask('輪詢狀態', '狀態：' + (status || '處理中') + progress, 'active');
        await new Promise(function(r){ setTimeout(r, 5000); });
        await pollStatus(apiKey, taskId, attempt + 1);
      } catch(e) {
        setStatus('輪詢錯誤：' + e.message, 'error');
      }
    }

    function showVideo(url) {
      var videoEl = document.getElementById('videoEl');
      var dlLink = document.getElementById('downloadLink');
      videoEl.src = url;
      dlLink.href = url;
      document.getElementById('videoWrap').className = 'video-wrap visible';
      setStatus('影片生成成功！', 'success');
      genCount++;
      document.getElementById('sideCount').textContent = genCount;
      document.getElementById('sideStatus').textContent = '完成';
    }

    updateSidebar();
  </script>
</body>
</html>`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const API_BASE = (env.API_BASE_URL || 'https://ai.ezif.in/v1');

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      });
    }

    if (url.pathname === '/' || url.pathname === '') {
      return new Response(HTML_PAGE, {
        headers: { 'Content-Type': 'text/html;charset=UTF-8' }
      });
    }

    if (url.pathname === '/api/generate' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { apiKey, model, prompt, duration, aspect_ratio, resolution } = body;
        if (!apiKey || !prompt) {
          return jsonResponse({ error: 'Missing apiKey or prompt' }, 400);
        }
        const payload = { model, prompt, duration, aspect_ratio, resolution };
        const genUrl = API_BASE + '/videos/generations';
        const resp = await fetch(genUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
          },
          body: JSON.stringify(payload)
        });
        const data = await resp.json();
        return jsonResponse(data, resp.status);
      } catch (e) {
        return jsonResponse({ error: e.message }, 500);
      }
    }

    if (url.pathname === '/api/status' && request.method === 'GET') {
      const taskId = url.searchParams.get('task_id');
      const apiKey = url.searchParams.get('apiKey');
      if (!taskId || !apiKey) {
        return jsonResponse({ error: 'Missing task_id or apiKey' }, 400);
      }
      try {
        const statusUrl = API_BASE + '/videos/generations/' + taskId;
        const resp = await fetch(statusUrl, {
          headers: { 'Authorization': 'Bearer ' + apiKey }
        });
        const data = await resp.json();
        return jsonResponse(data, resp.status);
      } catch (e) {
        return jsonResponse({ error: e.message }, 500);
      }
    }

    return new Response('Not Found', { status: 404 });
  }
};

function jsonResponse(data, status) {
  status = status || 200;
  return new Response(JSON.stringify(data), {
    status: status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
