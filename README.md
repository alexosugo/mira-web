[![Netlify Status](https://api.netlify.com/api/v1/badges/66c9d9aa-b369-4784-978b-916d99e99664/deploy-status?branch=main)](https://app.netlify.com/projects/withmira/deploys)

# Sellogram - AI Customer Experience Partner

Transform your Kenyan business with intelligent 24/7 customer service automation that handles WhatsApp, Instagram, and Facebook messages while you sleep.

## 🚀 Overview

Sellogram is an AI-powered customer experience platform specifically designed for Small and Medium Enterprises (SMEs) in Kenya. It automates customer interactions across multiple social media platforms, providing instant responses in local languages while significantly reducing operational costs.

### Key Benefits
- **24/7 Availability**: Never miss a customer inquiry
- **Multi-Platform Integration**: WhatsApp, Instagram, Facebook, and Telegram
- **Local Language Support**: English, Swahili, and other Kenyan languages
- **Cost Effective**: Save KES 15,000 - 50,000 monthly vs hiring staff
- **No Technical Skills Required**: 30-minute setup process

## 🎯 Problem Statement

Kenyan SMEs face several challenges with customer service:
- **Limited Resources**: Can't afford 24/7 support teams
- **Multi-Channel Chaos**: Managing messages across platforms is overwhelming
- **Slow Response Times**: 4-6 hour delays frustrate customers
- **Repetitive Queries**: 60-70% of time spent on basic questions

## 💡 Solution

Sellogram addresses these challenges through:
- Intelligent AI that learns your products and policies
- Automated responses to common inquiries
- Seamless escalation to human agents when needed
- Unified dashboard for all communication channels
- Real-time analytics and insights

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

### Backend & Database
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Real-time subscriptions
  - Authentication
  - Row Level Security

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **TypeScript** - Static type checking

## 📁 Project Structure

```
mira-web/
├── src/
│   ├── components/          # React components
│   │   ├── Benefits.tsx     # Benefits section
│   │   ├── Features.tsx     # Feature showcase with chat demo
│   │   ├── FinalCTA.tsx     # Final call-to-action
│   │   ├── Footer.tsx       # Footer component
│   │   ├── Header.tsx       # Navigation header
│   │   ├── Hero.tsx         # Landing page hero
│   │   ├── Pricing.tsx      # Pricing plans
│   │   ├── ProblemStatement.tsx # Problem identification
│   │   ├── SolutionOverview.tsx # Solution explanation
│   │   └── Testimonials.tsx # Customer testimonials
│   ├── lib/
│   │   └── supabase.ts      # Supabase client configuration
│   ├── services/
│   │   └── waitlistService.ts # Waitlist management
│   ├── utils/
│   │   ├── scrollToForm.ts  # Smooth scroll utility
│   │   └── validation.ts    # Form validation utilities
│   ├── App.tsx              # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.ts          # Vite configuration
└── tsconfig.json           # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 20.19 or higher — required by Vite 8)
- npm or yarn package manager
- Supabase account (for backend services)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mira-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Setup**
   Create a `waitlist_users` table in Supabase with the following schema:
   ```sql
   CREATE TABLE waitlist_users (
     id SERIAL PRIMARY KEY,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     first_name VARCHAR(50) NOT NULL,
     last_name VARCHAR(50) NOT NULL,
     email VARCHAR(255) UNIQUE NOT NULL,
     website VARCHAR(255) NOT NULL,
     instagram_url VARCHAR(255)
   );
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌍 Target Market

**Primary**: Kenyan Small and Medium Enterprises (SMEs)

**Industries**:
- E-commerce and retail
- Hospitality and tourism
- Professional services
- Healthcare
- Education

**Business Size**: 1-50 employees handling customer inquiries

## 🔒 Security & Privacy

- Input sanitization and validation
- HTTPS encryption
- Supabase Row Level Security
- GDPR compliant data handling
- Secure environment variable management

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Deployment Platforms
- **Vercel** (Recommended)
- **Netlify**
- **AWS S3 + CloudFront**
- **Any static hosting service**

### Environment Variables for Production
Ensure these are set in your hosting platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 📄 License

This project is proprietary software. All rights reserved.

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Landing page development
- ✅ Waitlist functionality
- ✅ Multi-platform design

### Phase 2 (Q1 2024)
- 🔄 AI agent development
- 🔄 WhatsApp integration
- 🔄 Admin dashboard

### Phase 3 (Q2 2024)
- 📋 Instagram integration
- 📋 Advanced analytics
- 📋 Multi-language support

### Phase 4 (Q3 2024)
- 📋 Facebook integration
- 📋 Custom AI training
- 📋 Enterprise features

---

**Made with ❤️ for Kenyan businesses**
