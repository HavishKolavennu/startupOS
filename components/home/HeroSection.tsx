"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { config } from "@/lib/config";
import { HeroDashboard } from "./HeroDashboard";

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan/8 via-transparent to-crimson/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,201,183,0.12),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-mono font-medium text-cyan uppercase tracking-[0.2em] mb-4"
            >
              {config.brand.name}
            </motion.p>
            <motion.h1
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1816] leading-[1.08] tracking-tight"
            >
              {config.brand.tagline}
            </motion.h1>
            <motion.p
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg md:text-xl text-[#5C5650] max-w-xl leading-relaxed"
            >
              A single command center for subscriptions, revenue, partnerships,
              pipeline, contacts, runway — and an AI copilot built for founders.
            </motion.p>
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8"
            >
              <Button asChild size="lg">
                <Link href="/product">Explore the Product</Link>
              </Button>
            </motion.div>
          </div>
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <HeroDashboard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
