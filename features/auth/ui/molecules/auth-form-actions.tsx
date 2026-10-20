import { Button } from "@/components/ui/atoms/button";
import { FormError } from "@/components/ui/molecules/form-error";
import { SlowRequestNotice } from "@/components/ui/molecules/slow-request-notice";

export interface AuthFormActionsProps {
  label: string;
  isSubmitting: boolean;
  formError?: string;
}

/** Form-level error, a notice if the request runs long, then the submit button. */
export function AuthFormActions({
  label,
  isSubmitting,
  formError,
}: AuthFormActionsProps) {
  return (
    <>
      <FormError message={formError} />
      <SlowRequestNotice isPending={isSubmitting} />
      <Button type="submit" fullWidth isLoading={isSubmitting}>
        {label}
      </Button>
    </>
  );
}
