"use client";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import type { AccompanimentRow } from "../data/accompaniment";

const COLUMNS = ["№ заявки", "Инициатор", "Деп. иниц.", "Поставщик", "№ договора", "Дата поставки", "Стоимость", "Дата оплаты", "Исполнитель"];

interface AccompanimentTableProps {
  rows: AccompanimentRow[];
  page: number;
  rowsPerPage: number;
  total: number;
  onPageChange: (p: number) => void;
  onRowsPerPageChange: (rpp: number) => void;
}

export function AccompanimentTable({ rows, page, rowsPerPage, total, onPageChange, onRowsPerPageChange }: AccompanimentTableProps) {
  const visible = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper>
      <TableContainer sx={{ maxHeight: "calc(100vh - 260px)" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {COLUMNS.map((col) => <TableCell key={col}><b>{col}</b></TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {visible.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.initiator}</TableCell>
                <TableCell>{row.dept}</TableCell>
                <TableCell>{row.supplier}</TableCell>
                <TableCell>{row.contractNum}</TableCell>
                <TableCell>{row.deliveryDate}</TableCell>
                <TableCell>{row.cost}</TableCell>
                <TableCell>{row.paymentDate}</TableCell>
                <TableCell>{row.executor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={total}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, p) => onPageChange(p)}
        onRowsPerPageChange={(e) => { onRowsPerPageChange(parseInt(e.target.value, 10)); onPageChange(0); }}
        rowsPerPageOptions={[25, 50, 75, 100]}
        labelRowsPerPage="Строк на странице:"
        labelDisplayedRows={({ from, to, count }) => `${from}–${to} из ${count}`}
        sx={{ position: "sticky", bottom: 0, bgcolor: "background.paper", borderTop: "1px solid", borderColor: "divider" }}
      />
    </Paper>
  );
}
