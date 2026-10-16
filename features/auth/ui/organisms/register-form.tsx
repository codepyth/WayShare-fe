"use client";

import { TextField } from "@/components/ui/atoms/text-field";
import { CheckboxField } from "@/components/ui/molecules/checkbox-field";
import { FormField } from "@/components/ui/molecules/form-field";
import { useFieldBinder } from "@/hooks/useFieldBinder";
import { useRegisterForm } from "@/features/auth/hooks/useRegisterForm";
import { PASSWORD_MIN } from "@/features/auth/lib/validation";
import { AuthFormActions } from "@/features/auth/ui/molecules/auth-form-actions";
import { EmailField } from "@/features/auth/ui/molecules/email-field";
import { PasswordField } from "@/features/auth/ui/molecules/password-field";

export function RegisterForm() {
  const { form, formError, isSubmitting, onSubmit } = useRegisterForm();
  const bind = useFieldBinder(form);

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-[17px]">
      <FormField label="Full name" {...bind.field("name")}>
        <TextField {...bind.input("name")} autoComplete="name" />
      </FormField>

      <EmailField field={bind.field("email")} input={bind.input("email")} />

      <PasswordField
        field={bind.field("password")}
        input={bind.input("password", { hasHint: true })}
        autoComplete="new-password"
        hint={`At least ${String(PASSWORD_MIN)} characters, not only numbers.`}
      />

      <CheckboxField
        {...bind.input("isAdultConfirmed")}
        label="I am 18 or over"
        description="WayShare is for adults only."
        error={bind.errorOf("isAdultConfirmed")}
      />

      <AuthFormActions
        label="Create account"
        isSubmitting={isSubmitting}
        formError={formError}
      />
    </form>
  );
}
