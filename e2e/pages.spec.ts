import { test, expect, type Page } from "@playwright/test";

// 与 next.config.mjs 中 repoName 一致，即 GitHub Pages 子路径前缀。
// 测试必须显式导航到这个子路径，才能真实复现线上部署场景。
const BASE = "/ai-pm-handbook";

const HOME_SECTIONS = [
  "hero",
  "theory",
  "assets",
  "templates-index",
  "prompts-index",
  "imitation",
];

async function checkPage(page: Page, path: string, opts: {
  h1Text: string;
  sectionIds?: string[];
  checkReveal?: boolean;
}) {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text());
  });
  page.on("pageerror", (e) => pageErrors.push(String(e)));

  await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);

  const slug = path === "/" ? "home" : path.replace(/\//g, "_");

  // 1) H1 visible
  const h1 = page.locator("h1").first();
  await expect(h1).toBeVisible();
  if (opts.h1Text) {
    await expect(h1).toContainText(opts.h1Text);
  }

  // 2) If Reveal-wrapped, scroll each section into view and assert wrapper opacity > 0.9
  if (opts.checkReveal && opts.sectionIds) {
    for (const id of opts.sectionIds) {
      const section = page.locator(`#${id}`);
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(700);
      const opacity = await section.evaluate((el) => {
        const wrapper = el.parentElement as HTMLElement | null;
        const style = wrapper
          ? parseFloat(getComputedStyle(wrapper).opacity)
          : 1;
        return style;
      });
      expect(
        opacity,
        `section #${id} 的 Reveal 包裹层 opacity 仍为 ${opacity}（可能卡在 0 = 内容不可见）`
      ).toBeGreaterThan(0.9);
    }
  }

  // 3) No horizontal overflow at desktop
  const overflowDesktop = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  expect(
    overflowDesktop,
    `桌面端出现横向溢出 ${overflowDesktop}px（页面错乱常见原因）`
  ).toBeLessThanOrEqual(2);

  // 4) Screenshot desktop (full page)
  await page.screenshot({
    path: `e2e/shots/${slug}@1280.png`,
    fullPage: true,
  });

  // 5) Mobile overflow check
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(300);
  const overflowMobile = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  expect(
    overflowMobile,
    `移动端(390)出现横向溢出 ${overflowMobile}px`
  ).toBeLessThanOrEqual(2);
  await page.screenshot({
    path: `e2e/shots/${slug}@390.png`,
    fullPage: true,
  });

  // 6) Console / page errors
  expect(
    consoleErrors,
    `控制台错误:\n${consoleErrors.join("\n")}`
  ).toEqual([]);
  expect(pageErrors, `页面运行时错误:\n${pageErrors.join("\n")}`).toEqual([]);
}

test("首页 / 渲染正常、无错乱", async ({ page }) => {
  await checkPage(page, "/", {
    h1Text: "AI 编码",
    sectionIds: HOME_SECTIONS,
    checkReveal: true,
  });
});

test("模板库 /templates 渲染正常、无错乱", async ({ page }) => {
  await checkPage(page, "/templates", {
    h1Text: "案例模板",
    checkReveal: false,
  });
});

test("提示词 /prompts 渲染正常、无错乱", async ({ page }) => {
  await checkPage(page, "/prompts", {
    h1Text: "提示词",
    checkReveal: false,
  });
});
