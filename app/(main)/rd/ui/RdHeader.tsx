"use client";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography, Button, IconButton } from "@mui/material";

interface RdHeaderProps {
  editing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export function RdHeader({ editing, onEdit, onSave, onCancel }: RdHeaderProps) {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
      <Typography variant="h6" fontWeight={600}>
        Рамочный договор
      </Typography>
      <Box display="flex" gap={1}>
        {editing ? (
          <>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={onSave}
              sx={{
                bgcolor: "#f96800", borderRadius: 2, textTransform: "none",
                "&:hover": { bgcolor: "#e05a00" },
                display: { xs: "none", sm: "inline-flex" },
              }}
            >
              Сохранить
            </Button>
            <IconButton
              onClick={onSave}
              sx={{
                display: { xs: "flex", sm: "none" },
                bgcolor: "#f96800", color: "#fff", borderRadius: 2,
                "&:hover": { bgcolor: "#e05a00" },
              }}
            >
              <SaveIcon fontSize="small" />
            </IconButton>
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<CloseIcon />}
              onClick={onCancel}
              sx={{
                textTransform: "none", borderRadius: 2,
                borderColor: "grey.300", color: "text.secondary",
                display: { xs: "none", sm: "inline-flex" },
              }}
            >
              Отмена
            </Button>
            <IconButton
              onClick={onCancel}
              sx={{
                display: { xs: "flex", sm: "none" },
                border: "1px solid", borderColor: "grey.300",
                borderRadius: 2, color: "text.secondary",
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        ) : (
          <>
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<EditIcon />}
              onClick={onEdit}
              sx={{
                textTransform: "none", borderRadius: 2,
                borderColor: "grey.300", color: "text.secondary",
                display: { xs: "none", sm: "inline-flex" },
              }}
            >
              Редактировать
            </Button>
            <IconButton
              onClick={onEdit}
              sx={{
                display: { xs: "flex", sm: "none" },
                border: "1px solid", borderColor: "grey.300",
                borderRadius: 2, color: "text.secondary",
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </>
        )}
      </Box>
    </Box>
  );
}
