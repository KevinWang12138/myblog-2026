# myblog-2026 项目规则

- 遵守 `/Users/kevin/.codex/AGENTS.md` 和 `/Users/kevin/work/AGENTS.md` 的共享规则。
- 项目基于 Astro 和 Fuwari，使用 `pnpm@9.14.4`，不要混用包管理器。
- 文章放在 `src/content/posts/`，站点与导航配置放在 `src/config.ts`。保持既有视觉和 i18n 结构。
- 允许文章集合为空；清空后首页与归档展示空状态，空标签和分类不显示。

## 中英双语

- 英文保留根路径，中文在 `/zh/`；不得把旧英文链接迁移到 `/en/`。
- `pnpm new-post <slug>` 同时创建 `posts/en/` 与 `posts/zh/` 下的两份草稿。文章使用 `lang: en|zh` 和相同的 `translationKey` 配对，详情见 `docs/bilingual-posts.md`。
- 文章列表、归档、分类、标签、前后文章、搜索和 RSS 按语言隔离；缺失或未发布译文不得跳到其他文章。
- 站点两份介绍在 `localizedSiteConfig`，关于页各用独立 Markdown；保持所有界面文案中英两套。
- 语言切换必须完整加载页面，Swup 的 `#language-switch` 容器必须随同语言浏览更新配对地址。

## 检查与生产发布

- 规定检查：`pnpm check`、`git diff --check`。构建命令为 `pnpm run build`，包含 Pagefind 搜索索引生成，产物目录为 `dist/`。
- 生产平台是 **Cloudflare Pages**，不是工作区旧说明中的 Vercel。
- Git 仓库：`KevinWang12138/myblog-2026`；生产分支：`main`。
- Cloudflare 账号 ID：`7547fb9cbb8a201d10a591d8285d0804`；Pages 项目：`myblog-2026`。
- 生产域名：`https://kevinwang.xyz`、`https://www.kevinwang.xyz`；Pages 主域名：`https://myblog-2026-8sv.pages.dev`。
- 发布命令：在最新 `main` 上完成提交后执行 `git push origin main`。现有 Git 集成自动运行 `pnpm run build` 并发布 `dist/`，无需新增项目或切换托管平台。
- 发布前核对远端 `main` 和 Cloudflare 当前生产版本，避免旧提交覆盖新版本。
- 发布后通过 GitHub 的 `Cloudflare Pages` check 和 Cloudflare 项目部署详情（Dashboard 或官方 API）确认完整提交 SHA、`Production`、`success` 及生产域名别名；只有文件上传或构建成功不足以视为上线完成。
- Dashboard：`https://dash.cloudflare.com/7547fb9cbb8a201d10a591d8285d0804/pages/view/myblog-2026`。浏览器只能通过 Kevin 的 Chrome 扩展连接操作。
- 每次发布后更新 `/Users/kevin/.codex/deployments/myblog-2026.json`，记录 SHA、目标、部署 ID/URL、结果、核验与时间，不记录凭证。
- 需要回滚时优先使用 Cloudflare Pages 中已确认成功的前一生产部署；不得删除部署历史。
- 不主动请求线上页面或扫路由做视觉、可用性测试；页面编译和浏览检查遵循 Kevin 的共享规则。
