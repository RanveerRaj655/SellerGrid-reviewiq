# ReviewIQ — Review Intelligence Platform

ReviewIQ is an AI-powered review management and intelligence platform designed for e-commerce brands. It centralizes customer feedback from multiple platforms, provides deep sentiment analysis, and automates review responses with AI.

**Live Demo**: [seller-grid-reviewiq.vercel.app](https://seller-grid-reviewiq.vercel.app)

---

## 🚀 Key Features

### 📊 Intelligence Dashboard
- **Real-time Metrics**: Track Average Rating, Negative Review %, Active Alerts, and Impacted Products at a glance.
- **Sentiment Trends**: Dynamic visualization of customer sentiment over time.
- **Root Cause Analysis**: Automatic categorization of feedback into actionable areas like Delivery, Product Defect, Pricing, and more.

### 📥 AI-Powered Inbox
- **Unified Feed**: Manage reviews from Amazon, Flipkart, Shopify, and Instagram in one place.
- **Smart Replies**: Generate AI-optimized responses tailored to the review sentiment.
- **Tone Control**: Choose from Professional, Friendly, or Apologetic tones for automated drafts.

### 🧪 Advanced Analytics
- **Product Drilldown**: Deep dive into specific product performance and recurring issues.
- **Category Insights**: Identify which business areas are driving customer dissatisfaction.
- **Alert System**: Configurable thresholds for negative review spikes and volume surges.

---

## 📂 Project Structure

```text
src/
├── app/            # Next.js App Router (Pages, Layouts, API Routes)
├── components/     # Modular React components
│   ├── dashboard/  # Dashboard-specific features (Charts, Alerts)
│   ├── inbox/      # Review management components
│   ├── shared/     # Global components (Sidebar, TopBar)
│   └── ui/         # Base UI components (Buttons, Cards, Badges)
├── hooks/          # Custom React hooks for data and logic
├── lib/            # Utilities (Sentiment analysis, Formatters)
├── store/          # Global state management (Zustand)
├── types/          # TypeScript definitions
└── data/           # Mock data and constants
```

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Font**: [Inter](https://fonts.google.com/specimen/Inter)

---

## 🛠️ Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📈 Production Build

To create an optimized production build:

```bash
npm run build
npm start
```

---

*Developed by Ranveer Raj*
