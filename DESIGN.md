# Design System: AI PM Coding 手册

## 1. Visual Theme & Atmosphere

一份面向产品经理的硬核实战手册，气质是「克制的建筑工作室」——
像一间光线充足的工作室：中性灰白基底承载信息密度，单一的青绿作为唯一强调色，
像一支记号笔在图纸上做标注。布局偏左对齐、非对称留白，克制而有秩序。
密度 Balanced（5），variance 偏克制（5），motion Fluid CSS（5）。

关键词：秩序、克制、专业、可读性优先、清新而不喧哗。

## 2. Color Palette & Roles

- **Canvas White** (#FAFAF9) — 全局背景表面，Stone-50 暖灰白
- **Pure Surface** (#FFFFFF) — 卡片与容器填充
- **Charcoal Ink** (#1C1917) — 主文本，Stone-900 深度
- **Muted Steel** (#78716C) — 次级文本、描述、元数据，Stone-500
- **Whisper Border** (#E7E5E4) — 卡片边框、1px 结构线，Stone-200
- **Mint Accent** (#28B894) — 单一强调色（青绿），用于 CTA、激活态、聚焦环、链接

唯一 accent 为青绿，饱和度 < 80%。全站禁用紫/蓝霓虹、禁用渐变霓虹文字、禁用纯黑 #000000。

## 3. Typography Rules

- **Display:** Geist — 标题，track-tight，靠字重与颜色建立层级，不靠巨大字号吼叫
- **Body:** Geist — 正文，松弛行高，行宽上限 65ch，次级色
- **Mono:** Geist Mono — 代码、元数据、编号、数字
- **Banned:** Inter、通用衬线（Times/Georgia/Garamond）、仪表盘内衬线

## 4. Component Stylings

- **Buttons:** 扁平，无外发光。激活态 -1px translate 触感。Primary 用 Ember 填充，次级用 ghost/outline。
- **Cards:** 圆角 1rem，扩散微阴影（用暖色调 tint）。仅在需要层级时用卡片；高密度处改用 border-top 分隔。
- **Inputs:** 标签在上，错误在下，聚焦环用 accent 色。无浮动标签。
- **Loaders:** 骨架屏 shimmer，尺寸匹配布局。禁用圆形 spinner。
- **Empty States:** 组合式构图，不止一句「暂无数据」。
- **Badge:** 描边式，状态色用低饱和底色 + 深色文字。

## 5. Layout Principles

Grid 优先，非对称 Hero（左对齐）。`max-width: 1400px` 容器居中。
无 flexbox 百分比数学。全高区块用 `min-h-[100dvh]`，禁用 `h-screen`。
移动端 < 768px 一律单列，无横向滚动。

## 6. Motion & Interaction

交互元素用 spring（stiffness 100 / damping 20），不用 linear。
列表入场用 stagger cascade，不用瞬间整块挂载。
仅动画 `transform` 与 `opacity`，禁动画 `top/left/width/height`。
尊重 `prefers-reduced-motion`。

## 7. Anti-Patterns (Banned)

- 禁止 emoji（全用 lucide 图标）
- 禁止 Inter 字体
- 禁止纯黑 #000000
- 禁止霓虹外发光阴影
- 禁止过饱和 accent、渐变霓虹文字
- 禁止自定义鼠标光标
- 禁止元素重叠，始终清晰空间分离
- 禁止 3 列均等卡片 feature row
- 禁止占位名（John Doe / Acme / Nexus）
- 禁止假整数（99.99%、50%）
- 禁止 AI 文案陈词（Elevate / Seamless / Unleash / Next-Gen）
- 禁止填充文案（Scroll to explore / 滚动箭头 / 弹跳 chevron）
- 禁止居中 Hero（高 variance 项目）
