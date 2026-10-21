import { cn } from "@/lib/cn";

/** Up to two initials: "Ada Lovelace" → "AL", "Cher" → "C". */
const initialsOf = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

export interface AvatarProps {
  name: string;
  className?: string;
}

/** A person's initials in a circle. Decorative: the name is shown beside it. */
export function Avatar({ name, className }: AvatarProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-14 flex-none items-center justify-center rounded-full border border-info-line bg-info-fill text-lg font-semibold text-link",
        className,
      )}
    >
      {initialsOf(name)}
    </span>
  );
}
