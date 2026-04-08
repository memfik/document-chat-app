"use client";

import { useState } from "react";
import { Paper, Tabs, Tab, createTheme, ThemeProvider } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import ChronologyForm from "./ChronologyForm";
import F16ApprovalForm from "./F16ApprovalForm";
import OSKContractsForm from "./OSKContractsForm";
import ISSKForm from "./ISSKForm";
import BudgetExecutionForm from "./BudgetExecutionForm";
import BudgetNonExecutionForm from "./BudgetNonExecutionForm";

const redTheme = createTheme({
  palette: { primary: { main: "#ef4444" } },
});

let role = "user";

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

const tabAccessMap: Record<string, string[]> = {
  f16: ["user", "admin"],
  zno: ["user", "admin"],
  rd: ["user", "admin"],
  contracts: ["user", "admin"],
  payments: ["admin"],
  summary: ["user", "admin"],
};

function NoAccess() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-14 text-red-500">
      <BlockIcon style={{ fontSize: 56 }} />
      <p className="text-base font-semibold">
        У вас нет прав на создание отчета по данному шаблону.
      </p>
    </div>
  );
}

function renderForm(tab: (typeof tabs)[number]) {
  const allowed = tabAccessMap[tab.key] ?? [];
  if (!allowed.includes(role)) {
    return <NoAccess />;
  }

  if (tab.key === "f16") {
    return <ChronologyForm title={tab.title} description={tab.description} />;
  }
  if (tab.key === "payments") {
    return (
      <BudgetNonExecutionForm title={tab.title} description={tab.description} />
    );
  }
  if (tab.key === "contracts") {
    return (
      <BudgetExecutionForm title={tab.title} description={tab.description} />
    );
  }
  if (tab.key === "rd") {
    return <ISSKForm title={tab.title} description={tab.description} />;
  }
  if (tab.key === "zno") {
    return <OSKContractsForm title={tab.title} description={tab.description} />;
  }
  if (tab.key === "summary") {
    return <F16ApprovalForm title={tab.title} description={tab.description} />;
  }
  return <NoAccess />;
}

export default function ReportPage() {
  const [activeTab, setActiveTab] = useState(0);
  const current = tabs[activeTab];

  return (
    <div className="py-6 px-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-5">Отчеты</h1>

      <Paper elevation={1} className="mb-6">
        <ThemeProvider theme={redTheme}>
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
        </ThemeProvider>
      </Paper>

      <div>{renderForm(current)}</div>
    </div>
  );
}
