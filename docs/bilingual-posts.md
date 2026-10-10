# 中英双语写作

英文网址使用 `/en/`、`/en/about/`、`/en/archive/` 和 `/en/posts/<slug>/`。中文网址对应 `/zh/`、`/zh/about/`、`/zh/archive/` 和 `/zh/posts/<slug>/`。链接中的语言固定页面版本，不受访客的浏览器语言影响。

旧英文根路径通过 Cloudflare Pages 的 301 跳转到对应 `/en/` 地址。构建时由 `scripts/write-locale-redirects.mjs` 生成 `dist/_redirects`，保留原来的首页、关于、归档、文章、分页与 RSS 链接。根路径在本地开发中也会跳到 `/en/`。

顶部的「中 / EN」按钮切换整站语言。文章页按 `translationKey` 跳转到同一篇文章的另一语言版本，即使两份文章的文件名不同。首页、归档、分类、标签、上一篇、下一篇、搜索和 RSS 都只使用当前语言的内容。分页切换语言会回到目标语言首页，因为两种语言的文章数量可能不同；归档切换后清除旧语言的筛选条件。

## 创建两份文章

```sh
pnpm new-post ai-coding
```

命令创建以下两份草稿，不会覆盖已有文件：

- `src/content/posts/en/ai-coding.md`
- `src/content/posts/zh/ai-coding.md`

两份文件各自填写标题、摘要、正文、封面、分类和标签。它们的 `translationKey` 必须相同，`lang` 分别为 `en` 和 `zh`。分类和标签直接写当前文章语言的文字，无需额外翻译表。

英文文件示例：

```yaml
---
title: 'What I learned from AI coding'
published: 2026-10-09
description: 'Notes from using AI in a real engineering team.'
image: ''
tags: ['AI coding', 'Engineering']
category: 'Building products'
draft: false
lang: en
translationKey: ai-coding
---
```

中文文件示例：

```yaml
---
title: '我从 AI 编程中学到的事'
published: 2026-10-09
description: '在真实工程团队中使用 AI 的实践记录。'
image: ''
tags: ['AI 编程', '工程管理']
category: '产品开发'
draft: false
lang: zh
translationKey: ai-coding
---
```

在各自 frontmatter 后写对应语言的 Markdown 正文。两份都写完后，将各自的 `draft` 改为 `false`，按现有 main 发布流程提交和部署。

可以分别发布两份文章；另一语言版本不存在或仍是草稿时，生产站不会链接到它，切换按钮会显示「另一语言版本尚未发布」。同语言、同配对标识或同网址发生重复会阻止构建，避免跳错文章。开发模式可以预览草稿，生产构建会隐藏草稿。

没有 `lang` 的旧文章继续作为英文文章，网址使用 `/en/posts/<slug>/`；旧网址永久跳转到它。没有 `translationKey` 时按去掉 `en/` 或 `zh/` 前缀后的 slug 配对；新文章建议显式填写标识。两份文件的相对图片路径各自从该文件所在目录解析，公共图片可使用 `/assets/...` 路径。

## 修改站点双语文案

- 站名、副标题、作者名、简介与横幅署名：`src/config.ts` 的 `localizedSiteConfig.en` 和 `.zh`。
- 关于页正文：`src/content/spec/about.md` 与 `about-zh.md`。
- 导航、分类、主题设置等基础界面文案：`src/i18n/languages/en.ts` 与 `zh_CN.ts`。
- 控件提示、搜索状态和图片浏览文案：`src/i18n/site-copy.ts`。
- 两份 RSS：`/en/rss.xml` 和 `/zh/rss.xml`。每个页面有自己的 canonical、语言标记及已发布对应版本的 hreflang；站点地图自动包含两种语言的页面。

主题颜色、亮暗模式和布局仍使用原有设置，切换语言后保持访客已经选择的主题。
