# MoneyHive Development Plan

**To:** Ayodeji  
**From:** Wisdom  
**Date:** January 5, 2026

---

## Strategy

We will build everything we can **now** while waiting for third-party approvals (Flutterwave, ComplyCube, Nium). This maximizes productivity and ensures we're ready to go live the moment approvals come through.

**Approach:** Build complete flows with mock/placeholder integrations → swap in real APIs when ready.

---

## Current Status

| Component | Status |
|-----------|--------|
| Landing Page | ✅ Complete |
| Waitlist Form | ✅ Saving to Supabase |
| Preview Mode | ✅ Working |
| Vercel Deployment | ✅ Live |
| Dashboard UI | ✅ Built (needs backend) |
| Send Money UI | ✅ Built (needs backend) |
| Pay Bills UI | ✅ Built (needs backend) |

---

## Phase 1: Auth & User Management (Week 1)

**No external dependencies. Can start immediately.**

| Task | Description |
|------|-------------|
| Supabase Auth | Email/password signup + login |
| Magic Link | Passwordless login option |
| Profiles Table | Store user data, KYC status, limits |
| Session Management | Persist login, auto-logout on expiry |
| Route Protection | Redirect unauthenticated users |
| User Settings Page | Update name, email, password |

**Pages affected:**
- `/signup` (new)
- `/login` (new)
- `/dashboard` (connect to auth)
- `/settings` (new)

---

## Phase 2: Recipients Management (Week 2)

**No external dependencies.**

| Task | Description |
|------|-------------|
| Recipients Table | Store saved recipients in Supabase |
| Add Recipient Flow | Bank details (Nigeria) / Mobile money (Ghana, Kenya) |
| Edit/Delete Recipients | CRUD operations |
| Favorites | Quick access to frequent recipients |
| Bank Validation | Mock validation, swap in real API later |

**Pages affected:**
- `/recipients` (new)
- `/recipients/add` (new)
- `/send-money` (connect to recipients)

---

## Phase 3: Send Money Flow (Week 2-3)

**Uses mock exchange rates. Flutterwave integration swapped in later.**

| Task | Description |
|------|-------------|
| Transfer Form | Select recipient, amount, delivery method |
| Exchange Rate Display | Hardcoded rates for now, API later |
| Fee Calculator | Show transparent breakdown |
| Review & Confirm | Summary before submission |
| Transaction Record | Save to Supabase with "pending" status |
| Mock Success | Simulate successful transfer |

**Pages affected:**
- `/send-money` (enhance existing)
- `/send-money/confirm` (new)
- `/send-money/success` (new)

---

## Phase 4: Bill Payments (Week 3)

**Uses mock provider list. Flutterwave Bills API later.**

| Task | Description |
|------|-------------|
| Bill Categories | Airtime, Electricity, TV, Internet |
| Provider Selection | Mock Nigerian providers (DSTV, IKEDC, etc.) |
| Bill Payment Form | Account/meter number, amount |
| Payment Confirmation | Review before paying |
| Transaction Record | Save to Supabase |

**Pages affected:**
- `/pay-bills` (enhance existing)
- `/pay-bills/confirm` (new)

---

## Phase 5: Transaction History (Week 3)

**No external dependencies.**

| Task | Description |
|------|-------------|
| Transactions Table | Store all transfers and bill payments |
| History Page | List with filters (date, type, status) |
| Transaction Details | Click to view full details |
| Status Tracking | Pending → Processing → Complete/Failed |
| Export | Download as CSV (optional) |

**Pages affected:**
- `/dashboard` (show recent transactions)
- `/transactions` (new - full history)
- `/transactions/:id` (new - detail view)

---

## Phase 6: KYC Placeholder (Week 4)

**Build UI now, connect to ComplyCube/Didit when approved.**

| Task | Description |
|------|-------------|
| KYC Status Display | Show "Unverified", "Pending", "Verified" |
| Verification Prompt | Trigger before first transfer |
| ID Upload UI | Passport/ID photo upload form |
| Selfie Capture | Camera integration for liveness |
| Mock Verification | Auto-approve in dev, real API in prod |
| Limit Enforcement | Restrict amounts based on KYC tier |

**Pages affected:**
- `/verify` (new)
- `/dashboard` (show KYC status)
- `/send-money` (block if unverified)

---

## External Integrations (Swap In When Ready)

| Service | Purpose | Status | Mock Available |
|---------|---------|--------|----------------|
| Flutterwave | Transfers to Africa | ⏳ Awaiting | ✅ Yes |
| Flutterwave Bills | Bill payments | ⏳ Awaiting | ✅ Yes |
| ComplyCube | KYC/Identity | ⏳ Awaiting | ✅ Yes |
| Nium | Global transfers | ⏳ Awaiting | ✅ Yes |

**Code structure:**
```
src/services/
├── transfers.ts    → mock now, Flutterwave later
├── bills.ts        → mock now, Flutterwave later
├── kyc.ts          → mock now, ComplyCube later
└── rates.ts        → hardcoded now, live API later
```

---

## Database Schema (Final)

```
Tables:
├── waitlist        ✅ Live
├── profiles        🔜 Week 1
├── recipients      🔜 Week 2
└── transactions    🔜 Week 3
```

---

## Timeline Summary

| Week | Focus | Deliverable |
|------|-------|-------------|
| 1 | Auth + Profiles | Users can sign up, log in, manage settings |
| 2 | Recipients + Send Money | Full transfer flow (mock) |
| 3 | Bills + History | Bill payments + transaction tracking |
| 4 | KYC UI | Verification flow ready for API |
| 5 | Integration | Swap in real APIs as approvals arrive |
| 6 | Testing + Launch | Final QA, production deployment |

---

## What We Need From You

1. **Flutterwave** - Sandbox API keys (can test immediately)
2. **ComplyCube** - Startup program status update
3. **Nium** - Partnership confirmation
4. **Vercel** - Add environment variables (5 min task)

---

## Questions?

Let me know if you want to adjust priorities or add features.
