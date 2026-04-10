"use client";

import { useState } from "react";
import {
  Paper,
  Tabs,
  Tab,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import ChronologyForm from "./ChronologyForm";
import F16ApprovalForm from "./F16ApprovalForm";
import OSKContractsForm from "./OSKContractsForm";
import ISSKForm from "./ISSKForm";
import BudgetExecutionForm from "./BudgetExecutionForm";
import BudgetNonExecutionForm from "./BudgetNonExecutionForm";

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
      <p className="text-base font-semibold text-center">
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box py={{ xs: 2, md: 3 }} px={{ xs: 2, md: 3 }}>
      <Typography variant="h6" fontWeight={600} mb={2.5}>
        Отчеты
      </Typography>

      {isMobile ? (
        <Box display="flex" flexDirection="column" gap={2}>
          <Paper elevation={1} sx={{ py: 0.5 }}>
            <Tabs
              value={activeTab}
              onChange={(_, v) => setActiveTab(v)}
              orientation="horizontal"
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab.key}
                  label={tab.label}
                  sx={{
                    textTransform: "none",
                    fontSize: 13,
                    minWidth: 120,
                    whiteSpace: "normal",
                    textAlign: "center",
                  }}
                />
              ))}
            </Tabs>
          </Paper>
          <Box>{renderForm(current)}</Box>
        </Box>
      ) : (
        <Box display="flex" gap={2.5} alignItems="flex-start">
          <Paper elevation={1} sx={{ flexShrink: 0, width: 240, py: 1 }}>
            <Tabs
              value={activeTab}
              onChange={(_, v) => setActiveTab(v)}
              orientation="vertical"
              variant="scrollable"
              scrollButtons={false}
              TabIndicatorProps={{
                style: { left: 0, right: "auto", width: 3 },
              }}
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab.key}
                  label={tab.label}
                  style={{
                    alignItems: "flex-start",
                    textAlign: "left",
                    textTransform: "none",
                    fontSize: 16,
                  }}
                />
              ))}
            </Tabs>
          </Paper>
          <Box flex={1} minWidth={0}>
            {renderForm(current)}
          </Box>
        </Box>
      )}
    </Box>
  );
}
