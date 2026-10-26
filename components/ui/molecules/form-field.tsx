import type { ReactNode } from "react";
import { FieldError } from "@/components/ui/atoms/field-error";
import { FieldHint } from "@/components/ui/atoms/field-hint";
import { FieldLabel } from "@/components/ui/atoms/field-label";
import { cn } from "@/lib/cn";

export interface FormFieldProps {
  label: string;
  /** Id of the control; links the label, hint and error to it. */
  htmlFor?: string;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

/** Label, control, hint and validation message — the unit every form is built from. */
export function FormField({
  label,
  htmlFor,
  hint,
  error,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <FieldLabel htmlFor={htmlFor}>{label}</FieldLabel>
      {children}
      <FieldHint htmlFor={htmlFor}>{hint}</FieldHint>
      <FieldError htmlFor={htmlFor} message={error} />
    </div>
  );
}
