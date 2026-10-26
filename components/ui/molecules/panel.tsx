import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export interface PanelProps extends ComponentProps<"section"> {
  /** Optional heading, shown in a header bar above the content. */
  title?: string;
}

/** Bordered surface card that groups related content. */
export function Panel({ title, className, children, ...props }: PanelProps) {
  return (
    <section
      className={cn("rounded-panel border border-line bg-surface shadow-sm", className)}
      {...props}
    >
      {title && (
        <h2 className="border-b border-line-2 px-5 py-3.5 text-[15px] font-semibold">
          {title}
        </h2>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}
