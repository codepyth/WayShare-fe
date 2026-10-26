"use client";

import { Form } from "@/components/ui/atoms/form";
import { FormActions } from "@/components/ui/molecules/form-actions";
import { Notice } from "@/components/ui/molecules/notice";
import { useFieldBinder } from "@/hooks/useFieldBinder";
import { useForgotPasswordForm } from "@/features/auth/hooks/useForgotPasswordForm";
import { EmailField } from "@/features/auth/ui/molecules/email-field";

/** Requests a reset link; once sent, shows a confirmation in place of the form. */
export function ForgotPasswordForm() {
  const { form, formError, isSubmitting, onSubmit, sentTo } = useForgotPasswordForm();
  const bind = useFieldBinder(form);

  if (sentTo) {
    // Worded the same whether or not the account exists, so it reveals neither.
    return (
      <Notice tone="good" role="status" title="Check your email.">
        If an account exists for {sentTo}, we have sent a link to reset your password.
        It may take a few minutes to arrive.
      </Notice>
    );
  }

  return (
    <Form onSubmit={onSubmit}>
      <EmailField field={bind.field("email")} input={bind.input("email")} />

      <FormActions
        label="Send reset link"
        isSubmitting={isSubmitting}
        formError={formError}
      />
    </Form>
  );
}
