"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SearchBar } from "@/app/components/SearchBar";
import { StatusFilterBar } from "@/app/components/StatusFilterBar";
import { ZNO_DATA, ZNO_STATUS_FILTERS } from "./data/zno";
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

export default function ZnoPage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("all");
  const [currentYearOnly, setCurrentYearOnly] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setTimeout(() => setLoading(false), 400);
  }, []);

  const statusCounts = Object.fromEntries(
    ZNO_STATUS_FILTERS.map((f) => [
      f.key,
      f.key === "all"
        ? ZNO_DATA.length
        : ZNO_DATA.filter((r) => r.status === f.key).length,
    ]),
  );

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
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

      <Box mb={2}>
        <StatusFilterBar
          filters={ZNO_STATUS_FILTERS}
          activeKey={activeStatus}
          onSelect={setActiveStatus}
          counts={statusCounts}
        />
      </Box>

      {isMobile ? (
        <>
          <Box display="flex" flexDirection="column" gap={1.5} mb={1}>
            {ZNO_DATA.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage,
            ).map((row) => {
              const status = ZNO_STATUS_FILTERS.find(
                (s) => s.key === row.status,
              );
              return (
                <Paper
                  key={row.id}
                  elevation={1}
                  sx={{ p: 2, borderRadius: 2 }}
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    mb={1}
                  >
                    <Typography variant="subtitle2" fontWeight={600}>
                      {row.id}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: status?.color,
                          display: "inline-block",
                          flexShrink: 0,
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{ color: status?.color, fontWeight: 500 }}
                      >
                        {status?.label}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" mb={0.5}>
                    {row.counterparty}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {row.initiator} · {row.type}
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={1.5}
                  >
                    <Typography variant="body2" fontWeight={600}>
                      {row.amount} {row.currency}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      до {row.payBefore}
                    </Typography>
                  </Box>
                </Paper>
              );
            })}
          </Box>
          <Paper>
            <TablePagination
              component="div"
              count={ZNO_DATA.length}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={(_, p) => setPage(p)}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
              rowsPerPageOptions={[25, 50, 75, 100]}
              labelRowsPerPage="Строк:"
              labelDisplayedRows={({ from, to, count }) =>
                `${from}–${to} из ${count}`
              }
            />
          </Paper>
        </>
      ) : (
        <Paper>
          <TableContainer sx={{ maxHeight: "calc(100vh - 260px)" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {[
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
                  ].map((col) => (
                    <TableCell key={col}>
                      <b>{col}</b>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {ZNO_DATA.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage,
                ).map((row) => {
                  const status = ZNO_STATUS_FILTERS.find(
                    (s) => s.key === row.status,
                  );
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
                        <span className="flex items-center gap-1.5">
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: status?.color }}
                          />
                          {status?.label}
                        </span>
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
            count={ZNO_DATA.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={(_, p) => setPage(p)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[25, 50, 75, 100]}
            labelRowsPerPage="Строк на странице:"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}–${to} из ${count}`
            }
            sx={{
              position: "sticky",
              bottom: 0,
              bgcolor: "background.paper",
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          />
        </Paper>
      )}
    </Box>
  );
}
