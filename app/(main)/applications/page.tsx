"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { InfoModal } from "@/app/components/ui/InfoModal";
import { SearchBar } from "@/app/components/ui/SearchBar";
import { StatusFilterBar } from "@/app/components/ui/StatusFilterBar";
import { ApplicationCard } from "./ui/ApplicationCard";
import { ApplicationsTable } from "./ui/ApplicationsTable";
import { EditModal } from "./ui/EditModal";
import type { RowExtra } from "./ui/EditModal";
import { APPLICATIONS, STATUS_FILTERS } from "./data/applications";
import type { ApplicationRow } from "./data/applications";
import {
  Box,
  CircularProgress,
  Paper,
  TablePagination,
} from "@mui/material";

export default function ApplicationsPage() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentYearOnly, setCurrentYearOnly] = useState(false);
  const [activeStatus, setActiveStatus] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [selectedRow, setSelectedRow] = useState<ApplicationRow | null>(null);
  const [editTarget, setEditTarget] = useState<string | null>(null);
  const [extras, setExtras] = useState<Record<string, RowExtra>>(() =>
    Object.fromEntries(
      APPLICATIONS.map((r) => [r.id, { znoNum: r.znoNum, paymentFile: null, paymentFileName: "" }])
    )
  );

  useEffect(() => {
    setTimeout(() => setLoading(false), 400);
  }, []);

  const saveExtra = (id: string, data: RowExtra) => {
    setExtras((prev) => ({ ...prev, [id]: data }));
    setEditTarget(null);
  };

  const openFile = (extra: RowExtra) => {
    if (extra.paymentFile) {
      window.open(URL.createObjectURL(extra.paymentFile), "_blank");
    }
  };

  const statusCounts = Object.fromEntries(
    STATUS_FILTERS.map((f) => [
      f.key,
      f.key === "all"
        ? APPLICATIONS.length
        : APPLICATIONS.filter((r) => r.status === f.key).length,
    ])
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
          filters={STATUS_FILTERS}
          activeKey={activeStatus}
          onSelect={setActiveStatus}
          counts={statusCounts}
        />
      </Box>

      {isMobile ? (
        <>
          <Box display="flex" flexDirection="column" gap={1.5} mb={1}>
            {APPLICATIONS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <ApplicationCard
                key={row.id}
                row={row}
                status={STATUS_FILTERS.find((s) => s.key === row.status)}
                onSelect={() => setSelectedRow(row)}
                onEdit={() => setEditTarget(row.id)}
                onHistory={() => router.push(`/history/${row.id}`)}
              />
            ))}
          </Box>
          <Paper>
            <TablePagination
              component="div"
              count={APPLICATIONS.length}
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
        <ApplicationsTable
          rows={APPLICATIONS}
          statusFilters={STATUS_FILTERS}
          extras={extras}
          page={page}
          rowsPerPage={rowsPerPage}
          total={APPLICATIONS.length}
          onPageChange={setPage}
          onRowsPerPageChange={(rpp) => { setRowsPerPage(rpp); setPage(0); }}
          onRowClick={setSelectedRow}
          onEdit={setEditTarget}
          onHistory={(id) => router.push(`/history/${id}`)}
          onOpenFile={openFile}
        />
      )}

      {editTarget && extras[editTarget] && (
        <EditModal
          rowId={editTarget}
          extra={extras[editTarget]}
          onClose={() => setEditTarget(null)}
          onSave={(data) => saveExtra(editTarget, data)}
        />
      )}

      {selectedRow && (
        <InfoModal
          row={selectedRow}
          statusLabel={STATUS_FILTERS.find((s) => s.key === selectedRow.status)?.label ?? ""}
          statusColor={STATUS_FILTERS.find((s) => s.key === selectedRow.status)?.color ?? "#6b7280"}
          paymentFileName={extras[selectedRow.id]?.paymentFileName}
          onClose={() => setSelectedRow(null)}
        />
      )}
    </Box>
  );
}
