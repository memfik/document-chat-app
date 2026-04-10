"use client";

import CloseIcon from "@mui/icons-material/Close";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import { useState } from "react";

export interface RowExtra {
  znoNum: string;
  paymentFile: File | null;
  paymentFileName: string;
}

interface EditModalProps {
  rowId: string;
  extra: RowExtra;
  onClose: () => void;
  onSave: (data: RowExtra) => void;
}

export function EditModal({ rowId, extra, onClose, onSave }: EditModalProps) {
  const [znoNum, setZnoNum] = useState(extra.znoNum);
  const [file, setFile] = useState<File | null>(extra.paymentFile);
  const [fileName, setFileName] = useState(extra.paymentFileName);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setFileName(f.name);
    }
  };

  return (
    <Dialog open onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pb: 1,
        }}
      >
        <Typography variant="subtitle1" fontWeight={600}>
          Редактирование — {rowId}
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: "text.secondary" }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} pt={1}>
          <TextField
            size="small"
            fullWidth
            label="№ ЗНО"
            placeholder="Введите номер ЗНО..."
            value={znoNum}
            onChange={(e) => setZnoNum(e.target.value)}
          />

          <Box>
            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
              Платежный документ
            </Typography>
            <Box
              component="label"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 1.5,
                border: "1px dashed",
                borderColor: "grey.400",
                borderRadius: 1,
                cursor: "pointer",
                transition: "border-color 0.2s",
                "&:hover": { borderColor: "primary.main" },
              }}
            >
              <UploadFileIcon fontSize="small" sx={{ color: "text.disabled", flexShrink: 0 }} />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
              >
                {fileName || "Нажмите для загрузки файла..."}
              </Typography>
              <input type="file" hidden onChange={handleFile} />
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          size="small"
          sx={{ textTransform: "none", borderColor: "grey.300", color: "text.secondary", borderRadius: 2 }}
        >
          Отмена
        </Button>
        <Button
          onClick={() => onSave({ znoNum, paymentFile: file, paymentFileName: fileName })}
          variant="contained"
          size="small"
          sx={{ textTransform: "none", borderRadius: 2 }}
        >
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
