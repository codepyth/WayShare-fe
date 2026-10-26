import { z } from "zod";
import type { ApiFieldMap } from "@/lib/form-errors";
import { currentPasswordField, newPasswordField } from "@/features/auth/lib/validation";
import type { ChangePasswordInput } from "@/features/auth/types";

export const changePasswordFormSchema = z
  .object({
    oldPassword: currentPasswordField("Enter your current password"),
    newPassword: newPasswordField("Enter a new password"),
  })
  .refine((values) => values.newPassword !== values.oldPassword, {
    path: ["newPassword"],
    error: "New password must be different from your current one",
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordFormSchema>;

export const changePasswordDefaultValues: ChangePasswordFormValues = {
  oldPassword: "",
  newPassword: "",
};

export const toChangePasswordInput = (
  values: ChangePasswordFormValues,
): ChangePasswordInput => ({
  old_password: values.oldPassword,
  new_password: values.newPassword,
});

/** Where each API field's validation errors are shown on the form. */
export const changePasswordApiFields: ApiFieldMap<ChangePasswordFormValues> = {
  old_password: "oldPassword",
  new_password: "newPassword",
};
