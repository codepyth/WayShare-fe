import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { authPaths } from "@/features/auth/lib/paths";
import { ResetPasswordPage } from "@/features/auth/ui/templates/reset-password-page";

export const metadata: Metadata = {
  ...createPageMetadata({
    path: authPaths.resetPassword,
    title: "Choose a new password",
    noIndex: true,
  }),
  // The URL carries a one-time token; never send it on as a Referer.
  referrer: "no-referrer",
};

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function Page({ searchParams }: PageProps<"/reset-password">) {
  const params = await searchParams;
  const uid = first(params.uid);
  const token = first(params.token);

  return <ResetPasswordPage link={uid && token ? { uid, token } : undefined} />;
}
