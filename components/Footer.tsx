"use client";

import Link from "next/link";
import { config } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t border-white/40 bg-cream-alt/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <Link
              href="/"
              className="font-display text-lg font-semibold text-[#2D2A26]"
            >
              {config.brand.name}
            </Link>
            <p className="mt-1 text-sm text-[#5C5650]">
              Clarity is your competitive advantage.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-6">
              <li>
                <Link
                  href="/product"
                  className="text-sm text-[#4A4540] hover:text-cyan transition-colors"
                >
                  Product
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-[#4A4540] hover:text-cyan transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/sources"
                  className="text-sm text-[#4A4540] hover:text-cyan transition-colors"
                >
                  Sources
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <p className="mt-8 text-center text-xs text-[#5C5650]/80">
          © {new Date().getFullYear()} {config.brand.name}. A visionary product showcase.
        </p>
      </div>
    </footer>
  );
}
