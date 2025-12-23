# MoneyHive Project Context

**Last Updated:** December 23, 2025  
**Project:** MoneyHive (Fintech/Remittance)

---

## 1. Project Overview & Business Model

**MoneyHive** is a remittance platform connecting the **Diaspora (UK/US)** to Africa (Nigeria, Ghana, Kenya).

- **Core Value:** Instant cross-border transfers and bill payments
- **Strategic Pivot:** Shifting from "Build from Scratch" to a **"Modern Fintech Integrator"** model
- **Why:** To bypass years of legal/licensing delays and launch an MVP in 8-10 weeks using Remittance-as-a-Service (RaaS)

---

## 2. Technical Stack

| Component | Technology | Status |
|-----------|------------|--------|
| **Frontend** | React + Vite + Tailwind CSS | ✅ Set up |
| **Backend/DB** | Supabase (PostgreSQL + Auth + RLS) | ✅ Connected |
| **Banking Engine** | Nium (Global) + Flutterwave (Africa) | 🔜 Pending |
| **Identity (KYC)** | ComplyCube (Plan A) / Didit (Plan B) | 🔜 Pending |
| **AI Features** | Simple Moving Averages (SMA) for rate trends | 🔜 Pending |

---

## 3. Current Infrastructure

### Live URLs
- **Production:** https://money-hive.vercel.app
- **Stakeholder Preview:** https://money-hive.vercel.app?preview=moneyhive2024
- **GitHub:** https://github.com/BISHOP-X/MONEY-HIVE

### Supabase Project
- **URL:** https://mhuuzxxecncsfugeqide.supabase.co
- **Anon Key:** `sb_publishable_TikPWezN4mOE-Ply5NxWuA_bVJhFilJ`

### Environment Variables (Required)
```env
VITE_SUPABASE_URL=https://mhuuzxxecncsfugeqide.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_TikPWezN4mOE-Ply5NxWuA_bVJhFilJ
```

---

## 4. Access Control System

| Mode | Who | Access |
|------|-----|--------|
| **Public** | Regular visitors | Landing page + Waitlist only |
| **Preview** | Stakeholders (Ayodeji) | Full navigation via `?preview=moneyhive2024` |
| **Dev** | Me | Keyboard shortcut `Ctrl+Shift+D` toggles dev mode |

---

## 5. Database Schema

### Waitlist Table (Created)
```sql
create table public.waitlist (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  full_name text,
  country text default 'GB',
  referral_source text,
  created_at timestamp with time zone default now(),
  converted_to_user boolean default false
);
```

### Profiles Table (TODO)
- Extends Supabase auth.users
- KYC status tracking
- Referral system

### Transactions Table (TODO)
- Transfer history
- Bill payments
- Status tracking

---

## 6. Compliance & Identity Strategy

**The Constraint:** Ayodeji wants "Zero Cost."

### My "Golden Runway" Strategy:
- **Plan A (Primary):** ComplyCube - Ayodeji applied for Startup Program ($50k Credits)
- **Plan B (Backup):** Didit - Free ID checks, ~$0.92 for AML

### Architecture Decisions:
- **Tiered Verification:** Users verified only when clicking "Send Money" (saves credits)
- **Manual Review Dashboard:** Safety net if APIs fail

---

## 7. Built Pages

| Route | Page | Status |
|-------|------|--------|
| `/` | Landing + Waitlist | ✅ Done |
| `/dashboard` | User Dashboard | ✅ UI Done (needs auth) |
| `/send-money` | Send Money | ✅ UI Done |
| `/pay-bills` | Pay Bills | ✅ UI Done |
| `/about` | About Us | ✅ Done |
| `/blog` | Blog | ✅ Done |
| `/contact` | Contact | ✅ Done |
| `/legal/*` | Terms, Privacy, Cookies | ✅ Done |

---

## 8. Current Status & Next Steps

### Completed ✅
- [x] React + Vite frontend
- [x] Supabase connected (waitlist table with RLS)
- [x] Waitlist form working locally
- [x] Preview mode for stakeholders
- [x] Deployed to Vercel

### Vercel Setup Required
Add these in **Vercel → Settings → Environment Variables**:
- `VITE_SUPABASE_URL` = `https://mhuuzxxecncsfugeqide.supabase.co`
- `VITE_SUPABASE_ANON_KEY` = `sb_publishable_TikPWezN4mOE-Ply5NxWuA_bVJhFilJ`
- Then **redeploy** for changes to take effect

### Next Up 🔜
- [ ] Route protection (pages only accessible in preview mode)
- [ ] Supabase Auth integration
- [ ] ComplyCube sandbox integration

---

## 9. Key Decisions & Agreements

1. **Supabase over Firebase:** Better for financial data
2. **React + Vite over Next.js:** Simpler, PWA can be added later via plugin
3. **Solo Dev Approach:** I'm building MVP solo, hiring juniors later
4. **Diaspora Focus:** Global Passports (UK/US), not Nigerian IDs