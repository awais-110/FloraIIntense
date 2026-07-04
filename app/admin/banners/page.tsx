import { redirect } from "next/navigation";
import { isAdminLoggedIn } from "@/lib/adminAuth";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import AdminBannersClient from "@/components/admin/AdminBannersClient";

export default async function AdminBannersPage() {
  const loggedIn = await isAdminLoggedIn();
  if (!loggedIn) redirect("/admin/login");

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("banners").select("*").order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);
  return <AdminBannersClient initialBanners={data || []} />;
}
