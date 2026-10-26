import { cn } from "@/lib/cn";

/** Grey placeholder shown while content loads. Hidden from screen readers. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("block h-4 animate-pulse rounded bg-surface-3", className)}
    />
  );
}
