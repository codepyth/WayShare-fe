"use client";

import { useState } from "react";
import { useApiForm } from "@/hooks/useApiForm";
import { usePasswordResetMutation } from "@/features/auth/hooks/queries";
import {
  forgotPasswordApiFields,
  forgotPasswordDefaultValues,
  forgotPasswordFormSchema,
  toPasswordResetInput,
} from "@/features/auth/lib/forgot-password-form";

/** Forgot-password form. `sentTo` is the address once a reset link has been requested. */
export function useForgotPasswordForm() {
  const [sentTo, setSentTo] = useState<string>();
  const { mutateAsync } = usePasswordResetMutation();

  const apiForm = useApiForm({
    schema: forgotPasswordFormSchema,
    defaultValues: forgotPasswordDefaultValues,
    submit: (values) => mutateAsync(toPasswordResetInput(values)),
    onSuccess: (_result, values) => {
      setSentTo(values.email);
    },
    apiFields: forgotPasswordApiFields,
  });

  return { ...apiForm, sentTo };
}
