import { WayShareMarkIcon } from "@/components/assets/svgs/components";
import { cn } from "@/lib/cn";

export interface WordmarkProps {
  className?: string;
  size?: "md" | "lg";
}

/** The WayShare mark and name. Inherits its colour from the parent. */
export function Wordmark({ className, size = "md" }: WordmarkProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-bold tracking-[-0.02em]",
        size === "lg" ? "text-[19px]" : "text-[17px]",
        className,
      )}
    >
      <WayShareMarkIcon />
      WayShare
    </span>
  );
}
