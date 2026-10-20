"use client";

import { useLogoutMutation } from "@/features/auth/hooks/queries";
import { useEndSession } from "@/features/auth/hooks/useEndSession";

/** Logs out, then ends the session locally whether or not the API call succeeded. */
export function useLogout() {
  const endSession = useEndSession();
  const { mutate, isPending } = useLogoutMutation();

  const logout = () => {
    mutate(undefined, {
      onSettled: () => {
        void endSession();
      },
    });
  };

  return { logout, isPending };
}
