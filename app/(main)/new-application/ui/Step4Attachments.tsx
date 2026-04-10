"use client";

import { Box, Typography } from "@mui/material";
import { FileInput } from "./FileInput";
import type { Attachments } from "../data/options";

interface Step4Props {
  attachments: Attachments;
  onChange: (patch: Partial<Attachments>) => void;
}

export function Step4Attachments({ attachments, onChange }: Step4Props) {
  return (
    <Box>
      <Typography variant="subtitle2" color="text.primary" mb={2}>
        Вложения
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", sm: "repeat(3, 1fr)" }}
        gap={2}
      >
        <FileInput
          label="Техническая спецификация"
          file={attachments.spec}
          onChange={(f) => onChange({ spec: f })}
        />
        <FileInput
          label="Дополнительные файлы"
          file={attachments.extra}
          onChange={(f) => onChange({ extra: f })}
        />
        <FileInput
          label="Договор"
          file={attachments.contract}
          onChange={(f) => onChange({ contract: f })}
        />
      </Box>
    </Box>
  );
}
