"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="pl-8 pr-8 w-full"
        />
        {value && (
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => onChange("")}
            className="absolute right-1 top-1/2 -translate-y-1/2"
          >
            <X className="size-3.5 text-muted-foreground" />
          </Button>
        )}
      </div>
      {onYearToggle && (
        <Button
          variant="outline"
          onClick={onYearToggle}
          className={cn(
            "shrink-0 whitespace-nowrap",
            currentYearOnly
              ? "bg-[#2db351] text-white border-[#2db351] hover:bg-[#208c3d] hover:text-white dark:bg-[#2db351] dark:text-white dark:hover:bg-[#208c3d]"
              : "",
          )}
        >
          Только текущий год
        </Button>
      )}
    </div>
  );
}
