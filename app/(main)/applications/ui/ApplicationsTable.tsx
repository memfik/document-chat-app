"use client";

import { Eye, Pencil, History } from "lucide-react";
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
        <table className="w-full text-sm">
          <thead className="bg-muted/50 sticky top-0 z-10">
            <tr>
              {COLUMNS.map((col) => (
                <th
                  key={col}
                  className="px-3 py-2.5 text-left font-semibold text-foreground whitespace-nowrap border-b border-border"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => {
              const status = statusFilters.find((s) => s.key === row.status);
              const extra = extras[row.id];
              return (
                <tr
                  key={row.id}
                  onClick={() => onRowClick(row)}
                  className="border-b border-border last:border-b-0 hover:bg-muted/30 cursor-pointer transition-colors"
                >
                  <td className="px-3 py-2 whitespace-nowrap">{row.id}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{row.date}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {row.initiator}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">{row.type}</td>
                  <td className="px-3 py-2 max-w-[200px] truncate">
                    {row.description}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {row.cost} {row.currency}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {row.contractNum}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {row.executor}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="inline-block size-2 rounded-full shrink-0"
                        style={{ backgroundColor: status?.color }}
                      />
                      {status?.label}
                    </div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {row.contract}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {row.updatedAt}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">{row.article}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {extra?.znoNum || row.znoNum}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {extra?.paymentFileName ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenFile(extra);
                        }}
                        className="flex items-center gap-1 text-xs px-2 py-1 rounded border border-border hover:bg-muted transition-colors"
                      >
                        <Eye className="size-3" />
                        Посмотреть
                      </button>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(row.id);
                        }}
                        className="flex items-center gap-1 text-xs px-3 py-1 rounded border border-border text-muted-foreground hover:bg-muted transition-colors"
                      >
                        <Pencil className="size-3" />
                        Править
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onHistory(row.id);
                        }}
                        className="flex items-center gap-1 text-xs px-2 py-1 rounded border border-border text-muted-foreground hover:bg-muted transition-colors"
                      >
                        <History className="size-3" />
                        История
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
