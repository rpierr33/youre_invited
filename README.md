# You're Invited — Luxury Event Planning

A fullstack web application for **You're Invited**, Fort Lauderdale's premier event planning company. Clean editorial design, warm gold accents, and a complete admin dashboard for managing client inquiries.

**Live pages:** Home, About, Services, Gallery, Testimonials, Contact, Admin Dashboard

---

## Tech Stack

| Layer      | Technology                                        |
|------------|---------------------------------------------------|
| Frontend   | React 18 (Vite) + TypeScript + Tailwind CSS       |
| Animations | Framer Motion                                     |
| Forms      | React Hook Form + Zod validation                  |
| Charts     | Recharts                                          |
| Backend    | Node.js + Express + TypeScript                    |
| Database   | SQLite with Drizzle ORM                           |
| Auth       | JWT (jsonwebtoken + bcryptjs)                     |
| Email      | Nodemailer (SMTP stub — configurable)             |

---

## Prerequisites

- **Node.js** 18+
- **npm** 9+

---

## Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/rpierr33/youre_invited.git
cd youre_invited

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env

# 4. Seed the database with sample data
npm run seed

# 5. Start development (frontend + backend concurrently)
npm run dev
```

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3001

---

## Environment Variables

Create a `.env` file in the project root (or copy from `.env.example`):

```env
# Required
PORT=3001
JWT_SECRET=your-secret-key-change-in-production

# Optional — Email notifications (not required for local testing)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

| Variable     | Required | Description                                        |
|--------------|----------|----------------------------------------------------|
| `PORT`       | Yes      | Backend server port (default: `3001`)               |
| `JWT_SECRET` | Yes      | Secret key for signing JWT tokens. Use a strong random string in production. |
| `SMTP_HOST`  | No       | SMTP server for sending confirmation emails         |
| `SMTP_PORT`  | No       | SMTP port (typically `587` for TLS)                 |
| `SMTP_USER`  | No       | SMTP username / email address                       |
| `SMTP_PASS`  | No       | SMTP password or app-specific password              |

> For local development, only `PORT` and `JWT_SECRET` are needed. The defaults in `.env.example` work out of the box.

---

## Test Credentials

### Admin Dashboard

Access at: `/admin/login`

| Field    | Value      |
|----------|------------|
| Username | `admin`    |
| Password | `admin123` |

> These credentials are created by the seed script. In production, change the password and store the hash securely.

### Seeded Sample Data

Running `npm run seed` populates the database with:

- **1 admin user** (above credentials)
- **5 sample inquiries** with varied statuses:

| Client Name              | Event Type        | Status    |
|--------------------------|-------------------|-----------|
| Sofia Martinez           | Wedding           | New       |
| James Richardson         | Corporate Event   | Contacted |
| Carolina Reyes           | Quinceañera       | Booked    |
| David & Rachel Goldstein | Social Celebration| Contacted |
| Priya Patel              | Destination Event | Declined  |

---

## Testing Checklist

### Public Pages
- [ ] **Home** — Hero image carousel cycles through 3 images, press ticker scrolls, all sections load with scroll animations
- [ ] **About** — Founder bio, team grid, and philosophy sections render
- [ ] **Services** — All 6 service cards with alternating image/text layout
- [ ] **Gallery** — Category filters work (All/Weddings/Corporate/Social/Galas), lightbox opens on click
- [ ] **Testimonials** — All 6 testimonials render with alternating alignment
- [ ] **Contact** — Form submits successfully, validation errors display, success state shows

### Contact Form (Public)
- [ ] Submit with valid data → 201 response, success message shown
- [ ] Submit with missing name/email → validation errors display inline
- [ ] Submitted inquiry appears in admin dashboard

### Admin Dashboard
- [ ] Navigate to `/admin` without logging in → redirects to `/admin/login`
- [ ] Login with wrong credentials → error message shown
- [ ] Login with `admin` / `admin123` → dashboard loads
- [ ] Stats cards show correct counts (Total, New, Contacted, Booked)
- [ ] Bar chart renders inquiry data by month
- [ ] Filter buttons (All/New/Contacted/Booked/Declined) filter the table
- [ ] Change inquiry status via dropdown → updates inline
- [ ] Delete inquiry → row removed from table
- [ ] Logout → returns to login page, `/admin` redirects to login

### API Endpoints
```bash
# Health check
curl http://localhost:3001/api/health

# Submit inquiry (public)
curl -X POST http://localhost:3001/api/inquiries \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","eventType":"Wedding"}'

# Login (get JWT token)
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# List inquiries (admin — replace TOKEN)
curl http://localhost:3001/api/inquiries \
  -H "Authorization: Bearer TOKEN"

# Update inquiry status (admin)
curl -X PATCH http://localhost:3001/api/inquiries/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"status":"booked"}'

# Delete inquiry (admin)
curl -X DELETE http://localhost:3001/api/inquiries/1 \
  -H "Authorization: Bearer TOKEN"
```

### Responsive Design
- [ ] All pages render correctly on mobile (375px)
- [ ] Navigation collapses to hamburger menu on mobile
- [ ] Gallery switches to single column on mobile
- [ ] Contact form stacks fields on smaller screens

---

## Production Build

```bash
npm run build    # Builds both client and server
npm start        # Starts the production server
```

The Express server serves the built React app as static files. In production:
1. Set a strong `JWT_SECRET`
2. Change the default admin password
3. Configure SMTP for email notifications
4. Consider swapping SQLite for PostgreSQL (Drizzle ORM makes this straightforward)

---

## Project Structure

```
youre_invited/
├── client/                    # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/        # Navbar, Footer, PageLayout, ScrollToTop
│   │   │   ├── ui/            # Button, Modal, SectionHeading, BotanicalSvg
│   │   │   └── sections/      # Hero, AboutSnippet, GalleryPreview, etc.
│   │   ├── pages/             # Home, About, Services, Gallery, Testimonials, Contact, Admin, Login
│   │   ├── hooks/             # useAuth, useIntersectionObserver
│   │   ├── lib/               # API client, static data
│   │   ├── types/             # TypeScript interfaces
│   │   └── styles/            # Global CSS + Tailwind
│   └── vite.config.ts
├── server/                    # Express backend
│   ├── src/
│   │   ├── routes/            # auth.ts, inquiries.ts
│   │   ├── middleware/        # JWT auth middleware
│   │   ├── db/                # schema.ts, index.ts, seed.ts
│   │   └── index.ts
│   └── tsconfig.json
├── .env.example
├── package.json               # Workspace root
└── README.md
```

---

## API Reference

| Method   | Route                | Auth   | Description                    |
|----------|----------------------|--------|--------------------------------|
| `GET`    | `/api/health`        | Public | Health check                   |
| `POST`   | `/api/inquiries`     | Public | Submit contact form inquiry    |
| `GET`    | `/api/inquiries`     | Admin  | List all inquiries             |
| `PATCH`  | `/api/inquiries/:id` | Admin  | Update inquiry status          |
| `DELETE` | `/api/inquiries/:id` | Admin  | Delete an inquiry              |
| `POST`   | `/api/auth/login`    | Public | Admin login → returns JWT      |

**Inquiry statuses:** `new` | `contacted` | `booked` | `declined`
