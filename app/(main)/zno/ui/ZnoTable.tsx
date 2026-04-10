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
  Box,
} from "@mui/material";
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

const COLUMNS = ["№ заявки", "Оплатить до", "Инициатор", "Тип", "Контрагент", "Сумма", "Валюта", "№ договора", "Исполнитель", "Статус", "Изменено"];

export function ZnoTable({ rows, page, rowsPerPage, total, onPageChange, onRowsPerPageChange }: ZnoTableProps) {
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
            {visible.map((row) => {
              const status = ZNO_STATUS_FILTERS.find((s) => s.key === row.status);
              return (
                <TableRow key={row.id} hover>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.payBefore}</TableCell>
                  <TableCell>{row.initiator}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.counterparty}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.currency}</TableCell>
                  <TableCell>{row.contractNum}</TableCell>
                  <TableCell>{row.executor}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={0.75}>
                      <Box sx={{ width: 8, height: 8, borderRadius: "50%", flexShrink: 0, bgcolor: status?.color }} />
                      {status?.label}
                    </Box>
                  </TableCell>
                  <TableCell>{row.updatedAt}</TableCell>
                </TableRow>
              );
            })}
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
