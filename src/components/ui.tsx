import { ReactNode } from "react";

export function Card({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={`rounded-2xl bg-white/88 p-4 shadow-warm ring-1 ring-white/70 ${className}`}>{children}</section>;
}

export function Label({ children }: { children: ReactNode }) {
  return <label className="mb-2 block text-sm font-semibold text-cocoa/80">{children}</label>;
}

export function Field({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`space-y-1 ${className}`}>{children}</div>;
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-2xl border border-persimmon/25 bg-white px-3 py-3 text-base font-semibold text-ink outline-none transition placeholder:text-cocoa/35 focus:border-clay focus:ring-2 focus:ring-persimmon/25 ${props.className ?? ""}`}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full rounded-2xl border border-persimmon/25 bg-white px-3 py-3 text-base font-semibold text-ink outline-none transition focus:border-clay focus:ring-2 focus:ring-persimmon/25 ${props.className ?? ""}`}
    />
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`min-h-24 w-full rounded-2xl border border-persimmon/25 bg-white px-3 py-3 text-base font-semibold text-ink outline-none transition placeholder:text-cocoa/35 focus:border-clay focus:ring-2 focus:ring-persimmon/25 ${props.className ?? ""}`}
    />
  );
}

export function PrimaryButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-clay px-4 py-3 text-base font-bold text-white shadow-warm transition hover:bg-persimmon active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}

export function ProgressBar({ value, color = "bg-clay" }: { value: number; color?: string }) {
  return (
    <div className="h-3 overflow-hidden rounded-full bg-linen">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }} />
    </div>
  );
}
