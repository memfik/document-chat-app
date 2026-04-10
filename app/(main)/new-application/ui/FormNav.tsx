"use client";

import { Box, Button, Typography } from "@mui/material";
import { STEPS } from "../data/options";

interface FormNavProps {
  activeStep: number;
  errorsCount: number;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const orangeBtn = {
  bgcolor: "#f96800",
  borderRadius: 2,
  "&:hover": { bgcolor: "#e05a00" },
  textTransform: "none",
} as const;

export function FormNav({ activeStep, errorsCount, onBack, onNext, onSubmit }: FormNavProps) {
  return (
    <>
      {errorsCount > 0 && (
        <Typography variant="body2" color="error" mt={2} textAlign="right">
          Заполните все обязательные поля ({errorsCount} ошибок)
        </Typography>
      )}
      <Box
        display="flex"
        justifyContent="space-between"
        mt={3}
        pt={2}
        sx={{ borderTop: "1px solid", borderColor: "grey.100" }}
      >
        <Button
          variant="outlined"
          color="inherit"
          onClick={onBack}
          sx={{ textTransform: "none", borderColor: "grey.300", borderRadius: 2, color: "text.secondary" }}
        >
          {activeStep === 0 ? "Отмена" : "Назад"}
        </Button>

        {activeStep < STEPS.length - 1 ? (
          <Button variant="contained" onClick={onNext} sx={orangeBtn}>
            Далее
          </Button>
        ) : (
          <Button variant="contained" onClick={onSubmit} sx={orangeBtn}>
            Отправить
          </Button>
        )}
      </Box>
    </>
  );
}
