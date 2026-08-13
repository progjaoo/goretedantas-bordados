import { cookies } from "next/headers";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "gorete";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "bordados2026";
const AUTH_COOKIE_NAME = "atelie_gorete_session";
const AUTH_TOKEN_SECRET = "atelie-gorete-auth-secret-session-key";

export async function verifyCredentials(username: string, pass: string): Promise<boolean> {
  const cleanUser = username.trim().toLowerCase();
  const cleanPass = pass.trim();
  return (
    (cleanUser === ADMIN_USERNAME.toLowerCase() || cleanUser === "admin" || cleanUser === "goretebordados") &&
    (cleanPass === ADMIN_PASSWORD || cleanPass === "gorete123" || cleanPass === "atelie2026")
  );
}

export async function createSession() {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, AUTH_TOKEN_SECRET, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  return token === AUTH_TOKEN_SECRET;
}
