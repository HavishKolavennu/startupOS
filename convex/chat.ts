import { action } from "./_generated/server";
import { v } from "convex/values";

const SYSTEM_PROMPT = `You are a helpful startup operations assistant. You help founders and business owners track subscriptions, revenue, and make data-driven decisions. Be concise and actionable.`;

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
  handler: async (ctx, { messages, context }) => {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return {
        content:
          "AI chat is not configured. Add OPENAI_API_KEY to your Convex Dashboard → Settings → Environment Variables.",
      };
    }

    const systemContent = context
      ? `${SYSTEM_PROMPT}\n\nHere is the user's workspace data for context:\n${context}`
      : SYSTEM_PROMPT;

    const apiMessages = [
      { role: "system" as const, content: systemContent },
      ...messages.map((m) => ({ role: m.role, content: m.content })),
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: apiMessages,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return {
        content: `Error: ${response.status}. ${err.slice(0, 200)}`,
      };
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content ?? "No response.";
    return { content };
  },
});
