# 产品经理 AI Coding 工作手册

> 从传统 PM 到 AI 原生 PM 的转型指南

📖 **在线阅读：** https://p.ikev.top

## 这是什么

一份面向产品经理的实操手册，系统梳理了 AI Coding 时代产品经理需要掌握的工作体系：理论框架、文件资产、案例模板（23 份）、提示词手册（99 条）与模仿改进。

## 技术栈

- **框架：** Next.js 15（App Router）+ TypeScript
- **UI：** Tailwind CSS + shadcn/ui
- **主题：** next-themes（浅色 / 深色 / 跟随系统）
- **搜索：** Fuse.js（前端全文搜索）
- **部署：** GitHub Pages（`output: export` 静态导出）

## 目录结构

```
├── content/                 # 内容层（手工维护，AI 对话中更新）
│   ├── templates.json       # 23 份模板数据
│   ├── prompts.json         # 99 条提示词数据
│   └── ...                  # 手册章节内容
├── src/
│   ├── app/                 # 页面（首页 / 模板库 / 提示词手册）
│   ├── components/          # shadcn/ui + 业务组件
│   └── lib/                 # 数据访问、Markdown 渲染、工具函数
├── scripts/                 # 内容校验与数据清洗脚本
├── public/                  # 静态资源
├── archive/                 # 旧版静态站点归档（v2 / v3 / 生成脚本）
├── .github/workflows/       # CI + GitHub Pages 部署
└── package.json
```

## 本地开发

```bash
npm install       # 安装依赖
npm run dev       # 本地开发 http://localhost:3000
npm run build     # 构建 + 静态导出到 out/
npm run test      # 数据完整性测试
npm run typecheck # 类型检查
npm run lint      # 代码检查
```

## 内容维护（AI 对话中更新）

所有内容以结构化数据存放在 `content/`：

- 新增/修改模板 → 编辑 `content/templates.json`
- 新增/修改提示词 → 编辑 `content/prompts.json`
- 每次改动后运行 `node scripts/prepare-content.mjs` 校验数据完整性

内容与展示分离：改 JSON → commit → CI 自动构建部署，无需手动改页面。

## 部署

- GitHub Actions 在 `main` 分支推送时自动构建并部署到 GitHub Pages
- 自定义域名：`p.ikev.top`（通过 `public/CNAME` 绑定，根路径部署）
- 见 `.github/workflows/deploy.yml`
- 仓库需在 Settings → Pages 中启用「GitHub Actions」作为发布来源
- DNS 需配置 CNAME：`p` → `ikevss.github.io`

## 版本历史

| 版本 | 说明 | 位置 |
|---|---|---|
| v6.0 | Next.js + shadcn/ui 重构版 | 仓库根（当前） |
| v3.0 | 静态 HTML | `archive/v3/` |
| v2.0 | 静态 HTML | `archive/index-v2-backup.html` |

## 许可

MIT License

**维护者：** ikevssy · 📮 ihuass@agent.qq.com
