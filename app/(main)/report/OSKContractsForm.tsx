"use client";

import { Paper } from "@mui/material";

const selectClass =
  "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#f96800] transition-colors bg-white text-gray-700";
const labelClass = "block text-sm font-semibold text-gray-800 mb-1";

export default function OSKContractsForm({
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
    <Paper elevation={3} className="p-5 max-w-lg">
      <p className="text-base font-semibold text-gray-800 mb-1">{title}</p>
      <p className="text-sm text-gray-500 mb-5">{description}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Инициатор</label>
            <select name="initiator" className={selectClass}>
              <option value="">— Выберите —</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Центр / Децентр</label>
            <select name="centerDecentr" className={selectClass}>
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
