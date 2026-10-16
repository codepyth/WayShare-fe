export const authPaths = {
  login: "/login",
  register: "/register",
  /** Where a successful login lands when no safe `next` is given. */
  home: "/",
} as const;

/** Query flag the login page reads to confirm a just-created account. */
export const REGISTERED_PARAM = "registered";

export const loginAfterRegister = `${authPaths.login}?${REGISTERED_PARAM}=1`;

/** `next` if it is a same-site path, else home — blocks open redirects. */
export function safeNextPath(next: string | null | undefined): string {
  if (!next?.startsWith("/") || next.startsWith("//") || next.includes("\\")) {
    return authPaths.home;
  }
  return next;
}
