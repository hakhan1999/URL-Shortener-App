## URL Shortener App

A modern React + Vite application to shorten URLs, generate QR codes, and track link analytics such as clicks, devices, and locations. Authentication and data storage are powered by Supabase.

### ✨ Features

- Shorten long URLs and copy shareable links
- Auto-generate QR codes for each short link
- Click analytics: device and location breakdowns
- Authentication: sign up, log in, and protected routes
- Dashboard to manage links and view stats

### 🧰 Tech Stack

- React 19 + Vite 7
- React Router 7
- Supabase (`@supabase/supabase-js`)
- Tailwind CSS 4 + shadcn/ui (Radix UI primitives)
- Recharts for visualizations

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase project (URL + anon/public key)

### 1) Clone and install

```bash
git clone <your-repo-url>
cd URL-Shortener-App
npm install
```

### 2) Configure environment

Create a `.env` file in the project root with your Supabase credentials (these are referenced in `src/db/supabase.js`).

```bash
# .env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_KEY=your_supabase_anon_or_service_key
```

### 3) Run the app

```bash
npm run dev
```

Open the printed local URL in your browser.

---

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Production build
- `npm run preview`: Preview the production build locally
- `npm run lint`: Run ESLint

---

## Project Structure (high-level)

```
URL-Shortener-App/
├─ public/                # Static assets
├─ src/
│  ├─ components/         # Reusable UI and feature components
│  ├─ context/            # Global context/state
│  ├─ db/                 # Supabase client and API helpers
│  ├─ hooks/              # Custom hooks
│  ├─ layouts/            # App layout components
│  ├─ lib/                # Utilities
│  ├─ pages/              # Route pages (Landing, Dashboard, Link, Auth, Redirect)
│  ├─ App.jsx             # App root
│  └─ main.jsx            # Entry point
└─ README.md
```

Key files:

- `src/db/supabase.js`: initializes Supabase using `VITE_SUPABASE_URL` and `VITE_SUPABASE_KEY`.
- `src/db/apiUrls.js`: CRUD for short URLs and analytics.
- `src/pages/RedirectLink.jsx`: resolves a short code and redirects while recording a click.

---

## Environment Variables

The app expects the following variables (loaded via Vite):

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_KEY`

Ensure they are present in `.env` (not committed) and configured in your host (Vercel/Netlify) for production.

---

## Development Notes

- Uses Tailwind CSS v4; utility classes are applied in `src/index.css` and components.
- UI components leverage Radix primitives and shadcn-style utilities.
- Charts are rendered with Recharts where applicable.

---

## Build and Deploy

### Local production preview

```bash
npm run build
npm run preview
```

### Deploying

- Vercel or Netlify recommended.
- Set env vars `VITE_SUPABASE_URL` and `VITE_SUPABASE_KEY` in your hosting provider.
- Use the `npm run build` output (Vite static assets) as the deployment artifact.

---

## License

This project is licensed under the MIT License. You are free to use and modify it.
