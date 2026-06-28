"use client";

import { useEffect, useMemo, useState } from "react";
import { emptyBudgetData } from "@/data/mockData";
import { BudgetData, BudgetSettings, Transaction } from "@/types/budget";
import { calculateBudget, normalizeSettings } from "@/utils/budget";

const STORAGE_KEY = "warm-budget-data-v1";

function readStoredData(): BudgetData {
  if (typeof window === "undefined") return emptyBudgetData;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyBudgetData;
    const parsed = JSON.parse(raw) as BudgetData;

    return {
      settings: normalizeSettings(parsed.settings ?? emptyBudgetData.settings),
      transactions: Array.isArray(parsed.transactions) ? parsed.transactions : []
    };
  } catch {
    return emptyBudgetData;
  }
}

export function useBudgetStore() {
  const [data, setData] = useState<BudgetData>(emptyBudgetData);
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

  function resetData() {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    setData(emptyBudgetData);
  }

  return {
    data,
    summary,
    ready,
    addTransaction,
    saveSettings,
    resetData
  };
}
