# Migration Plan: SQLite to Vercel Postgres

## Problem
The error `SqliteError: unable to open database file` happens because Vercel's serverless environment has a **Read-Only Filesystem**. You cannot write to a local SQLite file (`referral.db`) in production.

## Solution
Migrate to **Vercel Postgres** (or Neon/Supabase). This allows persistent data storage accessible from Vercel functions.

## Steps Required

1.  **Create Database**: Go to your Vercel Project Dashboard -> Storage -> Create Javascript/TypeScript Database (Vercel Postgres).
2.  **Get Credentials**: comprehensive environment variables (POSTGRES_URL, etc.) and add them to your Vercel project settings and local `.env.local`.
3.  **Approve Migration**: I will then refactor the code to use PostgreSQL instead of SQLite.

**Do you want me to proceed with refactoring the code for Vercel Postgres?**
I can switch the project to use `@vercel/postgres` now. You will just need to provide the connection string later.
