# Floral Intense Admin Setup

## 1. Supabase SQL

Open Supabase Dashboard → SQL Editor → run:

```text
supabase/admin-schema.sql
```

This creates:

- `products` table
- `banners` table
- `product-images` public storage bucket
- `banner-images` public storage bucket
- Public read policies for active products/banners

## 2. Environment variables

Create `.env.local` in project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_WHATSAPP_NUMBER=923001234567
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_PASSWORD=your-admin-password
ADMIN_SESSION_SECRET=make-any-long-random-secret
```

Important: never write `NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY`.
Service role key must stay server-side only.

## 3. Run project

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000/admin/login
```

## 4. Admin can manage

- Add product
- Edit product
- Delete product
- Price
- Old price
- Stock
- Discount
- Notes
- Product image upload
- Product active/hidden
- Hero banner images
- Hero title/subtitle/button

## 5. Customers cannot access admin

Admin write APIs check the secure HTTP-only cookie created after `/admin/login`.
Customers can view active products and banners only.
