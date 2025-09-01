// 평소에는 div지만 사용자가 클릭을하면 input으로 변하고 >0~100까지만 입력할수 있게 제한하며 입력이 끝나면 다시 div로 전환되고 입력한 숫자는 percent라는 state에 저장
import React, { useState, useRef, useEffect } from "react";

type EditablePercentProps = {
  percent: number;
  setPercent: (value: number) => void;
  className?: string;
};

const clamp = (n: number) => Math.max(0, Math.min(100, n));

export default function PercentBtn({
  percent,
  setPercent,
  className = "",
}: EditablePercentProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<string>(String(clamp(percent)));
  const inputRef = useRef<HTMLInputElement>(null);

  // 편집 모드 진입 시 자동 포커스
  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const startEdit = () => {
    setDraft(String(percent));
    setEditing(true);
  };

  const cancelEdit = () => {
    setDraft(String(percent));
    setEditing(false);
  };

  const commitEdit = () => {
    const parsed = Number(draft);
    if (draft.trim() === "" || isNaN(parsed)) {
      cancelEdit();
      return;
    }
    const next = clamp(parsed);
    setPercent(next);
    setEditing(false);
  };

  return (
    <div className={className}>
      {editing ? (
        <div className="inline-flex items-center gap-1">
          <input
            ref={inputRef}
            type="number"
            inputMode="numeric"
            min={0}
            max={100}
            step={1}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitEdit();
              if (e.key === "Escape") cancelEdit();
            }}
            onWheel={(e) => (e.target as HTMLInputElement).blur()}
            className="w-20 rounded border px-2 py-1 text-right"
            aria-label="percent input"
          />
          <span className="text-sm text-gray-500">%(정답공개비율)</span>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={startEdit}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") startEdit();
          }}
          className="inline-flex min-w-20 cursor-text items-center rounded px-2 py-1 hover:bg-gray-100"
          aria-label="percent display"
        >
          <span className="mr-1">{percent}</span>%(정답공개비율)
        </div>
      )}
    </div>
  );
}
