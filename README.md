# 🎬 Grok 影片生成器

> 使用 [ai.ezif.in](https://ai.ezif.in) API，部署於 Cloudflare Workers 的影片生成 Web App

## 功能
- 支援 `grok-video-normal` 和 `grok-imagine-video` 兩種模型
- 前端介面直接輸入 API Key（不儲存於伺服器）
- 自動輪詢任務狀態，完成後顯示影片並可下載
- 支援設定時長、畫面比例、解析度

## 快速部署

```bash
# 1. Clone
git clone https://github.com/kinai9661/grok-video-generator
cd grok-video-generator

# 2. 安裝依賴
npm install

# 3. 本地測試
npm run dev

# 4. 部署到 Cloudflare Workers
npm run deploy
```

## API 端點

| 路徑 | 方法 | 說明 |
|------|------|------|
| `/` | GET | 前端介面 |
| `/api/generate` | POST | 提交影片生成任務 |
| `/api/status` | GET | 查詢任務狀態 |

## 環境變數

`API_BASE_URL` 已在 `wrangler.toml` 中設定為 `https://ai.ezif.in/v1`

API Key 由使用者在前端輸入，不需要設定 secret。
