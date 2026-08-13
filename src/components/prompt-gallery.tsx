"use client";

import * as React from "react";
import Fuse from "fuse.js";
import { Search } from "lucide-react";

import { CategoryIcon } from "@/components/category-icon";
import { CopyButton } from "@/components/copy-button";
import { MarkdownContent } from "@/components/markdown-content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { CategoryDef, Prompt } from "@/lib/data";

const ALL_KEY = "__all__";

export function PromptGallery({
  prompts,
  categories,
}: {
  prompts: Prompt[];
  categories: CategoryDef[];
}) {
  const [query, setQuery] = React.useState("");
  const [activeCat, setActiveCat] = React.useState<string>(ALL_KEY);
  const [selected, setSelected] = React.useState<Prompt | null>(null);

  const fuse = React.useMemo(() => {
    return new Fuse(prompts, {
      keys: ["title", "summary", "content"],
      threshold: 0.4,
    });
  }, [prompts]);

  const filteredByQuery = React.useMemo(() => {
    if (!query.trim()) return null;
    return fuse.search(query.trim()).map((r) => r.item);
  }, [query, fuse]);

  const catCount = React.useMemo(() => {
    const m = new Map<string, number>();
    prompts.forEach((p) => m.set(p.category, (m.get(p.category) ?? 0) + 1));
    return m;
  }, [prompts]);

  const renderList = (items: Prompt[]) => (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((p) => (
        <Card
          key={p.index}
          className="cursor-pointer transition-all hover:border-primary/50 hover:shadow-md"
          onClick={() => setSelected(p)}
        >
          <CardHeader>
            <CardTitle className="text-base leading-snug">
              {p.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {p.summary}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const listForCat = React.useMemo(() => {
    if (filteredByQuery) return { items: filteredByQuery, label: `搜索结果` };
    if (activeCat === ALL_KEY)
      return { items: prompts, label: "全部提示词" };
    return {
      items: prompts.filter((p) => p.category === activeCat),
      label: categories.find((c) => c.key === activeCat)?.label ?? "",
    };
  }, [filteredByQuery, activeCat, prompts, categories]);

  return (
    <div className="mt-8 flex flex-col gap-8 lg:flex-row">
      {/* 左侧分类导航 */}
      <aside className="lg:w-56 lg:shrink-0">
        <div className="lg:sticky lg:top-20">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索提示词…"
              className="pl-9"
              aria-label="搜索提示词"
            />
          </div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            分类导航
          </p>
          <nav className="flex flex-col gap-1">
            <button
              onClick={() => setActiveCat(ALL_KEY)}
              className={`flex items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors ${
                activeCat === ALL_KEY
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <span>全部</span>
              <span className="text-xs text-muted-foreground">
                {prompts.length}
              </span>
            </button>
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => {
                  setQuery("");
                  setActiveCat(c.key);
                }}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                  activeCat === c.key
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <CategoryIcon icon={c.icon} className="h-4 w-4 shrink-0" />
                <span className="flex-1">{c.label}</span>
                <span className="text-xs text-muted-foreground">
                  {catCount.get(c.key) ?? 0}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* 右侧内容 */}
      <div className="min-w-0 flex-1">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {listForCat.label}
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              {listForCat.items.length} 条
            </span>
          </h2>
        </div>
        {listForCat.items.length > 0 ? (
          renderList(listForCat.items)
        ) : (
          <p className="py-12 text-center text-muted-foreground">
            未找到匹配的提示词，试试其他关键词
          </p>
        )}
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
              <DialogTitle className="pr-8 text-xl">{selected.title}</DialogTitle>
            </DialogHeader>
            <div className="flex justify-end">
              <CopyButton text={selected.content} label="复制提示词" />
            </div>
            <MarkdownContent source={selected.content} />
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}