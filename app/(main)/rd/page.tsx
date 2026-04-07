"use client";

import { useState, useCallback } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { cn } from "@/lib/utils";

interface SpecRow {
  id: number;
  description: string;
  qty: string;
  price: string;
}

interface FormData {
  contract: string;
  description: string;
  initiator: string;
  createdAt: string;
  costCenter: string;
  project: string;
  article: string;
  rows: SpecRow[];
}

const contractOptions = [
  "ДГ-2025-014",
  "ДГ-2025-021",
  "ДГ-2025-033",
  "ДГ-2025-047",
];
const costCenterOptions = [
  "ЦЗ-001 Головной офис",
  "ЦЗ-002 Производство",
  "ЦЗ-003 Логистика",
];
const projectOptions = ["Проект Альфа", "Проект Бета", "Проект Гамма"];
const articleOptions = [
  "Ст. 44 Закупки",
  "Ст. 46 Услуги",
  "Ст. 48 Строительство",
  "Ст. 50 ИТ",
];

const initialData: FormData = {
  contract: "ДГ-2025-014",
  description: "Поставка офисной техники и расходных материалов",
  initiator: "Петров А.В.",
  createdAt: "12.01.2025",
  costCenter: "ЦЗ-001 Головной офис",
  project: "Проект Альфа",
  article: "Ст. 44 Закупки",
  rows: [
    {
      id: 1,
      description: "Ноутбук Lenovo ThinkPad",
      qty: "5",
      price: "250000",
    },
    { id: 2, description: 'Монитор 27" Samsung', qty: "5", price: "80000" },
    { id: 3, description: "Мышь беспроводная", qty: "10", price: "5000" },
  ],
};

function calcRowSum(row: SpecRow): number {
  const q = parseFloat(row.qty) || 0;
  const p = parseFloat(row.price) || 0;
  return q * p;
}

function calcTotal(rows: SpecRow[]): number {
  return rows.reduce((acc, r) => acc + calcRowSum(r), 0);
}

function formatNumber(n: number): string {
  return n.toLocaleString("ru-RU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

let nextId = 100;

interface NewItemModalProps {
  title: string;
  onClose: () => void;
  onSave: (value: string) => void;
}

function NewItemModal({ title, onClose, onSave }: NewItemModalProps) {
  const [value, setValue] = useState("");
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-96 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-base font-semibold text-gray-800 mb-4">{title}</h3>
        <input
          autoFocus
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Введите название..."
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#f96800] transition-colors"
          onKeyDown={(e) => {
            if (e.key === "Enter" && value.trim()) onSave(value.trim());
            if (e.key === "Escape") onClose();
          }}
        />
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Отмена
          </button>
          <button
            onClick={() => value.trim() && onSave(value.trim())}
            disabled={!value.trim()}
            className="px-4 py-2 text-sm bg-[#f96800] text-white rounded-lg hover:bg-[#e05a00] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
}

interface SelectWithAddProps {
  label: string;
  value: string;
  options: string[];
  editing: boolean;
  onChange: (v: string) => void;
  onNewItem: (v: string) => void;
  modalTitle: string;
}

function SelectWithAdd({
  label,
  value,
  options,
  editing,
  onChange,
  onNewItem,
  modalTitle,
}: SelectWithAddProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div>
        <label className="block text-xs text-gray-500 mb-1">{label}</label>
        <div className="flex gap-1.5">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={!editing}
            className={cn(
              "flex-1 px-3 py-2 text-sm border rounded-lg outline-none transition-colors",
              editing
                ? "border-gray-300 focus:border-[#f96800] bg-white"
                : "border-gray-200 bg-gray-50 text-gray-600 cursor-default",
            )}
          >
            {options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          {editing && (
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors text-gray-500 shrink-0"
              title={`Создать новый: ${label}`}
            >
              <AddIcon fontSize="small" />
            </button>
          )}
        </div>
      </div>
      {showModal && (
        <NewItemModal
          title={modalTitle}
          onClose={() => setShowModal(false)}
          onSave={(v) => {
            onNewItem(v);
            setShowModal(false);
          }}
        />
      )}
    </>
  );
}

function ReadonlyField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="block text-xs text-gray-500 mb-1">{label}</label>
      <div className="px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
        {value}
      </div>
    </div>
  );
}

export default function RdPage() {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState<FormData>(initialData);
  const [draft, setDraft] = useState<FormData>(initialData);
  const [contracts, setContracts] = useState(contractOptions);
  const [costCenters, setCostCenters] = useState(costCenterOptions);
  const [projects, setProjects] = useState(projectOptions);
  const [articles, setArticles] = useState(articleOptions);

  const total = calcTotal(draft.rows);

  const setField = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) => {
      setDraft((d) => ({ ...d, [key]: value }));
    },
    [],
  );

  const updateRow = (id: number, field: keyof SpecRow, value: string) => {
    setDraft((d) => ({
      ...d,
      rows: d.rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
    }));
  };

  const addRow = () => {
    setDraft((d) => ({
      ...d,
      rows: [...d.rows, { id: nextId++, description: "", qty: "", price: "" }],
    }));
  };

  const removeRow = (id: number) => {
    setDraft((d) => ({ ...d, rows: d.rows.filter((r) => r.id !== id) }));
  };

  const handleEdit = () => {
    setDraft(saved);
    setEditing(true);
  };

  const handleCancel = () => {
    setDraft(saved);
    setEditing(false);
  };

  const handleSave = () => {
    setSaved(draft);
    setEditing(false);
  };

  return (
    <div className="py-6 px-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-800">
          Рамочный договор
        </h1>
        <div className="flex gap-2">
          {editing ? (
            <>
              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 px-4 py-2 text-sm bg-[#f96800] text-white rounded-lg hover:bg-[#e05a00] transition-colors"
              >
                <SaveIcon fontSize="small" />
                Сохранить
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-1.5 px-4 py-2 text-sm border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <CloseIcon fontSize="small" />
                Отмена
              </button>
            </>
          ) : (
            <button
              onClick={handleEdit}
              className="flex items-center gap-1.5 px-4 py-2 text-sm border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <EditIcon fontSize="small" />
              Редактировать
            </button>
          )}
        </div>
      </div>
      <Paper className="mb-6" elevation={1}>
        <div className="px-5 py-4 border-b border-gray-200">
          <span className="text-sm font-semibold text-gray-700">
            Основная информация
          </span>
        </div>
        <div className="px-5 py-4 grid grid-cols-2 gap-4">
          <SelectWithAdd
            label="Договор"
            value={draft.contract}
            options={contracts}
            editing={editing}
            onChange={(v) => setField("contract", v)}
            onNewItem={(v) => {
              setContracts((prev) => [...prev, v]);
              setField("contract", v);
            }}
            modalTitle="Добавить новый договор"
          />
          <div>
            <label className="block text-xs text-gray-500 mb-1">Описание</label>
            <input
              type="text"
              value={draft.description}
              onChange={(e) => setField("description", e.target.value)}
              disabled={!editing}
              className={cn(
                "w-full px-3 py-2 text-sm border rounded-lg outline-none transition-colors",
                editing
                  ? "border-gray-300 focus:border-[#f96800] bg-white"
                  : "border-gray-200 bg-gray-50 text-gray-600",
              )}
            />
          </div>

          <ReadonlyField label="Инициатор" value={draft.initiator} />
          <ReadonlyField label="Дата создания" value={draft.createdAt} />
          <SelectWithAdd
            label="Центр затрат"
            value={draft.costCenter}
            options={costCenters}
            editing={editing}
            onChange={(v) => setField("costCenter", v)}
            onNewItem={(v) => {
              setCostCenters((prev) => [...prev, v]);
              setField("costCenter", v);
            }}
            modalTitle="Добавить новый центр затрат"
          />
          <SelectWithAdd
            label="Проект"
            value={draft.project}
            options={projects}
            editing={editing}
            onChange={(v) => setField("project", v)}
            onNewItem={(v) => {
              setProjects((prev) => [...prev, v]);
              setField("project", v);
            }}
            modalTitle="Добавить новый проект"
          />
          <SelectWithAdd
            label="Статья"
            value={draft.article}
            options={articles}
            editing={editing}
            onChange={(v) => setField("article", v)}
            onNewItem={(v) => {
              setArticles((prev) => [...prev, v]);
              setField("article", v);
            }}
            modalTitle="Добавить новую статью"
          />
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Сумма рамочного договора
            </label>
            <div className="px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-800 font-medium">
              {formatNumber(total)} KZT
            </div>
          </div>
        </div>
      </Paper>
      <Paper elevation={1}>
        <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700">
            Спецификация
          </span>
          {editing && (
            <button
              type="button"
              onClick={addRow}
              className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <AddIcon fontSize="small" />
              Добавить строку
            </button>
          )}
        </div>

        <TableContainer>
          <Table size="small">
            <TableHead sx={{ backgroundColor: "#f1f5f9" }}>
              <TableRow>
                <TableCell width={48}>
                  <b>№</b>
                </TableCell>
                <TableCell>
                  <b>Описание товара / услуги</b>
                </TableCell>
                <TableCell width={120}>
                  <b>Количество</b>
                </TableCell>
                <TableCell width={150}>
                  <b>Цена за ед.</b>
                </TableCell>
                <TableCell width={150}>
                  <b>Сумма</b>
                </TableCell>
                {editing && <TableCell width={56} />}
              </TableRow>
            </TableHead>
            <TableBody>
              {draft.rows.map((row, idx) => (
                <TableRow key={row.id} hover>
                  <TableCell className="text-gray-500 text-sm">
                    {idx + 1}
                  </TableCell>
                  <TableCell>
                    {editing ? (
                      <input
                        type="text"
                        value={row.description}
                        onChange={(e) =>
                          updateRow(row.id, "description", e.target.value)
                        }
                        placeholder="Введите описание..."
                        className="w-full px-2 py-1 text-sm border border-gray-200 rounded outline-none focus:border-[#f96800] transition-colors"
                      />
                    ) : (
                      <span className="text-sm">{row.description || "—"}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {editing ? (
                      <input
                        type="number"
                        min="0"
                        value={row.qty}
                        onChange={(e) =>
                          updateRow(row.id, "qty", e.target.value)
                        }
                        placeholder="0"
                        className="w-full px-2 py-1 text-sm border border-gray-200 rounded outline-none focus:border-[#f96800] transition-colors text-right"
                      />
                    ) : (
                      <span className="text-sm">{row.qty || "—"}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {editing ? (
                      <input
                        type="number"
                        min="0"
                        value={row.price}
                        onChange={(e) =>
                          updateRow(row.id, "price", e.target.value)
                        }
                        placeholder="0"
                        className="w-full px-2 py-1 text-sm border border-gray-200 rounded outline-none focus:border-[#f96800] transition-colors text-right"
                      />
                    ) : (
                      <span className="text-sm">
                        {row.price ? formatNumber(parseFloat(row.price)) : "—"}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium text-gray-800">
                      {calcRowSum(row) > 0
                        ? formatNumber(calcRowSum(row))
                        : "—"}
                    </span>
                  </TableCell>
                  {editing && (
                    <TableCell>
                      <button
                        type="button"
                        onClick={() => removeRow(row.id)}
                        className="flex items-center justify-center w-7 h-7 rounded border border-red-200 text-red-400 hover:bg-red-50 hover:border-red-400 hover:text-red-600 transition-colors"
                        title="Удалить строку"
                      >
                        <RemoveIcon fontSize="small" />
                      </button>
                    </TableCell>
                  )}
                </TableRow>
              ))}

              {draft.rows.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={editing ? 6 : 5}
                    className="text-center text-gray-400 text-sm py-8"
                  >
                    Нет строк спецификации
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="px-5 py-4 border-t border-gray-200 flex justify-end">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Итого:</span>
            <span className="text-base font-semibold text-gray-800">
              {formatNumber(total)} KZT
            </span>
          </div>
        </div>
      </Paper>
    </div>
  );
}
