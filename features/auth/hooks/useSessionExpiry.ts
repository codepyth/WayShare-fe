"use client";

import { useEffect, useRef } from "react";
import { setUnauthenticatedHandler } from "@/lib/api";
import { useEndSession } from "@/features/auth/hooks/useEndSession";

/** Sends people to login, with a notice, when any API call finds the session gone. */
export function useSessionExpiry() {
  const endSession = useEndSession();
  const ending = useRef(false);

  useEffect(() => {
    setUnauthenticatedHandler(() => {
      // Several requests can fail at once; end the session only once.
      if (ending.current) return;
      ending.current = true;
      const { pathname, search } = window.location;
      void endSession({ reason: "expired", requested: `${pathname}${search}` }).finally(
        () => {
          ending.current = false;
        },
      );
    });
    return () => {
      setUnauthenticatedHandler(undefined);
    };
  }, [endSession]);
}
