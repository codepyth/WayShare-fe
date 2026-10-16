"use client";

import { useRouter } from "next/navigation";
import { useLogoutMutation } from "@/features/auth/hooks/queries";
import { authPaths } from "@/features/auth/lib/paths";

/** Logs out, then goes to login whether or not the API call succeeded. */
export function useLogout() {
  const router = useRouter();
  const { mutate, isPending } = useLogoutMutation();

  const logout = () => {
    mutate(undefined, {
      onSettled: () => {
        router.replace(authPaths.login);
        router.refresh();
      },
    });
  };

  return { logout, isPending };
}
