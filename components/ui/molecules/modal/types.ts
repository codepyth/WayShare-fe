import type { ModalType } from "./enums";

/** Props each modal is opened with; `onClose` is added by the manager. */
export interface ModalPropsMap {
  [ModalType.NONE]: Record<string, never>;
  [ModalType.CHANGE_PASSWORD]: { onSuccess?: () => void };
}

export type OpenModal = {
  [T in ModalType]: { type: T; props: ModalPropsMap[T] };
}[ModalType];
