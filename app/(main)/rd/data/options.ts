export interface SpecRow {
  id: number;
  description: string;
  qty: string;
  price: string;
}

export interface FormData {
  contract: string;
  description: string;
  initiator: string;
  createdAt: string;
  costCenter: string;
  project: string;
  article: string;
  rows: SpecRow[];
}

export const contractOptions = [
  "ДГ-2025-014",
  "ДГ-2025-021",
  "ДГ-2025-033",
  "ДГ-2025-047",
];

export const costCenterOptions = [
  "ЦЗ-001 Головной офис",
  "ЦЗ-002 Производство",
  "ЦЗ-003 Логистика",
];

export const projectOptions = ["Проект Альфа", "Проект Бета", "Проект Гамма"];

export const articleOptions = [
  "Ст. 44 Закупки",
  "Ст. 46 Услуги",
  "Ст. 48 Строительство",
  "Ст. 50 ИТ",
];

export const initialData: FormData = {
  contract: "ДГ-2025-014",
  description: "Поставка офисной техники и расходных материалов",
  initiator: "Петров А.В.",
  createdAt: "12.01.2025",
  costCenter: "ЦЗ-001 Головной офис",
  project: "Проект Альфа",
  article: "Ст. 44 Закупки",
  rows: [
    { id: 1, description: "Ноутбук Lenovo ThinkPad", qty: "5", price: "250000" },
    { id: 2, description: 'Монитор 27" Samsung', qty: "5", price: "80000" },
    { id: 3, description: "Мышь беспроводная", qty: "10", price: "5000" },
  ],
};

export function calcRowSum(row: SpecRow): number {
  return (parseFloat(row.qty) || 0) * (parseFloat(row.price) || 0);
}

export function calcTotal(rows: SpecRow[]): number {
  return rows.reduce((acc, r) => acc + calcRowSum(r), 0);
}

export function formatNumber(n: number): string {
  return n.toLocaleString("ru-RU", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}
