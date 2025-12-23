# MoneyHive Project Context: Comprehensive Summary

**Date:** December 23, 2025
**Project:** MoneyHive (Fintech/Remittance)
**Key Stakeholders:**

* **Ayodeji:** Founder (Business/Growth focus). Cost-conscious, focused on "Free APIs" and rapid launch.
* **Bishop (User):** Lead Developer/CTO. Responsible for technical architecture, API integration, and MVP execution.

---

## 1. Project Overview & Business Model

**MoneyHive** is a remittance platform connecting the **Diaspora (UK/US)** to Africa (Nigeria, Ghana, Kenya).

* **Core Value:** Instant cross-border transfers and bill payments.
* **Strategic Pivot:** Shifting from a "Build from Scratch" banking model to a **"Modern Fintech Integrator"** model.
* **Why:** To bypass years of legal/licensing delays and launch an MVP in 8-10 weeks using Remittance-as-a-Service (RaaS).



## 2. The Technical Stack (The "Bishop Stack")

| Component | Technology | Reasoning |
| --- | --- | --- |
| **Frontend** | **React + Vite + Tailwind CSS** | Fast dev server, optimized builds. PWA can be added via vite-plugin-pwa when needed. |
| **Backend/DB** | **Supabase** | Replaces Firebase. Provides Relational DB (PostgreSQL) for financial integrity and Row-Level Security (RLS). |
| **Banking Engine** | **Nium** (Global) + **Flutterwave** (Africa) | **Hybrid Model:** Nium handles UK collection/compliance; Flutterwave handles African payouts. They hold the licenses. |
| **Identity (KYC)** | **ComplyCube** (Plan A) / **Didit** (Plan B) | See Section 3 below. |
| **AI Features** | **Simple Moving Averages (SMA)** | Replaced complex ML models with simple math to show "Rate Trends" (Up/Down) for the MVP. |

## 3. The Compliance & Identity Strategy (Critical)

* **The Constraint:** Ayodeji wants "Zero Cost."
* **The Problem:** UK/US regulations require **Passport**, **Address**, and **Sanctions (AML)** checks. Free tools usually charge for AML.
* **The "Golden Runway" Strategy:**
* **Plan A (Primary):** **ComplyCube.** Ayodeji has applied for their **Startup Program ($50k Credits)**. This makes bank-grade compliance (AML + ID) effectively **free ($0)** for Year 1.
* **Plan B (Backup):** **Didit.** If ComplyCube fails, use Didit. It has free ID checks but charges **~$0.92** for AML/Address checks. (Cheaper than Sumsub, but not free).
* **Architecture:** **"Tiered Verification."** Users are *only* verified when they click "Send Money," never at sign-up. This saves credits/money.
* **Safety Net:** Bishop is building a **"Manual Review Dashboard"** internally. If APIs fail or delay, Bishop can manually approve users to keep the launch on track.



## 4. Key Decisions & Agreements

1. **Supabase over Firebase:** Agreed. Better for financial data structures.
2. **Solo Dev Approach:** Agreed. Bishop will build the MVP solo (avoiding "too many cooks") and hire juniors later if needed.
3. **"Free" vs. "Credits":** Bishop successfully educated Ayodeji that "Free APIs" are risky/limited, and "Startup Credits" are the correct path to zero cost.
4. **Diaspora Focus:** Verified. The app will focus on **Global Passports** (UK/US), not Nigerian IDs (BVN/NIN).

## 5. Current Status & Next Steps

* **Ayodeji:** Has applied for ComplyCube credits. Waiting on approval.
* **Bishop:**
* Initializing Supabase project.
* Building the Next.js PWA shell.
* Integrating **ComplyCube Sandbox** (Test Mode) immediately so development is not blocked by the credit approval wait time.