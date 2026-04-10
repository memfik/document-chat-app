"use client";

import { Box, Button } from "@mui/material";

export interface StatusFilterOption {
  key: string;
  label: string;
  color: string;
}

interface StatusFilterBarProps {
  filters: StatusFilterOption[];
  activeKey: string;
  onSelect: (key: string) => void;
  counts: Record<string, number>;
}

export function StatusFilterBar({ filters, activeKey, onSelect, counts }: StatusFilterBarProps) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        overflowX: "auto",
        flexWrap: { xs: "nowrap", md: "wrap" },
        pb: { xs: 0.5, md: 0 },
        "&::-webkit-scrollbar": { display: "none" },
        scrollbarWidth: "none",
      }}
    >
      {filters.map((f) => {
        const active = activeKey === f.key;
        return (
          <Button
            key={f.key}
            onClick={() => onSelect(f.key)}
            size="small"
            startIcon={
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: f.color,
                  flexShrink: 0,
                  display: "inline-block",
                }}
              />
            }
            sx={{
              textTransform: "none",
              borderRadius: 2,
              border: "1px solid",
              borderColor: active ? f.color : "transparent",
              backgroundColor: "transparent",
              color: active ? "text.primary" : "text.secondary",
              fontWeight: active ? 600 : 400,
              px: 2,
              flexShrink: 0,
            }}
          >
            {f.label}
            <Box
              component="span"
              sx={{ ml: 1, fontWeight: 600, fontSize: "0.75rem", color: "text.disabled" }}
            >
              {counts[f.key] ?? 0}
            </Box>
          </Button>
        );
      })}
    </Box>
  );
}
