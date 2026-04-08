"use client";

import { useState } from "react";
import { Paper } from "@mui/material";

const selectClass =
  "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#f96800] transition-colors bg-white text-gray-700";
const inputClass =
  "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#f96800] transition-colors";
const labelClass = "block text-sm font-semibold text-gray-800 mb-1";

function SelectField({
  label,
  name,
  defaultValue = "",
}: {
  label: string;
  name: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <select name={name} defaultValue={defaultValue} className={selectClass}>
        {defaultValue && defaultValue !== "--все--" && defaultValue !== "" ? (
          <option value={defaultValue}>{defaultValue}</option>
        ) : null}
        <option value="--все--">--все--</option>
      </select>
    </div>
  );
}

function TextField({
  label,
  name,
  defaultValue = "",
  placeholder = "",
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  );
}

export default function ISSKForm({
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
    <Paper elevation={0} className="p-5 mx-auto max-w-3xl" style={{ boxShadow: "0 4px 16px rgba(239, 68, 68, 0.2)" }}>
      <p className="text-base font-semibold text-gray-800 mb-1">{title}</p>
      <p className="text-sm text-gray-500 mb-5">{description}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-4 gap-3">
          <SelectField
            label="Инициатор"
            name="initiator"
            defaultValue="ГО-ДЭ"
          />
          <SelectField
            label="Центр затрат"
            name="costCenter"
            defaultValue="--все--"
          />
          <SelectField label="Куратор" name="curator" defaultValue="--все--" />
          <SelectField
            label="Тип закупа"
            name="purchaseType"
            defaultValue="--все--"
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <SelectField label="Статья" name="article" defaultValue="--все--" />
          <SelectField label="БКВ2" name="bkv2" defaultValue="--все--" />
          <SelectField label="Проект" name="project" defaultValue="--все--" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <SelectField
            label="Подпроект"
            name="subproject"
            defaultValue="--все--"
          />
          <TextField
            label="Начало периода"
            name="dateFrom"
            defaultValue="01-04-2026"
          />
          <TextField
            label="Конец периода"
            name="dateTo"
            defaultValue="08-04-2026"
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <SelectField
            label="Центр / Децентр"
            name="centerDecentr"
            defaultValue="--все--"
          />
          <SelectField
            label="Статус"
            name="status"
            defaultValue="Все с утвержденной Ф16"
          />
          <TextField
            label="Фильтр по тексту"
            name="textFilter"
            placeholder=""
          />
        </div>
        <div style={{ width: 220 }}>
          <label className={labelClass}>Точка присутствия из списка</label>
          <select name="presencePoint" className={selectClass}>
            <option value="">— Выберите —</option>
          </select>
          <span className="block text-xs text-gray-400 mt-2 mb-1">
            или содержит
          </span>
          <input
            type="text"
            name="presencePointText"
            style={{ width: 180 }}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#f96800] transition-colors"
          />
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
