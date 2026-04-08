"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import GestureIcon from "@mui/icons-material/Gesture";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import CommentIcon from "@mui/icons-material/Comment";
import { cn } from "@/lib/utils";

type EventType =
  | "status"
  | "file_add"
  | "file_remove"
  | "sign"
  | "member"
  | "forward"
  | "comment"
  | "system";

interface HistoryEvent {
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

const initialEvents: HistoryEvent[] = [
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

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function dayLabel(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return "Сегодня";
  if (d.toDateString() === yesterday.toDateString()) return "Вчера";
  return d.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function groupByDay(events: HistoryEvent[]) {
  const groups: { label: string; events: HistoryEvent[] }[] = [];
  for (const e of events) {
    const label = dayLabel(e.date);
    const last = groups[groups.length - 1];
    if (last && last.label === label) {
      last.events.push(e);
    } else {
      groups.push({ label, events: [e] });
    }
  }
  return groups;
}

function eventMeta(type: EventType) {
  switch (type) {
    case "status":
      return {
        icon: <SwapHorizIcon fontSize="small" />,
        bg: "bg-blue-100",
        text: "text-blue-600",
      };
    case "file_add":
      return {
        icon: <AttachFileIcon fontSize="small" />,
        bg: "bg-green-100",
        text: "text-green-600",
      };
    case "file_remove":
      return {
        icon: <DeleteOutlineIcon fontSize="small" />,
        bg: "bg-red-100",
        text: "text-red-500",
      };
    case "sign":
      return {
        icon: <GestureIcon fontSize="small" />,
        bg: "bg-emerald-100",
        text: "text-emerald-600",
      };
    case "member":
      return {
        icon: <PersonAddIcon fontSize="small" />,
        bg: "bg-purple-100",
        text: "text-purple-600",
      };
    case "forward":
      return {
        icon: <ForwardToInboxIcon fontSize="small" />,
        bg: "bg-orange-100",
        text: "text-orange-500",
      };
    case "comment":
      return {
        icon: <CommentIcon fontSize="small" />,
        bg: "bg-gray-100",
        text: "text-gray-500",
      };
    default:
      return {
        icon: <CommentIcon fontSize="small" />,
        bg: "bg-slate-100",
        text: "text-slate-500",
      };
  }
}

function EventCard({ ev }: { ev: HistoryEvent }) {
  const meta = eventMeta(ev.type);
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
            meta.bg,
            meta.text,
          )}
        >
          {meta.icon}
        </div>
        <div className="w-px flex-1 bg-gray-200 mt-1" />
      </div>
      <div className="flex-1 pb-5">
        <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-semibold text-gray-800">
              {ev.user}
            </span>
            <span className="text-xs text-gray-400">{formatDate(ev.date)}</span>
          </div>
          <p className="text-sm text-gray-600 leading-snug">{ev.text}</p>
          {ev.status && (
            <div className="mt-2 flex items-center gap-2">
              <span
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
                style={{ backgroundColor: ev.statusColor }}
              >
                {ev.status}
              </span>
              {ev.progress !== undefined && (
                <div className="flex items-center gap-1.5 flex-1">
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${ev.progress}%`,
                        backgroundColor: ev.statusColor,
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">{ev.progress}%</span>
                </div>
              )}
            </div>
          )}
          {ev.files && ev.files.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {ev.files.map((f) => (
                <a
                  key={f.name}
                  href={f.url}
                  onClick={(e) => e.preventDefault()}
                  className={cn(
                    "inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs border transition-colors",
                    ev.type === "file_remove"
                      ? "border-red-200 text-red-500 bg-red-50 hover:bg-red-100 line-through"
                      : "border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-100",
                  )}
                >
                  <AttachFileIcon sx={{ fontSize: 12 }} />
                  {f.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

let nextId = 100;

export default function HistoryPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [events, setEvents] = useState<HistoryEvent[]>(initialEvents);
  const [comment, setComment] = useState("");

  const groups = groupByDay(events);

  const sendComment = () => {
    const text = comment.trim();
    if (!text) return;
    setEvents((prev) => [
      ...prev,
      {
        id: nextId++,
        type: "comment",
        date: new Date().toISOString(),
        user: "Югай Виталий",
        text,
      },
    ]);
    setComment("");
  };

  return (
    <div className="py-6 px-6 max-w-7xl mx-auto">
      <div className="grid gap-1 mb-5">
        <h1 className="text-xl font-semibold text-gray-800">
          История заявки №{id}
        </h1>
        <p className="text-xs text-gray-400 mt-0.5">{events.length} событий</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-8">
        <p className="text-md text-gray-500 mb-2 font-bold">
          Добавить комментарий
        </p>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) sendComment();
          }}
          placeholder="Введите комментарий..."
          rows={3}
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#f96800] transition-colors resize-none"
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-400">Ctrl+Enter для отправки</span>
          <button
            onClick={sendComment}
            disabled={!comment.trim()}
            className="flex items-center gap-1.5 px-4 py-2 text-sm bg-[#f96800] text-white rounded-lg hover:bg-[#e05a00] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <SendIcon fontSize="small" />
            Отправить
          </button>
        </div>
      </div>
      <div>
        {groups.map((group) => (
          <div key={group.label}>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs font-medium text-gray-400 px-2">
                {group.label}
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {group.events.map((ev, idx) => (
              <div
                key={ev.id}
                className={cn(
                  idx === group.events.length - 1 && "last-in-group",
                )}
              >
                <EventCard ev={ev} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
