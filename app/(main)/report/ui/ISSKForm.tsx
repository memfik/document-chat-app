"use client";

import { useState, useEffect } from "react";

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
      <label className="block text-xs text-muted-foreground mb-1">{label}</label>
      <select name={name} defaultValue={defaultValue} className="select-base">
        {defaultValue && defaultValue !== "--все--" && defaultValue !== "" && (
          <option value={defaultValue}>{defaultValue}</option>
        )}
        <option value="--все--">--все--</option>
      </select>
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
  const [dateFrom, setDateFrom] = useState("01-04-2026");
  const [dateTo, setDateTo] = useState("08-04-2026");
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(false), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToast(true);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5 max-w-3xl shadow-sm">
      <p className="text-sm font-semibold mb-1">{title}</p>
      <p className="text-sm text-muted-foreground mb-5">{description}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <SelectField label="Инициатор" name="initiator" defaultValue="ГО-ДЭ" />
          <SelectField label="Центр затрат" name="costCenter" defaultValue="--все--" />
          <SelectField label="Куратор" name="curator" defaultValue="--все--" />
          <SelectField label="Тип закупа" name="purchaseType" defaultValue="--все--" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <SelectField label="Статья" name="article" defaultValue="--все--" />
          <SelectField label="БКВ2" name="bkv2" defaultValue="--все--" />
          <SelectField label="Проект" name="project" defaultValue="--все--" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <SelectField label="Подпроект" name="subproject" defaultValue="--все--" />
          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              Начало периода
            </label>
            <input
              className="input-base"
              name="dateFrom"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              Конец периода
            </label>
            <input
              className="input-base"
              name="dateTo"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <SelectField label="Центр / Децентр" name="centerDecentr" defaultValue="--все--" />
          <SelectField label="Статус" name="status" defaultValue="Все с утвержденной Ф16" />
          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              Фильтр по тексту
            </label>
            <input className="input-base" name="textFilter" />
          </div>
        </div>

        <div className="flex flex-col gap-2 max-w-full sm:max-w-[220px]">
          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              Точка присутствия из списка
            </label>
            <select name="presencePoint" defaultValue="" className="select-base">
              <option value="">— Выберите —</option>
            </select>
          </div>
          <p className="text-xs text-muted-foreground">или содержит</p>
          <div>
            <input className="input-base" name="presencePointText" placeholder="Текст" />
          </div>
        </div>

        <button
          type="submit"
          className="self-stretch sm:self-start px-4 py-2 text-sm rounded-lg bg-[#f96800] text-white hover:bg-[#e05a00] transition-colors"
        >
          Сформировать
        </button>
      </form>

      {toast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium">
          Отчёт формируется...
        </div>
      )}
    </div>
  );
}
