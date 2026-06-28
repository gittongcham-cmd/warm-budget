"use client";

import { FileText, Home, List, PlusCircle, RotateCcw, Settings } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { AddExpense } from "@/components/AddExpense";
import { BudgetSettings } from "@/components/BudgetSettings";
import { Dashboard } from "@/components/Dashboard";
import { MonthSwitcher } from "@/components/MonthSwitcher";
import { Reports } from "@/components/Reports";
import { Transactions } from "@/components/Transactions";
import { useBudgetStore } from "@/hooks/useBudgetStore";
import { getCurrentMonthKey } from "@/utils/budget";

type Tab = "home" | "add" | "transactions" | "reports" | "settings";

const tabs: { key: Tab; label: string; icon: ReactNode }[] = [
  { key: "home", label: "홈", icon: <Home size={20} /> },
  { key: "add", label: "추가", icon: <PlusCircle size={20} /> },
  { key: "transactions", label: "내역", icon: <List size={20} /> },
  { key: "reports", label: "리포트", icon: <FileText size={20} /> },
  { key: "settings", label: "예산", icon: <Settings size={20} /> }
];

export function AppShell() {
  const [tab, setTab] = useState<Tab>("home");
  const {
    data,
    selectedMonthKey,
    setSelectedMonthKey,
    goToPreviousMonth,
    goToNextMonth,
    addTransaction,
    saveSettings,
    copyPreviousMonthSettings,
    hasPreviousMonthSettings,
    resetData
  } = useBudgetStore();

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl bg-cream text-ink sm:my-6 sm:min-h-[calc(100vh-3rem)] sm:overflow-hidden sm:rounded-[2rem] sm:ring-1 sm:ring-clay/10">
      <MonthSwitcher
        monthKey={selectedMonthKey}
        onPrevious={goToPreviousMonth}
        onNext={goToNextMonth}
        onCurrent={() => setSelectedMonthKey(getCurrentMonthKey())}
      />
      {tab === "home" ? <Dashboard data={data} monthKey={selectedMonthKey} /> : null}
      {tab === "add" ? <AddExpense monthKey={selectedMonthKey} onAdd={(transaction) => { addTransaction(transaction); setTab("home"); }} /> : null}
      {tab === "transactions" ? <Transactions data={data} monthKey={selectedMonthKey} /> : null}
      {tab === "reports" ? <Reports data={data} monthKey={selectedMonthKey} /> : null}
      {tab === "settings" ? (
        <BudgetSettings
          monthKey={selectedMonthKey}
          settings={data.settings}
          canCopyPrevious={hasPreviousMonthSettings}
          onCopyPrevious={copyPreviousMonthSettings}
          onSave={(settings) => { saveSettings(settings); setTab("home"); }}
        />
      ) : null}

      <div className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-3xl border-t border-clay/10 bg-white/92 px-3 pb-3 pt-2 shadow-[0_-10px_30px_rgba(96,54,22,0.12)] backdrop-blur sm:bottom-6 sm:rounded-b-[2rem]">
        <nav className="grid grid-cols-5 gap-1">
          {tabs.map((item) => {
            const active = item.key === tab;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setTab(item.key)}
                className={`flex h-14 flex-col items-center justify-center gap-1 rounded-lg text-xs font-bold transition ${
                  active ? "bg-persimmon/18 text-clay" : "text-cocoa/55 hover:bg-cream"
                }`}
                aria-label={item.label}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
        <button type="button" onClick={resetData} className="mx-auto mt-1 flex items-center gap-1 text-[11px] font-bold text-cocoa/45">
          <RotateCcw size={12} />
          내 데이터 초기화
        </button>
      </div>
    </main>
  );
}
