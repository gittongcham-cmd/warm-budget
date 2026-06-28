"use client";

import { useEffect, useMemo, useState } from "react";
import { emptyBudgetData } from "@/data/mockData";
import { BudgetData, BudgetSettings, Transaction } from "@/types/budget";
import { calculateBudget, getCurrentMonthKey, getDateFromMonthKey, normalizeSettings, shiftMonthKey } from "@/utils/budget";

const STORAGE_KEY = "warm-budget-data-v2";

function readStoredData(): BudgetData {
  if (typeof window === "undefined") return emptyBudgetData;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyBudgetData;
    const parsed = JSON.parse(raw) as BudgetData;

    const settings = normalizeSettings(parsed.settings ?? emptyBudgetData.settings);
    const currentMonthKey = getCurrentMonthKey();
    const parsedMonthlySettings = parsed.monthlySettings ?? {};
    const monthlySettings = Object.fromEntries(
      Object.entries(parsedMonthlySettings).map(([monthKey, monthSettings]) => [
        monthKey,
        normalizeSettings(monthSettings as BudgetSettings)
      ])
    );

    if (!monthlySettings[currentMonthKey]) {
      monthlySettings[currentMonthKey] = settings;
    }

    return {
      settings: monthlySettings[currentMonthKey],
      monthlySettings,
      transactions: Array.isArray(parsed.transactions) ? parsed.transactions : []
    };
  } catch {
    return emptyBudgetData;
  }
}

export function useBudgetStore() {
  const [data, setData] = useState<BudgetData>(emptyBudgetData);
  const [selectedMonthKey, setSelectedMonthKey] = useState(getCurrentMonthKey());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setData(readStoredData());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data, ready]);

  const selectedSettings = useMemo(
    () => data.monthlySettings?.[selectedMonthKey] ?? emptyBudgetData.settings,
    [data.monthlySettings, selectedMonthKey]
  );
  const selectedData = useMemo(
    () => ({
      ...data,
      settings: selectedSettings
    }),
    [data, selectedSettings]
  );
  const selectedMonthDate = useMemo(() => getDateFromMonthKey(selectedMonthKey), [selectedMonthKey]);
  const summary = useMemo(() => calculateBudget(selectedData, selectedMonthDate), [selectedData, selectedMonthDate]);

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
    const normalized = normalizeSettings(settings);

    setData((current) => ({
      ...current,
      settings: normalized,
      monthlySettings: {
        ...(current.monthlySettings ?? {}),
        [selectedMonthKey]: normalized
      }
    }));
  }

  function copyPreviousMonthSettings() {
    const previousMonthKey = shiftMonthKey(selectedMonthKey, -1);
    const previousSettings = data.monthlySettings?.[previousMonthKey];
    if (!previousSettings) return;
    saveSettings(previousSettings);
  }

  function resetData() {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    setData(emptyBudgetData);
  }

  return {
    data: selectedData,
    summary,
    ready,
    selectedMonthKey,
    setSelectedMonthKey,
    goToPreviousMonth: () => setSelectedMonthKey((current) => shiftMonthKey(current, -1)),
    goToNextMonth: () => setSelectedMonthKey((current) => shiftMonthKey(current, 1)),
    addTransaction,
    saveSettings,
    copyPreviousMonthSettings,
    hasPreviousMonthSettings: Boolean(data.monthlySettings?.[shiftMonthKey(selectedMonthKey, -1)]),
    resetData
  };
}
