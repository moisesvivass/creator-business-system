import { useEffect, useState, type RefObject } from "react";
import { prefersReducedMotion, useInView } from "./useInView";

const TICK_MS = 50;
const HOLD_SECONDS = 2.5;
const START_AT = 8.5;
const SECONDS_PER_HOUR = 1;

/**
 * An hour of the day that runs from `START_AT` to midnight, `SECONDS_PER_HOUR` per hour, while
 * the element is on screen. It holds at midnight for a moment, then starts again from
 * `START_AT`, skipping the quiet night. Reduced motion shows the finished day.
 */
export function useDayClock(target: RefObject<HTMLElement | null>) {
  const visible = useInView(target, 0.3);
  const [reduced] = useState(prefersReducedMotion);
  // Runs past 24 by the length of the hold, so the pause needs no extra state.
  const [hour, setHour] = useState(reduced ? 24 : START_AT);

  useEffect(() => {
    if (!visible || reduced) return;
    const hoursPerTick = TICK_MS / (SECONDS_PER_HOUR * 1000);
    const end = 24 + HOLD_SECONDS / SECONDS_PER_HOUR;
    const timer = window.setInterval(
      () => setHour((h) => (h >= end ? START_AT : h + hoursPerTick)),
      TICK_MS,
    );
    return () => window.clearInterval(timer);
  }, [visible, reduced]);

  return Math.min(hour, 24);
}

export const clockLabel = (hour: number) => {
  const h = Math.floor(hour) % 24;
  const m = Math.floor((hour - Math.floor(hour)) * 60);
  return `${h}:${String(m).padStart(2, "0")}`;
};
