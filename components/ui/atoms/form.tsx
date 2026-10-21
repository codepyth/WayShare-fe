import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/** A form with the standard field spacing; validation is left to the form's schema. */
export function Form({ className, ...props }: ComponentProps<"form">) {
  return (
    <form noValidate className={cn("flex flex-col gap-[17px]", className)} {...props} />
  );
}
