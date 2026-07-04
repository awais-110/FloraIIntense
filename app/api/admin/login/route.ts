import { NextResponse } from "next/server";
import { setAdminSession } from "@/lib/adminAuth";

export async function POST(request: Request) {
  const { password } = await request.json();
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedPassword) {
    return NextResponse.json({ error: "ADMIN_PASSWORD is missing" }, { status: 500 });
  }

  if (password !== expectedPassword) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  await setAdminSession();
  return NextResponse.json({ ok: true });
}
