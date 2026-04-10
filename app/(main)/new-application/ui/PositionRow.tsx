"use client";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, Typography, Button, TextField, MenuItem } from "@mui/material";
import {
  REQUEST_TYPES,
  COST_CENTERS,
  CURATORS,
  PROJECTS,
  ARTICLES,
  LOCATIONS,
  type Position,
} from "../data/options";

interface PositionRowProps {
  pos: Position;
  index: number;
  errors: Set<string>;
  onChange: (id: number, field: keyof Position, value: string) => void;
  onClear: (id: number) => void;
  onRemove: (id: number) => void;
  canRemove: boolean;
  priceWithVatValue: string;
}

export function PositionRow({
  pos,
  index,
  errors,
  onChange,
  onClear,
  onRemove,
  canRemove,
  priceWithVatValue,
}: PositionRowProps) {
  const set =
    (f: keyof Position) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(pos.id, f, e.target.value);

  const err = (field: string) => errors.has(`${pos.id}.${field}`);

  return (
    <Box sx={{ border: "1px solid", borderColor: "grey.200", borderRadius: 2, p: 2 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography
          variant="caption"
          fontWeight={600}
          color="text.secondary"
          textTransform="uppercase"
          letterSpacing={0.5}
        >
          Позиция #{index + 1}
        </Typography>
        <Box display="flex" gap={1}>
          <Button
            size="small"
            variant="text"
            color="inherit"
            onClick={() => onClear(pos.id)}
            sx={{ fontSize: 12, color: "text.disabled", borderRadius: 2, textDecoration: "underline", minWidth: "auto" }}
          >
            Очистить
          </Button>
          {canRemove && (
            <Button
              size="small"
              variant="text"
              color="error"
              startIcon={<DeleteOutlineIcon fontSize="small" />}
              onClick={() => onRemove(pos.id)}
              sx={{ fontSize: 12, minWidth: "auto", borderRadius: 2 }}
            >
              Удалить
            </Button>
          )}
        </Box>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
        gap={1.5}
      >
        <TextField select size="small" label="Тип заявки" required fullWidth value={pos.requestType} onChange={set("requestType")}>
          {REQUEST_TYPES.map((o) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
        </TextField>

        <TextField
          size="small" label="Товар / Услуга" required fullWidth
          placeholder="Введите наименование..."
          value={pos.product} onChange={set("product")}
          error={err("product")} helperText={err("product") ? "Обязательное поле" : ""}
          sx={{ gridColumn: { xs: "span 1", sm: "span 2" } }}
        />

        <TextField
          size="small" label="Количество" required fullWidth type="number"
          inputProps={{ min: 1 }} placeholder="0"
          value={pos.qty} onChange={set("qty")}
          error={err("qty")} helperText={err("qty") ? "Обязательное поле" : ""}
        />

        <TextField
          size="small" label="Место поставки" required fullWidth placeholder="Адрес..."
          value={pos.deliveryPlace} onChange={set("deliveryPlace")}
          error={err("deliveryPlace")} helperText={err("deliveryPlace") ? "Обязательное поле" : ""}
        />

        <TextField
          size="small" label="Дата начала" required fullWidth type="date"
          value={pos.dateFrom} onChange={set("dateFrom")}
          error={err("dateFrom")} helperText={err("dateFrom") ? "Обязательное поле" : ""}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          size="small" label="Дата окончания" required fullWidth type="date"
          value={pos.dateTo} inputProps={{ min: pos.dateFrom }} onChange={set("dateTo")}
          error={err("dateTo")} helperText={err("dateTo") ? "Обязательное поле" : ""}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          size="small" label="Стоимость без НДС" required fullWidth type="number"
          inputProps={{ min: 0 }} placeholder="0"
          value={pos.priceNoVat} onChange={set("priceNoVat")}
          error={err("priceNoVat")} helperText={err("priceNoVat") ? "Обязательное поле" : ""}
        />

        <TextField size="small" label="Стоимость с НДС (12%)" fullWidth value={priceWithVatValue} disabled />

        <TextField select size="small" label="Центр затрат" required fullWidth value={pos.costCenter} onChange={set("costCenter")}>
          {COST_CENTERS.map((o) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
        </TextField>

        <TextField select size="small" label="Куратор" required fullWidth value={pos.curator} onChange={set("curator")}>
          {CURATORS.map((o) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
        </TextField>

        <TextField select size="small" label="Проект" fullWidth value={pos.project} onChange={set("project")}>
          {PROJECTS.map((o) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
        </TextField>

        <TextField select size="small" label="Статья" required fullWidth value={pos.article} onChange={set("article")}>
          {ARTICLES.map((o) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
        </TextField>

        <TextField select size="small" label="Точка присутствия" fullWidth value={pos.location} onChange={set("location")}>
          {LOCATIONS.map((o) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
        </TextField>
      </Box>
    </Box>
  );
}
