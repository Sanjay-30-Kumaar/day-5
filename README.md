# Day 5 – Next.js Member Admin Panel

A full-stack member management application built with Next.js, TypeScript, Supabase, and Tailwind CSS. The application provides secure admin login and complete CRUD functionality for managing member records.

## 🚀 Live Demo

**Production URL:** https://day-5-tawny-ten.vercel.app

## ✨ Features

- Admin authentication with protected routes
- Member directory with search and status filtering
- View individual member details
- Add new members
- Edit existing member information
- Delete member records
- Persistent PostgreSQL storage using Supabase
- Server-side handling of database credentials
- Responsive interface
- Production deployment with Vercel

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **UI:** React and Tailwind CSS
- **Database:** Supabase PostgreSQL
- **Authentication:** JWT-based session cookie
- **Deployment:** Vercel
- **Version Control:** Git and GitHub
- **Package Manager:** pnpm

## 📁 Project Structure

```text
day-5/
├── app/
│   ├── login/
│   ├── members/
│   └── page.tsx
├── components/
├── data/
│   └── members.json
├── lib/
│   ├── auth.ts
│   ├── auth-actions.ts
│   ├── member-actions.ts
│   ├── members.ts
│   ├── require-admin.ts
│   ├── supabase-admin.ts
│   └── types.ts
├── middleware.ts
├── package.json
├── pnpm-lock.yaml
└── README.md
```

## ⚙️ Prerequisites

- Node.js
- pnpm
- A Supabase project
- A Vercel account (for deployment)

## 💻 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/Sanjay-30-Kumaar/day-5.git
cd day-5
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
SUPABASE_SECRET_KEY=your_supabase_secret_key
ADMIN_PASSWORD=your_admin_password
AUTH_SECRET=your_long_random_auth_secret
```

Replace the placeholders with your own values. Never commit `.env.local` or expose the Supabase secret key in client-side code.

### 4. Set up the database

Create a `public.members` table in Supabase with these columns:

| Column | Type | Constraints |
|---|---|---|
| `id` | `text` | Primary key |
| `name` | `text` | Not null |
| `email` | `text` | Not null |
| `batch` | `text` | Not null |
| `city` | `text` | Not null |
| `status` | `text` | Not null; active, inactive, or pending |
| `joined` | `date` | Not null |

Enable Row Level Security. The application uses a server-side secret key for database operations, so protect every operation with appropriate server-side authorization.

### 5. Start the development server

```bash
pnpm dev
```

Open http://localhost:3000 in your browser.

## 🏗️ Production Build

Run the production build locally:

```bash
pnpm build
```

## 🌐 Deployment

The application is deployed on Vercel and connected to a GitHub repository. Configure the required environment variables in the Vercel project settings before deploying.

## 🔐 Security Notes

- Keep `.env.local` out of version control.
- Never expose `SUPABASE_SECRET_KEY` to the browser.
- Validate the admin session before performing database mutations.
- Use strong admin credentials and a securely generated `AUTH_SECRET`.
- Configure database access policies according to your application's security requirements.

## 👨‍💻 Author

**Sanjay Kumaar**

GitHub: https://github.com/Sanjay-30-Kumaar

---

Built as a full-stack development project using Next.js and Supabase.