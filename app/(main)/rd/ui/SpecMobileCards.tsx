"use client";

import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Paper, Typography, TextField, IconButton } from "@mui/material";
import { calcRowSum, formatNumber, type SpecRow } from "../data/options";

interface SpecMobileCardsProps {
  rows: SpecRow[];
  editing: boolean;
  onUpdate: (id: number, field: keyof SpecRow, value: string) => void;
  onRemove: (id: number) => void;
}

export function SpecMobileCards({ rows, editing, onUpdate, onRemove }: SpecMobileCardsProps) {
  if (rows.length === 0) {
    return (
      <Typography variant="body2" color="text.disabled" textAlign="center" py={3}>
        Нет строк спецификации
      </Typography>
    );
  }

  return (
    <Box px={2} py={1.5} display="flex" flexDirection="column" gap={1.5}>
      {rows.map((row, idx) => {
        const sum = calcRowSum(row);
        return (
          <Paper key={row.id} variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="caption" color="text.secondary" fontWeight={500}>
                № {idx + 1}
              </Typography>
              {editing && (
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => onRemove(row.id)}
                  sx={{ border: "1px solid", borderColor: "error.light", borderRadius: 1.5 }}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
              )}
            </Box>

            {editing ? (
              <TextField
                size="small" fullWidth placeholder="Введите описание..."
                value={row.description}
                onChange={(e) => onUpdate(row.id, "description", e.target.value)}
                sx={{ mb: 1.5 }}
              />
            ) : (
              <Typography variant="body2" fontWeight={500} mb={1.5}>
                {row.description || "—"}
              </Typography>
            )}

            <Box display="grid" gridTemplateColumns="1fr 1fr" gap={1}>
              {editing ? (
                <>
                  <TextField
                    size="small" fullWidth type="number" label="Кол-во"
                    slotProps={{ htmlInput: { min: 0 } }}
                    value={row.qty}
                    onChange={(e) => onUpdate(row.id, "qty", e.target.value)}
                  />
                  <TextField
                    size="small" fullWidth type="number" label="Цена за ед."
                    slotProps={{ htmlInput: { min: 0 } }}
                    value={row.price}
                    onChange={(e) => onUpdate(row.id, "price", e.target.value)}
                  />
                </>
              ) : (
                <>
                  <Box>
                    <Typography variant="caption" color="text.secondary">Кол-во</Typography>
                    <Typography variant="body2">{row.qty || "—"}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">Цена за ед.</Typography>
                    <Typography variant="body2">
                      {row.price ? formatNumber(parseFloat(row.price)) : "—"}
                    </Typography>
                  </Box>
                </>
              )}
            </Box>

            <Box
              display="flex" justifyContent="flex-end" alignItems="center"
              mt={1.5} pt={1.5} borderTop="1px solid" sx={{ borderColor: "divider" }}
            >
              <Typography variant="caption" color="text.secondary" mr={1}>Сумма:</Typography>
              <Typography variant="body2" fontWeight={700} color={sum > 0 ? "text.primary" : "text.disabled"}>
                {sum > 0 ? formatNumber(sum) : "—"}
              </Typography>
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
}
