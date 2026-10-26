import { cookies } from "next/headers";
import Link from "next/link";
import { Wordmark } from "@/components/ui/atoms/wordmark";
import { SESSION_COOKIE } from "@/lib/cookies";
import { AccountNav } from "@/components/shell/account-nav";

export async function TopBar() {
  const isSignedIn = (await cookies()).has(SESSION_COOKIE);

  return (
    <header className="flex-none bg-bar">
      <nav
        aria-label="Main"
        className="mx-auto flex min-h-[58px] max-w-[1180px] items-center justify-between gap-6 px-4 sm:px-7"
      >
        <Link
          href="/"
          className="text-bar-fg focus-visible:outline-bar-fg"
          aria-label="WayShare home"
        >
          <Wordmark />
        </Link>
        {isSignedIn && <AccountNav />}
      </nav>
    </header>
  );
}
