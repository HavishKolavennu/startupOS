import { ReactNode } from "react";
import Link from "next/link";
import { config } from "@/lib/config";

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-cream">
      <div className="border-b border-[#E5DDD4]/50 bg-white/60 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link
            href="/portal"
            className="font-display text-lg font-bold text-[#1A1816] hover:text-cyan transition-colors"
          >
            {config.brand.name} Portal
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-[#5C5650] hover:text-[#1A1816] transition-colors"
            >
              Back to site
            </Link>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
