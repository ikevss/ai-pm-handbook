# -*- coding: utf-8 -*-
import json, html, re
import markdown

manual = json.load(open('docs/.tmp/manual.json', encoding='utf-8'))

# ---- 短标题映射 ----
SHORT_TITLES = {
    0:'需求理解', 1:'有向无环图（DAG）生成器', 2:'Mermaid 仓库结构图（上帝视角）',
    3:'/goal 任务提示词模板', 4:'多专家协同问题解决', 5:'资深软件测试工程师（角色设定）',
    6:'主 Codex 主控模式（auto-tmux）', 7:'Git 并行开发协调器', 8:'测试分类清单与测试设计',
    9:'通用 Python 项目骨架', 10:'CI/CD 完整体系', 11:'任务交接总结生成器',
    12:'优化目标分析助手', 13:'成熟方案检索与路径设计专家', 14:'并行子代理执行任务',
    15:'资深软件测试工程师（测试）', 16:'中文 λ 演算工程解释器', 17:'线性流程契约（AGENTS.md）',
    18:'tasks 首席任务规划专家', 19:'任务容器初始化专家', 20:'Task Package 拆分与回填专家',
    21:'第一性原理重构', 22:'项目文档自动同步', 23:'附加角色定位（执行型代理）',
    24:'glue 基于原型重构（成熟组件复用）', 25:'代码变更陈述', 26:'可复现执行文档生成器',
    27:'任务执行优先成熟范式', 28:'目录结构迁移/路径重构审查', 29:'Obsidian Canvas 架构洞察引擎',
    30:'Obsidian Canvas 动态序列图引擎', 31:'伪代码（PARE 系统）', 32:'函数化万物专家',
    33:'Mermaid 序列图生成', 34:'智能需求理解与研发导航引擎', 35:'项目上下文文档生成',
    36:'通用项目架构综合分析框架', 37:'AI 生成代码文档通用模板', 38:'文件头注释规范',
    39:'首席软件架构师（JSON 结构化）', 40:'首席软件架构师（KISS/YAGNI/SOLID）',
    41:'系统架构师与 AI 协同设计顾问', 42:'智能任务描述与补全', 43:'软件工程分析',
    44:'通用项目架构综合分析框架（变体）', 45:'Linus Torvalds 代码质量审查', 46:'高质量代码开发专家',
    47:'自然语言需求转编程任务', 48:'顶级设计哲学内化（KISS/YAGNI/SOLID）',
    49:'HTML 网页逆向分析（一键生成 UI）', 50:'自然语言编程专家', 51:'需求分析师转界面流程文档',
    52:'无代码构建交互工具', 53:'ASCII 图生成', 54:'DDD 文档管家 v2.0', 55:'DDD 文档管家 v1.0.0',
    56:'生产级 Shell 控制面板', 57:'人机对齐（高级顾问+批判性合作者）', 58:'分析提示词（教学版）',
    59:'分析提示词（专业版）', 60:'精华技术文档生成', 61:'系统架构师与 AI 协同设计顾问（变体）',
    62:'学术科研风格报告', 63:'AI 项目计划生成系统', 64:'EARS 需求规范化工作流',
    65:'项目变量与工具统一维护', 66:'项目文档自动同步（变体）', 67:'胶水开发约束',
    68:'胶水开发要求（强依赖复用）', 69:'简洁克制文风控制', 70:'数据管道化表达',
    71:'标准化目录规范重构', 72:'前置条件式硬约束生成', 73:'用户级守护程序脚本',
}

# 分类：name, desc, color, icon_svg（颜色取自 handbook 的琥珀/teal/rose/violet 体系 + 中性变体）
CATEGORIES = {
    'requirements': ('需求分析与任务规划', '把模糊需求整理成清晰、可执行、可验收的任务描述', '#c2410c',
        '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>'),
    'architecture': ('代码架构与仓库分析', '宏观理解代码仓库、生成架构图、分析系统结构', '#6366f1',
        '<rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 8v5"/>'),
    'coding':       ('代码编写与开发范式', '高质量编码规范、自然语言编程、架构师角色设定', '#0d9488',
        '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>'),
    'refactor':     ('重构与代码审查', '基于第一性原理/成熟组件库的系统性重构', '#be123c',
        '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>'),
    'testing':      ('测试设计', '测试工程师角色、测试分类清单与用例设计', '#0f766e',
        '<path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/>'),
    'docs':         ('文档与知识沉淀', '技术文档生成、项目上下文沉淀、任务交接', '#7c3aed',
        '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>'),
    'devops':       ('CI/CD 与运维', '持续集成交付、Shell 控制面板、守护脚本', '#b45309',
        '<rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>'),
    'agents':       ('多智能体与并行协作', '并行子代理、主控模式、Git worktree 并行开发', '#9d174d',
        '<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>'),
    'prompting':    ('提示词工程与风格', '伪代码化、函数化、硬约束生成、文风控制', '#ea580c',
        '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5"/>'),
    'visual':       ('可视化与特殊输出', 'HTML 逆向、ASCII 图、科研报告等特殊格式', '#6d28d9',
        '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>'),
}

ICONS = {
    'search':  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>',
    'copy':    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',
    'check':   '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M20 6 9 17l-5-5"/></svg>',
    'close':   '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
    'sparkles':'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="24" height="24" rx="5" fill="#c2410c"/><rect x="5" y="4" width="14" height="16" rx="2" fill="#faf8f5" opacity="0.95"/><rect x="7" y="7" width="10" height="1.5" rx="0.75" fill="#c2410c" opacity="0.8"/><rect x="7" y="10" width="8" height="1.5" rx="0.75" fill="#c2410c" opacity="0.6"/><rect x="7" y="13" width="9" height="1.5" rx="0.75" fill="#c2410c" opacity="0.4"/><rect x="14" y="14" width="7" height="7" rx="1.5" fill="#0d9488"/></svg>',
    'layer':   '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>',
    'panel':   '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
}

def svg_wrap(paths, cls='icon'):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="{cls}">{paths}</svg>'

# 分类图标加 SVG 包裹
for _k in CATEGORIES:
    _name, _desc, _color, _paths = CATEGORIES[_k]
    CATEGORIES[_k] = (_name, _desc, _color, svg_wrap(_paths))

def clean_content(c):
    c = c.replace('\\n', '\n').replace('\\t', '\t').replace('\\"', '"')
    c = c.replace('\\/', '/').replace('\\ /', '/')
    c = re.sub(r'^##\s*(content|内容)\s*\n', '', c)
    return c.strip()

def clean_title(t):
    t = clean_content(t)
    t = re.sub(r'^\{?"?(内容|content|任务)"?\s*:\s*"?', '', t)
    t = re.sub(r'"?\}?\s*$', '', t)
    return t.strip()

md = markdown.Markdown(extensions=['tables', 'fenced_code', 'sane_lists'])

by_cat = {}
for m in manual:
    by_cat.setdefault(m['category'], []).append(m)
order = list(CATEGORIES.keys())

# 预渲染每张卡片
card_html = {}
card_meta = {}
for cat in order:
    for m in by_cat.get(cat, []):
        idx = m['index']
        short = SHORT_TITLES.get(idx, m['title'][:40])
        raw = clean_content(m['content'])
        md.reset()
        body_html = md.convert(raw)
        summary = m['summary'] or '（暂无简介）'
        color = CATEGORIES[cat][2]
        title_esc = html.escape(short, quote=True)
        card_html[idx] = f'''<article class="card" data-idx="{idx}" data-cat="{cat}" tabindex="0" role="button" aria-label="查看：{title_esc}">
  <div class="card-accent" style="background:{color}"></div>
  <div class="card-body">
    <div class="card-head">
      <span class="card-ic" style="background:{color}1a;color:{color}">{CATEGORIES[cat][3]}</span>
      <button type="button" class="mini-copy" data-idx="{idx}" title="复制提示词">{ICONS['copy']}</button>
    </div>
    <h3 class="card-title">{title_esc}</h3>
    <p class="summary">{html.escape(summary)}</p>
  </div>
</article>'''
        card_meta[idx] = {'cat': cat, 'short': short, 'title': clean_title(m['title']), 'summary': summary, 'raw': raw, 'body': body_html}

# 侧边栏导航
nav_items = []
for cat in order:
    name, desc, color, ic = CATEGORIES[cat]
    n = len(by_cat.get(cat, []))
    nav_items.append(f'''<a class="nav-item" href="#cat-{cat}" data-cat="{cat}" style="--c:{color}">
  <span class="nav-ic">{ic}</span>
  <span class="nav-name">{name}</span>
  <span class="nav-cnt" data-cnt-cat="{cat}">{n}</span>
</a>''')
NAV = '\n'.join(nav_items)

# 内容区块
sections = []
for cat in order:
    name, desc, color, ic = CATEGORIES[cat]
    cards = '\n'.join(card_html[m['index']] for m in by_cat.get(cat, []))
    sections.append(f'''<section class="cat-sec" id="cat-{cat}" data-cat="{cat}">
  <div class="cat-head">
    <span class="cat-head-ic" style="background:{color}1a;color:{color}">{ic}</span>
    <div>
      <h2 class="cat-name">{name}</h2>
      <p class="cat-desc">{desc}</p>
    </div>
  </div>
  <div class="cards">{cards}</div>
</section>''')
SECTIONS = '\n'.join(sections)

# 组装卡片数据给 JS
card_data_js = json.dumps(card_meta, ensure_ascii=False, separators=(',', ':'))
cat_color_js = json.dumps({k: v[2] for k, v in CATEGORIES.items()}, ensure_ascii=False)
cat_name_js = json.dumps({k: v[0] for k, v in CATEGORIES.items()}, ensure_ascii=False)
cat_icon_js = json.dumps({k: v[3] for k, v in CATEGORIES.items()}, ensure_ascii=False)

total = len(manual)

page = f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AI 提示词手册 · PM 的 AI 提示词库 · {total} 条</title>
<meta name="description" content="写给产品经理的 AI 提示词库——需求分析、架构梳理、重构审查、测试设计、文档沉淀等 {total} 条精选提示词，可直接复制使用。">
<link rel="icon" type="image/svg+xml" href="../favicon.svg">
<style>
:root {{
  --bg:#faf8f5; --panel:#fff; --fg:#1c1917; --muted:#57534e; --muted2:#a8a29e;
  --line:#e7e5e4; --line2:#f5f3ef; --accent:#c2410c; --code-bg:#f8f6f2;
  --amber:#c2410c; --amber-l:#fed7aa; --amber-g:rgba(194,65,12,0.06);
  --teal:#0d9488; --teal-l:#ccfbf1;
  --rose:#be123c; --rose-l:#ffe4e6;
  --violet:#6366f1; --violet-l:#e0e7ff;
  --b:#e7e5e4; --b2:#d6d3d1;
  --radius:12px; --radius-sm:8px;
  --shadow:0 1px 2px rgba(0,0,0,.04);
  --shadow-md:0 4px 16px rgba(0,0,0,.07);
  --shadow-lg:0 24px 64px rgba(0,0,0,.16);
  --font:"PingFang SC","Microsoft YaHei","Hiragino Sans GB",-apple-system,system-ui,sans-serif;
  --font-mono:"SF Mono","Cascadia Code","Fira Code",Consolas,monospace;
}}
* {{ box-sizing:border-box; margin:0; padding:0; }}
html {{ scroll-behavior:smooth; }}
body {{ background:var(--bg); color:var(--fg); font-family:var(--font); line-height:1.7; font-size:0.95rem; }}
.icon {{ width:1em; height:1em; vertical-align:-0.15em; flex-shrink:0; }}
::selection {{ background:var(--amber-l); }}

/* ========== 布局 ========== */
.layout {{ display:flex; min-height:100vh; }}

/* ---------- 左侧导航 ---------- */
.sidebar {{ width:272px; flex-shrink:0; position:fixed; top:0; bottom:0; left:0; background:var(--panel); border-right:1px solid var(--line); display:flex; flex-direction:column; z-index:40; }}
.sb-brand {{ display:flex; align-items:center; gap:11px; padding:20px 20px 16px; }}
.sb-logo {{ width:38px; height:38px; border-radius:11px; background:var(--amber); color:#faf8f5; display:flex; align-items:center; justify-content:center; box-shadow:0 1px 2px rgba(0,0,0,.08); flex-shrink:0; }}
.sb-logo .icon {{ width:20px; height:20px; }}
.sb-back {{ margin-left:auto; width:30px; height:30px; border:1px solid var(--b); border-radius:8px; display:flex; align-items:center; justify-content:center; color:var(--muted2); text-decoration:none; transition:.13s; flex-shrink:0; }}
.sb-back:hover {{ border-color:var(--amber); color:var(--amber); background:var(--amber-g); }}
.sb-title {{ font-weight:700; font-size:1.05rem; letter-spacing:-.01em; }}
.sb-sub {{ font-size:.72rem; color:var(--muted2); margin-top:1px; }}
.sb-search {{ padding:0 16px 14px; }}
.search-box {{ position:relative; }}
.search-box svg {{ position:absolute; left:11px; top:50%; transform:translateY(-50%); color:var(--muted2); width:15px; height:15px; pointer-events:none; }}
#search {{ width:100%; padding:9px 12px 9px 35px; border:1px solid var(--b); border-radius:var(--radius-sm); font-size:.9rem; outline:none; background:var(--panel); transition:.15s; }}
#search:focus {{ border-color:var(--amber); background:#fff; box-shadow:0 0 0 3px rgba(194,65,12,.1); }}
.sb-scroll {{ flex:1; overflow-y:auto; padding:4px 12px 16px; }}
.sb-scroll::-webkit-scrollbar {{ width:6px; }}
.sb-scroll::-webkit-scrollbar-thumb {{ background:#d1d5db; border-radius:3px; }}
.nav-group {{ font-size:.72rem; font-weight:600; color:var(--muted2); letter-spacing:.08em; padding:8px 10px 6px; text-transform:uppercase; }}
.nav-item {{ display:flex; align-items:center; gap:10px; padding:8px 10px; border-radius:var(--radius-sm); color:var(--fg); text-decoration:none; font-size:.89rem; transition:.13s; margin-bottom:2px; }}
.nav-item:hover {{ background:var(--line2); }}
.nav-item.active {{ background:color-mix(in srgb, var(--c) 10%, #fff); color:var(--c); font-weight:600; }}
.nav-ic {{ width:26px; height:26px; border-radius:8px; background:var(--line2); color:var(--muted2); display:flex; align-items:center; justify-content:center; transition:.13s; }}
.nav-ic .icon {{ width:15px; height:15px; }}
.nav-item:hover .nav-ic {{ color:var(--c); }}
.nav-item.active .nav-ic {{ background:var(--c); color:#fff; }}
.nav-name {{ flex:1; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }}
.nav-cnt {{ font-size:.72rem; color:var(--muted2); background:var(--line2); border-radius:999px; padding:1px 8px; font-weight:600; min-width:22px; text-align:center; }}
.nav-item.active .nav-cnt {{ background:color-mix(in srgb, var(--c) 14%, #fff); color:var(--c); }}
.sb-foot {{ border-top:1px solid var(--line); padding:12px 20px; font-size:.75rem; color:var(--muted2); display:flex; align-items:center; gap:7px; }}
.sb-foot .dot {{ width:7px; height:7px; border-radius:50%; background:var(--teal); }}

/* ---------- 内容区 ---------- */
.content {{ flex:1; margin-left:272px; padding:30px 40px 80px; max-width:1120px; }}
.cat-sec {{ margin-bottom:52px; scroll-margin-top:24px; }}
.cat-head {{ display:flex; align-items:center; gap:14px; margin-bottom:20px; }}
.cat-head-ic {{ width:42px; height:42px; border-radius:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }}
.cat-head-ic .icon {{ width:22px; height:22px; }}
.cat-name {{ font-size:1.35rem; font-weight:700; letter-spacing:-.01em; line-height:1.25; }}
.cat-desc {{ color:var(--muted); font-size:.86rem; margin-top:1px; }}

/* ---------- 卡片 ---------- */
.cards {{ display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:16px; }}
.card {{ position:relative; background:var(--panel); border:1px solid var(--line); border-radius:var(--radius); overflow:hidden; cursor:pointer; transition:transform .16s,box-shadow .16s,border-color .16s; box-shadow:var(--shadow); }}
.card:hover, .card:focus-visible {{ transform:translateY(-3px); box-shadow:var(--shadow-md); border-color:var(--b2); outline:none; }}
.card-accent {{ position:absolute; top:0; left:0; right:0; height:3px; opacity:.9; }}
.card-body {{ padding:18px 18px 16px; display:flex; flex-direction:column; gap:10px; }}
.card-head {{ display:flex; align-items:center; justify-content:space-between; }}
.card-ic {{ width:34px; height:34px; border-radius:9px; display:flex; align-items:center; justify-content:center; }}
.card-ic .icon {{ width:18px; height:18px; }}
.card-title {{ font-size:1.02rem; font-weight:700; line-height:1.45; letter-spacing:-.01em; }}
.summary {{ color:var(--muted); font-size:.86rem; line-height:1.6; }}
.mini-copy {{ border:none; background:transparent; color:var(--muted2); padding:5px; border-radius:7px; cursor:pointer; transition:.13s; display:inline-flex; }}
.mini-copy:hover {{ background:var(--line2); color:var(--fg); }}
.mini-copy .icon {{ width:15px; height:15px; }}

/* 空态 */
.no-result {{ display:none; text-align:center; color:var(--muted); padding:70px 0; }}
.no-result .icon {{ width:34px; height:34px; color:var(--muted2); margin-bottom:10px; }}

/* ---------- 页脚 ---------- */
.p-footer {{ margin-left:272px; padding:24px 40px 36px; max-width:1120px; display:flex; align-items:center; gap:12px; color:var(--muted2); font-size:.82rem; border-top:1px solid var(--b); }}
.p-footer-link {{ display:inline-flex; align-items:center; gap:6px; color:var(--muted2); text-decoration:none; font-weight:600; transition:.13s; }}
.p-footer-link:hover {{ color:var(--amber); }}
.p-footer-link .icon {{ width:15px; height:15px; }}
.p-footer-sep {{ color:var(--b2); }}

/* ---------- 弹窗 ---------- */
.modal-overlay {{ position:fixed; inset:0; background:rgba(15,23,42,.45); backdrop-filter:blur(4px); z-index:100; display:none; align-items:center; justify-content:center; padding:24px; opacity:0; transition:opacity .18s; }}
.modal-overlay.open {{ display:flex; opacity:1; }}
.modal {{ background:#fff; border-radius:18px; width:780px; max-width:100%; max-height:88vh; display:flex; flex-direction:column; box-shadow:var(--shadow-lg); transform:translateY(14px) scale(.98); transition:transform .18s; overflow:hidden; }}
.modal-overlay.open .modal {{ transform:none; }}
.modal-head {{ padding:20px 24px 14px; border-bottom:1px solid var(--line); position:relative; }}
.modal-cat {{ display:inline-flex; align-items:center; gap:6px; font-size:.76rem; font-weight:600; padding:3px 10px; border-radius:999px; margin-bottom:8px; }}
.modal-cat .icon {{ width:12px; height:12px; }}
.modal-title {{ font-size:1.25rem; font-weight:700; line-height:1.4; padding-right:88px; letter-spacing:-.01em; }}
.modal-actions {{ position:absolute; top:18px; right:18px; display:flex; gap:8px; }}
.btn {{ display:inline-flex; align-items:center; gap:6px; border:none; border-radius:9px; padding:8px 14px; font-size:.84rem; font-weight:600; cursor:pointer; transition:.13s; }}
.btn .icon {{ width:15px; height:15px; }}
.btn-copy {{ background:var(--amber); color:#fff; }}
.btn-copy:hover {{ background:#ea580c; }}
.btn-copy.copied {{ background:var(--teal); }}
.btn-close {{ background:var(--line2); color:var(--muted); }}
.btn-close:hover {{ background:#e2e5e9; color:var(--fg); }}
.modal-summary {{ padding:14px 24px 0; color:var(--muted); font-size:.9rem; }}
.modal-body {{ flex:1; overflow-y:auto; padding:16px 24px 26px; font-size:.9rem; }}
.modal-body::-webkit-scrollbar {{ width:7px; }}
.modal-body::-webkit-scrollbar-thumb {{ background:var(--b2); border-radius:4px; }}
.modal-body p {{ margin:7px 0; }}
.modal-body h1,.modal-body h2,.modal-body h3,.modal-body h4 {{ margin:14px 0 7px; line-height:1.45; }}
.modal-body h1 {{ font-size:1.35rem; }} .modal-body h2 {{ font-size:1.18rem; }} .modal-body h3 {{ font-size:1.04rem; }} .modal-body h4 {{ font-size:.96rem; }}
.modal-body ul,.modal-body ol {{ padding-left:22px; margin:7px 0; }}
.modal-body li {{ margin:3px 0; }}
.modal-body code {{ background:var(--code-bg); border:1px solid var(--b); border-radius:5px; padding:1px 6px; font-family:var(--font-mono); font-size:.85em; }}
.modal-body pre {{ background:var(--code-bg); border:1px solid var(--b); border-radius:10px; padding:13px 15px; overflow:auto; margin:9px 0; }}
.modal-body pre code {{ background:none; border:none; padding:0; }}
.modal-body table {{ border-collapse:collapse; width:100%; margin:9px 0; font-size:.85em; }}
.modal-body th,.modal-body td {{ border:1px solid var(--b); padding:7px 10px; text-align:left; }}
.modal-body th {{ background:var(--line2); font-weight:600; }}
.modal-body blockquote {{ border:1px solid rgba(194,65,12,0.12); background:var(--amber-g); padding:8px 14px; margin:9px 0; border-radius:8px; color:#57534e; }}
.modal-body hr {{ border:none; border-top:1px solid var(--b); margin:14px 0; }}
.modal-body a {{ color:var(--amber); }}

/* ---------- 响应式 ---------- */
@media (max-width:920px) {{
  .sidebar {{ width:238px; }}
  .content {{ margin-left:238px; padding:22px 18px 60px; }}
  .p-footer {{ margin-left:238px; padding:20px 18px 32px; }}
}}
@media (max-width:680px) {{
  .layout {{ flex-direction:column; }}
  .sidebar {{ position:static; width:100%; flex-direction:row; flex-wrap:wrap; align-items:center; gap:8px; border-right:none; border-bottom:1px solid var(--line); padding:10px 14px; }}
  .sb-brand {{ padding:0; }}
  .sb-search {{ padding:0; flex:1; min-width:140px; }}
  .sb-scroll {{ flex:none; width:100%; order:4; max-height:160px; }}
  .sb-foot {{ display:none; }}
  .content {{ margin-left:0; }}
  .p-footer {{ margin-left:0; padding:20px 18px 32px; }}
}}
</style>
</head>
<body>
<div class="layout">

  <!-- 左侧导航 -->
  <aside class="sidebar">
    <div class="sb-brand">
      <div class="sb-logo">{ICONS['sparkles']}</div>
      <div>
        <div class="sb-title">AI 提示词手册</div>
        <div class="sb-sub">{total} 条 · 10 大类</div>
      </div>
      <a class="sb-back" href="../index.html" title="返回 AI PM 手册">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
      </a>
    </div>
    <div class="sb-search">
      <div class="search-box">
        {ICONS['search']}
        <input id="search" type="text" placeholder="搜索提示词…" autocomplete="off">
      </div>
    </div>
    <nav class="sb-scroll" id="nav">
      <div class="nav-group">分类导航</div>
      {NAV}
    </nav>
    <div class="sb-foot"><span class="dot"></span>AI PM 手册 · 提示词子库</div>
  </aside>

  <!-- 内容区 -->
  <main class="content" id="content">
    {SECTIONS}
    <div class="no-result" id="no-result">
      {ICONS['search']}
      <p>未找到匹配的提示词，试试其他关键词</p>
    </div>
  </main>
</div>

<footer class="p-footer">
  <a href="../index.html" class="p-footer-link">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
    返回 AI PM 手册
  </a>
  <span class="p-footer-sep">·</span>
  <span>AI 提示词手册 · {total} 条 · 10 大类</span>
</footer>

<!-- 弹窗 -->
<div class="modal-overlay" id="modal">
  <div class="modal" role="dialog" aria-modal="true">
    <div class="modal-head">
      <div class="modal-cat" id="m-cat"></div>
      <h2 class="modal-title" id="m-title"></h2>
      <div class="modal-actions">
        <button class="btn btn-copy" id="m-copy">{ICONS['copy']}<span>复制提示词</span></button>
        <button class="btn btn-close" id="m-close">{ICONS['close']}</button>
      </div>
    </div>
    <p class="modal-summary" id="m-summary"></p>
    <div class="modal-body" id="m-body"></div>
  </div>
</div>

<script>
const CARD_DATA = {card_data_js};
const CAT_COLOR = {cat_color_js};
const CAT_NAME = {cat_name_js};
const CAT_ICON = {cat_icon_js};

const search = document.getElementById('search');
const cards = Array.from(document.querySelectorAll('.card'));
const secs = Array.from(document.querySelectorAll('.cat-sec'));
const navItems = Array.from(document.querySelectorAll('.nav-item'));
const noResult = document.getElementById('no-result');
const modal = document.getElementById('modal');

/* ---------- 卡片索引 ---------- */
cards.forEach(card => {{
  const idx = card.dataset.idx;
  const d = CARD_DATA[idx];
  if (d) card.dataset.search = (d.short + ' ' + d.summary + ' ' + d.raw + ' ' +
    d.body.replace(/<[^>]+>/g, ' ')).toLowerCase();
}});

/* ---------- 搜索过滤 ---------- */
function filter() {{
  const q = search.value.trim().toLowerCase();
  let visible = 0;
  const perCat = {{}};
  cards.forEach(card => {{
    const hit = !q || card.dataset.search.includes(q);
    card.style.display = hit ? '' : 'none';
    if (hit) {{ visible++; perCat[card.dataset.cat] = (perCat[card.dataset.cat]||0) + 1; }}
  }});
  secs.forEach(sec => {{
    const n = perCat[sec.dataset.cat] || 0;
    sec.style.display = (q === '' || n > 0) ? '' : 'none';
    const cnt = document.querySelector('[data-cnt-cat="'+sec.dataset.cat+'"]');
    if (cnt) cnt.textContent = n;
  }});
  noResult.style.display = (q && visible === 0) ? 'flex' : 'none';
  // 无搜索词时恢复真实数量
  if (q === '') resetCounts();
}}
function resetCounts() {{
  cards.forEach(c => c.style.display = '');
  secs.forEach(sec => {{
    const n = sec.querySelectorAll('.card').length;
    const cnt = document.querySelector('[data-cnt-cat="'+sec.dataset.cat+'"]');
    if (cnt) cnt.textContent = n;
  }});
  noResult.style.display = 'none';
}}
search.addEventListener('input', filter);

/* ---------- 导航滚动监听 ---------- */
function setActive(cat) {{
  navItems.forEach(n => n.classList.toggle('active', n.dataset.cat === cat));
}}
navItems.forEach(item => {{
  item.addEventListener('click', () => {{
    setActive(item.dataset.cat);
    const sec = document.getElementById('cat-' + item.dataset.cat);
    if (sec) sec.scrollIntoView({{behavior:'smooth', block:'start'}});
  }});
}});
// scroll spy
const obs = new IntersectionObserver((entries) => {{
  entries.forEach(e => {{ if (e.isIntersecting) setActive(e.target.dataset.cat); }});
}}, {{ rootMargin:'-20% 0px -70% 0px' }});
secs.forEach(s => obs.observe(s));

/* ---------- 弹窗 ---------- */
let curRaw = '';
function openModal(idx) {{
  const d = CARD_DATA[idx];
  if (!d) return;
  const color = CAT_COLOR[d.cat];
  document.getElementById('m-cat').innerHTML = CAT_ICON[d.cat] + CAT_NAME[d.cat];
  document.getElementById('m-cat').style.background = color + '1a';
  document.getElementById('m-cat').style.color = color;
  document.getElementById('m-title').textContent = d.short;
  document.getElementById('m-summary').textContent = d.summary;
  document.getElementById('m-body').innerHTML = d.body;
  curRaw = d.raw;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('m-copy').classList.remove('copied');
  document.getElementById('m-copy').innerHTML =
    '{ICONS[chr(99)+chr(111)+chr(112)+chr(121)]}<span>复制提示词</span>';
}}
function closeModal() {{
  modal.classList.remove('open');
  document.body.style.overflow = '';
}}
cards.forEach(card => {{
  card.addEventListener('click', (e) => {{
    if (e.target.closest('.mini-copy')) return; // 忽略复制按钮
    openModal(card.dataset.idx);
  }});
  card.addEventListener('keydown', (e) => {{
    if (e.key === 'Enter' || e.key === ' ') {{ e.preventDefault(); openModal(card.dataset.idx); }}
  }});
}});
document.getElementById('m-close').addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {{ if (e.target === modal) closeModal(); }});
document.addEventListener('keydown', (e) => {{ if (e.key === 'Escape') closeModal(); }});

/* ---------- 复制 ---------- */
function doCopy(btn, text, doneLabel) {{
  const flash = () => {{
    const old = btn.innerHTML;
    btn.classList.add('copied');
    btn.innerHTML = '{ICONS[chr(99)+chr(104)+chr(101)+chr(99)+chr(107)]}' + doneLabel;
    setTimeout(() => {{ btn.classList.remove('copied'); btn.innerHTML = old; }}, 1500);
  }};
  if (navigator.clipboard && navigator.clipboard.writeText) {{
    navigator.clipboard.writeText(text).then(flash).catch(() => fallback(btn, text, flash));
  }} else {{ fallback(btn, text, flash); }}
}}
function fallback(btn, text, flash) {{
  const ta = document.createElement('textarea');
  ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
  document.body.appendChild(ta); ta.select();
  try {{ document.execCommand('copy'); flash(); }} catch(e) {{ alert('复制失败，请手动复制'); }}
  document.body.removeChild(ta);
}}
document.querySelectorAll('.mini-copy').forEach(btn => {{
  btn.addEventListener('click', (e) => {{
    e.stopPropagation();
    const d = CARD_DATA[btn.dataset.idx];
    if (d) doCopy(btn, d.raw, '<span>已复制</span>');
  }});
}});
document.getElementById('m-copy').addEventListener('click', (e) => {{
  doCopy(e.currentTarget, curRaw, '<span>已复制</span>');
}});
</script>
</body>
</html>'''

# JS 里用 chr 拼接的图标占位替换为真实 SVG（避免 f-string 引号冲突）
page = page.replace('{ICONS[chr(99)+chr(111)+chr(112)+chr(121)]}', ICONS['copy'])
page = page.replace('{ICONS[chr(99)+chr(104)+chr(101)+chr(99)+chr(107)]}', ICONS['check'])

out_path = 'docs/提示词手册-2026-08-11.html'
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(page)

import os
print('已生成:', out_path)
print('大小: %.1f KB' % (os.path.getsize(out_path)/1024))
