"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/features/auth/api";

export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
};

/** The logged-in user: seeded by login, fetched from `me/` after a reload. */
export function useCurrentUserQuery() {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: authApi.me,
    staleTime: 5 * 60_000,
  });
}

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

export function useChangePasswordMutation() {
  return useMutation({ mutationFn: authApi.changePassword });
}
