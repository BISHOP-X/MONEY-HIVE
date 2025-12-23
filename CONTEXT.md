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

| Component | Technology | Reasoning |
|-----------|------------|-----------|
| **Frontend** | React + Vite + Tailwind CSS | Fast dev server, optimized builds. PWA can be added via vite-plugin-pwa when needed. |
| **Backend/DB** | Supabase | PostgreSQL for financial integrity, Row-Level Security (RLS), built-in auth. |
| **Banking Engine** | Nium (Global) + Flutterwave (Africa) | Hybrid model: Nium handles UK collection/compliance; Flutterwave handles African payouts. |
| **Identity (KYC)** | ComplyCube (Plan A) / Didit (Plan B) | See Compliance Strategy below. |
| **AI Features** | Simple Moving Averages (SMA) | Simple math to show rate trends (Up/Down) for MVP. No complex ML. |

---

## 3. Compliance & Identity Strategy

**The Constraint:** Ayodeji wants "Zero Cost."

**The Problem:** UK/US regulations require Passport, Address, and Sanctions (AML) checks. Free tools usually charge for AML.

### My "Golden Runway" Strategy:

- **Plan A (Primary):** ComplyCube - Ayodeji has applied for their Startup Program ($50k Credits). This makes bank-grade compliance (AML + ID) effectively **free** for Year 1.
- **Plan B (Backup):** Didit - If ComplyCube fails, use Didit. Free ID checks but charges ~$0.92 for AML/Address checks.

### Architecture Decisions:

- **Tiered Verification:** Users are only verified when they click "Send Money," never at sign-up. This saves credits/money.
- **Manual Review Dashboard:** I'm building an internal dashboard as a safety net. If APIs fail or delay, I can manually approve users to keep launch on track.

---

## 4. Key Decisions & Agreements

1. **Supabase over Firebase:** Agreed. Better for financial data structures.
2. **Solo Dev Approach:** I'm building the MVP solo (avoiding "too many cooks") and will hire juniors later if needed.
3. **"Free" vs. "Credits":** I've educated Ayodeji that "Free APIs" are risky/limited, and "Startup Credits" are the correct path to zero cost.
4. **Diaspora Focus:** The app focuses on **Global Passports** (UK/US), not Nigerian IDs (BVN/NIN).

---

## 5. Current Status & Next Steps

**Ayodeji:** Has applied for ComplyCube credits. Waiting on approval.

**My Tasks:**
- [x] Initialize Supabase project
- [x] Build React + Vite frontend shell
- [ ] Integrating ComplyCube Sandbox (Test Mode) so development isn't blocked by credit approval wait time
- [ ] Set up Supabase database schema (users, transactions, recipients)
- [ ] Build core transfer flow UI
- [ ] Integrate Flutterwave sandbox for African payouts