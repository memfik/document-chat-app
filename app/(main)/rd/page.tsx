"use client";

import { useState, useCallback } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  IconButton,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
} from "@mui/material";

interface SpecRow {
  id: number;
  description: string;
  qty: string;
  price: string;
}

interface FormData {
  contract: string;
  description: string;
  initiator: string;
  createdAt: string;
  costCenter: string;
  project: string;
  article: string;
  rows: SpecRow[];
}

const contractOptions = [
  "ДГ-2025-014",
  "ДГ-2025-021",
  "ДГ-2025-033",
  "ДГ-2025-047",
];
const costCenterOptions = [
  "ЦЗ-001 Головной офис",
  "ЦЗ-002 Производство",
  "ЦЗ-003 Логистика",
];
const projectOptions = ["Проект Альфа", "Проект Бета", "Проект Гамма"];
const articleOptions = [
  "Ст. 44 Закупки",
  "Ст. 46 Услуги",
  "Ст. 48 Строительство",
  "Ст. 50 ИТ",
];

const initialData: FormData = {
  contract: "ДГ-2025-014",
  description: "Поставка офисной техники и расходных материалов",
  initiator: "Петров А.В.",
  createdAt: "12.01.2025",
  costCenter: "ЦЗ-001 Головной офис",
  project: "Проект Альфа",
  article: "Ст. 44 Закупки",
  rows: [
    {
      id: 1,
      description: "Ноутбук Lenovo ThinkPad",
      qty: "5",
      price: "250000",
    },
    { id: 2, description: 'Монитор 27" Samsung', qty: "5", price: "80000" },
    { id: 3, description: "Мышь беспроводная", qty: "10", price: "5000" },
  ],
};

function calcRowSum(row: SpecRow): number {
  return (parseFloat(row.qty) || 0) * (parseFloat(row.price) || 0);
}

function calcTotal(rows: SpecRow[]): number {
  return rows.reduce((acc, r) => acc + calcRowSum(r), 0);
}

function formatNumber(n: number): string {
  return n.toLocaleString("ru-RU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

let nextId = 100;

interface NewItemModalProps {
  title: string;
  onClose: () => void;
  onSave: (value: string) => void;
}

function NewItemModal({ title, onClose, onSave }: NewItemModalProps) {
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
          sx={{
            textTransform: "none",
            borderColor: "grey.300",
            color: "text.secondary",
            borderRadius: 2,
          }}
        >
          Отмена
        </Button>
        <Button
          variant="contained"
          disabled={!value.trim()}
          onClick={() => value.trim() && onSave(value.trim())}
          sx={{
            textTransform: "none",
            bgcolor: "#f96800",
            borderRadius: 2,
            "&:hover": { bgcolor: "#e05a00" },
          }}
        >
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface SelectWithAddProps {
  label: string;
  value: string;
  options: string[];
  editing: boolean;
  onChange: (v: string) => void;
  onNewItem: (v: string) => void;
  modalTitle: string;
}

function SelectWithAdd({
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
      <Box display="flex" flexDirection="column" gap={0.5}>
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

export default function RdPage() {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState<FormData>(initialData);
  const [draft, setDraft] = useState<FormData>(initialData);
  const [contracts, setContracts] = useState(contractOptions);
  const [costCenters, setCostCenters] = useState(costCenterOptions);
  const [projects, setProjects] = useState(projectOptions);
  const [articles, setArticles] = useState(articleOptions);

  const total = calcTotal(draft.rows);

  const setField = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) => {
      setDraft((d) => ({ ...d, [key]: value }));
    },
    [],
  );

  const updateRow = (id: number, field: keyof SpecRow, value: string) => {
    setDraft((d) => ({
      ...d,
      rows: d.rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
    }));
  };

  const addRow = () => {
    setDraft((d) => ({
      ...d,
      rows: [...d.rows, { id: nextId++, description: "", qty: "", price: "" }],
    }));
  };

  const removeRow = (id: number) => {
    setDraft((d) => ({ ...d, rows: d.rows.filter((r) => r.id !== id) }));
  };

  const handleEdit = () => {
    setDraft(saved);
    setEditing(true);
  };
  const handleCancel = () => {
    setDraft(saved);
    setEditing(false);
  };
  const handleSave = () => {
    setSaved(draft);
    setEditing(false);
  };

  const orangeBtn = {
    bgcolor: "#f96800",
    borderRadius: 2,
    "&:hover": { bgcolor: "#e05a00" },
    textTransform: "none",
  } as const;

  return (
    <Box py={3} px={3} maxWidth="1280px" mx="auto">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Typography variant="h6" fontWeight={600}>
          Рамочный договор
        </Typography>
        <Box display="flex" gap={1}>
          {editing ? (
            <>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                sx={orangeBtn}
              >
                Сохранить
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<CloseIcon />}
                onClick={handleCancel}
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  borderColor: "grey.300",
                  color: "text.secondary",
                }}
              >
                Отмена
              </Button>
            </>
          ) : (
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<EditIcon />}
              onClick={handleEdit}
              sx={{
                textTransform: "none",
                borderRadius: 2,
                borderColor: "grey.300",
                color: "text.secondary",
              }}
            >
              Редактировать
            </Button>
          )}
        </Box>
      </Box>

      <Paper elevation={1} sx={{ mb: 3 }}>
        <Box
          px={2.5}
          py={2}
          borderBottom="1px solid"
          sx={{ borderColor: "divider" }}
        >
          <Typography variant="subtitle2" fontWeight={600}>
            Основная информация
          </Typography>
        </Box>
        <Box
          px={2.5}
          py={2}
          display="grid"
          gridTemplateColumns="1fr 1fr"
          gap={2}
        >
          <SelectWithAdd
            label="Договор"
            value={draft.contract}
            options={contracts}
            editing={true}
            onChange={(v) => setField("contract", v)}
            onNewItem={(v) => {
              setContracts((prev) => [...prev, v]);
              setField("contract", v);
            }}
            modalTitle="Добавить новый договор"
          />
          <TextField
            size="small"
            label="Описание"
            fullWidth
            value={draft.description}
            onChange={(e) => setField("description", e.target.value)}
            disabled={!editing}
          />
          <TextField
            size="small"
            label="Инициатор"
            fullWidth
            value={draft.initiator}
            disabled
          />
          <TextField
            size="small"
            label="Дата создания"
            fullWidth
            value={draft.createdAt}
            disabled
          />
          <SelectWithAdd
            label="Центр затрат"
            value={draft.costCenter}
            options={costCenters}
            editing={editing}
            onChange={(v) => setField("costCenter", v)}
            onNewItem={(v) => {
              setCostCenters((prev) => [...prev, v]);
              setField("costCenter", v);
            }}
            modalTitle="Добавить новый центр затрат"
          />
          <SelectWithAdd
            label="Проект"
            value={draft.project}
            options={projects}
            editing={editing}
            onChange={(v) => setField("project", v)}
            onNewItem={(v) => {
              setProjects((prev) => [...prev, v]);
              setField("project", v);
            }}
            modalTitle="Добавить новый проект"
          />
          <SelectWithAdd
            label="Статья"
            value={draft.article}
            options={articles}
            editing={editing}
            onChange={(v) => setField("article", v)}
            onNewItem={(v) => {
              setArticles((prev) => [...prev, v]);
              setField("article", v);
            }}
            modalTitle="Добавить новую статью"
          />
          <TextField
            size="small"
            label="Сумма рамочного договора"
            fullWidth
            value={`${formatNumber(total)} KZT`}
            disabled
          />
        </Box>
      </Paper>

      <Paper elevation={1}>
        <Box
          px={2.5}
          py={2}
          borderBottom="1px solid"
          sx={{ borderColor: "divider" }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle2" fontWeight={600}>
            Спецификация
          </Typography>
          {editing && (
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              startIcon={<AddIcon />}
              onClick={addRow}
              sx={{
                textTransform: "none",
                borderRadius: 2,
                borderColor: "grey.300",
                color: "text.secondary",
              }}
            >
              Добавить строку
            </Button>
          )}
        </Box>

        <TableContainer>
          <Table size="small">
            <TableHead sx={{ backgroundColor: "action.hover" }}>
              <TableRow>
                <TableCell width={48}>
                  <b>№</b>
                </TableCell>
                <TableCell>
                  <b>Описание товара / услуги</b>
                </TableCell>
                <TableCell width={120}>
                  <b>Количество</b>
                </TableCell>
                <TableCell width={150}>
                  <b>Цена за ед.</b>
                </TableCell>
                <TableCell width={150}>
                  <b>Сумма</b>
                </TableCell>
                {editing && <TableCell width={56} />}
              </TableRow>
            </TableHead>
            <TableBody>
              {draft.rows.map((row, idx) => (
                <TableRow key={row.id} hover>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {idx + 1}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {editing ? (
                      <TextField
                        size="small"
                        fullWidth
                        placeholder="Введите описание..."
                        value={row.description}
                        onChange={(e) =>
                          updateRow(row.id, "description", e.target.value)
                        }
                      />
                    ) : (
                      <Typography variant="body2">
                        {row.description || "—"}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {editing ? (
                      <TextField
                        size="small"
                        fullWidth
                        type="number"
                        inputProps={{ min: 0, style: { textAlign: "right" } }}
                        placeholder="0"
                        value={row.qty}
                        onChange={(e) =>
                          updateRow(row.id, "qty", e.target.value)
                        }
                      />
                    ) : (
                      <Typography variant="body2">{row.qty || "—"}</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {editing ? (
                      <TextField
                        size="small"
                        fullWidth
                        type="number"
                        inputProps={{ min: 0, style: { textAlign: "right" } }}
                        placeholder="0"
                        value={row.price}
                        onChange={(e) =>
                          updateRow(row.id, "price", e.target.value)
                        }
                      />
                    ) : (
                      <Typography variant="body2">
                        {row.price ? formatNumber(parseFloat(row.price)) : "—"}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={500}>
                      {calcRowSum(row) > 0
                        ? formatNumber(calcRowSum(row))
                        : "—"}
                    </Typography>
                  </TableCell>
                  {editing && (
                    <TableCell>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => removeRow(row.id)}
                        title="Удалить строку"
                        sx={{ border: "1px solid", borderColor: "error.light" }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))}

              {draft.rows.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={editing ? 6 : 5}
                    align="center"
                    sx={{ py: 4 }}
                  >
                    <Typography variant="body2" color="text.disabled">
                      Нет строк спецификации
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          px={2.5}
          py={2}
          borderTop="1px solid"
          sx={{ borderColor: "divider" }}
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          gap={2}
        >
          <Typography variant="body2" color="text.secondary">
            Итого:
          </Typography>
          <Typography variant="subtitle1" fontWeight={600}>
            {formatNumber(total)} KZT
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
