# MoneyHive - UI Flow & Stakeholder Access

## Overview

MoneyHive uses a **Two-Mode System** for controlled access:

1. **Public Mode** (default) - Regular users see only the landing page + waitlist
2. **Preview Mode** (stakeholders) - Full access to test the app via `?preview=moneyhive2024`

---

## Access Modes

### Public Mode (Default)
- Landing page with waitlist signup
- About, Blog, Contact, Legal pages
- **Everything else redirects to home**
- No login, no signup, no dashboard

### Preview Mode (Stakeholders)
- **Activation**: Add `?preview=moneyhive2024` to any URL
- **Auto-enabled**: localhost development
- **Persisted**: Saved in localStorage after activation
- **Exit**: Click "Exit Preview" in the amber banner

---

## Stakeholder Authentication Flow

### Mock Auth System
For stakeholder testing, we use a **mock authentication system** that simulates the real auth flow without requiring actual Supabase credentials.

```
┌─────────────────────────────────────────────────────────────┐
│                    STAKEHOLDER FLOW                          │
└─────────────────────────────────────────────────────────────┘

NOT LOGGED IN (Preview Mode):
┌─────────────────────────────────────────────────────────────┐
│ Header shows: [Log In] [Sign Up]                            │
│ Hero CTA: "Get Started" → /signup                           │
│                                                              │
│ Clicks "Send Money" / "Pay Bills" / "Dashboard"             │
│                    ↓                                         │
│         → Redirected to /login                              │
│         → Beautiful UI with mock login                      │
│         → Click "Sign In" → Sets mock session               │
│         → Redirected to original intended page              │
└─────────────────────────────────────────────────────────────┘

LOGGED IN (Mock Session):
┌─────────────────────────────────────────────────────────────┐
│ Header shows: [Dashboard] [👤 User Name ▼]                  │
│ Hero CTA: "Go to Dashboard"                                 │
│                                                              │
│ Clicks "Send Money"  → Transfer wizard                      │
│ Clicks "Pay Bills"   → Bill payment wizard                  │
│ Clicks "Dashboard"   → User dashboard                       │
│                                                              │
│ User dropdown menu:                                          │
│   • Dashboard                                                │
│   • Settings                                                 │
│   • Sign Out (clears session, returns to home)              │
└─────────────────────────────────────────────────────────────┘
```

---

## Header States

### Desktop Header

| Mode | Auth State | Navigation | Right Buttons |
|------|------------|------------|---------------|
| Public | N/A | None | `[Join Waitlist]` |
| Preview | Not logged in | Send Money, Pay Bills, About, Blog | `[Log In]` `[Sign Up]` |
| Preview | Logged in | Send Money, Pay Bills, About, Blog | `[Dashboard]` `[👤 User ▼]` |

### Mobile Header

| Mode | Auth State | Menu Items |
|------|------------|------------|
| Public | N/A | `[Join]` button only |
| Preview | Not logged in | Nav links + `Log In` + `Sign Up` |
| Preview | Logged in | Nav links + `Dashboard` + `Sign Out` |

---

## Pages & Access Control

### Public Pages (Always Visible)
- `/` - Landing page
- `/about` - About us
- `/blog` - Blog posts
- `/careers` - Careers
- `/contact` - Contact
- `/legal/terms` - Terms of Service
- `/legal/privacy` - Privacy Policy
- `/legal/cookies` - Cookie Policy

### Auth Pages (Preview Mode Only)
- `/login` - Login page (redirects to dashboard if already logged in)
- `/signup` - Signup page (redirects to dashboard if already logged in)

### Protected Pages (Preview Mode + Auth Required)
- `/dashboard` - User dashboard
- `/send-money` - Transfer wizard
- `/pay-bills` - Bill payment wizard
- `/verify` - KYC verification (future)

---

## Files Structure

```
src/
├── hooks/
│   ├── usePreviewMode.ts      # Preview mode detection & toggle
│   └── useStakeholderAuth.ts  # Mock auth state management
├── components/
│   ├── Header.tsx             # Auth-aware header navigation
│   ├── Hero.tsx               # Auth-aware hero CTA
│   └── ProtectedRoute.tsx     # Route guards for protected pages
└── pages/
    ├── login.tsx              # Beautiful mock login page
    ├── signup.tsx             # Beautiful mock signup page
    └── dashboard.tsx          # User dashboard
```

---

## Implementation Details

### useStakeholderAuth Hook
```typescript
// Persisted mock auth state
interface StakeholderAuthState {
  isAuthenticated: boolean;
  mockUser: { id, email, firstName, lastName, createdAt } | null;
  intendedDestination: string | null;  // For redirect after login
  
  login(email, firstName?, lastName?): void;
  signup(email, firstName, lastName): void;
  logout(): void;
  setIntendedDestination(path): void;
}
```

### ProtectedRoute Component
```typescript
// In preview mode: requires mock auth, redirects to /login if not authenticated
// In public mode: always redirects to / (home)
```

---

## Phase Progress

### ✅ Phase 1: Mock Auth System (COMPLETE)
- [x] Create `useStakeholderAuth` hook
- [x] Redesign Login page with beautiful UI
- [x] Redesign Signup page with beautiful UI
- [x] Update ProtectedRoute to require mock login

### ✅ Phase 2: Header & Navigation Fix (COMPLETE)
- [x] Show Login/Signup when not authenticated
- [x] Show Dashboard + User dropdown when authenticated
- [x] Update Hero CTA based on auth state
- [x] Update mobile menu

### 🔲 Phase 3: Build Real Wizards (PENDING)
- [ ] Rebuild `/send-money` as multi-step transfer wizard
- [ ] Rebuild `/pay-bills` as multi-step bill payment wizard
- [ ] Build `/recipients` management page
- [ ] Build `/transactions` history page
- [ ] Connect Dashboard to real Supabase data

---

## Testing Checklist

### Public Mode Test
1. Open site without preview param
2. Verify only landing page is accessible
3. Verify header shows only "Join Waitlist"
4. Verify navigating to /dashboard redirects to /

### Preview Mode Test (Not Logged In)
1. Navigate to `/?preview=moneyhive2024`
2. Verify amber banner appears
3. Verify header shows "Log In" and "Sign Up"
4. Verify clicking "Send Money" redirects to /login
5. Verify Hero CTA says "Get Started"

### Preview Mode Test (Logged In)
1. Log in via mock login
2. Verify header shows "Dashboard" and user dropdown
3. Verify clicking "Send Money" goes to send-money page
4. Verify Hero CTA says "Go to Dashboard"
5. Verify Sign Out clears session and returns to home

---

## Notes for Stakeholders

- **Mock Login**: Any email works, no real authentication
- **Quick Demo Login**: Use the "Quick Demo Login" button for instant access
- **Data is Mock**: Dashboard data is placeholder, not real
- **Exit Preview**: Click "Exit Preview" in the amber banner to return to public mode
