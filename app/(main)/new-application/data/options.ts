export const REQUEST_TYPES = [
  "Закупка товаров",
  "Закупка услуг",
  "Строительство",
  "Аренда",
  "Прочее",
];

export const COST_CENTERS = [
  "ЦЗ-001 Головной офис",
  "ЦЗ-002 Производство",
  "ЦЗ-003 Логистика",
];

export const CURATORS = [
  "Иванов С.К.",
  "Козлов Р.Д.",
  "Петров А.В.",
  "Смирнова О.Н.",
];

export const APPROVERS = [
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

export const PROJECTS = ["Проект Альфа", "Проект Бета", "Проект Гамма", "—"];

export const ARTICLES = [
  "Ст. 44 Закупки",
  "Ст. 46 Услуги",
  "Ст. 48 Строительство",
  "Ст. 50 ИТ",
];

export const LOCATIONS = ["Алматы", "Астана", "Шымкент", "Атырау", "Актобе"];

export const ED_GO_LIST = [
  "Ахметов Д.С.",
  "Байжанов Р.Т.",
  "Гусев В.Н.",
  "Джаксыбеков А.К.",
  "Есенова М.Б.",
  "Жумабеков С.А.",
  "Ким О.В.",
];

export const VAT_RATE = 0.12;

export const STEPS = [
  "Обоснование закупа",
  "Позиции заявки",
  "Согласование",
  "Вложения",
];

export interface Position {
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

export interface Attachments {
  spec: File | null;
  extra: File | null;
  contract: File | null;
}

export const emptyPosition = (id: number): Position => ({
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

export const priceWithVat = (p: Position) =>
  (parseFloat(p.priceNoVat) || 0) * (1 + VAT_RATE);

export const fmt = (n: number) =>
  n.toLocaleString("ru-RU", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
