import Link, { type LinkProps } from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export type TextLinkProps = LinkProps & Omit<ComponentProps<"a">, keyof LinkProps>;

/** In-app link in the body text style. */
export function TextLink({ className, ...props }: TextLinkProps) {
  return (
    <Link
      className={cn(
        "font-medium text-link underline-offset-2 hover:text-link-hover hover:underline",
        className,
      )}
      {...props}
    />
  );
}
