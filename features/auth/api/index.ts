import { api } from "@/lib/api";
import { AUTH_ENDPOINTS } from "@/features/auth/api/endpoints";
import {
  loginResponseSchema,
  messageSchema,
  registeredUserSchema,
  userSchema,
  type ChangePasswordInput,
  type LoginInput,
  type RegisterInput,
} from "@/features/auth/types";

// These handle their own 401/403 instead of the global expired-session redirect.
const ownErrors = { skipSessionRedirect: true };

export const authApi = {
  register: (input: RegisterInput) =>
    api.post(AUTH_ENDPOINTS.register, registeredUserSchema, input, ownErrors),
  login: (input: LoginInput) =>
    api.post(AUTH_ENDPOINTS.login, loginResponseSchema, input, ownErrors),
  logout: () => api.post(AUTH_ENDPOINTS.logout, messageSchema, undefined, ownErrors),
  me: () => api.get(AUTH_ENDPOINTS.me, userSchema),
  changePassword: (input: ChangePasswordInput) =>
    api.post(AUTH_ENDPOINTS.changePassword, messageSchema, input),
};
