import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * Schema for StartupOS client portal.
 * Workspaces represent client businesses (e.g. ndcutz barbershop).
 */
export default defineSchema({
  workspaces: defineTable({
    name: v.string(),
    slug: v.string(), // e.g. "ndcutz"
    ownerId: v.string(), // Clerk user ID
    businessType: v.optional(v.string()), // e.g. "barbershop"
    createdAt: v.number(),
  })
    .index("by_owner", ["ownerId"])
    .index("by_slug", ["slug"]),

  subscriptions: defineTable({
    workspaceId: v.id("workspaces"),
    vendor: v.string(), // e.g. "Neon Database", "Twilio SMS", "Domain"
    cost: v.number(), // monthly cost in dollars
    renewal: v.string(), // e.g. "Mar 15", "—"
    billingCycle: v.optional(v.string()), // "monthly" | "yearly"
    notes: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_workspace", ["workspaceId"]),

  monthlyRevenue: defineTable({
    workspaceId: v.id("workspaces"),
    month: v.string(), // e.g. "2024-01", "2024-02"
    revenue: v.number(), // in dollars
    notes: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_workspace", ["workspaceId"])
    .index("by_workspace_month", ["workspaceId", "month"]),
});
