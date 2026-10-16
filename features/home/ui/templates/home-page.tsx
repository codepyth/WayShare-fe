import { Panel } from "@/components/ui/molecules/panel";

/** Signed-in landing page. The phase 1 ride screens will be linked from here. */
export function HomePage() {
  return (
    <div className="mx-auto w-full max-w-[1180px] px-4 pt-[30px] pb-20 sm:px-7">
      <h1 className="text-[26px] font-semibold tracking-[-0.022em]">
        Welcome to WayShare
      </h1>
      <p className="mt-1 max-w-[66ch] text-[14.5px] text-muted">
        One account. Travel as a passenger, or offer your empty seats as a driver.
      </p>
      <Panel className="mt-5">
        <p className="text-sm text-muted">
          You are logged in. Your trips and bookings will appear here.
        </p>
      </Panel>
    </div>
  );
}
