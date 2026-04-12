"use client";

import { Trash2 } from "lucide-react";
import {
  REQUEST_TYPES,
  COST_CENTERS,
  CURATORS,
  PROJECTS,
  ARTICLES,
  LOCATIONS,
  type Position,
} from "../data/options";

interface PositionRowProps {
  pos: Position;
  index: number;
  errors: Set<string>;
  onChange: (id: number, field: keyof Position, value: string) => void;
  onClear: (id: number) => void;
  onRemove: (id: number) => void;
  canRemove: boolean;
  priceWithVatValue: string;
}

export function PositionRow({
  pos,
  index,
  errors,
  onChange,
  onClear,
  onRemove,
  canRemove,
  priceWithVatValue,
}: PositionRowProps) {
  const set =
    (f: keyof Position) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      onChange(pos.id, f, e.target.value);

  const err = (field: string) => errors.has(`${pos.id}.${field}`);

  return (
    <div className="border border-border/70 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Позиция #{index + 1}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onClear(pos.id)}
            className="text-xs text-muted-foreground underline hover:text-foreground transition-colors"
          >
            Очистить
          </button>
          {canRemove && (
            <button
              type="button"
              onClick={() => onRemove(pos.id)}
              className="flex items-center gap-1 text-xs text-destructive hover:text-destructive/80 transition-colors"
            >
              <Trash2 className="size-3" />
              Удалить
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <div>
          <label className="block text-xs text-muted-foreground mb-1">
            Тип заявки <span className="text-destructive">*</span>
          </label>
          <select
            value={pos.requestType}
            onChange={set("requestType")}
            className="select-base"
          >
            {REQUEST_TYPES.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs text-muted-foreground mb-1">
            Товар / Услуга <span className="text-destructive">*</span>
          </label>
          <input
            className={`input-base ${err("product") ? "border-destructive" : ""}`}
            placeholder="Введите наименование..."
            value={pos.product}
            onChange={set("product")}
          />
          {err("product") && (
            <p className="text-xs text-destructive mt-1">Обязательное поле</p>
          )}
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">
            Количество <span className="text-destructive">*</span>
          </label>
          <input
            type="number"
            min={1}
            className={`input-base ${err("qty") ? "border-destructive" : ""}`}
            placeholder="0"
            value={pos.qty}
            onChange={set("qty")}
          />
          {err("qty") && (
            <p className="text-xs text-destructive mt-1">Обязательное поле</p>
          )}
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">
            Место поставки <span className="text-destructive">*</span>
          </label>
          <input
            className={`input-base ${err("deliveryPlace") ? "border-destructive" : ""}`}
            placeholder="Адрес..."
            value={pos.deliveryPlace}
            onChange={set("deliveryPlace")}
          />
          {err("deliveryPlace") && (
            <p className="text-xs text-destructive mt-1">Обязательное поле</p>
          )}
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">
            Дата начала <span className="text-destructive">*</span>
          </label>
          <input
            type="date"
            className={`input-base ${err("dateFrom") ? "border-destructive" : ""}`}
            value={pos.dateFrom}
            onChange={set("dateFrom")}
          />
          {err("dateFrom") && (
            <p className="text-xs text-destructive mt-1">Обязательное поле</p>
          )}
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">
            Дата окончания <span className="text-destructive">*</span>
          </label>
          <input
            type="date"
            className={`input-base ${err("dateTo") ? "border-destructive" : ""}`}
            min={pos.dateFrom}
            value={pos.dateTo}
            onChange={set("dateTo")}
          />
          {err("dateTo") && (
            <p className="text-xs text-destructive mt-1">Обязательное поле</p>
          )}
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">
            Стоимость без НДС <span className="text-destructive">*</span>
          </label>
          <input
            type="number"
            min={0}
            className={`input-base ${err("priceNoVat") ? "border-destructive" : ""}`}
            placeholder="0"
            value={pos.priceNoVat}
            onChange={set("priceNoVat")}
          />
          {err("priceNoVat") && (
            <p className="text-xs text-destructive mt-1">Обязательное поле</p>
          )}
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">
            Стоимость с НДС (12%)
          </label>
          <input
            className="input-base"
            value={priceWithVatValue}
            disabled
          />
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">
            Центр затрат <span className="text-destructive">*</span>
          </label>
          <select
            value={pos.costCenter}
            onChange={set("costCenter")}
            className="select-base"
          >
            {COST_CENTERS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">
            Куратор <span className="text-destructive">*</span>
          </label>
          <select
            value={pos.curator}
            onChange={set("curator")}
            className="select-base"
          >
            {CURATORS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">
            Проект
          </label>
          <select
            value={pos.project}
            onChange={set("project")}
            className="select-base"
          >
            {PROJECTS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">
            Статья <span className="text-destructive">*</span>
          </label>
          <select
            value={pos.article}
            onChange={set("article")}
            className="select-base"
          >
            {ARTICLES.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-muted-foreground mb-1">
            Точка присутствия
          </label>
          <select
            value={pos.location}
            onChange={set("location")}
            className="select-base"
          >
            {LOCATIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
