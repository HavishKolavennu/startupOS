import { action } from "./_generated/server";
import { v } from "convex/values";

function parseContext(context: string | undefined) {
  if (!context) return null;
  const netMatch = context.match(/Net margin: \$(-?\d+(?:\.\d+)?)/);
  const subsMatch = context.match(/Subscriptions: ([^\n]+)/);
  const totalSubsMatch = context.match(/Total monthly subscription cost: \$(\d+(?:\.\d+)?)/);
  const revenueMatch = context.match(/Monthly revenue \(latest\): \$([\d,]+)/);
  return {
    netMargin: netMatch ? parseFloat(netMatch[1]) : null,
    subscriptions: subsMatch ? subsMatch[1] : null,
    totalMonthlySubs: totalSubsMatch ? parseFloat(totalSubsMatch[1]) : null,
    revenue: revenueMatch ? parseFloat(revenueMatch[1].replace(/,/g, "")) : null,
  };
}

function getCannedResponse(
  userMessage: string,
  context: string | undefined
): string {
  const q = userMessage.toLowerCase().trim();
  const ctx = parseContext(context);

  // Runway
  if (q.includes("runway") || q.includes("how long")) {
    if (ctx?.netMargin != null) {
      return `Based on your current net margin of $${ctx.netMargin.toFixed(0)}/month, ${ctx.netMargin > 0 ? "you have solid runway. Keep tracking revenue and costs—if you maintain this margin, you're in good shape." : "focus on increasing revenue or reducing subscription costs."} Consider setting aside 3–6 months of operating costs as a buffer.`;
    }
    return `Runway depends on your net margin (revenue minus subscription costs). Add your revenue and subscriptions above to get a personalized estimate. As a rule of thumb, aim for at least 6 months of runway.`;
  }

  // Overspending
  if (q.includes("overspend") || q.includes("overspending") || q.includes("where are we")) {
    if (ctx?.subscriptions) {
      return `Your current subscriptions: ${ctx.subscriptions}. Review each one—look for annual plans (often 10–20% cheaper), unused tools you can cancel, or cheaper alternatives. Twilio and database hosting are common areas to optimize.`;
    }
    return `Track your subscriptions in the dashboard. Common areas to cut: duplicate tools, unused seats, monthly plans that could be annual. Review each subscription quarterly.`;
  }

  // Outreach / draft email
  if (
    q.includes("outreach") ||
    q.includes("draft") ||
    q.includes("email") ||
    q.includes("partner")
  ) {
    return `Subject: Partnership opportunity – [Your Business] × [Their Business]\n\nHi [Name],\n\nI run [Your Business] and noticed [specific reason you're reaching out]. I'd love to explore a partnership—perhaps a cross-promotion or referral program.\n\nWould you have 15 minutes for a quick call this week?\n\nBest,\n[Your name]`;
  }

  // Subscriptions
  if (q.includes("subscription") || q.includes("what are my")) {
    if (ctx?.subscriptions) {
      return `Your subscriptions: ${ctx.subscriptions}. Total: $${ctx?.totalMonthlySubs?.toFixed(0) ?? "—"}/month.`;
    }
    return `Add your subscriptions in the dashboard to see them here. Common ones: hosting, CRM, payment processing, communication tools.`;
  }

  // Revenue / MRR
  if (q.includes("revenue") || q.includes("mrr") || q.includes("margin")) {
    if (ctx?.revenue != null && ctx?.netMargin != null) {
      return `Monthly revenue: $${ctx.revenue.toLocaleString()}. Net margin (after subscriptions): $${ctx.netMargin.toFixed(0)}. Track both monthly to spot trends.`;
    }
    return `Add your monthly revenue in the dashboard. Net margin = revenue minus subscription costs—aim to keep it positive and growing.`;
  }

  // Greeting / help
  if (
    q.includes("hi") ||
    q.includes("hello") ||
    q.includes("help") ||
    q.includes("what can you")
  ) {
    return `I can help with: runway (how long your cash lasts), overspending (where to cut costs), and outreach emails (draft partner emails). Try one of the suggested prompts or ask in your own words.`;
  }

  return `I can help with runway, overspending, and drafting outreach emails. Try asking "How long is our runway?" or "Where are we overspending?" for specific answers.`;
}

export const chat = action({
  args: {
    messages: v.array(
      v.object({
        role: v.union(v.literal("user"), v.literal("assistant")),
        content: v.string(),
      })
    ),
    context: v.optional(v.string()),
  },
  handler: async (_ctx, { messages, context }) => {
    const lastUser = messages.filter((m) => m.role === "user").pop();
    const userMessage = lastUser?.content ?? "";
    const content = getCannedResponse(userMessage, context);
    return { content };
  },
});
