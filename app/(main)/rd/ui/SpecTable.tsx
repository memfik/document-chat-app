"use client";

import { Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
      <Table className="min-w-[640px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">№</TableHead>
            <TableHead>Описание товара / услуги</TableHead>
            <TableHead className="w-28">Количество</TableHead>
            <TableHead className="w-36">Цена за ед.</TableHead>
            <TableHead className="w-36">Сумма</TableHead>
            {editing && <TableHead className="w-14" />}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={editing ? 6 : 5}
                className="px-3 py-8 text-center text-sm text-muted-foreground"
              >
                Нет строк спецификации
              </TableCell>
            </TableRow>
          )}
          {rows.map((row, idx) => (
            <TableRow key={row.id}>
              <TableCell className="text-muted-foreground">{idx + 1}</TableCell>
              <TableCell>
                {editing ? (
                  <Input
                    placeholder="Введите описание..."
                    value={row.description}
                    onChange={(e) => onUpdate(row.id, "description", e.target.value)}
                  />
                ) : (
                  <span>{row.description || "—"}</span>
                )}
              </TableCell>
              <TableCell>
                {editing ? (
                  <Input
                    className="text-right"
                    type="number"
                    min={0}
                    placeholder="0"
                    value={row.qty}
                    onChange={(e) => onUpdate(row.id, "qty", e.target.value)}
                  />
                ) : (
                  <span>{row.qty || "—"}</span>
                )}
              </TableCell>
              <TableCell>
                {editing ? (
                  <Input
                    className="text-right"
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
              </TableCell>
              <TableCell className="font-medium">
                {calcRowSum(row) > 0 ? formatNumber(calcRowSum(row)) : "—"}
              </TableCell>
              {editing && (
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onRemove(row.id)}
                    title="Удалить строку"
                    className="border border-destructive/40 text-destructive hover:bg-destructive/10"
                  >
                    <Minus className="size-4" />
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
