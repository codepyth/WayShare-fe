import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names, resolving conflicting Tailwind utilities so that
 * caller-supplied classes win over a component's defaults
 * (e.g. `cn("bg-btn", "bg-go")` → `"bg-go"`).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
