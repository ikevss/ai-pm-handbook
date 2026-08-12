import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "AI PM Coding 手册 · 产品经理驱动 AI 编码",
    template: "%s · AI PM 手册",
  },
  description:
    "产品经理直接驱动 AI 编码的工作手册。从定义产品、定义验收标准，到让 AI 交付可验收的成果。",
  icons: {
    icon: "/favicon.svg",
  },
  metadataBase: new URL("https://ikevss.github.io/ai-pm-handbook"),
  openGraph: {
    title: "AI PM Coding 手册 · 产品经理驱动 AI 编码",
    description:
      "产品经理直接驱动 AI 编码的工作手册，从传统 PM 到 AI 原生 PM 的转型指南。",
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}