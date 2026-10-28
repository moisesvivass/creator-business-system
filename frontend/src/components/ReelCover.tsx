// A drawn cover for the fictional "cream blush vs drugstore" reel: no real photo of anyone.
export function ReelCover() {
  return (
    <svg
      viewBox="0 0 240 300"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Reel cover: a $40 cream blush next to a $14 drugstore tint"
    >
      <defs>
        <linearGradient id="reel-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6e4dc" />
          <stop offset="1" stopColor="#e9c3b6" />
        </linearGradient>
        <radialGradient id="reel-pan" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#f2a9a1" />
          <stop offset="1" stopColor="#d9736d" />
        </radialGradient>
        <linearGradient id="reel-tube" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f9dcd6" />
          <stop offset="0.5" stopColor="#fff1ee" />
          <stop offset="1" stopColor="#efc6be" />
        </linearGradient>
      </defs>
      <rect width="240" height="300" fill="url(#reel-bg)" />
      {/* marble-ish counter */}
      <path d="M0 225 Q120 205 240 222 V300 H0 Z" fill="#fbf6f3" />
      <path
        d="M20 250 Q90 238 150 262 M120 280 Q180 268 230 284"
        stroke="#e7dcd6"
        strokeWidth="1.5"
        fill="none"
      />

      {/* the $40 compact */}
      <ellipse cx="78" cy="236" rx="56" ry="10" fill="#c79d90" opacity="0.35" />
      <circle cx="78" cy="185" r="52" fill="#2a2426" />
      <circle cx="78" cy="185" r="44" fill="url(#reel-pan)" />
      <path
        d="M52 168 Q70 150 96 160"
        stroke="#fff"
        strokeOpacity="0.45"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />

      {/* the $14 tube */}
      <ellipse cx="180" cy="238" rx="30" ry="7" fill="#c79d90" opacity="0.35" />
      <rect
        x="158"
        y="118"
        width="44"
        height="118"
        rx="9"
        fill="url(#reel-tube)"
        stroke="#e2b3a9"
      />
      <rect x="162" y="90" width="36" height="34" rx="6" fill="#2a2426" />
      <rect
        x="168"
        y="160"
        width="24"
        height="44"
        rx="3"
        fill="#fff"
        opacity="0.7"
      />
      <rect x="172" y="168" width="16" height="3" rx="1.5" fill="#d9736d" />
      <rect x="172" y="176" width="12" height="2" rx="1" fill="#c9a49b" />

      {/* cover text, the way creators put it on a reel */}
      <g fontFamily="var(--font-sans)" fontWeight="600">
        <rect x="34" y="24" width="68" height="34" rx="6" fill="#fff" />
        <text
          x="68"
          y="48"
          textAnchor="middle"
          fontSize="22"
          className="fill-ink"
        >
          $40
        </text>
        <text
          x="120"
          y="48"
          textAnchor="middle"
          fontSize="16"
          className="fill-ink"
          fontStyle="italic"
        >
          vs
        </text>
        <rect
          x="138"
          y="24"
          width="68"
          height="34"
          rx="6"
          className="fill-accent"
        />
        <text x="172" y="48" textAnchor="middle" fontSize="22" fill="#fff">
          $14
        </text>
      </g>
      <text
        x="120"
        y="80"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="13"
        fill="#5a4a46"
      >
        can you tell which is which?
      </text>

      {/* reel chrome */}
      <g transform="translate(14 270)">
        <circle cx="8" cy="8" r="9" className="fill-ink" opacity="0.55" />
        <path d="M5.5 4.5 L12 8 L5.5 11.5 Z" fill="#fff" />
        <text
          x="24"
          y="12"
          fontFamily="ui-sans-serif, system-ui"
          fontSize="11"
          fill="#5a4a46"
        >
          0:23
        </text>
      </g>
    </svg>
  );
}
