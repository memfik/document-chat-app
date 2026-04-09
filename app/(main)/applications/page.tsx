"use client";

import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { InfoModal } from "@/app/components/InfoModal";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  TablePagination,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
} from "@mui/material";

const mockData = [
  {
    id: "ЗАЯ-2025-001",
    date: "12.01.2025",
    initiator: "Петров А.В.",
    type: "АФ",
    description: "Поставка офисной техники",
    cost: "450 000",
    currency: "KZT",
    contractNum: "ДГ-2025-014",
    executor: "Иванов С.К.",
    status: "in_progress",
    contract: "ДГ-2025-014",
    updatedAt: "15.01.2025 09:12",
    article: "Ст. 44",
    znoNum: "ЗНО-2025-007",
  },
  {
    id: "ЗАЯ-2025-002",
    date: "15.01.2025",
    initiator: "Смирнова О.Н.",
    type: "АФ",
    description: "Техническое обслуживание оборудования",
    cost: "120 000",
    currency: "KZT",
    contractNum: "ДГ-2025-021",
    executor: "Козлов Р.Д.",
    status: "waiting",
    contract: "ДГ-2025-021",
    updatedAt: "16.01.2025 14:30",
    article: "Ст. 46",
    znoNum: "ЗНО-2025-009",
  },
  {
    id: "ЗАЯ-2025-003",
    date: "20.01.2025",
    initiator: "Жуков Е.П.",
    type: "АФ",
    description: "Ремонт кровли склада №3",
    cost: "1 800 000",
    currency: "KZT",
    contractNum: "ДГ-2025-033",
    executor: "Титов М.А.",
    status: "done",
    contract: "ДГ-2025-033",
    updatedAt: "28.01.2025 11:05",
    article: "Ст. 48",
    znoNum: "ЗНО-2025-011",
  },
  {
    id: "ЗАЯ-2025-004",
    date: "03.02.2025",
    initiator: "Белова К.С.",
    type: "АФ",
    description: "Канцелярские товары Q1",
    cost: "35 000",
    currency: "KZT",
    contractNum: "—",
    executor: "Морозов Д.В.",
    status: "recalled",
    contract: "—",
    updatedAt: "04.02.2025 08:44",
    article: "Ст. 44",
    znoNum: "ЗНО-2025-015",
  },
  {
    id: "ЗАЯ-2025-005",
    date: "10.02.2025",
    initiator: "Новиков Г.Р.",
    type: "АФ",
    description: "Аудит информационной безопасности",
    cost: "5 200",
    currency: "USD",
    contractNum: "ДГ-2025-047",
    executor: "Фёдоров А.Л.",
    status: "rejected",
    contract: "ДГ-2025-047",
    updatedAt: "12.02.2025 16:20",
    article: "Ст. 50",
    znoNum: "ЗНО-2025-018",
  },
  {
    id: "ЗАЯ-2025-006",
    date: "18.02.2025",
    initiator: "Лебедева Т.И.",
    type: "АФ",
    description: "Аренда транспортных средств",
    cost: "980 000",
    currency: "KZT",
    contractNum: "ДГ-2025-055",
    executor: "Орлов В.Н.",
    status: "contract",
    contract: "ДГ-2025-055",
    updatedAt: "20.02.2025 10:15",
    article: "Ст. 52",
    znoNum: "ЗНО-2025-022",
  },
  {
    id: "ЗАЯ-2025-007",
    date: "25.02.2025",
    initiator: "Кузнецов И.В.",
    type: "АФ",
    description: "Серверное оборудование",
    cost: "18 500",
    currency: "EUR",
    contractNum: "—",
    executor: "Попов С.Е.",
    status: "postponed",
    contract: "—",
    updatedAt: "26.02.2025 13:50",
    article: "Ст. 44",
    znoNum: "ЗНО-2025-025",
  },
  {
    id: "ЗАЯ-2025-008",
    date: "05.03.2025",
    initiator: "Соколова М.Д.",
    type: "АФ",
    description: "Юридическое сопровождение сделок",
    cost: "300 000",
    currency: "KZT",
    contractNum: "ДГ-2025-062",
    executor: "Васильев Н.О.",
    status: "in_progress",
    contract: "ДГ-2025-062",
    updatedAt: "06.03.2025 09:00",
    article: "Ст. 46",
    znoNum: "ЗНО-2025-028",
  },
  {
    id: "ЗАЯ-2024-088",
    date: "14.11.2024",
    initiator: "Григорьев П.А.",
    type: "АФ",
    description: "Прокладка кабельных трасс",
    cost: "2 450 000",
    currency: "KZT",
    contractNum: "ДГ-2024-199",
    executor: "Яковлев Б.С.",
    status: "done",
    contract: "ДГ-2024-199",
    updatedAt: "30.11.2024 17:22",
    article: "Ст. 48",
    znoNum: "ЗНО-2024-091",
  },
  {
    id: "ЗАЯ-2024-091",
    date: "02.12.2024",
    initiator: "Захарова Л.Н.",
    type: "АФ",
    description: "Спецодежда и СИЗ для персонала",
    cost: "210 000",
    currency: "KZT",
    contractNum: "ДГ-2024-207",
    executor: "Степанов К.Р.",
    status: "done",
    contract: "ДГ-2024-207",
    updatedAt: "15.12.2024 12:40",
    article: "Ст. 44",
    znoNum: "ЗНО-2024-095",
  },
  {
    id: "ЗАЯ-2025-001",
    date: "12.01.2025",
    initiator: "Петров А.В.",
    type: "АФ",
    description: "Поставка офисной техники",
    cost: "450 000",
    currency: "KZT",
    contractNum: "ДГ-2025-014",
    executor: "Иванов С.К.",
    status: "in_progress",
    contract: "ДГ-2025-014",
    updatedAt: "15.01.2025 09:12",
    article: "Ст. 44",
    znoNum: "ЗНО-2025-007",
  },
  {
    id: "ЗАЯ-2025-002",
    date: "15.01.2025",
    initiator: "Смирнова О.Н.",
    type: "АФ",
    description: "Техническое обслуживание оборудования",
    cost: "120 000",
    currency: "KZT",
    contractNum: "ДГ-2025-021",
    executor: "Козлов Р.Д.",
    status: "waiting",
    contract: "ДГ-2025-021",
    updatedAt: "16.01.2025 14:30",
    article: "Ст. 46",
    znoNum: "ЗНО-2025-009",
  },
  {
    id: "ЗАЯ-2025-003",
    date: "20.01.2025",
    initiator: "Жуков Е.П.",
    type: "АФ",
    description: "Ремонт кровли склада №3",
    cost: "1 800 000",
    currency: "KZT",
    contractNum: "ДГ-2025-033",
    executor: "Титов М.А.",
    status: "done",
    contract: "ДГ-2025-033",
    updatedAt: "28.01.2025 11:05",
    article: "Ст. 48",
    znoNum: "ЗНО-2025-011",
  },
  {
    id: "ЗАЯ-2025-004",
    date: "03.02.2025",
    initiator: "Белова К.С.",
    type: "АФ",
    description: "Канцелярские товары Q1",
    cost: "35 000",
    currency: "KZT",
    contractNum: "—",
    executor: "Морозов Д.В.",
    status: "recalled",
    contract: "—",
    updatedAt: "04.02.2025 08:44",
    article: "Ст. 44",
    znoNum: "ЗНО-2025-015",
  },
  {
    id: "ЗАЯ-2025-005",
    date: "10.02.2025",
    initiator: "Новиков Г.Р.",
    type: "АФ",
    description: "Аудит информационной безопасности",
    cost: "5 200",
    currency: "USD",
    contractNum: "ДГ-2025-047",
    executor: "Фёдоров А.Л.",
    status: "rejected",
    contract: "ДГ-2025-047",
    updatedAt: "12.02.2025 16:20",
    article: "Ст. 50",
    znoNum: "ЗНО-2025-018",
  },
  {
    id: "ЗАЯ-2025-006",
    date: "18.02.2025",
    initiator: "Лебедева Т.И.",
    type: "АФ",
    description: "Аренда транспортных средств",
    cost: "980 000",
    currency: "KZT",
    contractNum: "ДГ-2025-055",
    executor: "Орлов В.Н.",
    status: "contract",
    contract: "ДГ-2025-055",
    updatedAt: "20.02.2025 10:15",
    article: "Ст. 52",
    znoNum: "ЗНО-2025-022",
  },
  {
    id: "ЗАЯ-2025-007",
    date: "25.02.2025",
    initiator: "Кузнецов И.В.",
    type: "АФ",
    description: "Серверное оборудование",
    cost: "18 500",
    currency: "EUR",
    contractNum: "—",
    executor: "Попов С.Е.",
    status: "postponed",
    contract: "—",
    updatedAt: "26.02.2025 13:50",
    article: "Ст. 44",
    znoNum: "ЗНО-2025-025",
  },
  {
    id: "ЗАЯ-2025-008",
    date: "05.03.2025",
    initiator: "Соколова М.Д.",
    type: "АФ",
    description: "Юридическое сопровождение сделок",
    cost: "300 000",
    currency: "KZT",
    contractNum: "ДГ-2025-062",
    executor: "Васильев Н.О.",
    status: "in_progress",
    contract: "ДГ-2025-062",
    updatedAt: "06.03.2025 09:00",
    article: "Ст. 46",
    znoNum: "ЗНО-2025-028",
  },
  {
    id: "ЗАЯ-2024-088",
    date: "14.11.2024",
    initiator: "Григорьев П.А.",
    type: "АФ",
    description: "Прокладка кабельных трасс",
    cost: "2 450 000",
    currency: "KZT",
    contractNum: "ДГ-2024-199",
    executor: "Яковлев Б.С.",
    status: "done",
    contract: "ДГ-2024-199",
    updatedAt: "30.11.2024 17:22",
    article: "Ст. 48",
    znoNum: "ЗНО-2024-091",
  },
  {
    id: "ЗАЯ-2024-091",
    date: "02.12.2024",
    initiator: "Захарова Л.Н.",
    type: "АФ",
    description: "Спецодежда и СИЗ для персонала",
    cost: "210 000",
    currency: "KZT",
    contractNum: "ДГ-2024-207",
    executor: "Степанов К.Р.",
    status: "done",
    contract: "ДГ-2024-207",
    updatedAt: "15.12.2024 12:40",
    article: "Ст. 44",
    znoNum: "ЗНО-2024-095",
  },
];

const statusFilters = [
  { key: "all", label: "Все заявки", color: "#6b7280" },
  { key: "in_progress", label: "В работе", color: "#3b82f6" },
  { key: "waiting", label: "В ожидании", color: "#f59e0b" },
  { key: "done", label: "Исполненные", color: "#22c55e" },
  { key: "recalled", label: "Отозванные", color: "#f96800" },
  { key: "rejected", label: "Отклоненные", color: "#ef4444" },
  { key: "contract", label: "Договоры", color: "#8b5cf6" },
  { key: "postponed", label: "Отложенные", color: "#94a3b8" },
];

interface RowExtra {
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

function EditModal({ rowId, extra, onClose, onSave }: EditModalProps) {
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
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ color: "text.secondary" }}
        >
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
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              mb={0.5}
            >
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
          onClick={() =>
            onSave({ znoNum, paymentFile: file, paymentFileName: fileName })
          }
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

export default function DocumentsPage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentYearOnly, setCurrentYearOnly] = useState(false);
  const [activeStatus, setActiveStatus] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [selectedRow, setSelectedRow] = useState<(typeof mockData)[0] | null>(
    null,
  );
  const [extras, setExtras] = useState<Record<string, RowExtra>>(() =>
    Object.fromEntries(
      mockData.map((r) => [
        r.id,
        { znoNum: r.znoNum, paymentFile: null, paymentFileName: "" },
      ]),
    ),
  );
  const [editTarget, setEditTarget] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => setLoading(false), 400);
  }, []);

  const saveExtra = (id: string, data: RowExtra) => {
    setExtras((prev) => ({ ...prev, [id]: data }));
    setEditTarget(null);
  };

  const openFile = (extra: RowExtra) => {
    if (extra.paymentFile) {
      window.open(URL.createObjectURL(extra.paymentFile), "_blank");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="py-5 px-6">
      <div className="flex items-center gap-3 mb-4">
        <TextField
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск..."
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
                  <SearchIcon
                    fontSize="small"
                    sx={{ color: "text.secondary" }}
                  />
                </InputAdornment>
              ),
              endAdornment: search ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="clear search"
                    onClick={() => setSearch("")}
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
        <Button
          variant={currentYearOnly ? "contained" : "outlined"}
          onClick={() => setCurrentYearOnly((v) => !v)}
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
              : {
                  borderColor: "grey.300",
                  color: "text.secondary",
                }),
          }}
        >
          Только текущий год
        </Button>
      </div>
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {statusFilters.map((s) => {
          const active = activeStatus === s.key;
          const count =
            s.key === "all"
              ? mockData.length
              : mockData.filter((r) => r.status === s.key).length;
          return (
            <Button
              key={s.key}
              onClick={() => setActiveStatus(s.key)}
              size="small"
              startIcon={
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: s.color,
                    flexShrink: 0,
                    display: "inline-block",
                  }}
                />
              }
              sx={{
                textTransform: "none",
                borderRadius: 2,
                border: "1px solid",
                borderColor: active ? s.color : "transparent",
                backgroundColor: "transparent",
                color: active ? "text.primary" : "text.secondary",
                fontWeight: active ? 600 : 400,
                px: 2,
              }}
            >
              {s.label}
              <span className="text-sm text-gray-500 ml-2 font-semibold">
                {count}
              </span>
            </Button>
          );
        })}
      </div>

      <Paper>
      <TableContainer sx={{ maxHeight: "calc(100vh - 260px)" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>№ заявки</b>
              </TableCell>
              <TableCell>
                <b>Дата поступления</b>
              </TableCell>
              <TableCell>
                <b>Инициатор</b>
              </TableCell>
              <TableCell>
                <b>Подразделение инициатора</b>
              </TableCell>
              <TableCell>
                <b>Описание</b>
              </TableCell>
              <TableCell>
                <b>Стоимость</b>
              </TableCell>
              <TableCell>
                <b>№ договора</b>
              </TableCell>
              <TableCell>
                <b>Исполнитель</b>
              </TableCell>
              <TableCell>
                <b>Статус</b>
              </TableCell>
              <TableCell>
                <b>Договор</b>
              </TableCell>
              <TableCell>
                <b>Время изменения</b>
              </TableCell>
              <TableCell>
                <b>Статья</b>
              </TableCell>
              <TableCell>
                <b>№ ЗНО</b>
              </TableCell>
              <TableCell>
                <b>Платежный документ</b>
              </TableCell>
              <TableCell>
                <b>Действия</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const status = statusFilters.find((s) => s.key === row.status);
                return (
                  <TableRow
                    key={row.id}
                    hover
                    onClick={() => setSelectedRow(row)}
                    className="cursor-pointer"
                  >
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.initiator}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-0.5">
                        {row.cost} {row.currency}
                      </div>
                    </TableCell>
                    <TableCell>{row.contractNum}</TableCell>
                    <TableCell>{row.executor}</TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: status?.color }}
                        />
                        {status?.label}
                      </span>
                    </TableCell>
                    <TableCell>{row.contract}</TableCell>
                    <TableCell>{row.updatedAt}</TableCell>
                    <TableCell>{row.article}</TableCell>
                    <TableCell>
                      {extras[row.id]?.znoNum || row.znoNum}
                    </TableCell>
                    <TableCell>
                      {extras[row.id]?.paymentFileName ? (
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={
                            <VisibilityIcon
                              sx={{ fontSize: "0.85rem !important" }}
                            />
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            openFile(extras[row.id]);
                          }}
                          sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            fontSize: "0.7rem",
                            py: 0.5,
                            px: 1,
                          }}
                        >
                          Посмотреть
                        </Button>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="grid gap-1">
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={
                            <EditIcon sx={{ fontSize: "0.85rem !important" }} />
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditTarget(row.id);
                          }}
                          title="Редактировать"
                          sx={{
                            textTransform: "none",
                            borderRadius: 2,
                            fontSize: "0.7rem",
                            color: "text.secondary",
                            borderColor: "grey.300",
                            py: 0.5,
                            px: 5,
                          }}
                        >
                          Править
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={
                            <HistoryIcon
                              sx={{ fontSize: "0.85rem !important" }}
                            />
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`/history/${row.id}`, "_blank");
                          }}
                          title="История"
                          sx={{
                            textTransform: "none",
                            fontSize: "0.7rem",
                            color: "text.secondary",
                            borderColor: "grey.300",
                            borderRadius: 2,
                            py: 0.5,
                            px: 1,
                          }}
                        >
                          История
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
          component="div"
          count={mockData.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[25, 50, 75, 100]}
          labelRowsPerPage="Строк на странице:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} из ${count}`
          }
          sx={{ position: "sticky", bottom: 0, bgcolor: "background.paper", borderTop: "1px solid", borderColor: "divider" }}
        />
      </Paper>

      {editTarget && extras[editTarget] && (
        <EditModal
          rowId={editTarget}
          extra={extras[editTarget]}
          onClose={() => setEditTarget(null)}
          onSave={(data) => saveExtra(editTarget, data)}
        />
      )}

      {selectedRow && (
        <InfoModal
          row={selectedRow}
          statusLabel={
            statusFilters.find((s) => s.key === selectedRow.status)?.label ?? ""
          }
          statusColor={
            statusFilters.find((s) => s.key === selectedRow.status)?.color ??
            "#6b7280"
          }
          paymentFileName={extras[selectedRow.id]?.paymentFileName}
          onClose={() => setSelectedRow(null)}
        />
      )}
    </div>
  );
}
