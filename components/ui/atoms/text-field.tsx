import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/** Shared input surface, also used by inputs with adornments (e.g. password). */
export const FIELD_CONTROL_CLASS =
  "w-full rounded-field border border-line bg-surface px-3 py-2.5 text-[15px] text-ink transition-[border-color,box-shadow] placeholder:text-faint focus:border-link focus:shadow-[0_0_0_3px_var(--info-fill)] focus:outline-none aria-invalid:border-stop";

/** Includes `ref`, which React 19 passes as a regular prop. */
export type TextFieldProps = ComponentProps<"input">;

/** Single-line form input. */
export function TextField({ className, type = "text", ...props }: TextFieldProps) {
  return (
    <input type={type} className={cn(FIELD_CONTROL_CLASS, className)} {...props} />
  );
}
