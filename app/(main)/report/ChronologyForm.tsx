"use client";

import { useState } from "react";
import { Paper, TextField, MenuItem, Button, Box, Typography, Snackbar, Alert } from "@mui/material";

const SELECT_PLACEHOLDER = "— Выберите —";

function SelectField({ label, name }: { label: string; name: string }) {
  return (
    <TextField select size="small" fullWidth label={label} name={name} defaultValue="">
      <MenuItem value=""><em>{SELECT_PLACEHOLDER}</em></MenuItem>
    </TextField>
  );
}

export default function ChronologyForm({ title, description }: { title: string; description: string }) {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [snackbar, setSnackbar] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSnackbar(true);
  };

  return (
    <Paper elevation={3} sx={{ p: 2.5, maxWidth: 768 }}>
      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>{title}</Typography>
      <Typography variant="body2" color="text.secondary" mb={2.5}>{description}</Typography>

      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={1.5}>
          <SelectField label="Инициатор" name="initiator" />
          <SelectField label="Центр затрат" name="costCenter" />
          <SelectField label="Тип закупа" name="purchaseType" />
          <SelectField label="Статья" name="article" />
          <SelectField label="БКВ2" name="bkv2" />
          <SelectField label="Проект" name="project" />
          <SelectField label="Центр / Децентр" name="centerDecentr" />
          <TextField
            size="small"
            fullWidth
            label="Начало периода"
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            size="small"
            fullWidth
            label="Конец периода"
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            inputProps={{ min: dateFrom }}
            InputLabelProps={{ shrink: true }}
          />
          <SelectField label="Статус" name="status" />
          <SelectField label="Исполнитель" name="executor" />
          <SelectField label="Точка присутствия" name="presencePoint" />
        </Box>

        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={1.5}>
          <TextField size="small" fullWidth label="Фильтр по тексту" name="textFilter" placeholder="Введите текст" />
          <TextField size="small" fullWidth label="или содержит" name="textFilterOr" placeholder="или содержит" />
        </Box>

        <Button type="submit" variant="contained" sx={{ alignSelf: "flex-start", textTransform: "none" }}>
          Сформировать
        </Button>
      </Box>

      <Snackbar open={snackbar} autoHideDuration={3000} onClose={() => setSnackbar(false)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity="success" variant="filled" onClose={() => setSnackbar(false)}>Отчёт формируется...</Alert>
      </Snackbar>
    </Paper>
  );
}
