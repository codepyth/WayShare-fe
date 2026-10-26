import { Button } from "@/components/ui/atoms/button";
import { FormError } from "@/components/ui/molecules/form-error";
import { SlowRequestNotice } from "@/components/ui/molecules/slow-request-notice";

export interface FormActionsProps {
  label: string;
  isSubmitting: boolean;
  formError?: string;
  /** Adds a Cancel button (e.g. in a modal); buttons then sit right-aligned. */
  onCancel?: () => void;
}

/** End of a form: the error or a still-working notice, then its buttons. */
export function FormActions({
  label,
  isSubmitting,
  formError,
  onCancel,
}: FormActionsProps) {
  const submit = (
    <Button type="submit" fullWidth={!onCancel} isLoading={isSubmitting}>
      {label}
    </Button>
  );

  return (
    <>
      <FormError message={formError} />
      <SlowRequestNotice isPending={isSubmitting} />
      {onCancel ? (
        <div className="flex flex-wrap justify-end gap-3">
          <Button variant="secondary" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          {submit}
        </div>
      ) : (
        submit
      )}
    </>
  );
}
