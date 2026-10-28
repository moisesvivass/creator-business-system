import { Fragment, useRef, useState } from "react";
import { ArrowRight, Check, Clock, Minus, X } from "lucide-react";
import { useCopy } from "@/content";
import { Chip } from "./Chip";
import { useAutoAdvance } from "@/hooks/useAutoAdvance";
import type { PathStep } from "@/types";

const outcomeStyle: Record<
  PathStep["outcome"],
  { icon: typeof Check; rule: string; text: string }
> = {
  yes: { icon: Check, rule: "border-accent", text: "text-ink" },
  no: { icon: X, rule: "border-ink/40", text: "text-ink" },
  skip: { icon: Minus, rule: "border-ink/15", text: "text-subtle" },
};

const storeKinds = ["store", "channel"] as const;

// One product at a time walks the four steps; the steps appear in order, then where it lands.
export function ProductPath() {
  const { productPaths, checks, stores, ui } = useCopy();
  const t = ui.stores;
  const box = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { pick } = useAutoAdvance(
    box,
    active,
    productPaths.length,
    setActive,
    11000,
  );
  const path = productPaths[active];

  return (
    <div ref={box}>
      <div className="rounded-2xl bg-surface p-6 shadow-[0_1px_0_var(--color-line)] sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="kicker mr-2 text-subtle">{t.follow}</span>
          {productPaths.map((p, i) => (
            <Chip
              key={p.product}
              pressed={i === active}
              onClick={() => pick(i)}
            >
              {p.product}
            </Chip>
          ))}
        </div>

        <ol key={path.product} className="mt-7 grid gap-5 md:grid-cols-4">
          {path.steps.map((step, i) => {
            const { icon: Icon, rule, text } = outcomeStyle[step.outcome];
            return (
              <li
                key={step.label}
                className={`step-in border-t-2 pt-3 ${rule}`}
                style={{ animationDelay: `${i * 650}ms` }}
              >
                <p className="kicker text-subtle">
                  {t.step} {i + 1}
                </p>
                <p
                  className={`mt-1 text-lg font-semibold leading-snug ${text}`}
                >
                  {step.label}
                </p>
                <p
                  className={`mt-1.5 flex gap-1.5 text-[15px] leading-snug ${text}`}
                >
                  <Icon
                    className={`mt-0.5 h-4 w-4 shrink-0 ${step.outcome === "yes" ? "text-accent" : "text-subtle"}`}
                    aria-hidden
                  />
                  {step.result}
                </p>
              </li>
            );
          })}
        </ol>

        <div
          key={`lands-${path.product}`}
          className="mt-7 grid gap-6 border-t border-ink/12 pt-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]"
        >
          <p className="step-in" style={{ animationDelay: "2700ms" }}>
            <span className="kicker text-subtle">{t.landsIn}</span>
            <span className="mt-1 block font-display text-[32px] leading-tight text-accent">
              {path.landsIn}
            </span>
          </p>
          <div>
            <p
              className="kicker step-in text-subtle"
              style={{ animationDelay: "3200ms" }}
            >
              {t.beforeOut}
            </p>
            <ul className="mt-2 grid gap-x-5 gap-y-1.5 sm:grid-cols-2">
              {checks.map((c, i) => (
                <li
                  key={c.stamp}
                  className={`step-in flex items-center gap-2 text-[15px] ${c.waits ? "font-semibold text-accent" : ""}`}
                  style={{ animationDelay: `${3500 + i * 550}ms` }}
                >
                  {c.waits ? (
                    <Clock
                      className="h-4 w-4 shrink-0 animate-pulse"
                      aria-hidden
                    />
                  ) : (
                    <Check
                      className="h-4 w-4 shrink-0 text-accent"
                      aria-hidden
                    />
                  )}
                  {c.stamp}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Both stores reach people through both channels. */}
      <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center">
        {storeKinds.map((kind, gi) => (
          <Fragment key={kind}>
            {gi === 1 && (
              <ArrowRight
                className="mx-auto hidden h-6 w-6 text-accent md:block"
                aria-hidden
              />
            )}
            <div>
              <p className="kicker text-subtle">{t.groups[kind]}</p>
              <ul className="mt-2 space-y-2">
                {stores
                  .filter((st) => st.kind === kind)
                  .map((st) => (
                    <li
                      key={st.name}
                      className="rounded-xl border border-ink/15 bg-surface px-4 py-3"
                    >
                      <p className="font-display text-[24px] leading-tight">
                        {st.name}
                      </p>
                      <p className="text-[15px] leading-snug text-subtle">
                        {st.role}
                      </p>
                    </li>
                  ))}
              </ul>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
