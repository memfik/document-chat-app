"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    <div className="bg-card border border-border rounded-lg mb-4">
      <div className="px-5 py-3 border-b border-border">
        <p className="text-sm font-semibold">Основная информация</p>
      </div>
      <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectWithAdd
          label="Договор"
          value={draft.contract}
          options={contracts}
          editing={true}
          onChange={(v) => onField("contract", v)}
          onNewItem={(v) => {
            onAddContract(v);
            onField("contract", v);
          }}
          modalTitle="Добавить новый договор"
        />
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">Описание</Label>
          <Input
            value={draft.description}
            onChange={(e) => onField("description", e.target.value)}
            disabled={!editing}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">Инициатор</Label>
          <Input value={draft.initiator} disabled />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">Дата создания</Label>
          <Input value={draft.createdAt} disabled />
        </div>
        <SelectWithAdd
          label="Центр затрат"
          value={draft.costCenter}
          options={costCenters}
          editing={editing}
          onChange={(v) => onField("costCenter", v)}
          onNewItem={(v) => {
            onAddCostCenter(v);
            onField("costCenter", v);
          }}
          modalTitle="Добавить новый центр затрат"
        />
        <SelectWithAdd
          label="Проект"
          value={draft.project}
          options={projects}
          editing={editing}
          onChange={(v) => onField("project", v)}
          onNewItem={(v) => {
            onAddProject(v);
            onField("project", v);
          }}
          modalTitle="Добавить новый проект"
        />
        <SelectWithAdd
          label="Статья"
          value={draft.article}
          options={articles}
          editing={editing}
          onChange={(v) => onField("article", v)}
          onNewItem={(v) => {
            onAddArticle(v);
            onField("article", v);
          }}
          modalTitle="Добавить новую статью"
        />
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">Сумма рамочного договора</Label>
          <Input value={`${formatNumber(total)} KZT`} disabled />
        </div>
      </div>
    </div>
  );
}
