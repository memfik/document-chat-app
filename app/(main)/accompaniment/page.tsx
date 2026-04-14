"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useIsMobile } from "@/app/hooks/useIsMobile";
import { SearchBar } from "@/app/components/ui/SearchBar";
import { ACC_DATA } from "./data/accompaniment";
import { AccompanimentCard } from "./ui/AccompanimentCard";
import { AccompanimentTable } from "./ui/AccompanimentTable";
import { TablePagination } from "@/app/components/ui/TablePagination";

export default function AccompanimentPage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [currentYearOnly, setCurrentYearOnly] = useState(false);
  const isMobile = useIsMobile(900);

  useEffect(() => {
    setTimeout(() => setLoading(false), 400);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="py-6 px-4 sm:px-6">
      <div className="mb-4">
        <SearchBar
          value={search}
          onChange={setSearch}
          currentYearOnly={currentYearOnly}
          onYearToggle={() => setCurrentYearOnly((v) => !v)}
        />
      </div>

      {isMobile ? (
        <>
          <div className="flex flex-col gap-3 mb-3">
            {ACC_DATA.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage,
            ).map((row) => (
              <AccompanimentCard key={row.id} row={row} />
            ))}
          </div>
          <div className="bg-card border border-border rounded-lg">
            <TablePagination
              count={ACC_DATA.length}
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
        <AccompanimentTable
          rows={ACC_DATA}
          page={page}
          rowsPerPage={rowsPerPage}
          total={ACC_DATA.length}
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
