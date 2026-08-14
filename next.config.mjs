import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// GitHub Pages 部署在子路径 /<repo> 下。静态导出若不设 basePath，
// 所有 /_next/... 资源会 404 → 整页样式丢失、framer-motion 不执行、内容卡在 opacity:0。
// 仅在 CI（GitHub Actions）构建时注入，本地 dev/build 仍走根路径。
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "ai-pm-handbook";
const basePath = isGithubActions ? `/${repoName}` : "";
const assetPrefix = isGithubActions ? `/${repoName}/` : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  basePath,
  assetPrefix,
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
