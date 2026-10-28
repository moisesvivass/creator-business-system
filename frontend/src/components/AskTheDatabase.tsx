import { useMemo, useRef } from "react";
import { ArrowUp } from "lucide-react";
import { useCopy } from "@/content";
import { Chip } from "./Chip";
import { useChatPlayback } from "@/hooks/useChatPlayback";
import type { AskExample } from "@/types";
import { PhoneFrame } from "./PhoneFrame";

const joinList = (names: string[], and: string) =>
  names.length < 2
    ? names.join("")
    : `${names.slice(0, -1).join(", ")} ${and} ${names[names.length - 1]}`;

function Question({ text }: { text: string }) {
  return (
    <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-ink px-3.5 py-2 text-white">
      {text}
    </p>
  );
}

function Sparkline({ label, values }: NonNullable<AskExample["trend"]>) {
  const max = Math.max(...values);
  const points = values
    .map((v, i) => `${(i / (values.length - 1)) * 100},${30 - (v / max) * 28}`)
    .join(" ");
  return (
    <figure className="mt-2.5 rounded-lg bg-surface px-3 pt-2 pb-1.5">
      <svg
        viewBox="0 0 100 32"
        className="h-10 w-full"
        preserveAspectRatio="none"
        aria-hidden
      >
        <polyline
          points={points}
          fill="none"
          className="stroke-accent"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <figcaption className="text-[11px] text-subtle">{label}</figcaption>
    </figure>
  );
}

function Answer({
  ex,
  text,
  complete,
}: {
  ex: AskExample;
  text: string;
  complete: boolean;
}) {
  return (
    <div className="max-w-[94%] rounded-2xl rounded-bl-sm bg-canvas px-3.5 py-2.5">
      <p>{text}</p>
      {complete && ex.trend && <Sparkline {...ex.trend} />}
      {complete && ex.facts && (
        <dl className="mt-2 divide-y divide-ink/10 rounded-lg bg-surface px-3 text-[13px]">
          {ex.facts.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-3 py-1.5">
              <dt className="text-subtle">{label}</dt>
              <dd className="font-semibold tabular-nums">{value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

// Asking Claude from a phone, with the parts of the database it reads marked beside it.
export function AskTheDatabase() {
  const { askExamples, drawers, ui } = useCopy();
  const t = ui.data;
  // Answers name tables by their real id; the page shows each one's name in this language.
  const partName = useMemo(
    () =>
      Object.fromEntries(
        drawers.flatMap((d) => d.parts).map((p) => [p.tech, p.name]),
      ),
    [drawers],
  );
  // The first question whose answer uses this part of the database.
  const questionFor = (tech: string) =>
    askExamples.findIndex((e) => e.readFrom.includes(tech));

  const phone = useRef<HTMLDivElement>(null);
  const { index, previous, phase, chars, ask } = useChatPlayback(
    askExamples,
    phone,
  );
  const ex = askExamples[index];
  const before = previous === null ? null : askExamples[previous];
  const sent = phase !== "typing";

  return (
    <div className="grid gap-12 md:grid-cols-[300px_minmax(0,1fr)] md:gap-14">
      <div ref={phone} className="mx-auto w-[300px]">
        <PhoneFrame>
          <div className="flex h-[560px] flex-col">
            <div className="flex items-center justify-between border-b border-ink/10 px-4 py-2.5 text-[13px]">
              <span className="font-semibold">Claude</span>
              <span className="flex items-center gap-1.5 text-subtle">
                <span className="h-2 w-2 rounded-full bg-live" aria-hidden />
                Remote Control
              </span>
            </div>

            {/* Newest at the bottom; older messages slide up and out of view. */}
            <div
              className="flex flex-1 flex-col justify-end gap-3 overflow-hidden px-4 pb-3 text-[15px] leading-snug"
              aria-live="polite"
            >
              {before && (
                <div className="space-y-3 opacity-60">
                  <Question text={before.question} />
                  <Answer ex={before} text={before.answer} complete />
                </div>
              )}
              {sent && <Question text={ex.question} />}
              {phase === "reading" && (
                <div className="w-fit rounded-2xl rounded-bl-sm bg-canvas px-3.5 py-2.5">
                  <span className="flex gap-1" aria-hidden>
                    {[0, 150, 300].map((delay) => (
                      <span
                        key={delay}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-subtle"
                        style={{ animationDelay: `${delay}ms` }}
                      />
                    ))}
                  </span>
                  <span className="mt-1 block text-[12px] text-subtle">
                    {t.checking}{" "}
                    {joinList(
                      ex.readFrom.map((id) => partName[id]),
                      t.and,
                    )}
                  </span>
                </div>
              )}
              {(phase === "answering" || phase === "done") && (
                <Answer
                  ex={ex}
                  text={
                    phase === "done" ? ex.answer : ex.answer.slice(0, chars)
                  }
                  complete={phase === "done"}
                />
              )}
            </div>

            <div className="flex gap-1.5 overflow-x-auto px-3 pb-2 [mask-image:linear-gradient(to_right,black_85%,transparent)] [scrollbar-width:none]">
              {askExamples.map((e, i) => (
                <Chip
                  key={e.chip}
                  small
                  pressed={i === index}
                  onClick={() => ask(i)}
                >
                  {e.chip}
                </Chip>
              ))}
            </div>
            <div className="mx-3 mb-4 flex items-center gap-2 rounded-full border border-ink/15 py-1.5 pr-1.5 pl-4 text-[14px]">
              <span
                className={`min-w-0 flex-1 truncate ${phase === "typing" ? "" : "text-subtle"}`}
              >
                {phase === "typing" ? (
                  <>
                    {ex.question.slice(0, chars)}
                    <span className="animate-pulse text-accent">|</span>
                  </>
                ) : (
                  t.placeholder
                )}
              </span>
              <span
                className="rounded-full bg-accent p-1.5 text-white"
                aria-hidden
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        </PhoneFrame>
        <p className="mt-3 text-center font-mono text-[12px] text-subtle uppercase">
          {t.caption}
        </p>
      </div>

      {/* Same height as the phone: title level with its top, footnote level with its caption. */}
      <div className="flex flex-col">
        <h3 className="subhead">{t.memoryTitle}</h3>
        <p className="mt-2 max-w-xl text-subtle">{t.memoryIntro}</p>
        <ul className="mt-5 flex flex-1 flex-col justify-between border-t-2 border-ink">
          {drawers.map((d) => {
            const open =
              sent && d.parts.some((p) => ex.readFrom.includes(p.tech));
            return (
              <li key={d.name} className="border-b border-ink/12 py-3.5">
                <p className="flex flex-wrap items-baseline gap-x-3">
                  <span
                    className={`font-display text-[24px] leading-tight transition-colors duration-500 ${
                      open ? "text-accent" : ""
                    }`}
                  >
                    {d.name}
                  </span>
                  <span className="text-[15px] text-subtle italic">
                    {d.answers}
                  </span>
                </p>
                <ul className="mt-2 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                  {d.parts.map((p) => {
                    const lit = sent && ex.readFrom.includes(p.tech);
                    return (
                      <li key={p.name}>
                        <button
                          type="button"
                          onClick={() => ask(questionFor(p.tech))}
                          aria-pressed={lit}
                          className="group flex w-full gap-2.5 rounded-sm text-left focus-visible:outline-accent/40"
                        >
                          <span
                            className={`mt-[7px] h-2 w-2 shrink-0 rounded-full transition-colors duration-500 ${
                              lit
                                ? "bg-accent"
                                : "bg-ink/15 group-hover:bg-accent/50"
                            }`}
                            aria-hidden
                          />
                          <span className="min-w-0 leading-snug">
                            <span className="flex flex-wrap items-baseline gap-x-1.5">
                              <span
                                className={`font-semibold underline-offset-4 transition-colors duration-500 group-hover:underline ${
                                  lit ? "text-accent" : ""
                                }`}
                              >
                                {p.name}
                              </span>
                              <span className="font-mono text-[11px] text-subtle/70">
                                {p.tech}
                              </span>
                            </span>
                            <span className="block text-[14px] text-subtle">
                              {p.holds}
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-xs text-subtle">{t.underHood}</p>
      </div>
    </div>
  );
}
