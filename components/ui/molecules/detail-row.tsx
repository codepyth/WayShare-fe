import type { ReactNode } from "react";

export interface DetailRowProps {
  label: string;
  children: ReactNode;
}

/** A labelled piece of information, e.g. "Mobile number" and its value. */
export function DetailRow({ label, children }: DetailRowProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[13px] font-semibold text-ink-2">{label}</span>
      <div className="text-[14.5px] text-ink">{children}</div>
    </div>
  );
}
