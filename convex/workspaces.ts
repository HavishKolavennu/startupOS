import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import type { MutationCtx, QueryCtx } from "./_generated/server";

export const getByOwner = query({
  args: {},
  handler: async (ctx: QueryCtx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await (ctx.db as any)
      .query("workspaces")
      .withIndex("by_owner", (q: any) => q.eq("ownerId", identity.subject))
      .collect();
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx: QueryCtx, { slug }: { slug: string }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const workspace = await (ctx.db as any)
      .query("workspaces")
      .withIndex("by_slug", (q: any) => q.eq("slug", slug))
      .first();
    if (!workspace || workspace.ownerId !== identity.subject) return null;
    return workspace;
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    businessType: v.optional(v.string()),
  },
  handler: async (ctx: MutationCtx, { name, slug, businessType }: { name: string; slug: string; businessType?: string }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existing = await (ctx.db as any)
      .query("workspaces")
      .withIndex("by_slug", (q: any) => q.eq("slug", slug))
      .first();
    if (existing) throw new Error("Workspace slug already exists");
    return await ctx.db.insert("workspaces", {
      name,
      slug,
      ownerId: identity.subject,
      businessType,
      createdAt: Date.now(),
    });
  },
});
