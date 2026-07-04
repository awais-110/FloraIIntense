import { createClient } from "@supabase/supabase-js";
import { products, type Product } from "./products";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

function money(value: unknown, fallback = "PKR 0") {
  if (value === null || value === undefined || value === "") return fallback;
  if (typeof value === "string" && value.toUpperCase().includes("PKR")) return value;
  const number = Number(value);
  if (Number.isNaN(number)) return String(value);
  return `PKR ${number.toLocaleString("en-PK")}`;
}

export async function getProducts(): Promise<Product[]> {
  if (!supabase) return products;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error || !data?.length) return products;

  return data.map((item) => ({
    id: item.slug,
    name: item.name,
    category: item.category,
    collection: item.collection || item.category,
    badge: item.badge || "New",
    discount: item.discount || undefined,
    oldPrice: item.old_price ? money(item.old_price) : undefined,
    price: money(item.price),
    size: item.size || "30ml",
    description: item.description || "Premium fragrance by Floral Intense.",
    notes: item.notes ?? [],
    image: item.image_url || "/floral-intense-logo.png",
    whatsappText: item.whatsapp_text || `Hi! I want to order ${item.name} by Floral Intense.`,
    featured: item.featured || false,
  }));
}

export type HeroSlide = {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
};

export const fallbackHeroSlides: HeroSlide[] = [
  { src: "https://images.pexels.com/photos/11705153/pexels-photo-11705153.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Luxury perfume bottle with dramatic dark background" },
  { src: "https://images.pexels.com/photos/19086285/pexels-photo-19086285.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Elegant floral perfume bottle" },
  { src: "https://images.pexels.com/photos/30999189/pexels-photo-30999189.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Premium perfume bottles on luxury display" },
  { src: "https://images.pexels.com/photos/30425749/pexels-photo-30425749.jpeg?auto=compress&cs=tinysrgb&w=1600", alt: "Luxury perfume campaign display" },
];

export async function getHeroSlides(): Promise<HeroSlide[]> {
  if (!supabase) return fallbackHeroSlides;

  const { data, error } = await supabase
    .from("banners")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error || !data?.length) return fallbackHeroSlides;

  return data.map((item) => ({
    src: item.image_url,
    alt: item.title || "Floral Intense hero banner",
    title: item.title || undefined,
    subtitle: item.subtitle || undefined,
    buttonText: item.button_text || undefined,
    buttonLink: item.button_link || undefined,
  }));
}
