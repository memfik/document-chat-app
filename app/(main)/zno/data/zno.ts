import type { StatusFilterOption } from "@/app/components/StatusFilterBar";

export interface ZnoRow {
  id: string;
  payBefore: string;
  initiator: string;
  type: string;
  counterparty: string;
  amount: string;
  currency: string;
  contractNum: string;
  executor: string;
  status: string;
  updatedAt: string;
}

export const ZNO_STATUS_FILTERS: StatusFilterOption[] = [
  { key: "all", label: "Все", color: "#6b7280" },
  { key: "in_progress", label: "В работе", color: "#3b82f6" },
  { key: "not_in_progress", label: "Не в работе", color: "#f59e0b" },
  { key: "done", label: "Согласовано", color: "#22c55e" },
  { key: "rejected", label: "Отказано", color: "#ef4444" },
  { key: "returned", label: "Возвращено", color: "#94a3b8" },
];

export const ZNO_DATA: ZnoRow[] = [
  {
    id: "ZNO-2025-001",
    payBefore: "20.01.2025",
    initiator: "Петров А.В.",
    type: "Закупка",
    counterparty: "ТОО «ТехСнаб»",
    amount: "450 000",
    currency: "KZT",
    contractNum: "CON-2025-014",
    executor: "Иванов С.К.",
    status: "in_progress",
    updatedAt: "15.01.2025 09:12",
  },
  {
    id: "ZNO-2025-002",
    payBefore: "25.01.2025",
    initiator: "Смирнова О.Н.",
    type: "Услуги",
    counterparty: "ИП Козлов Р.Д.",
    amount: "120 000",
    currency: "KZT",
    contractNum: "CON-2025-021",
    executor: "Козлов Р.Д.",
    status: "rejected",
    updatedAt: "16.01.2025 14:30",
  },
  {
    id: "ZNO-2025-003",
    payBefore: "01.02.2025",
    initiator: "Жуков Е.П.",
    type: "Строительство",
    counterparty: "АО «СтройГрупп»",
    amount: "1 800 000",
    currency: "KZT",
    contractNum: "CON-2025-033",
    executor: "Титов М.А.",
    status: "done",
    updatedAt: "28.01.2025 11:05",
  },
  {
    id: "ZNO-2025-004",
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
    id: "ZNO-2025-005",
    payBefore: "15.02.2025",
    initiator: "Новиков Г.Р.",
    type: "Услуги",
    counterparty: "SecureIT Ltd.",
    amount: "5 200",
    currency: "USD",
    contractNum: "CON-2025-047",
    executor: "Фёдоров А.Л.",
    status: "in_progress",
    updatedAt: "12.02.2025 16:20",
  },
  {
    id: "ZNO-2025-006",
    payBefore: "20.02.2025",
    initiator: "Лебедева Т.И.",
    type: "Аренда",
    counterparty: "АО «АвтоПарк»",
    amount: "980 000",
    currency: "KZT",
    contractNum: "CON-2025-055",
    executor: "Орлов В.Н.",
    status: "done",
    updatedAt: "20.02.2025 10:15",
  },
  {
    id: "ZNO-2025-007",
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
    id: "ZNO-2025-008",
    payBefore: "05.03.2025",
    initiator: "Соколова М.Д.",
    type: "Услуги",
    counterparty: "ТОО «ЮрКонсалт»",
    amount: "300 000",
    currency: "KZT",
    contractNum: "CON-2025-062",
    executor: "Васильев Н.О.",
    status: "in_progress",
    updatedAt: "06.03.2025 09:00",
  },
  {
    id: "ZNO-2025-009",
    payBefore: "12.03.2025",
    initiator: "Григорьев П.А.",
    type: "Строительство",
    counterparty: "АО «МонтажКомплекс»",
    amount: "2 450 000",
    currency: "KZT",
    contractNum: "CON-2025-071",
    executor: "Яковлев Б.С.",
    status: "returned",
    updatedAt: "10.03.2025 17:22",
  },
  {
    id: "ZNO-2025-010",
    payBefore: "20.03.2025",
    initiator: "Захарова Л.Н.",
    type: "Закупка",
    counterparty: "ТОО «СпецОдежда KZ»",
    amount: "210 000",
    currency: "KZT",
    contractNum: "CON-2025-079",
    executor: "Степанов К.Р.",
    status: "done",
    updatedAt: "15.03.2025 12:40",
  },
];
