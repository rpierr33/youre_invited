# You're Invited — Event Planning Web App

A luxury event planning web application for **You're Invited**, Fort Lauderdale's premier event planning company. Built with React, Express, TypeScript, and SQLite.

## Tech Stack

- **Frontend:** React (Vite) + TypeScript + Tailwind CSS + Framer Motion
- **Backend:** Node.js + Express + TypeScript
- **Database:** SQLite with Drizzle ORM
- **Auth:** JWT-based authentication
- **Forms:** React Hook Form + Zod validation

## Prerequisites

- Node.js 18+
- npm 9+

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` with your settings. The defaults work for local development.

### 3. Seed the database

```bash
npm run seed
```

This creates sample inquiries and an admin user.

### 4. Start development servers

```bash
npm run dev
```

This starts both the frontend (http://localhost:5173) and backend (http://localhost:3001) concurrently.

## Admin Dashboard

Access the admin dashboard at `/admin/login`:

- **Username:** `admin`
- **Password:** `admin123`

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
youre-invited/
├── client/                    # React + Vite frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── layout/        # Navbar, Footer, PageLayout
│   │   │   ├── ui/            # Button, Card, Modal, etc.
│   │   │   └── sections/      # Hero, Gallery, Testimonials, etc.
│   │   ├── pages/             # Route pages
│   │   ├── hooks/             # Custom React hooks
│   │   ├── lib/               # API client, data, helpers
│   │   ├── types/             # TypeScript types
│   │   └── styles/            # Global CSS
│   └── vite.config.ts
├── server/                    # Express backend
│   ├── src/
│   │   ├── routes/            # API route handlers
│   │   ├── middleware/        # JWT auth middleware
│   │   ├── db/                # Schema, connection, seed
│   │   └── index.ts           # Server entry point
│   └── tsconfig.json
├── .env.example               # Environment variable template
└── package.json               # Root workspace config
```

## API Routes

| Method | Route                | Auth     | Description              |
|--------|----------------------|----------|--------------------------|
| POST   | /api/inquiries       | Public   | Submit contact form      |
| GET    | /api/inquiries       | Admin    | List all inquiries       |
| PATCH  | /api/inquiries/:id   | Admin    | Update inquiry status    |
| DELETE | /api/inquiries/:id   | Admin    | Delete an inquiry        |
| POST   | /api/auth/login      | Public   | Admin login              |
| GET    | /api/health          | Public   | Health check             |
