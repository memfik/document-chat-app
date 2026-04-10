"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SearchBar } from "@/app/components/SearchBar";
import { ACC_DATA } from "./data/accompaniment";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";


export default function AccompanimentPage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [currentYearOnly, setCurrentYearOnly] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setTimeout(() => setLoading(false), 400);
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 2.5, px: { xs: 2, sm: 3 } }}>
      <Box mb={2}>
        <SearchBar
          value={search}
          onChange={setSearch}
          currentYearOnly={currentYearOnly}
          onYearToggle={() => setCurrentYearOnly((v) => !v)}
        />
      </Box>

      {isMobile ? (
        <>
          <Box display="flex" flexDirection="column" gap={1.5} mb={1}>
            {ACC_DATA.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <Paper key={row.id} elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={0.5}>
                  <Typography variant="subtitle2" fontWeight={600}>{row.id}</Typography>
                  <Typography variant="caption" color="text.secondary">{row.contractNum}</Typography>
                </Box>
                <Typography variant="body2" mb={0.5}>{row.supplier}</Typography>
                <Typography variant="caption" color="text.secondary">{row.initiator} · {row.dept}</Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={1.5}>
                  <Typography variant="body2" fontWeight={600}>{row.cost} KZT</Typography>
                  <Typography variant="caption" color="text.secondary">Поставка: {row.deliveryDate}</Typography>
                </Box>
              </Paper>
            ))}
          </Box>
          <Paper>
            <TablePagination
              component="div"
              count={ACC_DATA.length}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={(_, p) => setPage(p)}
              onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
              rowsPerPageOptions={[25, 50, 75, 100]}
              labelRowsPerPage="Строк:"
              labelDisplayedRows={({ from, to, count }) => `${from}–${to} из ${count}`}
            />
          </Paper>
        </>
      ) : (
        <Paper>
          <TableContainer sx={{ maxHeight: "calc(100vh - 260px)" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {["№ заявки", "Инициатор", "Деп. иниц.", "Поставщик", "№ договора", "Дата поставки", "Стоимость", "Дата оплаты", "Исполнитель"].map((col) => (
                    <TableCell key={col}><b>{col}</b></TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {ACC_DATA.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
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
            count={ACC_DATA.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={(_, p) => setPage(p)}
            onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
            rowsPerPageOptions={[25, 50, 75, 100]}
            labelRowsPerPage="Строк на странице:"
            labelDisplayedRows={({ from, to, count }) => `${from}–${to} из ${count}`}
            sx={{ position: "sticky", bottom: 0, bgcolor: "background.paper", borderTop: "1px solid", borderColor: "divider" }}
          />
        </Paper>
      )}
    </Box>
  );
}
