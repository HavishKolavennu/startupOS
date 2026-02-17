"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { config } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/product", label: "Product" },
  { href: "/about", label: "About" },
  { href: "/sources", label: "Sources" },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-xl border-b border-white/40 shadow-[0_1px_0_rgba(0,201,183,0.08)]">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="font-display text-xl font-bold text-[#1A1816] transition-colors hover:text-cyan"
        >
          {config.brand.name}
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors relative py-2",
                  pathname === link.href
                    ? "text-cyan"
                    : "text-[#4A4540] hover:text-[#1A1816]"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan rounded-full shadow-[0_0_8px_rgba(0,201,183,0.5)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                Sign In
              </Button>
            </SignInButton>
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/product">Explore the Product</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/portal">Portal</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-cream-dark/50"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[#E5DDD4]/50 bg-cream/95 backdrop-blur-md"
          >
            <ul className="px-6 py-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block py-3 text-sm font-medium",
                      pathname === link.href ? "text-cyan" : "text-[#4A4540]"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2 space-y-2">
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button variant="outline" className="w-full" onClick={() => setMobileOpen(false)}>
                      Sign In
                    </Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <Button asChild className="w-full">
                    <Link href="/portal" onClick={() => setMobileOpen(false)}>
                      Portal
                    </Link>
                  </Button>
                </SignedIn>
                <Button asChild className="w-full">
                  <Link href="/product" onClick={() => setMobileOpen(false)}>
                    Explore the Product
                  </Link>
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
