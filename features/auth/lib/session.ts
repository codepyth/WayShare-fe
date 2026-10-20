import { authPaths } from "@/features/auth/lib/paths";

/** Pages for signed-out people; everything else needs a session. */
const GUEST_ONLY_PATHS: readonly string[] = [authPaths.login, authPaths.register];

export const isGuestOnlyPath = (pathname: string) =>
  GUEST_ONLY_PATHS.includes(pathname);
