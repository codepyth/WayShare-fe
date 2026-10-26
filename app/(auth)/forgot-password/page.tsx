import { createPageMetadata } from "@/lib/seo";
import { authPaths } from "@/features/auth/lib/paths";
import { ForgotPasswordPage } from "@/features/auth/ui/templates/forgot-password-page";

export const metadata = createPageMetadata({
  path: authPaths.forgotPassword,
  title: "Reset your password",
  noIndex: true,
});

export default function Page() {
  return <ForgotPasswordPage />;
}
