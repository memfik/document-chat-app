"use client";

import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
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
    type: "Закупка",
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
    type: "Услуги",
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
    type: "Строительство",
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
    type: "Закупка",
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
    type: "Услуги",
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
    type: "Договор",
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
    type: "Закупка",
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
    type: "Услуги",
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
    type: "Строительство",
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
    type: "Закупка",
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
    type: "Закупка",
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
    type: "Услуги",
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
    type: "Строительство",
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
    type: "Закупка",
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
    type: "Услуги",
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
    type: "Договор",
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
    type: "Закупка",
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
    type: "Услуги",
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
    type: "Строительство",
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
    type: "Закупка",
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

export default function DocumentsPage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentYearOnly, setCurrentYearOnly] = useState(false);
  const [activeStatus, setActiveStatus] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRow, setSelectedRow] = useState<(typeof mockData)[0] | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, []);

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
            className="w-full pl-9 pr-9 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#f96800] transition-colors"
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
              : "bg-white border-gray-200 hover:bg-gray-100",
          )}
        >
          Только текущий год
        </button>
      </div>
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {statusFilters.map((s) => {
          const active = activeStatus === s.key;
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
            </button>
          );
        })}
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f1f5f9" }}>
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
                <b>Тип</b>
              </TableCell>
              <TableCell>
                <b>Описание</b>
              </TableCell>
              <TableCell>
                <b>Стоимость</b>
              </TableCell>
              <TableCell>
                <b>Валюта</b>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {mockData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const status = statusFilters.find((s) => s.key === row.status);
                return (
                  <TableRow key={row.id} hover onClick={() => setSelectedRow(row)} className="cursor-pointer">
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.initiator}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.cost}</TableCell>
                    <TableCell>{row.currency}</TableCell>
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
                    <TableCell>{row.znoNum}</TableCell>
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
          rowsPerPageOptions={[5, 10, 25, 50]}
          labelRowsPerPage="Строк на странице:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} из ${count}`
          }
        />
      </TableContainer>

      {selectedRow && (
        <InfoModal
          title={`Заявка ${selectedRow.id}`}
          onClose={() => setSelectedRow(null)}
          fields={[
            { label: "№ заявки", value: selectedRow.id },
            { label: "Дата поступления", value: selectedRow.date },
            { label: "Инициатор", value: selectedRow.initiator },
            { label: "Тип", value: selectedRow.type },
            { label: "Описание", value: selectedRow.description },
            { label: "Стоимость", value: `${selectedRow.cost} ${selectedRow.currency}` },
            { label: "№ договора", value: selectedRow.contractNum },
            { label: "Исполнитель", value: selectedRow.executor },
            { label: "Статус", value: statusFilters.find((s) => s.key === selectedRow.status)?.label },
            { label: "Договор", value: selectedRow.contract },
            { label: "Время изменения", value: selectedRow.updatedAt },
            { label: "Статья", value: selectedRow.article },
            { label: "№ ЗНО", value: selectedRow.znoNum },
          ]}
        />
      )}
    </div>
  );
}
