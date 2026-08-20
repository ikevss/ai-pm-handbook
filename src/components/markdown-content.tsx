"use client";

import * as React from "react";

import { renderMarkdownClient } from "@/lib/markdown-client";

export function MarkdownContent({ source }: { source: string }) {
  const [html, setHtml] = React.useState("");

  React.useEffect(() => {
    let alive = true;
    renderMarkdownClient(source).then((h) => {
      if (alive) setHtml(h);
    });
    return () => {
      alive = false;
    };
  }, [source]);

  return (
    <div
      className="prose prose-slate max-w-none dark:prose-invert prose-pre:bg-slate-950 prose-pre:text-slate-50 prose-code:rounded prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none dark:prose-code:bg-slate-800 dark:prose-code:text-slate-100 dark:prose-headings:text-slate-50 dark:prose-p:text-slate-200 dark:prose-strong:text-slate-50"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}