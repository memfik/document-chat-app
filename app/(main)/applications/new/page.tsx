"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Paper,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import { cn } from "@/lib/utils";

const REQUEST_TYPES = [
  "Закупка товаров",
  "Закупка услуг",
  "Строительство",
  "Аренда",
  "Прочее",
];
const COST_CENTERS = [
  "ЦЗ-001 Головной офис",
  "ЦЗ-002 Производство",
  "ЦЗ-003 Логистика",
];
const CURATORS = ["Иванов С.К.", "Козлов Р.Д.", "Петров А.В.", "Смирнова О.Н."];
const APPROVERS = [
  "Ахметов Д.С.",
  "Байжанов Р.Т.",
  "Гусев В.Н.",
  "Джаксыбеков А.К.",
  "Есенова М.Б.",
  "Иванов С.К.",
  "Козлов Р.Д.",
  "Петров А.В.",
  "Смирнова О.Н.",
];
const PROJECTS = ["Проект Альфа", "Проект Бета", "Проект Гамма", "—"];
const ARTICLES = [
  "Ст. 44 Закупки",
  "Ст. 46 Услуги",
  "Ст. 48 Строительство",
  "Ст. 50 ИТ",
];
const LOCATIONS = ["Алматы", "Астана", "Шымкент", "Атырау", "Актобе"];

const ED_GO_LIST = [
  "Ахметов Д.С. — Финансы",
  "Байжанов Р.Т. — Юридический",
  "Гусев В.Н. — Безопасность",
  "Джаксыбеков А.К. — Логистика",
  "Есенова М.Б. — Бухгалтерия",
  "Жумабеков С.А. — ИТ",
  "Ким О.В. — Снабжение",
  "Мусаева А.Н. — Кадры",
  "Нурланов Е.Г. — Технический",
];

const VAT_RATE = 0.12;

interface Position {
  id: number;
  requestType: string;
  product: string;
  qty: string;
  deliveryPlace: string;
  dateFrom: string;
  dateTo: string;
  priceNoVat: string;
  costCenter: string;
  curator: string;
  project: string;
  article: string;
  location: string;
}

interface Attachments {
  spec: File | null;
  extra: File | null;
  contract: File | null;
}

const emptyPosition = (id: number): Position => ({
  id,
  requestType: REQUEST_TYPES[0],
  product: "",
  qty: "",
  deliveryPlace: "",
  dateFrom: "",
  dateTo: "",
  priceNoVat: "",
  costCenter: COST_CENTERS[0],
  curator: CURATORS[0],
  project: PROJECTS[0],
  article: ARTICLES[0],
  location: LOCATIONS[0],
});

let nextId = 10;

const priceWithVat = (p: Position) => {
  const v = parseFloat(p.priceNoVat) || 0;
  return v * (1 + VAT_RATE);
};

const fmt = (n: number) =>
  n.toLocaleString("ru-RU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-5 py-3 border-b border-gray-200 bg-gray-50 rounded-t-xl">
      <span className="text-sm font-semibold text-gray-700">{children}</span>
    </div>
  );
}

function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block text-xs text-gray-500 mb-1">
      {children}
      {required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  required,
  error,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  error?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        placeholder={placeholder}
        className={cn(
          "w-full px-3 py-2 text-sm border rounded-lg outline-none transition-colors resize-none",
          error
            ? "border-red-400 focus:border-red-400"
            : "border-gray-200 focus:border-[#f96800]",
        )}
      />
      {error && (
        <p className="text-xs text-red-400 mt-0.5">Обязательное поле</p>
      )}
    </div>
  );
}

function FileInput({
  label,
  file,
  onChange,
}: {
  label: string;
  file: File | null;
  onChange: (f: File | null) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div
        onClick={() => ref.current?.click()}
        className="flex items-center gap-2 px-3 py-2.5 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#f96800] transition-colors"
      >
        <UploadFileIcon fontSize="small" className="text-gray-400 shrink-0" />
        <span className="text-sm text-gray-500 truncate flex-1">
          {file ? file.name : "Нажмите для загрузки файла..."}
        </span>
        {file && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange(null);
            }}
            className="text-gray-400 hover:text-gray-600 text-xs shrink-0"
          >
            ✕
          </button>
        )}
      </div>
      <input
        ref={ref}
        type="file"
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}

function PositionRow({
  pos,
  index,
  errors,
  onChange,
  onClear,
  onRemove,
  canRemove,
}: {
  pos: Position;
  index: number;
  errors: Set<string>;
  onChange: (id: number, field: keyof Position, value: string) => void;
  onClear: (id: number) => void;
  onRemove: (id: number) => void;
  canRemove: boolean;
}) {
  const set =
    (f: keyof Position) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      onChange(pos.id, f, e.target.value);

  const inputCls = (field: string) =>
    cn(
      "w-full px-2 py-1.5 text-sm border rounded-lg outline-none transition-colors",
      errors.has(`${pos.id}.${field}`)
        ? "border-red-400 focus:border-red-400"
        : "border-gray-200 focus:border-[#f96800]",
    );

  const selectCls = (field: string) =>
    cn(
      "w-full px-2 py-1.5 text-sm border rounded-lg outline-none transition-colors bg-white",
      errors.has(`${pos.id}.${field}`)
        ? "border-red-400"
        : "border-gray-200 focus:border-[#f96800]",
    );

  return (
    <div className="border border-gray-200 rounded-xl p-4 relative">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Позиция #{index + 1}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onClear(pos.id)}
            className="text-xs text-gray-400 hover:text-gray-600 underline transition-colors"
          >
            Очистить
          </button>
          {canRemove && (
            <button
              type="button"
              onClick={() => onRemove(pos.id)}
              className="flex items-center gap-0.5 text-xs text-red-400 hover:text-red-600 transition-colors"
            >
              <DeleteOutlineIcon fontSize="inherit" />
              Удалить
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div>
          <FieldLabel required>Тип заявки</FieldLabel>
          <select
            value={pos.requestType}
            onChange={set("requestType")}
            className={selectCls("requestType")}
          >
            {REQUEST_TYPES.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div className="col-span-2">
          <FieldLabel required>Товар / Услуга</FieldLabel>
          <input
            type="text"
            value={pos.product}
            onChange={set("product")}
            placeholder="Введите наименование..."
            className={inputCls("product")}
          />
          {errors.has(`${pos.id}.product`) && (
            <p className="text-xs text-red-400 mt-0.5">Обязательное поле</p>
          )}
        </div>
        <div>
          <FieldLabel required>Количество</FieldLabel>
          <input
            type="number"
            min="1"
            value={pos.qty}
            onChange={set("qty")}
            placeholder="0"
            className={inputCls("qty")}
          />
          {errors.has(`${pos.id}.qty`) && (
            <p className="text-xs text-red-400 mt-0.5">Обязательное поле</p>
          )}
        </div>
        <div>
          <FieldLabel required>Место поставки</FieldLabel>
          <input
            type="text"
            value={pos.deliveryPlace}
            onChange={set("deliveryPlace")}
            placeholder="Адрес..."
            className={inputCls("deliveryPlace")}
          />
          {errors.has(`${pos.id}.deliveryPlace`) && (
            <p className="text-xs text-red-400 mt-0.5">Обязательное поле</p>
          )}
        </div>
        <div>
          <FieldLabel required>Дата начала</FieldLabel>
          <input
            type="date"
            value={pos.dateFrom}
            onChange={set("dateFrom")}
            className={inputCls("dateFrom")}
          />
          {errors.has(`${pos.id}.dateFrom`) && (
            <p className="text-xs text-red-400 mt-0.5">Обязательное поле</p>
          )}
        </div>
        <div>
          <FieldLabel required>Дата окончания</FieldLabel>
          <input
            type="date"
            value={pos.dateTo}
            min={pos.dateFrom}
            onChange={set("dateTo")}
            className={inputCls("dateTo")}
          />
          {errors.has(`${pos.id}.dateTo`) && (
            <p className="text-xs text-red-400 mt-0.5">Обязательное поле</p>
          )}
        </div>
        <div>
          <FieldLabel required>Стоимость без НДС</FieldLabel>
          <input
            type="number"
            min="0"
            value={pos.priceNoVat}
            onChange={set("priceNoVat")}
            placeholder="0"
            className={inputCls("priceNoVat")}
          />
          {errors.has(`${pos.id}.priceNoVat`) && (
            <p className="text-xs text-red-400 mt-0.5">Обязательное поле</p>
          )}
        </div>
        <div>
          <FieldLabel>Стоимость с НДС (12%)</FieldLabel>
          <div className="w-full px-2 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium">
            {pos.priceNoVat ? fmt(priceWithVat(pos)) : "—"}
          </div>
        </div>
        <div>
          <FieldLabel required>Центр затрат</FieldLabel>
          <select
            value={pos.costCenter}
            onChange={set("costCenter")}
            className={selectCls("costCenter")}
          >
            {COST_CENTERS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div>
          <FieldLabel required>Куратор</FieldLabel>
          <select
            value={pos.curator}
            onChange={set("curator")}
            className={selectCls("curator")}
          >
            {CURATORS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div>
          <FieldLabel>Проект</FieldLabel>
          <select
            value={pos.project}
            onChange={set("project")}
            className={selectCls("project")}
          >
            {PROJECTS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div>
          <FieldLabel required>Статья</FieldLabel>
          <select
            value={pos.article}
            onChange={set("article")}
            className={selectCls("article")}
          >
            {ARTICLES.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div>
          <FieldLabel>Точка присутствия</FieldLabel>
          <select
            value={pos.location}
            onChange={set("location")}
            className={selectCls("location")}
          >
            {LOCATIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default function NewF16Page() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [purpose, setPurpose] = useState("");
  const [benefits, setBenefits] = useState("");
  const [losses, setLosses] = useState("");
  const [positions, setPositions] = useState<Position[]>([
    emptyPosition(1),
    emptyPosition(2),
    emptyPosition(3),
  ]);
  const [approvers, setApprovers] = useState<string[]>([]);
  const [attachments, setAttachments] = useState<Attachments>({
    spec: null,
    extra: null,
    contract: null,
  });
  const [errors, setErrors] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  const updatePosition = (id: number, field: keyof Position, value: string) => {
    setPositions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    );
  };

  const clearPosition = (id: number) => {
    setPositions((prev) =>
      prev.map((p) =>
        p.id === id ? { ...emptyPosition(id), requestType: p.requestType } : p,
      ),
    );
  };

  const removePosition = (id: number) => {
    setPositions((prev) => prev.filter((p) => p.id !== id));
  };

  const addPosition = () => {
    setPositions((prev) => [...prev, emptyPosition(nextId++)]);
  };

  const totalWithVat = positions.reduce((acc, p) => acc + priceWithVat(p), 0);
  const validate = () => {
    const errs = new Set<string>();
    if (!purpose.trim()) errs.add("purpose");
    positions.forEach((p) => {
      if (!p.product.trim()) errs.add(`${p.id}.product`);
      if (!p.qty.trim() || parseFloat(p.qty) <= 0) errs.add(`${p.id}.qty`);
      if (!p.deliveryPlace.trim()) errs.add(`${p.id}.deliveryPlace`);
      if (!p.dateFrom) errs.add(`${p.id}.dateFrom`);
      if (!p.dateTo) errs.add(`${p.id}.dateTo`);
      if (!p.priceNoVat.trim() || parseFloat(p.priceNoVat) <= 0)
        errs.add(`${p.id}.priceNoVat`);
    });
    return errs;
  };

  const handleSubmit = () => {
    const errs = validate();
    setErrors(errs);
    setSubmitted(true);
    if (errs.size === 0) {
      alert("Форма отправлена успешно!");
      router.push("/applications");
    } else {
      document
        .querySelector("[data-error]")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="py-6 px-6 max-w-7xl mx-auto">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">
        Новая заявка Ф16
      </h1>

      <div className="flex flex-col gap-5">
        <Paper elevation={1}>
          <div className="p-5">
            <FieldLabel required>Название заявки</FieldLabel>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите название заявки..."
              className={cn(
                "w-full px-3 py-2 text-sm border rounded-lg outline-none transition-colors",
                submitted && !title.trim()
                  ? "border-red-400 focus:border-red-400"
                  : "border-gray-200 focus:border-[#f96800]",
              )}
            />
            {submitted && !title.trim() && (
              <p className="text-xs text-red-400 mt-0.5">Обязательное поле</p>
            )}
          </div>
        </Paper>

        <Paper elevation={1}>
          <SectionTitle>1. Обоснование закупа</SectionTitle>
          <div className="p-5 grid grid-cols-3 gap-4">
            <TextArea
              label="Назначение закупа"
              value={purpose}
              onChange={setPurpose}
              required
              error={submitted && errors.has("purpose")}
              placeholder="Опишите назначение..."
            />
            <TextArea
              label="Выгоды от закупа"
              value={benefits}
              onChange={setBenefits}
              placeholder="Опишите выгоды..."
            />
            <TextArea
              label="Убытки при непроведении"
              value={losses}
              onChange={setLosses}
              placeholder="Опишите возможные убытки..."
            />
          </div>
        </Paper>
        <Paper elevation={1}>
          <SectionTitle>2. Позиции заявки</SectionTitle>
          <div className="p-5 flex flex-col gap-4">
            {positions.map((pos, idx) => (
              <PositionRow
                key={pos.id}
                pos={pos}
                index={idx}
                errors={errors}
                onChange={updatePosition}
                onClear={clearPosition}
                onRemove={removePosition}
                canRemove={positions.length > 1}
              />
            ))}

            <button
              type="button"
              onClick={addPosition}
              className="flex items-center gap-1.5 self-start px-4 py-2 text-sm border border-dashed border-gray-300 text-gray-500 rounded-lg hover:border-[#f96800] hover:text-[#f96800] transition-colors"
            >
              <AddIcon fontSize="small" />
              Добавить позицию
            </button>
            <div className="flex justify-end pt-2 border-t border-gray-100">
              <div className="flex items-center gap-8 text-sm">
                <span className="text-gray-500">
                  Позиций: <b className="text-gray-700">{positions.length}</b>
                </span>
                <span className="text-gray-500">
                  ИТОГО с НДС:{" "}
                  <b className="text-gray-800 text-base">
                    {fmt(totalWithVat)} KZT
                  </b>
                </span>
              </div>
            </div>
          </div>
        </Paper>
        <Paper elevation={1}>
          <SectionTitle>3. Согласование</SectionTitle>
          <div className="p-5">
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="flex flex-col gap-3">
                <div>
                  <FieldLabel>Инициирующее подразделение</FieldLabel>
                  <div className="px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
                    ГО-ДЦиРС
                  </div>
                </div>
                <div>
                  <FieldLabel>Согласующий</FieldLabel>
                  <Select
                    multiple
                    displayEmpty
                    value={approvers}
                    onChange={(e) =>
                      setApprovers(
                        typeof e.target.value === "string"
                          ? e.target.value.split(",")
                          : e.target.value,
                      )
                    }
                    input={<OutlinedInput notched={false} />}
                    renderValue={(selected) =>
                      selected.length === 0 ? (
                        <span className="text-gray-400 text-sm">
                          Выберите согласующих...
                        </span>
                      ) : (
                        <span className="text-sm">{selected.join(", ")}</span>
                      )
                    }
                    size="small"
                    fullWidth
                  >
                    {APPROVERS.map((a) => (
                      <MenuItem key={a} value={a}>
                        <Checkbox
                          checked={approvers.includes(a)}
                          size="small"
                        />
                        <ListItemText primary={a} />
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
              <div>
                <FieldLabel>Кураторы статей</FieldLabel>
                <Select
                  multiple
                  displayEmpty
                  value={approvers}
                  onChange={(e) =>
                    setApprovers(
                      typeof e.target.value === "string"
                        ? e.target.value.split(",")
                        : e.target.value,
                    )
                  }
                  input={<OutlinedInput notched={false} />}
                  renderValue={(selected) =>
                    selected.length === 0 ? (
                      <span className="text-gray-400 text-sm">
                        Выберите согласующих...
                      </span>
                    ) : (
                      <span className="text-sm">{selected.join(", ")}</span>
                    )
                  }
                  size="small"
                  fullWidth
                >
                  {APPROVERS.map((a) => (
                    <MenuItem key={a} value={a}>
                      <Checkbox checked={approvers.includes(a)} size="small" />
                      <ListItemText primary={a} />
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                ЭД ГО
              </p>
              <div className="grid gap-2">
                {ED_GO_LIST.map((person, i) => (
                  <label
                    key={i}
                    className="flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-lg border text-sm text-gray-700"
                  >
                    <span className="font-bold">Согласующий {i + 1}</span>
                    {person}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </Paper>
        <Paper elevation={1}>
          <SectionTitle>4. Вложения</SectionTitle>
          <div className="p-5 grid grid-cols-3 gap-4">
            <FileInput
              label="Техническая спецификация"
              file={attachments.spec}
              onChange={(f) => setAttachments((a) => ({ ...a, spec: f }))}
            />
            <FileInput
              label="Дополнительные файлы"
              file={attachments.extra}
              onChange={(f) => setAttachments((a) => ({ ...a, extra: f }))}
            />
            <FileInput
              label="Договор"
              file={attachments.contract}
              onChange={(f) => setAttachments((a) => ({ ...a, contract: f }))}
            />
          </div>
        </Paper>
        {submitted && errors.size > 0 && (
          <div className="text-sm text-red-500 text-right">
            Заполните все обязательные поля ({errors.size} ошибок)
          </div>
        )}
        <div className="flex justify-end gap-2 pb-4">
          <button
            onClick={() => router.back()}
            className="px-5 py-2.5 text-sm border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Отмена
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2.5 text-sm bg-[#f96800] text-white rounded-lg hover:bg-[#e05a00] transition-colors"
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
}
