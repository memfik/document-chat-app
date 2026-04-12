"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  currentYearOnly?: boolean;
  onYearToggle?: () => void;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Поиск...",
  currentYearOnly,
  onYearToggle,
}: SearchBarProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="input-base pl-8 pr-8"
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-muted"
          >
            <X className="size-3.5 text-muted-foreground" />
          </button>
        )}
      </div>
      {onYearToggle && (
        <button
          onClick={onYearToggle}
          className={cn(
            "shrink-0 px-3 py-1.5 text-sm rounded-lg border transition-colors whitespace-nowrap",
            currentYearOnly
              ? "bg-[#2db351] text-white border-[#2db351] hover:bg-[#208c3d]"
              : "border-border text-muted-foreground hover:bg-muted/50",
          )}
        >
          Только текущий год
        </button>
      )}
    </div>
  );
}
