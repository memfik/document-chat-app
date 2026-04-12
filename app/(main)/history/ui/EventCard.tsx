"use client";

import { Paperclip, MessageSquare } from "lucide-react";
import { formatDate, type HistoryEvent, type EventType } from "../data/events";

function eventMeta(_type: EventType): { icon: React.ReactNode; color: string } {
  return { icon: <MessageSquare className="size-4" />, color: "#6b7280" };
}

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function EventCard({ ev }: { ev: HistoryEvent }) {
  const meta = eventMeta(ev.type);

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div
          className="size-8 rounded-full shrink-0 flex items-center justify-center"
          style={{
            backgroundColor: hexToRgba(meta.color, 0.15),
            color: meta.color,
          }}
        >
          {meta.icon}
        </div>
        <div className="w-px flex-1 bg-border mt-1" />
      </div>

      <div className="flex-1 pb-6">
        <div className="border border-border rounded-lg px-4 py-3 bg-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5 mb-1.5">
            <p className="text-sm font-semibold">{ev.user}</p>
            <p className="text-xs text-muted-foreground">{formatDate(ev.date)}</p>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {ev.text}
          </p>

          {ev.status && (
            <div className="flex items-center gap-3 mt-2">
              <span
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white"
                style={{ backgroundColor: ev.statusColor }}
              >
                {ev.status}
              </span>
              {ev.progress !== undefined && ev.statusColor && (
                <div className="flex items-center gap-2 flex-1">
                  <div
                    className="flex-1 h-1.5 rounded-full overflow-hidden"
                    style={{
                      backgroundColor: hexToRgba(ev.statusColor, 0.15),
                    }}
                  >
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${ev.progress}%`,
                        backgroundColor: ev.statusColor,
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {ev.progress}%
                  </p>
                </div>
              )}
            </div>
          )}

          {ev.files && ev.files.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {ev.files.map((f) => (
                <a
                  key={f.name}
                  href={f.url}
                  onClick={(e) => e.preventDefault()}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${
                    ev.type === "file_remove"
                      ? "line-through text-red-500 border-red-300 bg-red-50"
                      : "text-blue-500 border-blue-300 bg-blue-50"
                  }`}
                >
                  <Paperclip className="size-3" />
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
