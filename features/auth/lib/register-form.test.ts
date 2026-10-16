import { describe, expect, it } from "vitest";
import {
  registerDefaultValues,
  registerFormSchema,
  toRegisterInput,
} from "@/features/auth/lib/register-form";

const valid = {
  name: "  Ada Lovelace ",
  email: " ada@example.com ",
  password: "correct-horse",
  isAdultConfirmed: true,
};

const messagesFor = (values: unknown) => {
  const result = registerFormSchema.safeParse(values);
  return result.success
    ? {}
    : Object.fromEntries(
        result.error.issues.map((issue) => [issue.path.join("."), issue.message]),
      );
};

describe("registerFormSchema", () => {
  it("accepts valid values and trims text", () => {
    expect(registerFormSchema.parse(valid)).toMatchObject({
      name: "Ada Lovelace",
      email: "ada@example.com",
    });
  });

  it("requires every field, including the 18+ confirmation", () => {
    expect(messagesFor(registerDefaultValues)).toEqual({
      name: "Enter your full name",
      email: "Enter your email address",
      password: "Enter a password",
      isAdultConfirmed: "Confirm you are 18 or over to create an account",
    });
  });

  it("mirrors Django's password length and numeric rules", () => {
    expect(messagesFor({ ...valid, password: "short" }).password).toBe(
      "Password must be at least 8 characters",
    );
    expect(messagesFor({ ...valid, password: "12345678" }).password).toBe(
      "Password cannot be only numbers",
    );
  });

  it("rejects a malformed email", () => {
    expect(messagesFor({ ...valid, email: "ada@" }).email).toMatch(/correct format/);
  });
});

describe("toRegisterInput", () => {
  it("maps to the API's snake_case body", () => {
    expect(toRegisterInput(registerFormSchema.parse(valid))).toEqual({
      name: "Ada Lovelace",
      email: "ada@example.com",
      password: "correct-horse",
      is_adult_confirmed: true,
    });
  });
});
