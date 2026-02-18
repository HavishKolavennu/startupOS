"use client";

import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { AnimatedCounter } from "@/components/AnimatedCounter";

const stats = [
  {
    value: 20,
    suffix: "%",
    label: "of startups fail within the first year",
    sourceName: "Forbes Advisor",
    sourceUrl: "https://www.forbes.com/advisor/business/startup-statistics/",
    progress: 20,
  },
  {
    value: 50,
    suffix: "%",
    label: "fail within five years",
    sourceName: "Forbes Advisor",
    sourceUrl: "https://www.forbes.com/advisor/business/startup-statistics/",
    progress: 50,
  },
  {
    value: 65,
    suffix: "%",
    label: "fail within ten years",
    sourceName: "Forbes Advisor",
    sourceUrl: "https://www.forbes.com/advisor/business/startup-statistics/",
    progress: 65,
  },
  {
    value: 42,
    suffix: "%",
    label: "fail due to no market need",
    sourceName: "CB Insights",
    sourceUrl: "https://www.cbinsights.com/research/startup-failure-reasons-top/",
    progress: 42,
  },
  {
    value: 29,
    suffix: "%",
    label: "fail because they ran out of cash",
    sourceName: "CB Insights",
    sourceUrl: "https://www.cbinsights.com/research/startup-failure-reasons-top/",
    progress: 29,
  },
  {
    value: 80,
    suffix: "+",
    label: "survive year one in many regions",
    sourceName: "U.S. Bureau of Labor Statistics",
    sourceUrl: "https://www.bls.gov/bdm/",
    progress: 80,
  },
];

export function ImpactStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section ref={ref} className="py-20 md:py-28 bg-gradient-to-b from-cyan/5 to-transparent">
      <div className="mx-auto max-w-7xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-bold text-[#1A1816] text-center mb-4"
        >
          The Numbers Behind Startup Survival
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-[#5C5650] mb-16"
        >
          Data-driven clarity helps you beat the odds.{" "}
          <Link href="/sources" className="text-crimson hover:underline">
            View sources →
          </Link>
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={
                prefersReducedMotion ? {} : { scale: 1.02, y: -2 }
              }
              className="rounded-2xl border border-white/60 bg-white/80 backdrop-blur-sm p-8 shadow-card hover:shadow-tech-glow relative overflow-hidden group transition-all"
            >
              <div className="font-display text-4xl md:text-5xl font-bold text-cyan">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-3 text-[#5C5650] text-sm leading-relaxed">
                {stat.label}
              </p>
              <a
                href={stat.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-xs text-cyan/80 hover:text-cyan hover:underline"
              >
                — {stat.sourceName}
              </a>
              <div className="mt-4 h-1.5 bg-cream-dark rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${stat.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                  className="h-full bg-gradient-to-r from-cyan to-cyan/70 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
