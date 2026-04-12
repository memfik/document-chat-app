"use client";

import { Send } from "lucide-react";

interface CommentBoxProps {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
}

export function CommentBox({ value, onChange, onSend }: CommentBoxProps) {
  return (
    <div className="border border-border rounded-lg p-4 mb-8 bg-card">
      <p className="text-sm text-muted-foreground mb-2">Добавить комментарий</p>
      <textarea
        className="textarea-base"
        rows={3}
        placeholder="Введите комментарий..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) onSend();
        }}
      />
      <div className="flex items-center justify-between mt-3 gap-2">
        <p className="hidden sm:block text-xs text-muted-foreground">
          Ctrl+Enter для отправки
        </p>
        <button
          disabled={!value.trim()}
          onClick={onSend}
          className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-[#f96800] text-white hover:bg-[#e05a00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
        >
          <Send className="size-4" />
          Отправить
        </button>
      </div>
    </div>
  );
}
