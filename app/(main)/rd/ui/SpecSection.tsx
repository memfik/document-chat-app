"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpecMobileCards } from "./SpecMobileCards";
import { SpecTable } from "./SpecTable";
import { calcTotal, formatNumber, type SpecRow } from "../data/options";

interface SpecSectionProps {
  rows: SpecRow[];
  editing: boolean;
  isMobile: boolean;
  onUpdate: (id: number, field: keyof SpecRow, value: string) => void;
  onRemove: (id: number) => void;
  onAdd: () => void;
}

export function SpecSection({
  rows,
  editing,
  isMobile,
  onUpdate,
  onRemove,
  onAdd,
}: SpecSectionProps) {
  const total = calcTotal(rows);

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border">
        <p className="text-sm font-semibold">Спецификация</p>
        {editing && (
          <Button
            variant="outline"
            size="sm"
            onClick={onAdd}
            className="flex items-center gap-1.5"
          >
            <Plus className="size-4" />
            Добавить строку
          </Button>
        )}
      </div>

      {isMobile ? (
        <SpecMobileCards
          rows={rows}
          editing={editing}
          onUpdate={onUpdate}
          onRemove={onRemove}
        />
      ) : (
        <SpecTable
          rows={rows}
          editing={editing}
          onUpdate={onUpdate}
          onRemove={onRemove}
        />
      )}

      <div className="flex justify-end items-center gap-4 px-5 py-3 border-t border-border">
        <p className="text-sm text-muted-foreground">Итого:</p>
        <p className="text-base font-semibold">{formatNumber(total)} KZT</p>
      </div>
    </div>
  );
}
