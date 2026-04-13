"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { initialEvents, groupByDay, type HistoryEvent } from "../data/events";
import { EventCard } from "../ui/EventCard";
import { CommentBox } from "../ui/CommentBox";

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
    <div className="py-6 px-4 md:px-6 max-w-5xl mx-auto">
      <div className="mb-5">
        <h1 className="text-lg font-semibold">История заявки №{id}</h1>
        <p className="text-xs text-muted-foreground">{events.length} событий</p>
      </div>

      <CommentBox value={comment} onChange={setComment} onSend={sendComment} />

      <div>
        {groups.map((group) => (
          <div key={group.label}>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-border" />
              <p className="text-xs text-muted-foreground px-2">
                {group.label}
              </p>
              <div className="flex-1 h-px bg-border" />
            </div>
            {group.events.map((ev) => (
              <EventCard key={ev.id} ev={ev} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
