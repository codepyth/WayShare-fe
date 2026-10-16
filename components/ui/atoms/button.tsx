import type { ComponentProps } from "react";
import { SpinnerIcon } from "@/components/assets/svgs/components";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary";

export interface ButtonProps extends ComponentProps<"button"> {
  variant?: Variant;
  /** Stretches the button to its container's width. */
  fullWidth?: boolean;
  /** Shows a spinner over the label and blocks interaction. */
  isLoading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary: "border-btn bg-btn text-btn-fg hover:border-btn-hover hover:bg-btn-hover",
  secondary: "border-line bg-surface text-ink hover:border-faint hover:bg-surface-3",
};

export function Button({
  className,
  variant = "primary",
  fullWidth = false,
  isLoading = false,
  disabled,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "relative inline-flex cursor-pointer items-center justify-center gap-2 rounded-field border px-5 py-[11px] text-[14.5px] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-45",
        variantClasses[variant],
        fullWidth && "w-full",
        className,
      )}
      {...props}
      disabled={Boolean(disabled) || isLoading}
      aria-busy={isLoading || undefined}
    >
      {/* The label keeps its space while loading, so the button never resizes. */}
      <span
        className={cn(
          "inline-flex items-center gap-[inherit]",
          isLoading && "opacity-0",
        )}
      >
        {children}
      </span>
      {isLoading && <SpinnerIcon className="absolute animate-spin" />}
    </button>
  );
}
