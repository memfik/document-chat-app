"use client";

import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { cn } from "@/lib/utils";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  CircularProgress,
} from "@mui/material";

const statusFilters = [
  { key: "all", label: "Все", color: "#6b7280", showButton: true },
  { key: "in_progress", label: "В работе", color: "#3b82f6", showButton: true },
  {
    key: "not_in_progress",
    label: "Не в работе",
    color: "#f59e0b",
    showButton: false,
  },
  { key: "done", label: "Согласовано", color: "#22c55e", showButton: true },
  { key: "rejected", label: "Отказано", color: "#ef4444", showButton: true },
  { key: "returned", label: "Возвращено", color: "#94a3b8", showButton: false },
];

const mockData = [
  {
    id: "ЗНО-2025-001",
    payBefore: "20.01.2025",
    initiator: "Петров А.В.",
    type: "Закупка",
    counterparty: "ТОО «ТехСнаб»",
    amount: "450 000",
    currency: "KZT",
    contractNum: "ДГ-2025-014",
    executor: "Иванов С.К.",
    status: "in_progress",
    updatedAt: "15.01.2025 09:12",
  },
  {
    id: "ЗНО-2025-002",
    payBefore: "25.01.2025",
    initiator: "Смирнова О.Н.",
    type: "Услуги",
    counterparty: "ИП Козлов Р.Д.",
    amount: "120 000",
    currency: "KZT",
    contractNum: "ДГ-2025-021",
    executor: "Козлов Р.Д.",
    status: "rejected",
    updatedAt: "16.01.2025 14:30",
  },
  {
    id: "ЗНО-2025-003",
    payBefore: "01.02.2025",
    initiator: "Жуков Е.П.",
    type: "Строительство",
    counterparty: "АО «СтройГрупп»",
    amount: "1 800 000",
    currency: "KZT",
    contractNum: "ДГ-2025-033",
    executor: "Титов М.А.",
    status: "done",
    updatedAt: "28.01.2025 11:05",
  },
  {
    id: "ЗНО-2025-004",
    payBefore: "10.02.2025",
    initiator: "Белова К.С.",
    type: "Закупка",
    counterparty: "ТОО «КанцОптТорг»",
    amount: "35 000",
    currency: "KZT",
    contractNum: "—",
    executor: "Морозов Д.В.",
    status: "rejected",
    updatedAt: "04.02.2025 08:44",
  },
  {
    id: "ЗНО-2025-005",
    payBefore: "15.02.2025",
    initiator: "Новиков Г.Р.",
    type: "Услуги",
    counterparty: "SecureIT Ltd.",
    amount: "5 200",
    currency: "USD",
    contractNum: "ДГ-2025-047",
    executor: "Фёдоров А.Л.",
    status: "in_progress",
    updatedAt: "12.02.2025 16:20",
  },
  {
    id: "ЗНО-2025-006",
    payBefore: "20.02.2025",
    initiator: "Лебедева Т.И.",
    type: "Аренда",
    counterparty: "АО «АвтоПарк»",
    amount: "980 000",
    currency: "KZT",
    contractNum: "ДГ-2025-055",
    executor: "Орлов В.Н.",
    status: "done",
    updatedAt: "20.02.2025 10:15",
  },
  {
    id: "ЗНО-2025-007",
    payBefore: "28.02.2025",
    initiator: "Кузнецов И.В.",
    type: "Закупка",
    counterparty: "ServerPro GmbH",
    amount: "18 500",
    currency: "EUR",
    contractNum: "—",
    executor: "Попов С.Е.",
    status: "not_in_progress",
    updatedAt: "26.02.2025 13:50",
  },
  {
    id: "ЗНО-2025-008",
    payBefore: "05.03.2025",
    initiator: "Соколова М.Д.",
    type: "Услуги",
    counterparty: "ТОО «ЮрКонсалт»",
    amount: "300 000",
    currency: "KZT",
    contractNum: "ДГ-2025-062",
    executor: "Васильев Н.О.",
    status: "in_progress",
    updatedAt: "06.03.2025 09:00",
  },
  {
    id: "ЗНО-2025-009",
    payBefore: "12.03.2025",
    initiator: "Григорьев П.А.",
    type: "Строительство",
    counterparty: "АО «МонтажКомплекс»",
    amount: "2 450 000",
    currency: "KZT",
    contractNum: "ДГ-2025-071",
    executor: "Яковлев Б.С.",
    status: "returned",
    updatedAt: "10.03.2025 17:22",
  },
  {
    id: "ЗНО-2025-010",
    payBefore: "20.03.2025",
    initiator: "Захарова Л.Н.",
    type: "Закупка",
    counterparty: "ТОО «СпецОдежда KZ»",
    amount: "210 000",
    currency: "KZT",
    contractNum: "ДГ-2025-079",
    executor: "Степанов К.Р.",
    status: "done",
    updatedAt: "15.03.2025 12:40",
  },
];

export default function ZnoPage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("all");
  const [currentYearOnly, setCurrentYearOnly] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  useEffect(() => {
    setTimeout(() => setLoading(false), 400);
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
        {statusFilters
          .filter((s) => s.showButton)
          .map((s) => {
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
                <span className="text-xs text-gray-400 font-normal">
                  {count}
                </span>
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
                <b>Оплатить до</b>
              </TableCell>
              <TableCell>
                <b>Инициатор</b>
              </TableCell>
              <TableCell>
                <b>Тип</b>
              </TableCell>
              <TableCell>
                <b>Контрагент</b>
              </TableCell>
              <TableCell>
                <b>Сумма</b>
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
                <b>Изменено</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const status = statusFilters.find((s) => s.key === row.status);
                return (
                  <TableRow key={row.id} hover>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.payBefore}</TableCell>
                    <TableCell>{row.initiator}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.counterparty}</TableCell>
                    <TableCell>{row.amount}</TableCell>
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
                    <TableCell>{row.updatedAt}</TableCell>
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
    </div>
  );
}
