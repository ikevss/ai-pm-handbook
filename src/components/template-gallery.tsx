"use client";

import * as React from "react";
import { FileText, FolderTree } from "lucide-react";

import { CategoryIcon } from "@/components/category-icon";
import { CopyButton } from "@/components/copy-button";
import { MarkdownContent } from "@/components/markdown-content";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Template, TemplateGroup } from "@/lib/types";

export function TemplateGallery({
  templates,
  groups,
}: {
  templates: Template[];
  groups: TemplateGroup[];
}) {
  const [selected, setSelected] = React.useState<Template | null>(null);
  const [activeGroup, setActiveGroup] = React.useState(groups[0]?.key ?? "");

  const byId = React.useMemo(() => {
    const m = new Map<string, Template>();
    templates.forEach((t) => m.set(t.id, t));
    return m;
  }, [templates]);

  const groupItems = React.useMemo(() => {
    return groups.map((group) => ({
      group,
      items: group.ids
        .map((id) => byId.get(id))
        .filter((t): t is Template => Boolean(t)),
    }));
  }, [groups, byId]);

  const scrollToGroup = (key: string) => {
    setActiveGroup(key);
    const el = document.getElementById(`group-${key}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="mt-8 flex flex-col gap-8 lg:flex-row">
      {/* 左侧分类导航 */}
      <aside className="lg:w-56 lg:shrink-0">
        <div className="lg:sticky lg:top-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            分类导航
          </p>
          <nav className="flex flex-col gap-1">
            {groupItems.map(({ group, items }) => (
              <button
                key={group.key}
                onClick={() => scrollToGroup(group.key)}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                  activeGroup === group.key
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <CategoryIcon icon={group.icon} className="h-4 w-4 shrink-0" />
                <span className="flex-1">{group.label}</span>
                <span className="text-xs text-muted-foreground">
                  {items.length}
                </span>
              </button>
            ))}
          </nav>

          {/* 项目目录结构 */}
          <div className="mt-6 hidden rounded-lg border bg-muted/30 p-4 lg:block">
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <FolderTree className="h-4 w-4" />
              项目目录结构
            </p>
            <pre className="overflow-x-auto text-xs leading-relaxed text-muted-foreground">
{`项目根目录/
├── README.md
├── AGENTS.md
├── CLAUDE.md
├── CHANGELOG.md
├── PRODUCT.md
├── DESIGN.md
└── docs/
    ├── product/     (5)
    ├── project/     (5)
    ├── qa/          (4)
    ├── ai-logs/     (3)
    └── process/     (3)`}
            </pre>
          </div>
        </div>
      </aside>

      {/* 右侧内容 */}
      <div className="min-w-0 flex-1 space-y-12">
        {groupItems.map(({ group, items }) => {
          if (items.length === 0) return null;
          return (
            <section key={group.key} id={`group-${group.key}`} className="scroll-mt-20">
              <div className="mb-4 flex items-center gap-3">
                <CategoryIcon
                  icon={group.icon}
                  className="h-5 w-5 text-primary"
                />
                <div>
                  <h2 className="text-xl font-semibold">{group.label}</h2>
                  {group.description && (
                    <p className="text-sm text-muted-foreground">
                      {group.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {items.map((t) => (
                  <Card
                    key={t.id}
                    className="cursor-pointer transition-all hover:border-primary/50 hover:shadow-md"
                    onClick={() => setSelected(t)}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-start gap-2 text-base">
                        <FileText className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                        <span>{t.name}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {t.desc}
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <StatusBadge status={t.status} />
                        <span className="truncate text-xs text-muted-foreground">
                          {t.meta}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <Dialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        {selected && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="pr-8">{selected.name}</DialogTitle>
              <div className="flex items-center gap-2">
                <StatusBadge status={selected.status} />
                <span className="text-xs text-muted-foreground">
                  {selected.meta}
                </span>
              </div>
            </DialogHeader>
            <div className="flex justify-end">
              <CopyButton text={selected.content} label="复制模板" />
            </div>
            <MarkdownContent source={selected.content} />
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}