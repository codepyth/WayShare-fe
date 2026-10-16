import { z } from "zod";
import type { ApiFieldMap } from "@/lib/form-errors";
import { emailField, NAME_MAX, newPasswordField } from "@/features/auth/lib/validation";
import type { RegisterInput } from "@/features/auth/types";

export const registerFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Enter your full name")
    .max(NAME_MAX, `Name must be ${String(NAME_MAX)} characters or fewer`),
  email: emailField,
  password: newPasswordField,
  isAdultConfirmed: z
    .boolean()
    .refine(Boolean, "Confirm you are 18 or over to create an account"),
});

export type RegisterFormValues = z.infer<typeof registerFormSchema>;

export const registerDefaultValues: RegisterFormValues = {
  name: "",
  email: "",
  password: "",
  isAdultConfirmed: false,
};

export const toRegisterInput = (values: RegisterFormValues): RegisterInput => ({
  name: values.name,
  email: values.email,
  password: values.password,
  is_adult_confirmed: values.isAdultConfirmed,
});

/** Where each API field's validation errors are shown on the form. */
export const registerApiFields: ApiFieldMap<RegisterFormValues> = {
  name: "name",
  email: "email",
  password: "password",
  is_adult_confirmed: "isAdultConfirmed",
};
