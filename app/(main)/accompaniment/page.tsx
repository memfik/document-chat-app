"use client";

import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
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
  IconButton,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";

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
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [currentYearOnly, setCurrentYearOnly] = useState(false);

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

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
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
                <TableRow key={row.id} hover>
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
