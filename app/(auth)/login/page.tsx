import { createPageMetadata } from "@/lib/seo";
import { isLoginReason } from "@/features/auth/lib/paths";
import { LoginPage } from "@/features/auth/ui/templates/login-page";

export const metadata = createPageMetadata({
  path: "/login",
  title: "Log in",
  noIndex: true,
});

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function Page({ searchParams }: PageProps<"/login">) {
  const params = await searchParams;
  const reason = first(params.reason);

  return (
    <LoginPage
      reason={isLoginReason(reason) ? reason : undefined}
      nextPath={first(params.next)}
    />
  );
}
