import { useEffect, useState, type RefObject } from "react";

/** True while at least `threshold` of the element is on screen. */
export function useInView(
  target: RefObject<HTMLElement | null>,
  threshold = 0.5,
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = target.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, threshold]);

  return inView;
}

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
