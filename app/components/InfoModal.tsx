"use client";

import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import HistoryIcon from "@mui/icons-material/History";
import DescriptionIcon from "@mui/icons-material/Description";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { cn } from "@/lib/utils";

export interface ApplicationRow {
  id: string;
  date: string;
  initiator: string;
  type: string;
  description: string;
  cost: string;
  currency: string;
  contractNum: string;
  executor: string;
  status: string;
  contract: string;
  updatedAt: string;
  article: string;
  znoNum: string;
}

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
    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
      <p className="text-md font-semibold text-gray-900 uppercase tracking-wide mb-3">
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
      <p className="text-xs text-gray-400 mb-0.5">{label}</p>
      <p className="text-sm text-gray-800 font-medium">{value || "—"}</p>
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
  onEdit?: () => void;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-3 py-2 rounded-xl border transition-colors",
        exists
          ? "bg-white border-gray-200 hover:border-gray-300"
          : "bg-gray-50 border-dashed border-gray-200",
      )}
    >
      <div className="flex items-center gap-2 min-w-0">
        <DescriptionIcon
          fontSize="small"
          className={
            exists ? "text-blue-500 shrink-0" : "text-gray-300 shrink-0"
          }
        />
        <span
          className={cn(
            "text-sm truncate",
            exists ? "text-gray-700" : "text-gray-400",
          )}
        >
          {name}
        </span>
      </div>
      {exists && (
        <div className="flex items-center gap-1 ml-2 shrink-0">
          {onView && (
            <button
              onClick={onView}
              className="flex items-center gap-1 px-2 py-1 text-xs text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <VisibilityIcon sx={{ fontSize: 13 }} />
              Просмотр
            </button>
          )}
        </div>
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
  const router = useRouter();

  const costWithVat = row.cost.replace(/\s/g, "");
  const costNum = parseInt(costWithVat.replace(/\D/g, ""), 10) || 0;
  const costWithoutVat = Math.round(costNum / 1.12).toLocaleString("ru-RU");
  const vat = Math.round(costNum - costNum / 1.12).toLocaleString("ru-RU");

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 pt-5 pb-4 border-b border-gray-100 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-gray-900">
              Заявка №{row.id}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5 truncate">
              {row.description}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                window.open(`/history/${row.id}`, "_blank");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <HistoryIcon fontSize="small" />
              История
            </button>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 rounded-xl border border-gray-200 text-gray-400 hover:bg-gray-100 transition-colors"
            >
              <CloseIcon fontSize="small" />
            </button>
          </div>
        </div>
        <div className="px-6 py-5 flex flex-col gap-4">
          <SectionCard title="Основная информация">
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              <Field label="№ заявки" value={row.id} />
              <Field
                label="Статус"
                value={
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold text-white"
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
                  <span className="text-gray-900 font-semibold">
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
          <SectionCard title="Паспорт договора">
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              <Field label="Поставщик" value="ТОО «ТехСнаб»" wide />
              <Field
                label="Сумма договора"
                value={
                  <span className="font-bold text-gray-900">
                    {row.cost} {row.currency}
                  </span>
                }
              />
              <Field label="НДС (12%)" value={`${vat} ${row.currency}`} />
              <Field label="№ договора" value={row.contractNum} />
              <Field label="Дата договора" value={row.date} />
              <Field
                label="Условия оплаты"
                value="30 дней с момента поставки"
              />
              <Field label="Форма договора" value="Рамочный" />
            </div>
          </SectionCard>
          <SectionCard title="Согласование">
            <div className="flex flex-col gap-2">
              <FileLink name="Форма 16" onView={() => {}} />
              <FileLink name="Протокол согласования" onView={() => {}} />
              <FileLink name="Договор" onView={() => {}} />
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-1 px-1">
                <Field label="№ ЗНО" value={row.znoNum} />
                <Field
                  label="Платежный документ"
                  value={
                    paymentFileName ? (
                      <span className="flex items-center gap-1 text-blue-600">
                        <AttachFileIcon sx={{ fontSize: 13 }} />
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
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-400">
            Последнее изменение: {row.updatedAt}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}
