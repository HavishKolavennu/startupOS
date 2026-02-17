"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Connect",
    description: "Link your tools, billing, and data sources. One-time setup.",
  },
  {
    number: "02",
    title: "See",
    description: "Your startup in one dashboard. MRR, runway, pipeline, relationships.",
  },
  {
    number: "03",
    title: "Decide",
    description: "AI copilot surfaces insights. You make the call.",
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl font-bold text-[#1A1816] text-center mb-16"
        >
          How it works
        </motion.h2>

        <div className="relative">
          {/* Connecting line - desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-white/60 overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="h-full w-full bg-gradient-to-r from-cyan to-crimson origin-left"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative text-center"
              >
                <div className="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/90 border-2 border-cyan text-cyan font-mono text-xl font-bold shadow-tech-glow mx-auto mb-6">
                  {step.number}
                </div>
                <h3 className="font-display text-2xl font-semibold text-[#2D2A26]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[#5C5650] max-w-xs mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Link
            href="/product"
            className="inline-flex items-center gap-2 text-crimson font-medium hover:underline"
          >
            Try the interactive demo
            <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
