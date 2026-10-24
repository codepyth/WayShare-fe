import { endpoint } from "@/lib/endpoint";

/** Auth endpoints, checked against the backend contract (`types/api.ts`). */
export const AUTH_ENDPOINTS = {
  register: endpoint("/api/accounts/register/"),
  login: endpoint("/api/accounts/login/"),
  logout: endpoint("/api/accounts/logout/"),
  me: endpoint("/api/accounts/me/"),
  changePassword: endpoint("/api/accounts/change-password/"),
  passwordReset: endpoint("/api/accounts/password-reset/"),
  passwordResetConfirm: endpoint("/api/accounts/password-reset/confirm/"),
} as const;
