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
    return await (ctx.db as any)
      .query("subscriptions")
      .withIndex("by_workspace", (q: any) => q.eq("workspaceId", workspaceId))
      .collect();
  },
});

export const add = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    vendor: v.string(),
    cost: v.number(),
    renewal: v.string(),
    billingCycle: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx: MutationCtx, args: {
    workspaceId: import("./_generated/dataModel").Id<"workspaces">;
    vendor: string;
    cost: number;
    renewal: string;
    billingCycle?: string;
    notes?: string;
  }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const workspace = await ctx.db.get(args.workspaceId);
    if (!workspace || workspace.ownerId !== identity.subject)
      throw new Error("Workspace not found");
    return await ctx.db.insert("subscriptions", {
      workspaceId: args.workspaceId,
      vendor: args.vendor,
      cost: args.cost,
      renewal: args.renewal,
      billingCycle: args.billingCycle,
      notes: args.notes,
      createdAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("subscriptions"),
    vendor: v.optional(v.string()),
    cost: v.optional(v.number()),
    renewal: v.optional(v.string()),
    billingCycle: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx: MutationCtx, args: {
    id: import("./_generated/dataModel").Id<"subscriptions">;
    vendor?: string;
    cost?: number;
    renewal?: string;
    billingCycle?: string;
    notes?: string;
  }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const sub = await ctx.db.get(args.id);
    if (!sub) throw new Error("Subscription not found");
    const workspace = await ctx.db.get(sub.workspaceId);
    if (!workspace || workspace.ownerId !== identity.subject)
      throw new Error("Workspace not found");
    const { id, ...updates } = args;
    const filtered = Object.fromEntries(
      Object.entries(updates).filter(([, v]) => v !== undefined)
    );
    await ctx.db.patch(id, filtered);
    return id;
  },
});

export const remove = mutation({
  args: { id: v.id("subscriptions") },
  handler: async (ctx: MutationCtx, { id }: { id: import("./_generated/dataModel").Id<"subscriptions"> }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const sub = await ctx.db.get(id);
    if (!sub) throw new Error("Subscription not found");
    const workspace = await ctx.db.get(sub.workspaceId);
    if (!workspace || workspace.ownerId !== identity.subject)
      throw new Error("Workspace not found");
    await ctx.db.delete(id);
    return id;
  },
});
