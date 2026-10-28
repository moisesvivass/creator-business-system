import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Check } from "lucide-react";
import { useCopy } from "@/content";
// The media kit page itself is the creator's, in English in every language.
import { kitPreview as kit, mediaKit } from "@/data/mockData";
import { useAutoAdvance } from "@/hooks/useAutoAdvance";
import { useInView } from "@/hooks/useInView";
import { useElapsed, useTicker } from "@/hooks/useTicker";
import type { KitNote, KitReel } from "@/types";
import { ReelThumb } from "./ReelThumb";
import { Section } from "./Section";

type Block = KitNote["block"];

const full = (n: number) => n.toLocaleString("en-US");
const compact = (n: number) => `${(n / 1000).toFixed(1)}K`;

// Deterministic "API reads": which platform moved on each tick, and by how much.
const pulse = (tick: number) => ({
  platform: mediaKit[[1, 0, 1, 2, 1, 0][tick % 6]],
  gain: 1 + ((tick * 7) % 3),
});

function liveCounts(tick: number) {
  const counts = Object.fromEntries(mediaKit.map((p) => [p.platform, p.base]));
  for (let t = 1; t <= tick; t++) {
    const { platform, gain } = pulse(t);
    counts[platform.platform] += gain;
  }
  return counts;
}

// A fictional creator seen from behind, standing in for the real photo.
function Portrait() {
  return (
    <svg
      viewBox="0 0 200 250"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="kit-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9a08f" />
          <stop offset="1" stopColor="#9a5d4d" />
        </linearGradient>
        <linearGradient id="kit-hair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2e1c15" />
          <stop offset="1" stopColor="#5a3726" />
        </linearGradient>
      </defs>
      <rect width="200" height="250" fill="url(#kit-bg)" />
      <path
        d="M14 250 C 24 204, 62 188, 100 188 C 138 188, 176 204, 186 250 Z"
        fill="#efe6dc"
      />
      <path
        d="M100 50 C 72 50, 56 72, 56 102 C 56 134, 50 164, 48 192 C 46 210, 56 226, 72 231 C 84 235, 92 228, 100 232 C 108 228, 116 235, 128 231 C 144 226, 154 210, 152 192 C 150 164, 144 134, 144 102 C 144 72, 128 50, 100 50 Z"
        fill="url(#kit-hair)"
      />
      <g
        fill="none"
        stroke="#7a4d36"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      >
        <path d="M84 70 C 74 110, 76 160, 70 210" />
        <path d="M104 64 C 100 120, 104 170, 98 222" />
        <path d="M122 72 C 128 120, 126 170, 132 214" />
      </g>
    </svg>
  );
}

function KitBlock({
  id,
  active,
  children,
  dark,
  style,
}: {
  id: Block;
  active: Block;
  children: ReactNode;
  dark?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div
      data-block={id}
      style={style}
      className={`relative transition-shadow duration-500 ${dark ? "bg-[#0a0a0a] text-white" : "bg-surface"} ${
        id === active ? "z-10 ring-2 ring-accent ring-inset" : ""
      }`}
    >
      {children}
    </div>
  );
}

// The hero restyled live while "Yours to shape" is explained: same numbers, new look.
const heroThemes: { bg: string; fg: string; font: string; italic?: boolean }[] =
  [
    { bg: "#0a0a0a", fg: "#ffffff", font: "var(--font-display)" },
    { bg: "#d6452f", fg: "#ffffff", font: "var(--font-mono)" },
    { bg: "#f3d9cf", fg: "#141414", font: "var(--font-sans)", italic: true },
  ];

const label =
  "text-[10px] font-semibold uppercase tracking-[0.2em] text-accent";

function ReelTile({ reel, fresh }: { reel: KitReel; fresh?: boolean }) {
  return (
    <li className={fresh ? "step-in" : ""}>
      <div
        className={`relative flex aspect-[9/16] items-end overflow-hidden rounded-md p-1.5 ${fresh ? "ring-2 ring-accent" : ""}`}
      >
        <ReelThumb art={reel.art} />
        {fresh && (
          <span className="absolute top-1 left-1 rounded-full bg-accent px-1.5 text-[9px] font-semibold text-white">
            New
          </span>
        )}
        <span className="relative text-[10px] leading-tight font-semibold text-white">
          {reel.views} views
        </span>
      </div>
      <p className="mt-1 text-[11px] leading-tight">{reel.title}</p>
      <p className="text-[11px] text-accent">{reel.saves} saves</p>
    </li>
  );
}

export function MediaKit() {
  const { kitNotes, ui } = useCopy();
  const t = ui.kit;
  const box = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLDivElement>(null);
  const visible = useInView(box, 0.3);
  const [active, setActive] = useState(0);
  const { stop, pick } = useAutoAdvance(
    box,
    active,
    kitNotes.length,
    setActive,
    6000,
  );
  const block = kitNotes[active].block;
  const shown: Block = block === "design" ? "hero" : block;

  // Live numbers: one API read every 2.2 s, and a "seconds ago" clock that resets on each read.
  const tick = useTicker(visible, 2200);
  const sinceRead = Math.floor(useElapsed(visible, 1000, tick) / 1000);
  const counts = useMemo(() => liveCounts(tick), [tick]);
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const reach = kit.reachBase + tick * 437;
  const lastRead = tick > 0 ? pulse(tick) : null;

  // The block being explained plays its own moment: a new Reel climbs in, a brand writes in.
  // Only the blocks that play a moment need the fast clock.
  const plays = block === "reels" || block === "contact" || block === "design";
  const inBlock = useElapsed(visible && plays, 100, block);
  const reelsMoved = block === "reels" && inBlock > 1600;
  const reels = reelsMoved
    ? [kit.reels[0], kit.newReel, ...kit.reels.slice(1, 4)]
    : kit.reels;
  const brand = "Glow Labs";
  const typed =
    block === "contact"
      ? brand.slice(0, Math.max(0, Math.floor((inBlock - 600) / 110)))
      : "";
  const sent = block === "contact" && inBlock > 2400;
  const theme =
    heroThemes[
      block === "design" ? Math.floor(inBlock / 1500) % heroThemes.length : 0
    ];

  // Scroll the miniature page to the block being explained.
  useEffect(() => {
    const el = page.current?.querySelector<HTMLElement>(
      `[data-block="${shown}"]`,
    );
    if (el && page.current)
      page.current.scrollTo({ top: el.offsetTop - 8, behavior: "smooth" });
  }, [shown]);

  return (
    <Section
      id="mediakit"
      number="06"
      kicker={t.kicker}
      title={t.title}
      intro={t.intro}
    >
      <div
        ref={box}
        className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-start"
      >
        <div className="overflow-hidden rounded-xl border border-ink/15 bg-surface shadow-[0_30px_60px_-35px_rgba(20,20,20,0.5)]">
          <div className="flex items-center gap-3 border-b border-ink/10 bg-canvas px-4 py-2.5">
            <span className="flex gap-1.5" aria-hidden>
              {["#e5a39a", "#e8c98a", "#a9cfa0"].map((c) => (
                <span
                  key={c}
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: c }}
                />
              ))}
            </span>
            <span className="min-w-0 flex-1 truncate rounded-full bg-surface px-3 py-1 text-center font-mono text-[12px] text-subtle">
              samplecreator.com
            </span>
            <span className="flex shrink-0 items-center gap-1.5 font-mono text-[11px] text-subtle">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-live" />
              </span>
              Live · {sinceRead}s ago
            </span>
          </div>

          <div
            ref={page}
            className="relative h-[520px] overflow-y-auto [scrollbar-width:thin]"
            onPointerDown={stop}
            aria-live="off"
          >
            <KitBlock
              id="hero"
              active={shown}
              style={{
                background: theme.bg,
                color: theme.fg,
                transition: "background 0.6s, color 0.6s",
              }}
            >
              <div className="grid grid-cols-[1.2fr_1fr]">
                <div className="flex flex-col justify-between gap-8 p-6">
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.3em] uppercase opacity-70">
                      {kit.eyebrow}
                    </p>
                    <p
                      className="mt-3 text-[60px] leading-[0.85] uppercase transition-all duration-500"
                      style={{
                        fontFamily: theme.font,
                        fontStyle: theme.italic ? "italic" : "normal",
                      }}
                    >
                      {kit.name[0]}
                      <br />
                      {kit.name[1]}
                    </p>
                  </div>
                  <div className="border-t border-current/15 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <p>
                        <span className="block font-display text-[30px] leading-none tabular-nums">
                          {full(total)}
                        </span>
                        <span className="text-[12px] opacity-60">
                          follow me
                        </span>
                      </p>
                      <p>
                        <span className="block font-display text-[30px] leading-none tabular-nums">
                          {full(reach)}
                        </span>
                        <span className="text-[12px] opacity-60">
                          saw me · {kit.reachWindow}
                        </span>
                      </p>
                    </div>
                    <p className="mt-3 h-4 font-mono text-[10px] opacity-80">
                      {lastRead && (
                        <span key={tick} className="step-in inline-block">
                          +{lastRead.gain} from the {lastRead.platform.source}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <Portrait />
              </div>
            </KitBlock>

            <KitBlock id="reels" active={shown}>
              <div className="p-6">
                <p className={label}>Most-watched videos</p>
                <ol className="mt-3 grid grid-cols-5 gap-2">
                  {reels.map((r) => (
                    <ReelTile
                      key={r.title}
                      reel={r}
                      fresh={r === kit.newReel}
                    />
                  ))}
                </ol>
                <p className="mt-3 text-[11px] text-subtle">
                  {reelsMoved
                    ? "A new video passed one of the five, so it took its place. Nobody touched the page."
                    : `The five Reels with the most reach. A usual Reel reaches ${kit.usualReach}.`}
                </p>
              </div>
            </KitBlock>

            <KitBlock id="platforms" active={shown}>
              <div className="border-t border-ink/10 p-6">
                <p className={label}>Platforms</p>
                <p className="mt-2 font-display text-[40px] leading-none tabular-nums">
                  {full(total)}
                </p>
                <p className="text-[12px] text-subtle">
                  followers across three platforms
                </p>
                <ul className="mt-3 divide-y divide-ink/10 text-[14px]">
                  {mediaKit.map((p) => {
                    const moved = lastRead?.platform.platform === p.platform;
                    return (
                      <li
                        key={p.platform}
                        className="flex items-center justify-between gap-3 py-1.5"
                      >
                        <span>{p.platform}</span>
                        <span className="flex items-center gap-2 tabular-nums">
                          {moved && (
                            <span
                              key={tick}
                              className="step-in font-mono text-[10px] text-accent"
                            >
                              +{lastRead.gain}
                            </span>
                          )}
                          {compact(counts[p.platform])}{" "}
                          <span className="text-subtle">{p.unit}</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </KitBlock>

            <KitBlock id="audience" active={shown} dark>
              <div className="grid grid-cols-2 gap-5 p-6 sm:grid-cols-4">
                <p>
                  <span className={label}>Engagement</span>
                  <span className="mt-1 block font-display text-[34px] leading-none">
                    {kit.audience.engagement}
                  </span>
                  <span className="text-[11px] text-white/60">per Reel</span>
                </p>
                <p>
                  <span className={label}>Gender</span>
                  <span className="mt-1 block font-display text-[34px] leading-none">
                    {kit.audience.women}
                  </span>
                  <span className="text-[11px] text-white/60">women</span>
                </p>
                {(
                  [
                    ["Age", kit.audience.ages],
                    ["Markets", kit.audience.markets],
                  ] as const
                ).map(([title, rows]) => (
                  <div key={title}>
                    <p className={label}>{title}</p>
                    <ul className="mt-1 text-[12px]">
                      {rows.map(([k, v]) => (
                        <li
                          key={k}
                          className="flex justify-between gap-2 border-b border-white/10 py-1"
                        >
                          <span className="text-white/80">{k}</span>
                          <span>{v}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </KitBlock>

            <KitBlock id="contact" active={shown}>
              <div className="p-6">
                <p className={label}>Work with me</p>
                <div
                  className="mt-3 grid gap-2 text-[13px] sm:grid-cols-2"
                  aria-hidden
                >
                  {["Your name", "Brand", "Email", "Budget"].map((f) => (
                    <span
                      key={f}
                      className={`rounded-md border px-3 py-2 ${
                        f === "Brand" && typed
                          ? "border-ink/40 text-ink"
                          : "border-ink/15 text-subtle"
                      }`}
                    >
                      {f === "Brand" && typed ? typed : f}
                    </span>
                  ))}
                  <span className="rounded-md border border-ink/15 px-3 py-2 text-subtle sm:col-span-2">
                    Tell me about the campaign
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span
                    className={`inline-block rounded-full px-4 py-1.5 text-[13px] font-semibold text-white transition-colors ${
                      sent ? "bg-accent" : "bg-ink"
                    }`}
                  >
                    {sent ? "Sent" : "Send"}
                  </span>
                  {sent && (
                    <span className="step-in flex items-center gap-1.5 text-[12px] text-subtle">
                      <Check className="h-3.5 w-3.5 text-accent" aria-hidden />
                      Saved to the database · sent to my phone
                    </span>
                  )}
                </div>
                <p className="mt-6 border-t border-ink/10 pt-3 text-[11px] text-subtle">
                  {kit.readAt}
                </p>
              </div>
            </KitBlock>
          </div>
        </div>

        <div>
          <p className="kicker text-subtle">{t.howTitle}</p>
          <ol className="mt-3 border-t-2 border-ink">
            {kitNotes.map((n, i) => (
              <li key={n.block} className="border-b border-ink/12">
                <button
                  type="button"
                  onClick={() => pick(i)}
                  aria-pressed={i === active}
                  className="w-full py-3.5 text-left"
                >
                  <span
                    className={`font-display text-[24px] leading-tight transition-colors duration-300 ${
                      i === active
                        ? "text-accent"
                        : "text-ink/70 hover:text-ink"
                    }`}
                  >
                    {n.title}
                  </span>
                  {i === active && (
                    <span className="step-in mt-1 block leading-snug text-subtle">
                      {n.how}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-[13px] text-subtle">{t.footnote}</p>
        </div>
      </div>
    </Section>
  );
}
