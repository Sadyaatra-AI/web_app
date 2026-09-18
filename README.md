# Sadyaatra (सद्यात्रा) 🌿🕉️ — Full Stack Web Application

> **Mindful & Cultural Travel Companion Across India**
> *Transforming authentic heritage, spiritual pilgrimages, and eco-conscious travel into immersive, AI-assisted journeys backed by a live Express API and Prisma database layer.*

---

## 📌 Project Overview & What Was Accomplished

The **Sadyaatra** application has been integrated from an editorial frontend into a **full-stack architecture**. All UI components now fetch live sanctuary data from an Express backend, persist AI chat conversations into a PostgreSQL Prisma database, record quiz match previews, and manage saved sanctuaries via REST APIs — all while **preserving 100% of the original UI design, typography, and glassmorphic micro-animations**.

### Key Changes Introduced in the Codebase

1. **Prisma ORM & Database Layer (`prisma/schema.prisma` & `frontend/src/lib/db.ts`)**:

   - Generated Prisma Client v7 output into `./frontend/src/generated/prisma`.
   - Built a database access module (`db.ts`) that seeds default curated destinations into database tables (`Destination`, `Attraction`, `LocalExperience`, `DestinationInterest`, `DestinationMedia`) on launch, with safe driver adapter handling and fallback caching.
2. **Expanded Express REST API (`frontend/server.ts`)**:

   - `GET /api/destinations`: Returns live sanctuaries from the database, supporting search, region, travel mood, category type, and sorting filters.
   - `GET /api/destinations/:id`: Returns detailed information for a single sanctuary.
   - `POST /api/chat`: Connects to Google Gemini 2.5 AI while persisting user messages and AI replies to `WebChatConversation` and `WebChatMessage` database tables.
   - `POST /api/quiz-match`: Logs completed sanctuary matcher quiz results into `WebPlanPreview` database records.
   - `GET /api/saved` & `POST /api/saved/toggle`: Synced sanctuary bookmark API endpoints.
3. **Frontend API Connection (`frontend/src/App.tsx`, `AIChatDrawer.tsx`, `MatchQuizModal.tsx`)**:

   - `App.tsx` dynamically fetches destination collections from `/api/destinations` based on filter state.
   - `AIChatDrawer.tsx` sends persistent `visitorId` headers to link user sessions to database records.
   - `MatchQuizModal.tsx` records matched sanctuary previews to the backend on quiz completion.
4. **Automated Unit & Integration Test Suite (`frontend/tests/`)**:

   - Added **Vitest** and **Supertest** test suites in `server.test.ts` and `db.test.ts` verifying all REST routes, fallback mechanisms, search logic, and database operations.
   - **15 / 15 tests passing** (100% pass rate).

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Motion, Tailwind CSS v4, Lucide React Icons
- **Backend API**: Node.js, Express, `tsx`
- **Database & ORM**: Prisma 7 ORM, PostgreSQL (`@prisma/adapter-pg`)
- **AI Engine**: `@google/genai` (Google Gemini 2.5 Pro / Flash models)
- **Testing & Verification**: Vitest, Supertest, TypeScript (`tsc --noEmit`)

---

## 🚀 How To Run Everything

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 1. Install Dependencies

Install dependencies for the application:

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file inside the `frontend` folder (or root directory):

```env
# Gemini AI Key (Optional - application includes smart fallback curator logic)
GEMINI_API_KEY="your_google_gemini_api_key"

# Database URL (Optional - defaults to resilient database layer)
DATABASE_URL="postgresql://user:password@localhost:5432/sadyaatra"

PORT=3000
```

### 3. Generate Prisma Client

Generate the Prisma Client types:

```bash
# Run from root directory
npx prisma generate
```

### 4. Start Development Server

Run the unified backend server + Vite frontend dev environment:

```bash
cd frontend
npm run dev
```

Open your browser and navigate to **`http://localhost:3000`**.

---

## 🧪 Testing, Linting & Building

### Run Automated Tests

To execute the Vitest + Supertest integration and unit test suite:

```bash
cd frontend
npm test
```

### Type Checking & Linting

Verify TypeScript compilation without emitting files:

```bash
cd frontend
npm run lint
```

### Build for Production

Build the optimized Vite static bundle and bundle the server into `dist/server.cjs`:

```bash
cd frontend
npm run build
```

To start the compiled production server:

```bash
cd frontend
npm run start
```

---

## 📁 Repository Directory Structure

```
web_app/
├── prisma/
│   ├── schema.prisma             # Primary Prisma ORM database models
│   └── migrations/               # Database SQL migrations
├── frontend/
│   ├── server.ts                 # Express REST API backend & Gemini AI handler
│   ├── src/
│   │   ├── lib/
│   │   │   └── db.ts             # Prisma DB client, seeding & query helper
│   │   ├── generated/prisma/     # Generated Prisma Client output
│   │   ├── components/           # UI Components (Hero, SplitScreen, AIChat, Quiz)
│   │   ├── data/                 # Curated destination seed data
│   │   ├── types.ts              # Shared TypeScript definitions
│   │   ├── App.tsx               # Main React entry & filter state
│   │   └── main.tsx              # DOM mount point
│   ├── tests/
│   │   ├── server.test.ts        # Integration test suite for REST API routes
│   │   └── db.test.ts            # Unit test suite for Prisma database functions
│   ├── package.json
│   └── vite.config.ts
├── package.json                  # Root dependencies
└── README.md                     # Application documentation
```

---

## 📄 License

Distributed under the MIT License.
