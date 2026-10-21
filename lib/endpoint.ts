import type { paths } from "@/types/api";

/** A path in the backend's OpenAPI contract, e.g. `"/api/accounts/login/"`. */
export type ApiPath = keyof paths;

/**
 * Turns a contract path into the one the client calls: `"/api/accounts/login/"` →
 * `"/accounts/login"`. The client's base URL adds `/api`; the rewrite adds the
 * trailing slash. Only contract paths type-check, so a removed endpoint fails the build.
 */
export const endpoint = (path: ApiPath): string =>
  path.replace(/^\/api/, "").replace(/\/$/, "");
