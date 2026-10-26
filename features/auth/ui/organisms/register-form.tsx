"use client";

import { Form } from "@/components/ui/atoms/form";
import { TextField } from "@/components/ui/atoms/text-field";
import { CheckboxField } from "@/components/ui/molecules/checkbox-field";
import { FormActions } from "@/components/ui/molecules/form-actions";
import { FormField } from "@/components/ui/molecules/form-field";
import { useFieldBinder } from "@/hooks/useFieldBinder";
import { useRegisterForm } from "@/features/auth/hooks/useRegisterForm";
import { NEW_PASSWORD_HINT } from "@/features/auth/lib/validation";
import { EmailField } from "@/features/auth/ui/molecules/email-field";
import { PasswordField } from "@/features/auth/ui/molecules/password-field";

export function RegisterForm() {
  const { form, formError, isSubmitting, onSubmit } = useRegisterForm();
  const bind = useFieldBinder(form);

  return (
    <Form onSubmit={onSubmit}>
      <FormField label="Full name" {...bind.field("name")}>
        <TextField {...bind.input("name")} autoComplete="name" />
      </FormField>

      <EmailField field={bind.field("email")} input={bind.input("email")} />

      <PasswordField
        field={bind.field("password")}
        input={bind.input("password", { hasHint: true })}
        autoComplete="new-password"
        hint={NEW_PASSWORD_HINT}
      />

      <CheckboxField
        {...bind.input("isAdultConfirmed")}
        label="I am 18 or over"
        description="WayShare is for adults only."
        error={bind.errorOf("isAdultConfirmed")}
      />

      <FormActions
        label="Create account"
        isSubmitting={isSubmitting}
        formError={formError}
      />
    </Form>
  );
}
