"use client";

import type { ZnoRow, ZNO_STATUS_FILTERS } from "../data/zno";

type StatusFilter = (typeof ZNO_STATUS_FILTERS)[number];

interface ZnoCardProps {
  row: ZnoRow;
  status: StatusFilter | undefined;
}

export function ZnoCard({ row, status }: ZnoCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <p className="text-sm font-semibold">{row.id}</p>
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block size-2 rounded-full shrink-0"
            style={{ backgroundColor: status?.color }}
          />
          <span
            className="text-xs font-medium"
            style={{ color: status?.color }}
          >
            {status?.label}
          </span>
        </div>
      </div>
      <p className="text-sm mb-1">{row.counterparty}</p>
      <p className="text-xs text-muted-foreground">
        {row.initiator} · {row.type}
      </p>
      <div className="flex justify-between items-center mt-3">
        <p className="text-sm font-semibold">
          {row.amount} {row.currency}
        </p>
        <p className="text-xs text-muted-foreground">до {row.payBefore}</p>
      </div>
    </div>
  );
}
