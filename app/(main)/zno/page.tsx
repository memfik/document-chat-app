"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useIsMobile } from "@/app/hooks/useIsMobile";
import { SearchBar } from "@/app/components/ui/SearchBar";
import { StatusFilterBar } from "@/app/components/ui/StatusFilterBar";
import { ZNO_DATA, ZNO_STATUS_FILTERS } from "./data/zno";
import { ZnoCard } from "./ui/ZnoCard";
import { ZnoTable } from "./ui/ZnoTable";
import { TablePagination } from "@/app/components/ui/TablePagination";

export default function ZnoPage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("all");
  const [currentYearOnly, setCurrentYearOnly] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const isMobile = useIsMobile(900);

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
      <div className="flex justify-center items-center min-h-[80vh]">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="py-6 px-4 sm:px-6">
      <h1 className="text-lg font-semibold mb-3">ЗНО</h1>
      <div className="mb-4">
        <SearchBar
          value={search}
          onChange={setSearch}
          currentYearOnly={currentYearOnly}
          onYearToggle={() => setCurrentYearOnly((v) => !v)}
        />
      </div>

      <div className="mb-4">
        <StatusFilterBar
          filters={ZNO_STATUS_FILTERS}
          activeKey={activeStatus}
          onSelect={setActiveStatus}
          counts={statusCounts}
        />
      </div>

      {isMobile ? (
        <>
          <div className="flex flex-col gap-3 mb-3">
            {ZNO_DATA.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage,
            ).map((row) => {
              const status = ZNO_STATUS_FILTERS.find(
                (s) => s.key === row.status,
              );
              return <ZnoCard key={row.id} row={row} status={status} />;
            })}
          </div>
          <div className="bg-card border border-border rounded-lg">
            <TablePagination
              count={ZNO_DATA.length}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={setPage}
              onRowsPerPageChange={(rpp) => {
                setRowsPerPage(rpp);
                setPage(0);
              }}
              labelRowsPerPage="Строк:"
              labelDisplayedRows={({ from, to, count }) =>
                `${from}–${to} из ${count}`
              }
            />
          </div>
        </>
      ) : (
        <ZnoTable
          rows={ZNO_DATA}
          page={page}
          rowsPerPage={rowsPerPage}
          total={ZNO_DATA.length}
          onPageChange={setPage}
          onRowsPerPageChange={(rpp) => {
            setRowsPerPage(rpp);
            setPage(0);
          }}
        />
      )}
    </div>
  );
}
