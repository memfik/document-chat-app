"use client";

import { Box, Typography, TextField } from "@mui/material";

interface Step1Props {
  title: string;
  purpose: string;
  benefits: string;
  losses: string;
  errors: Set<string>;
  onTitle: (v: string) => void;
  onPurpose: (v: string) => void;
  onBenefits: (v: string) => void;
  onLosses: (v: string) => void;
}

export function Step1Justification({
  title,
  purpose,
  benefits,
  losses,
  errors,
  onTitle,
  onPurpose,
  onBenefits,
  onLosses,
}: Step1Props) {
  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Box>
        <Typography variant="subtitle2" color="text.primary" mb={1.5}>
          Название заявки
        </Typography>
        <TextField
          size="small"
          label="Название заявки"
          required
          fullWidth
          placeholder="Введите название заявки..."
          value={title}
          onChange={(e) => onTitle(e.target.value)}
          error={errors.has("title")}
          helperText={errors.has("title") ? "Обязательное поле" : ""}
        />
      </Box>

      <Box sx={{ borderTop: "1px solid", borderColor: "grey.100", pt: 3 }}>
        <Typography variant="subtitle2" color="text.primary" mb={2}>
          Обоснование закупа
        </Typography>
        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", md: "repeat(3, 1fr)" }}
          gap={2}
        >
          <TextField
            size="small"
            label="Назначение закупа"
            required
            fullWidth
            multiline
            rows={3}
            placeholder="Опишите назначение..."
            value={purpose}
            onChange={(e) => onPurpose(e.target.value)}
            error={errors.has("purpose")}
            helperText={errors.has("purpose") ? "Обязательное поле" : ""}
          />
          <TextField
            size="small"
            label="Выгоды от закупа"
            fullWidth
            multiline
            rows={3}
            placeholder="Опишите выгоды..."
            value={benefits}
            onChange={(e) => onBenefits(e.target.value)}
          />
          <TextField
            size="small"
            label="Убытки при непроведении"
            fullWidth
            multiline
            rows={3}
            placeholder="Опишите возможные убытки..."
            value={losses}
            onChange={(e) => onLosses(e.target.value)}
          />
        </Box>
      </Box>
    </Box>
  );
}
