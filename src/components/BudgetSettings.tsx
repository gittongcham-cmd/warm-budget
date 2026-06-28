"use client";

import { Save } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { categories } from "@/data/mockData";
import { BudgetSettings as BudgetSettingsType, CategoryKey } from "@/types/budget";
import { Card, Field, Input, Label, PrimaryButton } from "@/components/ui";
import { formatCurrency } from "@/utils/budget";

export function BudgetSettings({
  settings,
  onSave
}: {
  settings: BudgetSettingsType;
  onSave: (settings: BudgetSettingsType) => void;
}) {
  const [form, setForm] = useState<BudgetSettingsType>(settings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  function updateCategory(key: CategoryKey, value: string) {
    setForm((current) => ({
      ...current,
      categoryBudgets: {
        ...current.categoryBudgets,
        [key]: Number(value)
      }
    }));
  }

  const allocatedBudget = categories.reduce((total, category) => total + (form.categoryBudgets[category.key] || 0), 0);
  const remainingAllocation = form.targetSpending - allocatedBudget;
  const allocationRate = form.targetSpending > 0 ? (allocatedBudget / form.targetSpending) * 100 : 0;
  const allocationTone =
    remainingAllocation < 0
      ? "bg-rosewood/12 text-rosewood"
      : remainingAllocation === 0 && form.targetSpending > 0
        ? "bg-moss/15 text-moss"
        : "bg-persimmon/15 text-clay";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave(form);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  }

  return (
    <div className="space-y-4 px-4 pb-28 pt-5">
      <div>
        <p className="text-sm font-semibold text-clay">예산 설정</p>
        <h1 className="text-2xl font-black">이번 달 기준 잡기</h1>
      </div>

      <Card>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <Label>이번 달 수입</Label>
              <Input
                inputMode="numeric"
                min={0}
                type="number"
                value={form.monthlyIncome || ""}
                placeholder="예: 3000000"
                onChange={(event) => setForm((current) => ({ ...current, monthlyIncome: Number(event.target.value) }))}
              />
            </Field>
            <Field>
              <Label>목표 지출액</Label>
              <Input
                inputMode="numeric"
                min={0}
                type="number"
                value={form.targetSpending || ""}
                placeholder="예: 1000000"
                onChange={(event) => setForm((current) => ({ ...current, targetSpending: Number(event.target.value) }))}
              />
            </Field>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-black">카테고리별 예산 배분</h2>
            <div className="mb-3 rounded-lg bg-cream p-3">
              <div className="grid grid-cols-3 gap-2 text-center">
                <BudgetSummary label="목표" value={formatCurrency(form.targetSpending)} />
                <BudgetSummary label="배분" value={formatCurrency(allocatedBudget)} />
                <BudgetSummary label={remainingAllocation < 0 ? "초과" : "남음"} value={formatCurrency(Math.abs(remainingAllocation))} />
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
                <div className="h-full rounded-full bg-clay" style={{ width: `${Math.min(Math.max(allocationRate, 0), 100)}%` }} />
              </div>
              <p className={`mt-3 rounded-lg px-3 py-2 text-center text-sm font-bold ${allocationTone}`}>
                {remainingAllocation < 0
                  ? `목표 지출액보다 ${formatCurrency(Math.abs(remainingAllocation))} 더 배분했어요.`
                  : remainingAllocation === 0 && form.targetSpending > 0
                    ? "목표 지출액을 모두 배분했어요."
                    : `${formatCurrency(remainingAllocation)} 더 배분할 수 있어요.`}
              </p>
            </div>
            <div className="space-y-3">
              {categories.map((category) => {
                const categoryBudget = form.categoryBudgets[category.key] || 0;
                const categoryRate = form.targetSpending > 0 ? (categoryBudget / form.targetSpending) * 100 : 0;

                return (
                  <div key={category.key} className="rounded-lg bg-cream p-3">
                    <div className="grid grid-cols-[1fr_minmax(130px,1.2fr)] items-center gap-3">
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }} />
                        <span className="font-bold">{category.label}</span>
                      </div>
                      <Input
                        inputMode="numeric"
                        min={0}
                        type="number"
                        value={categoryBudget || ""}
                        placeholder="0"
                        onChange={(event) => updateCategory(category.key, event.target.value)}
                        className="bg-white"
                      />
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-3 text-xs font-bold text-cocoa/55">
                      <span>{categoryBudget > 0 ? formatCurrency(categoryBudget) : "아직 배분 전"}</span>
                      <span>목표의 {categoryRate.toFixed(1)}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <PrimaryButton type="submit">
            <Save size={18} />
            저장
          </PrimaryButton>
          {saved ? <p className="text-center text-sm font-bold text-moss">예산이 홈 대시보드에 반영됐어요.</p> : null}
        </form>
      </Card>
    </div>
  );
}

function BudgetSummary({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-lg bg-white px-2 py-3">
      <p className="text-xs font-bold text-cocoa/55">{label}</p>
      <p className="mt-1 truncate text-sm font-black text-ink">{value}</p>
    </div>
  );
}
