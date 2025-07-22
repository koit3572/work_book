import fs from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

// work_book파일구조 배열로 변환
export function getAllSlugs(): string[][] {
  const basePath = path.join(process.cwd(), "src", "work_book");
  function walkDir(dirPath: string): string[][] {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    let paths: string[][] = [];

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        paths = paths.concat(walkDir(fullPath));
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        const relativePath = decodeURIComponent(path.relative(basePath, fullPath));
        const slugArray = relativePath.replace(/\.md$/, "").split(path.sep);
        paths.push(slugArray);
      }
    }
    return paths;
  }

  return walkDir(basePath);
}

// Markdown 읽기
export function getMarkdownBySlug(slugArray: string[]): any {
  const slugPath =
    decodeURIComponent(path.join(process.cwd(), "src", "work_book", ...slugArray) + ".md");
  if (!fs.existsSync(slugPath)) throw new Error("File not found");
  const fileContents = fs.readFileSync(decodeURIComponent(slugPath), "utf-8");
  const { data, content: markdownContent } = matter(fileContents);
  return {
    data: data,
    content: markdownContent,
  };
}

// HTML변환 함수 
export async function parseMarkdown(markdown: string): Promise<string> {
  const result = await remark().use(gfm).use(html).process(markdown);
  return result.toString();
}

//MTML내 코드 변환
export function highlightInlineCode(html: string): string {
  return html.replace(/<code>(.*?)<\/code>/g, (_, content) => {
    return `<span class="inline-code">${content}</span>`;
  });
}

