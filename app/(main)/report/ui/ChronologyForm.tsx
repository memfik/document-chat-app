"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SELECT_PLACEHOLDER = "— Выберите —";

function SelectField({ label, name }: { label: string; name: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Select>
        <SelectTrigger className="w-full" name={name}>
          <SelectValue placeholder={SELECT_PLACEHOLDER} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="_placeholder" disabled>
            {SELECT_PLACEHOLDER}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default function ChronologyForm({
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
    <div className="bg-card border border-border rounded-xl p-5 max-w-3xl shadow-sm">
      <p className="text-sm font-semibold mb-1">{title}</p>
      <p className="text-sm text-muted-foreground mb-5">{description}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <SelectField label="Инициатор" name="initiator" />
          <SelectField label="Центр затрат" name="costCenter" />
          <SelectField label="Тип закупа" name="purchaseType" />
          <SelectField label="Статья" name="article" />
          <SelectField label="БКВ2" name="bkv2" />
          <SelectField label="Проект" name="project" />
          <SelectField label="Центр / Децентр" name="centerDecentr" />
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">
              Начало периода
            </Label>
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">
              Конец периода
            </Label>
            <Input
              type="date"
              min={dateFrom}
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
          <SelectField label="Статус" name="status" />
          <SelectField label="Исполнитель" name="executor" />
          <SelectField label="Точка присутствия" name="presencePoint" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">
              Фильтр по тексту
            </Label>
            <Input name="textFilter" placeholder="Введите текст" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">
              или содержит
            </Label>
            <Input name="textFilterOr" placeholder="или содержит" />
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
