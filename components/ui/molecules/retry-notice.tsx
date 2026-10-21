import { Notice } from "@/components/ui/molecules/notice";

export interface RetryNoticeProps {
  title: string;
  onRetry: () => void;
}

/** A load failure with a "Try again" action. */
export function RetryNotice({ title, onRetry }: RetryNoticeProps) {
  return (
    <Notice tone="bad" role="alert" title={title}>
      <button
        type="button"
        onClick={onRetry}
        className="cursor-pointer font-medium text-link underline-offset-2 hover:underline"
      >
        Try again
      </button>
    </Notice>
  );
}
