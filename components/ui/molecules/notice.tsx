import type { ReactNode } from "react";
import {
  AlertTriangleIcon,
  CheckIcon,
  InfoIcon,
} from "@/components/assets/svgs/components";
import { cn } from "@/lib/cn";

export type NoticeTone = "info" | "good" | "bad" | "hold";

export interface NoticeProps {
  tone?: NoticeTone;
  title: string;
  children?: ReactNode;
  /** `alert` interrupts screen readers (errors); `status` waits politely. */
  role?: "alert" | "status";
  className?: string;
}

const toneClasses: Record<NoticeTone, { box: string; icon: string }> = {
  info: { box: "border-info-line bg-info-fill", icon: "text-link" },
  good: { box: "border-go-line bg-go-fill", icon: "text-go" },
  bad: { box: "border-stop-line bg-stop-fill", icon: "text-stop" },
  hold: { box: "border-hold-line bg-hold-fill", icon: "text-hold" },
};

const toneIcons: Record<NoticeTone, typeof InfoIcon> = {
  info: InfoIcon,
  good: CheckIcon,
  bad: AlertTriangleIcon,
  hold: AlertTriangleIcon,
};

/** Inline message banner — confirmations, warnings and errors. */
export function Notice({
  tone = "info",
  title,
  children,
  role,
  className,
}: NoticeProps) {
  const Icon = toneIcons[tone];
  return (
    <div
      role={role}
      className={cn(
        "flex gap-3 rounded-[9px] border px-4 py-3.5 text-sm",
        toneClasses[tone].box,
        className,
      )}
    >
      <Icon size={17} className={cn("mt-0.5 flex-none", toneClasses[tone].icon)} />
      <div>
        <strong className="block font-semibold text-ink">{title}</strong>
        {children && <div className="mt-0.5 text-[13.5px] text-muted">{children}</div>}
      </div>
    </div>
  );
}
