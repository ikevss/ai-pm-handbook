import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 60000,
  fullyParallel: false,
  retries: 0,
  reporter: [["list"]],
  use: {
    // baseURL 指向 origin，子路径由 pages.spec.ts 里显式拼接（见 BASE 常量）。
    // 若设成 /ai-pm-handbook，page.goto("/") 的前导斜杠会解析回 origin 根，
    // 导致根本没测到子路径部署，漏掉 basePath 回归。
    baseURL: "http://localhost:4173",
    headless: true,
    viewport: { width: 1280, height: 900 },
    screenshot: "off",
    trace: "off",
  },
  webServer: {
    command: "node e2e/serve-subpath.mjs",
    url: "http://localhost:4173/ai-pm-handbook",
    reuseExistingServer: false,
    timeout: 120000,
    stdout: "pipe",
    stderr: "pipe",
  },
});
