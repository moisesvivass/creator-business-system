import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  number: string;
  kicker: string;
  title: string;
  intro?: string;
  /** Fade the content block as one as it scrolls away; off when the content fades its own parts. */
  fadeContent?: boolean;
  children: ReactNode;
}

// One chapter of the feature: big number on the left, the text beside it, the content under the text.
export function Section({
  id,
  number,
  kicker,
  title,
  intro,
  fadeContent = true,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-16 border-b border-ink/12 py-20 sm:py-24 lg:grid lg:grid-cols-[170px_minmax(0,1fr)_220px] lg:gap-x-10"
    >
      <p className="scroll-fade font-display text-7xl leading-[0.8] text-accent sm:text-[120px]">
        {number}
      </p>
      <div className="scroll-fade mt-8 lg:col-span-2 lg:mt-0">
        <p className="kicker text-accent">{kicker}</p>
        <h2 className="mt-3 font-display text-[44px] leading-[1.02] tracking-[-0.01em] sm:text-[56px]">
          {title}
        </h2>
        {intro && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed">{intro}</p>
        )}
      </div>
      <div
        className={`mt-12 min-w-0 lg:col-span-2 lg:col-start-2 ${fadeContent ? "scroll-fade" : ""}`}
      >
        {children}
      </div>
    </section>
  );
}
