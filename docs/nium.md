# Nium

**Purpose:** UK/US money collection (inbound payments)  
**Mock:** `src/services/rates.ts`

## We Use

- UK: Faster Payments, BACS, cards
- US: ACH, cards
- FX rates for GBP/USD → NGN/GHS/KES

## Endpoints

```
POST /customers
GET  /customers/:id
POST /payment-links
GET  /exchange-rates
POST /fx-quote
GET  /wallets
```

## Env

```env
NIUM_CLIENT_ID=
NIUM_CLIENT_SECRET=
NIUM_API_KEY=
NIUM_WEBHOOK_SECRET=
```

## Webhooks

- `payment.pending`
- `payment.completed`
- `payment.failed`
- `payout.completed`

---

## API Documentation Structure

```
Guides
API Reference
Changelog

Clients
Customers
Wallets
Payins
Foreign Exchange
```

---

<!-- PASTE FULL NIUM DOCS BELOW -->
