import { categories } from "@/data/mockData";
import { BudgetData, BudgetSettings, BudgetStatus, CategoryKey, Transaction } from "@/types/budget";

export const currency = new Intl.NumberFormat("ko-KR", {
  style: "currency",
  currency: "KRW",
  maximumFractionDigits: 0
});

export function formatCurrency(value: number) {
  return currency.format(Math.round(value));
}

export function parseMoneyInput(value: string) {
  return Number(value.replace(/[^\d]/g, "")) || 0;
}

export function formatMoneyInput(value: number | string) {
  const numericValue = typeof value === "number" ? value : parseMoneyInput(value);
  if (!numericValue) return "";
  return new Intl.NumberFormat("ko-KR").format(numericValue);
}

export function getCurrentMonthKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export function getPreviousMonthKey(date = new Date()) {
  return getCurrentMonthKey(new Date(date.getFullYear(), date.getMonth() - 1, 1));
}

export function getMonthLabel(monthKey: string) {
  const [year, month] = monthKey.split("-");
  return `${year}년 ${Number(month)}월`;
}

export function isCurrentMonth(dateString: string, now = new Date()) {
  return dateString.startsWith(getCurrentMonthKey(now));
}

export function getRemainingDays(date = new Date()) {
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  return Math.max(lastDay - date.getDate() + 1, 1);
}

export function getBudgetStatus(rate: number): BudgetStatus {
  if (rate >= 100) return "초과";
  if (rate >= 90) return "위험";
  if (rate >= 70) return "주의";
  return "안정";
}

export function getStatusTone(status: BudgetStatus) {
  const tones: Record<BudgetStatus, string> = {
    안정: "bg-moss/15 text-moss",
    주의: "bg-[#f4b44b]/20 text-[#9a6a10]",
    위험: "bg-persimmon/20 text-clay",
    초과: "bg-rosewood/15 text-rosewood"
  };

  return tones[status];
}

export function getMonthlyTransactions(transactions: Transaction[], now = new Date()) {
  const monthKey = getCurrentMonthKey(now);
  return transactions.filter((transaction) => transaction.date.startsWith(monthKey));
}

export function getTotalSpending(transactions: Transaction[]) {
  return transactions.reduce((total, transaction) => total + transaction.amount, 0);
}

export function getCategorySpending(transactions: Transaction[]) {
  return categories.reduce<Record<CategoryKey, number>>((acc, category) => {
    acc[category.key] = transactions
      .filter((transaction) => transaction.category === category.key)
      .reduce((sum, transaction) => sum + transaction.amount, 0);
    return acc;
  }, {} as Record<CategoryKey, number>);
}

export function calculateBudget(data: BudgetData, now = new Date()) {
  const monthKey = getCurrentMonthKey(now);
  const settings = data.monthlySettings?.[monthKey] ?? data.settings;
  const monthlyTransactions = getMonthlyTransactions(data.transactions, now);
  const totalSpending = getTotalSpending(monthlyTransactions);
  const remainingBudget = settings.targetSpending - totalSpending;
  const usageRate = settings.targetSpending > 0 ? (totalSpending / settings.targetSpending) * 100 : 0;
  const dailyAvailable = Math.max(remainingBudget, 0) / getRemainingDays(now);
  const expectedSavings = settings.monthlyIncome - settings.targetSpending;
  const categorySpending = getCategorySpending(monthlyTransactions);
  const categorySummary = categories.map((category) => {
    const spent = categorySpending[category.key] ?? 0;
    const budget = settings.categoryBudgets[category.key] ?? 0;
    const rate = budget > 0 ? (spent / budget) * 100 : 0;

    return {
      ...category,
      spent,
      budget,
      rate,
      status: getBudgetStatus(rate)
    };
  });

  return {
    monthKey,
    settings,
    monthlyTransactions,
    totalSpending,
    remainingBudget,
    usageRate,
    dailyAvailable,
    expectedSavings,
    categorySpending,
    categorySummary,
    topCategories: [...categorySummary].sort((a, b) => b.spent - a.spent).slice(0, 5),
    recentTransactions: [...monthlyTransactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3),
    overallStatus: getBudgetStatus(usageRate)
  };
}

export function normalizeSettings(settings: BudgetSettings): BudgetSettings {
  return {
    monthlyIncome: Number(settings.monthlyIncome) || 0,
    targetSpending: Number(settings.targetSpending) || 0,
    categoryBudgets: categories.reduce<Record<CategoryKey, number>>((acc, category) => {
      acc[category.key] = Number(settings.categoryBudgets[category.key]) || 0;
      return acc;
    }, {} as Record<CategoryKey, number>)
  };
}
