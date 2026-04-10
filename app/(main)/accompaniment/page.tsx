"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SearchBar } from "@/app/components/ui/SearchBar";
import { ACC_DATA } from "./data/accompaniment";
import { AccompanimentCard } from "./ui/AccompanimentCard";
import { AccompanimentTable } from "./ui/AccompanimentTable";
import { CircularProgress, Box, Paper, TablePagination } from "@mui/material";

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
              <AccompanimentCard key={row.id} row={row} />
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
        <AccompanimentTable
          rows={ACC_DATA}
          page={page}
          rowsPerPage={rowsPerPage}
          total={ACC_DATA.length}
          onPageChange={setPage}
          onRowsPerPageChange={(rpp) => { setRowsPerPage(rpp); setPage(0); }}
        />
      )}
    </Box>
  );
}
