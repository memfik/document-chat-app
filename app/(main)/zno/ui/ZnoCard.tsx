"use client";

import { Paper, Box, Typography } from "@mui/material";
import type { ZnoRow, ZNO_STATUS_FILTERS } from "../data/zno";

type StatusFilter = (typeof ZNO_STATUS_FILTERS)[number];

interface ZnoCardProps {
  row: ZnoRow;
  status: StatusFilter | undefined;
}

export function ZnoCard({ row, status }: ZnoCardProps) {
  return (
    <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
        <Typography variant="subtitle2" fontWeight={600}>{row.id}</Typography>
        <Box display="flex" alignItems="center" gap={0.5}>
          <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: status?.color, flexShrink: 0 }} />
          <Typography variant="caption" sx={{ color: status?.color, fontWeight: 500 }}>
            {status?.label}
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2" mb={0.5}>{row.counterparty}</Typography>
      <Typography variant="caption" color="text.secondary">{row.initiator} · {row.type}</Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={1.5}>
        <Typography variant="body2" fontWeight={600}>{row.amount} {row.currency}</Typography>
        <Typography variant="caption" color="text.secondary">до {row.payBefore}</Typography>
      </Box>
    </Paper>
  );
}
