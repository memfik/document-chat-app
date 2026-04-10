"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Box, Typography } from "@mui/material";
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
    <Box py={{ xs: 2, md: 3 }} px={{ xs: 1.5, md: 3 }} maxWidth={896} mx="auto">
      <Box mb={2.5}>
        <Typography variant="h6" fontWeight={600}>
          История заявки №{id}
        </Typography>
        <Typography variant="caption" color="text.disabled">
          {events.length} событий
        </Typography>
      </Box>

      <CommentBox value={comment} onChange={setComment} onSend={sendComment} />

      <Box>
        {groups.map((group) => (
          <Box key={group.label}>
            <Box display="flex" alignItems="center" gap={1.5} mb={2}>
              <Box sx={{ flex: 1, height: "1px", bgcolor: "divider" }} />
              <Typography variant="caption" color="text.disabled" sx={{ px: 1 }}>
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
