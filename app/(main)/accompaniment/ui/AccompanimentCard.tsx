"use client";

import type { AccompanimentRow } from "../data/accompaniment";

export function AccompanimentCard({ row }: { row: AccompanimentRow }) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-start mb-1">
        <p className="text-sm font-semibold">{row.id}</p>
        <p className="text-xs text-muted-foreground">{row.contractNum}</p>
      </div>
      <p className="text-sm mb-1">{row.supplier}</p>
      <p className="text-xs text-muted-foreground">
        {row.initiator} · {row.dept}
      </p>
      <div className="flex justify-between items-center mt-3">
        <p className="text-sm font-semibold">{row.cost} KZT</p>
        <p className="text-xs text-muted-foreground">
          Поставка: {row.deliveryDate}
        </p>
      </div>
    </div>
  );
}
