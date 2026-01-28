# Integration Documentation

Reference docs for MoneyHive's third-party integrations.

## Providers

| Provider | Purpose | Doc |
|----------|---------|-----|
| **Flutterwave** | Africa payouts + bills | [flutterwave.md](./flutterwave.md) |
| **Nium** | UK/US money collection | [nium.md](./nium.md) |
| **ComplyCube** | KYC verification | [complycube.md](./complycube.md) |

## Architecture

```
UK/US User → Nium (collect GBP/USD) → MoneyHive → Flutterwave (payout NGN/GHS/KES)
                                         ↓
                                    ComplyCube (KYC)
```

## Mock Services

```
src/services/
├── transfers.ts    → Flutterwave
├── bills.ts        → Flutterwave Bills
├── kyc.ts          → ComplyCube
└── rates.ts        → Nium
```
