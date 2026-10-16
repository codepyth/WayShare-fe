import { z } from "zod";
import type { components } from "@/types/api";

type Schemas = components["schemas"];

/** Request bodies, generated from the backend's OpenAPI schema (`npm run api:types`). */
export type RegisterInput = Omit<Schemas["Register"], "id">;
export type LoginInput = Schemas["UserLogin"];

// Responses follow the backend serializers; the OpenAPI schema mislabels them.

const timestamp = z.string().nullable();

/** `UserSerializer` */
export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  driver_enabled: z.boolean(),
  phone_verified_at: timestamp,
  licence_checked_at: timestamp,
  id_verified_at: timestamp,
  last_login: timestamp,
});

/** `RegisterSerializer` output (201). */
export const registeredUserSchema = userSchema.pick({
  id: true,
  name: true,
  email: true,
});

/** Login (200); also sets the `sessionid` and `csrftoken` cookies. */
export const loginResponseSchema = z.object({
  user: userSchema,
  csrf_token: z.string(),
});

export const logoutResponseSchema = z.object({ message: z.string() });

export type User = z.infer<typeof userSchema>;
export type RegisteredUser = z.infer<typeof registeredUserSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
