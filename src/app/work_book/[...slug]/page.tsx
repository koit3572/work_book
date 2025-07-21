
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





import { getMarkdownBySlug } from "@/lib/markdown";
import ClientPage from "./ClientPage";


export default async function MarkdownPage({ params }: { params: { slug: string[] } }) {
  const { data, content } = await getMarkdownBySlug(params.slug);

  return (
    <div className="markdown-body mx-auto px-4 py-10">
      <h1 className="markdown-title">{data.title}</h1>
      <ClientPage markdown={content} />
    </div>
  );
}






