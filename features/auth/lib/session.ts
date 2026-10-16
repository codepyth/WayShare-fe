import { authPaths } from "@/features/auth/lib/paths";

/** Pages for signed-out people; everything else needs a session. */
const GUEST_ONLY_PATHS: readonly string[] = [authPaths.login, authPaths.register];

export const isGuestOnlyPath = (pathname: string) =>
  GUEST_ONLY_PATHS.includes(pathname);

/** `/login`, with `?next=` so login can return to the requested page. */
export function loginRedirectPath(pathname: string, search: string): string {
  const requested = `${pathname}${search}`;
  if (requested === authPaths.home) return authPaths.login;
  return `${authPaths.login}?${new URLSearchParams({ next: requested }).toString()}`;
}
