"use client";

import AddIcon from "@mui/icons-material/Add";
import { Paper, Box, Typography, Button } from "@mui/material";
import { SpecMobileCards } from "./SpecMobileCards";
import { SpecTable } from "./SpecTable";
import { calcTotal, formatNumber, type SpecRow } from "../data/options";

interface SpecSectionProps {
  rows: SpecRow[];
  editing: boolean;
  isMobile: boolean;
  onUpdate: (id: number, field: keyof SpecRow, value: string) => void;
  onRemove: (id: number) => void;
  onAdd: () => void;
}

export function SpecSection({ rows, editing, isMobile, onUpdate, onRemove, onAdd }: SpecSectionProps) {
  const total = calcTotal(rows);

  return (
    <Paper elevation={1}>
      <Box
        px={2.5} py={2}
        borderBottom="1px solid" sx={{ borderColor: "divider" }}
        display="flex" alignItems="center" justifyContent="space-between"
      >
        <Typography variant="subtitle2" fontWeight={600}>
          Спецификация
        </Typography>
        {editing && (
          <Button
            variant="outlined"
            color="inherit"
            size="small"
            startIcon={<AddIcon />}
            onClick={onAdd}
            sx={{ textTransform: "none", borderRadius: 2, borderColor: "grey.300", color: "text.secondary" }}
          >
            Добавить строку
          </Button>
        )}
      </Box>

      {isMobile ? (
        <SpecMobileCards rows={rows} editing={editing} onUpdate={onUpdate} onRemove={onRemove} />
      ) : (
        <SpecTable rows={rows} editing={editing} onUpdate={onUpdate} onRemove={onRemove} />
      )}

      <Box
        px={2.5} py={2}
        borderTop="1px solid" sx={{ borderColor: "divider" }}
        display="flex" justifyContent="flex-end" alignItems="center" gap={2}
      >
        <Typography variant="body2" color="text.secondary">Итого:</Typography>
        <Typography variant="subtitle1" fontWeight={600}>{formatNumber(total)} KZT</Typography>
      </Box>
    </Paper>
  );
}
