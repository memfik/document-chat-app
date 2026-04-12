"use client";

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
        <div>
          <label className="block text-xs text-muted-foreground mb-1">
            Описание
          </label>
          <input
            className="input-base"
            value={draft.description}
            onChange={(e) => onField("description", e.target.value)}
            disabled={!editing}
          />
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">
            Инициатор
          </label>
          <input className="input-base" value={draft.initiator} disabled />
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">
            Дата создания
          </label>
          <input className="input-base" value={draft.createdAt} disabled />
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
        <div>
          <label className="block text-xs text-muted-foreground mb-1">
            Сумма рамочного договора
          </label>
          <input
            className="input-base"
            value={`${formatNumber(total)} KZT`}
            disabled
          />
        </div>
      </div>
    </div>
  );
}
