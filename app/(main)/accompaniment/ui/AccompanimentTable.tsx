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
            {visible.map((row) => (
              <TableRow
                key={row.id}
                className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
              >
                <TableCell className="whitespace-nowrap">{row.id}</TableCell>
                <TableCell className="whitespace-nowrap">{row.initiator}</TableCell>
                <TableCell className="whitespace-nowrap">{row.dept}</TableCell>
                <TableCell className="whitespace-nowrap">{row.supplier}</TableCell>
                <TableCell className="whitespace-nowrap">{row.contractNum}</TableCell>
                <TableCell className="whitespace-nowrap">{row.deliveryDate}</TableCell>
                <TableCell className="whitespace-nowrap">{row.cost}</TableCell>
                <TableCell className="whitespace-nowrap">{row.paymentDate}</TableCell>
                <TableCell className="whitespace-nowrap">{row.executor}</TableCell>
              </TableRow>
            ))}
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
