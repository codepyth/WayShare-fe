"use client";

import { cn } from "@/lib/cn";
import { useLogout } from "@/features/auth/hooks/useLogout";

/** "Log out" as a link-style button; the caller sets its look. */
export function LogoutButton({ className }: { className?: string }) {
  const { logout, isPending } = useLogout();

  return (
    <button
      type="button"
      onClick={logout}
      disabled={isPending}
      aria-busy={isPending || undefined}
      className={cn(
        "cursor-pointer disabled:cursor-wait disabled:opacity-60",
        className,
      )}
    >
      Log out
    </button>
  );
}
