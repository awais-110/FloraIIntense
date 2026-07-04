import { createClient } from "@supabase/supabase-js";
import { products, type Product } from "./products";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

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
    badge: item.badge,
    discount: item.discount,
    oldPrice: item.old_price,
    price: item.price,
    size: item.size,
    description: item.description,
    notes: item.notes ?? [],
    image: item.image_url,
    whatsappText: item.whatsapp_text,
    featured: item.featured,
  }));
}
