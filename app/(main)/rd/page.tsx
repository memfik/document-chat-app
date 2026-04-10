"use client";

import { useState, useCallback } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box } from "@mui/material";

import { RdHeader } from "./ui/RdHeader";
import { RdInfoForm } from "./ui/RdInfoForm";
import { SpecSection } from "./ui/SpecSection";

import {
  initialData,
  contractOptions,
  costCenterOptions,
  projectOptions,
  articleOptions,
  type FormData,
  type SpecRow,
} from "./data/options";

let nextId = 100;

export default function RdPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState<FormData>(initialData);
  const [draft, setDraft] = useState<FormData>(initialData);
  const [contracts, setContracts] = useState(contractOptions);
  const [costCenters, setCostCenters] = useState(costCenterOptions);
  const [projects, setProjects] = useState(projectOptions);
  const [articles, setArticles] = useState(articleOptions);

  const setField = useCallback(<K extends keyof FormData>(key: K, value: FormData[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
  }, []);

  const updateRow = (id: number, field: keyof SpecRow, value: string) =>
    setDraft((d) => ({ ...d, rows: d.rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)) }));

  const addRow = () =>
    setDraft((d) => ({ ...d, rows: [...d.rows, { id: nextId++, description: "", qty: "", price: "" }] }));

  const removeRow = (id: number) =>
    setDraft((d) => ({ ...d, rows: d.rows.filter((r) => r.id !== id) }));

  const handleEdit = () => { setDraft(saved); setEditing(true); };
  const handleCancel = () => { setDraft(saved); setEditing(false); };
  const handleSave = () => { setSaved(draft); setEditing(false); };

  return (
    <Box py={{ xs: 2, md: 3 }} px={{ xs: 1.5, md: 3 }} maxWidth="1280px" mx="auto">
      <RdHeader editing={editing} onEdit={handleEdit} onSave={handleSave} onCancel={handleCancel} />

      <RdInfoForm
        draft={draft}
        editing={editing}
        total={draft.rows.reduce((acc, r) => acc + (parseFloat(r.qty) || 0) * (parseFloat(r.price) || 0), 0)}
        contracts={contracts}
        costCenters={costCenters}
        projects={projects}
        articles={articles}
        onField={setField}
        onAddContract={(v) => setContracts((p) => [...p, v])}
        onAddCostCenter={(v) => setCostCenters((p) => [...p, v])}
        onAddProject={(v) => setProjects((p) => [...p, v])}
        onAddArticle={(v) => setArticles((p) => [...p, v])}
      />

      <SpecSection
        rows={draft.rows}
        editing={editing}
        isMobile={isMobile}
        onUpdate={updateRow}
        onRemove={removeRow}
        onAdd={addRow}
      />
    </Box>
  );
}
