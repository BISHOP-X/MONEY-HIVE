# MoneyHive

**Instant cross-border payments from UK/US to Africa.**

MoneyHive is a modern fintech platform enabling fast, secure, and affordable international money transfers and bill payments. Built for the Diaspora community sending money home to Nigeria, Ghana, and Kenya.

---

## 🚀 Features

### Core Functionality
- **Instant Transfers** - Send money from UK/US to Africa in seconds
- **Bill Payments** - Pay Nigerian utilities, telecom, and services
- **Real-time Exchange Rates** - Live FX rates with transparent pricing
- **AI Rate Insights** - Smart rate trend predictions (Up/Down indicators)

### User Experience
- **Responsive Design** - Seamless across all devices
- **Dark/Light Mode** - System-aware theme switching
- **3D Interactive Globe** - Visual representation of transfer corridors

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18 + Vite + TypeScript |
| **Styling** | TailwindCSS + Framer Motion |
| **3D Graphics** | Three.js |
| **State** | Zustand |
| **Backend** | Supabase (PostgreSQL + Auth + RLS) |
| **Payments** | Nium (UK) + Flutterwave (Africa) |
| **KYC** | ComplyCube |

---

## 📋 Prerequisites

- Node.js 18+
- Supabase account

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Add your Supabase credentials to .env

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## 🔐 Environment Variables

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

---

## 📁 Project Structure

```
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── lib/            # Supabase client
│   ├── store/          # Zustand state
│   └── utils/          # Helpers
├── public/             # Static assets
└── supabase/           # Migrations & edge functions
```

---

## 🚀 Deployment

**Frontend:** Deploy to Vercel/Netlify
```bash
npm run build
# Deploy 'dist' folder
```

**Backend:** Hosted by Supabase (no deployment needed)

---

## 📄 License

MIT

---

**MoneyHive** - Making international money transfers simple, fast, and affordable.
