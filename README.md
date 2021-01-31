# GaGiO Learning Platform - Frontend

![]()

> 網站連結 : https://gagio.ahwei777.tw  
> 此為前端程式碼，後端部分請見 [GaGiO-backend](https://github.com/ahwei777/GaGiO-backend)。

此專案接續開發自 [learning-platform-frontend](https://github.com/YSKuo/learning-platform-frontend) ，原團隊成員如下：  
- [YSKuo](https://github.com/YSKuo) （前端 & UI/UX）
- [Simon198](https://github.com/SimonOneNineEight) （前端 & 後端 ）

## 索引
- [簡介](#簡介)
- [功能介紹](#功能介紹)
- [使用技術](#使用技術)
- [部署平台](#部署平台)
- [Demo](#Demo)
- [專案架構](#專案架構)
- [DesignSystem](#DesignSystem)
- [專案安裝流程](#專案安裝流程)
- [聲明](#聲明)
- [版本紀錄](#版本紀錄)
- [資料引用來源](#資料引用來源)

## 簡介

此作品為 [Lidemy mentor-program-4th](https://github.com/Lidemy/mentor-program-4th) 的 Final Project ，主要為實作課程所學前後端相關技術。前端採用 React.js 開發，配合以 Express.js & Sequelize 建立的後端 API 實現前後端分離。 

## 功能介紹

### 訪客
- 註冊會員
- 瀏覽已公開課程（關鍵字搜尋、自訂排序）
- 瀏覽老師介紹資訊

### 會員
- 登入
- 編輯會員資料
- 加入課程至購物車
- 購買課程並結帳
- 觀看已購買課程
- 查看已完成訂單

### 老師
- 新增/編輯課程（上傳課程縮圖）
- 編輯老師介紹資訊（上傳大頭照）

### 管理員
- 瀏覽所有課程
- 編輯所有會員權限
- 瀏覽所有會員資料及已購買課程

## 使用技術
- 前端框架
    - React Hooks
- UI 框架
    - [Ant Design](https://ant.design/)
- 其他套件
    - Antd-img-crop - 圖片上傳前裁切
    - React Router - 管理路由
    - Redux Toolkit - 管理元件共用狀態，處理非同步邏輯
    - React-beautiful-dnd - 實現元素拖拉排序
    - React-responsive-carousel - 首頁橫幅圖片輪播
    - React-youtube - 內崁播放 Youtube 影片
    - styled-components - 主題配置/動態變更樣式
    - prettier - 統一程式碼格式
- 第三方 API
    - Imgur - 圖片雲端儲存
- RWD - 網頁排版自適應主要瀏覽器

## 部署平台

前端部署於 GitHub Page 並配合自訂網域，同時將 404 page 改為 index.html ，避免子頁面重新整理後因無指定靜態資源而產生錯誤，實現完整 SPA。 

## DEMO

### 搜尋課程
可以關鍵字搜尋課程，並自訂排序方式。

![](https://github.com/ahwei777/for-GaGiO-README/blob/main/01.%E6%90%9C%E5%B0%8B%E8%AA%B2%E7%A8%8B.gif?raw=true)

### 會員資料變更
會員可更改暱稱及密碼。

![](https://github.com/ahwei777/for-GaGiO-README/blob/main/02.%E6%9B%B4%E6%94%B9%E6%9C%83%E5%93%A1%E8%B3%87%E6%96%99.gif?raw=true)

### 購物車及結帳
欲購買課程可選擇加入購物車或直接結帳，完成結帳後會收到訂單資訊，並可於訂單紀錄中查看。

![](https://github.com/ahwei777/for-GaGiO-README/blob/main/03.%E8%B3%BC%E7%89%A9%E8%BB%8A%E5%8F%8A%E7%B5%90%E5%B8%B3.gif?raw=true)

### 影片學習
已購買課程可於 "我的課程" 頁面中查看並進入上課，教材包含文字或影片（暫以 YouTube 影片做為 DEMO ）。

![](https://github.com/ahwei777/for-GaGiO-README/blob/main/04.%E5%BD%B1%E7%89%87%E5%AD%B8%E7%BF%92.gif?raw=true)

### 開設課程
一般會員申請開課後即可新增課程，老師及課程資料都可再進行修改。

![](https://github.com/ahwei777/for-GaGiO-README/blob/main/05.%E9%96%8B%E8%A8%AD%E8%AA%B2%E7%A8%8B.gif?raw=true)

## 專案架構

### 檔案結構
```
├── Homepage                                     
│  ├── RegisterPage             # 註冊
│  ├── LoginPage                # 登入
│  ├── CourseListPage           # 所有課程列表
│  ├── CourseInfoPage           # 特定課程介紹
│  ├── CartListPage             # 購物車
│  ├── CheckoutPage             # 結帳
│  ├── MyCoursePage             # 我的課程
│  ├── MePage                   # 帳號設定
│  │  ├── AccountSetting           # 個人資料（變更暱稱/密碼）
│  │  └── OrderHistory             # 訂單紀錄
│  ├── TeacherInfoPage          # 老師介紹
│  ├── TeacherApplyPage         # 申請開課（上傳大頭照）
│  ├── TeacherPage              # 老師後台
│  │  ├── TeacherSetting           # 老師資料（變更名稱/介紹/大頭照）
│  │  └── MyTeachCourse            # 課程管理
│  │     ├── NewCourse                # 新增課程
│  │     └── UpdateCourse             # 編輯特定課程（變更狀態/名稱/金額/敘述），新增/刪除單元
│  │        └── EditUnit                 # 編輯特定單元（變更名稱/敘述）
│  └── ConsolePage              # 管理後台
│     ├── ConsoleCoursesPage       # 課程列表
│     └── ConsoleMemberPage        # 會員管理
│        └── MemberDetailPage         # 特定會員資料（變更權限）
```

### 資料夾結構
```
├── src/
│  ├── components/              # 放置跨頁面共用元件
│  ├── constants/               # 放置常態設定如 theme, breakpoints
│  ├── img/                     # 放置各頁面所使用圖片
│  ├── pages/                   # 放置具完整功能頁面
│  ├── redux/                   # 放置 Redux store & reducers
│  ├── routes/                  # 放置主要路由及各子路由
│  ├── WebAPI/                  # 串接後端 API
│  ├── App.css                  # 設定通用樣式及修正 UI
│  ├── App.js                   # 設定主要 layout 及路由
│  ├── index.js                 # 程式主要入口點
│  ├── setupTests.js            # 測試相關設定
│  ├── WebApi.js                # 串接後端 API
│  └── utils.js                 # 放置跨元件使用函式
├── package-lock.json
├── package.json                # module 及 script 設定
└── README.md
```

## DesignSystem

### [UserStory](https://hackmd.io/@ahwei777/ByoNAUe2P)

### [Wireframe](https://www.figma.com/file/4nUkuhNTToWoDDrTcVG1Xh/Lidemy-Final-Project-%E8%A8%8E%E8%AB%96?node-id=109%3A10039)

### Color
- Primary
  - main: #3483cd
  - light: #70b2ff
  - dark: #00579c
  - text: #000000
- Secondary
  - main: #f89f3c
  - light: #ffd06c85
  - dark: #c07000
  - text: #000000

### Breakpoints

| Breakpoint        | Class infix | Dimensions |
| ----------------- | ----------- | ---------- |
| X-Small           | xs          | <576px     |
| Small             | sm          | ≥576px     |
| Medium            | md          | ≥768px     |
| Large             | lg          | ≥992px     |
| Extra large       | xl          | ≥1200px    |

## 專案安裝流程

1. clone 此專案至本機
``` 
$ git clone https://github.com/ahwei777/GaGiO-frontend.git
```

2. 安裝相依套件
```
$ npm install
```

3. 在本機運行專案（預設 port:3000）
```
$ npm run start
```

## 聲明
本專案僅作為個人練習用途，註冊時請勿使用任何真實資料。另本作品所包含之圖片與內容不作任何商業用途使用。

[MIT](https://choosealicense.com/licenses/mit/)

## 資料引用來源

- LOGO 設計 - [Freelogodesign](https://www.freelogodesign.org), [Favicon.io](https://favicon.io/)
- DEMO 圖片 - [Pixabay](https://pixabay.com/), [Pexels](https://www.pexels.com/), [Unsplash](https://unsplash.com/), [Freepik](https://www.freepik.com)
- DEMO 課程內容 - [MDN web docs](https://developer.mozilla.org/zh-CN/), [Wikipedia](https://zh.wikipedia.org/), [YouTube](https://www.youtube.com/), [Lidemy 程式導師計畫](https://bootcamp.lidemy.com/)

## 版本紀錄

- 1.0 - 2021.01.28
	- 完成基本功能