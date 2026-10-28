import { useEffect, useState } from "react";
import { prefersReducedMotion } from "./useInView";

/** Counts up once every `everyMs` while `running`. Stays at 0 for reduced motion. */
export function useTicker(running: boolean, everyMs: number) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!running || prefersReducedMotion()) return;
    const timer = window.setInterval(() => setTick((t) => t + 1), everyMs);
    return () => window.clearInterval(timer);
  }, [running, everyMs]);

  return tick;
}

/**
 * Milliseconds since `running` last became true or `resetKey` last changed, in steps of
 * `stepMs`; 0 while it is false.
 */
export function useElapsed(
  running: boolean,
  stepMs: number,
  resetKey: unknown,
) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    setElapsed(0);
    if (!running) return;
    if (prefersReducedMotion()) {
      setElapsed(Number.MAX_SAFE_INTEGER);
      return;
    }
    const timer = window.setInterval(
      () => setElapsed((e) => e + stepMs),
      stepMs,
    );
    return () => window.clearInterval(timer);
  }, [running, stepMs, resetKey]);

  return elapsed;
}
