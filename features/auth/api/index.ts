import { api } from "@/lib/api";
import {
  loginResponseSchema,
  logoutResponseSchema,
  registeredUserSchema,
  type LoginInput,
  type RegisterInput,
} from "@/features/auth/types";

// No trailing slash: the `/api` rewrite adds the one Django expects.
export const authApi = {
  register: (data: RegisterInput) =>
    api.post("/accounts/register", registeredUserSchema, data),
  login: (data: LoginInput) => api.post("/accounts/login", loginResponseSchema, data),
  logout: () => api.post("/accounts/logout", logoutResponseSchema),
};
