import { createPageMetadata } from "@/lib/seo";
import { HomePage } from "@/features/home/ui/templates/home-page";

// Behind login (see proxy.ts), so never indexed.
export const metadata = createPageMetadata({ path: "/", noIndex: true });

export default function Page() {
  return <HomePage />;
}
