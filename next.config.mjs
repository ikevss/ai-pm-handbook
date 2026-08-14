import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 站点通过自定义域名 p.ikev.top 部署在 GitHub Pages。
// 自定义域名 = 根路径部署（非子路径），因此不设 basePath/assetPrefix，
// 否则资源会被错误地引用到 /ai-pm-handbook/_next/... 而 404。
// public/CNAME 会被静态导出到 out/，GitHub Pages 据此绑定自定义域名。
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
