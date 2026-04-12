"use client";

import { Pencil, History } from "lucide-react";
import type { ApplicationRow, StatusFilter } from "../data/applications";

interface ApplicationCardProps {
  row: ApplicationRow;
  status: StatusFilter | undefined;
  onSelect: () => void;
  onEdit: () => void;
  onHistory: () => void;
}

export function ApplicationCard({
  row,
  status,
  onSelect,
  onEdit,
  onHistory,
}: ApplicationCardProps) {
  return (
    <div
      onClick={onSelect}
      className="bg-card border border-border rounded-lg p-4 cursor-pointer hover:bg-muted/20 transition-colors shadow-sm"
    >
      <div className="flex justify-between items-start mb-2">
        <p className="text-sm font-semibold">{row.id}</p>
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block size-2 rounded-full shrink-0"
            style={{ backgroundColor: status?.color }}
          />
          <span
            className="text-xs font-medium"
            style={{ color: status?.color }}
          >
            {status?.label}
          </span>
        </div>
      </div>

      <p className="text-sm mb-1">{row.description}</p>
      <p className="text-xs text-muted-foreground">
        {row.initiator} · {row.date}
      </p>

      <div className="flex justify-between items-center mt-3">
        <p className="text-sm font-semibold">
          {row.cost} {row.currency}
        </p>
        <div className="flex gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="p-1.5 rounded border border-border hover:bg-muted transition-colors"
          >
            <Pencil className="size-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onHistory();
            }}
            className="p-1.5 rounded border border-border hover:bg-muted transition-colors"
          >
            <History className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
