"use client";

import { useState, type SubmitEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type DefaultValues, type FieldValues } from "react-hook-form";
import type { ZodType } from "zod";
import { applyApiErrorsToForm, type ApiFieldMap } from "@/lib/form-errors";

const FALLBACK_ERROR = "Something went wrong. Check your connection and try again.";

export interface UseApiFormOptions<TValues extends FieldValues, TResult> {
  schema: ZodType<TValues, TValues>;
  defaultValues: DefaultValues<TValues>;
  /** Sends the validated values to the API. */
  submit: (values: TValues) => Promise<TResult>;
  onSuccess: (result: TResult, values: TValues) => void;
  /** Where the API's field errors are shown; unmapped ones become form-level. */
  apiFields: ApiFieldMap<TValues>;
}

/** API form: Zod validation, server field errors on inputs, one form-level error. */
export function useApiForm<TValues extends FieldValues, TResult>({
  schema,
  defaultValues,
  submit,
  onSuccess,
  apiFields,
}: UseApiFormOptions<TValues, TResult>) {
  const [formError, setFormError] = useState<string>();

  const form = useForm<TValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onTouched",
  });

  const handleValid = async (values: TValues) => {
    setFormError(undefined);
    try {
      onSuccess(await submit(values), values);
    } catch (error) {
      const applied = applyApiErrorsToForm(error, form.setError, apiFields);
      setFormError(applied ? applied.formError : FALLBACK_ERROR);
    }
  };

  return {
    form,
    formError,
    isSubmitting: form.formState.isSubmitting,
    onSubmit: (event: SubmitEvent<HTMLFormElement>) => {
      void form.handleSubmit(handleValid)(event);
    },
  };
}
