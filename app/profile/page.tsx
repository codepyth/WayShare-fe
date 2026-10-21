import { createPageMetadata } from "@/lib/seo";
import { profilePaths } from "@/features/profile/lib/paths";
import { ProfilePage } from "@/features/profile/ui/templates/profile-page";

export const metadata = createPageMetadata({
  path: profilePaths.profile,
  title: "Your profile",
  noIndex: true,
});

export default function Page() {
  return <ProfilePage />;
}
