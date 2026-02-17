"use client";

import { motion } from "framer-motion";
import { ProductDashboard } from "@/components/product/ProductDashboard";

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl font-bold text-[#1A1816]">
            Dashboard Demo
          </h1>
          <p className="mt-1 text-[#5C5650]">
            Interactive mock — explore the command center
          </p>
        </motion.div>
        <ProductDashboard />
      </div>
    </div>
  );
}
