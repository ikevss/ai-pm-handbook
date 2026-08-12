# -*- coding: utf-8 -*-

path = 'E:/AIwork/mimocode/ai-pm-handbook/index.html'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

# ============ 新 station-1 内容 ============
new_station = '''<!-- ====== STATION 1: 理论框架 ====== -->
<section class="section" id="station-1" aria-labelledby="s1-title">
  <h2 class="station-title" id="s1-title">理论框架</h2>
  <div class="station-why"><p>很多 PM 拿着 AI 工具，但思维还是传统的"写需求→评审→排期"。这里帮你识别 <strong>3 个核心思维转变</strong>。理解"为什么变了"比记住"怎么做"更重要——AI 时代 PM 的核心竞争力不是"会用工具"，而是<strong>"能判断 AI 做对了没有"</strong>。</p></div>

  <!-- 一、协作链变化：镜像对开横幅 -->
  <h3 class="subhead">协作链：从「人→人」到「人→AI→人」</h3>
  <div class="tf-chain">
    <div class="tf-chain-row old">
      <span class="tf-chain-tag">过去的协作链</span>
      <div class="tf-chain-nodes">
        <span class="tf-node">PM 写需求</span><span class="tf-arrow">→</span>
        <span class="tf-node">设计师出图</span><span class="tf-arrow">→</span>
        <span class="tf-node">前端开发</span><span class="tf-arrow">→</span>
        <span class="tf-node">后端开发</span><span class="tf-arrow">→</span>
        <span class="tf-node">QA 测试</span>
      </div>
      <ul class="tf-chain-pts">
        <li>最贵的环节是<strong>沟通对齐</strong>——开会、评审、反复确认，沟通成本随人数线性增长</li>
        <li>最大风险是<strong>做慢了</strong>——排期排不上、返工成本高，项目周期等于各环节时长之和</li>
        <li>PM 的核心能力：<strong>想清楚要什么 + 说服别人</strong></li>
      </ul>
    </div>
    <div class="tf-chain-gap"><span>AI 介入</span></div>
    <div class="tf-chain-row new">
      <span class="tf-chain-tag">现在的协作链</span>
      <div class="tf-chain-nodes">
        <span class="tf-node">PM 描述意图</span><span class="tf-arrow">→</span>
        <span class="tf-node">AI 生成方案+代码</span><span class="tf-arrow">→</span>
        <span class="tf-node">PM 判断对不对</span><span class="tf-arrow">→</span>
        <span class="tf-node">技术同事把关</span>
      </div>
      <ul class="tf-chain-pts">
        <li>最贵的环节是<strong>判断 AI 给的对不对</strong>——你没说的它会脑补，你说错的它会认真执行</li>
        <li>最大风险是<strong>做快了但错了且没人发现</strong>——AI 一口气做完 80%，你才发现方向错了</li>
        <li>PM 的核心能力：<strong>想清楚要什么 + 定义什么叫做对了 + 能查出它错没错</strong></li>
      </ul>
    </div>
  </div>

  <!-- 二、三个思维转变：三栏卡片墙 -->
  <h3 class="subhead">三个必须切换的思维习惯</h3>
  <div class="tf-switch-grid">
    <div class="tf-switch-card">
      <h4 class="tf-switch-title">从描述功能<br>到定义验收</h4>
      <p class="tf-switch-label">过去</p>
      <p class="tf-switch-text">写 PRD："做一个客户列表页，支持搜索和筛选"——AI 会脑补你没说的所有细节</p>
      <p class="tf-switch-label">现在</p>
      <p class="tf-switch-text">写验收标准："搜'张'能搜到张三；搜不到显示'没找到'；两个筛选能叠加；五千条不卡；断网显示重试按钮"</p>
      <p class="tf-switch-core">写不出验收标准 = 你自己还没想清楚</p>
    </div>
    <div class="tf-switch-card">
      <h4 class="tf-switch-title">从一次说清<br>到小步逼近</h4>
      <p class="tf-switch-label">过去</p>
      <p class="tf-switch-text">文档一次写全，因为返工贵。但 AI 一口气做完 80%，你才发现方向错了，全废</p>
      <p class="tf-switch-label">现在</p>
      <p class="tf-switch-text">说个大概→AI 复述→纠偏→出方案→做一小块→看效果→继续。永远不让 AI 连做三步以上不给你看中间产物</p>
      <p class="tf-switch-core">每一环都短，每一环都能叫停</p>
    </div>
    <div class="tf-switch-card">
      <h4 class="tf-switch-title">从相信交付<br>到默认怀疑</h4>
      <p class="tf-switch-label">过去</p>
      <p class="tf-switch-text">开发说"做完了"= 可以验收。AI 说"已完成""测试通过"，可信度接近于零</p>
      <p class="tf-switch-label">现在</p>
      <p class="tf-switch-text">追问三句："我怎么自己看到效果？""你测了哪些、没测哪些？""最坏会怎样、怎么退回去？"——答不上来 = 没做完</p>
      <p class="tf-switch-core">这不是不信任，这是流程</p>
    </div>
  </div>

  <div class="callout"><strong>一句话带走：</strong>AI 把「实现」变便宜了，于是「判断」变成了最贵的东西。你的价值从"写清楚要什么"转移到了"说清楚什么算对，并且能查出它错没错"。</div>

  <!-- 三、六个维度：2x3 紧凑对照网格 -->
  <h3 class="subhead">六个维度的底层变化</h3>
  <div class="tf-dim-grid">
    <div class="tf-dim-card">
      <div class="tf-dim-head"><span class="tf-dim-ic">💹</span><span class="tf-dim-num">01</span><h4 class="tf-dim-title">价值模型</h4></div>
      <div class="tf-dim-line"><span class="tf-dim-k old">旧</span><p>抓住心智入口 → 边际成本趋近 0 → 后期商业化<br><em>先免费做大规模，用户即资产</em></p></div>
      <div class="tf-dim-line"><span class="tf-dim-k new">新</span><p>场景落地深度 → 边际成本正相关 → 即时价值交付<br><em>AI 调用有成本，每个用户必须即时产生价值</em></p></div>
    </div>
    <div class="tf-dim-card">
      <div class="tf-dim-head"><span class="tf-dim-ic">📉</span><span class="tf-dim-num">02</span><h4 class="tf-dim-title">边际成本</h4></div>
      <div class="tf-dim-line"><span class="tf-dim-k old">旧</span><p>边际成本 → 0，软件复制无限份<br><em>用户越多，单位成本越低，规模效应越强</em></p></div>
      <div class="tf-dim-line"><span class="tf-dim-k new">新</span><p>边际成本 ∝ 使用量<br><em>每次调用消耗 Token/算力，必须确保价值 &gt; 成本</em></p></div>
    </div>
    <div class="tf-dim-card">
      <div class="tf-dim-head"><span class="tf-dim-ic">🗄️</span><span class="tf-dim-num">03</span><h4 class="tf-dim-title">资产定义</h4></div>
      <div class="tf-dim-line"><span class="tf-dim-k old">旧</span><p>用户量 = 资产，DAU/MAU 是核心指标<br><em>用户数据可后期变现，先圈地后赚钱</em></p></div>
      <div class="tf-dim-line"><span class="tf-dim-k new">新</span><p>数据 + 落地场景 = 资产<br><em>独家数据让 AI 越用越准，场景嵌入让 AI 不可替代</em></p></div>
    </div>
    <div class="tf-dim-card">
      <div class="tf-dim-head"><span class="tf-dim-ic">🔗</span><span class="tf-dim-num">04</span><h4 class="tf-dim-title">壁垒来源</h4></div>
      <div class="tf-dim-line"><span class="tf-dim-k old">旧</span><p>网络效应 + 规模效应<br><em>用户越多价值越高、成本越低，双轮飞轮</em></p></div>
      <div class="tf-dim-line"><span class="tf-dim-k new">新</span><p>数据飞轮 + 场景嵌入深度 + 工作流锁定<br><em>没有数据和场景的 AI 产品，模型一升级就归零</em></p></div>
    </div>
    <div class="tf-dim-card">
      <div class="tf-dim-head"><span class="tf-dim-ic">🎯</span><span class="tf-dim-num">05</span><h4 class="tf-dim-title">PM 核心能力</h4></div>
      <div class="tf-dim-line"><span class="tf-dim-k old">旧</span><p>需求洞察 + 沟通协调 + 项目管理<br><em>核心是"描述+协调"，产出物给人看</em></p></div>
      <div class="tf-dim-line"><span class="tf-dim-k new">新</span><p>问题框定 + 约束定义 + 验证判断 + 迭代节奏<br><em>核心是"约束+验证"，产出物 AI 直接消费</em></p></div>
    </div>
    <div class="tf-dim-card">
      <div class="tf-dim-head"><span class="tf-dim-ic">🧠</span><span class="tf-dim-num">06</span><h4 class="tf-dim-title">思考模型</h4></div>
      <div class="tf-dim-line"><span class="tf-dim-k old">旧</span><p>描述型思维——"用户应该能做什么"<br><em>PRD 描述功能列表、用户故事描述需求</em></p></div>
      <div class="tf-dim-line"><span class="tf-dim-k new">新</span><p>约束型思维——"系统不允许做什么 + 必须遵守什么"<br><em>围栏比方向更重要——AI 自己会想怎么做，你定义什么不能做</em></p></div>
    </div>
  </div>
</section>
'''

# 定位 station-1 边界
start = c.find('<!-- ====== STATION 1: 理论框架 ====== -->')
end = c.find('<!-- ====== STATION 3: 文件资产 ====== -->')
assert start != -1 and end != -1 and end > start, f"start={start} end={end}"

c = c[:start] + new_station + c[end:]

with open(path, 'w', encoding='utf-8') as f:
    f.write(c)

print("OK: station-1 replaced. len:", len(c))
