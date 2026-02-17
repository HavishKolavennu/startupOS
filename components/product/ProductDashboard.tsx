"use client";

import { motion } from "framer-motion";
import { KPIRow } from "./KPIRow";
import { DashboardCharts } from "./DashboardCharts";
import { DataTables } from "./DataTables";
import { CopilotPanel } from "./CopilotPanel";

export function ProductDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="grid lg:grid-cols-[1fr_340px] gap-8"
    >
      <div className="space-y-8 min-w-0">
        <KPIRow />
        <DashboardCharts />
        <DataTables />
      </div>
      <div className="lg:sticky lg:top-24 h-fit">
        <CopilotPanel />
      </div>
    </motion.div>
  );
}
