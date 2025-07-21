import { getMarkdownBySlug } from "@/lib/markdown";
import ClientPage from "./ClientPage";

interface PageProps {
  params: {
    slug: string[];
  };
}

export default function MarkdownPage({ params }: PageProps) {
  const { data, content } = getMarkdownBySlug(params.slug);

  return (
    <div className="markdown-body mx-auto px-4 py-10">
      <h1 className="markdown-title">{data.title}</h1>
      <ClientPage markdown={content} />
    </div>
  );
}
