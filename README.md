# MoneyHive - Cross-Border Payment Platform

MoneyHive is a modern fintech platform enabling fast, secure, and affordable international money transfers and bill payments, with initial focus on UK to Nigeria corridors.

## 🚀 Features

### Core Functionality
- **International Money Transfers** - Send money from UK to Nigeria in seconds
- **Bill Payments** - Pay Nigerian utilities, telecom, and services
- **Real-time Exchange Rates** - Live FX rates with transparent pricing
- **Multi-currency Support** - Support for 30+ countries worldwide
- **AI-Powered Features** - Smart transfer timing and rate predictions

### User Experience
- **Responsive Design** - Seamless experience across all devices
- **Dark/Light Mode** - System-aware theme switching
- **Multi-language** - English, Yoruba, Hausa, Igbo support
- **Real-time Notifications** - Live status updates

## 🛠 Technology Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS with custom animations
- **UI Components**: Radix UI, Lucide Icons
- **Animations**: Framer Motion, GSAP
- **3D Graphics**: Three.js (interactive globe)
- **State Management**: Zustand
- **Routing**: React Router v6

### Backend (Supabase)
- **Database**: PostgreSQL (Supabase-hosted)
- **Authentication**: Supabase Auth (Email, OAuth, Magic Links)
- **API**: Auto-generated REST API with Row Level Security
- **Real-time**: Supabase Realtime for live updates
- **Edge Functions**: Serverless functions for payment logic
- **Storage**: Supabase Storage for KYC documents

## 📋 Prerequisites

- Node.js 18+
- Supabase account (free tier available)

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your Supabase URL and anon key to .env

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables

Create a `.env` file in the root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## 📁 Project Structure

```
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── lib/            # Supabase client & utilities
│   ├── store/          # Zustand state management
│   └── utils/          # Helper functions
├── public/             # Static assets
├── supabase/           # Supabase migrations & functions
└── package.json        # Dependencies
```

## 🔐 Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Settings > API
3. Add them to your `.env` file
4. Run the SQL migrations in `supabase/migrations/`

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy the 'dist' folder
```

### Supabase
- Database and auth are hosted by Supabase
- Edge Functions deploy via Supabase CLI

## 📄 License

MIT License

---

**MoneyHive** - Making international money transfers simple, fast, and affordable.
