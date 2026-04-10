"use client";

import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, TextField, MenuItem, IconButton } from "@mui/material";
import { NewItemModal } from "./NewItemModal";

interface SelectWithAddProps {
  label: string;
  value: string;
  options: string[];
  editing: boolean;
  onChange: (v: string) => void;
  onNewItem: (v: string) => void;
  modalTitle: string;
}

export function SelectWithAdd({
  label,
  value,
  options,
  editing,
  onChange,
  onNewItem,
  modalTitle,
}: SelectWithAddProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Box display="flex" gap={1} alignItems="flex-end">
        <TextField
          select
          size="small"
          label={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={!editing}
          fullWidth
        >
          {options.map((o) => (
            <MenuItem key={o} value={o}>
              {o}
            </MenuItem>
          ))}
        </TextField>
        {editing && (
          <IconButton
            size="small"
            onClick={() => setShowModal(true)}
            title={`Создать новый: ${label}`}
            sx={{
              border: "1px solid",
              borderColor: "grey.300",
              borderRadius: 1,
              height: 40,
              width: 40,
              flexShrink: 0,
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
      {showModal && (
        <NewItemModal
          title={modalTitle}
          onClose={() => setShowModal(false)}
          onSave={(v) => {
            onNewItem(v);
            setShowModal(false);
          }}
        />
      )}
    </>
  );
}
