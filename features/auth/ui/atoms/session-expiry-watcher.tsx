"use client";

import { useSessionExpiry } from "@/features/auth/hooks/useSessionExpiry";

/** Renders nothing; mounts the expired-session handler once for the app. */
export function SessionExpiryWatcher() {
  useSessionExpiry();
  return null;
}
