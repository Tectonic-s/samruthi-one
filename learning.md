# Samruthi One — How This Website Works

A plain-English breakdown of every part of this project. No prior coding knowledge needed.

---

## The Big Picture

This is a **Next.js** website. Next.js is a framework (think: a toolkit) built on top of React that lets you build websites that are fast, SEO-friendly, and can talk to a database — all in one project.

The website has two sides:
- **Public site** — what visitors see (home, services, enquiry form, etc.)
- **Admin portal** — a hidden dashboard only you can access to manage leads

---

## Folder Structure — What Lives Where

```
src/
├── app/          → Every page of the website
├── components/   → Reusable building blocks (header, footer, cards, etc.)
├── lib/          → Behind-the-scenes logic (database, email, auth)
├── types/        → Blueprints that describe what data looks like
└── middleware.ts → A gatekeeper that runs before any page loads
```

---

## Pages (`src/app/`)

Each folder inside `app/` is a URL on your website. Next.js automatically turns folders into routes.

| Folder | URL | What it is |
|---|---|---|
| `page.tsx` | `/` | Home page |
| `about/` | `/about` | About page |
| `services/` | `/services` | All services listing |
| `services/[slug]/` | `/services/loan-against-property` etc. | Individual service page. `[slug]` is a dynamic route — one file handles all service pages |
| `partners/` | `/partners` | Lender partners page |
| `enquiry/` | `/enquiry` | Enquiry form page |
| `thank-you/` | `/thank-you` | Page shown after form submission |
| `privacy/` | `/privacy` | Privacy policy |
| `terms/` | `/terms` | Terms of service |
| `s1-portal/` | `/s1-portal` | Hidden admin dashboard (only you can access) |
| `s1-portal/login/` | `/s1-portal/login` | Admin login page |

### Special files
- `layout.tsx` — The wrapper around every page. This is where the Nav bar, Footer, and background image live. Think of it as the picture frame around every page.
- `globals.css` — Site-wide styles (fonts, colours, base rules)

---

## API Routes (`src/app/api/`)

These are not pages — they are **backend endpoints**. They run on the server and handle data. Think of them like little functions that the website calls in the background.

| File | What it does |
|---|---|
| `api/enquiry/route.ts` | Receives the enquiry form submission, saves it to the database, and sends a notification email |
| `api/admin/leads/route.ts` | Fetches leads from the database for the admin dashboard. Also handles updating a lead's status |
| `api/admin/leads/export/route.ts` | Generates and downloads an Excel file of all leads |
| `api/auth/[...nextauth]/route.ts` | Handles login/logout for the admin portal using NextAuth |

---

## Components (`src/components/`)

Components are reusable pieces of UI. Instead of writing the same code on every page, you write it once as a component and drop it in wherever you need it.

| File | What it is |
|---|---|
| `Nav.tsx` | The top navigation bar |
| `Footer.tsx` | The bottom footer |
| `Logo.tsx` | The Samruthi One logo (used in Nav and Footer) |
| `ServiceCard.tsx` | The card shown for each service on the home page and services page |
| `PartnerGrid.tsx` | The lender logos section |
| `StatsBand.tsx` | The band showing ₹500Cr+, 300+ Clients etc. |
| `TestimonialCard.tsx` | Each client review card |
| `EnquiryForm.tsx` | The enquiry form with all its fields |
| `FadeUp.tsx` | An animation wrapper — makes elements fade up when they appear on screen |
| `PageLoader.tsx` | The brief loading animation when navigating between pages |
| `Providers.tsx` | An invisible wrapper that enables login sessions to work across the site |

---

## Data Files (`src/lib/data/`)

These are the files you edit to change content on the website. No touching code logic needed.

| File | What to change here |
|---|---|
| `content.ts` | Company details, stats, testimonials, banking & NBFC partner lists |
| `services.ts` | All service names, descriptions, eligibility criteria, loan ranges etc. |

---

## Behind-the-Scenes (`src/lib/`)

| File | What it does |
|---|---|
| `prisma.ts` | Sets up the connection to your database. Prisma is the tool that lets your app talk to PostgreSQL (your Neon database) |
| `authOptions.ts` | The configuration for your login system — defines how admin login works, which page to use, session type etc. |
| `email.ts` | The logic for sending notification emails via Resend when a new enquiry comes in |

---

## Database (`prisma/schema.prisma`)

Your database has two tables:

- **Enquiry** — stores every lead submitted through the enquiry form (name, phone, email, facility, status etc.)
- **AdminUser** — stores admin login credentials (email + hashed password)

**Neon** is the cloud PostgreSQL database provider you're using. It's like Google Sheets but for structured data that your app can read and write to.

---

## The Admin Portal (`/s1-portal`)

The admin dashboard is split into two layers of protection:

### Layer 1 — IP Allowlist (middleware.ts)
Before the page even loads, a gatekeeper called **middleware** checks your IP address (your device's unique address on the internet). If your IP isn't in the allowed list, the visitor just sees a 404 — Not Found. The page doesn't exist as far as they're concerned.

Your allowed IPs are stored in `.env.local` under `ADMIN_ALLOWED_IPS`.

### Layer 2 — Login (NextAuth)
Even if someone somehow gets past Layer 1 (e.g. you add their IP), they still need a valid email and password to log in. Passwords are stored **hashed** (scrambled one-way) in the database using bcrypt — even if someone read your database, they can't reverse the password.

### Session (JWT)
Once you log in, NextAuth creates a **JWT** (JSON Web Token) — a small encrypted cookie stored in your browser. Every subsequent request carries this token so the server knows you're logged in without you having to log in again on every click.

---

## Authentication Flow (step by step)

1. You visit `/s1-portal/login`
2. Middleware checks your IP → allowed → page loads
3. You enter email + password → form calls NextAuth
4. NextAuth looks up your email in the database
5. It compares your password against the stored hash using bcrypt
6. If valid → creates a JWT session cookie in your browser
7. You're redirected to `/s1-portal`
8. Dashboard loads your leads from the database via the API

---

## Environment Variables (`.env.local`)

This file holds all your secrets and config. It is **never uploaded to GitHub or Vercel's public repo** — you set these manually.

| Variable | What it's for |
|---|---|
| `DATABASE_URL` | Connection string to your Neon PostgreSQL database |
| `NEXTAUTH_SECRET` | A random key used to encrypt login sessions |
| `NEXTAUTH_URL` | The base URL of your site (localhost in dev, your domain in production) |
| `ADMIN_EMAIL` | Reference only — actual admin user is in the database |
| `RESEND_API_KEY` | API key for sending emails via Resend |
| `NOTIFICATION_EMAIL` | The email address that receives new enquiry alerts |
| `ADMIN_ALLOWED_IPS` | Comma-separated list of IPs allowed to access `/s1-portal` |

---

## Deployment (Vercel)

When you push to GitHub, Vercel automatically builds and deploys the site.

- All `.env.local` variables must be manually added in **Vercel → Project → Settings → Environment Variables**
- `NEXTAUTH_URL` should be changed to your live domain e.g. `https://samruthione.in`
- `ADMIN_ALLOWED_IPS` should contain your real-world IP(s) — home, office, phone hotspot

> Your IP at home/office may change periodically (most ISPs don't give fixed IPs). If you suddenly can't access `/s1-portal` after deployment, your IP has likely changed — just update `ADMIN_ALLOWED_IPS` in Vercel and redeploy.

---

## Tech Stack Summary

| Technology | What it is | Used for |
|---|---|---|
| **Next.js** | React framework | The entire website |
| **TypeScript** | Typed JavaScript | All code files (catches bugs early) |
| **Tailwind CSS** | Utility CSS framework | All styling/design |
| **Prisma** | Database ORM | Talking to PostgreSQL cleanly |
| **Neon** | Cloud PostgreSQL | Storing leads and admin users |
| **NextAuth** | Auth library | Admin login sessions |
| **bcryptjs** | Password hashing | Securing admin password |
| **Resend** | Email API | Sending enquiry notifications |
| **ExcelJS** | Excel generator | Exporting leads to .xlsx |
| **Vercel** | Hosting platform | Deploying the live site |
