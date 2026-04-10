"use client";

import AddIcon from "@mui/icons-material/Add";
import { Box, Typography, Button } from "@mui/material";
import { PositionRow } from "./PositionRow";
import { priceWithVat, fmt, type Position } from "../data/options";

interface Step2Props {
  positions: Position[];
  errors: Set<string>;
  onUpdate: (id: number, field: keyof Position, value: string) => void;
  onClear: (id: number) => void;
  onRemove: (id: number) => void;
  onAdd: () => void;
}

export function Step2Positions({ positions, errors, onUpdate, onClear, onRemove, onAdd }: Step2Props) {
  const totalWithVat = positions.reduce((acc, p) => acc + priceWithVat(p), 0);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="subtitle2" color="text.primary">
        Позиции заявки
      </Typography>

      {positions.map((pos, idx) => (
        <PositionRow
          key={pos.id}
          pos={pos}
          index={idx}
          errors={errors}
          onChange={onUpdate}
          onClear={onClear}
          onRemove={onRemove}
          canRemove={positions.length > 1}
          priceWithVatValue={pos.priceNoVat ? fmt(priceWithVat(pos)) : "—"}
        />
      ))}

      <Button
        variant="outlined"
        color="inherit"
        startIcon={<AddIcon />}
        onClick={onAdd}
        sx={{
          alignSelf: "flex-start",
          textTransform: "none",
          borderStyle: "dashed",
          borderColor: "grey.300",
          borderRadius: 2,
          color: "text.secondary",
          "&:hover": { borderColor: "#f96800", color: "#f96800" },
        }}
      >
        Добавить позицию
      </Button>

      <Box
        display="flex"
        justifyContent="flex-end"
        pt={1}
        sx={{ borderTop: "1px solid", borderColor: "grey.100" }}
      >
        <Box display="flex" alignItems="center" gap={4}>
          <Typography variant="body2" color="text.secondary">
            Позиций: <b>{positions.length}</b>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ИТОГО с НДС:{" "}
            <Typography component="span" variant="body2" fontWeight={700} fontSize={15}>
              {fmt(totalWithVat)} KZT
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
