import io

path = 'E:/AIwork/mimocode/ai-pm-handbook/index.html'
with open(path, 'r', encoding='utf-8') as f:
    c = f.read()

# The prompt-kit block to move (with its comment header)
start = c.find('<!-- ====== 提示词手册入口 ====== -->')
end = c.find('<!-- ====== STATION 1: 理论框架 ====== -->')
assert start != -1 and end != -1 and end > start, f"start={start} end={end}"
block = c[start:end]
print("Moved block length:", len(block))
print("Block head:", block[:60].replace("\n", "\\n"))

# Remove the block from original position
c = c[:start] + c[end:]

# Insert block before STATION 5 (模仿改进)
marker = '<!-- ====== STATION 5: 模仿改进 ====== -->'
pos = c.find(marker)
assert pos != -1, "station-5 marker not found"
c = c[:pos] + block + c[pos:]

with open(path, 'w', encoding='utf-8') as f:
    f.write(c)

# Verify new order
import re
order = []
for m in re.finditer(r'<!-- ====== ([^=]+) ====== -->', c):
    order.append(m.group(1))
print("Section order now:")
for i, s in enumerate(order):
    print(f"  {i+1}. {s}")
