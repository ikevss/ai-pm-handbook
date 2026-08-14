import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 60000,
  fullyParallel: false,
  retries: 0,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:4173",
    headless: true,
    viewport: { width: 1280, height: 900 },
    screenshot: "off",
    trace: "off",
  },
  webServer: {
    command: "node e2e/serve.mjs",
    url: "http://localhost:4173",
    reuseExistingServer: false,
    timeout: 120000,
    stdout: "pipe",
    stderr: "pipe",
  },
});
