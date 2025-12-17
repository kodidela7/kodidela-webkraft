# Referral & Visitor Tracking System - Setup Guide

## 🎯 Overview

A complete referral and visitor tracking system integrated into Kodidela WebKraft with:

- ✅ Referral system with unique codes
- ✅ Visitor tracking & analytics
- ✅ Lead management with referral attribution
- ✅ Client conversion tracking
- ✅ Commission & payout management
- ✅ Comprehensive admin dashboard
- ✅ Fraud prevention measures

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## 🚀 Quick Start

### 1. Install Dependencies

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example file and update with your credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your settings:

```env
# JWT Secret (change this!)
JWT_SECRET=your-super-secret-key-change-this

# Email Configuration (for Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@kodidela-webkraft.com
ADMIN_EMAIL=yourpayouts@gmail.com

# Application URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**Gmail Setup:**
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an "App Password" from https://myaccount.google.com/security
3. Use the app password (not your regular password) in `SMTP_PASS`

### 3. Initialize Database & Create Admin User

Run the setup script:

```bash
npx tsx scripts/setup-admin.ts
```

This will:
- Create the SQLite database in `./data/referral.db`
- Initialize all tables
- Create an admin user with credentials:
  - **Email:** `admin@kodidela-webkraft.com`
  - **Password:** `admin123`

> ⚠️ **Important:** Change the admin password immediately after first login!

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🔐 Access Points

### Public Pages

- **Homepage:** `http://localhost:3000`
- **Refer & Earn:** `http://localhost:3000/refer`
- **Contact/Quote Form:** `http://localhost:3000/contact`

### Admin Panel

- **Login:** `http://localhost:3000/admin/login`
- **Dashboard:** `http://localhost:3000/admin`

Use the credentials from step 3 to login.

## 📊 Features Guide

### 1. Referral System

**How it works:**
1. User visits `/refer` and registers
2. System generates unique code (e.g., `KD123456`)
3. Referral link sent via email: `https://yoursite.com/?ref=KD123456`
4. Visitors clicking the link get tracked automatically
5. Quote submissions via that link are attributed to the referrer

**Fraud Prevention:**
- Self-referral detection
- One referral per client
- Rate limiting on registrations
- Referrer blocking capability

### 2. Visitor Tracking

Automatically captures:
- IP address & geolocation
- Device type, browser, OS
- Referral source
- Page views & timestamps

All tracking is anonymous and GDPR-friendly (no PII without consent).

### 3. Lead Management

From the admin panel, you can:
- View all quote submissions
- Filter by status, date, referral code
- Update lead status (New → Contacted → In Discussion → Converted)
- Convert leads to clients with project value
- Auto-calculate commission (10% default)

### 4. Client & Payout Management

- Track all converted clients
- Set project values
- Create payout records
- Mark payouts as paid with transaction IDs
- Export payout history to CSV

### 5. Analytics Dashboard

View metrics on:
- Total visitors & traffic sources
- Geographic distribution
- Referral performance
- Conversion rates
- Revenue tracking

## 🏗️ Architecture

```
📁 src/
├── lib/
│   ├── db.ts                 # Database connection
│   ├── schema.sql            # Database schema
│   ├── auth.ts               # JWT authentication
│   ├── email.ts              # Email service
│   ├── referral.ts           # Referral code generation
│   ├── visitor-tracker.ts    # Visitor tracking utilities
│   ├── fraud-prevention.ts   # Security checks
│   └── types.ts              # TypeScript types
├── app/
│   ├── api/
│   │   ├── referral/         # Referral API routes
│   │   ├── quote/            # Quote submission
│   │   ├── track/            # Visitor tracking
│   │   └── admin/            # Admin API routes
│   ├── refer/                # Public referral page
│   ├── contact/              # Contact/quote page
│   └── admin/                # Admin dashboard
└── components/
    ├── referral-tracker.tsx  # Client-side referral tracking
    └── visitor-tracker.tsx   # Client-side visitor tracking
```

## 🔧 Customization

### Change Commission Rate

Edit `src/app/api/admin/leads/route.ts`:

```typescript
// Line ~120
const commission = project_value * 0.1; // Change 0.1 to desired rate
```

### Email Templates

Edit email templates in `src/lib/email.ts`:
- `sendReferralLinkEmail()` - Referral link email
- `sendLeadNotificationEmail()` - New lead notification

### Referral Code Format

Edit `src/lib/referral.ts`:

```typescript
export function generateReferralCode(): string {
  const digits = Math.floor(100000 + Math.random() * 900000);
  return `KD${digits}`; // Change prefix here
}
```

## 📝 Database Schema

**Tables:**
- `referrers` - Referrer information and codes
- `visitors` - Anonymous visitor tracking
- `leads` - Quote form submissions
- `clients` - Converted clients with project details
- `referral_payouts` - Commission tracking
- `admin_users` - Admin authentication

Database location: `./data/referral.db`

Backup regularly for production!

## 🚨 Security Checklist

- [ ] Change `JWT_SECRET` in production
- [ ] Use strong admin password
- [ ] Enable HTTPS in production
- [ ] Configure SMTP with secure credentials
- [ ] Set up database backups
- [ ] Review fraud prevention rules
- [ ] Set up rate limiting (Vercel/Cloudflare)

## 🌐 Deployment to Vercel

1. Push code to GitHub repository

2. Connect to Vercel

3. Add environment variables in Vercel dashboard (same as `.env.local`)

4. **Important:** Add a volume for SQLite database:
   - Or migrate to PostgreSQL/MySQL for production
   - Consider using Vercel Postgres or Planet Scale

5. Run setup script on first deploy:
   ```bash
   npx tsx scripts/setup-admin.ts
   ```

## 📞 Support

For issues or questions:
- Check the implementation plan in `.gemini/antigravity/brain/...`
- Review API documentation in code comments
- Test endpoints using the admin dashboard

## 🎉 You're All Set!

The system is now ready to:
1. Accept referral registrations
2. Track visitors with referral codes
3. Capture leads from quote forms
4. Manage clients and payouts
5. Provide analytics insights

Visit `http://localhost:3000/admin` to explore all features!
