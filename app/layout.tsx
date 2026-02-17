import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { config } from "@/lib/config";

export const metadata: Metadata = {
  title: `${config.brand.name} — Run your startup like it already has an ops team`,
  description:
    "A single command center for subscriptions, revenue, partnerships, pipeline, contacts, runway — and an AI copilot built for founders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-body min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 pt-16">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
