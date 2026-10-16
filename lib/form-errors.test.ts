import { describe, expect, it, vi } from "vitest";
import { ApiError } from "@/lib/api";
import { applyApiErrorsToForm, parseApiErrors } from "@/lib/form-errors";

const drfError = (details: unknown) => new ApiError("Bad Request", 400, details);

describe("parseApiErrors", () => {
  it("splits DRF field errors from form-level errors", () => {
    expect(
      parseApiErrors(
        drfError({
          email: ["A user with this email already exists.", "Second message."],
          non_field_errors: ["Invalid email or password."],
        }),
      ),
    ).toEqual({
      fieldErrors: { email: "A user with this email already exists." },
      formErrors: ["Invalid email or password."],
    });
  });

  it("reads a DRF `detail` string as a form-level error", () => {
    expect(parseApiErrors(drfError({ detail: "Too many attempts." }))).toEqual({
      fieldErrors: {},
      formErrors: ["Too many attempts."],
    });
  });

  it("returns null for errors without a readable body", () => {
    expect(parseApiErrors(new Error("Network Error"))).toBeNull();
    expect(parseApiErrors(new ApiError("Server Error", 500, "<html>"))).toBeNull();
    expect(parseApiErrors(drfError({}))).toBeNull();
  });
});

describe("applyApiErrorsToForm", () => {
  it("sets mapped fields and returns unmapped messages as the form error", () => {
    const setError = vi.fn();
    const result = applyApiErrorsToForm(
      drfError({ is_adult_confirmed: ["Must be true."], phone: ["Unknown field."] }),
      setError,
      { is_adult_confirmed: "isAdultConfirmed" },
    );

    expect(setError).toHaveBeenCalledWith("isAdultConfirmed", {
      type: "server",
      message: "Must be true.",
    });
    expect(result).toEqual({ formError: "Unknown field." });
  });

  it("returns null so the caller can show a generic message", () => {
    expect(applyApiErrorsToForm(new Error("offline"), vi.fn(), {})).toBeNull();
  });
});
