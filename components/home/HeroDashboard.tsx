"use client";

import { motion } from "framer-motion";
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const mrrData = [
  { month: "Jan", value: 12.2 },
  { month: "Feb", value: 14.1 },
  { month: "Mar", value: 15.8 },
  { month: "Apr", value: 17.2 },
  { month: "May", value: 19.1 },
  { month: "Jun", value: 21.4 },
];

export function HeroDashboard() {
  return (
    <div className="rounded-2xl border border-white/60 bg-white/90 backdrop-blur-sm shadow-card tech-glow p-6 overflow-hidden relative scanlines">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-sm font-semibold text-[#2D2A26]">
          Command Center
        </h3>
        <span className="text-xs text-[#5C5650]">Live preview</span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "MRR", value: "$21.4K", trend: "+12%" },
          { label: "Runway", value: "14 mo", trend: "Stable" },
          { label: "Burn", value: "$8.2K", trend: "-5%" },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="rounded-xl border border-cyan/20 bg-cyan/5 p-4"
          >
            <p className="text-xs text-[#5C5650]">{kpi.label}</p>
            <p className="font-display text-lg font-semibold text-[#2D2A26] mt-0.5">
              {kpi.value}
            </p>
            <p
              className={`text-xs mt-1 ${
                kpi.trend.startsWith("+")
                  ? "text-[#4A9B6F]"
                  : kpi.trend.startsWith("-")
                  ? "text-crimson"
                  : "text-[#5C5650]"
              }`}
            >
              {kpi.trend}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mrrData}>
            <defs>
              <linearGradient id="heroGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00C9B7" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#00C9B7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#5C5650" }}
            />
            <YAxis hide domain={[10, 25]} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#00C9B7"
              strokeWidth={2}
              fill="url(#heroGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-4 flex items-center gap-2 text-xs text-[#5C5650]"
      >
        <span className="w-2 h-2 rounded-full bg-cyan animate-pulse shadow-[0_0_8px_rgba(0,201,183,0.6)]" />
        <span>MRR trend · Last 6 months</span>
      </motion.div>
    </div>
  );
}
