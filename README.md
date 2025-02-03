# 🌟 心記 Emory

## 📌 簡介

`心記` 是一款專為行動端設計的 `Web 應用`，讓使用者可以每天記錄自己的心情狀態，並透過圖表分析查看自己的心情曲線，幫助用戶更好地了解和管理自己的情緒。讓你天天都能心記！

[Demo](<https://emory-brown.vercel.app/>)
## 🎯 功能特性

- 📖 **日記記錄**：允許用戶每天添加心情日記，包含文字、圖片等。
- 🎭 **心情標籤**：可選擇不同的心情標籤來標註當天的情緒。
- 📅 **客製化日曆**：提供專屬的日曆視圖，讓用戶輕鬆回顧過去的心情變化。
- 📊 **數據分析**：利用 `Chart.js` 可視化展示用戶的心情曲線與趨勢。
- 🔐 **三方登入**：支援 `Google 登入`，透過 `Firebase Authentication` 進行用戶管理。

## 🛠️ 技術棧

### 🚀 前端
- **框架**：`Vue 3`
- **狀態管理**：`Pinia`
- **路由管理**：`Vue Router`
- **UI 框架**：`Vant UI` + `TailwindCSS`
- **格式化工具**：`ESLint`
- **數據圖表**：`Chart.js`


### 📡 後端與數據
- **數據存儲**：`Firebase Firestore`、`Storage`
- **身份驗證**：`Firebase Authentication`（支援 `Google 登入`）

### 🔧 其他
- **構建工具**：`Vite`
- **程式碼管理**：`Git` + `GitHub`
- **部署平台**：`Vercel` 

## 🚀 安裝與運行

### ⚙️ 環境要求

- `Node.js`（推薦版本 `16+`）
- `npm` / `yarn` / `pnpm`

### 📦 安裝依賴

```sh
npm install  # 或 yarn install / pnpm install
```

### 🛠️ 設定 Firebase 環境變數

在專案根目錄建立 `.env` 檔案，並填入以下內容（請替換為你的 Firebase 設定值）：

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 🏃 本地開發

```sh
npm run dev  # 或 yarn dev / pnpm dev
```
