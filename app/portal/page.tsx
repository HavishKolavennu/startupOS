"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function PortalPage() {
  const workspaces = useQuery(api.workspaces.getByOwner);
  const seedNdcutz = useMutation(api.seed.seedNdcutz);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (workspaces === undefined) return;
    if (workspaces.length > 0) {
      const first = workspaces[0];
      router.replace(`/portal/${first.slug}`);
    }
  }, [workspaces, router]);

  const handleSetupNdcutz = async () => {
    setLoading(true);
    setError(null);
    try {
      await seedNdcutz();
      router.push("/portal/ndcutz");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Something went wrong";
      setError(message);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (workspaces === undefined) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 flex justify-center">
        <div className="animate-pulse text-[#5C5650]">Loading your workspace…</div>
      </div>
    );
  }

  if (workspaces.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg mx-auto text-center"
        >
          <h1 className="font-display text-2xl font-bold text-[#1A1816]">
            Welcome to your portal
          </h1>
          <p className="mt-2 text-[#5C5650]">
            Set up your NDCutz barbershop workspace to track subscriptions and revenue.
          </p>
          <button
            onClick={handleSetupNdcutz}
            disabled={loading}
            className="mt-6 px-6 py-3 bg-cyan text-white font-medium rounded-xl hover:bg-cyan/90 transition-colors shadow-card disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Setting up…" : "Set up NDCutz workspace"}
          </button>
          {error && (
            <p className="mt-4 text-sm text-crimson">
              {error}
            </p>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 flex justify-center">
      <div className="animate-pulse text-[#5C5650]">Redirecting…</div>
    </div>
  );
}
