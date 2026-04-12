"use client";

import { useState, useEffect } from "react";

export default function BudgetExecutionForm({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
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
    <div className="bg-card border border-border rounded-xl p-5 max-w-2xl shadow-sm">
      <p className="text-sm font-semibold mb-1">{title}</p>
      <p className="text-sm text-muted-foreground mb-5">{description}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { label: "Проект", name: "project" },
            { label: "Статья", name: "article" },
            { label: "Центр затрат", name: "costCenter" },
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="block text-xs text-muted-foreground mb-1">
                {label}
              </label>
              <select name={name} defaultValue="" className="select-base">
                <option value="">— Выберите —</option>
              </select>
            </div>
          ))}
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
