import type { KitReel } from "@/types";

// Drawn stand-ins for video covers: one product scene per theme, no real photo of anyone.
const scenes: Record<
  KitReel["art"],
  { bg: [string, string]; art: JSX.Element }
> = {
  look: {
    bg: ["#2b2230", "#6b3d4f"],
    art: (
      <>
        <path
          d="M45 30 l5 11 12 1 -9 8 3 12 -11 -6 -11 6 3 -12 -9 -8 12 -1z"
          fill="#e8c27a"
        />
        <rect x="36" y="92" width="18" height="44" rx="3" fill="#1b1b1b" />
        <rect x="38" y="70" width="14" height="24" rx="2" fill="#d4af5f" />
        <path d="M39 70 L 51 70 L 49 56 Q 45 50 41 56 Z" fill="#b0233f" />
      </>
    ),
  },
  blush: {
    bg: ["#f3d9cf", "#d58f84"],
    art: (
      <>
        <circle cx="45" cy="78" r="28" fill="#2a2426" />
        <circle cx="45" cy="78" r="22" fill="#e48b86" />
        <path
          d="M32 70 Q 42 60 56 66"
          stroke="#fff"
          strokeOpacity="0.5"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <rect
          x="58"
          y="104"
          width="16"
          height="40"
          rx="5"
          fill="#f7e1dc"
          stroke="#d9a79d"
        />
      </>
    ),
  },
  brow: {
    bg: ["#efe2d6", "#b58b6c"],
    art: (
      <>
        <path
          d="M18 64 Q 45 44 74 58"
          stroke="#5a3a28"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
        />
        <rect
          x="22"
          y="96"
          width="52"
          height="7"
          rx="3.5"
          transform="rotate(-28 48 100)"
          fill="#3a2a22"
        />
        <rect
          x="60"
          y="76"
          width="12"
          height="7"
          rx="2"
          transform="rotate(-28 66 80)"
          fill="#c9a77d"
        />
      </>
    ),
  },
  lips: {
    bg: ["#f1d6cf", "#a8554f"],
    art: (
      <>
        <path
          d="M20 66 Q 33 54 45 62 Q 57 54 70 66 Q 45 88 20 66 Z"
          fill="#8f2f35"
        />
        <rect x="26" y="98" width="7" height="48" rx="3" fill="#6e3b2c" />
        <rect x="41" y="94" width="7" height="52" rx="3" fill="#a24c3d" />
        <rect x="56" y="100" width="7" height="46" rx="3" fill="#c26a5a" />
      </>
    ),
  },
  skincare: {
    bg: ["#e7efe9", "#9fb9ab"],
    art: (
      <>
        <rect x="20" y="60" width="24" height="70" rx="6" fill="#ffffff" />
        <rect x="26" y="50" width="12" height="12" rx="2" fill="#6f8f80" />
        <rect
          x="50"
          y="78"
          width="22"
          height="52"
          rx="10"
          fill="#f5efe6"
          stroke="#c8d6cd"
        />
        <rect x="24" y="84" width="16" height="10" rx="2" fill="#d7e4dc" />
      </>
    ),
  },
  serum: {
    bg: ["#f7efe6", "#e2b9a4"],
    art: (
      <>
        <rect
          x="30"
          y="70"
          width="30"
          height="64"
          rx="8"
          fill="#e8a46f"
          fillOpacity="0.85"
        />
        <rect x="38" y="52" width="14" height="20" rx="3" fill="#2a2426" />
        <ellipse cx="45" cy="48" rx="9" ry="6" fill="#2a2426" />
        <path d="M68 40 l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2z" fill="#fff" />
        <path
          d="M20 54 l1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5z"
          fill="#fff"
        />
      </>
    ),
  },
};

export function ReelThumb({ art }: { art: KitReel["art"] }) {
  const { bg, art: scene } = scenes[art];
  return (
    <svg
      viewBox="0 0 90 160"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id={`thumb-${art}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={bg[0]} />
          <stop offset="1" stopColor={bg[1]} />
        </linearGradient>
      </defs>
      <rect width="90" height="160" fill={`url(#thumb-${art})`} />
      {scene}
      <rect y="120" width="90" height="40" fill="url(#thumb-shade)" />
      <linearGradient id="thumb-shade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#000" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity="0.45" />
      </linearGradient>
    </svg>
  );
}
