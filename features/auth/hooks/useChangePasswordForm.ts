"use client";

import { useApiForm } from "@/hooks/useApiForm";
import { useChangePasswordMutation } from "@/features/auth/hooks/queries";
import {
  changePasswordApiFields,
  changePasswordDefaultValues,
  changePasswordFormSchema,
  toChangePasswordInput,
} from "@/features/auth/lib/change-password-form";

/** Change-password form. The session stays valid after the change. */
export function useChangePasswordForm(onSuccess: () => void) {
  const { mutateAsync } = useChangePasswordMutation();

  return useApiForm({
    schema: changePasswordFormSchema,
    defaultValues: changePasswordDefaultValues,
    submit: (values) => mutateAsync(toChangePasswordInput(values)),
    onSuccess,
    apiFields: changePasswordApiFields,
  });
}
