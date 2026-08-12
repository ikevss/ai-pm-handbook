import type { Metadata } from "next";

import { getTemplates, getTemplateGroups } from "@/lib/data";
import { TemplateGallery } from "@/components/template-gallery";

export const metadata: Metadata = {
  title: "案例模板库",
  description: "可复制的项目文档模板，覆盖调研立项、产品设计、项目执行、测试验收、发布迭代全流程。",
};

export default async function TemplatesPage() {
  const templates = await getTemplates();
  const groups = getTemplateGroups();

  return (
    <div className="container py-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">案例模板库</h1>
        <p className="text-muted-foreground">
          {templates.length} 份可复制的项目文档模板 · 点击卡片查看全文并复制
        </p>
      </div>
      <TemplateGallery templates={templates} groups={groups} />
    </div>
  );
}