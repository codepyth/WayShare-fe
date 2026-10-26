import { z } from "zod";
import type { ApiFieldMap } from "@/lib/form-errors";
import { currentPasswordField, emailField } from "@/features/auth/lib/validation";
import type { LoginInput } from "@/features/auth/types";

export const loginFormSchema = z.object({
  email: emailField,
  password: currentPasswordField(),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const loginDefaultValues: LoginFormValues = { email: "", password: "" };

export const toLoginInput = (values: LoginFormValues): LoginInput => values;

/** Where each API field's validation errors are shown on the form. */
export const loginApiFields: ApiFieldMap<LoginFormValues> = {
  email: "email",
  password: "password",
};
