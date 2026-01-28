# Nium Integration

> **Status:** ⏳ Partnership Discussion Pending  
> **Purpose:** Global money collection (UK/US inbound payments)  
> **Mock Ready:** ✅ `src/services/rates.ts`

---

## What We Need Nium For

### Money Collection (Inbound)
- Accept payments from UK bank accounts (Faster Payments, BACS)
- Accept payments from US bank accounts (ACH)
- Accept card payments (Visa, Mastercard)
- Multi-currency holding accounts
- Real-time exchange rates

### Why Nium?
- Licensed for UK/US money collection
- Competitive FX rates
- Fast settlement to our accounts
- RaaS (Remittance-as-a-Service) model fits our architecture

---

## API Endpoints We'll Use

### Customer Onboarding
```
POST /customers
GET /customers/:id
POST /customers/:id/kyc
```

### Payment Collection
```
POST /payment-links
POST /direct-debits
GET /payments/:id
```

### FX & Rates
```
GET /exchange-rates
POST /fx-quote
POST /fx-convert
```

### Wallets
```
GET /wallets
POST /wallets/:id/payout
```

---

## Our Mock Implementation

Current mock in `src/services/rates.ts`:

```typescript
export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  inverseRate: number;
  timestamp: string;
  source: 'mock' | 'live';
}

// Hardcoded rates
const BASE_RATES = {
  GBP: { NGN: 1950.00, GHS: 15.50, KES: 165.00 },
  USD: { NGN: 1550.00, GHS: 12.30, KES: 131.00 },
};
```

Will swap to live Nium rates API.

---

## Environment Variables Needed

```env
# Backend/Edge Functions (all secret)
NIUM_CLIENT_ID=xxxxx
NIUM_CLIENT_SECRET=xxxxx
NIUM_API_KEY=xxxxx
NIUM_WEBHOOK_SECRET=xxxxx
```

---

## Integration Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     USER PAYMENT FLOW                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  UK/US User                                                  │
│      ↓                                                       │
│  MoneyHive App (Select amount, recipient)                    │
│      ↓                                                       │
│  Nium Payment Link / Direct Debit                            │
│      ↓                                                       │
│  User's Bank → Nium → MoneyHive Wallet                       │
│      ↓                                                       │
│  Webhook: payment.completed                                  │
│      ↓                                                       │
│  Trigger Flutterwave Payout                                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Integration Steps

### Step 1: Partnership Setup
1. Sign partnership agreement
2. Complete compliance requirements
3. Get API credentials

### Step 2: Add API Keys
1. Add to `.env` locally
2. Add to Vercel environment variables

### Step 3: Create Adapter
```typescript
// src/services/nium.ts
const NIUM_BASE_URL = 'https://api.nium.com/v1';

export async function getExchangeRate(from: string, to: string) {
  const response = await fetch(
    `${NIUM_BASE_URL}/exchange-rates?source=${from}&destination=${to}`,
    {
      headers: {
        'Authorization': `Bearer ${process.env.NIUM_API_KEY}`,
      },
    }
  );
  return response.json();
}

export async function createPaymentLink(data: PaymentRequest) {
  const response = await fetch(`${NIUM_BASE_URL}/payment-links`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.NIUM_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: data.amount,
      currency: data.currency,
      reference: data.reference,
      redirect_url: 'https://money-hive.vercel.app/transfer/success',
      webhook_url: 'https://money-hive.vercel.app/api/webhooks/nium',
    }),
  });
  return response.json();
}
```

### Step 4: Set Up Webhooks
Handle:
- `payment.pending`
- `payment.completed`
- `payment.failed`
- `payout.completed`

---

## Supported Collection Methods

| Country | Currency | Bank Transfer | Cards |
|---------|----------|---------------|-------|
| UK | GBP | ✅ Faster Payments, BACS | ✅ |
| US | USD | ✅ ACH | ✅ |

---

## Fee Structure (Expected)

| Collection Method | Nium Fee | Processing Time |
|-------------------|----------|-----------------|
| UK Faster Payments | 0.5-1% | Instant |
| UK BACS | £0.50 | 2-3 days |
| US ACH | $0.50-1.00 | 1-3 days |
| Card Payment | 1.5-2.5% | Instant |

---

## Questions for Nium

1. What's the minimum partnership tier for our volume?
2. Settlement timeline to our accounts?
3. Supported currencies for multi-currency wallets?
4. KYC requirements for our end users?
5. Integration timeline estimate?

---

## Testing Checklist

- [ ] Sandbox account setup
- [ ] Test payment link creation
- [ ] Test GBP collection
- [ ] Test USD collection
- [ ] Test card payment
- [ ] Test FX rate fetching
- [ ] Test webhook handling
- [ ] Test failed payment handling
- [ ] Test refund flow

---

## Documentation Links

> **PASTE NIUM DOCUMENTATION BELOW**

---

<!-- 
=================================================================
PASTE FULL NIUM API DOCUMENTATION HERE
=================================================================
-->
