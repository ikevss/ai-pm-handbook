import { remark } from 'remark';
import remarkHtml from 'remark-html';

/** 把 Markdown 字符串渲染为安全的 HTML 字符串（用于 dangerouslySetInnerHTML） */
export async function renderMarkdown(md: string): Promise<string> {
  const result = await remark().use(remarkHtml).process(md);
  return result.toString();
}
