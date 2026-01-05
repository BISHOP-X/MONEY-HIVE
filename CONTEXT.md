# MoneyHive Project Context

**Last Updated:** January 5, 2026

---

## Quick Start

```bash
npm install
npm run dev
```

**Preview Mode:** Add `?preview=moneyhive2024` to URL or press `Ctrl+Shift+D`

---

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React + Vite + Tailwind |
| Backend | Supabase (PostgreSQL + Auth + RLS) |
| Payments | Flutterwave (Africa) + Nium (Global) - pending |
| KYC | ComplyCube or Didit - pending |

---

## URLs

- **Live:** https://money-hive.vercel.app
- **GitHub:** https://github.com/BISHOP-X/MONEY-HIVE
- **Supabase:** https://vwgoiqyxvjuplhkdfpey.supabase.co

---

## Environment Variables

```env
VITE_SUPABASE_URL=https://vwgoiqyxvjuplhkdfpey.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3Z29pcXl4dmp1cGxoa2RmcGV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0NTQwNjksImV4cCI6MjA4MzAzMDA2OX0.c2_pkS5k379Yn99nfj-EEXiOzMPZrWf4gkQ2-VLvxTg
```

**Same vars needed in Vercel for production.**

---

## Database (Supabase)

### waitlist (live)
```sql
create table public.waitlist (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  first_name text,
  last_name text,
  phone text,
  country text,
  send_to_country text,
  referral_source text,
  created_at timestamptz default now(),
  converted_to_user boolean default false
);
```

### profiles (TODO)
- Extends auth.users
- KYC status, limits, referral codes

### transactions (TODO)
- Transfer/bill payment history

---

## Access Control

| Mode | Access | How |
|------|--------|-----|
| Public | Landing + Waitlist only | Default |
| Preview | Full site navigation | `?preview=moneyhive2024` |
| Dev | Toggle preview | `Ctrl+Shift+D` |

Implemented in `src/hooks/usePreviewMode.ts`

---

## Key Files

| File | Purpose |
|------|---------|
| `src/pages/home.tsx` | Landing page + Waitlist form |
| `src/lib/supabase.ts` | Supabase client + waitlist functions |
| `src/hooks/usePreviewMode.ts` | Preview mode logic |
| `src/components/Header.tsx` | Conditional nav based on preview |
| `.env` | Local env vars (gitignored) |
| `.env.example` | Template for env vars |

---

## Pages Built

| Route | Status |
|-------|--------|
| `/` | ✅ Landing + Waitlist (functional) |
| `/dashboard` | ✅ UI only |
| `/send-money` | ✅ UI only |
| `/pay-bills` | ✅ UI only |
| `/about`, `/blog`, `/contact` | ✅ Done |
| `/legal/*` | ✅ Done |

---

## What's Done

- [x] Frontend scaffolding
- [x] Supabase connected
- [x] Waitlist form → saves to DB
- [x] Animated success popup
- [x] Preview mode for stakeholders
- [x] Deployed to Vercel

## What's Next

- [ ] Add Vercel env vars + redeploy
- [ ] Route protection (redirect public users)
- [ ] Supabase Auth (signup/login)
- [ ] KYC integration (ComplyCube sandbox)
- [ ] Flutterwave sandbox (transfers)

---

## Business Context

**Target:** Diaspora in UK/US sending money to Nigeria, Ghana, Kenya  
**Model:** Remittance-as-a-Service integrator (not building banking rails)  
**Stakeholder:** Ayodeji (Bank MD)  
**Constraint:** Minimize costs - using free tiers and startup credits