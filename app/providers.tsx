"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { ModalManager } from "@/components/ui/molecules/modal/modal-manager";
import { ModalProvider } from "@/contexts/modal-context";
import { ApiError } from "@/lib/api";
import { SessionExpiryWatcher } from "@/features/auth/ui/atoms/session-expiry-watcher";

const MAX_RETRIES = 1;

// A 4xx (bad input, not logged in, not found) fails the same way on retry.
const retryUnlessClientError = (failureCount: number, error: Error) =>
  !(error instanceof ApiError && error.status >= 400 && error.status < 500) &&
  failureCount < MAX_RETRIES;

export function Providers({ children }: { children: ReactNode }) {
  // One client per browser session, never shared between server requests.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 30_000, retry: retryUnlessClientError },
          mutations: { retry: false },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <SessionExpiryWatcher />
        {children}
        <ModalManager />
      </ModalProvider>
    </QueryClientProvider>
  );
}
