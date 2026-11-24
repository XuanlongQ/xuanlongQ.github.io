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

新闻条目的写法是 `[MM/YYYY]: 内容`,页面加载时会自动把日期渲染成徽章,例如:

```html
<li>[10/2026]: 新闻内容……</li>
```

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
