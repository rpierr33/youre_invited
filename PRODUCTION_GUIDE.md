# Production Readiness Guide

This guide walks you through every credential, configuration, and step needed to take You're Invited from local development to a fully functional production deployment.

---

## 1. Environment Variables (Required)

These must be set in your deployment platform's environment settings.

### `JWT_SECRET` — **MUST CHANGE**

Your current dev value: `youre-invited-dev-secret-key-2025`

Generate a secure random string for production:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy the output and set it as your `JWT_SECRET`. This signs all admin authentication tokens — if it's weak or leaked, anyone can access your admin dashboard.

### `PORT`

Set to whatever your hosting platform assigns. Most platforms set this automatically. Default: `3001`.

---

## 2. Admin Credentials — **MUST CHANGE**

The seed script creates a default admin user:

| Field    | Current Value | Action Required            |
|----------|---------------|----------------------------|
| Username | `admin`       | Change to something unique |
| Password | `admin123`    | Change to a strong password|

### How to change:

**Option A — Edit the seed script before first deploy:**

Open `server/src/db/seed.ts` and change:
```typescript
const passwordHash = await bcrypt.hash('YOUR_STRONG_PASSWORD_HERE', 10)
db.insert(admins).values({
  username: 'your-chosen-username',
  passwordHash,
}).run()
```

Then run `npm run seed` before deploying.

**Option B — Add a password change endpoint (recommended for production):**

This is not yet built. For now, re-seed with updated credentials.

---

## 3. Database — SQLite vs PostgreSQL

### Current: SQLite (local file)

Works for development and low-traffic production. The database file is stored at `server/data.db`.

**Problem for deployment:** Most free hosting platforms (Render free tier, Railway free tier) use ephemeral filesystems — your database will be wiped on every redeploy.

### Recommended for production: PostgreSQL

Drizzle ORM supports PostgreSQL with minimal changes. Here's what to swap:

1. **Install the PostgreSQL driver:**
```bash
cd server
npm install pg drizzle-orm/pg-core
npm uninstall better-sqlite3 @types/better-sqlite3
```

2. **Update `server/src/db/index.ts`:**
```typescript
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { inquiries, admins } from './schema.js'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export const db = drizzle(pool, { schema: { inquiries, admins } })
export { inquiries, admins }
```

3. **Update `server/src/db/schema.ts`:** Change `sqliteTable` imports to `pgTable` equivalents from `drizzle-orm/pg-core`.

4. **Add the `DATABASE_URL` environment variable** with your PostgreSQL connection string.

**Free PostgreSQL providers:**
- Render: Free PostgreSQL (90-day limit, then $7/mo)
- Supabase: Free tier with 500MB
- Neon: Free tier with 512MB

---

## 4. Email (SMTP) — Optional but Recommended

Currently, the contact form saves inquiries to the database but does NOT send email notifications. To enable email confirmations:

### Environment variables needed:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=hello@youreinvited.com
SMTP_PASS=your-app-password
```

### Gmail setup:
1. Go to Google Account → Security → 2-Step Verification (enable it)
2. Go to App Passwords → Generate one for "Mail"
3. Use that 16-character password as `SMTP_PASS`

### Other providers:
- **SendGrid:** Free 100 emails/day — use their SMTP relay
- **Mailgun:** Free 5,000 emails/month for first 3 months
- **Resend:** Free 3,000 emails/month

> Note: The Nodemailer integration is stubbed but not wired into the inquiry route. You'll need to add the email-sending logic to `server/src/routes/inquiries.ts` in the POST handler.

---

## 5. Calendly Integration

The Invitations page has a Calendly booking placeholder. To make it functional:

1. **Create a Calendly account** at [calendly.com](https://calendly.com) (free tier works)
2. **Create event types** for each workshop (Letterpress, Calligraphy, Digital Design, Wax Seal)
3. **Get your scheduling link** (e.g., `https://calendly.com/youreinvited/letterpress-workshop`)

### To embed in the app:

Open `client/src/pages/Invitations.tsx` and replace the Calendly placeholder section with:

```tsx
<div className="border border-border rounded overflow-hidden" style={{ minHeight: '650px' }}>
  <iframe
    src="https://calendly.com/YOUR_USERNAME?hide_gdpr_banner=1"
    width="100%"
    height="650"
    frameBorder="0"
    title="Schedule a workshop"
  />
</div>
```

Or use Calendly's popup widget by adding their script to `client/index.html`:

```html
<script src="https://assets.calendly.com/assets/external/widget.js" async></script>
```

---

## 6. Domain & DNS

### Custom domain setup:

1. **Buy a domain** (e.g., `youreinvited.com`) from Namecheap, Google Domains, or Cloudflare
2. **Point DNS** to your hosting platform:
   - Render: Add a custom domain in dashboard, update DNS CNAME
   - Vercel: Add domain in project settings, update nameservers
3. **SSL** is automatic on all recommended platforms

---

## 7. Image Hosting

Currently, all images are served from Unsplash URLs. For production:

**Option A — Keep Unsplash** (free, but dependent on their service)

**Option B — Self-host images:**
1. Upload images to Cloudinary (free 25GB), AWS S3, or Vercel Blob
2. Update image URLs in `client/src/lib/data.ts` and component files
3. Use your own event photos instead of stock images

**Option C — CMS integration** (future enhancement):
Add a headless CMS like Sanity or Contentful to manage gallery images, team bios, and testimonials without code changes.

---

## 8. Deployment Walkthrough (Render — Recommended)

### Step 1: Push to GitHub
Already done — your repo is at `https://github.com/rpierr33/youre_invited`

### Step 2: Create a Render account
Go to [render.com](https://render.com) and sign up with GitHub.

### Step 3: Create a Web Service
1. Click "New" → "Web Service"
2. Connect your `youre_invited` repo
3. Configure:
   - **Name:** `youre-invited`
   - **Runtime:** Node
   - **Build Command:** `npm install && npm run seed && npm run build`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

### Step 4: Set environment variables
In the Render dashboard, add:
- `JWT_SECRET` = (your generated secret)
- `PORT` = `3001`
- `NODE_ENV` = `production`

### Step 5: Deploy
Render auto-deploys on push to `main`. Your app will be live at `https://youre-invited.onrender.com` (or similar).

---

## 9. Production Checklist

| Item | Status | Action |
|------|--------|--------|
| JWT_SECRET | Not production-ready | Generate and set a 64+ character random string |
| Admin password | Not production-ready | Change from `admin123` to a strong password |
| Database | Development only | Swap to PostgreSQL for persistent data |
| SMTP email | Not configured | Set up Gmail app password or SendGrid |
| Calendly | Placeholder only | Create account and embed real calendar |
| Images | Using Unsplash stock | Replace with actual event photos |
| Domain | None | Purchase and configure DNS |
| SSL | N/A | Automatic on Render/Vercel |
| Error monitoring | None | Consider adding Sentry (free tier) |
| Analytics | None | Add Google Analytics or Plausible |
| Backups | None | Set up database backups if using PostgreSQL |

---

## 10. What's Fully Functional Right Now

These features work out of the box with just `npm run seed && npm run dev`:

- All 8 public pages (Home, About, Services, Invitations, Gallery, Testimonials, Contact)
- Contact form → saves to database
- Admin login with JWT authentication
- Admin dashboard: view, filter, update status, delete inquiries
- Monthly inquiry chart
- Responsive design on all screen sizes
- Image carousel, scroll animations, lightbox gallery
- Workshop booking UI (Calendly placeholder needs real link)

---

## Quick Reference: All Credentials

| Credential | Current Value | Where Used | Production Action |
|------------|---------------|------------|-------------------|
| Admin username | `admin` | `/admin/login` | Change in seed script |
| Admin password | `admin123` | `/admin/login` | Change in seed script |
| JWT_SECRET | `youre-invited-dev-secret-key-2025` | `.env` | Generate new secret |
| SMTP credentials | Not set | `.env` | Configure for email |
| Calendly URL | `https://calendly.com` (generic) | Invitations page | Replace with real URL |
| Database | SQLite local file | `server/data.db` | Migrate to PostgreSQL |
