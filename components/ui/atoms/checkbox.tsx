import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export type CheckboxProps = Omit<ComponentProps<"input">, "type">;

/** Native checkbox, so keyboard, form and screen-reader behaviour come free. */
export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      className={cn("m-0 size-[17px] flex-none cursor-pointer accent-btn", className)}
      {...props}
    />
  );
}
