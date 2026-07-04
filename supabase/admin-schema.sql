-- Floral Intense Supabase Admin Schema
-- Run this in Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  category text not null check (category in ('women', 'men', 'unisex', 'tester', 'gift')),
  collection text,
  badge text,
  discount text,
  old_price numeric,
  price numeric not null default 0,
  size text,
  stock integer not null default 0,
  description text,
  notes text[] default '{}',
  image_url text,
  whatsapp_text text,
  featured boolean default false,
  is_active boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now()
);

create table if not exists banners (
  id uuid primary key default gen_random_uuid(),
  title text,
  subtitle text,
  image_url text not null,
  button_text text,
  button_link text,
  is_active boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now()
);


-- If an older products table already exists, add missing admin columns safely.
alter table products add column if not exists collection text;
alter table products add column if not exists badge text;
alter table products add column if not exists discount text;
alter table products add column if not exists old_price numeric;
alter table products add column if not exists size text;
alter table products add column if not exists stock integer not null default 0;
alter table products add column if not exists description text;
alter table products add column if not exists notes text[] default '{}';
alter table products add column if not exists image_url text;
alter table products add column if not exists whatsapp_text text;
alter table products add column if not exists featured boolean default false;
alter table products add column if not exists is_active boolean default true;
alter table products add column if not exists sort_order integer default 0;
alter table products add column if not exists created_at timestamptz default now();

alter table products enable row level security;
alter table banners enable row level security;

-- Customers can only read active products/banners.
drop policy if exists "Public can read active products" on products;
create policy "Public can read active products"
on products for select
using (is_active = true);

drop policy if exists "Public can read active banners" on banners;
create policy "Public can read active banners"
on banners for select
using (is_active = true);

-- Admin write actions use SUPABASE_SERVICE_ROLE_KEY inside Next.js API routes.
-- Do not expose SUPABASE_SERVICE_ROLE_KEY in frontend.

-- Storage buckets. If buckets already exist, ignore duplicate errors in dashboard.
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('banner-images', 'banner-images', true)
on conflict (id) do nothing;

-- Public read access for storage objects in these buckets.
drop policy if exists "Public read product images" on storage.objects;
create policy "Public read product images"
on storage.objects for select
using (bucket_id = 'product-images');

drop policy if exists "Public read banner images" on storage.objects;
create policy "Public read banner images"
on storage.objects for select
using (bucket_id = 'banner-images');
