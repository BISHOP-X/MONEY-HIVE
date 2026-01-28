# Flutterwave

**Purpose:** Africa payouts (bank transfers, mobile money) + bill payments  
**Mock:** `src/services/transfers.ts`, `src/services/bills.ts`

## We Use

- Bank transfers: Nigeria, Ghana, Kenya
- Mobile money: Ghana (MTN MoMo), Kenya (M-Pesa)
- Bills: Airtime, electricity, TV, internet

## Endpoints

```
POST /v3/transfers
GET  /v3/transfers/:id
POST /v3/accounts/resolve
GET  /v3/banks/:country
POST /v3/bills
GET  /v3/bill-categories
```

## Env

```env
VITE_FLUTTERWAVE_PUBLIC_KEY=
FLUTTERWAVE_SECRET_KEY=
FLUTTERWAVE_ENCRYPTION_KEY=
```

## Webhooks

- `transfer.completed`
- `transfer.failed`
- `billpayment.completed`
- `billpayment.failed`

---

## API Documentation Structure

```
Introduction
Getting Started
Quickstart

Integration Journey
- Core Concepts
- Environments
- Authentication
- Supported Request Headers
- Encryption
- Errors
- Webhooks
- Idempotency
- Testing
- Best Practices

Collections (Inflow)
- Card Payments
- Mobile Money
- Pay With Bank Transfer
- USSD
- OPay

Payouts (Outflows)
- Bank Account Transfers
- Mobile Money Transfers
- Wallet-to-Wallet

Payment Operations
- Settlements
- Refunds
- Chargebacks
- Reporting VAT

API Reference
- Customer (list, create, retrieve, update, search)
- Charges
- Orchestration
- Payment Methods
- Mobile Networks
- Banks
- Wallets
- Transfers
- Transfer Recipients
- Transfer Senders
- Transfer Rates
- Settlement
- Chargebacks
- Refunds
- Fees
- Orders
- Virtual-Accounts
```

---

<!-- PASTE FULL FLUTTERWAVE DOCS BELOW -->
