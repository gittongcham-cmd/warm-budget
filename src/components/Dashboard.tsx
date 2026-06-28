"use client";

import { ArrowDownRight, CalendarDays, PiggyBank, WalletCards } from "lucide-react";
import type { ReactNode } from "react";
import { categories, paymentMethods } from "@/data/mockData";
import { BudgetData } from "@/types/budget";
import { calculateBudget, formatCurrency, getCategoryCoachMessage, getDateFromMonthKey, getMonthLabel, getRemainingDays, getStatusTone } from "@/utils/budget";
import { Card, ProgressBar } from "@/components/ui";
import { SpendingDonutChart, TopCategoryBarChart } from "@/components/Charts";

export function Dashboard({ data, monthKey }: { data: BudgetData; monthKey: string }) {
  const selectedDate = getDateFromMonthKey(monthKey);
  const summary = calculateBudget(data, selectedDate);
  const categoryMap = new Map(categories.map((category) => [category.key, category]));
  const paymentMap = new Map(paymentMethods.map((method) => [method.key, method.label]));
  const overBudgetCount = summary.categorySummary.filter((category) => category.status === "초과").length;
  const warningCount = summary.categorySummary.filter((category) => category.status === "주의" || category.status === "위험").length;

  return (
    <div className="space-y-4 pb-28">
      <div className="rounded-b-[2rem] bg-cocoa px-5 pb-6 pt-7 text-white shadow-warm">
        <p className="text-sm text-white/70">{getMonthLabel(monthKey)} 생활 예산</p>
        <div className="mt-3 flex items-end justify-between gap-4">
          <div>
            <p className="text-3xl font-black tracking-normal">{formatCurrency(summary.remainingBudget)}</p>
            <p className="mt-1 text-sm text-white/75">목표에서 남은 예산</p>
          </div>
          <span className={`rounded-full px-3 py-1 text-sm font-bold ${getStatusTone(summary.overallStatus)}`}>{summary.overallStatus}</span>
        </div>
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between text-sm text-white/80">
            <span>목표 대비 사용률</span>
            <span>{summary.usageRate.toFixed(1)}%</span>
          </div>
          <ProgressBar value={summary.usageRate} color="bg-persimmon" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 px-4">
        <MetricCard icon={<WalletCards size={18} />} label="선택 월 수입" value={formatCurrency(summary.settings.monthlyIncome)} />
        <MetricCard icon={<ArrowDownRight size={18} />} label="현재 지출액" value={formatCurrency(summary.totalSpending)} />
        <MetricCard icon={<CalendarDays size={18} />} label="하루 가능 금액" value={formatCurrency(summary.dailyAvailable)} sub={`${getRemainingDays(selectedDate)}일 기준`} />
        <MetricCard icon={<PiggyBank size={18} />} label="예상 저축액" value={formatCurrency(summary.expectedSavings)} />
      </div>

      <div className="px-4">
        <Card>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black">카테고리 TOP 5</h2>
              <p className="text-sm text-cocoa/60">선택한 월에 많이 쓴 항목</p>
            </div>
            <span className="text-sm font-bold text-clay">{formatCurrency(summary.totalSpending)}</span>
          </div>
          <TopCategoryBarChart data={summary.topCategories} />
        </Card>
      </div>

      <div className="px-4">
        <Card>
          <h2 className="text-lg font-black">지출 비중</h2>
          <SpendingDonutChart data={summary.categorySummary} />
          <div className="grid grid-cols-2 gap-2">
            {summary.categorySummary.filter((item) => item.spent > 0).map((item) => (
              <div key={item.key} className="flex items-center gap-2 text-sm">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="truncate text-cocoa/75">{item.label}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="px-4">
        <Card>
          <h2 className="mb-3 text-lg font-black">카테고리별 예산 현황</h2>
          <div className="space-y-4">
            {summary.categorySummary.map((item) => (
              <div key={item.key} className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-bold">{item.label}</p>
                    <p className="text-xs text-cocoa/60">
                      {formatCurrency(item.spent)} / {formatCurrency(item.budget)}
                    </p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${getStatusTone(item.status)}`}>{item.status}</span>
                </div>
                <ProgressBar value={item.rate} color="bg-clay" />
                <p className="rounded-lg bg-cream px-3 py-2 text-xs font-bold leading-relaxed text-cocoa/70">
                  {getCategoryCoachMessage(item)}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="px-4">
        <Card>
          <h2 className="mb-3 text-lg font-black">선택 월 체크 포인트</h2>
          <div className="grid gap-2 text-sm">
            <Checkpoint label="목표 지출액" value={formatCurrency(summary.settings.targetSpending)} />
            <Checkpoint label="주의 이상 카테고리" value={`${warningCount}개`} />
            <Checkpoint label="초과 카테고리" value={`${overBudgetCount}개`} />
          </div>
        </Card>
      </div>

      <div className="px-4">
        <Card>
          <h2 className="mb-3 text-lg font-black">최근 내역 3개</h2>
          <div className="space-y-3">
            {summary.recentTransactions.map((transaction) => {
              const category = categoryMap.get(transaction.category);

              return (
                <div key={transaction.id} className="flex items-center justify-between gap-3 rounded-lg bg-cream p-3">
                  <div className="min-w-0">
                    <p className="truncate font-bold">{transaction.memo || category?.label}</p>
                    <p className="text-xs text-cocoa/60">
                      {transaction.date} · {category?.label} · {paymentMap.get(transaction.paymentMethod)}
                    </p>
                  </div>
                  <p className="shrink-0 font-black text-clay">-{formatCurrency(transaction.amount)}</p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, sub }: { icon: ReactNode; label: string; value: string; sub?: string }) {
  return (
    <Card className="min-h-28">
      <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-persimmon/15 text-clay">{icon}</div>
      <p className="text-xs font-bold text-cocoa/60">{label}</p>
      <p className="mt-1 break-keep text-xl font-black leading-tight">{value}</p>
      {sub ? <p className="mt-1 text-xs text-cocoa/55">{sub}</p> : null}
    </Card>
  );
}

function Checkpoint({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-cream px-3 py-2">
      <span className="font-semibold text-cocoa/70">{label}</span>
      <span className="font-black">{value}</span>
    </div>
  );
}
