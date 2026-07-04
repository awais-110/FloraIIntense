import { NextResponse } from "next/server";
import { isAdminLoggedIn } from "@/lib/adminAuth";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request: Request) {
  if (!(await isAdminLoggedIn())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const payload = await request.json();
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase.from("banners").insert(payload).select("*").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}
