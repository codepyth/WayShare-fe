import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { ApiError } from "@/lib/api";

/** Keys DRF uses for errors that belong to the whole request, not one field. */
const FORM_LEVEL_KEYS = new Set(["non_field_errors", "detail"]);

export interface ParsedApiErrors {
  /** First message per API field name, e.g. `{ email: "Already registered." }`. */
  fieldErrors: Record<string, string>;
  /** Messages that belong to the form as a whole. */
  formErrors: string[];
}

const firstMessage = (value: unknown): string | undefined => {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.find((item) => typeof item === "string");
  return undefined;
};

/** Reads a DRF error body; `null` when there is none (network error, 5xx page). */
export function parseApiErrors(error: unknown): ParsedApiErrors | null {
  if (!(error instanceof ApiError)) return null;
  const { details } = error;
  if (typeof details !== "object" || details === null || Array.isArray(details)) {
    return null;
  }

  const parsed: ParsedApiErrors = { fieldErrors: {}, formErrors: [] };
  for (const [key, value] of Object.entries(details)) {
    const message = firstMessage(value);
    if (!message) continue;
    if (FORM_LEVEL_KEYS.has(key)) parsed.formErrors.push(message);
    else parsed.fieldErrors[key] = message;
  }

  const hasAny =
    parsed.formErrors.length > 0 || Object.keys(parsed.fieldErrors).length > 0;
  return hasAny ? parsed : null;
}

/** Maps an API field name (snake_case) to the form path that displays it. */
export type ApiFieldMap<T extends FieldValues> = Partial<Record<string, Path<T>>>;

/**
 * Sets server errors on their fields; unmapped ones become the form error.
 * Returns `null` when the error is unreadable, so the caller shows a fallback.
 */
export function applyApiErrorsToForm<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
  fieldMap: ApiFieldMap<T>,
): { formError?: string } | null {
  const parsed = parseApiErrors(error);
  if (!parsed) return null;

  const formErrors = [...parsed.formErrors];
  for (const [apiField, message] of Object.entries(parsed.fieldErrors)) {
    const path = fieldMap[apiField];
    if (path) setError(path, { type: "server", message });
    else formErrors.push(message);
  }

  return { formError: formErrors[0] };
}
