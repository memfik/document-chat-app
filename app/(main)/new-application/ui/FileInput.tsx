"use client";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography, IconButton } from "@mui/material";

interface FileInputProps {
  label: string;
  file: File | null;
  onChange: (f: File | null) => void;
}

export function FileInput({ label, file, onChange }: FileInputProps) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
        {label}
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
          borderColor: "grey.300",
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
          {file ? file.name : "Нажмите для загрузки файла..."}
        </Typography>
        {file && (
          <IconButton size="small" onClick={(e) => { e.preventDefault(); onChange(null); }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
        <input type="file" hidden onChange={(e) => onChange(e.target.files?.[0] ?? null)} />
      </Box>
    </Box>
  );
}
