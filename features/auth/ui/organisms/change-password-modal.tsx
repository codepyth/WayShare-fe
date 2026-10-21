"use client";

import { Modal } from "@/components/ui/molecules/modal/modal";
import type { ModalPropsMap } from "@/components/ui/molecules/modal/types";
import type { ModalType } from "@/components/ui/molecules/modal/enums";
import { ChangePasswordForm } from "@/features/auth/ui/organisms/change-password-form";

export type ChangePasswordModalProps = ModalPropsMap[ModalType.CHANGE_PASSWORD] & {
  onClose: () => void;
};

export function ChangePasswordModal({ onSuccess, onClose }: ChangePasswordModalProps) {
  return (
    <Modal title="Change password" onClose={onClose}>
      <ChangePasswordForm
        onSuccess={() => {
          onSuccess?.();
          onClose();
        }}
        onCancel={onClose}
      />
    </Modal>
  );
}
