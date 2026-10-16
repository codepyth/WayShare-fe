import { createPageMetadata } from "@/lib/seo";
import { REGISTERED_PARAM } from "@/features/auth/lib/paths";
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

  return (
    <LoginPage
      justRegistered={first(params[REGISTERED_PARAM]) === "1"}
      nextPath={first(params.next)}
    />
  );
}
