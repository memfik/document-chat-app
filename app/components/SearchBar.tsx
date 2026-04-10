"use client";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { TextField, InputAdornment, IconButton, Button, Box } from "@mui/material";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  currentYearOnly?: boolean;
  onYearToggle?: () => void;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Поиск...",
  currentYearOnly,
  onYearToggle,
}: SearchBarProps) {
  return (
    <Box display="flex" alignItems="center" gap={1.5}>
      <TextField
        size="small"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        sx={{
          flex: 1,
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#f96800",
            },
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" sx={{ color: "text.secondary" }} />
              </InputAdornment>
            ),
            endAdornment: value ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="clear search"
                  onClick={() => onChange("")}
                  edge="end"
                  size="small"
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null,
          },
        }}
      />
      {onYearToggle && (
        <Button
          variant={currentYearOnly ? "contained" : "outlined"}
          onClick={onYearToggle}
          size="medium"
          sx={{
            textTransform: "none",
            whiteSpace: "nowrap",
            borderRadius: 2,
            ...(currentYearOnly
              ? {
                  backgroundColor: "#2db351",
                  color: "text.primary",
                  boxShadow: "none",
                  "&:hover": { backgroundColor: "#208c3d", boxShadow: "none" },
                }
              : { borderColor: "grey.300", color: "text.secondary" }),
          }}
        >
          Только текущий год
        </Button>
      )}
    </Box>
  );
}
