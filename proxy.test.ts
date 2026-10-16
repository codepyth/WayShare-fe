// @vitest-environment node
import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { proxy } from "@/proxy";

const ORIGIN = "http://localhost:3000";

const visit = (path: string, { session = false } = {}) =>
  proxy(
    new NextRequest(`${ORIGIN}${path}`, {
      headers: session ? { cookie: "sessionid=abc" } : {},
    }),
  );

const redirectTarget = (response: Response) => response.headers.get("location");

describe("proxy (route guard)", () => {
  it("sends signed-out visitors of the home page to login", () => {
    expect(redirectTarget(visit("/"))).toBe(`${ORIGIN}/login`);
  });

  it("remembers the requested page so login can return to it", () => {
    expect(redirectTarget(visit("/trips?from=London"))).toBe(
      `${ORIGIN}/login?next=%2Ftrips%3Ffrom%3DLondon`,
    );
  });

  it.each(["/login", "/register"])("lets signed-out visitors open %s", (path) => {
    expect(redirectTarget(visit(path))).toBeNull();
  });

  it("lets signed-in visitors through to app pages", () => {
    expect(redirectTarget(visit("/", { session: true }))).toBeNull();
  });

  it.each(["/login", "/register"])("sends signed-in visitors of %s home", (path) => {
    expect(redirectTarget(visit(path, { session: true }))).toBe(`${ORIGIN}/`);
  });
});
