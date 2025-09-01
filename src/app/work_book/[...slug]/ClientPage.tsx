"use client";
import PercentBtn from "@/components/btn/PercentBtn";
import InlineInput from "@/components/InputField";
import { probabilityFn } from "@/lib/custom_math";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ClientPage({ markdown }: { markdown: string }) {
  const [resetSignal, setResetSignal] = useState(0);
  const [percent, setPercent] = useState(50); //문제 공개 비율
  const onReset = () => {
    setResetSignal((s) => s + 1);
  };

  return (
    <div>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ children }) {
            const answer = String(children).trim();

            // ✅ 인라인 코드만 커스텀 처리
            if (probabilityFn(100 - percent)) {
              return <InlineInput answer={answer} resetSignal={resetSignal} />;
            } else {
              return <span className="inline-code">{children}</span>;
            }
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
      <div className="flex fixed bottom-6 right-6 gap-1">
        <div className=" bg-red-600 rounded">
          <PercentBtn
            className="w-full h-full flex justify-center align-items text-white"
            percent={percent}
            setPercent={setPercent}
          />
        </div>
        <button
          onClick={onReset}
          className=" bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700"
        >
          리셋 (랜덤 재배치)
        </button>
      </div>
    </div>
  );
}
