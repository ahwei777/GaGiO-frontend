# Learning Platform Frontend

## 資料夾結構

```
├── src/
│  ├── containers/              # 放置與 Redux 連接的相關元件
│  ├── components/              # 放置與 Redux 無關的相關元件
│  ├── redux/                   # 放置 Redux store & reducers
│  ├── constants/               # 放置不會頻繁改動的設定如 theme, breakpoints
│  ├── styles/                  # 放置樣式檔
│  ├── index.js                 # 程式入口
│  ├── serviceWorker.js
│  └── setupTests.js            # 測試相關設定
├── public/img                  # 放置靜態檔如圖片
├── package-lock.json
├── package.json                # module 設定檔
└── README.md
```

## Design System

[Figma](https://www.figma.com/file/4nUkuhNTToWoDDrTcVG1Xh/Lidemy-Final-Project-%E8%A8%8E%E8%AB%96?node-id=109%3A10039)

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

---

### Typography

#### Type scale

參考 Google 的 Material Design
![](https://lh3.googleusercontent.com/GhGMLbfqPXdUgmnflT52VWNSned4U5jLOpTIXZWEDQfwvZGZC2EI0iO0wKxptigoYW79v2PhIdmjTjWDgfdHF8TzcldhSc9pA4BBLhE=w1064-v0)

#### Fonts

- 中文
  - Noto Sans TC
- 英文
  - Roboto

`font-family: Noto Sans TC, Roboto, arial, sans-serif`

---

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
