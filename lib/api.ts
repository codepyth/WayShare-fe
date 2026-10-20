import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import type { ZodType } from "zod";
import { CSRF_COOKIE } from "@/lib/cookies";
import { API_TIMEOUT_MS } from "@/lib/timeouts";

/** API failure: HTTP status plus the parsed error body. */
export class ApiError extends Error {
  readonly status: number;
  readonly details: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

// DRF's NotAuthenticated message; session auth answers 403 with it, not 401.
const NOT_AUTHENTICATED = "Authentication credentials were not provided.";

/** True when the API says the session is missing or expired. */
export function isUnauthenticated(error: unknown): boolean {
  if (!(error instanceof ApiError)) return false;
  if (error.status === 401) return true;
  const detail = (error.details as { detail?: unknown } | undefined)?.detail;
  return error.status === 403 && detail === NOT_AUTHENTICATED;
}

let unauthenticatedHandler: (() => void) | undefined;

/** Called when a request finds the session gone; auth endpoints are excluded. */
export function setUnauthenticatedHandler(handler: (() => void) | undefined) {
  unauthenticatedHandler = handler;
}

/** Same-origin; `next.config.ts` rewrites `/api/*` to Django. */
export const httpClient = axios.create({
  baseURL: "/api",
  timeout: API_TIMEOUT_MS,
  headers: { "Content-Type": "application/json" },
  xsrfCookieName: CSRF_COOKIE,
  xsrfHeaderName: "X-CSRFToken",
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const apiError = new ApiError(
      error.message,
      error.response?.status ?? 0,
      error.response?.data,
    );
    const isAuthEndpoint = error.config?.url?.startsWith("/accounts/") ?? false;
    if (!isAuthEndpoint && isUnauthenticated(apiError)) unauthenticatedHandler?.();
    return Promise.reject(apiError);
  },
);

async function request<T>(schema: ZodType<T>, requestConfig: AxiosRequestConfig) {
  const response = await httpClient.request<unknown>(requestConfig);
  return schema.parse(response.data);
}

/** Typed client: every response is validated against its Zod schema. */
export const api = {
  get: <T>(url: string, schema: ZodType<T>, requestConfig?: AxiosRequestConfig) =>
    request(schema, { ...requestConfig, method: "GET", url }),
  post: <T>(
    url: string,
    schema: ZodType<T>,
    data?: unknown,
    requestConfig?: AxiosRequestConfig,
  ) => request(schema, { ...requestConfig, method: "POST", url, data }),
};
