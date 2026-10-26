"use client";

import { useRouter } from "next/navigation";
import { useApiForm } from "@/hooks/useApiForm";
import { useLoginMutation } from "@/features/auth/hooks/queries";
import { safeNextPath } from "@/features/auth/lib/paths";
import {
  loginApiFields,
  loginDefaultValues,
  loginFormSchema,
  toLoginInput,
} from "@/features/auth/lib/login-form";

/** Login form. `nextPath` is where to return to, validated before use. */
export function useLoginForm(nextPath?: string) {
  const router = useRouter();
  const { mutateAsync } = useLoginMutation();

  return useApiForm({
    schema: loginFormSchema,
    defaultValues: loginDefaultValues,
    submit: (values) => mutateAsync(toLoginInput(values)),
    onSuccess: () => {
      router.replace(safeNextPath(nextPath));
      router.refresh();
    },
    apiFields: loginApiFields,
  });
}
