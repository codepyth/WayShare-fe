"use client";

import type { ReactNode } from "react";
import { useModalContext } from "@/contexts/modal-context";
import { ChangePasswordModal } from "@/features/auth/ui/organisms/change-password-modal";
import { ModalType } from "./enums";
import type { ModalPropsMap } from "./types";

type ModalRenderers = {
  [T in Exclude<ModalType, ModalType.NONE>]: (
    props: ModalPropsMap[T],
    onClose: () => void,
  ) => ReactNode;
};

/** One entry per modal type; add a modal here and in `enums.ts` / `types.ts`. */
const MODALS: ModalRenderers = {
  [ModalType.CHANGE_PASSWORD]: (props, onClose) => (
    <ChangePasswordModal {...props} onClose={onClose} />
  ),
};

/** Renders the modal on top of the stack, if any. */
export function ModalManager() {
  const { modal, closeModal } = useModalContext();
  if (modal.type === ModalType.NONE) return null;

  const render = MODALS[modal.type] as (
    props: unknown,
    onClose: () => void,
  ) => ReactNode;
  return render(modal.props, closeModal);
}
