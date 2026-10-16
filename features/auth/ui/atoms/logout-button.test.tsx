import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ApiError } from "@/lib/api";
import { renderWithProviders } from "@/tests/render";
import { authKeys } from "@/features/auth/hooks/queries";
import { LogoutButton } from "@/features/auth/ui/atoms/logout-button";

const replace = vi.fn();
const refresh = vi.fn();
const logout = vi.fn();
const clearSessionCookies = vi.fn();

vi.mock("next/navigation", () => ({ useRouter: () => ({ replace, refresh }) }));
vi.mock("@/features/auth/api", () => ({
  authApi: { logout: () => logout() as unknown },
}));
vi.mock("@/features/auth/api/clear-session", () => ({
  clearSessionCookies: () => clearSessionCookies() as unknown,
}));

describe("LogoutButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    clearSessionCookies.mockResolvedValue(undefined);
  });

  it("logs out, clears cached data and goes to login", async () => {
    logout.mockResolvedValue({ message: "Logged out successfully" });
    const { queryClient } = renderWithProviders(<LogoutButton />);
    queryClient.setQueryData(authKeys.user(), { id: "1" });

    await userEvent.click(screen.getByRole("button", { name: "Log out" }));

    await vi.waitFor(() => {
      expect(replace).toHaveBeenCalledWith("/login");
    });
    expect(clearSessionCookies).toHaveBeenCalledOnce();
    expect(queryClient.getQueryData(authKeys.user())).toBeUndefined();
  });

  it("still clears the session when the API rejects the logout", async () => {
    logout.mockRejectedValue(new ApiError("Forbidden", 403));
    renderWithProviders(<LogoutButton />);

    await userEvent.click(screen.getByRole("button", { name: "Log out" }));

    await vi.waitFor(() => {
      expect(replace).toHaveBeenCalledWith("/login");
    });
    expect(clearSessionCookies).toHaveBeenCalledOnce();
  });
});
