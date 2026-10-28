import type { ReactNode } from "react";

// A plain phone body: black bezel, notch, white screen. The screen content is the caller's.
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[44px] bg-ink p-3 shadow-[0_30px_60px_-30px_rgba(20,20,20,0.6)]">
      <div className="relative overflow-hidden rounded-[34px] bg-surface">
        <div
          className="mx-auto mt-2.5 h-6 w-24 rounded-full bg-ink"
          aria-hidden
        />
        {children}
      </div>
    </div>
  );
}
