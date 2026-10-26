"use client";

import { Form } from "@/components/ui/atoms/form";
import { FormActions } from "@/components/ui/molecules/form-actions";
import { useFieldBinder } from "@/hooks/useFieldBinder";
import { useResetPasswordForm } from "@/features/auth/hooks/useResetPasswordForm";
import type { ResetLink } from "@/features/auth/lib/reset-password-form";
import { NEW_PASSWORD_HINT } from "@/features/auth/lib/validation";
import { PasswordField } from "@/features/auth/ui/molecules/password-field";

export interface ResetPasswordFormProps {
  link: ResetLink;
}

export function ResetPasswordForm({ link }: ResetPasswordFormProps) {
  const { form, formError, isSubmitting, onSubmit } = useResetPasswordForm(link);
  const bind = useFieldBinder(form);

  return (
    <Form onSubmit={onSubmit}>
      <PasswordField
        field={bind.field("newPassword")}
        input={bind.input("newPassword", { hasHint: true })}
        autoComplete="new-password"
        label="New password"
        hint={NEW_PASSWORD_HINT}
      />

      <FormActions
        label="Reset password"
        isSubmitting={isSubmitting}
        formError={formError}
      />
    </Form>
  );
}
