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

  return (
    <div
      className={cn(
        "flex items-center justify-end gap-4 px-4 py-2 text-sm border-t border-border bg-card sticky bottom-0",
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
