"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface StatusFilterOption {
  key: string;
  label: string;
  color: string;
}

interface StatusFilterBarProps {
  filters: StatusFilterOption[];
  activeKey: string;
  onSelect: (key: string) => void;
  counts: Record<string, number>;
}

export function StatusFilterBar({
  filters,
  activeKey,
  onSelect,
  counts,
}: StatusFilterBarProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 md:flex-wrap [&::-webkit-scrollbar]:hidden scrollbar-none px-4 -mx-4 md:px-0 md:mx-0">
      {filters.map((f) => {
        const active = activeKey === f.key;
        return (
          <Button
            key={f.key}
            variant="ghost"
            onClick={() => onSelect(f.key)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-lg border text-sm shrink-0 h-auto",
              active
                ? "border-current font-semibold text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50",
            )}
            style={active ? { borderColor: f.color } : {}}
          >
            <span
              className="inline-block size-2.5 rounded-full shrink-0"
              style={{ backgroundColor: f.color }}
            />
            {f.label}
            <span className="text-xs font-semibold text-muted-foreground ml-0.5">
              {counts[f.key] ?? 0}
            </span>
          </Button>
        );
      })}
    </div>
  );
}
