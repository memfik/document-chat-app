"use client";

import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { InfoModal } from "@/app/components/InfoModal";
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
import { cn } from "@/lib/utils";

const mockData = [
  {
    id: "ЗАЯ-2025-001",
    initiator: "Петров А.В.",
    dept: "Отдел снабжения",
    supplier: "ТОО «ТехСнаб»",
    contractNum: "ДГ-2025-014",
    deliveryDate: "25.01.2025",
    cost: "450 000",
    paymentDate: "30.01.2025",
    executor: "Иванов С.К.",
  },
  {
    id: "ЗАЯ-2025-002",
    initiator: "Смирнова О.Н.",
    dept: "IT-департамент",
    supplier: "ИП Козлов Р.Д.",
    contractNum: "ДГ-2025-021",
    deliveryDate: "01.02.2025",
    cost: "120 000",
    paymentDate: "05.02.2025",
    executor: "Козлов Р.Д.",
  },
  {
    id: "ЗАЯ-2025-003",
    initiator: "Жуков Е.П.",
    dept: "АХО",
    supplier: "АО «СтройГрупп»",
    contractNum: "ДГ-2025-033",
    deliveryDate: "10.02.2025",
    cost: "1 800 000",
    paymentDate: "15.02.2025",
    executor: "Титов М.А.",
  },
  {
    id: "ЗАЯ-2025-004",
    initiator: "Белова К.С.",
    dept: "Бухгалтерия",
    supplier: "ТОО «КанцОптТорг»",
    contractNum: "ДГ-2025-041",
    deliveryDate: "14.02.2025",
    cost: "35 000",
    paymentDate: "18.02.2025",
    executor: "Морозов Д.В.",
  },
  {
    id: "ЗАЯ-2025-005",
    initiator: "Новиков Г.Р.",
    dept: "Безопасность",
    supplier: "SecureIT Ltd.",
    contractNum: "ДГ-2025-047",
    deliveryDate: "20.02.2025",
    cost: "680 000",
    paymentDate: "25.02.2025",
    executor: "Фёдоров А.Л.",
  },
  {
    id: "ЗАЯ-2025-006",
    initiator: "Лебедева Т.И.",
    dept: "Транспортный отдел",
    supplier: "АО «АвтоПарк»",
    contractNum: "ДГ-2025-055",
    deliveryDate: "01.03.2025",
    cost: "980 000",
    paymentDate: "05.03.2025",
    executor: "Орлов В.Н.",
  },
  {
    id: "ЗАЯ-2025-007",
    initiator: "Кузнецов И.В.",
    dept: "IT-департамент",
    supplier: "ServerPro GmbH",
    contractNum: "ДГ-2025-063",
    deliveryDate: "10.03.2025",
    cost: "2 150 000",
    paymentDate: "15.03.2025",
    executor: "Попов С.Е.",
  },
  {
    id: "ЗАЯ-2025-008",
    initiator: "Соколова М.Д.",
    dept: "Юридический отдел",
    supplier: "ТОО «ЮрКонсалт»",
    contractNum: "ДГ-2025-062",
    deliveryDate: "12.03.2025",
    cost: "300 000",
    paymentDate: "17.03.2025",
    executor: "Васильев Н.О.",
  },
  {
    id: "ЗАЯ-2025-009",
    initiator: "Григорьев П.А.",
    dept: "Строительный отдел",
    supplier: "АО «МонтажКомплекс»",
    contractNum: "ДГ-2025-071",
    deliveryDate: "20.03.2025",
    cost: "2 450 000",
    paymentDate: "25.03.2025",
    executor: "Яковлев Б.С.",
  },
  {
    id: "ЗАЯ-2025-010",
    initiator: "Захарова Л.Н.",
    dept: "Отдел кадров",
    supplier: "ТОО «СпецОдежда KZ»",
    contractNum: "ДГ-2025-079",
    deliveryDate: "28.03.2025",
    cost: "210 000",
    paymentDate: "02.04.2025",
    executor: "Степанов К.Р.",
  },
];

export default function AccompanimentPage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentYearOnly, setCurrentYearOnly] = useState(false);
  const [selectedRow, setSelectedRow] = useState<(typeof mockData)[0] | null>(null);

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

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f1f5f9" }}>
            <TableRow>
              <TableCell>
                <b>№ заявки</b>
              </TableCell>
              <TableCell>
                <b>Инициатор</b>
              </TableCell>
              <TableCell>
                <b>Деп. иниц.</b>
              </TableCell>
              <TableCell>
                <b>Поставщик</b>
              </TableCell>
              <TableCell>
                <b>№ договора</b>
              </TableCell>
              <TableCell>
                <b>Дата поставки</b>
              </TableCell>
              <TableCell>
                <b>Стоимость</b>
              </TableCell>
              <TableCell>
                <b>Дата оплаты</b>
              </TableCell>
              <TableCell>
                <b>Исполнитель</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id} hover onClick={() => setSelectedRow(row)} className="cursor-pointer">
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.initiator}</TableCell>
                  <TableCell>{row.dept}</TableCell>
                  <TableCell>{row.supplier}</TableCell>
                  <TableCell>{row.contractNum}</TableCell>
                  <TableCell>{row.deliveryDate}</TableCell>
                  <TableCell>{row.cost}</TableCell>
                  <TableCell>{row.paymentDate}</TableCell>
                  <TableCell>{row.executor}</TableCell>
                </TableRow>
              ))}
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
            { label: "Инициатор", value: selectedRow.initiator },
            { label: "Деп. инициатора", value: selectedRow.dept },
            { label: "Поставщик", value: selectedRow.supplier },
            { label: "№ договора", value: selectedRow.contractNum },
            { label: "Дата поставки", value: selectedRow.deliveryDate },
            { label: "Стоимость", value: selectedRow.cost },
            { label: "Дата оплаты", value: selectedRow.paymentDate },
            { label: "Исполнитель", value: selectedRow.executor },
          ]}
        />
      )}
    </div>
  );
}
