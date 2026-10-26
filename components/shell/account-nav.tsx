"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/atoms/skeleton";
import { useCurrentUserQuery } from "@/features/auth/hooks/queries";
import { LogoutButton } from "@/features/auth/ui/atoms/logout-button";
import { profilePaths } from "@/features/profile/lib/paths";

const barLinkClass =
  "text-sm font-medium text-bar-fg underline-offset-2 hover:underline focus-visible:outline-bar-fg";

/** Top-bar links for a signed-in user: their name (to the profile) and log out. */
export function AccountNav() {
  const { data: user } = useCurrentUserQuery();
  const onProfile = usePathname() === profilePaths.profile;

  return (
    <div className="flex items-center gap-[18px]">
      {user ? (
        <Link
          href={profilePaths.profile}
          aria-current={onProfile ? "page" : undefined}
          className={barLinkClass}
        >
          {user.name}
        </Link>
      ) : (
        <Skeleton className="w-24 bg-bar-line" />
      )}
      <span aria-hidden className="h-[18px] w-px bg-bar-line" />
      <LogoutButton className={barLinkClass} />
    </div>
  );
}
