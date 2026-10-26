import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const widths = {
  /** Lists and dashboards. */
  wide: "max-w-[1180px]",
  /** Settings and forms: one readable column. */
  narrow: "max-w-[720px]",
} as const;

export interface PageContainerProps {
  width?: keyof typeof widths;
  className?: string;
  children: ReactNode;
}

/** Width and spacing shared by every signed-in page. */
export function PageContainer({
  width = "wide",
  className,
  children,
}: PageContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-col gap-5 px-4 pt-[30px] pb-20 sm:px-7",
        widths[width],
        className,
      )}
    >
      {children}
    </div>
  );
}
