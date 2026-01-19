# MoneyHive Project Context

**Last Updated:** January 19, 2026

---

## Quick Start

```bash
npm install
npm run dev
```

**Preview Mode:** Add `?preview=moneyhive2024` to URL or press `Ctrl+Shift+D`

---

## What Is MoneyHive?

Remittance platform for **UK/US diaspora** sending money to **Nigeria, Ghana, Kenya**.
- Instant cross-border transfers
- Bill payments (airtime, electricity, TV)
- RaaS model (Remittance-as-a-Service) - we integrate, not build from scratch

---

## Stack

| Layer | Tech | Status |
|-------|------|--------|
| Frontend | React + Vite + Tailwind | ✅ Done |
| State | Zustand | ✅ Configured |
| Backend/Auth | Supabase (PostgreSQL + RLS) | ✅ Connected |
| Payments (Africa) | Flutterwave | ⏳ Awaiting keys |
| Payments (Global) | Nium | ⏳ Awaiting partnership |
| KYC/Identity | ComplyCube (Plan A) / Didit (Plan B) | ⏳ Awaiting approval |

---

## URLs

| Environment | URL |
|-------------|-----|
| Production | https://money-hive.vercel.app |
| GitHub | https://github.com/BISHOP-X/MONEY-HIVE |
| Supabase | https://vwgoiqyxvjuplhkdfpey.supabase.co |

---

## Environment Variables

Environment variables are configured in:
- **Local:** `.env` file (gitignored)
- **Production:** Vercel Dashboard → Settings → Environment Variables ✅

Required variables:
```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

---

## Database Schema

### waitlist ✅ (live in Supabase)
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

-- RLS enabled, anonymous insert allowed
```

### profiles (TODO)
```sql
-- Extends auth.users
-- Fields: kyc_status, daily_limit, referral_code, referred_by
```

### recipients (TODO)
```sql
-- Saved transfer recipients
-- Fields: user_id, name, bank_name, account_number, mobile_number
```

### transactions (TODO)
```sql
-- All transfers and bill payments
-- Fields: user_id, type, amount, status, provider_reference
```

---

## ⚠️ TWO-MODE SYSTEM (IMPORTANT)

This project operates in **two distinct modes**:

### PUBLIC MODE (Default - What users see)
- **Landing page only** → Waitlist signup form
- **Informational pages** → About, Blog, Contact, Legal
- **Everything else** → Redirects to `/` (home)
- Users cannot access: login, signup, dashboard, send-money, pay-bills
- This is for collecting waitlist signups before launch

### PREVIEW MODE (Stakeholder testing)
- **Full access** to all pages including internal features
- Used for non-technical stakeholders to test and give feedback
- **How to activate:**
  - URL: `?preview=moneyhive2024` (e.g., `https://money-hive.vercel.app?preview=moneyhive2024`)
  - Keyboard: `Ctrl+Shift+D` (for developers)
- Preview mode persists in localStorage until manually disabled
- Exit preview: Click "Exit Preview" banner or clear localStorage

### Route Behavior Summary

| Route | Public Mode | Preview Mode |
|-------|-------------|--------------|
| `/` | ✅ Waitlist | ✅ Waitlist |
| `/about`, `/blog`, `/contact` | ✅ Visible | ✅ Visible |
| `/legal/*` | ✅ Visible | ✅ Visible |
| `/login`, `/signup` | ❌ → Redirects to `/` | ✅ Visible |
| `/dashboard` | ❌ → Redirects to `/` | ✅ Visible |
| `/send-money`, `/pay-bills` | ❌ → Redirects to `/` | ✅ Visible |
| `/verify` | ❌ → Redirects to `/` | ✅ Visible |

Implementation: 
- `src/hooks/usePreviewMode.ts` - Preview mode state + localStorage
- `src/components/ProtectedRoute.tsx` - Route guards for both modes

---

## Project Structure

```
src/
├── components/
│   ├── ProtectedRoute.tsx    # Auth guards for routes
│   ├── Header.tsx            # Nav (conditional on auth/preview)
│   └── ui/                   # shadcn/ui components
├── hooks/
│   └── usePreviewMode.ts     # Preview mode state
├── lib/
│   └── supabase.ts           # Supabase client
├── pages/
│   ├── home.tsx              # Landing + Waitlist
│   ├── login.tsx             # Email/password + magic link
│   ├── signup.tsx            # Registration with validation
│   ├── verify.tsx            # KYC verification flow
│   ├── dashboard.tsx         # User dashboard
│   ├── send-money.tsx        # Transfer wizard
│   └── pay-bills.tsx         # Bill payments
├── services/
│   ├── index.ts              # Barrel export
│   ├── transfers.ts          # Mock transfer API
│   ├── bills.ts              # Mock bills API
│   ├── kyc.ts                # Mock KYC verification
│   └── rates.ts              # Exchange rates
├── store/
│   ├── index.ts              # Barrel export
│   ├── auth.ts               # Auth state (Zustand)
│   ├── recipients.ts         # Recipients state
│   └── transfer.ts           # Transfer form state
└── App.tsx                   # Routes + auth listener
```

---

## Key Files

| File | Purpose |
|------|---------|
| `src/App.tsx` | Routing + auth listener |
| `src/components/ProtectedRoute.tsx` | Route protection |
| `src/pages/login.tsx` | Login (email/password + magic link) |
| `src/pages/signup.tsx` | Registration |
| `src/pages/verify.tsx` | KYC flow |
| `src/store/auth.ts` | Auth state management |
| `src/services/` | Mock API implementations |
| `.env` | Local env vars (gitignored) |
| `PLAN.md` | Full development roadmap |

---

## Pages

| Route | Status | Protection |
|-------|--------|------------|
| `/` | ✅ Functional | Public |
| `/login` | ✅ Done | Public (redirects if logged in) |
| `/signup` | ✅ Done | Public (redirects if logged in) |
| `/verify` | ✅ Done | Auth required |
| `/dashboard` | ✅ UI + Protected | Auth or Preview |
| `/send-money` | ✅ UI + Protected | Auth or Preview |
| `/pay-bills` | ✅ UI + Protected | Auth or Preview |
| `/about` | ✅ Done | Public |
| `/blog` | ✅ Done | Public |
| `/contact` | ✅ Done | Public |
| `/legal/*` | ✅ Done | Public |

---

## Completed

- [x] React + Vite + Tailwind setup
- [x] All UI pages built
- [x] Supabase connected
- [x] Waitlist form → saves to DB
- [x] Animated success popup on submit
- [x] Preview mode for stakeholders
- [x] Deployed to Vercel (env vars configured)
- [x] Route protection (ProtectedRoute component)
- [x] Auth pages (login, signup, verify)
- [x] Zustand stores (auth, recipients, transfer)
- [x] Mock services layer (transfers, bills, kyc, rates)

---

## Next Steps (Priority Order)

1. **Supabase Auth testing** → Verify email confirmation flow works
2. **Profiles table** → Auto-create on user signup (DB trigger)
3. **Recipients CRUD** → Connect to Supabase table
4. **Send Money flow** → Connect to mock services, show exchange rates
5. **Bill payments** → Connect to mock bills service
6. **Transaction history** → Create table, save all transfers/bills
7. **KYC integration** → When ComplyCube approves

---

## Mock Services (Ready for Swap)

All mock services are in `src/services/`. When API keys arrive, swap implementations:

| Service | Mock File | Real Integration |
|---------|-----------|------------------|
| Transfers | `transfers.ts` | Flutterwave Transfers API |
| Bills | `bills.ts` | Flutterwave Bills API |
| KYC | `kyc.ts` | ComplyCube SDK |
| Rates | `rates.ts` | Flutterwave/Nium rates |

---

## External Services (Pending)

| Service | Purpose | Status | Action |
|---------|---------|--------|--------|
| Flutterwave | Payouts to Africa + Bills | ⏳ | Need sandbox API keys |
| ComplyCube | KYC verification | ⏳ | Applied for $50k startup credits |
| Nium | Global collection (UK/US) | ⏳ | Partnership discussion pending |

---

## Architecture Notes

- **No backend server** - Supabase handles everything (auth, DB, RLS)
- **RLS enabled** - Row Level Security on all tables
- **Mock-first development** - All services have mock implementations
- **Preview mode** - Allows stakeholder demos without auth
- **State management** - Zustand for auth, recipients, transfer wizard