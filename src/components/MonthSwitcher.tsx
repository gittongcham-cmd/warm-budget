"use client";

import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { getCurrentMonthKey, getMonthLabel } from "@/utils/budget";

export function MonthSwitcher({
  monthKey,
  onPrevious,
  onNext,
  onCurrent
}: {
  monthKey: string;
  onPrevious: () => void;
  onNext: () => void;
  onCurrent: () => void;
}) {
  const isCurrentMonth = monthKey === getCurrentMonthKey();

  return (
    <div className="px-4 pt-4">
      <div className="flex items-center justify-between gap-2 rounded-[1.4rem] bg-white/88 p-2 shadow-warm ring-1 ring-white/70">
        <button
          type="button"
          onClick={onPrevious}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-cocoa transition hover:bg-cream"
          aria-label="이전 달"
        >
          <ChevronLeft size={22} />
        </button>
        <div className="flex min-w-0 flex-1 items-center justify-center gap-2">
          <CalendarDays size={17} className="shrink-0 text-clay" />
          <span className="truncate text-base font-black">{getMonthLabel(monthKey)}</span>
        </div>
        <button
          type="button"
          onClick={onNext}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-cocoa transition hover:bg-cream"
          aria-label="다음 달"
        >
          <ChevronRight size={22} />
        </button>
      </div>
      {!isCurrentMonth ? (
        <button type="button" onClick={onCurrent} className="mx-auto mt-2 block text-xs font-bold text-clay">
          이번 달로 돌아가기
        </button>
      ) : null}
    </div>
  );
}
