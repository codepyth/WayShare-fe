import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/** Bordered surface card that groups related content. */
export function Panel({ className, ...props }: ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "rounded-panel border border-line bg-surface p-5 shadow-sm",
        className,
      )}
      {...props}
    />
  );
}
