import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ApiError } from "@/lib/api";
import { renderWithProviders } from "@/tests/render";
import { authKeys } from "@/features/auth/hooks/queries";
import { LoginForm } from "@/features/auth/ui/organisms/login-form";

const replace = vi.fn();
const refresh = vi.fn();
const login = vi.fn();

vi.mock("next/navigation", () => ({ useRouter: () => ({ replace, refresh }) }));
vi.mock("@/features/auth/api", () => ({
  authApi: { login: (...args: unknown[]) => login(...args) as unknown },
}));

const user = { id: "1", name: "Ada Lovelace", email: "ada@example.com" };

async function submit() {
  const actor = userEvent.setup();
  await actor.type(screen.getByLabelText("Email address"), "ada@example.com");
  await actor.type(screen.getByLabelText("Password"), "correct-horse");
  await actor.click(screen.getByRole("button", { name: "Log in" }));
}

describe("LoginForm", () => {
  beforeEach(() => {
    replace.mockReset();
    refresh.mockReset();
    login.mockReset();
  });

  it("requires email and password", async () => {
    renderWithProviders(<LoginForm />);
    await userEvent.click(screen.getByRole("button", { name: "Log in" }));

    expect(await screen.findByText("Enter your email address")).toBeInTheDocument();
    expect(screen.getByText("Enter your password")).toBeInTheDocument();
    expect(login).not.toHaveBeenCalled();
  });

  it("caches the user and returns to the requested page", async () => {
    login.mockResolvedValue({ user, csrf_token: "token" });
    const { queryClient } = renderWithProviders(<LoginForm nextPath="/trips" />);
    await submit();

    await vi.waitFor(() => {
      expect(replace).toHaveBeenCalledWith("/trips");
    });
    expect(queryClient.getQueryData(authKeys.user())).toEqual(user);
  });

  it("ignores an off-site next path", async () => {
    login.mockResolvedValue({ user, csrf_token: "token" });
    renderWithProviders(<LoginForm nextPath="https://evil.example" />);
    await submit();

    await vi.waitFor(() => {
      expect(replace).toHaveBeenCalledWith("/");
    });
  });

  it("shows the generic credentials error from the server as an alert", async () => {
    login.mockRejectedValue(
      new ApiError("Bad Request", 400, {
        non_field_errors: ["Invalid email or password."],
      }),
    );
    renderWithProviders(<LoginForm />);
    await submit();

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Invalid email or password.",
    );
    expect(replace).not.toHaveBeenCalled();
  });

  it("lets the password be shown and hidden", async () => {
    renderWithProviders(<LoginForm />);
    const password = screen.getByLabelText("Password");
    expect(password).toHaveAttribute("type", "password");

    await userEvent.click(screen.getByRole("button", { name: "Show password" }));
    expect(password).toHaveAttribute("type", "text");
    expect(screen.getByRole("button", { name: "Hide password" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});
