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

export default async function MarkdownPage({
  params: { slug },
}: {
  params: { slug: string[] };
}) {
  const decoded = slug.map(decodeURIComponent);
  const { data, content } = await getMarkdownBySlug(decoded);

  return (
    <div className="markdown-body mx-auto px-4 py-10">
      <h1 className="markdown-title">{data.title}</h1>
      <ClientPage markdown={content} />
    </div>
  );
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  const allSlug = getAllSlugs();

  return allSlug.map((slugArr) => ({
    slug: slugArr.map((s) => encodeURIComponent(s)),
  }));
}