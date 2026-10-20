"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/features/auth/api";

export const authKeys = {
  all: ["auth"] as const,
  /** Seeded by login until the backend has a current-user endpoint. */
  user: () => [...authKeys.all, "user"] as const,
};

export function useRegisterMutation() {
  return useMutation({ mutationFn: authApi.register });
}

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: ({ user }) => {
      queryClient.setQueryData(authKeys.user(), user);
    },
  });
}

export function useLogoutMutation() {
  return useMutation({ mutationFn: authApi.logout });
}
