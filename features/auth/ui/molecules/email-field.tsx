import { TextField } from "@/components/ui/atoms/text-field";
import { FormField } from "@/components/ui/molecules/form-field";
import type { FieldBinding, InputBinding } from "@/hooks/useFieldBinder";

export interface EmailFieldProps {
  field: FieldBinding;
  input: InputBinding;
}

export function EmailField({ field, input }: EmailFieldProps) {
  return (
    <FormField label="Email address" {...field}>
      <TextField
        {...input}
        type="email"
        inputMode="email"
        autoComplete="email"
        spellCheck={false}
        placeholder="you@example.com"
      />
    </FormField>
  );
}
