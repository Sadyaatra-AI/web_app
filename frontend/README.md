# Sadyaatra (सद्यात्रा) 🌿🕉️ — Full Stack Web Application

> **Mindful & Cultural Travel Companion Across India**  
> *Transforming authentic heritage, spiritual pilgrimages, and eco-conscious travel into immersive, AI-assisted journeys backed by a live Express API and Prisma database layer.*

---

## 📌 Overview & Architecture

**Sadyaatra** (derived from Sanskrit *Sat* + *Yatra*, meaning "Righteous/Mindful Journey") is an editorial and AI-powered travel platform designed for exploring India's richest spiritual, cultural, and eco-heritage destinations.

The frontend is built with **React 19**, **TypeScript**, and **Vite**, served directly alongside an **Express REST API** (`server.ts`) and a **Prisma 7 ORM** database layer (`src/lib/db.ts`).

---

## ✨ Features & Functionality

- 🌿 **Curated Heritage & Spiritual Expeditions**: Detailed guides on sacred trails, temple rituals, ideal seasons, local customs, and sustainable travel practices.
- 🤖 **Interactive AI Companion (Gemini 2.5 API)**:
  - Real-time travel advice, custom itinerary generation, and local cultural etiquette tips.
  - **Persistent Chat History**: Automatically logs visitor chat sessions and assistant replies into `WebChatConversation` and `WebChatMessage` database tables.
- 🎯 **Intelligent Sanctuary Matcher**: 3-step interactive travel quiz that matches your desired mood, duration, and budget to sanctuaries, saving `WebPlanPreview` data in the backend database.
- 🎨 **Sadyaatra Design System**:
  - **Typography**: *Fraunces* (Serif Display) for regal, timeless headings & *Jost* (Geometric Sans-Serif) for modern readability.
  - **Color Palette**: Deep Sage (`#8c956a`), Paper Tone (`#f8f6f1`), Ink Accent (`#2b2728`), Warm Ochre & Terracotta.
  - Signature crosshatch textures and glassmorphic micro-animations.

---

## 🛠️ Changes Implemented in the Project

1. **Live REST APIs (`server.ts`)**:
   - `GET /api/destinations`: Live sanctuary query with search, region, mood, type, and sort filters.
   - `GET /api/destinations/:id`: Destination detail lookup route.
   - `POST /api/chat`: Gemini AI handler with automatic database logging.
   - `POST /api/quiz-match`: Quiz result plan preview recorder.
   - `GET /api/saved` & `POST /api/saved/toggle`: Sanctuary bookmarking API.

2. **Prisma Database Module (`src/lib/db.ts`)**:
   - Automatic seeding of initial curated destinations into database tables.
   - Resilient database client initialization with PostgreSQL driver adapter and fallback support.

3. **Automated Vitest & Supertest Test Suite (`tests/`)**:
   - `tests/server.test.ts`: Integration tests for all Express API endpoints.
   - `tests/db.test.ts`: Unit tests for Prisma database queries and helper functions.
   - **15 / 15 tests passing** (100% pass rate).

---

## 🚀 How To Run Everything

### 1. Install Dependencies

```bash
npm install
```

### 2. Generate Prisma Client

```bash
# Run from root workspace directory
npx prisma generate
```

### 3. Start Development Server

```bash
npm run dev
```

Open your browser at **`http://localhost:3000`**.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Express backend server and Vite frontend dev server via `tsx` |
| `npm test` | Runs the Vitest integration & unit test suite |
| `npm run lint` | Runs TypeScript type checking (`tsc --noEmit`) |
| `npm run build` | Builds production Vite bundle and bundles `server.ts` into `dist/server.cjs` |
| `npm run start` | Runs compiled production server (`node dist/server.cjs`) |

---

## 📁 Directory Structure

```
frontend/
├── server.ts                  # Express REST API backend & Gemini AI integration
├── src/
│   ├── lib/
│   │   └── db.ts              # Prisma DB client, seeding & query helper
│   ├── generated/prisma/      # Generated Prisma Client output
│   ├── components/            # UI components (HeroSection, SplitScreen, AIChat, Quiz)
│   ├── data/                  # Destination seed data
│   ├── types.ts               # Shared TypeScript interfaces
│   ├── App.tsx                # Main App entry & filter state
│   └── main.tsx               # DOM mount point
├── tests/
│   ├── server.test.ts         # API integration test suite
│   └── db.test.ts             # Database unit test suite
├── package.json
└── vite.config.ts
```

---

## 📄 License

Distributed under the MIT License.
