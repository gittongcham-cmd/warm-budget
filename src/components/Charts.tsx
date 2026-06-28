"use client";

import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatCurrency } from "@/utils/budget";

type ChartItem = {
  key: string;
  label: string;
  color: string;
  spent: number;
};

export function TopCategoryBarChart({ data }: { data: ChartItem[] }) {
  return (
    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 6, right: 20, left: 6, bottom: 6 }}>
          <XAxis type="number" hide />
          <YAxis dataKey="label" type="category" width={52} tickLine={false} axisLine={false} tick={{ fill: "#4d3428", fontSize: 12 }} />
          <Tooltip formatter={(value) => formatCurrency(Number(value))} cursor={{ fill: "rgba(239,141,72,0.08)" }} />
          <Bar dataKey="spent" radius={[0, 8, 8, 0]} barSize={18}>
            {data.map((entry) => (
              <Cell key={entry.key} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SpendingDonutChart({ data }: { data: ChartItem[] }) {
  const filtered = data.filter((item) => item.spent > 0);

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={filtered} dataKey="spent" nameKey="label" innerRadius={56} outerRadius={92} paddingAngle={3}>
            {filtered.map((entry) => (
              <Cell key={entry.key} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => formatCurrency(Number(value))} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
