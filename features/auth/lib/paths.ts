export const authPaths = {
  login: "/login",
  register: "/register",
  /** Where a successful login lands when no safe `next` is given. */
  home: "/",
} as const;

/** Why login was opened; the login page shows a matching notice. */
export const LOGIN_REASONS = ["registered", "expired"] as const;
export type LoginReason = (typeof LOGIN_REASONS)[number];

export const isLoginReason = (value: unknown): value is LoginReason =>
  LOGIN_REASONS.some((reason) => reason === value);

/** `/login`, with `?next=` to return to `requested` and an optional `?reason=`. */
export function loginPath({
  requested,
  reason,
}: { requested?: string; reason?: LoginReason } = {}): string {
  const params = new URLSearchParams();
  if (requested && requested !== authPaths.home) params.set("next", requested);
  if (reason) params.set("reason", reason);
  const query = params.toString();
  return query ? `${authPaths.login}?${query}` : authPaths.login;
}

/** `next` if it is a same-site path, else home — blocks open redirects. */
export function safeNextPath(next: string | null | undefined): string {
  if (!next?.startsWith("/") || next.startsWith("//") || next.includes("\\")) {
    return authPaths.home;
  }
  return next;
}
