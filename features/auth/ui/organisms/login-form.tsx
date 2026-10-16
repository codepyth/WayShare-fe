"use client";

import { useFieldBinder } from "@/hooks/useFieldBinder";
import { useLoginForm } from "@/features/auth/hooks/useLoginForm";
import { AuthFormActions } from "@/features/auth/ui/molecules/auth-form-actions";
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
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-[17px]">
      <EmailField field={bind.field("email")} input={bind.input("email")} />

      <PasswordField
        field={bind.field("password")}
        input={bind.input("password")}
        autoComplete="current-password"
      />

      <AuthFormActions
        label="Log in"
        isSubmitting={isSubmitting}
        formError={formError}
      />
    </form>
  );
}
