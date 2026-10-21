"use client";

import { useCallback, useEffect, useState } from "react";

/** A flag that turns itself off after `durationMs`, e.g. for a brief confirmation. */
export function useTimedFlag(durationMs: number) {
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    if (!isOn) return;
    const timer = setTimeout(() => {
      setIsOn(false);
    }, durationMs);
    return () => {
      clearTimeout(timer);
    };
  }, [isOn, durationMs]);

  const show = useCallback(() => {
    setIsOn(true);
  }, []);

  return [isOn, show] as const;
}
