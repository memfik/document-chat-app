"use client";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  Box,
  Typography,
} from "@mui/material";
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
  const visibleRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper>
      <TableContainer sx={{ maxHeight: "calc(100vh - 260px)" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {[
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
              ].map((col) => (
                <TableCell key={col}>
                  <b>{col}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row) => {
              const status = statusFilters.find((s) => s.key === row.status);
              const extra = extras[row.id];
              return (
                <TableRow
                  key={row.id}
                  hover
                  onClick={() => onRowClick(row)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.initiator}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>
                    {row.cost} {row.currency}
                  </TableCell>
                  <TableCell>{row.contractNum}</TableCell>
                  <TableCell>{row.executor}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={0.75}>
                      <Box sx={{ width: 8, height: 8, borderRadius: "50%", flexShrink: 0, bgcolor: status?.color }} />
                      {status?.label}
                    </Box>
                  </TableCell>
                  <TableCell>{row.contract}</TableCell>
                  <TableCell>{row.updatedAt}</TableCell>
                  <TableCell>{row.article}</TableCell>
                  <TableCell>{extra?.znoNum || row.znoNum}</TableCell>
                  <TableCell>
                    {extra?.paymentFileName ? (
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<VisibilityIcon sx={{ fontSize: "0.85rem !important" }} />}
                        onClick={(e) => { e.stopPropagation(); onOpenFile(extra); }}
                        sx={{ borderRadius: 2, textTransform: "none", fontSize: "0.7rem", py: 0.5, px: 1 }}
                      >
                        Посмотреть
                      </Button>
                    ) : (
                      <Typography variant="caption" color="text.disabled">—</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Box display="grid" gap={1}>                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<EditIcon sx={{ fontSize: "0.85rem !important" }} />}
                        onClick={(e) => { e.stopPropagation(); onEdit(row.id); }}
                        sx={{
                          textTransform: "none",
                          borderRadius: 2,
                          fontSize: "0.7rem",
                          color: "text.secondary",
                          borderColor: "grey.300",
                          py: 0.5,
                          px: 5,
                        }}
                      >
                        Править
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<HistoryIcon sx={{ fontSize: "0.85rem !important" }} />}
                        onClick={(e) => { e.stopPropagation(); onHistory(row.id); }}
                        sx={{
                          textTransform: "none",
                          fontSize: "0.7rem",
                          color: "text.secondary",
                          borderColor: "grey.300",
                          borderRadius: 2,
                          py: 0.5,
                          px: 1,
                        }}
                      >
                        История
                      </Button>
                    </Box>
                  </TableCell>
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
        sx={{
          position: "sticky",
          bottom: 0,
          bgcolor: "background.paper",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      />
    </Paper>
  );
}
