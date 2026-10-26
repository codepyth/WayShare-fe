import { Notice } from "@/components/ui/molecules/notice";
import { authPaths } from "@/features/auth/lib/paths";
import type { ResetLink } from "@/features/auth/lib/reset-password-form";
import { AuthSwitchLink } from "@/features/auth/ui/atoms/auth-switch-link";
import { AuthCard } from "@/features/auth/ui/molecules/auth-card";
import { ResetPasswordForm } from "@/features/auth/ui/organisms/reset-password-form";

export interface ResetPasswordPageProps {
  /** Missing when the link is incomplete, e.g. cut short by an email client. */
  link?: ResetLink;
}

export function ResetPasswordPage({ link }: ResetPasswordPageProps) {
  return (
    <>
      <AuthCard
        title="Choose a new password"
        lede="You will use it the next time you log in."
      >
        {link ? (
          <ResetPasswordForm link={link} />
        ) : (
          <Notice tone="bad" role="alert" title="This reset link is incomplete.">
            Open the link from your email again, or request a new one.
          </Notice>
        )}
      </AuthCard>
      <AuthSwitchLink
        prompt="Link not working?"
        href={authPaths.forgotPassword}
        label="Request a new one"
      />
    </>
  );
}
