import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import type { MutationCtx, QueryCtx } from "./_generated/server";

export const listByWorkspace = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx: QueryCtx, { workspaceId }: { workspaceId: import("./_generated/dataModel").Id<"workspaces"> }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    const workspace = await ctx.db.get(workspaceId);
    if (!workspace || workspace.ownerId !== identity.subject) return [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const entries = await (ctx.db as any)
      .query("monthlyRevenue")
      .withIndex("by_workspace", (q: any) => q.eq("workspaceId", workspaceId))
      .collect();
    return entries.sort((a: { month: string }, b: { month: string }) => a.month.localeCompare(b.month));
  },
});

export const upsert = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    month: v.string(),
    revenue: v.number(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx: MutationCtx, { workspaceId, month, revenue, notes }: {
    workspaceId: import("./_generated/dataModel").Id<"workspaces">;
    month: string;
    revenue: number;
    notes?: string;
  }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const workspace = await ctx.db.get(workspaceId);
    if (!workspace || workspace.ownerId !== identity.subject)
      throw new Error("Workspace not found");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existing = await (ctx.db as any)
      .query("monthlyRevenue")
      .withIndex("by_workspace_month", (q: any) =>
        q.eq("workspaceId", workspaceId).eq("month", month)
      )
      .first();
    if (existing) {
      await ctx.db.patch(existing._id, { revenue, notes });
      return existing._id;
    }
    return await ctx.db.insert("monthlyRevenue", {
      workspaceId,
      month,
      revenue,
      notes,
      createdAt: Date.now(),
    });
  },
});
