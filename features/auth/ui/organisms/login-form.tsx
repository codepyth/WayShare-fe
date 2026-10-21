"use client";

import { Form } from "@/components/ui/atoms/form";
import { FormActions } from "@/components/ui/molecules/form-actions";
import { useFieldBinder } from "@/hooks/useFieldBinder";
import { useLoginForm } from "@/features/auth/hooks/useLoginForm";
import { EmailField } from "@/features/auth/ui/molecules/email-field";
import { PasswordField } from "@/features/auth/ui/molecules/password-field";

export interface LoginFormProps {
  /** Where to go after logging in; checked for safety before use. */
  nextPath?: string;
}

export function LoginForm({ nextPath }: LoginFormProps) {
  const { form, formError, isSubmitting, onSubmit } = useLoginForm(nextPath);
  const bind = useFieldBinder(form);

  return (
    <Form onSubmit={onSubmit}>
      <EmailField field={bind.field("email")} input={bind.input("email")} />

      <PasswordField
        field={bind.field("password")}
        input={bind.input("password")}
        autoComplete="current-password"
      />

      <FormActions label="Log in" isSubmitting={isSubmitting} formError={formError} />
    </Form>
  );
}
