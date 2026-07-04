import { cookies } from "next/headers";

const COOKIE_NAME = "floral_admin_session";

export async function isAdminLoggedIn() {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;
  const expected = process.env.ADMIN_SESSION_SECRET;
  return Boolean(session && expected && session === expected);
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  const expected = process.env.ADMIN_SESSION_SECRET;
  if (!expected) throw new Error("ADMIN_SESSION_SECRET is missing");

  cookieStore.set(COOKIE_NAME, expected, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
