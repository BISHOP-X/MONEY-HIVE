# ComplyCube Integration

> **Status:** ⏳ Applied for $50k Startup Credits  
> **Purpose:** KYC/Identity Verification  
> **Mock Ready:** ✅ `src/services/kyc.ts`

---

## What We Need ComplyCube For

### Identity Verification
- Document verification (passport, driving license, national ID)
- Selfie/liveness check
- Address verification
- Watchlist/sanctions screening
- Risk scoring

### Compliance
- KYC (Know Your Customer) for UK/US users
- AML (Anti-Money Laundering) screening
- PEP (Politically Exposed Persons) check
- Ongoing monitoring

---

## Verification Tiers

| Tier | Requirements | Daily Limit | Monthly Limit |
|------|--------------|-------------|---------------|
| None | No verification | £0 | £0 |
| Basic | ID + Selfie | £500 | £2,000 |
| Enhanced | ID + Selfie + Address | £5,000 | £20,000 |

---

## API Endpoints We'll Use

### Client Management
```
POST /v1/clients
GET /v1/clients/:id
PATCH /v1/clients/:id
```

### Document Verification
```
POST /v1/documents
GET /v1/documents/:id
```

### Checks
```
POST /v1/checks
GET /v1/checks/:id
POST /v1/checks/document
POST /v1/checks/identity
POST /v1/checks/liveness
```

### Webhooks
```
POST /v1/webhooks
```

---

## Our Mock Implementation

Current mock in `src/services/kyc.ts`:

```typescript
export type KYCStatus = 'unverified' | 'pending' | 'verified' | 'rejected';
export type KYCTier = 'none' | 'basic' | 'enhanced';

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

export interface DocumentUpload {
  type: 'passport' | 'driving_license' | 'national_id';
  frontImage: File;
  backImage?: File;
}
```

---

## Environment Variables Needed

```env
# Backend/Edge Functions (secret)
COMPLYCUBE_API_KEY=xxxxx
COMPLYCUBE_WEBHOOK_SECRET=xxxxx
```

---

## Integration Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     KYC VERIFICATION FLOW                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. User signs up → Status: unverified                       │
│      ↓                                                       │
│  2. User uploads ID document                                 │
│      ↓                                                       │
│  3. ComplyCube: Document check                               │
│      ↓                                                       │
│  4. User takes selfie/liveness                               │
│      ↓                                                       │
│  5. ComplyCube: Face match check                             │
│      ↓                                                       │
│  6. ComplyCube: AML/PEP screening                            │
│      ↓                                                       │
│  7. Webhook → Status: verified/rejected                      │
│      ↓                                                       │
│  8. Update user tier + limits in Supabase                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Integration Steps

### Step 1: Get API Access
1. Await startup program approval
2. Get API key from dashboard
3. Set up webhook endpoint

### Step 2: Add API Keys
1. Add to `.env` locally
2. Add to Vercel environment variables

### Step 3: Create Adapter
```typescript
// src/services/complycube.ts
const COMPLYCUBE_BASE_URL = 'https://api.complycube.com/v1';

export async function createClient(data: ClientData) {
  const response = await fetch(`${COMPLYCUBE_BASE_URL}/clients`, {
    method: 'POST',
    headers: {
      'Authorization': `${process.env.COMPLYCUBE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: 'person',
      email: data.email,
      personDetails: {
        firstName: data.firstName,
        lastName: data.lastName,
        dob: data.dateOfBirth,
        nationality: data.nationality,
      },
    }),
  });
  return response.json();
}

export async function uploadDocument(clientId: string, document: File, type: string) {
  const formData = new FormData();
  formData.append('document', document);
  formData.append('type', type);
  formData.append('clientId', clientId);
  
  const response = await fetch(`${COMPLYCUBE_BASE_URL}/documents`, {
    method: 'POST',
    headers: {
      'Authorization': `${process.env.COMPLYCUBE_API_KEY}`,
    },
    body: formData,
  });
  return response.json();
}

export async function runCheck(clientId: string, checkType: string) {
  const response = await fetch(`${COMPLYCUBE_BASE_URL}/checks`, {
    method: 'POST',
    headers: {
      'Authorization': `${process.env.COMPLYCUBE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      clientId,
      type: checkType, // 'document_check', 'identity_check', 'screening_check'
    }),
  });
  return response.json();
}
```

### Step 4: Set Up Webhooks
Handle:
- `check.completed`
- `check.failed`
- `client.updated`
- `screening.match_found`

---

## Supported Documents

| Document Type | Countries | Front + Back |
|---------------|-----------|--------------|
| Passport | All | Front only |
| Driving License | UK, US | Front + Back |
| National ID | Nigeria, Ghana, Kenya | Front + Back |

---

## Check Types

| Check | Purpose | Required For |
|-------|---------|--------------|
| Document Check | Verify ID is genuine | Basic tier |
| Identity Check | Face match with document | Basic tier |
| Liveness Check | Ensure real person | Basic tier |
| Screening Check | AML/PEP/Sanctions | All tiers |
| Address Check | Verify residential address | Enhanced tier |

---

## Pricing (Expected via Startup Program)

| Check Type | Normal Price | Startup Price |
|------------|--------------|---------------|
| Document Check | $2.00 | $0.50 |
| Identity Check | $1.50 | $0.40 |
| Liveness Check | $0.50 | $0.10 |
| Screening Check | $0.50 | Free |

---

## Testing Checklist

- [ ] Sandbox account setup
- [ ] Test client creation
- [ ] Test document upload
- [ ] Test document check
- [ ] Test selfie upload
- [ ] Test identity check
- [ ] Test liveness check
- [ ] Test AML screening
- [ ] Test webhook handling
- [ ] Test rejection flow
- [ ] Test re-verification flow

---

## Documentation Links

> **PASTE COMPLYCUBE DOCUMENTATION BELOW**

---

<!-- 
=================================================================
PASTE FULL COMPLYCUBE API DOCUMENTATION HERE
=================================================================
-->
