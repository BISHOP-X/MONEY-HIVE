# MoneyHive Development Plan

**To:** Ayodeji  
**From:** Wisdom  
**Date:** January 19, 2026 (Updated)

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
| Vercel Deployment | ✅ Live (env vars configured) |
| Dashboard UI | ✅ Built + Protected |
| Send Money UI | ✅ Built + Protected |
| Pay Bills UI | ✅ Built + Protected |
| **Auth Pages** | ✅ Login + Signup + Verify |
| **Route Protection** | ✅ ProtectedRoute component |
| **Zustand Stores** | ✅ auth, recipients, transfer |
| **Mock Services** | ✅ transfers, bills, kyc, rates |

---

## Phase 1: Auth & User Management ✅ COMPLETE

**Infrastructure built. Ready for testing.**

| Task | Status |
|------|--------|
| Supabase Auth | ✅ Connected in App.tsx |
| Magic Link | ✅ Implemented in login page |
| Auth Pages | ✅ /login, /signup, /verify |
| Session Management | ✅ Zustand + Supabase listener |
| Route Protection | ✅ ProtectedRoute component |
| User Settings Page | 🔜 Next sprint |

**Files created:**
- `src/pages/login.tsx` - Email/password + magic link
- `src/pages/signup.tsx` - Registration with validation
- `src/pages/verify.tsx` - KYC verification flow
- `src/components/ProtectedRoute.tsx` - Route guards
- `src/store/auth.ts` - Auth state management

**Still needed:**
- Profiles table in Supabase (with auto-create trigger)
- User settings page (/settings)

---

## Phase 2: Recipients Management (Week 2)

**Zustand store ready. Need Supabase table.**

| Task | Status |
|------|--------|
| Recipients Store | ✅ `src/store/recipients.ts` |
| Recipients Table | 🔜 Create in Supabase |
| Add Recipient Flow | 🔜 Bank details (Nigeria) / Mobile money (Ghana, Kenya) |
| Edit/Delete Recipients | 🔜 CRUD operations |
| Favorites | ✅ Implemented in store |
| Bank Validation | ✅ Mock in `src/services/transfers.ts` |

**Files created:**
- `src/store/recipients.ts` - Recipients state

**Pages affected:**
- `/recipients` (new)
- `/recipients/add` (new)
- `/send-money` (connect to recipients)

---

## Phase 3: Send Money Flow (Week 2-3)

**Mock services ready. UI needs connection.**

| Task | Status |
|------|--------|
| Transfer Store | ✅ `src/store/transfer.ts` (multi-step wizard) |
| Mock Transfers API | ✅ `src/services/transfers.ts` |
| Exchange Rates | ✅ `src/services/rates.ts` |
| Fee Calculator | ✅ In transfers.ts |
| Transfer Form | 🔜 Connect to stores/services |
| Review & Confirm | 🔜 /send-money/confirm |
| Transaction Record | 🔜 Save to Supabase |
| Mock Success | ✅ Returns pending status |

**Files created:**
- `src/store/transfer.ts` - Transfer wizard state
- `src/services/transfers.ts` - Mock transfer API
- `src/services/rates.ts` - Exchange rates

**Pages affected:**
- `/send-money` (enhance existing)
- `/send-money/confirm` (new)
- `/send-money/success` (new)

---

## Phase 4: Bill Payments (Week 3)

**Mock services ready. UI needs connection.**

| Task | Status |
|------|--------|
| Mock Bills API | ✅ `src/services/bills.ts` |
| Bill Categories | ✅ Airtime, Electricity, TV, Internet, Water |
| Provider Selection | ✅ Nigerian, Ghanaian, Kenyan providers |
| Account Validation | ✅ Mock validation |
| Bill Payment Form | 🔜 Connect to services |
| Payment Confirmation | 🔜 /pay-bills/confirm |
| Transaction Record | 🔜 Save to Supabase |

**Files created:**
- `src/services/bills.ts` - Mock bills API with providers

**Pages affected:**
- `/pay-bills` (enhance existing)
- `/pay-bills/confirm` (new)

---

## Phase 5: Transaction History (Week 3)

**Need Supabase table.**

| Task | Status |
|------|--------|
| Transactions Table | 🔜 Create in Supabase |
| History Page | 🔜 List with filters |
| Transaction Details | 🔜 Click to view full details |
| Status Tracking | ✅ Statuses defined in services |
| Export | 🔜 Download as CSV (optional) |

**Pages affected:**
- `/dashboard` (show recent transactions)
- `/transactions` (new - full history)
- `/transactions/:id` (new - detail view)

---

## Phase 6: KYC ✅ UI READY

**UI built. Mock service ready. Swap in ComplyCube when approved.**

| Task | Status |
|------|--------|
| Mock KYC Service | ✅ `src/services/kyc.ts` |
| KYC Status Display | ✅ In auth store |
| Verification Page | ✅ `/verify` with full flow |
| ID Upload UI | ✅ Passport/ID selection |
| Selfie Capture | ✅ Camera placeholder |
| Mock Verification | ✅ Auto-approve in dev |
| Limit Enforcement | ✅ `canTransfer()` function |

**Files created:**
- `src/services/kyc.ts` - Mock KYC with tiers and limits
- `src/pages/verify.tsx` - Full verification flow

**Pages affected:**
- `/verify` (✅ complete)
- `/dashboard` (show KYC status)
- `/send-money` (block if unverified)

---

## External Integrations (Swap In When Ready)

| Service | Purpose | Status | Mock Ready |
|---------|---------|--------|------------|
| Flutterwave | Transfers to Africa | ⏳ Awaiting | ✅ `transfers.ts` |
| Flutterwave Bills | Bill payments | ⏳ Awaiting | ✅ `bills.ts` |
| ComplyCube | KYC/Identity | ⏳ Awaiting | ✅ `kyc.ts` |
| Nium | Global transfers | ⏳ Awaiting | ✅ `rates.ts` |

**Code structure (READY):**
```
src/services/
├── index.ts        → Barrel export
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
├── profiles        🔜 Week 1 (create now)
├── recipients      🔜 Week 2
└── transactions    🔜 Week 3
```

**Zustand Stores (READY):**
```
src/store/
├── index.ts        ✅ Barrel export
├── auth.ts         ✅ User + KYC status
├── recipients.ts   ✅ Saved recipients
└── transfer.ts     ✅ Multi-step wizard
```

---

## Timeline Summary (Updated)

| Week | Focus | Status |
|------|-------|--------|
| 1 | Auth + Profiles | ✅ Auth done, profiles table needed |
| 2 | Recipients + Send Money | 🔜 Connect UI to stores |
| 3 | Bills + History | 🔜 Connect UI to services |
| 4 | KYC UI | ✅ Complete |
| 5 | Integration | ⏳ Swap in real APIs |
| 6 | Testing + Launch | ⏳ Final QA |

---

## What We Need From You

1. **Flutterwave** - Sandbox API keys (can test immediately)
2. **ComplyCube** - Startup program status update
3. **Nium** - Partnership confirmation

---

## Immediate Next Steps

1. Create `profiles` table in Supabase with auto-create trigger
2. Create `recipients` table in Supabase
3. Connect Send Money page to `useTransferStore` + mock services
4. Connect Pay Bills page to `bills.ts` service
5. Create `/settings` page for user profile management

---

## What's Ready to Demo

With preview mode (`?preview=moneyhive2024`), you can show:
- ✅ Full navigation and all pages
- ✅ Login/Signup flows (UI works, Supabase connected)
- ✅ KYC verification flow (mock approval)
- ✅ Send Money UI
- ✅ Pay Bills UI
- ✅ Dashboard

---

## Questions?

Let me know if you want to adjust priorities or add features.
