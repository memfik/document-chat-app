"use client";

import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { DocsDropdown } from "./DocsDropdown";
import { SidebarTooltip } from "./SidebarTooltip";

interface SidebarActionsProps {
  expanded: boolean;
  textCls: string;
  onImportOpen: () => void;
}

export function SidebarActions({ expanded, textCls, onImportOpen }: SidebarActionsProps) {
  return (
    <div className="px-2 pt-2 pb-1">
      <SidebarTooltip label="Импорт" show={!expanded}>
        <button
          onClick={onImportOpen}
          className={cn(
            "w-full flex items-center h-8 rounded-md text-sm text-muted-foreground hover:bg-muted/50 transition-colors mb-0.5",
            expanded ? "px-3 gap-2" : "justify-center px-2",
          )}
        >
          <Upload className="size-4 shrink-0" />
          <span className={cn("whitespace-nowrap overflow-hidden", !expanded && textCls)}>
            Импорт
          </span>
        </button>
      </SidebarTooltip>
      <DocsDropdown expanded={expanded} />
    </div>
  );
}
