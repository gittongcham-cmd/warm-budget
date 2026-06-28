export type CategoryKey =
  | "food"
  | "cafe"
  | "transport"
  | "shopping"
  | "living"
  | "health"
  | "culture"
  | "etc";

export type PaymentMethod = "card" | "cash" | "bank" | "pay";

export type BudgetStatus = "안정" | "주의" | "위험" | "초과";

export type Transaction = {
  id: string;
  amount: number;
  category: CategoryKey;
  date: string;
  memo: string;
  paymentMethod: PaymentMethod;
};

export type BudgetSettings = {
  monthlyIncome: number;
  targetSpending: number;
  categoryBudgets: Record<CategoryKey, number>;
};

export type BudgetData = {
  settings: BudgetSettings;
  monthlySettings?: Record<string, BudgetSettings>;
  transactions: Transaction[];
};

export type CategoryMeta = {
  key: CategoryKey;
  label: string;
  emoji: string;
  color: string;
};
