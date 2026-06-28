"use client";

import { useEffect, useMemo, useState } from "react";
import { mockBudgetData } from "@/data/mockData";
import { BudgetData, BudgetSettings, Transaction } from "@/types/budget";
import { calculateBudget, normalizeSettings } from "@/utils/budget";

const STORAGE_KEY = "warm-budget-data-v1";

function readStoredData(): BudgetData {
  if (typeof window === "undefined") return mockBudgetData;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return mockBudgetData;
    const parsed = JSON.parse(raw) as BudgetData;

    return {
      settings: normalizeSettings(parsed.settings ?? mockBudgetData.settings),
      transactions: Array.isArray(parsed.transactions) ? parsed.transactions : mockBudgetData.transactions
    };
  } catch {
    return mockBudgetData;
  }
}

export function useBudgetStore() {
  const [data, setData] = useState<BudgetData>(mockBudgetData);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setData(readStoredData());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data, ready]);

  const summary = useMemo(() => calculateBudget(data), [data]);

  function addTransaction(transaction: Omit<Transaction, "id">) {
    setData((current) => ({
      ...current,
      transactions: [
        {
          ...transaction,
          amount: Number(transaction.amount) || 0,
          id: crypto.randomUUID()
        },
        ...current.transactions
      ]
    }));
  }

  function saveSettings(settings: BudgetSettings) {
    setData((current) => ({
      ...current,
      settings: normalizeSettings(settings)
    }));
  }

  function resetMockData() {
    setData(mockBudgetData);
  }

  return {
    data,
    summary,
    ready,
    addTransaction,
    saveSettings,
    resetMockData
  };
}
