"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  mockSubscriptions,
  mockPartnerships,
  mockLeads,
  mockContacts,
} from "@/data/mock";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const tabs = [
  { id: "subscriptions", label: "Subscriptions", data: mockSubscriptions },
  { id: "partnerships", label: "Partnerships", data: mockPartnerships },
  { id: "leads", label: "Leads", data: mockLeads },
  { id: "contacts", label: "Contacts", data: mockContacts },
];

export function DataTables() {
  const [activeTab, setActiveTab] = useState("subscriptions");

  const renderTable = () => {
    switch (activeTab) {
      case "subscriptions":
        return (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5DDD4]">
                <th className="text-left py-3 font-medium text-[#5C5650]">Vendor</th>
                <th className="text-left py-3 font-medium text-[#5C5650]">Cost</th>
                <th className="text-left py-3 font-medium text-[#5C5650]">Renewal</th>
                <th className="text-left py-3 font-medium text-[#5C5650]">Owner</th>
              </tr>
            </thead>
            <tbody>
              {mockSubscriptions.map((row) => (
                <tr key={row.id} className="border-b border-[#E5DDD4]/50 hover:bg-cream/30">
                  <td className="py-3 font-medium">{row.vendor}</td>
                  <td className="py-3">${row.cost}/mo</td>
                  <td className="py-3">{row.renewal}</td>
                  <td className="py-3">{row.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case "partnerships":
        return (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5DDD4]">
                <th className="text-left py-3 font-medium text-[#5C5650]">Name</th>
                <th className="text-left py-3 font-medium text-[#5C5650]">Stage</th>
                <th className="text-left py-3 font-medium text-[#5C5650]">Value</th>
                <th className="text-left py-3 font-medium text-[#5C5650]">Next</th>
              </tr>
            </thead>
            <tbody>
              {mockPartnerships.map((row) => (
                <tr key={row.id} className="border-b border-[#E5DDD4]/50 hover:bg-cream/30">
                  <td className="py-3 font-medium">{row.name}</td>
                  <td className="py-3">
                    <Badge variant="secondary">{row.stage}</Badge>
                  </td>
                  <td className="py-3">{row.value}</td>
                  <td className="py-3">{row.nextMeeting}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case "leads":
        return (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5DDD4]">
                <th className="text-left py-3 font-medium text-[#5C5650]">Name</th>
                <th className="text-left py-3 font-medium text-[#5C5650]">Status</th>
                <th className="text-left py-3 font-medium text-[#5C5650]">Score</th>
                <th className="text-left py-3 font-medium text-[#5C5650]">Last</th>
              </tr>
            </thead>
            <tbody>
              {mockLeads.map((row) => (
                <tr key={row.id} className="border-b border-[#E5DDD4]/50 hover:bg-cream/30">
                  <td className="py-3 font-medium">{row.name}</td>
                  <td className="py-3">
                    <Badge variant={row.status === "Qualified" ? "success" : "secondary"}>
                      {row.status}
                    </Badge>
                  </td>
                  <td className="py-3">{row.score}</td>
                  <td className="py-3">{row.lastContact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case "contacts":
        return (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5DDD4]">
                <th className="text-left py-3 font-medium text-[#5C5650]">Name</th>
                <th className="text-left py-3 font-medium text-[#5C5650]">Org</th>
                <th className="text-left py-3 font-medium text-[#5C5650]">Role</th>
                <th className="text-left py-3 font-medium text-[#5C5650]">Tags</th>
              </tr>
            </thead>
            <tbody>
              {mockContacts.map((row) => (
                <tr key={row.id} className="border-b border-[#E5DDD4]/50 hover:bg-cream/30">
                  <td className="py-3 font-medium">{row.name}</td>
                  <td className="py-3">{row.org}</td>
                  <td className="py-3">{row.role}</td>
                  <td className="py-3">
                    <div className="flex gap-1 flex-wrap">
                      {row.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="rounded-2xl border border-white/60 bg-white/80 backdrop-blur-sm shadow-card overflow-hidden"
    >
      <div className="flex border-b border-[#E5DDD4] overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? "text-cyan border-b-2 border-cyan -mb-px"
                : "text-[#5C5650] hover:text-[#2D2A26]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <ScrollArea className="h-64">
        <div className="p-6">{renderTable()}</div>
      </ScrollArea>
    </motion.div>
  );
}
