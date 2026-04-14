"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface TablePaginationProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rpp: number) => void;
  rowsPerPageOptions?: number[];
  labelRowsPerPage?: string;
  labelDisplayedRows?: (args: { from: number; to: number; count: number }) => string;
  className?: string;
}

export function TablePagination({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [25, 50, 75, 100],
  labelRowsPerPage = "Строк на странице:",
  labelDisplayedRows,
  className,
}: TablePaginationProps) {
  const from = count === 0 ? 0 : page * rowsPerPage + 1;
  const to = Math.min((page + 1) * rowsPerPage, count);
  const totalPages = Math.ceil(count / rowsPerPage);
  const displayedRows = labelDisplayedRows
    ? labelDisplayedRows({ from, to, count })
    : `${from}–${to} из ${count}`;

  // Build page buttons with ellipsis
  const pageButtons: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 0; i < totalPages; i++) pageButtons.push(i);
  } else {
    const near = new Set([0, 1, totalPages - 2, totalPages - 1, page - 1, page, page + 1].filter(i => i >= 0 && i < totalPages));
    let prev: number | null = null;
    Array.from(near).sort((a, b) => a - b).forEach((i) => {
      if (prev !== null && i - prev > 1) pageButtons.push("...");
      pageButtons.push(i);
      prev = i;
    });
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-3 px-4 py-2 text-sm border-t border-border bg-card sticky bottom-0",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">{labelRowsPerPage}</span>
        <Select
          value={String(rowsPerPage)}
          onValueChange={(val) => {
            if (val) {
              onRowsPerPageChange(parseInt(val, 10));
              onPageChange(0);
            }
          }}
        >
          <SelectTrigger className="h-7 w-16 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {rowsPerPageOptions.map((n) => (
              <SelectItem key={n} value={String(n)}>
                {n}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <span className="text-muted-foreground">{displayedRows}</span>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon-sm"
          disabled={page === 0}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft className="size-4" />
        </Button>

        {pageButtons.map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="px-1 text-muted-foreground select-none">
              …
            </span>
          ) : (
            <Button
              key={p}
              variant={p === page ? "default" : "ghost"}
              size="icon-sm"
              onClick={() => onPageChange(p)}
              className={cn(
                "min-w-7 text-xs",
                p === page && "bg-[#f96800] hover:bg-[#e05a00] text-white",
              )}
            >
              {p + 1}
            </Button>
          )
        )}

        <Button
          variant="ghost"
          size="icon-sm"
          disabled={page >= totalPages - 1}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
