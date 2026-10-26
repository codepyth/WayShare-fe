import type { ReactNode } from "react";
import { Wordmark } from "@/components/ui/atoms/wordmark";

/** Narrow centred column shared by the signed-out pages. */
export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[470px] px-4 pt-10 pb-20 sm:px-7 sm:pt-[52px]">
      <Wordmark size="lg" className="mb-5 text-ink" />
      {children}
    </div>
  );
}
