import { z } from "zod";
import type { ApiFieldMap } from "@/lib/form-errors";
import { emailField } from "@/features/auth/lib/validation";
import type { PasswordResetInput } from "@/features/auth/types";

export const forgotPasswordFormSchema = z.object({ email: emailField });

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordFormSchema>;

export const forgotPasswordDefaultValues: ForgotPasswordFormValues = { email: "" };

export const toPasswordResetInput = (
  values: ForgotPasswordFormValues,
): PasswordResetInput => values;

/** Where each API field's validation errors are shown on the form. */
export const forgotPasswordApiFields: ApiFieldMap<ForgotPasswordFormValues> = {
  email: "email",
};
