"use client";

import { TablePagination } from "@/app/components/ui/TablePagination";
import type { AccompanimentRow } from "../data/accompaniment";

const COLUMNS = [
  "№ заявки",
  "Инициатор",
  "Деп. иниц.",
  "Поставщик",
  "№ договора",
  "Дата поставки",
  "Стоимость",
  "Дата оплаты",
  "Исполнитель",
];

interface AccompanimentTableProps {
  rows: AccompanimentRow[];
  page: number;
  rowsPerPage: number;
  total: number;
  onPageChange: (p: number) => void;
  onRowsPerPageChange: (rpp: number) => void;
}

export function AccompanimentTable({
  rows,
  page,
  rowsPerPage,
  total,
  onPageChange,
  onRowsPerPageChange,
}: AccompanimentTableProps) {
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
            {visible.map((row) => (
              <tr
                key={row.id}
                className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
              >
                <td className="px-3 py-2 whitespace-nowrap">{row.id}</td>
                <td className="px-3 py-2 whitespace-nowrap">{row.initiator}</td>
                <td className="px-3 py-2 whitespace-nowrap">{row.dept}</td>
                <td className="px-3 py-2 whitespace-nowrap">{row.supplier}</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  {row.contractNum}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  {row.deliveryDate}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">{row.cost}</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  {row.paymentDate}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">{row.executor}</td>
              </tr>
            ))}
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
