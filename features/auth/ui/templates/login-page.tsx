import { Notice } from "@/components/ui/molecules/notice";
import { authPaths } from "@/features/auth/lib/paths";
import { AuthSwitchLink } from "@/features/auth/ui/atoms/auth-switch-link";
import { AuthCard } from "@/features/auth/ui/molecules/auth-card";
import { LoginForm } from "@/features/auth/ui/organisms/login-form";

export interface LoginPageProps {
  /** Arrived straight from registration: confirm the account was created. */
  justRegistered?: boolean;
  nextPath?: string;
}

export function LoginPage({ justRegistered = false, nextPath }: LoginPageProps) {
  return (
    <>
      {justRegistered && (
        <Notice tone="good" role="status" title="Account created." className="mb-5">
          Log in to continue.
        </Notice>
      )}
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
