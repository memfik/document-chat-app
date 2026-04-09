"use client";

import { useState } from "react";
import {
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

export default function F16ApprovalForm({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [snackbar, setSnackbar] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSnackbar(true);
  };

  return (
    <Paper elevation={3} sx={{ p: 2.5, maxWidth: 512 }}>
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
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={1.5}>
          <TextField
            size="small"
            fullWidth
            label="Дата начала"
            type="date"
            required
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            size="small"
            fullWidth
            label="Дата окончания"
            type="date"
            required
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            inputProps={{ min: dateFrom }}
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          sx={{
            alignSelf: "flex-start",
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
