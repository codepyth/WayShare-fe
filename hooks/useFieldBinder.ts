"use client";

import type {
  FieldValues,
  Path,
  UseFormRegisterReturn,
  UseFormReturn,
} from "react-hook-form";
import { fieldErrorId } from "@/components/ui/atoms/field-error";
import { fieldHintId } from "@/components/ui/atoms/field-hint";

export interface BindInputOptions {
  /** The field shows a hint, so the control is also described by it. */
  hasHint?: boolean;
}

/** Props `useFieldBinder().field()` returns, for `FormField`. */
export interface FieldBinding {
  htmlFor: string;
  error?: string;
}

/** Props `useFieldBinder().input()` returns, for a native input. */
export interface InputBinding extends UseFormRegisterReturn {
  id: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
}

/** Wires a form path to its control: register, id, error and aria attributes. */
export function useFieldBinder<T extends FieldValues>(form: UseFormReturn<T>) {
  const idOf = (name: Path<T>) => `field-${name.replaceAll(".", "-")}`;

  const errorOf = (name: Path<T>) =>
    form.getFieldState(name, form.formState).error?.message;

  return {
    idOf,
    errorOf,
    input: (
      name: Path<T>,
      { hasHint = false }: BindInputOptions = {},
    ): InputBinding => {
      const id = idOf(name);
      const error = errorOf(name);
      const describedBy = [hasHint && fieldHintId(id), error && fieldErrorId(id)]
        .filter(Boolean)
        .join(" ");
      return {
        ...form.register(name),
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy || undefined,
      };
    },
    field: (name: Path<T>): FieldBinding => ({
      htmlFor: idOf(name),
      error: errorOf(name),
    }),
  };
}
