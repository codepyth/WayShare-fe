import { createPageMetadata } from "@/lib/seo";
import { RegisterPage } from "@/features/auth/ui/templates/register-page";

export const metadata = createPageMetadata({
  path: "/register",
  title: "Create your account",
  noIndex: true,
});

export default function Page() {
  return <RegisterPage />;
}
