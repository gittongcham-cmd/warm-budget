"use client";

import { Save } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { categories } from "@/data/mockData";
import { BudgetSettings as BudgetSettingsType, CategoryKey } from "@/types/budget";
import { Card, Field, Input, Label, PrimaryButton } from "@/components/ui";

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
                value={form.monthlyIncome}
                onChange={(event) => setForm((current) => ({ ...current, monthlyIncome: Number(event.target.value) }))}
              />
            </Field>
            <Field>
              <Label>목표 지출액</Label>
              <Input
                inputMode="numeric"
                min={0}
                type="number"
                value={form.targetSpending}
                onChange={(event) => setForm((current) => ({ ...current, targetSpending: Number(event.target.value) }))}
              />
            </Field>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-black">카테고리별 예산 배분</h2>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.key} className="grid grid-cols-[1fr_minmax(130px,1.2fr)] items-center gap-3 rounded-lg bg-cream p-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }} />
                    <span className="font-bold">{category.label}</span>
                  </div>
                  <Input
                    inputMode="numeric"
                    min={0}
                    type="number"
                    value={form.categoryBudgets[category.key]}
                    onChange={(event) => updateCategory(category.key, event.target.value)}
                    className="bg-white"
                  />
                </div>
              ))}
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
