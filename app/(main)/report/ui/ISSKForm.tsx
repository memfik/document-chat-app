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

function SelectField({
  label,
  name,
  defaultValue = "",
}: {
  label: string;
  name: string;
  defaultValue?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Select defaultValue={defaultValue || undefined}>
        <SelectTrigger className="w-full" name={name}>
          <SelectValue placeholder="— Выберите —" />
        </SelectTrigger>
        <SelectContent>
          {defaultValue &&
            defaultValue !== "--все--" &&
            defaultValue !== "" && (
              <SelectItem value={defaultValue}>{defaultValue}</SelectItem>
            )}
          <SelectItem value="--все--">--все--</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default function ISSKForm({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const [dateFrom, setDateFrom] = useState("01-04-2026");
  const [dateTo, setDateTo] = useState("08-04-2026");
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
    <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
      <p className="text-sm font-semibold mb-1">{title}</p>
      <p className="text-sm text-muted-foreground mb-5">{description}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <SelectField
            label="Инициатор"
            name="initiator"
            defaultValue="ГО-ДЭ"
          />
          <SelectField
            label="Центр затрат"
            name="costCenter"
            defaultValue="--все--"
          />
          <SelectField label="Куратор" name="curator" defaultValue="--все--" />
          <SelectField
            label="Тип закупа"
            name="purchaseType"
            defaultValue="--все--"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <SelectField label="Статья" name="article" defaultValue="--все--" />
          <SelectField label="БКВ2" name="bkv2" defaultValue="--все--" />
          <SelectField label="Проект" name="project" defaultValue="--все--" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <SelectField
            label="Подпроект"
            name="subproject"
            defaultValue="--все--"
          />
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">
              Начало периода
            </Label>
            <Input
              name="dateFrom"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">
              Конец периода
            </Label>
            <Input
              name="dateTo"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <SelectField
            label="Центр / Децентр"
            name="centerDecentr"
            defaultValue="--все--"
          />
          <SelectField
            label="Статус"
            name="status"
            defaultValue="Все с утвержденной Ф16"
          />
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">
              Фильтр по тексту
            </Label>
            <Input name="textFilter" />
          </div>
        </div>

        <div className="flex flex-col gap-2 max-w-full sm:max-w-[220px]">
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">
              Точка присутствия из списка
            </Label>
            <Select>
              <SelectTrigger className="w-full" name="presencePoint">
                <SelectValue placeholder="— Выберите —" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="_placeholder" disabled>
                  — Выберите —
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-xs text-muted-foreground">или содержит</p>
          <Input name="presencePointText" placeholder="Текст" />
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
