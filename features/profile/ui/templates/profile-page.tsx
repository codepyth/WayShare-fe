import { PageContainer } from "@/components/shell/page-container";
import { PageHeader } from "@/components/ui/molecules/page-header";
import { ProfileSummary } from "@/features/profile/ui/organisms/profile-summary";
import { SecurityPanel } from "@/features/profile/ui/organisms/security-panel";

export function ProfilePage() {
  return (
    <PageContainer width="narrow">
      <PageHeader title="Your profile" lede="Your account and how you log in." />
      <ProfileSummary />
      <SecurityPanel />
    </PageContainer>
  );
}
