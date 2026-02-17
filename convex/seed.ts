import { mutation } from "./_generated/server";
import type { MutationCtx } from "./_generated/server";

/**
 * One-time seed for ndcutz workspace.
 * Call from portal after first login to set up NDCutz barbershop workspace.
 */
export const seedNdcutz = mutation({
  args: {},
  handler: async (ctx: MutationCtx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const ownerId = identity.subject;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existing = await (ctx.db as any)
      .query("workspaces")
      .withIndex("by_slug", (q: any) => q.eq("slug", "ndcutz"))
      .first();
    if (existing && existing.ownerId === ownerId) return existing._id;

    const workspaceId = await ctx.db.insert("workspaces", {
      name: "NDCutz",
      slug: "ndcutz",
      ownerId,
      businessType: "barbershop",
      createdAt: Date.now(),
    });

    const ndcutzSubscriptions = [
      { vendor: "Neon Database", cost: 19, renewal: "Monthly", billingCycle: "monthly" },
      { vendor: "Twilio SMS Notifications", cost: 25, renewal: "Monthly", billingCycle: "monthly" },
      { vendor: "Domain Name", cost: 12, renewal: "Yearly", billingCycle: "yearly" },
    ];

    for (const sub of ndcutzSubscriptions) {
      await ctx.db.insert("subscriptions", {
        workspaceId,
        vendor: sub.vendor,
        cost: sub.cost,
        renewal: sub.renewal,
        billingCycle: sub.billingCycle,
        createdAt: Date.now(),
      });
    }

    const months = ["2024-09", "2024-10", "2024-11", "2024-12", "2025-01", "2025-02"];
    const revenues = [4200, 4850, 5200, 6100, 5800, 6400];
    for (let i = 0; i < months.length; i++) {
      await ctx.db.insert("monthlyRevenue", {
        workspaceId,
        month: months[i],
        revenue: revenues[i],
        createdAt: Date.now(),
      });
    }

    return workspaceId;
  },
});
