// import { getAllSlugs, getHtmlFromMarkdown, getMarkdownBySlug } from "@/lib/markdown";

// export async function generateStaticParams() {
//   const slugs = getAllSlugs(); // [['hello'], ['a', 'test1']]
//   return slugs.map((slug) => ({ slug }));
// }

// type Props = {
//   params: {
//     slug: string[];
//   };
// };

// export default async function MarkdownPage({ params }: Props) {

//     const html = await getHtmlFromMarkdown(params.slug);
//     return (
//       <div className="markdown-body mx-auto px-4 py-10">
//         <h1 className="markdown-title">{html.data.title}</h1>
//         <div dangerouslySetInnerHTML={{ __html: html.content }} />
//       </div>
//     );
// }

import { getAllSlugs, getMarkdownBySlug } from "@/lib/markdown";
import ClientPage from "./ClientPage";

// ✅ 타입 직접 정의하지 말고, 구조 분해로만 사용
export default async function MarkdownPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const decodedSlug = params.slug.map(decodeURIComponent);
  const { data, content } = await getMarkdownBySlug(decodedSlug);

  return (
    <div className="markdown-body mx-auto px-4 py-10">
      <h1 className="markdown-title">{data.title}</h1>
      <ClientPage markdown={content} />
    </div>
  );
}

// ✅ Promise<{ slug: string[] }[]> 정확히 명시
export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  const allSlug = getAllSlugs();

  return allSlug.map((slugArr) => ({
    slug: slugArr.map((s) => encodeURIComponent(s)),
  }));
}