import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const root = process.cwd();

function load<T>(rel: string): T[] {
  return JSON.parse(readFileSync(`${root}/${rel}`, "utf8")) as T[];
}

interface Template {
  id: string;
  name: string;
  meta: string;
  desc: string;
  status: string;
  content: string;
}

interface Prompt {
  index: number;
  category: string;
  title: string;
  summary: string;
  content: string;
}

describe("数据完整性", () => {
  const templates = load<Template>("content/templates.json");
  const prompts = load<Prompt>("content/prompts.json");

  it("模板数量应为 23", () => {
    expect(templates).toHaveLength(23);
  });

  it("提示词数量应为 99", () => {
    expect(prompts).toHaveLength(99);
  });

  it("模板 id 唯一且字段完整", () => {
    const ids = new Set(templates.map((t) => t.id));
    expect(ids.size).toBe(templates.length);
    for (const t of templates) {
      expect(t.content.trim().length).toBeGreaterThan(0);
      expect(["已确认", "评审中", "提议中", "草稿"]).toContain(t.status);
    }
  });

  it("提示词 index 唯一且字段完整", () => {
    const idx = new Set(prompts.map((p) => p.index));
    expect(idx.size).toBe(prompts.length);
    for (const p of prompts) {
      expect(p.title.trim().length).toBeGreaterThan(0);
      expect(p.summary.trim().length).toBeGreaterThan(0);
      expect(p.content.trim().length).toBeGreaterThan(0);
    }
  });

  it("提示词分类不超过已定义分类集合", () => {
    const known = [
      "market", "product", "architecture", "coding", "refactor",
      "testing", "docs", "devops", "agents", "prompting", "visual",
    ];
    for (const p of prompts) {
      expect(known).toContain(p.category);
    }
  });
});
