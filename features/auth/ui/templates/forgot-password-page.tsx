import { authPaths } from "@/features/auth/lib/paths";
import { AuthSwitchLink } from "@/features/auth/ui/atoms/auth-switch-link";
import { AuthCard } from "@/features/auth/ui/molecules/auth-card";
import { ForgotPasswordForm } from "@/features/auth/ui/organisms/forgot-password-form";

export function ForgotPasswordPage() {
  return (
    <>
      <AuthCard
        title="Reset your password"
        lede="Enter your email address and we will send you a link to choose a new password."
      >
        <ForgotPasswordForm />
      </AuthCard>
      <AuthSwitchLink prompt="Remembered it?" href={authPaths.login} label="Log in" />
    </>
  );
}
