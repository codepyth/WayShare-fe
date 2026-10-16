export const fieldErrorId = (htmlFor: string) => `${htmlFor}-error`;

/** Validation message linked to its control via `aria-describedby`. */
export function FieldError({
  htmlFor,
  message,
}: {
  htmlFor?: string;
  message?: string;
}) {
  if (!message) return null;
  return (
    <p
      id={htmlFor ? fieldErrorId(htmlFor) : undefined}
      className="text-[12.5px] font-medium text-stop"
    >
      {message}
    </p>
  );
}
