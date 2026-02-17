"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

const problems = [
  {
    id: "tool-sprawl",
    title: "Tool Sprawl",
    description:
      "Notion, Slack, spreadsheets, billing dashboards — data lives everywhere. No single source of truth.",
    icon: "⊞",
  },
  {
    id: "cash-flow-fog",
    title: "Cash Flow Fog",
    description:
      "Runway calculations are guesswork. Renewals sneak up. Burn rate surprises. Cash runs out before you see it coming.",
    icon: "◐",
  },
  {
    id: "relationship-chaos",
    title: "Relationship Chaos",
    description:
      "Partners, investors, customers — scattered across email, LinkedIn, and memory. Who did you last talk to? What was promised?",
    icon: "◈",
  },
];

export function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section ref={ref} className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A1816] text-center max-w-2xl mx-auto">
            Startups don&apos;t fail from lack of effort. They fail from lack of
            clarity.
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid md:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((problem, i) => (
            <ScrollReveal key={problem.id} delay={i * 0.1}>
              <motion.div
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : { scale: 1.02, boxShadow: "0 0 24px -4px rgba(0, 201, 183, 0.2)" }
                }
                className="rounded-2xl border border-white/60 bg-white/80 backdrop-blur-sm p-8 shadow-card hover:shadow-tech-glow transition-all"
              >
                <div className="text-2xl text-cyan mb-4 font-mono">{problem.icon}</div>
                <h3 className="font-display text-xl font-semibold text-[#2D2A26]">
                  {problem.title}
                </h3>
                <p className="mt-3 text-[#5C5650] leading-relaxed">
                  {problem.description}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
