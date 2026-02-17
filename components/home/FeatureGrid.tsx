"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";

const features = [
  {
    title: "Subscription Radar",
    description: "Track SaaS tools, renewals, cost leakage.",
    icon: "◉",
  },
  {
    title: "Revenue & Runway",
    description: "Live MRR, burn rate, runway forecast.",
    icon: "◎",
  },
  {
    title: "Partnerships CRM",
    description: "Track partner pipeline + value.",
    icon: "◇",
  },
  {
    title: "Pipeline Intelligence",
    description: "Potential clients, stage tracking.",
    icon: "▷",
  },
  {
    title: "Contact Graph",
    description: "Centralized relationship system.",
    icon: "◆",
  },
  {
    title: "Startup Copilot",
    description: "AI assistant that analyzes your metrics and suggests actions.",
    icon: "✦",
  },
];

export function FeatureGrid() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A1816] text-center mb-4">
            Everything in one place
          </h2>
          <p className="text-center text-[#5C5650] max-w-2xl mx-auto">
            A unified command center built for founders who need clarity, not
            clutter.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <ScrollReveal key={feature.title} delay={i * 0.08}>
              <motion.div
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : {
                        scale: 1.02,
                        boxShadow: "0 0 24px -4px rgba(0, 201, 183, 0.2)",
                      }
                }
                className="rounded-2xl border border-white/60 bg-white/80 backdrop-blur-sm p-8 shadow-card hover:shadow-tech-glow h-full flex flex-col transition-all"
              >
                <div className="text-2xl text-cyan mb-4 font-mono">{feature.icon}</div>
                <h3 className="font-display text-xl font-semibold text-[#2D2A26]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-[#5C5650] leading-relaxed flex-1">
                  {feature.description}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
