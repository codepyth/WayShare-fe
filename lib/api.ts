import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import type { ZodType } from "zod";
import { CSRF_COOKIE } from "@/lib/cookies";

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

/** Same-origin; `next.config.ts` rewrites `/api/*` to Django. */
export const httpClient = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
  xsrfCookieName: CSRF_COOKIE,
  xsrfHeaderName: "X-CSRFToken",
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status ?? 0;
    return Promise.reject(new ApiError(error.message, status, error.response?.data));
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
