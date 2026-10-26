"use client";

import { useRouter } from "next/navigation";
import { useApiForm } from "@/hooks/useApiForm";
import { usePasswordResetConfirmMutation } from "@/features/auth/hooks/queries";
import { loginPath } from "@/features/auth/lib/paths";
import {
  resetPasswordApiFields,
  resetPasswordDefaultValues,
  resetPasswordFormSchema,
  toPasswordResetConfirmInput,
  type ResetLink,
} from "@/features/auth/lib/reset-password-form";

/** Reset-password form for an emailed link. Success sends the person to log in. */
export function useResetPasswordForm(link: ResetLink) {
  const router = useRouter();
  const { mutateAsync } = usePasswordResetConfirmMutation();

  return useApiForm({
    schema: resetPasswordFormSchema,
    defaultValues: resetPasswordDefaultValues,
    submit: (values) => mutateAsync(toPasswordResetConfirmInput(link, values)),
    onSuccess: () => {
      // `replace` drops the one-time link from history.
      router.replace(loginPath({ reason: "password-reset" }));
    },
    apiFields: resetPasswordApiFields,
  });
}
