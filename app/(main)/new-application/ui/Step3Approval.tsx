"use client";

import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import { APPROVERS, ED_GO_LIST } from "../data/options";

interface Step3Props {
  approvers: string[];
  onApproversChange: (v: string[]) => void;
}

export function Step3Approval({ approvers, onApproversChange }: Step3Props) {
  const handleChange = (value: string | string[]) =>
    onApproversChange(typeof value === "string" ? value.split(",") : value);

  const multiSelect = (
    <Select
      multiple
      displayEmpty
      value={approvers}
      onChange={(e) => handleChange(e.target.value)}
      input={<OutlinedInput notched={false} />}
      renderValue={(selected) =>
        selected.length === 0 ? (
          <Typography variant="body2" color="text.disabled">
            Выберите согласующих...
          </Typography>
        ) : (
          <Typography variant="body2">{selected.join(", ")}</Typography>
        )
      }
      size="small"
      fullWidth
    >
      {APPROVERS.map((a) => (
        <MenuItem key={a} value={a}>
          <Checkbox checked={approvers.includes(a)} size="small" />
          <ListItemText primary={a} />
        </MenuItem>
      ))}
    </Select>
  );

  return (
    <Box>
      <Typography variant="subtitle2" color="text.primary" mb={2}>
        Согласование
      </Typography>

      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
        gap={2}
        mb={3}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <Box>
            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
              Согласующий
            </Typography>
            <TextField size="small" fullWidth value="ГО-ДЦиРС" disabled />
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
              Согласующий
            </Typography>
            {multiSelect}
          </Box>
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
            Кураторы статей
          </Typography>
          {multiSelect}
        </Box>
      </Box>

      <Box>
        <Typography
          variant="caption"
          fontWeight={600}
          color="text.secondary"
          textTransform="uppercase"
          letterSpacing={0.5}
          display="block"
          mb={1}
        >
          ЭД ГО
        </Typography>
        <Box display="flex" flexDirection="column" gap={0.5}>
          {ED_GO_LIST.map((person, i) => (
            <Typography key={i} variant="body2" color="text.primary">
              <b>Согласующий {i + 1}</b> — {person}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
