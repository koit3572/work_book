import { getAllSlugs, getMarkdownBySlug } from "@/lib/markdown";
import ClientPage from "./ClientPage";

type PageProps = {
  params: {
    slug: string[];
  };
};

export default async function MarkdownPage({ params: { slug } }: PageProps) {
  const decoded = slug.map(decodeURIComponent);
  const { data, content } = await getMarkdownBySlug(decoded);

  return (
    <div className="markdown-body mx-auto px-4 py-10">
      <h1 className="markdown-title">{data.title}</h1>
      <ClientPage markdown={content} />
    </div>
  );
}

export async function generateStaticParams() {
  const allSlug = await getAllSlugs();

  return allSlug.map((slugArr) => ({
    slug: slugArr.map((s) => encodeURIComponent(s)),
  }));
}
