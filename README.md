# Boutique MilyShop — Frontend

Storefront + admin dashboard for Boutique MilyShop. **Next.js 14 (App Router)**, **React**, **Tailwind CSS**.
Bilingual **Français / العربية (RTL)**, soft feminine design (blush / dusty rose / warm plum).

All data comes from the **[milyshop-backend](https://github.com/anes255)** API — this repo contains no database.

## Features

**Storefront**: Home (hero, category icons, featured, new arrivals, best-sellers, newsletter),
Shop (search + filters by category/price/size/color + sort), product page (gallery, sizes, colors,
stock, related), cart (quantities, coupons), checkout (cash on delivery), contact.

**Admin** (`/admin`, single credential login): dashboard, product CRUD with **image upload**,
categories (+ sub-categories), orders with status workflow, customers, editable site settings.
Fully bilingual (FR / AR).

## Setup

```bash
npm install
cp .env.example .env      # set NEXT_PUBLIC_API_URL to your backend
npm run dev               # http://localhost:3000
```

`.env`:

```
NEXT_PUBLIC_API_URL="http://localhost:4000"     # milyshop-backend
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

> If the backend is unreachable, the storefront still renders in **demo mode** (sample data).

## Admin

Open `/login` (or the discreet link in the footer) and sign in with the admin credentials
configured on the backend (default `admin` / `admin123`). The backend returns a JWT that the
frontend stores and sends as a Bearer token for admin requests.

## Deploy (Vercel)

1. Import this repo on Vercel.
2. Environment variables: `NEXT_PUBLIC_API_URL` (your Render backend URL), `NEXT_PUBLIC_SITE_URL` (your Vercel URL).
3. Build command: `next build` (default).
4. Add the deployed frontend URL to the backend's `CORS_ORIGIN`.
