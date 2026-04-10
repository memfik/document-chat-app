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

export default function BudgetNonExecutionForm({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const [snackbar, setSnackbar] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSnackbar(true);
  };

  return (
    <Paper elevation={2} sx={{ p: 2.5, maxWidth: 640 }}>
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
        <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} gap={1.5}>
          <TextField
            select
            size="small"
            fullWidth
            label="Проект"
            name="project"
            defaultValue=""
          >
            <MenuItem value="">
              <em>— Выберите —</em>
            </MenuItem>
          </TextField>
          <TextField
            select
            size="small"
            fullWidth
            label="Статья"
            name="article"
            defaultValue=""
          >
            <MenuItem value="">
              <em>— Выберите —</em>
            </MenuItem>
          </TextField>
          <TextField
            select
            size="small"
            fullWidth
            label="Центр затрат"
            name="costCenter"
            defaultValue=""
          >
            <MenuItem value="">
              <em>— Выберите —</em>
            </MenuItem>
          </TextField>
          <TextField
            select
            size="small"
            fullWidth
            label="Статус позиций бюджета"
            name="budgetPositionStatus"
            defaultValue=""
          >
            <MenuItem value="">
              <em>— Выберите —</em>
            </MenuItem>
          </TextField>
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
