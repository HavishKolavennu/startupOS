"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream bg-grid-pattern">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#1A1816]">
            Why clarity matters early
          </h1>

          <p className="text-lg text-[#5C5650] leading-relaxed">
            Most founders are drowning in data but starving for insight. They have
            spreadsheets, dashboards, and tools — but no single place that
            answers the questions that keep them up at night: How long is our
            runway? Where is the money going? Who should we talk to next?
          </p>

          <p className="text-lg text-[#5C5650] leading-relaxed">
            We built StartupOS for student startups and early-stage teams who
            need clarity before they can afford an ops team. The goal isn&apos;t
            more data — it&apos;s insight. One command center. One copilot. One
            view of the truth.
          </p>

          <p className="text-lg text-[#5C5650] leading-relaxed">
            This is a visionary product showcase. No pricing, no paywall — just
            a glimpse of what&apos;s possible when founders have the clarity
            they deserve.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="pt-8"
          >
            <Button asChild>
              <Link href="/product">Explore the Dashboard</Link>
            </Button>
          </motion.div>
        </motion.article>
      </div>
    </div>
  );
}
