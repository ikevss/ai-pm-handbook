import { spawnSync } from "node:child_process";

// 模拟 GitHub Pages 生产构建：设置与 deploy.yml 相同的环境变量，
// 让 next.config.mjs 注入 basePath=/ai-pm-handbook。否则本地 build 走根路径，
// E2E 会漏掉「子路径资源 404 → 页面错乱」这一类部署 bug。
process.env.GITHUB_ACTIONS = "true";
process.env.GITHUB_REPOSITORY =
  process.env.GITHUB_REPOSITORY ?? "ikevss/ai-pm-handbook";

const nextBin = "node_modules/next/dist/bin/next";
const result = spawnSync(process.execPath, [nextBin, "build"], {
  stdio: "inherit",
  shell: false,
});

process.exit(result.status ?? 1);
