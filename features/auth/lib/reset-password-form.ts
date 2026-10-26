import { z } from "zod";
import type { ApiFieldMap } from "@/lib/form-errors";
import { newPasswordField } from "@/features/auth/lib/validation";
import type { PasswordResetConfirmInput } from "@/features/auth/types";

export const resetPasswordFormSchema = z.object({
  newPassword: newPasswordField("Enter a new password"),
});

export type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>;

export const resetPasswordDefaultValues: ResetPasswordFormValues = { newPassword: "" };

/** The emailed link's `uid` and `token` query parameters. */
export interface ResetLink {
  uid: string;
  token: string;
}

export const toPasswordResetConfirmInput = (
  link: ResetLink,
  values: ResetPasswordFormValues,
): PasswordResetConfirmInput => ({
  uid: link.uid,
  token: link.token,
  new_password: values.newPassword,
});

/**
 * Where each API field's validation errors are shown on the form. `uid` and `token`
 * are left unmapped: a bad or expired link becomes the form-level error.
 */
export const resetPasswordApiFields: ApiFieldMap<ResetPasswordFormValues> = {
  new_password: "newPassword",
};
