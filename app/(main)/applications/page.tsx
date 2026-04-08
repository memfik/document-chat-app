"use client";

import { useState, useEffect, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import HistoryIcon from "@mui/icons-material/History";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { cn } from "@/lib/utils";
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
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setFileName(f.name);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-[420px] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-800">
            Редактирование — {rowId}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <CloseIcon fontSize="small" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">№ ЗНО</label>
            <input
              type="text"
              value={znoNum}
              onChange={(e) => setZnoNum(e.target.value)}
              placeholder="Введите номер ЗНО..."
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#f96800] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Платежный документ
            </label>
            <div
              className="flex items-center gap-2 px-3 py-2 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#f96800] transition-colors"
              onClick={() => fileRef.current?.click()}
            >
              <UploadFileIcon fontSize="small" className="text-gray-400" />
              <span className="text-sm text-gray-500 truncate flex-1">
                {fileName || "Нажмите для загрузки файла..."}
              </span>
            </div>
            <input
              ref={fileRef}
              type="file"
              className="hidden"
              onChange={handleFile}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Отмена
          </button>
          <button
            onClick={() =>
              onSave({ znoNum, paymentFile: file, paymentFileName: fileName })
            }
            className="px-4 py-2 text-sm bg-[#f96800] text-white rounded-lg hover:bg-[#e05a00] transition-colors"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
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
        <div className="relative flex-1">
          <SearchIcon
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            fontSize="small"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск..."
            className="w-full pl-9 pr-9 py-2 text-sm border border-gray-400 rounded-lg outline-none focus:border-[#f96800] transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <CloseIcon fontSize="small" />
            </button>
          )}
        </div>
        <button
          onClick={() => setCurrentYearOnly((v) => !v)}
          className={cn(
            "px-4 py-2 text-sm rounded-lg border transition-colors text-gray-500",
            currentYearOnly
              ? "bg-[#cafeb8] font-medium"
              : "bg-white border-gray-400 hover:bg-gray-100",
          )}
        >
          Только текущий год
        </button>
      </div>
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {statusFilters.map((s) => {
          const active = activeStatus === s.key;
          const count =
            s.key === "all"
              ? mockData.length
              : mockData.filter((r) => r.status === s.key).length;
          return (
            <button
              key={s.key}
              onClick={() => setActiveStatus(s.key)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border transition-colors",
                active
                  ? "border-gray-300 bg-gray-100 font-medium text-gray-800"
                  : "border-transparent text-gray-500 hover:bg-gray-100",
              )}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: s.color }}
              />
              {s.label}
              <span className="text-xs text-gray-400 font-normal">{count}</span>
            </button>
          );
        })}
      </div>

      <TableContainer component={Paper}>
        <Table>
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
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openFile(extras[row.id]);
                          }}
                          className="flex items-center gap-1 px-2 py-1 text-xs text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          <VisibilityIcon fontSize="inherit" />
                          Посмотреть
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="grid gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditTarget(row.id);
                          }}
                          title="Редактировать"
                          className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          <EditIcon fontSize="inherit" />
                          Править
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`/history/${row.id}`, "_blank");
                          }}
                          title="История"
                          className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          <HistoryIcon fontSize="inherit" />
                          История
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
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
        />
      </TableContainer>

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
