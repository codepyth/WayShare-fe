"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { XIcon } from "@/components/assets/svgs/components";
import { cn } from "@/lib/cn";

export interface ModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
  /** Width and other panel overrides, e.g. `max-w-[600px]`. */
  className?: string;
}

/**
 * Native `<dialog>` opened with `showModal()`: the browser traps focus and makes the
 * page behind inert. Closes on Esc, a backdrop click or the × button.
 */
export function Modal({ title, onClose, children, className }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const opener = document.activeElement as HTMLElement | null;
    if (!dialog.open) dialog.showModal();
    return () => {
      dialog.close();
      opener?.focus();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className={cn(
        "m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[470px] overflow-hidden rounded-panel border border-line bg-surface p-0 text-ink shadow-md backdrop:bg-black/40 backdrop:backdrop-blur-sm",
        className,
      )}
    >
      <div className="flex max-h-[inherit] flex-col">
        <header className="flex items-center justify-between gap-3 border-b border-line-2 px-5 py-3.5">
          <h2 id={titleId} className="text-[17px] font-semibold tracking-[-0.01em]">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex size-8 cursor-pointer items-center justify-center rounded-field text-muted hover:bg-surface-3 hover:text-ink"
          >
            <XIcon />
          </button>
        </header>
        <div className="min-h-0 overflow-y-auto p-5">{children}</div>
      </div>
    </dialog>
  );
}
