"use client";

import { useState } from "react";
import { Paper, Tabs, Tab } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

const tabs = [
  {
    key: "f16",
    label: "Отчет по хронологии этапов",
    title: "Отчет по хронологии этапов",
    description: "Сводный отчёт по всем заявкам Ф16 за выбранный период.",
  },
  {
    key: "zno",
    label: "Отчет ОСК. Сопровождение договоров",
    title: "Отчет ОСК. Сопровождение договоров",
    description: "Статусы и суммы ЗНО за указанный период.",
  },
  {
    key: "rd",
    label: "Отчет по заявкам ИССК",
    title: "Отчет по заявкам ИССК",
    description: "Исполнение рамочных договоров и остатки лимитов.",
  },
  {
    key: "contracts",
    label: "Отчет по исполнению бюджета",
    title: "Отчет по исполнению бюджета",
    description: "Перечень договоров с суммами и сроками исполнения.",
  },
  {
    key: "payments",
    label: "Отчет по неисполнению бюджета",
    title: "Отчет по неисполнению бюджета",
    description: "Детализация платёжных поручений за период.",
  },
  {
    key: "summary",
    label: "Отчет по согласованию Формы 16",
    title: "Отчет по согласованию Формы 16",
    description: "Агрегированные показатели по всем разделам за период.",
  },
];

function ReportForm({
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
    <Paper elevation={1} className="p-5 max-w-md">
      <p className="text-base font-semibold text-gray-800 mb-1">{title}</p>
      <p className="text-sm text-gray-500 mb-5">{description}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">
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
            <label className="block text-xs text-gray-500 mb-1">
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
          <DownloadIcon fontSize="small" />
          Сформировать
        </button>
      </form>
    </Paper>
  );
}

export default function ReportPage() {
  const [activeTab, setActiveTab] = useState(0);
  const current = tabs[activeTab];

  return (
    <div className="py-6 px-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-5">Отчеты</h1>

      <Paper elevation={1} className="mb-6">
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.key}
              label={tab.label}
              className="normal-case text-sm"
            />
          ))}
        </Tabs>
      </Paper>

      <ReportForm title={current.title} description={current.description} />
    </div>
  );
}
