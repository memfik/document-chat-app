"use client";

import { useState } from "react";
import { Paper } from "@mui/material";

export default function F16ApprovalForm({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Формирование: ${title}\nС: ${dateFrom}\nПо: ${dateTo}`);
  };

  return (
    <Paper elevation={3} className="p-5 max-w-lg">
      <p className="text-base font-semibold text-gray-800 mb-1">{title}</p>
      <p className="text-sm text-gray-500 mb-5">{description}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Дата начала
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#f96800] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Дата окончания
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              required
              min={dateFrom}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#f96800] transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 text-sm bg-[#f96800] text-white rounded-lg hover:bg-[#e05a00] transition-colors self-start"
        >
          Сформировать
        </button>
      </form>
    </Paper>
  );
}
