import { describe, expect, it } from "vitest";
import { loginResponseSchema, registeredUserSchema } from "@/features/auth/types";

const user = {
  id: "0b6f7c2e-8d3a-4f1e-9c5b-2a1d3e4f5a6b",
  name: "Ada Lovelace",
  email: "ada@example.com",
  phone: "",
  driver_enabled: false,
  phone_verified_at: null,
  licence_checked_at: null,
  id_verified_at: null,
  last_login: "2026-10-16T08:30:00Z",
};

describe("auth response schemas", () => {
  it("parses the login response the backend sends", () => {
    expect(loginResponseSchema.parse({ user, csrf_token: "token" }).user).toEqual(user);
  });

  it("parses the register response (no password or 18+ flag echoed)", () => {
    expect(
      registeredUserSchema.parse({ id: user.id, name: user.name, email: user.email }),
    ).toEqual({ id: user.id, name: user.name, email: user.email });
  });

  it("rejects a response missing required fields", () => {
    expect(() => loginResponseSchema.parse({ user: { id: "1" } })).toThrow();
  });
});
