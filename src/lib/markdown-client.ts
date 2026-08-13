import { remark } from "remark";
import remarkHtml from "remark-html";

/** 在浏览器端把 Markdown 字符串渲染为安全的 HTML 字符串 */
export async function renderMarkdownClient(md: string): Promise<string> {
  const result = await remark().use(remarkHtml).process(md);
  return result.toString();
}