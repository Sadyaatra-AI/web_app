# Sadyaatra (सद्यात्रा) 🌿🕉️

> **Mindful & Cultural Travel Companion Across India**  
> *Transforming authentic heritage, spiritual pilgrimages, and eco-conscious travel into immersive, AI-assisted journeys.*

---

## 📌 Overview

**Sadyaatra** (derived from Sanskrit *Sat* + *Yatra*, meaning "Righteous/Mindful Journey") is an editorial and AI-powered travel platform designed for exploring India's richest spiritual, cultural, and eco-heritage destinations. 

Whether planning a sacred pilgrimage to Kedarnath, discovering ancient architectural marvels in Hampi, or experiencing cultural rituals in Varanasi, Sadyaatra blends deep editorial storytelling with real-time AI assistance.

---

## ✨ Key Features

- 🌿 **Curated Heritage & Spiritual Expeditions**: Detailed guides on sacred trails, temple rituals, ideal seasons, local customs, and sustainable travel practices.
- 🤖 **Interactive AI Companion (Gemini API)**:
  - Real-time travel advice, custom itinerary generation, and local cultural etiquette tips.
  - **Adaptive Responsive Layout**: 
    - **Desktop**: Integrated side-by-side 60/40 split-screen view.
    - **Mobile View**: Full-screen editorial immersion with a minimized floating popup drawer that slides up on demand.
- 🎨 **Sadyaatra Design System**: Built adhering strictly to the **Sadyaatra Brand Toolkit**:
  - **Typography**: *Fraunces* (Serif Display) for regal, timeless headings & *Jost* (Geometric Sans-Serif) for modern readability.
  - **Color Palette**: Deep Sage (`#8c956a`), Paper Tone (`#f8f6f1`), Ink Accent (`#2b2728`), Warm Ochre & Terracotta.
  - Signature crosshatch textures and glassmorphic micro-animations.
- 🗺️ **Dynamic Trip Planner & Customizer**: Filter trips by category (Spiritual, Heritage, Nature, Eco-Retreat), difficulty, duration, and budget.
- 🔊 **Voice & Audio Guides**: Listen to ritual narrations and historical audio briefings directly within trip pages.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Motion, Tailwind CSS v4
- **Backend / API**: Node.js, Express, `tsx`
- **AI Integration**: `@google/genai` (Google Gemini 2.5 Pro / Flash models)
- **Icons & Typography**: Lucide React Icons, Google Fonts (*Fraunces* & *Jost*)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/sadyaatra.git
   cd sadyaatra
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` or `.env.local` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   PORT=3000
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000` or `http://localhost:5173`.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Express backend server and Vite frontend dev server via `tsx` |
| `npm run build` | Builds the production Vite bundle and bundles `server.ts` into `dist/server.cjs` |
| `npm run start` | Runs the compiled production server (`node dist/server.cjs`) |
| `npm run lint` | Runs TypeScript type checking (`tsc --noEmit`) |
| `npm run clean` | Cleans build artifacts (`dist/`) |

---

## 📁 Project Structure

```
sadyaatra/
├── public/
│   ├── logo.png               # Official Sadyaatra emblem logo
│   └── favicon.png            # Brand favicon emblem
├── src/
│   ├── components/            # Reusable UI & Page components
│   │   ├── SplitScreenDestinationDetail.tsx  # Trip details & AI chat drawer
│   │   ├── Navigation.tsx     # Brand Navbar
│   │   ├── HeroSection.tsx    # Immersive homepage hero
│   │   ├── Footer.tsx         # Brand footer
│   │   ├── Preloader.tsx      # Emblem animated loader
│   │   └── ...
│   ├── types.ts               # TypeScript interfaces & data models
│   ├── data.ts                # Curated trip & destination data
│   ├── index.css              # Global brand design tokens & utilities
│   ├── App.tsx                # Main App entry & routing
│   └── main.tsx               # DOM mount point
├── server.ts                  # Express backend & Gemini API integration
├── sadyaatra-brand-toolkit.html # Official Sadyaatra brand guide source
├── package.json
└── README.md
```

---

## 🎨 Brand Toolkit Reference

For visual guidelines, color HEX values, typography specs, logo usage, and component aesthetics, refer to `sadyaatra-brand-toolkit.html` included in the root directory.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
