"use client";

import { motion } from "framer-motion";
import { kpiData } from "@/data/mock";

const kpis = [
  { label: "MRR", value: `$${(kpiData.mrr / 1000).toFixed(1)}K`, color: "text-cyan" },
  { label: "ARR", value: `$${(kpiData.arr / 1000).toFixed(0)}K`, color: "text-[#2D2A26]" },
  { label: "Burn rate", value: `$${(kpiData.burnRate / 1000).toFixed(1)}K`, color: "text-[#5C5650]" },
  { label: "Runway", value: `${kpiData.runwayMonths} mo`, color: "text-[#4A9B6F]" },
  { label: "Net profit", value: `$${(kpiData.netProfit / 1000).toFixed(1)}K`, color: "text-[#4A9B6F]" },
  { label: "Active subs", value: String(kpiData.activeSubscriptions), color: "text-[#2D2A26]" },
];

export function KPIRow() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {kpis.map((kpi, i) => (
        <motion.div
          key={kpi.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          whileHover={{ scale: 1.02 }}
          className="rounded-2xl border border-white/60 bg-white/80 backdrop-blur-sm p-5 shadow-card hover:shadow-tech-glow transition-all"
        >
          <p className="text-xs text-[#5C5650] font-medium">{kpi.label}</p>
          <p className={`mt-1 font-display text-xl font-semibold ${kpi.color}`}>
            {kpi.value}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
