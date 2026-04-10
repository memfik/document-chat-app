"use client";

import { Paper, Box, Typography } from "@mui/material";
import type { AccompanimentRow } from "../data/accompaniment";

export function AccompanimentCard({ row }: { row: AccompanimentRow }) {
  return (
    <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={0.5}>
        <Typography variant="subtitle2" fontWeight={600}>{row.id}</Typography>
        <Typography variant="caption" color="text.secondary">{row.contractNum}</Typography>
      </Box>
      <Typography variant="body2" mb={0.5}>{row.supplier}</Typography>
      <Typography variant="caption" color="text.secondary">{row.initiator} · {row.dept}</Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={1.5}>
        <Typography variant="body2" fontWeight={600}>{row.cost} KZT</Typography>
        <Typography variant="caption" color="text.secondary">Поставка: {row.deliveryDate}</Typography>
      </Box>
    </Paper>
  );
}
