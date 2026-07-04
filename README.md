# Floral Intense — Working Feature Version

Clean dark brown + beige + gold perfume ecommerce landing page for Floral Intense.

## Working frontend features

- Product preview modal
- Add to cart
- Cart drawer
- Quantity increase / decrease
- Remove item from cart
- Cart saves in browser localStorage
- WhatsApp checkout with selected cart items
- Contact form that opens WhatsApp with customer message
- Review form that saves reviews in browser localStorage
- Header cart count
- Mobile bottom cart count
- WhatsApp floating button
- Mobile menu
- Responsive desktop/tablet/mobile layout
- 14 products included
- Logo included in `/public/floral-intense-logo.png`
- Supabase-ready schema
- Vercel-ready config
- `/api/products`
- `/admin` preview page

## Important note

This version works on the frontend without backend setup.

For permanent database storage:
- Products can be managed in Supabase using `supabase/schema.sql`
- Contact messages and reviews can be connected to Supabase later if the client wants admin approval/dashboard storage

## Run locally

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Supabase setup

1. Create Supabase project.
2. Run `supabase/schema.sql`.
3. Copy `.env.example` to `.env.local`.
4. Add your Supabase URL and anon key.
5. Restart server.

The site works even without Supabase because fallback products are inside `lib/products.ts`.

## Vercel deploy

1. Push folder to GitHub.
2. Import repo in Vercel.
3. Add environment variables.
4. Deploy.

## Replace images

Replace Pexels placeholder images in:

```text
lib/products.ts
```

Update each product's `image` field with the client's real image URL.


## Hero Slider

- Hero section now has an auto image slider.
- Images change every 2 seconds.
- Smooth fade/zoom transition included.
- Slider dots are clickable.


## Product Preview + Detail Page

- Product image click opens quick view modal.
- Eye icon opens quick view modal.
- Product title and Details link open `/product/[id]`.
- Product detail page includes image, notes, price, add to cart, WhatsApp order and related products.

## Supabase Admin Dashboard Added

Admin URL:

```text
/admin/login
```

Admin can manage:

- Products
- Product images
- Price / old price
- Stock
- Discount label
- Product active/hidden
- Hero banner slider images
- Banner title/subtitle/button

Setup instructions are in:

```text
README_ADMIN_SETUP.md
supabase/admin-schema.sql
```

Important environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_SITE_URL=
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
```
