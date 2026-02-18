"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { motion } from "framer-motion";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CopilotPanel } from "@/components/product/CopilotPanel";

export default function NdcutzPortalPage() {
  const workspace = useQuery(api.workspaces.getBySlug, { slug: "ndcutz" });
  const subscriptions = useQuery(
    api.subscriptions.listByWorkspace,
    workspace ? { workspaceId: workspace._id } : "skip"
  );
  const revenueEntries = useQuery(
    api.revenue.listByWorkspace,
    workspace ? { workspaceId: workspace._id } : "skip"
  );
  const addSubscription = useMutation(api.subscriptions.add);
  const upsertRevenue = useMutation(api.revenue.upsert);

  const [newVendor, setNewVendor] = useState("");
  const [newCost, setNewCost] = useState("");
  const [newMonth, setNewMonth] = useState("");
  const [newRevenue, setNewRevenue] = useState("");

  const handleAddSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workspace || !newVendor || !newCost) return;
    await addSubscription({
      workspaceId: workspace._id,
      vendor: newVendor,
      cost: parseFloat(newCost),
      renewal: "—",
    });
    setNewVendor("");
    setNewCost("");
  };

  const handleAddRevenue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workspace || !newMonth || !newRevenue) return;
    await upsertRevenue({
      workspaceId: workspace._id,
      month: newMonth,
      revenue: parseFloat(newRevenue),
    });
    setNewMonth("");
    setNewRevenue("");
  };

  const totalMonthlySubs =
    subscriptions?.reduce(
      (sum: number, s: Doc<"subscriptions">) =>
        sum + (s.billingCycle === "yearly" ? s.cost / 12 : s.cost),
      0
    ) ?? 0;
  const latestRevenue = revenueEntries && revenueEntries.length > 0
    ? revenueEntries[revenueEntries.length - 1].revenue
    : 0;
  const mrr = latestRevenue;
  const netMargin = mrr - totalMonthlySubs;

  const copilotContext = [
    `Workspace: ${workspace?.name} (${workspace?.businessType ?? "barbershop"})`,
    `Subscriptions: ${subscriptions?.map((s: Doc<"subscriptions">) => `${s.vendor}: $${s.cost}/mo (${s.billingCycle ?? "monthly"})`).join(", ") ?? "none"}`,
    `Total monthly subscription cost: $${totalMonthlySubs.toFixed(0)}`,
    `Monthly revenue (latest): $${mrr.toLocaleString()}`,
    `Net margin: $${netMargin.toFixed(0)}`,
    `Revenue by month: ${revenueEntries?.map((r: Doc<"monthlyRevenue">) => `${r.month}: $${r.revenue}`).join(", ") ?? "none"}`,
  ].join("\n");

  if (workspace === undefined) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 flex justify-center">
        <div className="animate-pulse text-[#5C5650]">Loading NDCutz…</div>
      </div>
    );
  }

  if (workspace === null) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <p className="text-[#5C5650]">NDCutz workspace not found. Set it up from the portal.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid lg:grid-cols-[1fr_360px] gap-8"
      >
        <div className="space-y-10 min-w-0">
        <div>
          <h1 className="font-display text-3xl font-bold text-[#1A1816]">
            {workspace.name}
          </h1>
          <p className="mt-1 text-[#5C5650]">Barbershop command center</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-white/60 bg-white/80 backdrop-blur-sm p-5 shadow-card">
            <p className="text-xs text-[#5C5650] font-medium">Monthly Revenue</p>
            <p className="mt-1 font-display text-xl font-semibold text-cyan">
              ${mrr.toLocaleString()}
            </p>
          </div>
          <div className="rounded-2xl border border-white/60 bg-white/80 backdrop-blur-sm p-5 shadow-card">
            <p className="text-xs text-[#5C5650] font-medium">Monthly Subscriptions</p>
            <p className="mt-1 font-display text-xl font-semibold text-[#2D2A26]">
              ${totalMonthlySubs.toFixed(0)}
            </p>
          </div>
          <div className="rounded-2xl border border-white/60 bg-white/80 backdrop-blur-sm p-5 shadow-card">
            <p className="text-xs text-[#5C5650] font-medium">Net Margin</p>
            <p className={`mt-1 font-display text-xl font-semibold ${netMargin >= 0 ? "text-[#4A9B6F]" : "text-crimson"}`}>
              ${netMargin.toFixed(0)}
            </p>
          </div>
          <div className="rounded-2xl border border-white/60 bg-white/80 backdrop-blur-sm p-5 shadow-card">
            <p className="text-xs text-[#5C5650] font-medium">Active Subscriptions</p>
            <p className="mt-1 font-display text-xl font-semibold text-[#2D2A26]">
              {subscriptions?.length ?? 0}
            </p>
          </div>
        </div>

        {/* Subscriptions */}
        <div className="rounded-2xl border border-white/60 bg-white/80 backdrop-blur-sm shadow-card overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E5DDD4]">
            <h2 className="font-display text-lg font-semibold text-[#1A1816]">
              Subscriptions
            </h2>
            <p className="text-sm text-[#5C5650] mt-0.5">
              Neon Database, Twilio SMS, Domain, and more
            </p>
          </div>
          <div className="p-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E5DDD4]">
                  <th className="text-left py-3 font-medium text-[#5C5650]">Vendor</th>
                  <th className="text-left py-3 font-medium text-[#5C5650]">Cost</th>
                  <th className="text-left py-3 font-medium text-[#5C5650]">Billing</th>
                  <th className="text-left py-3 font-medium text-[#5C5650]">Renewal</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions?.map((sub: Doc<"subscriptions">) => (
                  <tr key={sub._id} className="border-b border-[#E5DDD4]/50 hover:bg-cream/30">
                    <td className="py-3 font-medium">{sub.vendor}</td>
                    <td className="py-3">${sub.cost}/mo</td>
                    <td className="py-3">
                      <Badge variant="outline" className="text-xs">
                        {sub.billingCycle ?? "monthly"}
                      </Badge>
                    </td>
                    <td className="py-3">{sub.renewal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <form onSubmit={handleAddSubscription} className="mt-4 flex gap-3 flex-wrap">
              <Input
                placeholder="Vendor name"
                value={newVendor}
                onChange={(e) => setNewVendor(e.target.value)}
                className="max-w-[180px]"
              />
              <Input
                type="number"
                placeholder="Cost ($)"
                value={newCost}
                onChange={(e) => setNewCost(e.target.value)}
                className="max-w-[100px]"
              />
              <Button type="submit" size="sm">Add</Button>
            </form>
          </div>
        </div>

        {/* Monthly Revenue */}
        <div className="rounded-2xl border border-white/60 bg-white/80 backdrop-blur-sm shadow-card overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E5DDD4]">
            <h2 className="font-display text-lg font-semibold text-[#1A1816]">
              Monthly Revenue
            </h2>
            <p className="text-sm text-[#5C5650] mt-0.5">
              Track revenue by month (e.g. 2025-02)
            </p>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[300px]">
                <thead>
                  <tr className="border-b border-[#E5DDD4]">
                    <th className="text-left py-3 font-medium text-[#5C5650]">Month</th>
                    <th className="text-left py-3 font-medium text-[#5C5650]">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {revenueEntries?.slice().reverse().map((r: Doc<"monthlyRevenue">) => (
                    <tr key={r._id} className="border-b border-[#E5DDD4]/50 hover:bg-cream/30">
                      <td className="py-3 font-medium">{r.month}</td>
                      <td className="py-3 text-cyan font-medium">
                        ${r.revenue.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <form onSubmit={handleAddRevenue} className="mt-4 flex gap-3 flex-wrap">
              <Input
                placeholder="Month (e.g. 2025-03)"
                value={newMonth}
                onChange={(e) => setNewMonth(e.target.value)}
                className="max-w-[160px]"
              />
              <Input
                type="number"
                placeholder="Revenue ($)"
                value={newRevenue}
                onChange={(e) => setNewRevenue(e.target.value)}
                className="max-w-[120px]"
              />
              <Button type="submit" size="sm">Add</Button>
            </form>
          </div>
        </div>
        </div>
        <div className="lg:sticky lg:top-24 h-fit">
          <CopilotPanel
            context={copilotContext}
            title="NDCutz Copilot"
            subtitle="Ask about subscriptions, revenue, or get advice"
          />
        </div>
      </motion.div>
    </div>
  );
}
