import { useRef } from "react";
import { Send } from "lucide-react";
import { useCopy } from "@/content";
import { clockLabel, useDayClock } from "@/hooks/useDayClock";
import { PhoneFrame } from "./PhoneFrame";
import { Section } from "./Section";

const pct = (hour: number) => `${(hour / 24) * 100}%`;
const ROW = "h-14";

// A job's marks on the day: a fine comb for the 15-minute check, a dot for each fixed run.
function Track({
  at,
  everyMinutes,
  onEvent,
  hour,
}: {
  at: number[];
  everyMinutes?: number;
  onEvent?: boolean;
  hour: number;
}) {
  if (everyMinutes) {
    const comb = (color: string) => ({
      backgroundImage: `linear-gradient(to right, ${color} 1.5px, transparent 1.5px)`,
      backgroundSize: `${(everyMinutes / (24 * 60)) * 100}% 100%`,
    });
    return (
      <div className="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2">
        <div
          className="absolute inset-0"
          style={comb("color-mix(in srgb, var(--color-ink) 18%, transparent)")}
        />
        <div
          className="absolute inset-0"
          style={{
            ...comb("var(--color-accent)"),
            clipPath: `inset(0 ${100 - (hour / 24) * 100}% 0 0)`,
          }}
        />
      </div>
    );
  }
  return (
    <>
      {at.map((t) => {
        const done = hour >= t;
        const firing = done && hour - t < 0.75;
        return (
          <span
            key={t}
            className={`absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-300 ${
              done
                ? "border-accent bg-accent"
                : onEvent
                  ? "border-ink/30 bg-canvas"
                  : "border-ink/20 bg-ink/20"
            } ${firing ? "scale-125 ring-4 ring-accent/25" : ""}`}
            style={{ left: pct(t) }}
          />
        );
      })}
    </>
  );
}

export function JobsAndAlerts() {
  const { jobs, alerts, ui } = useCopy();
  const t = ui.jobs;
  const box = useRef<HTMLDivElement>(null);
  const hour = useDayClock(box);
  const arrived = alerts.filter((a) => hour >= a.at).reverse();

  return (
    <Section
      id="jobs"
      number="05"
      kicker={t.kicker}
      title={t.title}
      intro={t.intro}
    >
      <div
        ref={box}
        className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-center"
      >
        <div>
          <p className="kicker text-subtle">{t.dayLabel}</p>
          <div className="mt-8 flex">
            <ul className="w-36 shrink-0 sm:w-44">
              {jobs.map((j) => (
                <li
                  key={j.name}
                  className={`${ROW} flex flex-col justify-center border-b border-ink/10 pr-3`}
                >
                  <span className="text-[15px] leading-tight font-semibold">
                    {j.name}
                  </span>
                  <span className="text-[13px] text-subtle">{j.when}</span>
                </li>
              ))}
            </ul>
            <div className="relative min-w-0 flex-1">
              {jobs.map((j) => (
                <div
                  key={j.name}
                  className={`${ROW} relative border-b border-ink/10`}
                >
                  <span
                    className="absolute inset-x-0 top-1/2 h-px bg-ink/10"
                    aria-hidden
                  />
                  <Track
                    at={j.at}
                    everyMinutes={j.everyMinutes}
                    onEvent={j.onEvent}
                    hour={hour}
                  />
                </div>
              ))}
              <div className="relative h-7" aria-hidden>
                {[0, 6, 12, 18, 24].map((h) => (
                  <span
                    key={h}
                    className="absolute top-2 -translate-x-1/2 font-mono text-[11px] text-subtle"
                    style={{ left: pct(h) }}
                  >
                    {h}:00
                  </span>
                ))}
              </div>
              {/* The "now" needle across every row. */}
              <div
                className="pointer-events-none absolute top-0 bottom-7 w-0.5 bg-ink"
                style={{ left: pct(hour) }}
                aria-hidden
              >
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full bg-ink px-2 py-0.5 font-mono text-[11px] text-white">
                  {clockLabel(hour)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto w-[300px]">
          <PhoneFrame>
            <div
              className="flex h-[520px] flex-col px-4 pt-6"
              aria-live="polite"
            >
              <p className="text-center font-display text-[64px] leading-none tabular-nums">
                {clockLabel(hour)}
              </p>
              <p className="mt-1 text-center text-[14px] text-subtle">
                {t.day}
              </p>
              <ul className="mt-6 space-y-2.5 overflow-hidden">
                {arrived.length === 0 && (
                  <li className="pt-10 text-center text-[14px] text-subtle">
                    {t.nothingYet}
                  </li>
                )}
                {arrived.map((a) => (
                  <li
                    key={a.title}
                    className="step-in rounded-2xl bg-canvas px-3.5 py-3 shadow-sm"
                  >
                    <p className="flex items-center justify-between text-[12px] text-subtle">
                      <span className="flex items-center gap-1.5">
                        <span className="rounded-md bg-accent p-1 text-white">
                          <Send className="h-2.5 w-2.5" aria-hidden />
                        </span>
                        Telegram
                      </span>
                      {clockLabel(a.at)}
                    </p>
                    <p className="mt-1.5 text-[15px] leading-tight font-semibold">
                      {a.title}
                    </p>
                    <p className="mt-0.5 text-[13px] leading-snug text-subtle">
                      {a.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </PhoneFrame>
        </div>
      </div>
    </Section>
  );
}
