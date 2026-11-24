# Xuanlong QIN — 学术主页(纯静态)

本站是纯静态站点:**不需要 Hexo、Node 或任何构建步骤**。GitHub Pages 直接从 `master` 分支根目录提供服务,推送到仓库即发布。

## 目录结构

| 路径 | 内容 |
| --- | --- |
| `index.html` | 首页(About me / Research Interests / News / Others) |
| `Media/index.html` | Social Media 页 |
| `Others/index.html` | Relevant Materials 页 |
| `Home/`, `Research/`, `Publications/` | 早期页面,目前未出现在导航栏,内容原样保留 |
| `css/`, `js/`, `img/`, `attaches/` | 本地资源;第三方库(jQuery、pjax、Font Awesome)均已本地化,不依赖 CDN |
| `404.html` | 自定义 404 页 |
| `2024/03/11/hello-world/` | 旧文章链接,自动跳转到首页 |

## 修改内容

直接用编辑器修改对应 `index.html` 里的文字即可,保存后刷新浏览器就能看到。

新闻条目的写法是 `[MM/YYYY]: 内容`,页面加载时会自动把方括号里的日期渲染成左侧日期列,例如:

```html
<li>[10/2026]: 新闻内容……</li>
```

## 换头像

头像文件是 `img/portraits.png`(黑白线稿,1024×1024),页面上显示为圆形;加载失败时回退到 `img/profile.png`。替换时保持文件名不变即可,建议使用正方形图片(边长 600–1024px)。

显示尺寸在 `css/user.css` 的 `.author-avatar`(桌面 176px)和 `@media (max-width: 60em)`(手机 104px)里调整。

## 访客统计

页脚的世界地图计数器来自 [Flag Counter](https://flagcounter.com/):免注册、按国家累计访客,国旗会直接标在地图上,底部显示收集到的国旗数和 pageviews。它是第三方图片,不依赖 JavaScript。

- 图片 URL 在每页的 `.visitor-badge` 里,当前计数器 ID 是 `xqlongqin2026`
- 地图地址:`.../map/xqlongqin2026/size_s/txt_333333/border_FFFFFF/pageviews_1/viewers_0/`
- 可调参数:`size_s`/`size_m`/`size_l` 尺寸、`txt_333333` 文字色、`border_FFFFFF` 边框色;换 ID 或样式直接改 URL
- 如果所在网络访问不了 flagcounter.com,地图可能不显示

## 调整样式

当前是**平铺 / 嵌入式**排版:没有卡片、阴影、圆角和胶囊标签,内容直接排在页面上。

- `css/index.css` — 基础样式(字体、布局、深色模式变量)
- `css/user.css` — 平铺样式的覆盖层,在 `index.css` 之后加载;想改视觉效果优先改这里
- `js/main.js` — 深色模式切换、新闻日期渲染、pjax 导航

改完后刷新即可,不需要任何构建步骤。

## 本地预览

```bash
cd site
python3 -m http.server 4000
```

打开 <http://localhost:4000/>。访问子页面时请在结尾加斜杠,如 `/Media/`、`/Others/`(与 GitHub Pages 的行为一致)。

## 发布

```bash
git add -A
git commit -m "Update content"
git push
```

推送后约 1 分钟,GitHub Pages 会自动更新 <https://xuanlongq.github.io/>。

## 说明

- 旧 Hexo 工程保存在本地 `../blog` 目录,仅作存档,不再参与发布;本仓库的 HTML 才是站点唯一来源。
- 请保持资源引用为本地路径(`/css/…`、`/js/…`),不要改回 CDN,以保证中国大陆访问稳定。
- `.nojekyll` 用于关闭 GitHub Pages 的 Jekyll 处理,请勿删除。
