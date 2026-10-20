"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { clearSessionCookies } from "@/features/auth/api/clear-session";
import { loginPath, type LoginReason } from "@/features/auth/lib/paths";

export interface EndSessionOptions {
  reason?: LoginReason;
  /** Page to return to after logging in again. */
  requested?: string;
}

/** Clears the session cookies and cached data, then goes to login. */
export function useEndSession() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useCallback(
    async (options: EndSessionOptions = {}) => {
      try {
        await clearSessionCookies();
      } finally {
        queryClient.clear();
        router.replace(loginPath(options));
        router.refresh();
      }
    },
    [router, queryClient],
  );
}
