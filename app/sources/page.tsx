"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const sources = [
  {
    id: "forbes",
    name: "Forbes Advisor",
    title: "Startup Failure Rates",
    description: "Statistics on startup failure within first year, five years, and ten years.",
    url: "https://www.forbes.com/advisor/business/startup-statistics/",
    stats: ["~20% fail within first year", "~50% fail within five years", "~65% fail within ten years"],
  },
  {
    id: "bls",
    name: "U.S. Bureau of Labor Statistics (BLS) - TED",
    title: "Business Employment Dynamics",
    description: "Survival rates for new businesses. BLS data shows survival often around 80%+ in year one for many regions.",
    url: "https://www.bls.gov/bdm/",
    stats: ["Majority of new businesses survive year one in many regions"],
  },
  {
    id: "cbinsights",
    name: "CB Insights",
    title: "The Top 12 Reasons Startups Fail",
    description: "Analysis of startup failure reasons based on post-mortem data.",
    url: "https://www.cbinsights.com/research/startup-failure-reasons-top/",
    stats: ["42% fail due to no market need", "29% fail because they ran out of cash"],
  },
];

export default function SourcesPage() {
  return (
    <div className="min-h-screen bg-cream bg-grid-pattern">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#1A1816]">
            Sources & Citations
          </h1>
          <p className="mt-4 text-lg text-[#5C5650]">
            All statistics on the homepage are cited from the following sources.
          </p>

          <div className="mt-12 space-y-8">
            {sources.map((source, i) => (
              <motion.section
                key={source.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="rounded-2xl border border-white/60 bg-white/80 backdrop-blur-sm p-8 shadow-card"
              >
                <h2 className="font-display text-xl font-semibold text-[#2D2A26]">
                  {source.name}
                </h2>
                <p className="mt-1 text-sm text-cyan font-medium font-mono">
                  {source.title}
                </p>
                <p className="mt-3 text-[#5C5650] leading-relaxed">
                  {source.description}
                </p>
                <ul className="mt-4 space-y-1">
                  {source.stats.map((stat) => (
                    <li key={stat} className="text-sm text-[#1A1816] flex items-start gap-2">
                      <span className="text-cyan">•</span>
                      {stat}
                    </li>
                  ))}
                </ul>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm text-cyan hover:underline font-medium"
                >
                  View source →
                </a>
              </motion.section>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <Link
              href="/"
              className="text-cyan hover:underline font-medium"
            >
              ← Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
