"use client";

import * as React from "react";
import Fuse from "fuse.js";
import { Search } from "lucide-react";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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

  return (
    <div className="mt-8">
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索提示词…"
          className="pl-9"
          aria-label="搜索提示词"
        />
      </div>

      {filteredByQuery ? (
        filteredByQuery.length > 0 ? (
          <div>
            <p className="mb-4 text-sm text-muted-foreground">
              找到 {filteredByQuery.length} 条结果
            </p>
            {renderList(filteredByQuery)}
          </div>
        ) : (
          <p className="py-12 text-center text-muted-foreground">
            未找到匹配的提示词，试试其他关键词
          </p>
        )
      ) : (
        <Tabs defaultValue={ALL_KEY}>
          <TabsList className="mb-6 flex flex-wrap h-auto">
            <TabsTrigger value={ALL_KEY}>全部 ({prompts.length})</TabsTrigger>
            {categories.map((c) => (
              <TabsTrigger key={c.key} value={c.key}>
                {c.emoji} {c.label} ({catCount.get(c.key) ?? 0})
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={ALL_KEY}>{renderList(prompts)}</TabsContent>
          {categories.map((c) => (
            <TabsContent key={c.key} value={c.key}>
              {renderList(
                prompts.filter((p) => p.category === c.key)
              )}
            </TabsContent>
          ))}
        </Tabs>
      )}

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