import { Notice, type NoticeTone } from "@/components/ui/molecules/notice";
import type { LoginReason } from "@/features/auth/lib/paths";

const NOTICES: Record<LoginReason, { tone: NoticeTone; title: string; body: string }> =
  {
    registered: {
      tone: "good",
      title: "Account created.",
      body: "Log in to continue.",
    },
    expired: {
      tone: "hold",
      title: "Your session has ended.",
      body: "Log in again to continue.",
    },
  };

/** Explains why the login page was opened. */
export function LoginReasonNotice({ reason }: { reason?: LoginReason }) {
  if (!reason) return null;
  const { tone, title, body } = NOTICES[reason];
  return (
    <Notice tone={tone} role="status" title={title} className="mb-5">
      {body}
    </Notice>
  );
}
