"use client";

import { useLogout } from "@/features/auth/hooks/useLogout";

/** "Log out" link-style button for the top bar. */
export function LogoutButton() {
  const { logout, isPending } = useLogout();

  return (
    <button
      type="button"
      onClick={logout}
      disabled={isPending}
      aria-busy={isPending || undefined}
      className="cursor-pointer text-sm font-medium text-bar-fg underline-offset-2 hover:underline focus-visible:outline-bar-fg disabled:cursor-wait disabled:opacity-60"
    >
      Log out
    </button>
  );
}
