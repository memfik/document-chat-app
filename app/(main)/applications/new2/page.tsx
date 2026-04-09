"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";
import {
  Paper,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Button,
  IconButton,
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

const REQUEST_TYPES = [
  "Закупка товаров",
  "Закупка услуг",
  "Строительство",
  "Аренда",
  "Прочее",
];
const COST_CENTERS = [
  "ЦЗ-001 Головной офис",
  "ЦЗ-002 Производство",
  "ЦЗ-003 Логистика",
];
const CURATORS = ["Иванов С.К.", "Козлов Р.Д.", "Петров А.В.", "Смирнова О.Н."];
const APPROVERS = [
  "Ахметов Д.С.",
  "Байжанов Р.Т.",
  "Гусев В.Н.",
  "Джаксыбеков А.К.",
  "Есенова М.Б.",
  "Иванов С.К.",
  "Козлов Р.Д.",
  "Петров А.В.",
  "Смирнова О.Н.",
];
const PROJECTS = ["Проект Альфа", "Проект Бета", "Проект Гамма", "—"];
const ARTICLES = [
  "Ст. 44 Закупки",
  "Ст. 46 Услуги",
  "Ст. 48 Строительство",
  "Ст. 50 ИТ",
];
const LOCATIONS = ["Алматы", "Астана", "Шымкент", "Атырау", "Актобе"];

const ED_GO_LIST = [
  "Ахметов Д.С.",
  "Байжанов Р.Т.",
  "Гусев В.Н.",
  "Джаксыбеков А.К.",
  "Есенова М.Б.",
  "Жумабеков С.А.",
  "Ким О.В.",
];

const VAT_RATE = 0.12;

const STEPS = [
  "Обоснование закупа",
  "Позиции заявки",
  "Согласование",
  "Вложения",
];

interface Position {
  id: number;
  requestType: string;
  product: string;
  qty: string;
  deliveryPlace: string;
  dateFrom: string;
  dateTo: string;
  priceNoVat: string;
  costCenter: string;
  curator: string;
  project: string;
  article: string;
  location: string;
}

interface Attachments {
  spec: File | null;
  extra: File | null;
  contract: File | null;
}

const emptyPosition = (id: number): Position => ({
  id,
  requestType: REQUEST_TYPES[0],
  product: "",
  qty: "",
  deliveryPlace: "",
  dateFrom: "",
  dateTo: "",
  priceNoVat: "",
  costCenter: COST_CENTERS[0],
  curator: CURATORS[0],
  project: PROJECTS[0],
  article: ARTICLES[0],
  location: LOCATIONS[0],
});

let nextId = 10;

const priceWithVat = (p: Position) => {
  const v = parseFloat(p.priceNoVat) || 0;
  return v * (1 + VAT_RATE);
};

const fmt = (n: number) =>
  n.toLocaleString("ru-RU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

function FileInput({
  label,
  file,
  onChange,
}: {
  label: string;
  file: File | null;
  onChange: (f: File | null) => void;
}) {
  return (
    <Box>
      <Typography
        variant="caption"
        color="text.secondary"
        display="block"
        mb={0.5}
      >
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
        <UploadFileIcon
          fontSize="small"
          sx={{ color: "text.disabled", flexShrink: 0 }}
        />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {file ? file.name : "Нажмите для загрузки файла..."}
        </Typography>
        {file && (
          <IconButton
            size="small"
            onClick={(e) => {
              e.preventDefault();
              onChange(null);
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
        <input
          type="file"
          hidden
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
      </Box>
    </Box>
  );
}

function PositionRow({
  pos,
  index,
  errors,
  onChange,
  onClear,
  onRemove,
  canRemove,
}: {
  pos: Position;
  index: number;
  errors: Set<string>;
  onChange: (id: number, field: keyof Position, value: string) => void;
  onClear: (id: number) => void;
  onRemove: (id: number) => void;
  canRemove: boolean;
}) {
  const set =
    (f: keyof Position) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(pos.id, f, e.target.value);

  const err = (field: string) => errors.has(`${pos.id}.${field}`);

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "grey.200",
        borderRadius: 2,
        p: 2,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography
          variant="caption"
          fontWeight={600}
          color="text.secondary"
          textTransform="uppercase"
          letterSpacing={0.5}
        >
          Позиция #{index + 1}
        </Typography>
        <Box display="flex" gap={1}>
          <Button
            size="small"
            variant="text"
            color="inherit"
            onClick={() => onClear(pos.id)}
            sx={{
              fontSize: 12,
              color: "text.disabled",
              textDecoration: "underline",
              minWidth: "auto",
            }}
          >
            Очистить
          </Button>
          {canRemove && (
            <Button
              size="small"
              variant="text"
              color="error"
              startIcon={<DeleteOutlineIcon fontSize="small" />}
              onClick={() => onRemove(pos.id)}
              sx={{ fontSize: 12, minWidth: "auto" }}
            >
              Удалить
            </Button>
          )}
        </Box>
      </Box>

      <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={1.5}>
        <TextField
          select
          size="small"
          label="Тип заявки"
          required
          fullWidth
          value={pos.requestType}
          onChange={set("requestType")}
        >
          {REQUEST_TYPES.map((o) => (
            <MenuItem key={o} value={o}>
              {o}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          size="small"
          label="Товар / Услуга"
          required
          fullWidth
          placeholder="Введите наименование..."
          value={pos.product}
          onChange={set("product")}
          error={err("product")}
          helperText={err("product") ? "Обязательное поле" : ""}
          sx={{ gridColumn: "span 2" }}
        />

        <TextField
          size="small"
          label="Количество"
          required
          fullWidth
          type="number"
          inputProps={{ min: 1 }}
          placeholder="0"
          value={pos.qty}
          onChange={set("qty")}
          error={err("qty")}
          helperText={err("qty") ? "Обязательное поле" : ""}
        />

        <TextField
          size="small"
          label="Место поставки"
          required
          fullWidth
          placeholder="Адрес..."
          value={pos.deliveryPlace}
          onChange={set("deliveryPlace")}
          error={err("deliveryPlace")}
          helperText={err("deliveryPlace") ? "Обязательное поле" : ""}
        />

        <TextField
          size="small"
          label="Дата начала"
          required
          fullWidth
          type="date"
          value={pos.dateFrom}
          onChange={set("dateFrom")}
          error={err("dateFrom")}
          helperText={err("dateFrom") ? "Обязательное поле" : ""}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          size="small"
          label="Дата окончания"
          required
          fullWidth
          type="date"
          value={pos.dateTo}
          inputProps={{ min: pos.dateFrom }}
          onChange={set("dateTo")}
          error={err("dateTo")}
          helperText={err("dateTo") ? "Обязательное поле" : ""}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          size="small"
          label="Стоимость без НДС"
          required
          fullWidth
          type="number"
          inputProps={{ min: 0 }}
          placeholder="0"
          value={pos.priceNoVat}
          onChange={set("priceNoVat")}
          error={err("priceNoVat")}
          helperText={err("priceNoVat") ? "Обязательное поле" : ""}
        />

        <TextField
          size="small"
          label="Стоимость с НДС (12%)"
          fullWidth
          value={pos.priceNoVat ? fmt(priceWithVat(pos)) : "—"}
          disabled
        />

        <TextField
          select
          size="small"
          label="Центр затрат"
          required
          fullWidth
          value={pos.costCenter}
          onChange={set("costCenter")}
        >
          {COST_CENTERS.map((o) => (
            <MenuItem key={o} value={o}>
              {o}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          size="small"
          label="Куратор"
          required
          fullWidth
          value={pos.curator}
          onChange={set("curator")}
        >
          {CURATORS.map((o) => (
            <MenuItem key={o} value={o}>
              {o}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          size="small"
          label="Проект"
          fullWidth
          value={pos.project}
          onChange={set("project")}
        >
          {PROJECTS.map((o) => (
            <MenuItem key={o} value={o}>
              {o}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          size="small"
          label="Статья"
          required
          fullWidth
          value={pos.article}
          onChange={set("article")}
        >
          {ARTICLES.map((o) => (
            <MenuItem key={o} value={o}>
              {o}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          size="small"
          label="Точка присутствия"
          fullWidth
          value={pos.location}
          onChange={set("location")}
        >
          {LOCATIONS.map((o) => (
            <MenuItem key={o} value={o}>
              {o}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Box>
  );
}

export default function NewF16Page() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [title, setTitle] = useState("");
  const [purpose, setPurpose] = useState("");
  const [benefits, setBenefits] = useState("");
  const [losses, setLosses] = useState("");
  const [positions, setPositions] = useState<Position[]>([emptyPosition(1)]);
  const [approvers, setApprovers] = useState<string[]>([]);
  const [attachments, setAttachments] = useState<Attachments>({
    spec: null,
    extra: null,
    contract: null,
  });
  const [errors, setErrors] = useState<Set<string>>(new Set());
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const updatePosition = (id: number, field: keyof Position, value: string) => {
    setPositions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    );
  };

  const clearPosition = (id: number) => {
    setPositions((prev) =>
      prev.map((p) =>
        p.id === id ? { ...emptyPosition(id), requestType: p.requestType } : p,
      ),
    );
  };

  const removePosition = (id: number) => {
    setPositions((prev) => prev.filter((p) => p.id !== id));
  };

  const addPosition = () => {
    setPositions((prev) => [...prev, emptyPosition(nextId++)]);
  };

  const totalWithVat = positions.reduce((acc, p) => acc + priceWithVat(p), 0);

  const validateStep = (step: number): Set<string> => {
    const errs = new Set<string>();
    if (step === 0) {
      if (!title.trim()) errs.add("title");
      if (!purpose.trim()) errs.add("purpose");
    }
    if (step === 1) {
      positions.forEach((p) => {
        if (!p.product.trim()) errs.add(`${p.id}.product`);
        if (!p.qty.trim() || parseFloat(p.qty) <= 0) errs.add(`${p.id}.qty`);
        if (!p.deliveryPlace.trim()) errs.add(`${p.id}.deliveryPlace`);
        if (!p.dateFrom) errs.add(`${p.id}.dateFrom`);
        if (!p.dateTo) errs.add(`${p.id}.dateTo`);
        if (!p.priceNoVat.trim() || parseFloat(p.priceNoVat) <= 0)
          errs.add(`${p.id}.priceNoVat`);
      });
    }
    return errs;
  };

  const handleNext = () => {
    const errs = validateStep(activeStep);
    setErrors(errs);
    if (errs.size === 0) {
      setActiveStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    setErrors(new Set());
    setActiveStep((s) => s - 1);
  };

  const handleSubmit = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    router.push("/applications");
  };

  const orangeBtn = {
    bgcolor: "#f96800",
    "&:hover": { bgcolor: "#e05a00" },
    textTransform: "none",
  } as const;

  return (
    <div className="py-6 px-6 max-w-7xl mx-auto">
      <Typography variant="h6" fontWeight={600} color="text.primary" mb={3}>
        Новая заявка Ф16
      </Typography>

      <Paper elevation={1} sx={{ mb: 3 }}>
        <Box px={3} py={2.5}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {STEPS.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Paper>

      <Paper elevation={1}>
        <Box p={3}>
          {activeStep === 0 && (
            <Box display="flex" flexDirection="column" gap={3}>
              <Box>
                <Typography variant="subtitle2" color="text.primary" mb={1.5}>
                  Название заявки
                </Typography>
                <TextField
                  size="small"
                  label="Название заявки"
                  required
                  fullWidth
                  placeholder="Введите название заявки..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  error={errors.has("title")}
                  helperText={errors.has("title") ? "Обязательное поле" : ""}
                />
              </Box>

              <Box
                sx={{ borderTop: "1px solid", borderColor: "grey.100", pt: 3 }}
              >
                <Typography variant="subtitle2" color="text.primary" mb={2}>
                  Обоснование закупа
                </Typography>
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(3, 1fr)"
                  gap={2}
                >
                  <TextField
                    size="small"
                    label="Назначение закупа"
                    required
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Опишите назначение..."
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    error={errors.has("purpose")}
                    helperText={
                      errors.has("purpose") ? "Обязательное поле" : ""
                    }
                  />
                  <TextField
                    size="small"
                    label="Выгоды от закупа"
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Опишите выгоды..."
                    value={benefits}
                    onChange={(e) => setBenefits(e.target.value)}
                  />
                  <TextField
                    size="small"
                    label="Убытки при непроведении"
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Опишите возможные убытки..."
                    value={losses}
                    onChange={(e) => setLosses(e.target.value)}
                  />
                </Box>
              </Box>
            </Box>
          )}
          {activeStep === 1 && (
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
                  onChange={updatePosition}
                  onClear={clearPosition}
                  onRemove={removePosition}
                  canRemove={positions.length > 1}
                />
              ))}
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<AddIcon />}
                onClick={addPosition}
                sx={{
                  alignSelf: "flex-start",
                  textTransform: "none",
                  borderStyle: "dashed",
                  borderColor: "grey.300",
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
                    Позиций:{" "}
                    <b style={{ color: "#374151" }}>{positions.length}</b>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ИТОГО с НДС:{" "}
                    <b style={{ color: "#111827", fontSize: 15 }}>
                      {fmt(totalWithVat)} KZT
                    </b>
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
          {activeStep === 2 && (
            <Box>
              <Typography variant="subtitle2" color="text.primary" mb={2}>
                Согласование
              </Typography>
              <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} mb={3}>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      mb={0.5}
                    >
                      Согласующий
                    </Typography>
                    <TextField
                      size="small"
                      fullWidth
                      value="ГО-ДЦиРС"
                      disabled
                    />
                  </Box>
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      mb={0.5}
                    >
                      Согласующий
                    </Typography>
                    <Select
                      multiple
                      displayEmpty
                      value={approvers}
                      onChange={(e) =>
                        setApprovers(
                          typeof e.target.value === "string"
                            ? e.target.value.split(",")
                            : e.target.value,
                        )
                      }
                      input={<OutlinedInput notched={false} />}
                      renderValue={(selected) =>
                        selected.length === 0 ? (
                          <Typography variant="body2" color="text.disabled">
                            Выберите согласующих...
                          </Typography>
                        ) : (
                          <Typography variant="body2">
                            {selected.join(", ")}
                          </Typography>
                        )
                      }
                      size="small"
                      fullWidth
                    >
                      {APPROVERS.map((a) => (
                        <MenuItem key={a} value={a}>
                          <Checkbox
                            checked={approvers.includes(a)}
                            size="small"
                          />
                          <ListItemText primary={a} />
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                </Box>
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                    mb={0.5}
                  >
                    Кураторы статей
                  </Typography>
                  <Select
                    multiple
                    displayEmpty
                    value={approvers}
                    onChange={(e) =>
                      setApprovers(
                        typeof e.target.value === "string"
                          ? e.target.value.split(",")
                          : e.target.value,
                      )
                    }
                    input={<OutlinedInput notched={false} />}
                    renderValue={(selected) =>
                      selected.length === 0 ? (
                        <Typography variant="body2" color="text.disabled">
                          Выберите согласующих...
                        </Typography>
                      ) : (
                        <Typography variant="body2">
                          {selected.join(", ")}
                        </Typography>
                      )
                    }
                    size="small"
                    fullWidth
                  >
                    {APPROVERS.map((a) => (
                      <MenuItem key={a} value={a}>
                        <Checkbox
                          checked={approvers.includes(a)}
                          size="small"
                        />
                        <ListItemText primary={a} />
                      </MenuItem>
                    ))}
                  </Select>
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
          )}
          {activeStep === 3 && (
            <Box>
              <Typography variant="subtitle2" color="text.primary" mb={2}>
                Вложения
              </Typography>
              <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
                <FileInput
                  label="Техническая спецификация"
                  file={attachments.spec}
                  onChange={(f) => setAttachments((a) => ({ ...a, spec: f }))}
                />
                <FileInput
                  label="Дополнительные файлы"
                  file={attachments.extra}
                  onChange={(f) => setAttachments((a) => ({ ...a, extra: f }))}
                />
                <FileInput
                  label="Договор"
                  file={attachments.contract}
                  onChange={(f) =>
                    setAttachments((a) => ({ ...a, contract: f }))
                  }
                />
              </Box>
            </Box>
          )}
          {errors.size > 0 && (
            <Typography variant="body2" color="error" mt={2} textAlign="right">
              Заполните все обязательные поля ({errors.size} ошибок)
            </Typography>
          )}
          <Box
            display="flex"
            justifyContent="space-between"
            mt={3}
            pt={2}
            sx={{ borderTop: "1px solid", borderColor: "grey.100" }}
          >
            <Button
              variant="outlined"
              color="inherit"
              onClick={activeStep === 0 ? () => router.back() : handleBack}
              sx={{
                textTransform: "none",
                borderColor: "grey.300",
                color: "text.secondary",
              }}
            >
              {activeStep === 0 ? "Отмена" : "Назад"}
            </Button>

            {activeStep < STEPS.length - 1 ? (
              <Button variant="contained" onClick={handleNext} sx={orangeBtn}>
                Далее
              </Button>
            ) : (
              <Button variant="contained" onClick={handleSubmit} sx={orangeBtn}>
                Отправить
              </Button>
            )}
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Форма отправлена успешно!
        </Alert>
      </Snackbar>
    </div>
  );
}
