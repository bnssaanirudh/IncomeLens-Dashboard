<p align="center">
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Chart.js-4.x-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Groq_AI-LLM-F55036?style=for-the-badge&logo=ai&logoColor=white" />
  <img src="https://img.shields.io/badge/PowerBI-Embedded-F2C811?style=for-the-badge&logo=powerbi&logoColor=black" />
</p>

# 🌐 IncomeLens — Global Income Inequality Analytics Platform

> **IncomeLens** is an enterprise-grade, AI-powered analytics dashboard that visualizes global income inequality data across 140+ countries. Built with React 18, it combines embedded Power BI dashboards, LLM-driven insights via Groq AI, and interactive CSV-based data exploration — all wrapped in a premium glassmorphism dark-mode interface.

---

## 📋 Table of Contents

- [Key Features](#-key-features)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Pages & Modules](#-pages--modules)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Team](#-team)
- [License](#-license)

---

## ✨ Key Features

### 📊 Data Visualization & Analytics
- **Embedded Power BI Dashboards** — Three live-connected Power BI reports (Executive Overview, Global Map, Country Deep Dive) embedded directly into the platform
- **Real-Time Derived Insights** — Auto-updating KPI cards showing Global Gini Index, Income Gap Ratio, Global Poverty Rate, and Countries Analyzed with live simulation
- **Interactive Data Explorer** — Upload any CSV file and instantly generate 6 chart types: Bar, Line, Doughnut, Radar, Scatter, and Polar Area charts with auto-detected columns

### 🤖 AI-Powered Intelligence
- **Groq LLM Chatbot** — Conversational AI assistant powered by Groq's Llama model, contextually aware of income inequality data and capable of answering analytical questions
- **Fullscreen Chat Mode** — Toggle between widget and fullscreen for extended analysis sessions
- **Rich Formatted Responses** — Markdown-style output with headers, bullet lists, numbered lists, and bold text properly rendered

### 🌍 Geographic Intelligence
- **Global Explorer** — Interactive regional breakdown with inequality metrics for North America, Asia Pacific, Europe, and Latin America
- **Country Analysis** — Nation-level deep dives with Income Share Analysis, Wealth Concentration Index, and Poverty Trend Tracker
- **Regional Inequality Insights** — Per-region Gini indices, wealth gap ratios, and social mobility indicators

### 🎨 Premium UI/UX
- **Glassmorphism Design System** — Dark-mode interface with frosted glass panels, animated gradients, and depth-layered cards
- **Framer Motion Animations** — Spring-physics interactions, staggered component mounting, and micro-animations
- **Fully Responsive** — Optimized for desktop, tablet, and mobile viewports

### 🔐 Authentication & User Management
- **Secure Login/Signup** — Complete authentication flow with form validation, error handling, and session persistence
- **User Feedback System** — Star-rating feedback page with emoji reactions, category tagging, and submission tracking

### 📄 Reporting
- **PDF Export** — One-click PDF generation for any dashboard page via html2pdf.js
- **Executive Summary Reports** — Auto-branded reports with charts and data tables

---

## 🛠 Architecture & Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Framework** | React 18 + Vite 7 | Component architecture & fast HMR |
| **Styling** | Tailwind CSS v4 | Utility-first responsive design |
| **Animations** | Framer Motion | Production-ready motion library |
| **Charts** | Chart.js + react-chartjs-2 | Interactive data visualizations |
| **BI Integration** | Power BI Embedded | Enterprise dashboards |
| **AI/LLM** | Groq API (Llama) | Conversational analytics |
| **Icons** | Lucide React | Consistent iconography |
| **Routing** | React Router DOM v6 | Client-side navigation |
| **PDF Generation** | html2pdf.js | Report export |

---

## 📑 Pages & Modules

| Page | Route | Description |
|------|-------|-------------|
| **Landing** | `/` | Marketing homepage with feature highlights and call-to-actions |
| **Login** | `/login` | Animated authentication with form validation |
| **Signup** | `/signup` | User registration with password strength indicators |
| **Executive Overview** | `/dashboard` | Primary dashboard with Power BI embed + 4 live KPI cards |
| **Global Explorer** | `/dashboard/global` | Geographic intelligence with regional inequality breakdowns |
| **Country Analysis** | `/dashboard/country` | Nation-level economic deep dives |
| **Feedback** | `/dashboard/feedback` | User satisfaction survey with star ratings |
| **Data Explorer** | `/dashboard/explore` | CSV upload → auto-generated 6-chart visualization suite |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ 
- npm v9+
- A [Groq API Key](https://console.groq.com/) (free tier available)

### 1. Clone the Repository
```bash
git clone https://github.com/bnssaanirudh/IncomeLens-Dashboard.git
cd IncomeLens-Dashboard
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Create a `.env` file in the project root:
```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Open the App
Navigate to `http://localhost:5173` in your browser.

> **Demo Credentials:** `admin@incomelens.com` / `admin123`

---

## 🔑 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_GROQ_API_KEY` | Yes | Groq API key for the AI chatbot |

---

## 📁 Project Structure

```
IncomeLens-Dashboard/
├── public/                  # Static assets
├── server/
│   └── server.js            # Backend server (authentication)
├── src/
│   ├── components/
│   │   ├── layout/          # DashboardLayout, Sidebar, Navbar, AuthLayout
│   │   └── ui/              # ChatbotWidget, PowerBIEmbed, StatCard
│   ├── context/             # AuthContext, ScenarioContext
│   ├── pages/
│   │   ├── Landing.jsx      # Marketing homepage
│   │   ├── Login.jsx        # Authentication
│   │   ├── Signup.jsx       # User registration
│   │   ├── DashboardOverview.jsx  # Executive dashboard
│   │   ├── GlobalExplorer.jsx     # Geographic insights
│   │   ├── CountryAnalysis.jsx    # Country-level analysis
│   │   ├── FeedbackPage.jsx       # User feedback
│   │   └── DataExplorer.jsx       # CSV visualization
│   ├── services/            # groqService, authService
│   ├── lib/                 # Utility functions
│   ├── App.jsx              # Route configuration
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles & design tokens
├── .env                     # Environment variables
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
└── package.json             # Dependencies & scripts
```

---

## 👥 Team

| Name | Role |
|------|------|
| **Agasthya Anirudh Badampudi** | Lead Developer |

---

## 📄 License

This project is developed as part of an academic milestone. All rights reserved.

---

<p align="center">
  <sub>Built with ❤️ using React, Vite, and Groq AI</sub>
</p>
