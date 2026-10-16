"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "@/components/assets/svgs/components";
import { TextField, type TextFieldProps } from "@/components/ui/atoms/text-field";
import { cn } from "@/lib/cn";

export type PasswordInputProps = Omit<TextFieldProps, "type">;

/** Password input with a show/hide toggle, so people can check what they typed. */
export function PasswordInput({ className, ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const Icon = visible ? EyeOffIcon : EyeIcon;

  return (
    <div className="relative">
      <TextField
        type={visible ? "text" : "password"}
        className={cn("pr-11", className)}
        {...props}
      />
      <button
        type="button"
        onClick={() => {
          setVisible((current) => !current);
        }}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        className="absolute inset-y-0 right-0 flex w-11 cursor-pointer items-center justify-center rounded-r-field text-muted hover:text-ink"
      >
        <Icon />
      </button>
    </div>
  );
}
