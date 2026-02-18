# StartupOS Portal Setup

This guide covers setting up the sign-in flow and NDCutz client portal.

## Prerequisites

- Node.js 18+
- A [Clerk](https://clerk.com) account
- A [Convex](https://convex.dev) account

## 1. Environment Variables

Copy `.env.example` to `.env.local` and fill in your keys:

```bash
cp .env.example .env.local
```

### Clerk

1. Go to [Clerk Dashboard](https://dashboard.clerk.com) → API Keys
2. Copy **Publishable Key** and **Secret Key**
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```

### Convex

1. Run `npx convex dev` in your project (this creates a Convex project and adds `NEXT_PUBLIC_CONVEX_URL` to `.env.local`)
2. In Convex Dashboard → Settings → Environment Variables, add:
   - `CLERK_JWT_ISSUER_DOMAIN` = your Clerk Frontend API URL (from Clerk Dashboard → API Keys)

### Clerk + Convex Auth

1. In Clerk Dashboard → JWT Templates → New template → choose **Convex**
2. Name must be exactly `convex`
3. Copy the Issuer URL and set it as `CLERK_JWT_ISSUER_DOMAIN` in Convex Dashboard

## 2. Run the App

```bash
# Terminal 1: Convex backend
npx convex dev

# Terminal 2: Next.js
npm run dev
```

## 3. First Login

1. Visit the site and click **Sign In**
2. Create an account (or sign in with Google, etc.)
3. You'll be redirected to `/portal`
4. Click **Set up NDCutz workspace** to seed the barbershop workspace with:
   - **Subscriptions**: Neon Database ($19/mo), Twilio SMS ($25/mo), Domain ($12/yr)
   - **Sample monthly revenue** for Sep 2024 – Feb 2025
5. You can then add/edit subscriptions and revenue from the NDCutz dashboard

## 4. AI Chatbot (Optional)

To enable the AI copilot in the portal (uses **Google Gemini** — free tier available):

1. Get an API key from [Google AI Studio](https://aistudio.google.com/apikey) (free)
2. In Convex Dashboard → Settings → Environment Variables, add:
   - **Name:** `GOOGLE_GENERATIVE_AI_API_KEY`
   - **Value:** your Google AI API key
3. Restart `npx convex dev` to pick up the new variable

The copilot appears on the NDCutz portal and the Product demo page. It can answer questions about your subscriptions, revenue, and give advice.

## Portal Features

- **Subscriptions**: Track Neon, Twilio, Domain, and add more
- **Monthly Revenue**: Log revenue by month
- **KPIs**: Monthly revenue, subscription costs, net margin
- **AI Copilot**: Chat with an AI assistant about your data (requires OpenAI API key)
