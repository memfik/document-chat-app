"use client";

import { useState, useEffect } from "react";

const SELECT_PLACEHOLDER = "— Выберите —";

function SelectField({ label, name }: { label: string; name: string }) {
  return (
    <div>
      <label className="block text-xs text-muted-foreground mb-1">{label}</label>
      <select name={name} defaultValue="" className="select-base">
        <option value="">{SELECT_PLACEHOLDER}</option>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <SelectField label="Инициатор" name="initiator" />
          <SelectField label="Центр затрат" name="costCenter" />
          <SelectField label="Тип закупа" name="purchaseType" />
          <SelectField label="Статья" name="article" />
          <SelectField label="БКВ2" name="bkv2" />
          <SelectField label="Проект" name="project" />
          <SelectField label="Центр / Децентр" name="centerDecentr" />
          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              Начало периода
            </label>
            <input
              type="date"
              className="input-base"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              Конец периода
            </label>
            <input
              type="date"
              className="input-base"
              min={dateFrom}
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
          <SelectField label="Статус" name="status" />
          <SelectField label="Исполнитель" name="executor" />
          <SelectField label="Точка присутствия" name="presencePoint" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              Фильтр по тексту
            </label>
            <input
              className="input-base"
              name="textFilter"
              placeholder="Введите текст"
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1">
              или содержит
            </label>
            <input
              className="input-base"
              name="textFilterOr"
              placeholder="или содержит"
            />
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
