import { TextLink } from "@/components/ui/atoms/text-link";

export interface AuthSwitchLinkProps {
  prompt: string;
  href: string;
  label: string;
}

/** "Already have an account? Log in" — the line under each auth card. */
export function AuthSwitchLink({ prompt, href, label }: AuthSwitchLinkProps) {
  return (
    <p className="mt-[18px] text-center text-sm text-muted">
      {prompt} <TextLink href={href}>{label}</TextLink>
    </p>
  );
}
