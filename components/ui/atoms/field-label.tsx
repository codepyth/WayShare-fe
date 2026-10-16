import type { ReactNode } from "react";

export interface FieldLabelProps {
  htmlFor?: string;
  children: ReactNode;
}

export function FieldLabel({ htmlFor, children }: FieldLabelProps) {
  return (
    <label htmlFor={htmlFor} className="text-[13px] font-semibold text-ink-2">
      {children}
    </label>
  );
}
