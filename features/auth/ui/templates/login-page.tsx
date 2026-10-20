import { authPaths, type LoginReason } from "@/features/auth/lib/paths";
import { AuthSwitchLink } from "@/features/auth/ui/atoms/auth-switch-link";
import { AuthCard } from "@/features/auth/ui/molecules/auth-card";
import { LoginReasonNotice } from "@/features/auth/ui/molecules/login-reason-notice";
import { LoginForm } from "@/features/auth/ui/organisms/login-form";

export interface LoginPageProps {
  reason?: LoginReason;
  nextPath?: string;
}

export function LoginPage({ reason, nextPath }: LoginPageProps) {
  return (
    <>
      <LoginReasonNotice reason={reason} />
      <AuthCard title="Log in" lede="Welcome back.">
        <LoginForm nextPath={nextPath} />
      </AuthCard>
      <AuthSwitchLink
        prompt="No account yet?"
        href={authPaths.register}
        label="Register"
      />
    </>
  );
}
