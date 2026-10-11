# Leyla — Deployment Guide (Vercel & Supabase)

This guide provides the exact steps to deploy **Leyla** to production on **Supabase** and **Vercel**.

---

## 1. Supabase Setup (Database, Auth, Storage)

### Step 1.1: Create Project
1. Log in to your [Supabase Dashboard](https://supabase.com).
2. Click **New project**, name it `leyla-production`, choose a region near your primary users, and save your database password.

### Step 1.2: Execute SQL Migrations
1. Open the **SQL Editor** tab in Supabase.
2. Open `supabase/migrations/001_initial_schema.sql` from this repository.
3. Paste the contents into the SQL editor and click **Run**.
   - This sets up all 12 tables, Row Level Security (RLS) policies, and the user signup profile trigger.

### Step 1.3: Seed Data (Icebreakers & Resources)
1. In the Supabase SQL Editor, open `supabase/seed.sql`.
2. Paste the contents and click **Run**.
   - This populates 40 multilingual conversational openers and verified crisis helplines.

### Step 1.4: Verify RLS Isolation
1. In the SQL Editor, paste `supabase/tests/rls_test.sql` and run it.
2. Confirm that all tests report `SUCCESS: User B read 0 rows`.

### Step 1.5: Configure Authentication
1. Go to **Authentication -> Providers**.
2. **Email**: Ensure Email provider is enabled.
3. **Google OAuth**:
   - Enable Google provider.
   - Enter your Google Client ID and Secret from Google Cloud Console.
   - Add your Vercel domain to the Redirect URLs (e.g. `https://your-domain.vercel.app/auth/callback`).

### Step 1.6: Collect API Keys
Go to **Project Settings -> API** and copy:
- `Project URL` -> `NEXT_PUBLIC_SUPABASE_URL`
- `anon public key` -> `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `service_role secret` -> `SUPABASE_SERVICE_ROLE_KEY`

---

## 2. Upstash Redis (Rate Limiting)

1. Sign up at [Upstash](https://upstash.com).
2. Create a Serverless Redis database named `leyla-ratelimit`.
3. Copy:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

---

## 3. OpenAI API

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys).
2. Create a new API key named `leyla-production`.
3. Note the model: `gpt-4o-mini` (or `gpt-4o`).

---

## 4. Vercel Deployment

### Step 4.1: Import Repository
1. Push this repository to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Select and import the `leyla` repository.
4. Set root directory to `./` (or the folder containing `package.json`).

### Step 4.2: Environment Variables
Add the following in the Vercel **Environment Variables** panel:

| Variable | Description |
| :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Service Role secret key |
| `OPENAI_API_KEY` | OpenAI API Secret Key |
| `OPENAI_CHAT_MODEL` | `gpt-4o-mini` |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST URL |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST Token |
| `NEXT_PUBLIC_APP_URL` | Your Vercel production domain |
| `CRON_SECRET` | Random 32-character string for securing cron jobs |

### Step 4.3: Deploy
1. Click **Deploy**.
2. Vercel will run `npm run build` and generate the edge runtime and static assets.
3. Once finished, visit your live URL.

---

## 5. Post-Deployment Verification Checklist

- [ ] **Landing Page**: Verify hero animation, language strings, and trust row.
- [ ] **Avatar Dev Preview**: Test `/dev/leyla` for all 9 emotional states.
- [ ] **Crisis Guardrails**: Send "I want to end my life" in chat -> verify immediate deterministic crisis response with helplines.
- [ ] **Mood Tracker**: Log a mood score -> verify Recharts line chart and donut update.
- [ ] **Journal**: Write a test note -> verify private storage and RLS protection.
- [ ] **Data Export**: Go to Settings -> verify JSON export downloads cleanly.
