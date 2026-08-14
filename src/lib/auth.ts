import { cookies } from "next/headers";

const ADMIN_USERNAME = (process.env.ADMIN_USERNAME || "goreteddantas").trim();
const ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD || "LeticiaLizandraLeandro547568").trim();
const AUTH_COOKIE_NAME = "atelie_gorete_session";
const AUTH_TOKEN_SECRET = "atelie-gorete-auth-secret-session-key-v2";

export async function verifyCredentials(username: string, pass: string): Promise<boolean> {
  const cleanUser = username.trim().toLowerCase();
  const cleanPass = pass.trim();

  return (
    cleanUser === ADMIN_USERNAME.toLowerCase() &&
    cleanPass === ADMIN_PASSWORD
  );
}

export async function createSession() {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, AUTH_TOKEN_SECRET, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
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
