"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ModalType } from "@/components/ui/molecules/modal/enums";
import type { ModalPropsMap, OpenModal } from "@/components/ui/molecules/modal/types";

export interface ModalContextType {
  /** The top of the stack: the modal on screen. */
  modal: OpenModal;
  addModal: <T extends ModalType>(next: { type: T; props: ModalPropsMap[T] }) => void;
  closeModal: () => void;
  closeAllModals: () => void;
}

const NO_MODAL: OpenModal = { type: ModalType.NONE, props: {} };

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [stack, setStack] = useState<OpenModal[]>([]);

  const addModal = useCallback(
    <T extends ModalType>(next: { type: T; props: ModalPropsMap[T] }) => {
      setStack((prev) => [...prev, next as OpenModal]);
    },
    [],
  );

  const closeModal = useCallback(() => {
    setStack((prev) => prev.slice(0, -1));
  }, []);

  const closeAllModals = useCallback(() => {
    setStack([]);
  }, []);

  const modal = stack.at(-1) ?? NO_MODAL;

  const value = useMemo(
    () => ({ modal, addModal, closeModal, closeAllModals }),
    [modal, addModal, closeModal, closeAllModals],
  );

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModalContext must be used within a ModalProvider");
  return context;
}
