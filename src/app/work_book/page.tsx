// src/app/post/page.tsx

import Link from "next/link";
import { getAllSlugs } from "@/lib/markdown";

export default function PostIndexPage() {
  const slugs = getAllSlugs(); // [['hello'], ['a', 'test1']]

  return (
    <main className="p-6 prose dark:prose-invert">
      <h1>📂 마크다운 리스트</h1>
      <ul>
        {slugs.map((slugArr,index) => {
          const path = slugArr.join("/");
          return (
            <li key={path}>
              {index+1}. <Link href={`/work_book/${path}`}>{path}</Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
