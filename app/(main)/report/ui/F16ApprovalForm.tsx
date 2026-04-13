"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function F16ApprovalForm({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(false), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToast(true);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5 max-w-lg shadow-sm">
      <p className="text-sm font-semibold mb-1">{title}</p>
      <p className="text-sm text-muted-foreground mb-5">{description}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Дата начала</Label>
            <Input
              type="date"
              required
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Дата окончания</Label>
            <Input
              type="date"
              required
              min={dateFrom}
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="self-stretch sm:self-start bg-[#f96800] text-white hover:bg-[#e05a00]"
        >
          Сформировать
        </Button>
      </form>

      {toast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium">
          Отчёт формируется...
        </div>
      )}
    </div>
  );
}
