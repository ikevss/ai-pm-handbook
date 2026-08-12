import type { Metadata } from "next";

import { getPromptCategories, getPrompts } from "@/lib/data";
import { PromptGallery } from "@/components/prompt-gallery";

export const metadata: Metadata = {
  title: "AI 提示词手册",
  description: "把方法论沉淀成精选提示词，按场景分类，点击卡片即可复制，拿去就能指挥 AI。",
};

export default async function PromptsPage() {
  const prompts = await getPrompts();
  const categories = getPromptCategories();
  const nonEmpty = categories.filter((c) =>
    prompts.some((p) => p.category === c.key)
  );

  return (
    <div className="container py-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">AI 提示词手册</h1>
        <p className="text-muted-foreground">
          {prompts.length} 条精选提示词 · {nonEmpty.length} 类场景 · 支持搜索 · 一键复制
        </p>
      </div>
      <PromptGallery prompts={prompts} categories={nonEmpty} />
    </div>
  );
}