# MoneyHive Integration Documentation

This folder contains documentation for all third-party integrations.

## Integration Status

| Service | Purpose | Status | Mock Ready | Docs |
|---------|---------|--------|------------|------|
| **Flutterwave** | Transfers + Bill Payments (Africa) | ⏳ Awaiting sandbox keys | ✅ | [flutterwave.md](./flutterwave.md) |
| **Nium** | Global Money Collection (UK/US) | ⏳ Partnership pending | ✅ | [nium.md](./nium.md) |
| **ComplyCube** | KYC/Identity Verification | ⏳ Awaiting approval | ✅ | [complycube.md](./complycube.md) |
| **Didit** | KYC Backup Option | 📋 Plan B | ✅ | [didit.md](./didit.md) |

---

## Current Mock Services

All integrations have mock implementations ready in `src/services/`:

```
src/services/
├── transfers.ts    → Mock transfers (swap → Flutterwave)
├── bills.ts        → Mock bill payments (swap → Flutterwave Bills API)
├── kyc.ts          → Mock KYC (swap → ComplyCube/Didit)
└── rates.ts        → Mock exchange rates (swap → Nium/Flutterwave)
```

---

## Integration Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         MONEYHIVE                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  UK/US User → Nium (Collection) → MoneyHive → Flutterwave       │
│                                      ↓                           │
│                                   ComplyCube (KYC)               │
│                                      ↓                           │
│                          Flutterwave (Payout to Africa)          │
│                                      ↓                           │
│                    Nigeria / Ghana / Kenya Bank/Mobile           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Money Flow

1. **Collection (Inbound)** - Nium
   - User pays from UK/US bank account or card
   - Funds collected in GBP/USD
   - Settled to MoneyHive holding account

2. **Processing** - MoneyHive
   - Apply exchange rate + margin
   - Deduct fees
   - Validate KYC limits (ComplyCube)
   - Create transfer record in Supabase

3. **Payout (Outbound)** - Flutterwave
   - Send to Nigerian banks (NGN)
   - Send to Ghanaian banks/mobile money (GHS)
   - Send to Kenyan banks/M-Pesa (KES)

---

## Required API Keys

### Flutterwave
```env
VITE_FLUTTERWAVE_PUBLIC_KEY=
FLUTTERWAVE_SECRET_KEY=          # Server-side only
FLUTTERWAVE_ENCRYPTION_KEY=      # For sensitive data
```

### Nium
```env
NIUM_CLIENT_ID=
NIUM_CLIENT_SECRET=
NIUM_API_KEY=
```

### ComplyCube
```env
COMPLYCUBE_API_KEY=
COMPLYCUBE_WEBHOOK_SECRET=
```

### Didit (Backup)
```env
DIDIT_API_KEY=
DIDIT_WEBHOOK_SECRET=
```

---

## Swap Checklist

When API keys arrive:

### Flutterwave
- [ ] Add env vars to `.env` and Vercel
- [ ] Create `src/services/flutterwave.ts` adapter
- [ ] Update `transfers.ts` to use Flutterwave
- [ ] Update `bills.ts` to use Flutterwave Bills
- [ ] Test in sandbox mode
- [ ] Set up webhooks for status updates

### Nium
- [ ] Add env vars to `.env` and Vercel
- [ ] Create `src/services/nium.ts` adapter
- [ ] Implement collection flow
- [ ] Update `rates.ts` to use Nium rates
- [ ] Test UK/US payment collection

### ComplyCube
- [ ] Add env vars to `.env` and Vercel
- [ ] Create `src/services/complycube.ts` adapter
- [ ] Update `kyc.ts` to use ComplyCube
- [ ] Set up webhooks for verification status
- [ ] Test document + selfie verification

---

## Questions for Providers

### Flutterwave
1. Sandbox vs Production API endpoints?
2. Supported banks in Nigeria, Ghana, Kenya?
3. Webhook events for transfer status?
4. Settlement timeline for payouts?

### Nium
1. Supported collection methods (bank, card)?
2. Settlement timeline to holding account?
3. Multi-currency support?
4. Compliance requirements for UK/US?

### ComplyCube
1. Supported document types per country?
2. Liveness check requirements?
3. Average verification time?
4. Rejection reason codes?
