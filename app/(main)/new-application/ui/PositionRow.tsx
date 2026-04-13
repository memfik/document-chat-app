"use client";

import { Trash2 } from "lucide-react";
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
  const setInput =
    (f: keyof Position) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange(pos.id, f, e.target.value);

  const setSelect = (f: keyof Position) => (val: string | null) => {
    if (val) onChange(pos.id, f, val);
  };

  const err = (field: string) => errors.has(`${pos.id}.${field}`);

  return (
    <div className="border border-border/70 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Позиция #{index + 1}
        </p>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onClear(pos.id)}
            className="text-xs text-muted-foreground h-auto py-1 px-2"
          >
            Очистить
          </Button>
          {canRemove && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onRemove(pos.id)}
              className="flex items-center gap-1 text-xs text-destructive hover:text-destructive/80 h-auto py-1 px-2"
            >
              <Trash2 className="size-3" />
              Удалить
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">
            Тип заявки <span className="text-destructive">*</span>
          </Label>
          <Select value={pos.requestType} onValueChange={setSelect("requestType")}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {REQUEST_TYPES.map((o) => (
                <SelectItem key={o} value={o}>{o}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="sm:col-span-2 flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">
            Товар / Услуга <span className="text-destructive">*</span>
          </Label>
          <Input
            className={err("product") ? "border-destructive" : ""}
            placeholder="Введите наименование..."
            value={pos.product}
            onChange={setInput("product")}
          />
          {err("product") && (
            <p className="text-xs text-destructive">Обязательное поле</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">
            Количество <span className="text-destructive">*</span>
          </Label>
          <Input
            type="number"
            min={1}
            className={err("qty") ? "border-destructive" : ""}
            placeholder="0"
            value={pos.qty}
            onChange={setInput("qty")}
          />
          {err("qty") && (
            <p className="text-xs text-destructive">Обязательное поле</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">
            Место поставки <span className="text-destructive">*</span>
          </Label>
          <Input
            className={err("deliveryPlace") ? "border-destructive" : ""}
            placeholder="Адрес..."
            value={pos.deliveryPlace}
            onChange={setInput("deliveryPlace")}
          />
          {err("deliveryPlace") && (
            <p className="text-xs text-destructive">Обязательное поле</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">
            Дата начала <span className="text-destructive">*</span>
          </Label>
          <Input
            type="date"
            className={err("dateFrom") ? "border-destructive" : ""}
            value={pos.dateFrom}
            onChange={setInput("dateFrom")}
          />
          {err("dateFrom") && (
            <p className="text-xs text-destructive">Обязательное поле</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">
            Дата окончания <span className="text-destructive">*</span>
          </Label>
          <Input
            type="date"
            className={err("dateTo") ? "border-destructive" : ""}
            min={pos.dateFrom}
            value={pos.dateTo}
            onChange={setInput("dateTo")}
          />
          {err("dateTo") && (
            <p className="text-xs text-destructive">Обязательное поле</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">
            Стоимость без НДС <span className="text-destructive">*</span>
          </Label>
          <Input
            type="number"
            min={0}
            className={err("priceNoVat") ? "border-destructive" : ""}
            placeholder="0"
            value={pos.priceNoVat}
            onChange={setInput("priceNoVat")}
          />
          {err("priceNoVat") && (
            <p className="text-xs text-destructive">Обязательное поле</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">
            Стоимость с НДС (12%)
          </Label>
          <Input value={priceWithVatValue} disabled />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">
            Центр затрат <span className="text-destructive">*</span>
          </Label>
          <Select value={pos.costCenter} onValueChange={setSelect("costCenter")}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COST_CENTERS.map((o) => (
                <SelectItem key={o} value={o}>{o}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">
            Куратор <span className="text-destructive">*</span>
          </Label>
          <Select value={pos.curator} onValueChange={setSelect("curator")}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CURATORS.map((o) => (
                <SelectItem key={o} value={o}>{o}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">Проект</Label>
          <Select value={pos.project} onValueChange={setSelect("project")}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PROJECTS.map((o) => (
                <SelectItem key={o} value={o}>{o}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">
            Статья <span className="text-destructive">*</span>
          </Label>
          <Select value={pos.article} onValueChange={setSelect("article")}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ARTICLES.map((o) => (
                <SelectItem key={o} value={o}>{o}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label className="text-xs text-muted-foreground">Точка присутствия</Label>
          <Select value={pos.location} onValueChange={setSelect("location")}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LOCATIONS.map((o) => (
                <SelectItem key={o} value={o}>{o}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
