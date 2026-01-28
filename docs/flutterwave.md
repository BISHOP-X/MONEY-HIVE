# Flutterwave Integration

> **Status:** ⏳ Awaiting Sandbox API Keys  
> **Purpose:** Africa payouts (bank transfers, mobile money) + Bill payments  
> **Mock Ready:** ✅ `src/services/transfers.ts` + `src/services/bills.ts`

---

## What We Need Flutterwave For

### 1. Money Transfers (Payouts)
- Bank transfers to Nigeria (NGN)
- Bank transfers to Ghana (GHS)
- Mobile Money to Ghana (MTN MoMo, Vodafone Cash)
- M-Pesa to Kenya (KES)
- Bank transfers to Kenya (KES)

### 2. Bill Payments
- Airtime top-up (MTN, Glo, Airtel, 9mobile, Safaricom)
- Electricity (IKEDC, EKEDC, AEDC, PHEDC)
- TV subscriptions (DSTV, GOtv, StarTimes)
- Internet packages
- Water bills

---

## API Endpoints We'll Use

### Transfers API
```
POST /v3/transfers
GET /v3/transfers/:id
GET /v3/transfers?status=pending
```

### Bills API
```
GET /v3/bill-categories
GET /v3/bills/:category/billers
POST /v3/bills
GET /v3/bills/:reference
```

### Bank Validation
```
POST /v3/accounts/resolve
GET /v3/banks/:country
```

---

## Our Mock Implementation

Current mock in `src/services/transfers.ts`:

```typescript
export interface TransferRequest {
  recipientId: string;
  amount: number;
  currency: string;
  destinationCurrency: string;
  deliveryMethod: 'bank' | 'mobile_money' | 'cash_pickup';
  note?: string;
}

export interface TransferResponse {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  reference: string;
  amount: number;
  fee: number;
  exchangeRate: number;
  destinationAmount: number;
  estimatedDelivery: string;
  createdAt: string;
}
```

This matches Flutterwave's response structure for easy swapping.

---

## Environment Variables Needed

```env
# Frontend (public)
VITE_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_TEST-xxxxx

# Backend/Edge Functions (secret)
FLUTTERWAVE_SECRET_KEY=FLWSECK_TEST-xxxxx
FLUTTERWAVE_ENCRYPTION_KEY=xxxxx
```

---

## Integration Steps

### Step 1: Add API Keys
1. Get sandbox keys from Flutterwave dashboard
2. Add to `.env` locally
3. Add to Vercel environment variables

### Step 2: Create Adapter
```typescript
// src/services/flutterwave.ts
const FLUTTERWAVE_BASE_URL = 'https://api.flutterwave.com/v3';

export async function createTransfer(data: TransferRequest) {
  const response = await fetch(`${FLUTTERWAVE_BASE_URL}/transfers`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_FLUTTERWAVE_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      account_bank: data.bankCode,
      account_number: data.accountNumber,
      amount: data.amount,
      currency: data.destinationCurrency,
      reference: `MH-${Date.now()}`,
      callback_url: 'https://money-hive.vercel.app/api/webhooks/flutterwave',
      debit_currency: data.currency,
    }),
  });
  return response.json();
}
```

### Step 3: Update transfers.ts
Replace mock with real API calls.

### Step 4: Set Up Webhooks
Create `/api/webhooks/flutterwave` to handle:
- `transfer.completed`
- `transfer.failed`
- `billpayment.completed`
- `billpayment.failed`

---

## Supported Countries & Methods

| Country | Currency | Bank Transfer | Mobile Money |
|---------|----------|---------------|--------------|
| Nigeria | NGN | ✅ All banks | ❌ |
| Ghana | GHS | ✅ All banks | ✅ MTN MoMo, Vodafone |
| Kenya | KES | ✅ All banks | ✅ M-Pesa |

---

## Fee Structure (Expected)

| Transfer Type | Flutterwave Fee | Our Margin | User Pays |
|---------------|-----------------|------------|-----------|
| Nigeria Bank | ₦10-45 | £2.99 | £2.99 |
| Ghana Bank | GHS 0-5 | £2.99 | £2.99 |
| Ghana MoMo | GHS 0-3 | £1.99 | £1.99 |
| Kenya Bank | KES 0-100 | £2.99 | £2.99 |
| Kenya M-Pesa | KES 0-50 | £1.99 | £1.99 |

---

## Testing Checklist

- [ ] Create sandbox account
- [ ] Test bank account validation
- [ ] Test NGN transfer
- [ ] Test GHS transfer
- [ ] Test GHS mobile money
- [ ] Test KES transfer
- [ ] Test M-Pesa
- [ ] Test airtime purchase
- [ ] Test electricity bill
- [ ] Test webhook handling
- [ ] Test failed transfer handling
- [ ] Test refund flow

---

## Documentation Links

> **PASTE FLUTTERWAVE DOCUMENTATION BELOW**

---

<!-- 
=================================================================
PASTE FULL FLUTTERWAVE API DOCUMENTATION HERE
=================================================================
-->
