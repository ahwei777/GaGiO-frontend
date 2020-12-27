# Learning Platform Frontend （開發中）

## 簡介

此專案的主題為線上教育平台

使用者可以：

- 註冊及登入
- 修改會員資料
- 課程加入購物車
- 購買課程
- 觀看購買課程

管理員可以：

- 製作課程
- 改變使用者權限

此為前端 repo，後端部分請見 [後端 repo](https://github.com/SimonOneNineEight/learning-platform-backend)。

### 開發者（按照 ID 字首排序）

- [ahwei777 (ahwei)](https://github.com/ahwei777)
- [SimonOneNineEight](https://github.com/SimonOneNineEight)
- [YSKuo (Arsene Kuo)](https://github.com/YSKuo)

### Tool

- React
- React-Router
- Redux
- styled-components
- nanoid
- react-beautiful-dnd
- ant design
- prettier

---

## 網頁結構

```
├── Homepage
│  └── 後台管理(ConsolePage)                      # 管理功能的源頭
│     ├── 課程列表(ConsoleCoursesPage)            # 列出該使用者目前所有課程
│     │  ├── 新增課程(NewCoursePage)              # 在此頁面新增課程
│     │  └── 課程管理(ManageCoursePage)           # 特定課程的管理頁面
│     │     ├── 課程設定(CourseSettingPage)       # 編輯課程名稱、金額、狀態等等
│     │     └── 編輯單元(EditUnitPage)            # 特定單元的管理頁面
│     └── 會員管理(ConsoleMemberPage)             # 列出所有網站所有會員
│        └── 會員資料(MemberDetailPage)           # 特定會員的詳細資料

```

## 資料夾結構

```
├── src/
│  ├── containers/              # [暫時]放置各 Routes
│  ├── pages/                   # 放置各完整功能頁面
│  ├── components/              # 放置跨頁面共用元件
│  ├── redux/                   # 放置 Redux store & reducers
│  ├── constants/               # 放置不會頻繁改動的設定如 theme, breakpoints
│  ├── styles/                  # 放置樣式檔
│  ├── index.js                 # 程式入口
│  ├── serviceWorker.js
│  └── setupTests.js            # 測試相關設定
├── public/img                  # 放置靜態檔如圖片
├── WebApi.js                   # 串接後端 API
├── utils.js                    # 放置功能或跨元件使用函式
├── package-lock.json
├── package.json                # module 設定檔
└── README.md
```

## Design System

[Figma](https://www.figma.com/file/4nUkuhNTToWoDDrTcVG1Xh/Lidemy-Final-Project-%E8%A8%8E%E8%AB%96?node-id=109%3A10039)

### UI library

[Ant Design - The world's second most popular React UI framework](https://ant.design/)

### Color

- Primary
  - main: #689f38
  - light: #99d066
  - dark: #387002
  - text: #000000
- Secondary
  - main: #fff59d
  - light: #ffffcf
  - dark: #cbc26d
  - text: #000000

### Typography

#### Fonts

- 中文
  - Noto Sans TC
- 英文
  - Roboto

`font-family: Noto Sans TC, Roboto, arial, sans-serif`

### Layout

#### Breakpoints

參考 [Breakpoints · Bootstrap v5.0](https://getbootstrap.com/docs/5.0/layout/breakpoints/)

| Breakpoint        | Class infix | Dimensions |
| ----------------- | ----------- | ---------- |
| X-Small           | None        | <576px     |
| Small             | sm          | ≥576px     |
| Medium            | md          | ≥768px     |
| Large             | lg          | ≥992px     |
| Extra large       | xl          | ≥1200px    |
| Extra extra large | xxl         | ≥1400px    |
