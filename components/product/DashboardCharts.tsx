"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";
import {
  mrrChartData,
  expenseBreakdown,
  profitChartData,
} from "@/data/mock";

export function DashboardCharts() {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl border border-white/60 bg-white/80 backdrop-blur-sm p-6 shadow-card"
      >
        <h3 className="font-display text-sm font-semibold text-[#2D2A26] mb-4">
          MRR Trend
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mrrChartData}>
              <defs>
                <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00C9B7" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#00C9B7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#5C5650" }}
              />
              <YAxis
                hide
                domain={[12, 25]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#00C9B7"
                strokeWidth={2}
                fill="url(#mrrGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl border border-white/60 bg-white/80 backdrop-blur-sm p-6 shadow-card"
      >
        <h3 className="font-display text-sm font-semibold text-[#2D2A26] mb-4">
          Expense Breakdown
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseBreakdown}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                label={({ category, amount }) => `${category} $${amount}K`}
              >
                {expenseBreakdown.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`$${value}K`, "Amount"]}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #E5DDD4",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="lg:col-span-2 rounded-2xl border border-[#E5DDD4] bg-white p-6 shadow-soft"
      >
        <h3 className="font-display text-sm font-semibold text-[#2D2A26] mb-4">
          Profit Over Time
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={profitChartData}>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#5C5650" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#5C5650" }}
                tickFormatter={(v) => `$${v}K`}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#4A9B6F"
                strokeWidth={2}
                dot={{ fill: "#4A9B6F", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
