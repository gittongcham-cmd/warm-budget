"use client";

import { ArrowDownRight, ArrowUpRight, CalendarCheck, FileText } from "lucide-react";
import { BudgetData } from "@/types/budget";
import { calculateBudget, formatCurrency, getDateFromMonthKey, getMonthLabel, shiftMonthKey } from "@/utils/budget";
import { Card, ProgressBar } from "@/components/ui";

function formatDelta(value: number) {
  if (value === 0) return "변동 없음";
  return `${value > 0 ? "+" : "-"}${formatCurrency(Math.abs(value))}`;
}

export function Reports({ data, monthKey }: { data: BudgetData; monthKey: string }) {
  const currentSummary = calculateBudget(data, getDateFromMonthKey(monthKey));
  const previousMonthKey = shiftMonthKey(monthKey, -1);
  const previousSummary = calculateBudget(data, getDateFromMonthKey(previousMonthKey));
  const hasPreviousData = previousSummary.monthlyTransactions.length > 0 || Boolean(data.monthlySettings?.[previousMonthKey]);

  const actualSavings = currentSummary.settings.monthlyIncome - currentSummary.totalSpending;
  const previousActualSavings = previousSummary.settings.monthlyIncome - previousSummary.totalSpending;
  const spendingDelta = currentSummary.totalSpending - previousSummary.totalSpending;
  const savingsDelta = actualSavings - previousActualSavings;
  const topCategory = currentSummary.topCategories.find((category) => category.spent > 0);
  const bestCategory = currentSummary.categorySummary
    .filter((category) => category.budget > 0)
    .sort((a, b) => a.rate - b.rate)[0];

  const evaluation =
    currentSummary.settings.targetSpending === 0
      ? "목표 지출액을 설정하면 월말 평가가 더 정확해져요."
      : currentSummary.usageRate < 70
        ? "아직 여유가 있어요. 남은 기간에도 지금 흐름을 유지하면 좋아요."
        : currentSummary.usageRate < 90
          ? "지출 속도가 조금 올라왔어요. 남은 예산을 하루 단위로 확인해보세요."
          : currentSummary.usageRate < 100
            ? "목표에 가까워졌어요. 꼭 필요한 지출 위주로 관리할 때예요."
            : "목표 지출액을 넘겼어요. 다음 달 예산 배분을 조정해보면 좋아요.";

  return (
    <div className="space-y-4 px-4 pb-28 pt-5">
      <div>
        <p className="text-sm font-semibold text-clay">월별 리포트</p>
        <h1 className="text-2xl font-black">이번 달 평가</h1>
      </div>

      <Card>
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black">{getMonthLabel(currentSummary.monthKey)}</h2>
            <p className="text-sm text-cocoa/60">목표 대비 지출 흐름</p>
          </div>
          <CalendarCheck className="shrink-0 text-clay" size={24} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm font-bold text-cocoa/70">
            <span>사용률</span>
            <span>{currentSummary.usageRate.toFixed(1)}%</span>
          </div>
          <ProgressBar value={currentSummary.usageRate} color="bg-clay" />
        </div>
        <p className="mt-4 rounded-lg bg-cream px-3 py-3 text-sm font-bold text-cocoa">{evaluation}</p>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <ReportMetric label="현재 지출" value={formatCurrency(currentSummary.totalSpending)} />
        <ReportMetric label="실제 예상 저축" value={formatCurrency(actualSavings)} />
        <ReportMetric label="남은 예산" value={formatCurrency(currentSummary.remainingBudget)} />
        <ReportMetric label="목표 저축" value={formatCurrency(currentSummary.expectedSavings)} />
      </div>

      <Card>
        <div className="mb-3 flex items-center gap-2">
          <FileText size={19} className="text-clay" />
          <h2 className="text-lg font-black">체크 포인트</h2>
        </div>
        <div className="space-y-2 text-sm">
          <ReportLine label="가장 많이 쓴 항목" value={topCategory ? `${topCategory.label} ${formatCurrency(topCategory.spent)}` : "아직 지출 없음"} />
          <ReportLine label="가장 여유 있는 항목" value={bestCategory ? `${bestCategory.label} ${bestCategory.rate.toFixed(1)}% 사용` : "예산 설정 필요"} />
          <ReportLine label="거래 건수" value={`${currentSummary.monthlyTransactions.length}건`} />
        </div>
      </Card>

      <Card>
        <h2 className="mb-3 text-lg font-black">전월 대비</h2>
        {hasPreviousData ? (
          <div className="space-y-3">
            <ComparisonLine label="지출 변화" value={formatDelta(spendingDelta)} positiveIsGood={false} delta={spendingDelta} />
            <ComparisonLine label="저축 변화" value={formatDelta(savingsDelta)} positiveIsGood delta={savingsDelta} />
            <ReportLine label="전월 지출" value={formatCurrency(previousSummary.totalSpending)} />
          </div>
        ) : (
          <p className="rounded-lg bg-cream px-3 py-3 text-sm font-bold text-cocoa/70">
            전월 데이터가 쌓이면 다음 달부터 지출 변화와 저축 변화를 비교해드릴게요.
          </p>
        )}
      </Card>
    </div>
  );
}

function ReportMetric({ label, value }: { label: string; value: string }) {
  return (
    <Card className="min-h-24">
      <p className="text-xs font-bold text-cocoa/60">{label}</p>
      <p className="mt-2 break-keep text-lg font-black leading-tight">{value}</p>
    </Card>
  );
}

function ReportLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg bg-cream px-3 py-2">
      <span className="font-semibold text-cocoa/70">{label}</span>
      <span className="text-right font-black">{value}</span>
    </div>
  );
}

function ComparisonLine({
  label,
  value,
  delta,
  positiveIsGood
}: {
  label: string;
  value: string;
  delta: number;
  positiveIsGood: boolean;
}) {
  const isGood = delta === 0 || (positiveIsGood ? delta > 0 : delta < 0);
  const Icon = delta > 0 ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg bg-cream px-3 py-2">
      <span className="font-semibold text-cocoa/70">{label}</span>
      <span className={`inline-flex items-center gap-1 text-right font-black ${isGood ? "text-moss" : "text-rosewood"}`}>
        <Icon size={16} />
        {value}
      </span>
    </div>
  );
}
