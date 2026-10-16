import { Checkbox, type CheckboxProps } from "@/components/ui/atoms/checkbox";
import { FieldError } from "@/components/ui/atoms/field-error";
import { cn } from "@/lib/cn";

export interface CheckboxFieldProps extends CheckboxProps {
  id: string;
  label: string;
  /** Secondary line under the label. */
  description?: string;
  error?: string;
}

/** A checkbox in a bordered card, with its label, description and error. */
export function CheckboxField({
  id,
  label,
  description,
  error,
  className,
  ...props
}: CheckboxFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div
        className={cn(
          "flex items-start gap-[11px] rounded-lg border bg-surface-2 px-[15px] py-[13px]",
          error ? "border-stop" : "border-line",
        )}
      >
        <Checkbox id={id} className="mt-0.5" {...props} />
        <label htmlFor={id} className="cursor-pointer text-sm font-medium text-ink">
          {label}
          {description && (
            <span className="mt-0.5 block text-[12.5px] font-normal text-muted">
              {description}
            </span>
          )}
        </label>
      </div>
      <FieldError htmlFor={id} message={error} />
    </div>
  );
}
