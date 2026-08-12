"use client";

import * as React from "react";
import { FileText } from "lucide-react";

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
  const byId = React.useMemo(() => {
    const m = new Map<string, Template>();
    templates.forEach((t) => m.set(t.id, t));
    return m;
  }, [templates]);

  return (
    <div className="mt-8 space-y-12">
      {groups.map((group) => {
        const items = group.ids
          .map((id) => byId.get(id))
          .filter((t): t is Template => Boolean(t));
        if (items.length === 0) return null;
        return (
          <section key={group.key}>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">{group.label}</h2>
              {group.description && (
                <p className="text-sm text-muted-foreground">
                  {group.description}
                </p>
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((t) => (
                <Card
                  key={t.id}
                  className="cursor-pointer transition-all hover:border-primary/50 hover:shadow-md"
                  onClick={() => setSelected(t)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-start justify-between gap-2 text-base">
                      <span className="flex items-center gap-2">
                        <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                        {t.name}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {t.desc}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <StatusBadge status={t.status} />
                      <span className="text-xs text-muted-foreground">
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

      <Dialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        {selected && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 pr-8">
                {selected.name}
              </DialogTitle>
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