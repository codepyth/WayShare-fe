"use client";

import { Form } from "@/components/ui/atoms/form";
import { FormActions } from "@/components/ui/molecules/form-actions";
import { useFieldBinder } from "@/hooks/useFieldBinder";
import { useChangePasswordForm } from "@/features/auth/hooks/useChangePasswordForm";
import { NEW_PASSWORD_HINT } from "@/features/auth/lib/validation";
import { PasswordField } from "@/features/auth/ui/molecules/password-field";

export interface ChangePasswordFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function ChangePasswordForm({ onSuccess, onCancel }: ChangePasswordFormProps) {
  const { form, formError, isSubmitting, onSubmit } = useChangePasswordForm(onSuccess);
  const bind = useFieldBinder(form);

  return (
    <Form onSubmit={onSubmit}>
      <PasswordField
        field={bind.field("oldPassword")}
        input={bind.input("oldPassword")}
        autoComplete="current-password"
        label="Current password"
      />

      <PasswordField
        field={bind.field("newPassword")}
        input={bind.input("newPassword", { hasHint: true })}
        autoComplete="new-password"
        label="New password"
        hint={NEW_PASSWORD_HINT}
      />

      <FormActions
        label="Change password"
        isSubmitting={isSubmitting}
        formError={formError}
        onCancel={onCancel}
      />
    </Form>
  );
}
