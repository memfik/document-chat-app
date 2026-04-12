"use client";

import { Minus } from "lucide-react";
import { calcRowSum, formatNumber, type SpecRow } from "../data/options";

interface SpecMobileCardsProps {
  rows: SpecRow[];
  editing: boolean;
  onUpdate: (id: number, field: keyof SpecRow, value: string) => void;
  onRemove: (id: number) => void;
}

export function SpecMobileCards({
  rows,
  editing,
  onUpdate,
  onRemove,
}: SpecMobileCardsProps) {
  if (rows.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-6">
        Нет строк спецификации
      </p>
    );
  }

  return (
    <div className="px-4 py-3 flex flex-col gap-3">
      {rows.map((row, idx) => {
        const sum = calcRowSum(row);
        return (
          <div
            key={row.id}
            className="border border-border rounded-lg p-3 bg-card"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs text-muted-foreground font-medium">
                № {idx + 1}
              </p>
              {editing && (
                <button
                  onClick={() => onRemove(row.id)}
                  className="p-1 rounded border border-destructive/40 text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <Minus className="size-4" />
                </button>
              )}
            </div>

            {editing ? (
              <input
                className="input-base mb-3"
                placeholder="Введите описание..."
                value={row.description}
                onChange={(e) =>
                  onUpdate(row.id, "description", e.target.value)
                }
              />
            ) : (
              <p className="text-sm font-medium mb-3">
                {row.description || "—"}
              </p>
            )}

            <div className="grid grid-cols-2 gap-2">
              {editing ? (
                <>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">
                      Кол-во
                    </label>
                    <input
                      className="input-base"
                      type="number"
                      min={0}
                      value={row.qty}
                      onChange={(e) => onUpdate(row.id, "qty", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">
                      Цена за ед.
                    </label>
                    <input
                      className="input-base"
                      type="number"
                      min={0}
                      value={row.price}
                      onChange={(e) =>
                        onUpdate(row.id, "price", e.target.value)
                      }
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p className="text-xs text-muted-foreground">Кол-во</p>
                    <p className="text-sm">{row.qty || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Цена за ед.</p>
                    <p className="text-sm">
                      {row.price ? formatNumber(parseFloat(row.price)) : "—"}
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end items-center mt-3 pt-3 border-t border-border gap-2">
              <p className="text-xs text-muted-foreground">Сумма:</p>
              <p
                className={`text-sm font-bold ${sum > 0 ? "text-foreground" : "text-muted-foreground"}`}
              >
                {sum > 0 ? formatNumber(sum) : "—"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
