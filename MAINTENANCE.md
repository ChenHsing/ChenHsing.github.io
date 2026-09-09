# 维护说明

改造目标：**内容与样式彻底分离**。以后更新主页，绝大多数情况只需要改 `_data/` 里的 YAML，不再碰 HTML 和 CSS。

---

## 一、日常更新：只改 `_data/`

| 文件 | 对应首页区块 |
| --- | --- |
| `_data/profile.yml` | About Me 自我介绍、研究兴趣、联系入口、统计徽章；`links` 控制**左侧信息卡**的邮箱 / 学者主页 / GitHub 等入口 |
| `_config.yml` → `author` | 信息卡里的姓名、头像、一句话简介、所在地（其余社交字段已废弃） |
| `_data/news.yml` | News 时间线 |
| `_data/publications.yml` | Publications（Selected / Other 两段） |
| `_data/honors.yml` | Honors and Awards |
| `_data/talks.yml` | Invited Talks |
| `_data/experience.yml` | Internships |
| `_data/service.yml` | Academic Service（会议 PC / 期刊审稿） |
| `_data/navigation.yml` | 顶部导航（锚点需与 section id 一致） |

### 加一篇论文

在 `_data/publications.yml` 的 `selected:` 下复制一段即可（有封面图就填 `image`，没有就删掉这行，卡片会自动变成纯文字）：

```yaml
  - title: "论文标题"
    authors: "A, B, **Zhen Xing**<sup>†</sup>, C"   # **加粗**表示自己，† 项目负责人，* 共同一作
    venue: "CVPR"                                   # 用于生成彩色 badge（自动配色）
    venue_full: "IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)"
    year: 2026
    image: "/images/xxx.png"                        # 可选
    tags: ["Video Generation"]                      # 可选，显示在图片左上角
    links:
      - name: "Paper"
        url: "https://arxiv.org/abs/xxxx"
      - name: "Code"
        url: "https://github.com/xxx"
    note: "可选：一句话亮点，如 GitHub star 数"        # 可选
```

`Other Publications` 段只需要 `title / authors / venue / year / links`，渲染成紧凑列表。

### 加一条 News

```yaml
  - date: "Jul 2026"
    text: "🎈Achieved **1300+** citations on Google Scholar."
```

`text` 支持 Markdown 加粗与链接。列表从上到下渲染，新的放最上面。

### 加荣誉 / 报告 / 实习 / 学术服务

同理，对应文件里加几行即可，字段含义见各文件顶部注释。

### 改侧栏（头像 / 姓名 / 链接）

- 姓名、头像、简介、所在地：`_config.yml` 的 `author` 段。
- 邮箱、Google Scholar、GitHub 等入口：`_data/profile.yml` 的 `links`，一行一个：

```yaml
links:
  - name: "Google Scholar"
    url: "https://scholar.google.com/citations?user=..."
    icon: "ai ai-fw ai-google-scholar"   # Font Awesome / academicons 图标 class
```

---

## 二、配色与主题

- 浅色 / 深色**双主题**，默认跟随系统 `prefers-color-scheme`，右上角按钮可手动切换，选择记在 `localStorage`。
- 所有颜色集中在 **`_sass/_theme.scss`** 的 `palette-light` / `palette-dark` 两个 mixin 里，改配色只改这里。
- 其余所有样式（论文卡片、badge、时间线等）都在 **`_sass/_components.scss`**，只用 CSS 变量、不写死颜色。
- `venue` badge 的颜色按会议类型自动匹配（顶会蓝 / 图形学紫 / 期刊绿 / 预印本灰），映射规则在 `_includes/venue-badge.html`。

### 相关文件

```
_sass/_theme.scss      主题色板 + 主题衔接
_sass/_components.scss 首页各区块组件样式
_sass/_variables.scss  全局变量（字体、字号、断点）
assets/js/theme.js     主题切换逻辑
assets/js/site.js      News / Other Publications 的 More 展开收起 + 头像放大浮层 + 站外链接新标签
```

### 交互组件（改样式时注意）

- **News「More」**：默认显示前 5 条，其余带 `.is-hidden`，点击按钮给 `.timeline` 加 `.is-expanded`。
- **Other Publications「More」**：`venue` 不在 ECCV / CVPR / EMNLP / NeurIPS / ACL 之内的条目进 `#pub-list-more`（`.pub-list--more`，默认 `display:none`），点 More 加 `.is-expanded`。想调整默认展示的会议列表，改 `_includes/sections/publications.html` 顶部的 `visible_venues`。
- **头像放大**：头像是个 `<button>`，点击打开 `<dialog class="avatar-lightbox">`。该 dialog 已显式声明 `&:not([open]) { display: none; }`，删样式时不要去掉这条。
- **右上角主题切换按钮**：放在 `.masthead__menu` 内、`<nav id="site-nav">` **外面**。不要把它移回 nav 里——greedy-nav 的 JS（main.min.js）会用 `#site-nav button` 选中所有按钮当汉堡菜单处理（加 `hidden` 类、劫持点击），`.greedy-nav button` 的样式也会把它盖成深色底。
- **无 JS 兜底**：`_includes/head/custom.html` 里的 `<noscript>` 会让折叠内容全部展开、隐藏 More 按钮。

---

## 三、页面结构

```
_pages/about.md                  首页：只负责按顺序 include 各区块
_includes/sections/*.html        每个区块一个模板，用 Liquid 循环渲染 _data
_includes/venue-badge.html       会议 badge（自动配色）
_includes/pub-links.html         论文链接组
AID/ SimDA/ VIDiff/              论文项目页（各自独立的静态页，互不干扰）
```

> 注意：section 模板里的 HTML 标签一律**顶格写**，因为首页内容会经过 Markdown 渲染器，
> 缩进行可能被识别成代码块。改模板时请保持这个习惯。

---

## 四、本地预览

```bash
bundle exec jekyll serve      # 或 ./run_server.sh
```

若本地 Ruby 环境装不上 Jekyll，可用离线预览脚本生成静态页（不依赖 Ruby）：

```bash
node /Users/xingzhen/.workbuddy/binaries/node/workspace/build_preview.js
```

产物在 `_preview/index.html`，双击即可在浏览器查看。`_preview/` 已加入 `.gitignore`，不会进仓库。
