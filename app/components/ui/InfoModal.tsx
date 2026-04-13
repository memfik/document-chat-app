"use client";

import { X, History, FileText, Eye, Paperclip } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import type { ApplicationRow } from "@/app/types/application";

export type { ApplicationRow };

interface InfoModalProps {
  row: ApplicationRow;
  statusLabel: string;
  statusColor: string;
  paymentFileName?: string;
  onClose: () => void;
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide mb-3">
        {title}
      </p>
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  wide,
}: {
  label: string;
  value: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={wide ? "col-span-2" : ""}>
      <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
      <p className="text-sm font-medium">{value || "—"}</p>
    </div>
  );
}

function FileLink({
  name,
  exists = true,
  onView,
}: {
  name: string;
  exists?: boolean;
  onView?: () => void;
}) {
  return (
    <div
      className={`flex items-center justify-between px-3 py-2 rounded-lg border transition-colors ${
        exists
          ? "border-border bg-card hover:border-muted-foreground"
          : "border-dashed border-border bg-muted/30"
      }`}
    >
      <div className="flex items-center gap-2 min-w-0">
        <FileText
          className={`size-4 shrink-0 ${exists ? "text-blue-500" : "text-muted-foreground"}`}
        />
        <span
          className={`text-sm truncate ${exists ? "text-foreground" : "text-muted-foreground"}`}
        >
          {name}
        </span>
      </div>
      {exists && onView && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onView}
          className="flex items-center gap-1 ml-2 shrink-0 text-muted-foreground h-auto py-1"
        >
          <Eye className="size-3" />
          Просмотр
        </Button>
      )}
    </div>
  );
}

export function InfoModal({
  row,
  statusLabel,
  statusColor,
  paymentFileName,
  onClose,
}: InfoModalProps) {
  const costWithVat = row.cost.replace(/\s/g, "");
  const router = useRouter();
  const costNum = parseInt(costWithVat.replace(/\D/g, ""), 10) || 0;
  const costWithoutVat = Math.round(costNum / 1.12).toLocaleString("ru-RU");
  const vat = Math.round(costNum - costNum / 1.12).toLocaleString("ru-RU");

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="max-w-lg max-h-[90vh] flex flex-col p-0 gap-0"
      >
        {/* Title */}
        <div className="flex items-start justify-between gap-4 px-4 py-3 border-b border-border">
          <div className="min-w-0">
            <p className="text-sm font-bold">Заявка №{row.id}</p>
            <p className="text-sm text-muted-foreground truncate">
              {row.description}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/history/${row.id}`)}
              className="flex items-center gap-1.5 h-auto py-1.5"
            >
              <History className="size-3.5" />
              История
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onClose}
            >
              <X className="size-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 px-4 py-3 flex flex-col gap-5">
          <SectionCard title="Основная информация">
            <div className="grid grid-cols-2 gap-3">
              <Field label="№ заявки" value={row.id} />
              <Field
                label="Статус"
                value={
                  <span
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: statusColor }}
                  >
                    {statusLabel}
                  </span>
                }
              />
              <Field label="Дата поступления" value={row.date} />
              <Field label="Тип" value={row.type} />
              <Field label="Инициатор" value={row.initiator} />
              <Field label="Исполнитель" value={row.executor} />
              <Field label="Статья" value={row.article} />
              <Field label="Метод закупа" value="Запрос ценовых предложений" />
              <Field
                label="Стоимость (с НДС)"
                value={
                  <span className="font-bold">
                    {row.cost} {row.currency}
                  </span>
                }
              />
              <Field
                label="Стоимость (без НДС)"
                value={`${costWithoutVat} ${row.currency}`}
              />
            </div>
          </SectionCard>

          <div className="border-t border-border" />

          <SectionCard title="Паспорт договора">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Поставщик" value="ТОО «ТехСнаб»" wide />
              <Field
                label="Сумма договора"
                value={
                  <span className="font-bold">
                    {row.cost} {row.currency}
                  </span>
                }
              />
              <Field label="НДС (12%)" value={`${vat} ${row.currency}`} />
              <Field label="№ договора" value={row.contractNum} />
              <Field label="Дата договора" value={row.date} />
              <Field label="Условия оплаты" value="30 дней с момента поставки" />
              <Field label="Форма договора" value="Рамочный" />
            </div>
          </SectionCard>

          <div className="border-t border-border" />

          <SectionCard title="Согласование">
            <div className="flex flex-col gap-2">
              <FileLink name="Форма 16" onView={() => {}} />
              <FileLink name="Протокол согласования" onView={() => {}} />
              <FileLink name="Договор" onView={() => {}} />
              <div className="grid grid-cols-2 gap-3 mt-1 px-1">
                <Field label="№ ЗНО" value={row.znoNum} />
                <Field
                  label="Платежный документ"
                  value={
                    paymentFileName ? (
                      <span className="flex items-center gap-1 text-blue-500">
                        <Paperclip className="size-3" />
                        {paymentFileName}
                      </span>
                    ) : (
                      "—"
                    )
                  }
                />
              </div>
            </div>
          </SectionCard>

          <div className="border-t border-border" />

          <SectionCard title="Документы и файлы">
            <div className="flex flex-col gap-2">
              <FileLink name="Техническая спецификация.pdf" onView={() => {}} />
              <FileLink name="Приложение №1.xlsx" onView={() => {}} />
              <FileLink name="Файл договора.pdf" onView={() => {}} />
              <FileLink name="Анализ предложений.pdf" onView={() => {}} />
              <FileLink name="Прочие документы" exists={false} />
            </div>
          </SectionCard>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Последнее изменение: {row.updatedAt}
          </p>
          <Button variant="outline" size="sm" onClick={onClose}>
            Закрыть
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
