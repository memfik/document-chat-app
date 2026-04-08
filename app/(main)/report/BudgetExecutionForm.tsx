"use client";

import { Paper } from "@mui/material";

const selectClass =
  "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#f96800] transition-colors bg-white text-gray-700";
const labelClass = "block text-sm font-semibold text-gray-800 mb-1";

export default function BudgetExecutionForm({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Формирование: ${title}`);
  };

  return (
    <Paper elevation={0} className="p-5 max-w-2xl mx-auto" style={{ boxShadow: "0 4px 16px rgba(239, 68, 68, 0.2)" }}>
      <p className="text-base font-semibold text-gray-800 mb-1">{title}</p>
      <p className="text-sm text-gray-500 mb-5">{description}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className={labelClass}>Проект</label>
            <select name="project" className={selectClass}>
              <option value="">— Выберите —</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Статья</label>
            <select name="article" className={selectClass}>
              <option value="">— Выберите —</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Центр затрат</label>
            <select name="costCenter" className={selectClass}>
              <option value="">— Выберите —</option>
            </select>
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
