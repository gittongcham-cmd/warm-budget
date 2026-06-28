import { BudgetData, CategoryMeta, CategoryKey, PaymentMethod } from "@/types/budget";

export const categories: CategoryMeta[] = [
  { key: "food", label: "식비", color: "#ef8d48" },
  { key: "cafe", label: "카페", color: "#caa25c" },
  { key: "transport", label: "교통", color: "#6f8a54" },
  { key: "shopping", label: "쇼핑", color: "#a85d57" },
  { key: "living", label: "생활", color: "#5f7f96" },
  { key: "health", label: "건강", color: "#9a7857" },
  { key: "culture", label: "문화", color: "#8f6bb1" },
  { key: "etc", label: "기타", color: "#8c8378" }
];

export const paymentMethods: { key: PaymentMethod; label: string }[] = [
  { key: "card", label: "카드" },
  { key: "cash", label: "현금" },
  { key: "bank", label: "계좌이체" },
  { key: "pay", label: "간편결제" }
];

const today = new Date();
const y = today.getFullYear();
const m = String(today.getMonth() + 1).padStart(2, "0");

export const defaultCategoryBudgets: Record<CategoryKey, number> = {
  food: 520000,
  cafe: 140000,
  transport: 120000,
  shopping: 240000,
  living: 260000,
  health: 110000,
  culture: 160000,
  etc: 150000
};

export const emptyCategoryBudgets: Record<CategoryKey, number> = {
  food: 0,
  cafe: 0,
  transport: 0,
  shopping: 0,
  living: 0,
  health: 0,
  culture: 0,
  etc: 0
};

export const emptyBudgetData: BudgetData = {
  settings: {
    monthlyIncome: 0,
    targetSpending: 0,
    categoryBudgets: emptyCategoryBudgets
  },
  monthlySettings: {},
  transactions: []
};

export const mockBudgetData: BudgetData = {
  settings: {
    monthlyIncome: 3600000,
    targetSpending: 1700000,
    categoryBudgets: defaultCategoryBudgets
  },
  monthlySettings: {},
  transactions: [
    {
      id: "mock-1",
      amount: 42800,
      category: "food",
      date: `${y}-${m}-03`,
      memo: "장보기",
      paymentMethod: "card"
    },
    {
      id: "mock-2",
      amount: 5600,
      category: "cafe",
      date: `${y}-${m}-04`,
      memo: "라떼",
      paymentMethod: "pay"
    },
    {
      id: "mock-3",
      amount: 98000,
      category: "shopping",
      date: `${y}-${m}-07`,
      memo: "셔츠와 양말",
      paymentMethod: "card"
    },
    {
      id: "mock-4",
      amount: 65000,
      category: "living",
      date: `${y}-${m}-09`,
      memo: "세제, 휴지",
      paymentMethod: "card"
    },
    {
      id: "mock-5",
      amount: 1250,
      category: "transport",
      date: `${y}-${m}-11`,
      memo: "지하철",
      paymentMethod: "card"
    },
    {
      id: "mock-6",
      amount: 42000,
      category: "culture",
      date: `${y}-${m}-14`,
      memo: "영화와 팝콘",
      paymentMethod: "pay"
    },
    {
      id: "mock-7",
      amount: 78000,
      category: "health",
      date: `${y}-${m}-18`,
      memo: "필라테스",
      paymentMethod: "bank"
    },
    {
      id: "mock-8",
      amount: 32500,
      category: "food",
      date: `${y}-${m}-20`,
      memo: "저녁 외식",
      paymentMethod: "card"
    },
    {
      id: "mock-9",
      amount: 17300,
      category: "etc",
      date: `${y}-${m}-22`,
      memo: "문구류",
      paymentMethod: "cash"
    }
  ]
};
