import { Notice } from "@/components/ui/molecules/notice";

/** Form-level failure (e.g. wrong credentials), announced to screen readers. */
export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return <Notice tone="bad" role="alert" title={message} />;
}
