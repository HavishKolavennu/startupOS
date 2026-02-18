"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const suggestedPrompts = [
  "How long is our runway?",
  "Where are we overspending?",
  "Draft an outreach email to a potential partner.",
];

interface CopilotPanelProps {
  context?: string;
  title?: string;
  subtitle?: string;
}

export function CopilotPanel({ context, title = "Startup Copilot", subtitle = "AI assistant for your metrics" }: CopilotPanelProps) {
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatAction = useAction(api.chat.chat);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setMessages((m) => [...m, { role: "user", content: userMessage }]);
    setInput("");
    setLoading(true);
    try {
      const { content } = await chatAction({
        messages: [...messages, { role: "user", content: userMessage }],
        context,
      });
      setMessages((m) => [...m, { role: "assistant", content }]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: `Error: ${e instanceof Error ? e.message : "Something went wrong"}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 }}
      className="rounded-2xl border border-white/60 bg-white/80 backdrop-blur-sm shadow-card overflow-hidden flex flex-col h-[520px]"
    >
      <div className="p-4 border-b border-[#E5DDD4] bg-cream/30">
        <h3 className="font-display text-sm font-semibold text-[#2D2A26]">
          {title}
        </h3>
        <p className="text-xs text-[#5C5650] mt-0.5">
          {subtitle}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.length === 0 ? (
          <div className="space-y-3">
            <p className="text-sm text-[#5C5650]">
              Ask about your runway, spending, or get help with outreach.
            </p>
            <div className="space-y-2">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => {
                    setInput(prompt);
                  }}
                  className="w-full text-left px-4 py-3 rounded-xl border border-[#E5DDD4] bg-cream/30 text-sm text-[#2D2A26] hover:bg-cream-dark/50 hover:border-crimson/30 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-xl px-4 py-2 text-sm ${
                  msg.role === "user"
                    ? "bg-cyan text-white"
                    : "bg-cream-dark/50 text-[#2D2A26]"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-[#E5DDD4]">
        <div className="flex gap-2">
          <Input
            placeholder="Ask the copilot..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <Button onClick={handleSend} size="icon" disabled={loading}>
            {loading ? "…" : "→"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
