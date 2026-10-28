import { useEffect, useState, type RefObject } from "react";
import { prefersReducedMotion, useInView } from "./useInView";

/**
 * Moves to the next step every `delayMs` while the element is on screen, looping back to
 * the first. Stops for good once the visitor takes over, and never runs for people who
 * prefer reduced motion.
 */
export function useAutoAdvance(
  target: RefObject<HTMLElement | null>,
  active: number,
  count: number,
  goTo: (i: number) => void,
  delayMs = 4000,
) {
  const visible = useInView(target);
  const [stopped, setStopped] = useState(prefersReducedMotion);

  useEffect(() => {
    if (stopped || !visible) return;
    const timer = window.setTimeout(() => goTo((active + 1) % count), delayMs);
    return () => window.clearTimeout(timer);
  }, [active, count, delayMs, goTo, stopped, visible]);

  const stop = () => setStopped(true);
  // A visitor's choice stops the tour for good, then goes where they asked.
  const pick = (i: number) => {
    stop();
    goTo(i);
  };
  return { stop, pick };
}
