# Didit Integration (Backup KYC Provider)

> **Status:** 📋 Plan B (if ComplyCube doesn't work out)  
> **Purpose:** Alternative KYC/Identity Verification  
> **Mock Ready:** ✅ `src/services/kyc.ts` (same interface)

---

## Why Didit as Backup?

- Potentially lower costs
- Different pricing model
- May have faster onboarding
- Good for comparison/negotiation

---

## What We'd Use Didit For

### Identity Verification
- Document verification
- Selfie/liveness check
- Face matching
- Fraud detection

---

## API Endpoints (Research Needed)

```
POST /verify/document
POST /verify/selfie
POST /verify/liveness
GET /verification/:id
```

---

## Integration Notes

The mock KYC service (`src/services/kyc.ts`) is designed to be provider-agnostic. 

Same interface works for both:

```typescript
export interface KYCProfile {
  userId: string;
  status: KYCStatus;
  tier: KYCTier;
  dailyLimit: number;
  monthlyLimit: number;
  documentsSubmitted: boolean;
  selfieSubmitted: boolean;
  verifiedAt?: string;
  rejectionReason?: string;
}
```

If we switch to Didit, we just create `src/services/didit.ts` and swap the implementation.

---

## Environment Variables Needed

```env
DIDIT_API_KEY=xxxxx
DIDIT_WEBHOOK_SECRET=xxxxx
```

---

## When to Consider Didit

- [ ] ComplyCube startup program rejected
- [ ] ComplyCube pricing too high at scale
- [ ] ComplyCube doesn't support needed document types
- [ ] Faster integration needed

---

## Documentation Links

> **PASTE DIDIT DOCUMENTATION BELOW (IF NEEDED)**

---

<!-- 
=================================================================
PASTE FULL DIDIT API DOCUMENTATION HERE (IF APPLICABLE)
=================================================================
-->
