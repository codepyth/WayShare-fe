"use server";

import { cookies } from "next/headers";
import { CSRF_COOKIE, SESSION_COOKIE } from "@/lib/cookies";

/** Drops the session cookies on this origin, even if the API logout failed. */
export async function clearSessionCookies() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  store.delete(CSRF_COOKIE);
}
