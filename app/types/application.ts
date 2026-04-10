export interface ApplicationRow {
  id: string;
  date: string;
  initiator: string;
  type: string;
  description: string;
  cost: string;
  currency: string;
  contractNum: string;
  executor: string;
  status: string;
  contract: string;
  updatedAt: string;
  article: string;
  znoNum: string;
}

export interface StatusFilter {
  key: string;
  label: string;
  color: string;
}
