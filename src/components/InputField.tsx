"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
interface InlineInputProps {
  answer: string;
  resetSignal?: number;
}

export default function InlineInput({ answer, resetSignal }: InlineInputProps) {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"default" | "correct" | "wrong">(
    "default"
  );
  const [showAnswer, setShowAnswer] = useState(false);
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

  useEffect(() => {
    setValue("");
    setStatus("default");
    setShowAnswer(false);
  }, [resetSignal]);

  return (
    <span
      className="relative inline-block"
      style={{ width: `${answer.length + 6}ch`, minWidth: "50px" }}
    >
      <input
        value={value}
        onChange={onChange}
        data-answer={answer}
        className={`inline-code-input border px-1 rounded outline-none w-full pr-5 transition-colors
          ${
            status === "default"
              ? "border-gray-300"
              : status === "correct"
              ? "border-green-500"
              : "border-red-500"
          }`}
      />

      <button
        type="button"
        className="absolute right-1 top-1/2 -translate-y-1/2 text-xs underline opacity-25 hover:cursor-pointer"
        onClick={() => setShowAnswer((prev) => !prev)}
      >
        {showAnswer ? <FaRegEyeSlash /> : <FaRegEye />}
      </button>

      {showAnswer && (
        <div className="absolute top-full mt-1 left-0 text-sm text-gray-700 bg-gray-100 border rounded px-2 py-1 shadow z-2">
          {answer}
        </div>
      )}
    </span>
  );
}
