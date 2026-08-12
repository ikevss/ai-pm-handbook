import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Boxes,
  Copy,
  FileText,
  Layers,
  Search,
  Sparkles,
} from "lucide-react";

import { getPromptCategories, getPrompts, getTemplates } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Home() {
  const templates = await getTemplates();
  const prompts = await getPrompts();
  const categories = getPromptCategories();

  const fileAssets = [
    {
      name: "① Product SPEC",
      desc: "给 AI 看的指令级文档，直接被喂给 AI 作为 Coding Prompt。不写「用户应该能」，而是写清楚输入什么、输出什么、边界在哪、出错时显示什么。",
      tier: "第一档 · 没有就不行",
    },
    {
      name: "② README.md",
      desc: "项目入口 + 进度看板，PM 和 AI 共同维护。包含当前进度、技术栈、协作约定。",
      tier: "第一档 · 没有就不行",
    },
    {
      name: "③ CHANGELOG.md",
      desc: "变更记录 = 需求追踪，PM 每轮验收后自己写。每条记录回答：做了什么、关联什么、验了什么。",
      tier: "第一档 · 没有就不行",
    },
    {
      name: "④ AGENTS.md / CLAUDE.md",
      desc: "AI 协作规则，约束 AI 行为的项目级配置。AI 每次启动自动读取。",
      tier: "第二档 · 按需使用",
    },
    {
      name: "⑤ 验收清单",
      desc: "PM 自己测，每轮代码生成完逐条打勾。测完就是验收报告。",
      tier: "第二档 · 按需使用",
    },
    {
      name: "⑥ 数据模型简述",
      desc: "给 AI 的数据库上下文，标注业务含义和状态枚举。",
      tier: "第二档 · 按需使用",
    },
  ];

  const shifts = [
    {
      num: "01",
      title: "从描述功能 → 定义验收",
      old: "写 PRD：「做一个客户列表页，支持搜索和筛选」——AI 会脑补你没说的所有细节",
      now: "写验收标准：「搜'张'能搜到张三；搜不到显示'没找到'；两个筛选能叠加；五千条不卡」",
    },
    {
      num: "02",
      title: "从一次说清 → 小步逼近",
      old: "文档一次写全，AI 一口气做完 80%，你才发现方向错了，全废",
      now: "说个大概 → AI 复述 → 纠偏 → 出方案 → 做一小块 → 看效果 → 继续。永远不让 AI 连做三步以上",
    },
    {
      num: "03",
      title: "从相信交付 → 默认怀疑",
      old: "开发说「做完了」= 可以验收。AI 说「已完成」「测试通过」可信度接近于零",
      now: "追问三句：「我怎么自己看到效果？」「你测了哪些、没测哪些？」「最坏会怎样、怎么退回去？」",
    },
  ];

  const mimickSpeech = [
    "开工我要做【X】。做对了的标准是【1、2、3】。这次不做【Y】。你先复述一遍理解，别动手。",
    "要方案先给方案别写代码。说清楚：怎么做、多久、有什么风险、有没有更简单的办法、会碰到哪些现有功能。",
    "限制范围只改【X】，别碰其他任何地方。改完告诉我你碰了哪些功能。",
    "反馈问题【功能】里，我【操作】，期望【结果A】，实际【结果B】。",
    "卡住时停，别改了。告诉我：你试了什么、为什么没成、你现在猜原因是什么、有哪几个可能方向。",
    "要人话看不懂。用三句话重讲，假设你在跟销售同事解释。",
    "验收前我怎么自己看到效果？给我具体步骤：打开哪里、点什么、看到什么算对。",
    "复盘这次哪里绕了弯路？我下次怎么描述能更快说清楚？",
  ];

  const pitfalls = [
    {
      title: "① 看起来做完了，其实是壳子",
      desc: "界面全有，点进去是假数据。每次追问「这数据是真的从后台来的吗？」",
    },
    {
      title: "② AI 自己给自己打分",
      desc: "「测试通过」——但测试是它自己写的。你手动点一遍验收单，不看 AI 的测试报告。",
    },
    {
      title: "③ 偷偷改了别的地方",
      desc: '让它修 A，顺手"优化"了 B，B 坏了。明确说「只改 A」，改完追问「碰了哪些功能」。',
    },
    {
      title: "④ 越描越乱",
      desc: "一个问题反复改，代码越来越复杂。两次不成立刻停，回到最初重新想。",
    },
    {
      title: "⑤ 你以为它记得",
      desc: "聊到后面它忘了前面的约束。关键约束写进文件，定期让它复述目标。",
    },
  ];

  return (
    <div className="container py-12 space-y-16">
      {/* Hero */}
      <section id="hero" className="text-center py-8">
        <Badge className="mb-4">AI 新范式 · PM Coding 手册</Badge>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          产品经理直接驱动 AI 编码
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          从定义产品、定义验收标准，到让 AI 交付可验收的成果。
          这里帮你识别 <strong>3 个核心思维转变</strong>。
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="#theory">理论框架</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="#assets">文件资产</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="#templates-index">案例模板</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="#imitation">模仿改进</Link>
          </Button>
        </div>
      </section>

      {/* 理论框架 */}
      <section id="theory" className="scroll-mt-24">
        <div className="mb-6 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">理论框架</h2>
        </div>
        <p className="mb-8 max-w-3xl text-muted-foreground">
          很多 PM 拿着 AI 工具，但思维还是传统的「写需求→评审→排期」。
          AI 时代 PM 的核心竞争力不是「会用工具」，而是
          <strong>「能判断 AI 做对了没有」</strong>。
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {shifts.map((s) => (
            <Card key={s.num}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <span className="text-primary">{s.num}</span>
                  {s.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="rounded-md bg-red-50 p-3 text-red-700 dark:bg-red-950/50 dark:text-red-300">
                  <p className="mb-1 text-xs font-semibold">过去</p>
                  {s.old}
                </div>
                <div className="rounded-md bg-green-50 p-3 text-green-700 dark:bg-green-950/50 dark:text-green-300">
                  <p className="mb-1 text-xs font-semibold">现在</p>
                  {s.now}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6 rounded-lg border bg-muted/50 p-5">
          <p className="text-sm">
            <strong>一句话带走：</strong>
            AI 把「实现」变便宜了，于是「判断」变成了最贵的东西。你的价值从
            「写清楚要什么」转移到了「说清楚什么算对，并且能查出它错没错」。
          </p>
        </div>
      </section>

      {/* 文件资产 */}
      <section id="assets" className="scroll-mt-24">
        <div className="mb-6 flex items-center gap-2">
          <Layers className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">文件资产</h2>
        </div>
        <p className="mb-8 max-w-3xl text-muted-foreground">
          AI 时代的文档<strong>写给 AI 看</strong>——结构化、无歧义、可直接当
          Prompt。文档不再是「沟通工具」，而是 AI 的输入指令和自己的干活记录。
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fileAssets.map((f) => (
            <Card key={f.name}>
              <CardHeader>
                <CardTitle className="text-base">{f.name}</CardTitle>
                <CardDescription>{f.tier}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 案例模板 */}
      <section id="templates-index" className="scroll-mt-24">
        <div className="mb-6 flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">案例模板</h2>
        </div>
        <p className="mb-6 max-w-3xl text-muted-foreground">
          每一份都是给 AI 的输入指令和协作契约。覆盖调研立项、产品设计、项目执行、
          测试验收、发布迭代。
        </p>
        <Card>
          <CardContent className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <Boxes className="h-8 w-8 text-primary" />
              <div>
                <p className="font-semibold">
                  {templates.length} 份可复制模板
                </p>
                <p className="text-sm text-muted-foreground">
                  含完整目录结构 · 每份模板有空白版和填写示例 · 可直接复制使用
                </p>
              </div>
            </div>
            <Button asChild>
              <Link href="/templates">
                进入模板库
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* 提示词手册入口 */}
      <section id="prompts-index" className="scroll-mt-24">
        <Card>
          <CardContent className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-primary" />
              <div>
                <p className="font-semibold">
                  {prompts.length} 条精选提示词 · {categories.length} 类场景
                </p>
                <p className="text-sm text-muted-foreground">
                  把方法论沉淀成可直接抄用的提示词，点击卡片即可复制，拿去就能指挥 AI。
                </p>
              </div>
            </div>
            <Button asChild>
              <Link href="/prompts">
                进入提示词手册
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* 模仿改进 */}
      <section id="imitation" className="scroll-mt-24">
        <div className="mb-6 flex items-center gap-2">
          <Copy className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">模仿改进</h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="mb-4 font-semibold">8 句话术（直接复制用）</h3>
            <div className="space-y-2">
              {mimickSpeech.map((s, i) => (
                <div
                  key={i}
                  className="rounded-md border bg-muted/40 p-3 text-sm text-muted-foreground"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">最常见的五个坑</h3>
            <div className="space-y-3">
              {pitfalls.map((p) => (
                <Card key={p.title}>
                  <CardContent className="p-4">
                    <p className="mb-1 text-sm font-semibold">{p.title}</p>
                    <p className="text-sm text-muted-foreground">{p.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}