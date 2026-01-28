# ComplyCube

**Purpose:** KYC/Identity verification  
**Mock:** `src/services/kyc.ts`

## We Use

- Document verification (passport, license, national ID)
- Selfie/liveness check
- AML/PEP screening
- Address verification

## Verification Tiers

| Tier | Requirements | Daily Limit |
|------|--------------|-------------|
| Basic | ID + Selfie | £500 |
| Enhanced | ID + Selfie + Address | £5,000 |

## Endpoints

```
POST /v1/clients
GET  /v1/clients/:id
POST /v1/documents
POST /v1/checks
GET  /v1/checks/:id
```

## Env

```env
COMPLYCUBE_API_KEY=
COMPLYCUBE_WEBHOOK_SECRET=
```

## Webhooks

- `check.completed`
- `check.failed`
- `client.updated`
- `screening.match_found`

---

## API Documentation Structure

```
Getting Started
- Web Portal Quick Guide
- Hosted Solution Guide
- Mobile SDK Guide
- Web SDK Guide
- API Quick Guide

Integration Resources
- Postman Guide
- Webhooks Guide
- Mobile App
- Integration Checklist
- Testing Data

Access Management
- Teams and User Roles
```

---

<!-- PASTE FULL COMPLYCUBE DOCS BELOW -->
