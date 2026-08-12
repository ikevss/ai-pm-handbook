import re

path = 'E:/AIwork/mimocode/ai-pm-handbook/index.html'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

# Define the 6 dimensions data: title, old_main, old_sub, new_main, new_sub
dims = [
    ("价值模型", "抓住心智入口 → 边际成本趋近 0 → 后期商业化", "先免费做大规模，用户即资产",
     "场景落地深度 → 边际成本正相关 → 即时价值交付", "AI 调用有成本，每个用户必须即时产生价值"),
    ("边际成本", "边际成本 → 0，软件复制无限份", "用户越多，单位成本越低，规模效应越强",
     "边际成本 ∝ 使用量", "每次调用消耗 Token/算力，必须确保价值 &gt; 成本"),
    ("资产定义", "用户量 = 资产，DAU/MAU 是核心指标", "用户数据可后期变现，先圈地后赚钱",
     "数据 + 落地场景 = 资产", "独家数据让 AI 越用越准，场景嵌入让 AI 不可替代"),
    ("壁垒来源", "网络效应 + 规模效应", "用户越多价值越高、成本越低，双轮飞轮",
     "数据飞轮 + 场景嵌入深度 + 工作流锁定", "没有数据和场景的 AI 产品，模型一升级就归零"),
    ("PM 核心能力", "需求洞察 + 沟通协调 + 项目管理", "核心是“描述+协调”，产出物给人看",
     "问题框定 + 约束定义 + 验证判断 + 迭代节奏", "核心是“约束+验证”，产出物 AI 直接消费"),
    ("思考模型", "描述型思维——“用户应该能做什么”", "PRD 描述功能列表、用户故事描述需求",
     "约束型思维——“系统不允许做什么 + 必须遵守什么”", "围栏比方向更重要——AI 自己会想怎么做，你定义什么不能做"),
]

def dim_card(idx, d):
    title, old_main, old_sub, new_main, new_sub = d
    num = f"{idx+1:02d}"
    return f'''    <div class="dim-card">
      <div class="dim-head"><span class="dim-num">{num}</span><h4 class="dim-title">{title}</h4></div>
      <div class="dim-cols">
        <div class="dim-side old">
          <span class="dim-tag old">旧</span>
          <p class="dim-main">{old_main}</p>
          <p class="dim-sub">{old_sub}</p>
        </div>
        <div class="dim-mid"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg></div>
        <div class="dim-side new">
          <span class="dim-tag new">新</span>
          <p class="dim-main">{new_main}</p>
          <p class="dim-sub">{new_sub}</p>
        </div>
      </div>
    </div>'''

cards = "\n".join(dim_card(i, d) for i, d in enumerate(dims))

new_block = f'''  <h3 class="subhead">六个维度的底层变化</h3>
  <div class="dimensions">
    <div class="dim-grid">
{cards}
    </div>
  </div>'''

# Replace from <h3 class="subhead">六个维度的底层变化</h3> to </div>\n  </div>\n</section> (the dimensions closing)
start = c.find('<h3 class="subhead">六个维度的底层变化</h3>')
end = c.find('</section>', start)
assert start != -1 and end != -1, f"anchor not found start={start} end={end}"

# The block ends before </section>. We replace everything from start to end.
new_content = c[:start] + new_block + '\n' + c[end:]

with open(path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f'OK: replaced dimensions block. {len(c)} -> {len(new_content)} bytes')
