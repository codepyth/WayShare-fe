"use client";

import { Notice } from "@/components/ui/molecules/notice";
import { useDelayedFlag } from "@/hooks/useDelayedFlag";

const SLOW_AFTER_MS = 5_000;

/** Shown when a request runs long, e.g. while the API server wakes up. */
export function SlowRequestNotice({ isPending }: { isPending: boolean }) {
  if (!useDelayedFlag(isPending, SLOW_AFTER_MS)) return null;

  return (
    <Notice tone="info" role="status" title="Still working…">
      The server may be starting up. This can take up to a minute.
    </Notice>
  );
}
