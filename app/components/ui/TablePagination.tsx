"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

  return (
    <div
      className={cn(
        "flex items-center justify-end gap-4 px-4 py-2 text-sm border-t border-border bg-card sticky bottom-0",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">{labelRowsPerPage}</span>
        <select
          value={rowsPerPage}
          onChange={(e) => {
            onRowsPerPageChange(parseInt(e.target.value, 10));
            onPageChange(0);
          }}
          className="border border-border rounded px-1.5 py-0.5 text-sm bg-background text-foreground"
        >
          {rowsPerPageOptions.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
      <span className="text-muted-foreground">{displayedRows}</span>
      <div className="flex items-center gap-1">
        <button
          disabled={page === 0}
          onClick={() => onPageChange(page - 1)}
          className="p-1 rounded hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          disabled={page >= totalPages - 1}
          onClick={() => onPageChange(page + 1)}
          className="p-1 rounded hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
