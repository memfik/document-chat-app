"use client";

import { Minus } from "lucide-react";
import { calcRowSum, formatNumber, type SpecRow } from "../data/options";

interface SpecTableProps {
  rows: SpecRow[];
  editing: boolean;
  onUpdate: (id: number, field: keyof SpecRow, value: string) => void;
  onRemove: (id: number) => void;
}

export function SpecTable({ rows, editing, onUpdate, onRemove }: SpecTableProps) {
  return (
    <div className="overflow-auto">
      <table className="w-full text-sm min-w-[640px]">
        <thead className="bg-muted/50">
          <tr>
            <th className="px-3 py-2.5 text-left font-semibold w-12">№</th>
            <th className="px-3 py-2.5 text-left font-semibold">
              Описание товара / услуги
            </th>
            <th className="px-3 py-2.5 text-left font-semibold w-28">
              Количество
            </th>
            <th className="px-3 py-2.5 text-left font-semibold w-36">
              Цена за ед.
            </th>
            <th className="px-3 py-2.5 text-left font-semibold w-36">Сумма</th>
            {editing && <th className="w-14" />}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td
                colSpan={editing ? 6 : 5}
                className="px-3 py-8 text-center text-sm text-muted-foreground"
              >
                Нет строк спецификации
              </td>
            </tr>
          )}
          {rows.map((row, idx) => (
            <tr
              key={row.id}
              className="border-t border-border hover:bg-muted/20 transition-colors"
            >
              <td className="px-3 py-2 text-muted-foreground">{idx + 1}</td>
              <td className="px-3 py-2">
                {editing ? (
                  <input
                    className="input-base"
                    placeholder="Введите описание..."
                    value={row.description}
                    onChange={(e) =>
                      onUpdate(row.id, "description", e.target.value)
                    }
                  />
                ) : (
                  <span>{row.description || "—"}</span>
                )}
              </td>
              <td className="px-3 py-2">
                {editing ? (
                  <input
                    className="input-base text-right"
                    type="number"
                    min={0}
                    placeholder="0"
                    value={row.qty}
                    onChange={(e) => onUpdate(row.id, "qty", e.target.value)}
                  />
                ) : (
                  <span>{row.qty || "—"}</span>
                )}
              </td>
              <td className="px-3 py-2">
                {editing ? (
                  <input
                    className="input-base text-right"
                    type="number"
                    min={0}
                    placeholder="0"
                    value={row.price}
                    onChange={(e) => onUpdate(row.id, "price", e.target.value)}
                  />
                ) : (
                  <span>
                    {row.price ? formatNumber(parseFloat(row.price)) : "—"}
                  </span>
                )}
              </td>
              <td className="px-3 py-2 font-medium">
                {calcRowSum(row) > 0 ? formatNumber(calcRowSum(row)) : "—"}
              </td>
              {editing && (
                <td className="px-3 py-2">
                  <button
                    onClick={() => onRemove(row.id)}
                    title="Удалить строку"
                    className="p-1 rounded border border-destructive/40 text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <Minus className="size-4" />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
