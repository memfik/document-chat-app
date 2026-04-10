"use client";

import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";
import { Paper, Box, Typography, IconButton } from "@mui/material";
import type { ApplicationRow, StatusFilter } from "../data/applications";

interface ApplicationCardProps {
  row: ApplicationRow;
  status: StatusFilter | undefined;
  onSelect: () => void;
  onEdit: () => void;
  onHistory: () => void;
}

export function ApplicationCard({ row, status, onSelect, onEdit, onHistory }: ApplicationCardProps) {
  return (
    <Paper
      elevation={1}
      onClick={onSelect}
      sx={{ p: 2, borderRadius: 2, cursor: "pointer" }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
        <Typography variant="subtitle2" fontWeight={600}>
          {row.id}
        </Typography>
        <Box display="flex" alignItems="center" gap={0.5}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: status?.color,
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          <Typography variant="caption" sx={{ color: status?.color, fontWeight: 500 }}>
            {status?.label}
          </Typography>
        </Box>
      </Box>

      <Typography variant="body2" mb={0.5}>
        {row.description}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {row.initiator} · {row.date}
      </Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center" mt={1.5}>
        <Typography variant="body2" fontWeight={600}>
          {row.cost} {row.currency}
        </Typography>
        <Box display="flex" gap={0.5}>
          <IconButton
            size="small"
            onClick={(e) => { e.stopPropagation(); onEdit(); }}
            sx={{ border: "1px solid", borderColor: "grey.300", borderRadius: 1.5 }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={(e) => { e.stopPropagation(); onHistory(); }}
            sx={{ border: "1px solid", borderColor: "grey.300", borderRadius: 1.5 }}
          >
            <HistoryIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
}
