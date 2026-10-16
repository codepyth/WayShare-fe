import { Button } from "@/components/ui/atoms/button";
import { FormError } from "@/components/ui/molecules/form-error";

export interface AuthFormActionsProps {
  label: string;
  isSubmitting: boolean;
  formError?: string;
}

/** The form-level error, then the full-width submit button. */
export function AuthFormActions({
  label,
  isSubmitting,
  formError,
}: AuthFormActionsProps) {
  return (
    <>
      <FormError message={formError} />
      <Button type="submit" fullWidth isLoading={isSubmitting}>
        {label}
      </Button>
    </>
  );
}
