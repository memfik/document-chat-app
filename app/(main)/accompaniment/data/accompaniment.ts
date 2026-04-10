export interface AccompanimentRow {
  id: string;
  initiator: string;
  dept: string;
  supplier: string;
  contractNum: string;
  deliveryDate: string;
  cost: string;
  paymentDate: string;
  executor: string;
}

export const ACC_DATA: AccompanimentRow[] = [
  {
    id: "ACC-2025-001",
    initiator: "Петров А.В.",
    dept: "Отдел снабжения",
    supplier: "ТОО «ТехСнаб»",
    contractNum: "CON-2025-014",
    deliveryDate: "25.01.2025",
    cost: "450 000",
    paymentDate: "30.01.2025",
    executor: "Иванов С.К.",
  },
  {
    id: "ACC-2025-002",
    initiator: "Смирнова О.Н.",
    dept: "IT-департамент",
    supplier: "ИП Козлов Р.Д.",
    contractNum: "CON-2025-021",
    deliveryDate: "01.02.2025",
    cost: "120 000",
    paymentDate: "05.02.2025",
    executor: "Козлов Р.Д.",
  },
  {
    id: "ACC-2025-003",
    initiator: "Жуков Е.П.",
    dept: "АХО",
    supplier: "АО «СтройГрупп»",
    contractNum: "CON-2025-033",
    deliveryDate: "10.02.2025",
    cost: "1 800 000",
    paymentDate: "15.02.2025",
    executor: "Титов М.А.",
  },
  {
    id: "ACC-2025-004",
    initiator: "Белова К.С.",
    dept: "Бухгалтерия",
    supplier: "ТОО «КанцОптТорг»",
    contractNum: "CON-2025-041",
    deliveryDate: "14.02.2025",
    cost: "35 000",
    paymentDate: "18.02.2025",
    executor: "Морозов Д.В.",
  },
  {
    id: "ACC-2025-005",
    initiator: "Новиков Г.Р.",
    dept: "Безопасность",
    supplier: "SecureIT Ltd.",
    contractNum: "CON-2025-047",
    deliveryDate: "20.02.2025",
    cost: "680 000",
    paymentDate: "25.02.2025",
    executor: "Фёдоров А.Л.",
  },
  {
    id: "ACC-2025-006",
    initiator: "Лебедева Т.И.",
    dept: "Транспортный отдел",
    supplier: "АО «АвтоПарк»",
    contractNum: "CON-2025-055",
    deliveryDate: "01.03.2025",
    cost: "980 000",
    paymentDate: "05.03.2025",
    executor: "Орлов В.Н.",
  },
  {
    id: "ACC-2025-007",
    initiator: "Кузнецов И.В.",
    dept: "IT-департамент",
    supplier: "ServerPro GmbH",
    contractNum: "CON-2025-063",
    deliveryDate: "10.03.2025",
    cost: "2 150 000",
    paymentDate: "15.03.2025",
    executor: "Попов С.Е.",
  },
  {
    id: "ACC-2025-008",
    initiator: "Соколова М.Д.",
    dept: "Юридический отдел",
    supplier: "ТОО «ЮрКонсалт»",
    contractNum: "CON-2025-062",
    deliveryDate: "12.03.2025",
    cost: "300 000",
    paymentDate: "17.03.2025",
    executor: "Васильев Н.О.",
  },
  {
    id: "ACC-2025-009",
    initiator: "Григорьев П.А.",
    dept: "Строительный отдел",
    supplier: "АО «МонтажКомплекс»",
    contractNum: "CON-2025-071",
    deliveryDate: "20.03.2025",
    cost: "2 450 000",
    paymentDate: "25.03.2025",
    executor: "Яковлев Б.С.",
  },
  {
    id: "ACC-2025-010",
    initiator: "Захарова Л.Н.",
    dept: "Отдел кадров",
    supplier: "ТОО «СпецОдежда KZ»",
    contractNum: "CON-2025-079",
    deliveryDate: "28.03.2025",
    cost: "210 000",
    paymentDate: "02.04.2025",
    executor: "Степанов К.Р.",
  },
];
