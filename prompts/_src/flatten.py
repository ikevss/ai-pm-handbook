import json
items = json.load(open('docs/.tmp/prompts_parsed.json', encoding='utf-8'))
bs = chr(92)

def deep_unescape(s):
    """解开多层 JSON 转义"""
    prev = None
    s_cur = s
    for _ in range(6):
        s_new = s_cur.replace(bs*2 + 'n', '\n').replace(bs*2 + 't', '\t').replace(bs*2 + '"', '"').replace(bs*2, bs)
        if s_new == s_cur:
            break
        s_cur = s_new
    s_cur = s_cur.replace(bs + 'n', '\n').replace(bs + 't', '\t').replace(bs + '"', '"').replace(bs + '/', '/')
    return s_cur

def strip_json_wrapper(s):
    """去掉 {\"content\":\"...\"} 或 {\"任务\":...} 等 JSON 包裹，保留内层文本"""
    s2 = s.strip()
    # 处理 {"content":"... 或 {"内容":"...
    for key in ['content', '内容', '任务']:
        pat = '{"' + key + '":'
        if s2.startswith(pat):
            s2 = s2[len(pat):]
            # 去掉开头引号（如果是引号包裹）
            if s2.startswith('"'):
                s2 = s2[1:]
            # 去掉结尾的 "}
            if s2.endswith('"}') or s2.endswith('"}'):
                s2 = s2[:-2]
            # 如果残留单个结尾引号
            if s2.endswith('"') and not s2.endswith('\\"'):
                s2 = s2[:-1]
            break
    return s2

def flatten(x, depth=0):
    if isinstance(x, str):
        s = x.strip()
        if (s.startswith('{') or s.startswith('[')):
            try:
                v = json.loads(s)
                if isinstance(v, (dict, list)):
                    return flatten(v, depth+1)
            except Exception:
                pass
        return s
    if isinstance(x, dict):
        parts = []
        for k, v in x.items():
            parts.append(f'## {k}\n{flatten(v, depth+1)}')
        return '\n\n'.join(parts)
    if isinstance(x, list):
        return '\n'.join(f'- {flatten(v, depth+1)}' for v in x)
    return str(x)

out = []
for i, x in enumerate(items):
    title = x['title']
    content = x['content']
    if isinstance(content, str):
        content = deep_unescape(content)
        content = strip_json_wrapper(content)
    content = flatten(content)
    content = content.replace('\\n', '\n').replace('\\t', '\t').replace('\\"', '"').replace('\\/', '/')
    if content.startswith('## content\n'):
        content = content[len('## content\n'):]
    if content.startswith('## 内容\n'):
        content = content[len('## 内容\n'):]
    content = content.strip()
    out.append({'index': i, 'title': title, 'content': content})

json.dump(out, open('docs/.tmp/prompts_flat.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

# 验证所有条目
for idx in [34, 61, 43, 44, 58, 59]:
    c = out[idx]['content']
    print(f'[{idx}] 字面{bs}n={chr(92)+"n" in c} 双重={bs*2 in c} 前70:')
    print('   ', repr(c[:70]))

# 全文件检查字面反斜杠
allc = '\n'.join(o['content'] for o in out)
print('\n全部内容中字面反斜杠数:', allc.count(bs))
print('全部内容中字面反斜杠n数:', allc.count(bs+'n'))
