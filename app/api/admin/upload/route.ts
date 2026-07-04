import { NextResponse } from "next/server";
import { isAdminLoggedIn } from "@/lib/adminAuth";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request: Request) {
  if (!(await isAdminLoggedIn())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await request.formData();
  const file = form.get("file");
  const bucket = String(form.get("bucket") || "product-images");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file selected" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const extension = file.name.split(".").pop() || "jpg";
  const safeName = `${Date.now()}-${crypto.randomUUID()}.${extension}`;
  const path = `${bucket}/${safeName}`;

  const bytes = await file.arrayBuffer();
  const { error } = await supabase.storage.from(bucket).upload(path, bytes, {
    contentType: file.type || "image/jpeg",
    upsert: false,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl, path });
}
