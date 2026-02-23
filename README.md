# Henry M. Ugochukwu — Full Stack Portfolio

Modern full-stack portfolio with admin-managed content.

## Architecture

- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS (`frontend`) → deploy to **Vercel**
- **Backend**: Express + Prisma + PostgreSQL (`backend`) → deploy to **Railway**
- **Database**: PostgreSQL

## Features

- Public portfolio homepage with:
  - Hero, about story, categorized technical skills
  - Featured project gallery with image, live URL, repo URL, and **View Details**
  - Certificates section
  - Personal/graduation photo gallery
  - Resume/CV section with link or uploaded file support
- Project detail page with:
  - Problem, Action, Result
  - Stack and deployment details (Vercel, Railway, DB)
- Admin dashboard (`/admin`) with login and management for:
  - Profile
  - Projects (add and update)
  - Certificates (add and update)
  - Photos/media (add and update)
  - Resume/CV (add and update)
  - File uploads for images and documents

## Local Setup

### 1) Backend

```bash
cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run dev
```

Backend runs on `http://localhost:5000`.

### 2) Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`.

## Environment Variables

### Backend (`backend/.env`)

- `PORT=5000`
- `NODE_ENV=development`
- `DATABASE_URL=postgresql://...`
- `JWT_SECRET=...`
- `ADMIN_EMAIL=...`
- `ADMIN_PASSWORD=...`
- `CORS_ORIGIN=http://localhost:3000`

### Frontend (`frontend/.env.local`)

- `NEXT_PUBLIC_API_URL=http://localhost:5000/api`

## Deployment Guide

### Frontend to Vercel

- Import `frontend` as project root on Vercel
- Add env var: `NEXT_PUBLIC_API_URL=https://your-backend.up.railway.app/api`
- Deploy

### Backend + PostgreSQL to Railway

- Create Railway service from `backend`
- Add PostgreSQL plugin/service
- Set backend env vars (`DATABASE_URL`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `CORS_ORIGIN`)
- Run migration command once:
  - `npx prisma migrate deploy`
- Optional seed:
  - `npm run prisma:seed`

## Notes

- For production-grade file storage, connect an external object storage (Cloudinary, S3, etc.) and store URLs in DB.
- The app currently supports local upload storage (`/uploads`) for easy development.
