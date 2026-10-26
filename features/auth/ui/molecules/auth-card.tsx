import type { ReactNode } from "react";
import { Panel } from "@/components/ui/molecules/panel";

export interface AuthCardProps {
  title: string;
  lede: string;
  children: ReactNode;
}

/** The card holding an auth form: page heading, one-line lede, then the form. */
export function AuthCard({ title, lede, children }: AuthCardProps) {
  return (
    <Panel>
      <h1 className="text-[21px] font-semibold tracking-[-0.022em] text-balance">
        {title}
      </h1>
      <p className="mt-1 mb-5 text-[14.5px] text-muted">{lede}</p>
      {children}
    </Panel>
  );
}
