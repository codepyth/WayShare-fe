import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ApiError } from "@/lib/api";
import { renderWithProviders } from "@/tests/render";
import { RegisterForm } from "@/features/auth/ui/organisms/register-form";

const push = vi.fn();
const register = vi.fn();

vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));
vi.mock("@/features/auth/api", () => ({
  authApi: { register: (...args: unknown[]) => register(...args) as unknown },
}));

async function fillValidForm() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText("Full name"), "Ada Lovelace");
  await user.type(screen.getByLabelText("Email address"), "ada@example.com");
  await user.type(screen.getByLabelText("Password"), "correct-horse");
  await user.click(screen.getByRole("checkbox", { name: /I am 18 or over/ }));
  return user;
}

describe("RegisterForm", () => {
  beforeEach(() => {
    push.mockReset();
    register.mockReset();
  });

  it("shows every validation message and does not submit an empty form", async () => {
    renderWithProviders(<RegisterForm />);
    await userEvent.click(screen.getByRole("button", { name: "Create account" }));

    expect(await screen.findByText("Enter your full name")).toBeInTheDocument();
    expect(screen.getByText("Enter your email address")).toBeInTheDocument();
    expect(screen.getByText("Enter a password")).toBeInTheDocument();
    expect(
      screen.getByText("Confirm you are 18 or over to create an account"),
    ).toBeInTheDocument();
    expect(register).not.toHaveBeenCalled();
  });

  it("links errors and hints to their inputs for screen readers", async () => {
    renderWithProviders(<RegisterForm />);
    await userEvent.click(screen.getByRole("button", { name: "Create account" }));

    const name = await screen.findByLabelText("Full name");
    expect(name).toHaveAttribute("aria-invalid", "true");
    expect(name).toHaveAccessibleDescription("Enter your full name");
    expect(screen.getByLabelText("Password")).toHaveAccessibleDescription(
      "At least 8 characters, not only numbers. Enter a password",
    );
  });

  it("sends the API body and goes to log in on success", async () => {
    register.mockResolvedValue({
      id: "1",
      name: "Ada Lovelace",
      email: "ada@example.com",
    });
    renderWithProviders(<RegisterForm />);
    const user = await fillValidForm();
    await user.click(screen.getByRole("button", { name: "Create account" }));

    await vi.waitFor(() => {
      expect(push).toHaveBeenCalledWith("/login?registered=1");
    });
    expect(register.mock.calls[0]?.[0]).toEqual({
      name: "Ada Lovelace",
      email: "ada@example.com",
      password: "correct-horse",
      is_adult_confirmed: true,
    });
  });

  it("puts a server field error on its input", async () => {
    register.mockRejectedValue(
      new ApiError("Bad Request", 400, {
        email: ["A user with this email already exists."],
      }),
    );
    renderWithProviders(<RegisterForm />);
    const user = await fillValidForm();
    await user.click(screen.getByRole("button", { name: "Create account" }));

    expect(
      await screen.findByText("A user with this email already exists."),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Email address")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(push).not.toHaveBeenCalled();
  });

  it("shows a generic alert when the server cannot be reached", async () => {
    register.mockRejectedValue(new ApiError("Network Error", 0));
    renderWithProviders(<RegisterForm />);
    const user = await fillValidForm();
    await user.click(screen.getByRole("button", { name: "Create account" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/Something went wrong/);
  });
});
