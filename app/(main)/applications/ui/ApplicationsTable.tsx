"use client";

import { Eye, Pencil, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TablePagination } from "@/app/components/ui/TablePagination";
import type { ApplicationRow, StatusFilter } from "../data/applications";
import type { RowExtra } from "./EditModal";

interface ApplicationsTableProps {
  rows: ApplicationRow[];
  statusFilters: StatusFilter[];
  extras: Record<string, RowExtra>;
  page: number;
  rowsPerPage: number;
  total: number;
  onPageChange: (p: number) => void;
  onRowsPerPageChange: (rpp: number) => void;
  onRowClick: (row: ApplicationRow) => void;
  onEdit: (id: string) => void;
  onHistory: (id: string) => void;
  onOpenFile: (extra: RowExtra) => void;
}

const COLUMNS = [
  "№ заявки",
  "Дата поступления",
  "Инициатор",
  "Подразделение инициатора",
  "Описание",
  "Стоимость",
  "№ договора",
  "Исполнитель",
  "Статус",
  "Договор",
  "Время изменения",
  "Статья",
  "№ ЗНО",
  "Платежный документ",
  "Действия",
];

export function ApplicationsTable({
  rows,
  statusFilters,
  extras,
  page,
  rowsPerPage,
  total,
  onPageChange,
  onRowsPerPageChange,
  onRowClick,
  onEdit,
  onHistory,
  onOpenFile,
}: ApplicationsTableProps) {
  const visibleRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-auto max-h-[calc(100vh-260px)]">
        <Table className="w-full text-sm">
          <TableHeader className="bg-muted/50 sticky top-0 z-10">
            <TableRow>
              {COLUMNS.map((col) => (
                <TableHead
                  key={col}
                  className="whitespace-nowrap border-b border-border"
                >
                  {col}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleRows.map((row) => {
              const status = statusFilters.find((s) => s.key === row.status);
              const extra = extras[row.id];
              return (
                <TableRow
                  key={row.id}
                  onClick={() => onRowClick(row)}
                  className="border-b border-border last:border-b-0 hover:bg-muted/30 cursor-pointer transition-colors"
                >
                  <TableCell className="whitespace-nowrap">{row.id}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {row.date}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {row.initiator}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {row.type}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {row.description}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {row.cost} {row.currency}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {row.contractNum}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {row.executor}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="inline-block size-2 rounded-full shrink-0"
                        style={{ backgroundColor: status?.color }}
                      />
                      {status?.label}
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {row.contract}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {row.updatedAt}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {row.article}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {extra?.znoNum || row.znoNum}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {extra?.paymentFileName ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenFile(extra);
                        }}
                        className="flex items-center gap-1"
                      >
                        <Eye className="size-3" />
                        Посмотреть
                      </Button>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(row.id);
                        }}
                        className="flex items-center gap-1"
                      >
                        <Pencil className="size-3" />
                        Править
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onHistory(row.id);
                        }}
                        className="flex items-center gap-1"
                      >
                        <History className="size-3" />
                        История
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        count={total}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}–${to} из ${count}`
        }
      />
    </div>
  );
}
