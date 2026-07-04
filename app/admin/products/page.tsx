import { redirect } from "next/navigation";
import { isAdminLoggedIn } from "@/lib/adminAuth";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import AdminProductsClient from "@/components/admin/AdminProductsClient";

export default async function AdminProductsPage() {
  const loggedIn = await isAdminLoggedIn();
  if (!loggedIn) redirect("/admin/login");

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("products").select("*").order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);
  return <AdminProductsClient initialProducts={data || []} />;
}
