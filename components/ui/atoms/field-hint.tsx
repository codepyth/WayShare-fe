export const fieldHintId = (htmlFor: string) => `${htmlFor}-hint`;

/** Helper text under a control, linked to it via `aria-describedby`. */
export function FieldHint({
  htmlFor,
  children,
}: {
  htmlFor?: string;
  children?: string;
}) {
  if (!children) return null;
  return (
    <p id={htmlFor ? fieldHintId(htmlFor) : undefined} className="text-xs text-faint">
      {children}
    </p>
  );
}
