"use client";
import React, { useState, useRef, useEffect } from "react";

interface InlineInputProps {
  answer: string;
  resetSignal?: number; // 외부 리셋 신호용(숫자 바뀔 때 리셋)
}

export default function InlineInput({ answer, resetSignal }: InlineInputProps) {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"default" | "correct" | "wrong">(
    "default"
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const normalize = (str: string) => str.replace(/\s+/g, "").trim();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanedValue = e.target.value.replace(/[\r\n]/g, "");
    setValue(cleanedValue);
    setStatus("default");

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      if (normalize(cleanedValue) === normalize(answer)) {
        setStatus("correct");
      } else {
        setStatus("wrong");
      }
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // resetSignal이 바뀌면 리셋 처리
  useEffect(() => {
    setValue("");
    setStatus("default");
  }, [resetSignal]);

  return (
    <input
      value={value}
      onChange={onChange}
      data-answer={answer}
      className={`inline-code-input border px-1 rounded outline-none transition-colors
        ${
          status === "default"
            ? "border-gray-300"
            : status === "correct"
            ? "border-green-500"
            : "border-red-500"
        }
      `}
      style={{ minWidth: 50 }}
    />
  );
}
