"use client";

import { categories, paymentMethods } from "@/data/mockData";
import { BudgetData } from "@/types/budget";
import { formatCurrency, getDateFromMonthKey, getMonthLabel, getMonthlyTransactions } from "@/utils/budget";
import { Card } from "@/components/ui";

export function Transactions({ data, monthKey }: { data: BudgetData; monthKey: string }) {
  const categoryMap = new Map(categories.map((category) => [category.key, category]));
  const paymentMap = new Map(paymentMethods.map((method) => [method.key, method.label]));
  const transactions = getMonthlyTransactions(data.transactions, getDateFromMonthKey(monthKey)).sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="space-y-4 px-4 pb-28 pt-5">
      <div>
        <p className="text-sm font-semibold text-clay">거래 내역</p>
        <h1 className="text-2xl font-black">{getMonthLabel(monthKey)} 지출 흐름</h1>
      </div>

      <Card>
        <div className="space-y-3">
          {transactions.map((transaction) => {
            const category = categoryMap.get(transaction.category);

            return (
              <div key={transaction.id} className="flex items-center justify-between gap-3 rounded-lg bg-cream p-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="h-10 w-2 shrink-0 rounded-full" style={{ backgroundColor: category?.color }} />
                  <div className="min-w-0">
                    <p className="truncate font-black">{transaction.memo || category?.label}</p>
                    <p className="text-xs text-cocoa/60">
                      {transaction.date} · {category?.label} · {paymentMap.get(transaction.paymentMethod)}
                    </p>
                  </div>
                </div>
                <p className="shrink-0 font-black text-clay">-{formatCurrency(transaction.amount)}</p>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
