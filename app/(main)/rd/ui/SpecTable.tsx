"use client";

import RemoveIcon from "@mui/icons-material/Remove";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { calcRowSum, formatNumber, type SpecRow } from "../data/options";

interface SpecTableProps {
  rows: SpecRow[];
  editing: boolean;
  onUpdate: (id: number, field: keyof SpecRow, value: string) => void;
  onRemove: (id: number) => void;
}

export function SpecTable({ rows, editing, onUpdate, onRemove }: SpecTableProps) {
  return (
    <TableContainer>
      <Table size="small" sx={{ minWidth: 640 }}>
        <TableHead sx={{ backgroundColor: "action.hover" }}>
          <TableRow>
            <TableCell width={48}><b>№</b></TableCell>
            <TableCell><b>Описание товара / услуги</b></TableCell>
            <TableCell width={120}><b>Количество</b></TableCell>
            <TableCell width={150}><b>Цена за ед.</b></TableCell>
            <TableCell width={150}><b>Сумма</b></TableCell>
            {editing && <TableCell width={56} />}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={editing ? 6 : 5} align="center" sx={{ py: 4 }}>
                <Typography variant="body2" color="text.disabled">Нет строк спецификации</Typography>
              </TableCell>
            </TableRow>
          )}
          {rows.map((row, idx) => (
            <TableRow key={row.id} hover>
              <TableCell>
                <Typography variant="body2" color="text.secondary">{idx + 1}</Typography>
              </TableCell>
              <TableCell>
                {editing ? (
                  <TextField size="small" fullWidth placeholder="Введите описание..."
                    value={row.description} onChange={(e) => onUpdate(row.id, "description", e.target.value)} />
                ) : (
                  <Typography variant="body2">{row.description || "—"}</Typography>
                )}
              </TableCell>
              <TableCell>
                {editing ? (
                  <TextField size="small" fullWidth type="number"
                    slotProps={{ htmlInput: { min: 0, style: { textAlign: "right" } } }}
                    placeholder="0" value={row.qty} onChange={(e) => onUpdate(row.id, "qty", e.target.value)} />
                ) : (
                  <Typography variant="body2">{row.qty || "—"}</Typography>
                )}
              </TableCell>
              <TableCell>
                {editing ? (
                  <TextField size="small" fullWidth type="number"
                    slotProps={{ htmlInput: { min: 0, style: { textAlign: "right" } } }}
                    placeholder="0" value={row.price} onChange={(e) => onUpdate(row.id, "price", e.target.value)} />
                ) : (
                  <Typography variant="body2">
                    {row.price ? formatNumber(parseFloat(row.price)) : "—"}
                  </Typography>
                )}
              </TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight={500}>
                  {calcRowSum(row) > 0 ? formatNumber(calcRowSum(row)) : "—"}
                </Typography>
              </TableCell>
              {editing && (
                <TableCell>
                  <IconButton size="small" color="error" onClick={() => onRemove(row.id)}
                    title="Удалить строку" sx={{ border: "1px solid", borderColor: "error.light" }}>
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
