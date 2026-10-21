import { PageContainer } from "@/components/shell/page-container";
import { PageHeader } from "@/components/ui/molecules/page-header";
import { Panel } from "@/components/ui/molecules/panel";

/** Signed-in landing page. The phase 1 ride screens will be linked from here. */
export function HomePage() {
  return (
    <PageContainer>
      <PageHeader
        title="Welcome to WayShare"
        lede="One account. Travel as a passenger, or offer your empty seats as a driver."
      />
      <Panel>
        <p className="text-sm text-muted">
          You are logged in. Your trips and bookings will appear here.
        </p>
      </Panel>
    </PageContainer>
  );
}
