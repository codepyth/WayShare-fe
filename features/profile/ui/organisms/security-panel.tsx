"use client";

import { Button } from "@/components/ui/atoms/button";
import { ModalType } from "@/components/ui/molecules/modal/enums";
import { Notice } from "@/components/ui/molecules/notice";
import { Panel } from "@/components/ui/molecules/panel";
import { useModalContext } from "@/contexts/modal-context";
import { useTimedFlag } from "@/hooks/useTimedFlag";

const CONFIRMATION_MS = 5_000;

/** Password settings; the change itself happens in a modal. */
export function SecurityPanel() {
  const { addModal } = useModalContext();
  const [changed, showChanged] = useTimedFlag(CONFIRMATION_MS);

  const openChangePassword = () => {
    addModal({ type: ModalType.CHANGE_PASSWORD, props: { onSuccess: showChanged } });
  };

  return (
    <Panel title="Password">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted">
            Change the password you use to log in. You will stay logged in.
          </p>
          <Button variant="secondary" onClick={openChangePassword}>
            Change password
          </Button>
        </div>
        {changed && <Notice tone="good" role="status" title="Password changed." />}
      </div>
    </Panel>
  );
}
