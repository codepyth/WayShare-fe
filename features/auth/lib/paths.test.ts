import { describe, expect, it } from "vitest";
import { authPaths, safeNextPath } from "@/features/auth/lib/paths";

describe("safeNextPath", () => {
  it("keeps same-site paths", () => {
    expect(safeNextPath("/trips?from=London")).toBe("/trips?from=London");
  });

  it.each([
    undefined,
    null,
    "",
    "trips",
    "https://evil.example",
    "//evil.example",
    "/\\evil.example",
  ])("falls back to home for %s", (next) => {
    expect(safeNextPath(next)).toBe(authPaths.home);
  });
});
