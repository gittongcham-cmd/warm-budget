"use client";

import { Save } from "lucide-react";
import { FormEvent, useState } from "react";
import { categories, paymentMethods } from "@/data/mockData";
import { CategoryKey, PaymentMethod, Transaction } from "@/types/budget";
import { Card, Field, Input, Label, PrimaryButton, Select, Textarea } from "@/components/ui";

function todayString() {
  return new Date().toISOString().slice(0, 10);
}

export function AddExpense({ onAdd }: { onAdd: (transaction: Omit<Transaction, "id">) => void }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<CategoryKey>("food");
  const [date, setDate] = useState(todayString());
  const [memo, setMemo] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [saved, setSaved] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0) return;

    onAdd({
      amount: numericAmount,
      category,
      date,
      memo,
      paymentMethod
    });
    setAmount("");
    setMemo("");
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  }

  return (
    <div className="space-y-4 px-4 pb-28 pt-5">
      <div>
        <p className="text-sm font-semibold text-clay">새 지출</p>
        <h1 className="text-2xl font-black">오늘 쓴 돈 기록하기</h1>
      </div>

      <Card>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Field>
            <Label>금액</Label>
            <Input inputMode="numeric" min={0} placeholder="예: 12000" type="number" value={amount} onChange={(event) => setAmount(event.target.value)} />
          </Field>
          <Field>
            <Label>카테고리</Label>
            <Select value={category} onChange={(event) => setCategory(event.target.value as CategoryKey)}>
              {categories.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field>
            <Label>날짜</Label>
            <Input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
          </Field>
          <Field>
            <Label>메모</Label>
            <Textarea placeholder="예: 점심, 장보기, 택시" value={memo} onChange={(event) => setMemo(event.target.value)} />
          </Field>
          <Field>
            <Label>결제수단</Label>
            <Select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value as PaymentMethod)}>
              {paymentMethods.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.label}
                </option>
              ))}
            </Select>
          </Field>
          <PrimaryButton type="submit">
            <Save size={18} />
            저장
          </PrimaryButton>
          {saved ? <p className="text-center text-sm font-bold text-moss">저장됐어요. 홈과 그래프에 바로 반영됩니다.</p> : null}
        </form>
      </Card>
    </div>
  );
}
