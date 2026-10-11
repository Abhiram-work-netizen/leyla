# Leyla — AI Mental Wellness Companion

> **"You're not alone. Let's get through this, together."**

Leyla is an AI mental wellness companion designed to be private, judgment-free, and always here for you. Built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, next-intl, Supabase, and the Vercel AI SDK.

---

## 🌟 Key Features

- **Twilight Aesthetic**: Dark-first purple/pink twilight theme with soft glassmorphism cards and smooth micro-animations.
- **Multilingual Support**: Fully internationalized with `next-intl` supporting English (`en`), Hindi (`hi`), Telugu (`te`), and Tamil (`ta`).
- **Reactive Leyla Avatar**: 9 emotional expression states (`idle`, `listening`, `thinking`, `happy`, `concerned`, `calm`, `celebrate`, `sleepy`, `hug`) with smooth crossfades and prefers-reduced-motion support.
- **Safety First**: Deterministic crisis classifier, OpenAI moderation, and locale-specific helplines. No raw chat text in logs.
- **Holistic Wellness Hub**: Daily mood tracker with Recharts, private encrypted journal, goal tracking with streak milestones, and Calm Space breathing exercises (4-7-8, box breathing).

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack, React 19)
- **Styling**: Tailwind CSS v4, custom glassmorphism design tokens
- **Animations**: Framer Motion
- **Internationalization**: next-intl (`en`, `hi`, `te`, `ta`)
- **Database & Auth**: Supabase (Postgres, Row Level Security, Auth)
- **AI Engine**: Vercel AI SDK + OpenAI API
- **Charts**: Recharts
- **Validation**: Zod
- **Rate Limiting**: Upstash Redis

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 20+
- npm or pnpm

### 2. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your Supabase, OpenAI, and Upstash Redis credentials.

### 3. Install & Run
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📁 Project Structure

```
leyla/
├── app/
│   ├── (marketing)/       # Landing page & public routes
│   ├── (app)/dashboard/   # Authenticated app shell & features
│   ├── api/               # API routes (chat, icebreakers, etc.)
│   ├── globals.css        # Twilight design tokens & animations
│   └── layout.tsx         # Root layout with i18n & SEO
├── components/
│   ├── leyla/             # LeylaAvatar state machine & animations
│   └── ui/                # Reusable UI primitives
├── lib/
│   ├── ai/                # AI system prompt & Vercel AI SDK integration
│   ├── safety/            # Crisis classifier & moderation
│   └── supabase/          # Supabase client & SSR helpers
├── messages/              # i18n dictionaries (en, hi, te, ta)
└── public/
    └── leyla/             # Expression assets & illustrations
```

---

## 📜 License
MIT
