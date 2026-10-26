import { authPaths } from "@/features/auth/lib/paths";
import { AuthSwitchLink } from "@/features/auth/ui/atoms/auth-switch-link";
import { AuthCard } from "@/features/auth/ui/molecules/auth-card";
import { RegisterForm } from "@/features/auth/ui/organisms/register-form";

export function RegisterPage() {
  return (
    <>
      <AuthCard
        title="Create your account"
        lede="One account. Travel as a passenger, or offer your empty seats as a driver."
      >
        <RegisterForm />
      </AuthCard>
      <AuthSwitchLink
        prompt="Already have an account?"
        href={authPaths.login}
        label="Log in"
      />
    </>
  );
}
