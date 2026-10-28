import type { ReactNode } from "react";

// A pill the visitor taps to pick one option; the picked one takes the accent.
export function Chip({
  pressed,
  onClick,
  small,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  small?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed}
      className={`shrink-0 rounded-full border py-1 font-semibold transition-colors ${
        small ? "px-3 text-[12px]" : "px-3.5 text-[15px]"
      } ${pressed ? "border-accent bg-accent-soft text-accent" : "border-ink/15 hover:border-ink/40"}`}
    >
      {children}
    </button>
  );
}
