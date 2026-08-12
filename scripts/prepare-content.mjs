#!/usr/bin/env node
/**
 * 内容数据清洗 + 校验脚本
 * - 把 templates.json 中的 HTML 实体（&gt; &quot; &amp; 等）还原为原文
 * - 校验数据结构完整性（字段、计数、id 唯一性）
 * - 供 predev / CI 使用
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const tplPath = resolve(root, "content/templates.json");
const promptPath = resolve(root, "content/prompts.json");

function decodeEntities(s) {
  return s
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

function validate(records, label, { idField }) {
  const ids = new Set();
  for (const r of records) {
    const id = r[idField];
    if (ids.has(id)) throw new Error(`${label}: 重复 ${idField}=${id}`);
    ids.add(id);
    for (const f of ["title", "summary", "content"]) {
      if (f in r && (typeof r[f] !== "string" || !r[f].trim()))
        throw new Error(`${label}: 记录 ${id} 缺少 ${f}`);
    }
  }
  return records.length;
}

const templates = JSON.parse(readFileSync(tplPath, "utf8"));
const prompts = JSON.parse(readFileSync(promptPath, "utf8"));

const tCount = validate(templates, "templates", { idField: "id" });
const pCount = validate(prompts, "prompts", { idField: "index" });

// 还原模板内容中的 HTML 实体
let tplChanged = false;
for (const t of templates) {
  const decoded = decodeEntities(t.content);
  if (decoded !== t.content) {
    t.content = decoded;
    tplChanged = true;
  }
}
if (tplChanged) {
  writeFileSync(tplPath, JSON.stringify(templates, null, 2), "utf8");
  console.log(`templates: 已还原 HTML 实体`);
}

// 检查 prompts 标题是否含截断/乱码残留（如 "？" 混入）
let promptIssues = 0;
for (const p of prompts) {
  if (/[�?]/.test(p.title) || p.title.endsWith("？")) {
    promptIssues++;
    console.warn(`[warn] 标题疑似异常: index=${p.index} title=${p.title.slice(0, 40)}`);
  }
}

console.log(`校验通过: templates=${tCount}, prompts=${pCount}`);
if (promptIssues) console.warn(`提示词标题异常 ${promptIssues} 条（仅提醒，不阻断）`);
