"use client";

import SendIcon from "@mui/icons-material/Send";
import { Box, Typography, Paper, TextField, Button } from "@mui/material";

interface CommentBoxProps {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
}

export function CommentBox({ value, onChange, onSend }: CommentBoxProps) {
  return (
    <Paper variant="outlined" sx={{ p: 2, mb: 4, borderRadius: 2 }}>
      <Typography variant="subtitle2" color="text.secondary" mb={1}>
        Добавить комментарий
      </Typography>
      <TextField
        fullWidth
        size="small"
        multiline
        rows={3}
        placeholder="Введите комментарий..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) onSend();
        }}
      />
      <Box display="flex" alignItems="center" justifyContent="space-between" mt={1.5} gap={1}>
        <Typography
          variant="caption"
          color="text.disabled"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          Ctrl+Enter для отправки
        </Typography>
        <Button
          variant="contained"
          startIcon={<SendIcon />}
          disabled={!value.trim()}
          onClick={onSend}
          sx={{ textTransform: "none", borderRadius: 2, ml: { xs: "auto", sm: 0 } }}
        >
          Отправить
        </Button>
      </Box>
    </Paper>
  );
}
