"use client";

import { TablePagination } from "@/app/components/ui/TablePagination";
import type { ZnoRow } from "../data/zno";
import { ZNO_STATUS_FILTERS } from "../data/zno";

interface ZnoTableProps {
  rows: ZnoRow[];
  page: number;
  rowsPerPage: number;
  total: number;
  onPageChange: (p: number) => void;
  onRowsPerPageChange: (rpp: number) => void;
}

const COLUMNS = [
  "№ заявки",
  "Оплатить до",
  "Инициатор",
  "Тип",
  "Контрагент",
  "Сумма",
  "Валюта",
  "№ договора",
  "Исполнитель",
  "Статус",
  "Изменено",
];

export function ZnoTable({
  rows,
  page,
  rowsPerPage,
  total,
  onPageChange,
  onRowsPerPageChange,
}: ZnoTableProps) {
  const visible = rows.slice(
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
                  className="px-3 py-2.5 text-left font-semibold whitespace-nowrap border-b border-border"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => {
              const status = ZNO_STATUS_FILTERS.find(
                (s) => s.key === row.status,
              );
              return (
                <tr
                  key={row.id}
                  className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="px-3 py-2 whitespace-nowrap">{row.id}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {row.payBefore}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {row.initiator}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">{row.type}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {row.counterparty}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">{row.amount}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {row.currency}
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
                    {row.updatedAt}
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
        labelDisplayedRows={({ from, to, count }) => `${from}–${to} из ${count}`}
      />
    </div>
  );
}
