const HTML_PAGE = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>🎬 Grok 影片生成器</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
      min-height: 100vh;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px 16px;
    }
    h1 { font-size: 2.2rem; margin-bottom: 8px; background: linear-gradient(90deg,#a78bfa,#38bdf8); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
    p.sub { color: #94a3b8; margin-bottom: 32px; font-size: 0.95rem; }
    .card {
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 16px;
      padding: 32px;
      width: 100%;
      max-width: 680px;
      backdrop-filter: blur(12px);
    }
    label { display: block; font-size: 0.85rem; color: #94a3b8; margin-bottom: 6px; margin-top: 18px; }
    label:first-child { margin-top: 0; }
    input, select, textarea {
      width: 100%;
      padding: 10px 14px;
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,0.15);
      background: rgba(255,255,255,0.08);
      color: #fff;
      font-size: 0.95rem;
      outline: none;
      transition: border 0.2s;
    }
    input:focus, select:focus, textarea:focus { border-color: #a78bfa; }
    textarea { resize: vertical; min-height: 90px; }
    select option { background: #302b63; }
    .row { display: flex; gap: 12px; }
    .row > div { flex: 1; }
    button {
      width: 100%;
      margin-top: 24px;
      padding: 14px;
      border-radius: 12px;
      border: none;
      background: linear-gradient(90deg, #7c3aed, #2563eb);
      color: #fff;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: opacity 0.2s, transform 0.1s;
    }
    button:hover { opacity: 0.9; transform: translateY(-1px); }
    button:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
    #status {
      margin-top: 20px;
      padding: 14px 18px;
      border-radius: 10px;
      background: rgba(255,255,255,0.07);
      font-size: 0.9rem;
      display: none;
      white-space: pre-wrap;
      word-break: break-all;
    }
    #status.error { border-left: 3px solid #f87171; color: #fca5a5; }
    #status.info  { border-left: 3px solid #38bdf8; color: #bae6fd; }
    #status.success { border-left: 3px solid #4ade80; color: #bbf7d0; }
    #video-result { margin-top: 24px; display: none; text-align: center; }
    #video-result video { width: 100%; border-radius: 12px; max-height: 400px; background:#000; }
    #video-result a {
      display: inline-block;
      margin-top: 12px;
      padding: 10px 24px;
      background: rgba(74,222,128,0.15);
      border: 1px solid #4ade80;
      border-radius: 8px;
      color: #4ade80;
      text-decoration: none;
      font-size: 0.9rem;
    }
    .spinner {
      display: inline-block;
      width: 16px; height: 16px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: #fff;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin-right: 8px;
      vertical-align: middle;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .api-key-wrap { position: relative; }
    .toggle-key {
      position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
      background: none; border: none; color: #94a3b8; cursor: pointer;
      font-size: 0.8rem; width: auto; margin: 0; padding: 4px 8px;
    }
  </style>
</head>
<body>
  <h1>🎬 Grok 影片生成器</h1>
  <p class="sub">由 ai.ezif.in API 驅動 · 部署於 Cloudflare Workers</p>

  <div class="card">
    <label>API Key</label>
    <div class="api-key-wrap">
      <input type="password" id="apiKey" placeholder="輸入你的 API Key" />
      <button class="toggle-key" onclick="toggleKey()">顯示</button>
    </div>

    <label>模型</label>
    <select id="model">
      <option value="grok-video-normal">grok-video-normal（標準）</option>
      <option value="grok-imagine-video">grok-imagine-video（高品質）</option>
    </select>

    <label>提示詞 (Prompt)</label>
    <textarea id="prompt" placeholder="描述你想生成的影片內容，例如：A cat walking across a sunny garden"></textarea>

    <div class="row">
      <div>
        <label>時長 (秒)</label>
        <select id="duration">
          <option value="5">5 秒</option>
          <option value="10">10 秒</option>
        </select>
      </div>
      <div>
        <label>畫面比例</label>
        <select id="aspect_ratio">
          <option value="16:9">16:9 橫向</option>
          <option value="9:16">9:16 直向</option>
          <option value="1:1">1:1 方形</option>
        </select>
      </div>
      <div>
        <label>解析度</label>
        <select id="resolution">
          <option value="720p">720p</option>
          <option value="1080p">1080p</option>
        </select>
      </div>
    </div>

    <button id="genBtn" onclick="generate()">✨ 生成影片</button>

    <div id="status"></div>
    <div id="video-result">
      <video id="videoEl" controls></video>
      <br/>
      <a id="downloadLink" download="grok-video.mp4">⬇ 下載影片</a>
    </div>
  </div>

  <script>
    function toggleKey() {
      const inp = document.getElementById('apiKey');
      const btn = event.target;
      if (inp.type === 'password') { inp.type = 'text'; btn.textContent = '隱藏'; }
      else { inp.type = 'password'; btn.textContent = '顯示'; }
    }

    function setStatus(msg, type='info', loading=false) {
      const el = document.getElementById('status');
      el.style.display = 'block';
      el.className = type;
      el.innerHTML = loading ? '<span class="spinner"></span>' + msg : msg;
    }

    async function generate() {
      const apiKey = document.getElementById('apiKey').value.trim();
      const prompt = document.getElementById('prompt').value.trim();
      const model = document.getElementById('model').value;
      const duration = parseInt(document.getElementById('duration').value);
      const aspect_ratio = document.getElementById('aspect_ratio').value;
      const resolution = document.getElementById('resolution').value;

      if (!apiKey) return setStatus('⚠️ 請輸入 API Key', 'error');
      if (!prompt) return setStatus('⚠️ 請輸入提示詞', 'error');

      const btn = document.getElementById('genBtn');
      btn.disabled = true;
      document.getElementById('video-result').style.display = 'none';
      setStatus('🚀 正在提交影片生成請求...', 'info', true);

      try {
        const resp = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ apiKey, model, prompt, duration, aspect_ratio, resolution })
        });
        const data = await resp.json();
        if (!resp.ok) throw new Error(data.error || JSON.stringify(data));

        const taskId = data.id || data.task_id;
        if (!taskId) {
          // Synchronous response with video URL
          if (data.video_url || (data.data && data.data[0] && data.data[0].url)) {
            const url = data.video_url || data.data[0].url;
            showVideo(url);
          } else {
            setStatus('✅ 回應：\n' + JSON.stringify(data, null, 2), 'success');
          }
          return;
        }

        setStatus('⏳ 任務已提交 (ID: ' + taskId + ')，正在輪詢結果...', 'info', true);
        await pollStatus(apiKey, taskId);
      } catch(e) {
        setStatus('❌ 錯誤：' + e.message, 'error');
      } finally {
        btn.disabled = false;
      }
    }

    async function pollStatus(apiKey, taskId, attempt=0) {
      if (attempt > 60) {
        setStatus('⌛ 超時：影片生成時間過長，請稍後手動查詢 Task ID: ' + taskId, 'error');
        return;
      }
      try {
        const resp = await fetch('/api/status?task_id=' + encodeURIComponent(taskId) + '&apiKey=' + encodeURIComponent(apiKey));
        const data = await resp.json();
        const status = data.status || data.state;

        if (status === 'succeeded' || status === 'completed' || status === 'success') {
          const url = data.video_url || (data.output && data.output.video_url) || (data.data && data.data[0] && data.data[0].url);
          if (url) showVideo(url);
          else setStatus('✅ 完成：\n' + JSON.stringify(data, null, 2), 'success');
          return;
        }
        if (status === 'failed' || status === 'error') {
          setStatus('❌ 生成失敗：' + JSON.stringify(data), 'error');
          return;
        }
        const progress = data.progress ? ' (' + data.progress + '%)' : '';
        setStatus('⏳ 狀態：' + (status||'處理中') + progress + '\n已等待 ' + (attempt*5) + ' 秒...', 'info', true);
        await new Promise(r => setTimeout(r, 5000));
        await pollStatus(apiKey, taskId, attempt+1);
      } catch(e) {
        setStatus('❌ 輪詢錯誤：' + e.message, 'error');
      }
    }

    function showVideo(url) {
      const videoEl = document.getElementById('videoEl');
      const dlLink = document.getElementById('downloadLink');
      videoEl.src = url;
      dlLink.href = url;
      document.getElementById('video-result').style.display = 'block';
      setStatus('✅ 影片生成成功！', 'success');
    }
  </script>
</body>
</html>`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const API_BASE = env.API_BASE_URL || 'https://ai.ezif.in/v1';

    // Serve frontend
    if (url.pathname === '/' || url.pathname === '') {
      return new Response(HTML_PAGE, {
        headers: { 'Content-Type': 'text/html;charset=UTF-8' }
      });
    }

    // POST /api/generate
    if (url.pathname === '/api/generate' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { apiKey, model, prompt, duration, aspect_ratio, resolution } = body;

        if (!apiKey || !prompt) {
          return jsonResponse({ error: 'Missing apiKey or prompt' }, 400);
        }

        const payload = { model, prompt, duration, aspect_ratio, resolution };
        const resp = await fetch(`${API_BASE}/videos/generations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify(payload)
        });

        const data = await resp.json();
        return jsonResponse(data, resp.status);
      } catch (e) {
        return jsonResponse({ error: e.message }, 500);
      }
    }

    // GET /api/status?task_id=xxx&apiKey=xxx
    if (url.pathname === '/api/status' && request.method === 'GET') {
      const taskId = url.searchParams.get('task_id');
      const apiKey = url.searchParams.get('apiKey');

      if (!taskId || !apiKey) {
        return jsonResponse({ error: 'Missing task_id or apiKey' }, 400);
      }

      try {
        const resp = await fetch(`${API_BASE}/videos/generations/${taskId}`, {
          headers: { 'Authorization': `Bearer ${apiKey}` }
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

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
