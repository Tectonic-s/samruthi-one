# Samruthi One

RBI-registered Fintech platform providing working capital, trade finance, and property loans with multi-bank access for businesses across India.

Built with **Next.js 14**, **Prisma**, **NextAuth**, and **Resend**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL via Prisma ORM |
| Auth | NextAuth.js (JWT + Credentials) |
| Email | Resend |
| Export | ExcelJS |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── admin/leads/        # Admin lead management (GET, PATCH)
│   │   │   └── export/         # Excel export endpoint
│   │   ├── auth/[...nextauth]/ # NextAuth handler
│   │   └── enquiry/            # Public enquiry submission (POST)
│   ├── s1-portal/              # Admin dashboard (protected)
│   │   └── login/              # Admin login page
│   ├── services/[slug]/        # Dynamic service detail pages
│   └── (public pages)          # Home, About, Partners, Enquiry, etc.
├── components/                 # Shared UI components
├── lib/
│   ├── authOptions.ts          # NextAuth configuration
│   ├── email.ts                # Resend email helpers
│   ├── prisma.ts               # Prisma client singleton
│   └── data/                   # Static content and services data
├── types/                      # Shared TypeScript types
└── middleware.ts               # IP allowlist for /s1-portal
prisma/
└── schema.prisma               # Database schema
scripts/
└── seed-admin.js               # Admin user seed script
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (local or hosted e.g. Supabase, Neon)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in all values in `.env.local`:

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:5030"
ADMIN_EMAIL="admin@yourdomain.com"
ADMIN_PASSWORD="your-secure-password"
RESEND_API_KEY="re_..."
NOTIFICATION_EMAIL="alerts@yourdomain.com"
DELETE_PASSPHRASE="your-delete-passphrase"
ADMIN_ALLOWED_IPS="1.2.3.4,5.6.7.8"
```

### 3. Set up the database

```bash
npm run db:push
```

### 4. Seed the admin user

```bash
node scripts/seed-admin.js
```

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:5030](http://localhost:5030).

Admin portal is at [http://localhost:5030/s1-portal](http://localhost:5030/s1-portal).

---

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Secret for signing JWT tokens — generate with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Full base URL of the app |
| `ADMIN_EMAIL` | Email address for the admin account |
| `ADMIN_PASSWORD` | Password for the admin account (used only by seed script) |
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com) |
| `NOTIFICATION_EMAIL` | Email that receives new lead alerts |
| `DELETE_PASSPHRASE` | Passphrase required to soft-delete leads in the portal |
| `ADMIN_ALLOWED_IPS` | Comma-separated list of IPs allowed to access `/s1-portal` |

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server on port 5030 |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run db:push` | Push Prisma schema to the database |
| `npm run db:generate` | Regenerate Prisma client |
| `node scripts/seed-admin.js` | Create or update the admin user |

---

## Deployment (Vercel)

1. Push to GitHub and import the repo in Vercel.
2. Add all environment variables from the table above in the Vercel dashboard.
3. The `vercel-build` script (`prisma generate && next build`) runs automatically.
4. Set `NEXTAUTH_URL` to your production domain.

---

## Security Notes

- The `/s1-portal` route is protected by both IP allowlist middleware and NextAuth session checks.
- Lead deletion requires a separate `DELETE_PASSPHRASE` verified server-side with a constant-time comparison.
- All API responses include security headers (CSP, HSTS, X-Frame-Options, etc.) configured in `next.config.mjs`.
- The public enquiry endpoint is rate-limited to 5 requests per IP per 60 seconds.
- Passwords are hashed with bcrypt (cost factor 10).
