"use client";

import { useRouter } from "next/navigation";
import { useApiForm } from "@/hooks/useApiForm";
import { useRegisterMutation } from "@/features/auth/hooks/queries";
import { loginPath } from "@/features/auth/lib/paths";
import {
  registerApiFields,
  registerDefaultValues,
  registerFormSchema,
  toRegisterInput,
} from "@/features/auth/lib/register-form";

/** Registration form. Success sends the person to log in — login creates the session. */
export function useRegisterForm() {
  const router = useRouter();
  const { mutateAsync } = useRegisterMutation();

  return useApiForm({
    schema: registerFormSchema,
    defaultValues: registerDefaultValues,
    submit: (values) => mutateAsync(toRegisterInput(values)),
    onSuccess: () => {
      router.push(loginPath({ reason: "registered" }));
    },
    apiFields: registerApiFields,
  });
}
