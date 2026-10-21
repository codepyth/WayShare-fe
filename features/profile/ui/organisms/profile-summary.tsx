"use client";

import { Avatar } from "@/components/ui/atoms/avatar";
import { Skeleton } from "@/components/ui/atoms/skeleton";
import { DetailRow } from "@/components/ui/molecules/detail-row";
import { Panel } from "@/components/ui/molecules/panel";
import { RetryNotice } from "@/components/ui/molecules/retry-notice";
import { useCurrentUserQuery } from "@/features/auth/hooks/queries";

/** Who is logged in: initials, name, email and mobile number. */
export function ProfileSummary() {
  const { data: user, isPending, isError, refetch } = useCurrentUserQuery();

  if (isError) {
    return (
      <Panel>
        <RetryNotice
          title="Your details could not be loaded."
          onRetry={() => void refetch()}
        />
      </Panel>
    );
  }

  return (
    <Panel aria-busy={isPending || undefined}>
      <div className="flex items-center gap-4">
        {user ? (
          <Avatar name={user.name} />
        ) : (
          <Skeleton className="size-14 flex-none rounded-full" />
        )}
        <div className="flex min-w-0 flex-col gap-1">
          {user ? (
            <>
              <p className="truncate text-[17px] font-semibold tracking-[-0.01em]">
                {user.name}
              </p>
              <p className="truncate text-sm text-muted">{user.email}</p>
            </>
          ) : (
            <>
              <Skeleton className="h-5 w-40" />
              <Skeleton className="w-56" />
            </>
          )}
        </div>
      </div>

      <div className="mt-5 border-t border-line-2 pt-4">
        <DetailRow label="Mobile number">
          {!user ? (
            <Skeleton className="mt-1 w-32" />
          ) : user.phone ? (
            <span className="font-mono">{user.phone}</span>
          ) : (
            <span className="text-sm text-muted">
              Not added yet. It is only shared with the other person once a booking is
              accepted.
            </span>
          )}
        </DetailRow>
      </div>
    </Panel>
  );
}
