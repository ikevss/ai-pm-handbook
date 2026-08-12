import re

path = 'E:/AIwork/mimocode/ai-pm-handbook/index.html'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

# 6 dimensions: (icon, title)
dims = [
    ("💹", "价值模型"),
    ("📉", "边际成本"),
    ("🗄️", "资产定义"),
    ("🔗", "壁垒来源"),
    ("🎯", "PM 核心能力"),
    ("🧠", "思考模型"),
]

# Horizontal right arrow SVG (旧 → 新)
RIGHT_ARROW = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>'

for idx, (icon, title) in enumerate(dims):
    num = f"{idx+1:02d}"

    # 1. Fix the head: insert icon before .dim-num
    # Current: <div class="dim-head"><span class="dim-num">NN</span><h4 class="dim-title">标题</h4></div>
    old_head = f'<div class="dim-head"><span class="dim-num">{num}</span><h4 class="dim-title">{title}</h4></div>'
    new_head = f'<div class="dim-head"><span class="dim-ic">{icon}</span><span class="dim-num">{num}</span><h4 class="dim-title">{title}</h4></div>'
    assert old_head in c, f"head not found for {num} {title}"
    c = c.replace(old_head, new_head)

    # 2. Fix the mid arrow: replace downward svg with horizontal right arrow
    # The mid block is: <div class="dim-mid"><svg ...down...></svg></div>
    # Replace any <div class="dim-mid">...</div> (only the arrow content)
    old_mid_pattern = re.compile(r'<div class="dim-mid"><svg[^>]*>.*?</svg></div>', re.S)
    # Do per-card to keep order: find the Nth occurrence
    matches = list(old_mid_pattern.finditer(c))
    assert len(matches) >= idx + 1, f"mid not found for {num}"
    m = matches[idx]
    c = c[:m.start()] + f'<div class="dim-mid">{RIGHT_ARROW}</div>' + c[m.end():]

with open(path, 'w', encoding='utf-8') as f:
    f.write(c)

print('OK: updated', len(dims), 'dim cards. Right arrows:', c.count(RIGHT_ARROW), 'dim-ic:', c.count('class="dim-ic"'))
