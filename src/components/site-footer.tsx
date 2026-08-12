import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">
          PM Coding 手册 · v6.0 · AI 新范式
        </p>
        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/templates" className="hover:text-primary">
            模板库
          </Link>
          <Link href="/prompts" className="hover:text-primary">
            提示词手册
          </Link>
          <Link
            href="https://github.com/ikevss/ai-pm-handbook"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            GitHub
          </Link>
        </nav>
      </div>
    </footer>
  );
}