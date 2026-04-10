"use client";

import { Paper, Box, Typography, TextField } from "@mui/material";
import { SelectWithAdd } from "./SelectWithAdd";
import { formatNumber, type FormData } from "../data/options";

interface RdInfoFormProps {
  draft: FormData;
  editing: boolean;
  total: number;
  contracts: string[];
  costCenters: string[];
  projects: string[];
  articles: string[];
  onField: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
  onAddContract: (v: string) => void;
  onAddCostCenter: (v: string) => void;
  onAddProject: (v: string) => void;
  onAddArticle: (v: string) => void;
}

export function RdInfoForm({
  draft,
  editing,
  total,
  contracts,
  costCenters,
  projects,
  articles,
  onField,
  onAddContract,
  onAddCostCenter,
  onAddProject,
  onAddArticle,
}: RdInfoFormProps) {
  return (
    <Paper elevation={1} sx={{ mb: 3 }}>
      <Box px={2.5} py={2} borderBottom="1px solid" sx={{ borderColor: "divider" }}>
        <Typography variant="subtitle2" fontWeight={600}>
          Основная информация
        </Typography>
      </Box>
      <Box
        px={2.5}
        py={2}
        display="grid"
        gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
        gap={2}
      >
        <SelectWithAdd
          label="Договор"
          value={draft.contract}
          options={contracts}
          editing={true}
          onChange={(v) => onField("contract", v)}
          onNewItem={(v) => { onAddContract(v); onField("contract", v); }}
          modalTitle="Добавить новый договор"
        />
        <TextField
          size="small" label="Описание" fullWidth
          value={draft.description}
          onChange={(e) => onField("description", e.target.value)}
          disabled={!editing}
        />
        <TextField size="small" label="Инициатор" fullWidth value={draft.initiator} disabled />
        <TextField size="small" label="Дата создания" fullWidth value={draft.createdAt} disabled />
        <SelectWithAdd
          label="Центр затрат"
          value={draft.costCenter}
          options={costCenters}
          editing={editing}
          onChange={(v) => onField("costCenter", v)}
          onNewItem={(v) => { onAddCostCenter(v); onField("costCenter", v); }}
          modalTitle="Добавить новый центр затрат"
        />
        <SelectWithAdd
          label="Проект"
          value={draft.project}
          options={projects}
          editing={editing}
          onChange={(v) => onField("project", v)}
          onNewItem={(v) => { onAddProject(v); onField("project", v); }}
          modalTitle="Добавить новый проект"
        />
        <SelectWithAdd
          label="Статья"
          value={draft.article}
          options={articles}
          editing={editing}
          onChange={(v) => onField("article", v)}
          onNewItem={(v) => { onAddArticle(v); onField("article", v); }}
          modalTitle="Добавить новую статью"
        />
        <TextField
          size="small" label="Сумма рамочного договора" fullWidth
          value={`${formatNumber(total)} KZT`}
          disabled
        />
      </Box>
    </Paper>
  );
}
