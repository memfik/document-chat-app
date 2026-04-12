"use client";

import { Plus } from "lucide-react";
import { PositionRow } from "./PositionRow";
import { priceWithVat, fmt, type Position } from "../data/options";

interface Step2Props {
  positions: Position[];
  errors: Set<string>;
  onUpdate: (id: number, field: keyof Position, value: string) => void;
  onClear: (id: number) => void;
  onRemove: (id: number) => void;
  onAdd: () => void;
}

export function Step2Positions({
  positions,
  errors,
  onUpdate,
  onClear,
  onRemove,
  onAdd,
}: Step2Props) {
  const totalWithVat = positions.reduce((acc, p) => acc + priceWithVat(p), 0);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-medium">Позиции заявки</p>

      {positions.map((pos, idx) => (
        <PositionRow
          key={pos.id}
          pos={pos}
          index={idx}
          errors={errors}
          onChange={onUpdate}
          onClear={onClear}
          onRemove={onRemove}
          canRemove={positions.length > 1}
          priceWithVatValue={pos.priceNoVat ? fmt(priceWithVat(pos)) : "—"}
        />
      ))}

      <button
        type="button"
        onClick={onAdd}
        className="self-start flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg border border-dashed border-border text-muted-foreground hover:border-[#f96800] hover:text-[#f96800] transition-colors"
      >
        <Plus className="size-4" />
        Добавить позицию
      </button>

      <div className="flex justify-end pt-2 border-t border-border/50">
        <div className="flex items-center gap-8">
          <p className="text-sm text-muted-foreground">
            Позиций: <b>{positions.length}</b>
          </p>
          <p className="text-sm text-muted-foreground">
            ИТОГО с НДС:{" "}
            <span className="text-base font-bold text-foreground">
              {fmt(totalWithVat)} KZT
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
