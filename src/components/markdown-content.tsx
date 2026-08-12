import { renderMarkdown } from "@/lib/markdown";

export async function MarkdownContent({ source }: { source: string }) {
  const html = await renderMarkdown(source);
  return (
    <div
      className="prose prose-slate max-w-none dark:prose-invert prose-pre:bg-slate-950 prose-pre:text-slate-50 prose-code:rounded prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:before:content-none prose-code:after:content-none dark:prose-code:bg-slate-800"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}