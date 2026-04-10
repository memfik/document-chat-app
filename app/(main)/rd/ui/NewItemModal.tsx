"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

interface NewItemModalProps {
  title: string;
  onClose: () => void;
  onSave: (value: string) => void;
}

export function NewItemModal({ title, onClose, onSave }: NewItemModalProps) {
  const [value, setValue] = useState("");

  return (
    <Dialog open onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          size="small"
          placeholder="Введите название..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && value.trim()) onSave(value.trim());
            if (e.key === "Escape") onClose();
          }}
          sx={{ mt: 1 }}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          variant="outlined"
          color="inherit"
          onClick={onClose}
          sx={{ textTransform: "none", borderColor: "grey.300", color: "text.secondary", borderRadius: 2 }}
        >
          Отмена
        </Button>
        <Button
          variant="contained"
          disabled={!value.trim()}
          onClick={() => value.trim() && onSave(value.trim())}
          sx={{ textTransform: "none", bgcolor: "#f96800", borderRadius: 2, "&:hover": { bgcolor: "#e05a00" } }}
        >
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
