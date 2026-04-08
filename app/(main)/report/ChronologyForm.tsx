"use client";

import { useState } from "react";
import { Paper } from "@mui/material";

const selectClass =
  "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#f96800] transition-colors bg-white text-gray-700";
const inputClass =
  "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#f96800] transition-colors";
const labelClass = "block text-sm font-semibold text-gray-800 mb-1";

function SelectField({ label, name }: { label: string; name: string }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <select name={name} className={selectClass}>
        <option value="">— Выберите —</option>
      </select>
    </div>
  );
}

export default function ChronologyForm({
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
    alert(`Формирование: ${title}`);
  };

  return (
    <Paper elevation={3} className="p-5 max-w-3xl">
      <p className="text-base font-semibold text-gray-800 mb-1">{title}</p>
      <p className="text-sm text-gray-500 mb-5">{description}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <SelectField label="Инициатор" name="initiator" />
          <SelectField label="Центр затрат" name="costCenter" />
          <SelectField label="Тип закупа" name="purchaseType" />
          <SelectField label="Статья" name="article" />
          <SelectField label="БКВ2" name="bkv2" />
          <SelectField label="Проект" name="project" />
          <SelectField label="Центр / Децентр" name="centerDecentr" />

          <div>
            <label className={labelClass}>Начало периода</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Конец периода</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              min={dateFrom}
              className={inputClass}
            />
          </div>

          <SelectField label="Статус" name="status" />
          <SelectField label="Исполнитель" name="executor" />
          <SelectField label="Точка присутствия" name="presencePoint" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Фильтр по тексту</label>
            <input
              type="text"
              name="textFilter"
              className={inputClass}
              placeholder="Введите текст"
            />
          </div>
          <div>
            <label className={labelClass}>&nbsp;</label>
            <input
              type="text"
              name="textFilterOr"
              className={inputClass}
              placeholder="или содержит"
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
