# StartupOS

A production-quality, high-tech marketing website and interactive product demo for StartupOS — a visionary product showcase for founders who need clarity.

## Tech Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for scroll animations and page transitions
- **shadcn/ui**-style components
- **Recharts** for data visualizations

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Routes

- `/` — Home (Hero, Problem, Stats, Features, How It Works, CTA)
- `/product` — Interactive dashboard demo
- `/about` — Visionary story
- `/sources` — Citations for statistics

## Brand Configuration

Edit `lib/config.ts` to change the brand name, colors, and other settings. The site is designed for easy rebranding.

## Features

- Light cream + muted crimson aesthetic
- Smooth page transitions (AnimatePresence)
- Scroll-triggered animations
- Animated stat counters
- Interactive product dashboard with KPIs, charts, tables, and Copilot chat UI
- Accessible (keyboard nav, aria, prefers-reduced-motion)
- No pricing or paywall — purely a visionary showcase
