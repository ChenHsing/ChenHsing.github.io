# Zhen Xing (邢桢) — Personal Homepage

个人学术主页，基于 [Jekyll](https://jekyllrb.com/) + [minimal-mistakes](https://mademistakes.com/work/minimal-mistakes-jekyll-theme/)，部署在 GitHub Pages。

**特点**：内容与样式分离——日常更新只改 `_data/` 下的 YAML，不用动 HTML/CSS；支持浅色 / 深色双主题（默认跟随系统，右上角可手动切换）。

## 目录结构

```
_data/              全站内容：news / publications / honors / talks / experience / service / profile / navigation
_includes/sections/ 各区块模板
_includes/          侧栏、页头、页脚等公共片段
_layouts/           页面布局
_sass/              样式（_theme.scss 配色、_components.scss 区块组件）
assets/js/          主题切换、More 展开、头像放大
images/ files/      图片与 PDF（slides 等）
AID/ SimDA/ VIDiff/ 论文项目页（独立静态页）
_pages/about.md     首页：按顺序 include 各区块
```

## 本地预览

```bash
bundle exec jekyll serve      # 或 ./run_server.sh
```

## 内容维护

新增论文、新闻、荣誉等操作见 **[MAINTENANCE.md](./MAINTENANCE.md)**，其中说明了每个数据文件的字段含义，以及改样式时的注意事项（例如主题切换按钮必须留在 `<nav>` 外）。

## License

见 [LICENSE](./LICENSE)。
