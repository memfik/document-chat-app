"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { alpha } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CommentIcon from "@mui/icons-material/Comment";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Chip,
  LinearProgress,
} from "@mui/material";

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
    if (last && last.label === label) last.events.push(e);
    else groups.push({ label, events: [e] });
  }
  return groups;
}

function eventMeta(_type: EventType): { icon: React.ReactNode; color: string } {
  return { icon: <CommentIcon fontSize="small" />, color: "#6b7280" };
}

function EventCard({ ev }: { ev: HistoryEvent }) {
  const meta = eventMeta(ev.type);
  return (
    <Box display="flex" gap={1.5}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: alpha(meta.color, 0.15),
            color: meta.color,
          }}
        >
          {meta.icon}
        </Box>
        <Box sx={{ width: "1px", flex: 1, bgcolor: "divider", mt: 0.5 }} />
      </Box>

      <Box flex={1} pb={2.5}>
        <Paper variant="outlined" sx={{ px: 2, py: 1.5, borderRadius: 2 }}>
          <Box
            display="flex"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            gap={0.25}
            mb={0.5}
          >
            <Typography variant="body2" fontWeight={600}>
              {ev.user}
            </Typography>
            <Typography variant="caption" color="text.disabled">
              {formatDate(ev.date)}
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" lineHeight={1.5}>
            {ev.text}
          </Typography>

          {ev.status && (
            <Box display="flex" alignItems="center" gap={1.5} mt={1}>
              <Chip
                label={ev.status}
                size="small"
                sx={{
                  bgcolor: ev.statusColor,
                  color: "#fff",
                  fontWeight: 500,
                  fontSize: 11,
                }}
              />
              {ev.progress !== undefined && (
                <Box display="flex" alignItems="center" gap={1} flex={1}>
                  <LinearProgress
                    variant="determinate"
                    value={ev.progress}
                    sx={{
                      flex: 1,
                      height: 6,
                      borderRadius: 3,
                      bgcolor: alpha(ev.statusColor!, 0.15),
                      "& .MuiLinearProgress-bar": {
                        bgcolor: ev.statusColor,
                        borderRadius: 3,
                      },
                    }}
                  />
                  <Typography variant="caption" color="text.disabled">
                    {ev.progress}%
                  </Typography>
                </Box>
              )}
            </Box>
          )}

          {ev.files && ev.files.length > 0 && (
            <Box display="flex" flexWrap="wrap" gap={0.75} mt={1}>
              {ev.files.map((f) => (
                <Chip
                  key={f.name}
                  icon={<AttachFileIcon sx={{ fontSize: "12px !important" }} />}
                  label={f.name}
                  size="small"
                  component="a"
                  href={f.url}
                  onClick={(e) => e.preventDefault()}
                  clickable
                  sx={
                    ev.type === "file_remove"
                      ? {
                          bgcolor: alpha("#ef4444", 0.1),
                          color: "#ef4444",
                          borderColor: alpha("#ef4444", 0.3),
                          border: "1px solid",
                          textDecoration: "line-through",
                        }
                      : {
                          bgcolor: alpha("#3b82f6", 0.08),
                          color: "#3b82f6",
                          borderColor: alpha("#3b82f6", 0.3),
                          border: "1px solid",
                        }
                  }
                />
              ))}
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
}

let nextId = 100;

export default function HistoryPage() {
  const { id } = useParams<{ id: string }>();
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
    <Box py={{ xs: 2, md: 3 }} px={{ xs: 1.5, md: 3 }} maxWidth={896} mx="auto">
      <Box mb={2.5}>
        <Typography variant="h6" fontWeight={600}>
          История заявки №{id}
        </Typography>
        <Typography variant="caption" color="text.disabled">
          {events.length} событий
        </Typography>
      </Box>

      <Paper variant="outlined" sx={{ p: 2, mb: 4, borderRadius: 2 }}>
        <Typography variant="subtitle2" color="text.secondary" mb={1}>
          Добавить комментарий
        </Typography>
        <TextField
          fullWidth
          size="small"
          multiline
          rows={3}
          placeholder="Введите комментарий..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) sendComment();
          }}
        />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mt={1.5}
          gap={1}
        >
          <Typography variant="caption" color="text.disabled" sx={{ display: { xs: "none", sm: "block" } }}>
            Ctrl+Enter для отправки
          </Typography>
          <Button
            variant="contained"
            startIcon={<SendIcon />}
            disabled={!comment.trim()}
            onClick={sendComment}
            sx={{ textTransform: "none", borderRadius: 2, ml: { xs: "auto", sm: 0 } }}
          >
            Отправить
          </Button>
        </Box>
      </Paper>

      <Box>
        {groups.map((group) => (
          <Box key={group.label}>
            <Box display="flex" alignItems="center" gap={1.5} mb={2}>
              <Box sx={{ flex: 1, height: "1px", bgcolor: "divider" }} />
              <Typography
                variant="caption"
                color="text.disabled"
                sx={{ px: 1 }}
              >
                {group.label}
              </Typography>
              <Box sx={{ flex: 1, height: "1px", bgcolor: "divider" }} />
            </Box>

            {group.events.map((ev) => (
              <EventCard key={ev.id} ev={ev} />
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
