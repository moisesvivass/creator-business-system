import { useCallback, useRef, useState, type ReactNode } from "react";
import { BadgeCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { useCopy, type Copy } from "@/content";
import { platformCopy } from "@/data/mockData";
import { useAutoAdvance } from "@/hooks/useAutoAdvance";
import { ActorTag } from "./ActorTag";
import { PhoneFrame } from "./PhoneFrame";
import { ReelCover } from "./ReelCover";

// What each step produces, as one phone screen. All fictional. What the creator publishes
// (caption, titles, the follower's DM) stays in English in every language, as it does on her accounts.
const screens = (t: Copy["ui"]["system"]["screens"]): ReactNode[] => [
  <div className="flex h-full flex-col">
    <p className="text-[13px] text-subtle">{t.alertTime}</p>
    <p className="mt-1 text-xl font-semibold leading-tight">{t.saved}</p>
    <div className="mt-4 min-h-0 flex-1 overflow-hidden rounded-xl">
      <ReelCover />
    </div>
    <p className="mt-4 text-lg font-semibold leading-snug">
      Cream blush vs a drugstore alternative
    </p>
    <p className="mt-1 text-[15px] text-subtle">{t.updates}</p>
  </div>,
  <div>
    <p className="text-xl font-semibold leading-tight">{t.found}</p>
    <ul className="mt-5 space-y-3 text-base">
      {[
        ["Cream blush", "$40", t.sources[0]],
        ["Drugstore cheek tint", "$14", t.sources[1]],
        ["Setting spray", "$12", t.sources[2]],
      ].map(([name, price, source]) => (
        <li key={name} className="rounded-xl bg-canvas px-4 py-3">
          <p className="flex justify-between gap-3 font-semibold">
            {name}
            <span className="tabular-nums">{price}</span>
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-[14px] text-accent">
            <BadgeCheck className="h-4 w-4" /> {source}
          </p>
        </li>
      ))}
    </ul>
  </div>,
  <div>
    <p className="text-xl font-semibold leading-tight">{t.written}</p>
    <ul className="mt-4 space-y-2.5">
      {platformCopy.map((c) => (
        <li key={c.platform} className="rounded-xl bg-canvas px-3.5 py-2.5">
          <p className="text-[12px] font-semibold uppercase tracking-wide text-accent">
            {c.platform}
          </p>
          <p className="mt-1 text-[15px] leading-snug">{c.text}</p>
        </li>
      ))}
    </ul>
  </div>,
  <div className="flex h-full flex-col">
    <p className="text-center text-[13px] text-subtle">{t.messageTime}</p>
    <div className="mt-5 rounded-2xl rounded-tl-sm bg-canvas px-4 py-3 text-[15px] leading-snug">
      <p className="font-semibold">{t.ready}</p>
      <ul className="mt-2 space-y-1">
        {t.summary.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <p className="mt-2 text-subtle">{t.waiting}</p>
    </div>
    <p className="mt-auto text-center text-[13px] font-semibold text-accent">
      {t.decision}
    </p>
    <span className="mt-2 rounded-full bg-accent py-3 text-center text-lg font-semibold text-white">
      {t.start}
    </span>
  </div>,
  <div className="flex h-full flex-col">
    <p className="text-center text-[13px] text-subtle">{t.igMessage}</p>
    <div className="mt-6 space-y-3 text-base">
      <p className="ml-auto w-fit rounded-2xl rounded-br-sm bg-ink px-4 py-2 text-white">
        BLUSH
      </p>
      <div className="w-fit max-w-[92%] rounded-2xl rounded-bl-sm bg-canvas px-4 py-3">
        Here are both! Tap a store to shop.
        <div className="mt-3 flex flex-col gap-2">
          {["Amazon", "Sephora"].map((store) => (
            <span
              key={store}
              className="rounded-full border border-ink/20 bg-surface py-1.5 text-center font-semibold"
            >
              {store}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>,
];

// One video's path, shown on a phone you can swipe; the steps beside it jump to each screen.
export function VideoJourney() {
  const { stages, ui } = useCopy();
  const t = ui.system;
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const goTo = useCallback((i: number) => {
    const el = track.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  }, []);
  // It plays by itself until the visitor touches it; from then on it is theirs.
  const { stop, pick } = useAutoAdvance(track, active, stages.length, goTo);

  const onScroll = () => {
    const el = track.current;
    if (el) setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div className="mt-8 grid items-center gap-10 md:grid-cols-[300px_minmax(0,1fr)] md:gap-14">
      <div className="mx-auto w-[300px]">
        <PhoneFrame>
          <div
            ref={track}
            onScroll={onScroll}
            onPointerDown={stop}

            className="flex h-[520px] snap-x snap-mandatory overflow-x-auto [scrollbar-width:none]"
            aria-label={t.phoneScreens}
          >
            {screens(t.screens).map((screen, i) => (
              <div
                key={stages[i].title}
                className="h-full w-full shrink-0 snap-center px-5 pt-5 pb-8"
              >
                {screen}
              </div>
            ))}
          </div>
        </PhoneFrame>
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => pick(Math.max(active - 1, 0))}
            disabled={active === 0}
            aria-label={t.prev}
            className="rounded-full border border-ink/20 p-1.5 disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-2">
            {stages.map((s, i) => (
              <span
                key={s.title}
                className={`h-2 w-2 rounded-full ${i === active ? "bg-accent" : "bg-ink/20"}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => pick(Math.min(active + 1, stages.length - 1))}
            disabled={active === stages.length - 1}
            aria-label={t.next}
            className="rounded-full border border-ink/20 p-1.5 disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <ol className="space-y-2">
        {stages.map((stage, i) => (
          // On a phone only the step on screen is listed; the dots and arrows move between them.
          <li
            key={stage.title}
            className={i === active ? "" : "hidden md:block"}
          >
            <button
              type="button"
              onClick={() => pick(i)}
              aria-current={i === active ? "step" : undefined}
              className={`w-full border-l-4 py-3 pl-5 text-left transition-colors ${
                i === active
                  ? "border-accent"
                  : "border-ink/10 opacity-55 hover:opacity-90"
              }`}
            >
              <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-display text-[30px] leading-tight">
                  {stage.title}
                </span>
                <ActorTag actor={stage.actor} />
              </span>
              <span className="mt-1 block text-lg leading-relaxed text-subtle">
                {stage.detail}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
