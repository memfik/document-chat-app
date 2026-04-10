"use client";

import { useState } from "react";
import {
  Paper,
  TextField,
  MenuItem,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

function SelectField({
  label,
  name,
  defaultValue = "",
}: {
  label: string;
  name: string;
  defaultValue?: string;
}) {
  return (
    <TextField
      select
      size="small"
      fullWidth
      label={label}
      name={name}
      defaultValue={defaultValue}
    >
      {defaultValue && defaultValue !== "--все--" && defaultValue !== "" && (
        <MenuItem value={defaultValue}>{defaultValue}</MenuItem>
      )}
      <MenuItem value="--все--">--все--</MenuItem>
    </TextField>
  );
}

export default function ISSKForm({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const [dateFrom, setDateFrom] = useState("01-04-2026");
  const [dateTo, setDateTo] = useState("08-04-2026");
  const [snackbar, setSnackbar] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSnackbar(true);
  };

  return (
    <Paper elevation={3} sx={{ p: 2.5, maxWidth: 768 }}>
      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2.5}>
        {description}
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={1.5}>
          <SelectField
            label="Инициатор"
            name="initiator"
            defaultValue="ГО-ДЭ"
          />
          <SelectField
            label="Центр затрат"
            name="costCenter"
            defaultValue="--все--"
          />
          <SelectField label="Куратор" name="curator" defaultValue="--все--" />
          <SelectField
            label="Тип закупа"
            name="purchaseType"
            defaultValue="--все--"
          />
        </Box>

        <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} gap={1.5}>
          <SelectField label="Статья" name="article" defaultValue="--все--" />
          <SelectField label="БКВ2" name="bkv2" defaultValue="--все--" />
          <SelectField label="Проект" name="project" defaultValue="--все--" />
        </Box>

        <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} gap={1.5}>
          <SelectField
            label="Подпроект"
            name="subproject"
            defaultValue="--все--"
          />
          <TextField
            size="small"
            fullWidth
            label="Начало периода"
            name="dateFrom"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
          <TextField
            size="small"
            fullWidth
            label="Конец периода"
            name="dateTo"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
        </Box>

        <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} gap={1.5}>
          <SelectField
            label="Центр / Децентр"
            name="centerDecentr"
            defaultValue="--все--"
          />
          <SelectField
            label="Статус"
            name="status"
            defaultValue="Все с утвержденной Ф16"
          />
          <TextField
            size="small"
            fullWidth
            label="Фильтр по тексту"
            name="textFilter"
          />
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          gap={1}
          sx={{ maxWidth: { xs: "100%", sm: 220 } }}
        >
          <TextField
            select
            size="small"
            fullWidth
            label="Точка присутствия из списка"
            name="presencePoint"
            defaultValue=""
          >
            <MenuItem value="">
              <em>— Выберите —</em>
            </MenuItem>
          </TextField>
          <Typography variant="caption" color="text.secondary">
            или содержит
          </Typography>
          <TextField
            size="small"
            fullWidth
            label="Текст"
            name="presencePointText"
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          sx={{
            alignSelf: { xs: "stretch", sm: "flex-start" },
            textTransform: "none",
            borderRadius: 2,
          }}
        >
          Сформировать
        </Button>
      </Box>

      <Snackbar
        open={snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSnackbar(false)}
        >
          Отчёт формируется...
        </Alert>
      </Snackbar>
    </Paper>
  );
}
