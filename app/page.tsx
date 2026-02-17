"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { config } from "@/lib/config";
import { HeroSection } from "@/components/home/HeroSection";
import { ProblemSection } from "@/components/home/ProblemSection";
import { ImpactStats } from "@/components/home/ImpactStats";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { HowItWorks } from "@/components/home/HowItWorks";

export default function HomePage() {
  return (
    <div className="bg-grid-pattern min-h-screen">
      <HeroSection />
      <ProblemSection />
      <ImpactStats />
      <FeatureGrid />
      <HowItWorks />
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan/5 to-cyan/10" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl md:text-4xl font-bold text-[#1A1816]"
          >
            Clarity is your competitive advantage.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-[#5C5650]"
          >
            See your startup in one place. Make decisions with confidence.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <Button asChild size="lg" className="text-base">
              <Link href="/product">View the Dashboard Demo</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
