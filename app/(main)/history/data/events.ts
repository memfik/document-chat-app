export type EventType =
  | "status"
  | "file_add"
  | "file_remove"
  | "sign"
  | "member"
  | "forward"
  | "comment"
  | "system";

export interface HistoryEvent {
  id: number;
  type: EventType;
  date: string;
  user: string;
  text: string;
  status?: string;
  statusColor?: string;
  progress?: number;
  files?: { name: string; url: string }[];
}

export const initialEvents: HistoryEvent[] = [
  {
    id: 1,
    type: "system",
    date: "2025-01-12T08:05:00",
    user: "Система",
    text: "Заявка создана и поставлена в очередь на обработку",
  },
  {
    id: 2,
    type: "member",
    date: "2025-01-12T08:10:00",
    user: "Петров А.В.",
    text: "Добавлен исполнитель: Иванов С.К.",
  },
  {
    id: 3,
    type: "status",
    date: "2025-01-12T09:00:00",
    user: "Иванов С.К.",
    text: "Статус изменён с «Новая» на «В работе»",
    status: "В работе",
    statusColor: "#3b82f6",
    progress: 20,
  },
  {
    id: 4,
    type: "file_add",
    date: "2025-01-13T11:30:00",
    user: "Иванов С.К.",
    text: "Загружены документы",
    files: [
      { name: "Спецификация.pdf", url: "#" },
      { name: "Техзадание_v1.docx", url: "#" },
    ],
  },
  {
    id: 5,
    type: "forward",
    date: "2025-01-14T14:00:00",
    user: "Иванов С.К.",
    text: "Документы переданы на согласование руководителю отдела",
  },
  {
    id: 6,
    type: "comment",
    date: "2025-01-14T15:22:00",
    user: "Морозов Д.В.",
    text: "Прошу уточнить технические требования по пунктам 3.1 и 3.4 спецификации.",
  },
  {
    id: 7,
    type: "file_remove",
    date: "2025-01-15T09:05:00",
    user: "Иванов С.К.",
    text: "Удалён файл: Техзадание_v1.docx",
    files: [{ name: "Техзадание_v1.docx", url: "#" }],
  },
  {
    id: 8,
    type: "file_add",
    date: "2025-01-15T09:12:00",
    user: "Иванов С.К.",
    text: "Загружена обновлённая версия",
    files: [{ name: "Техзадание_v2.docx", url: "#" }],
  },
  {
    id: 9,
    type: "sign",
    date: "2025-01-15T10:45:00",
    user: "Морозов Д.В.",
    text: "Документ подписан ЭЦП",
    status: "Подписано",
    statusColor: "#22c55e",
    progress: 60,
  },
  {
    id: 10,
    type: "status",
    date: "2025-01-15T11:00:00",
    user: "Система",
    text: "Статус изменён с «В работе» на «Ожидание оплаты»",
    status: "Ожидание оплаты",
    statusColor: "#f59e0b",
    progress: 80,
  },
];

export function formatDate(iso: string) {
  return new Date(iso).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function dayLabel(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return "Сегодня";
  if (d.toDateString() === yesterday.toDateString()) return "Вчера";
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

export function groupByDay(events: HistoryEvent[]): { label: string; events: HistoryEvent[] }[] {
  const groups: { label: string; events: HistoryEvent[] }[] = [];
  for (const e of events) {
    const label = dayLabel(e.date);
    const last = groups[groups.length - 1];
    if (last && last.label === label) last.events.push(e);
    else groups.push({ label, events: [e] });
  }
  return groups;
}
