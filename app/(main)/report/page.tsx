"use client";

import { useState } from "react";
import { Ban } from "lucide-react";
import { useIsMobile } from "@/app/hooks/useIsMobile";
import { cn } from "@/lib/utils";
import ChronologyForm from "./ui/ChronologyForm";
import F16ApprovalForm from "./ui/F16ApprovalForm";
import OSKContractsForm from "./ui/OSKContractsForm";
import ISSKForm from "./ui/ISSKForm";
import BudgetExecutionForm from "./ui/BudgetExecutionForm";
import BudgetNonExecutionForm from "./ui/BudgetNonExecutionForm";

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
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-destructive">
      <Ban className="size-14" />
      <p className="text-base font-semibold text-center">
        У вас нет прав на создание отчета по данному шаблону.
      </p>
    </div>
  );
}

function renderForm(tab: (typeof tabs)[number]) {
  const allowed = tabAccessMap[tab.key] ?? [];
  if (!allowed.includes(role)) return <NoAccess />;

  if (tab.key === "f16")
    return <ChronologyForm title={tab.title} description={tab.description} />;
  if (tab.key === "payments")
    return (
      <BudgetNonExecutionForm title={tab.title} description={tab.description} />
    );
  if (tab.key === "contracts")
    return (
      <BudgetExecutionForm title={tab.title} description={tab.description} />
    );
  if (tab.key === "rd")
    return <ISSKForm title={tab.title} description={tab.description} />;
  if (tab.key === "zno")
    return <OSKContractsForm title={tab.title} description={tab.description} />;
  if (tab.key === "summary")
    return <F16ApprovalForm title={tab.title} description={tab.description} />;
  return <NoAccess />;
}

export default function ReportPage() {
  const [activeTab, setActiveTab] = useState(0);
  const current = tabs[activeTab];
  const isMobile = useIsMobile(900);

  return (
    <div className="py-6 px-4 md:px-6">
      <h1 className="text-lg font-semibold mb-3">Отчеты</h1>

      {isMobile ? (
        <div className="flex flex-col gap-4">
          <div className="bg-card border border-border rounded-lg overflow-x-auto flex py-1">
            {tabs.map((tab, idx) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(idx)}
                className={cn(
                  "shrink-0 px-4 py-2 text-sm min-w-[130px] text-center border-b-2 transition-colors whitespace-normal",
                  activeTab === idx
                    ? "border-[#f96800] text-[#f96800] font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div>{renderForm(current)}</div>
        </div>
      ) : (
        <div className="flex gap-6 items-start">
          <div className="shrink-0 w-60 bg-card border border-border rounded-lg py-1">
            {tabs.map((tab, idx) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(idx)}
                className={cn(
                  "w-full text-left px-4 py-2.5 text-sm border-l-2 transition-colors",
                  activeTab === idx
                    ? "border-l-[#f96800] text-foreground font-medium"
                    : "border-l-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex-1 min-w-0">{renderForm(current)}</div>
        </div>
      )}
    </div>
  );
}
