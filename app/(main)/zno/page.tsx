"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SearchBar } from "@/app/components/ui/SearchBar";
import { StatusFilterBar } from "@/app/components/ui/StatusFilterBar";
import { ZNO_DATA, ZNO_STATUS_FILTERS } from "./data/zno";
import { ZnoCard } from "./ui/ZnoCard";
import { ZnoTable } from "./ui/ZnoTable";
import { CircularProgress, Box, Paper, TablePagination } from "@mui/material";

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
      f.key === "all" ? ZNO_DATA.length : ZNO_DATA.filter((r) => r.status === f.key).length,
    ]),
  );

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
            {ZNO_DATA.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              const status = ZNO_STATUS_FILTERS.find((s) => s.key === row.status);
              return <ZnoCard key={row.id} row={row} status={status} />;
            })}
          </Box>
          <Paper>
            <TablePagination
              component="div"
              count={ZNO_DATA.length}
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
        <ZnoTable
          rows={ZNO_DATA}
          page={page}
          rowsPerPage={rowsPerPage}
          total={ZNO_DATA.length}
          onPageChange={setPage}
          onRowsPerPageChange={(rpp) => { setRowsPerPage(rpp); setPage(0); }}
        />
      )}
    </Box>
  );
}
