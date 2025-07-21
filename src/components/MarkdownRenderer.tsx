"use client";

import React from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeReact from "rehype-react";

const InlineCode = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-code">{children}</span>
);

interface Props {
  markdown: string;
}

export function MarkdownRenderer({ markdown }: Props) {
  const file = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeReact, {
      createElement: React.createElement,
      Fragment: React.Fragment,
      components: {
        code: InlineCode,
      },
    })
    .processSync(markdown);

  return <>{file.result}</>;
}
