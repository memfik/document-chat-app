"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
            {visible.map((row) => {
              const status = ZNO_STATUS_FILTERS.find(
                (s) => s.key === row.status,
              );
              return (
                <TableRow
                  key={row.id}
                  className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
                >
                  <TableCell className="whitespace-nowrap">{row.id}</TableCell>
                  <TableCell className="whitespace-nowrap">{row.payBefore}</TableCell>
                  <TableCell className="whitespace-nowrap">{row.initiator}</TableCell>
                  <TableCell className="whitespace-nowrap">{row.type}</TableCell>
                  <TableCell className="whitespace-nowrap">{row.counterparty}</TableCell>
                  <TableCell className="whitespace-nowrap">{row.amount}</TableCell>
                  <TableCell className="whitespace-nowrap">{row.currency}</TableCell>
                  <TableCell className="whitespace-nowrap">{row.contractNum}</TableCell>
                  <TableCell className="whitespace-nowrap">{row.executor}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="inline-block size-2 rounded-full shrink-0"
                        style={{ backgroundColor: status?.color }}
                      />
                      {status?.label}
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{row.updatedAt}</TableCell>
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
        labelDisplayedRows={({ from, to, count }) => `${from}–${to} из ${count}`}
      />
    </div>
  );
}
