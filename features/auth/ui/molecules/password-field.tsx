import { FormField } from "@/components/ui/molecules/form-field";
import { PasswordInput } from "@/components/ui/molecules/password-input";
import type { FieldBinding, InputBinding } from "@/hooks/useFieldBinder";

export interface PasswordFieldProps {
  field: FieldBinding;
  input: InputBinding;
  /** `new-password` lets password managers offer a strong one. */
  autoComplete: "current-password" | "new-password";
  hint?: string;
}

export function PasswordField({
  field,
  input,
  autoComplete,
  hint,
}: PasswordFieldProps) {
  return (
    <FormField label="Password" hint={hint} {...field}>
      <PasswordInput {...input} autoComplete={autoComplete} />
    </FormField>
  );
}
