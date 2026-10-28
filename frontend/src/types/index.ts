export type Actor = "system" | "agent" | "human";

/** One step of a flow, and who does it. */
export interface Stage {
  title: string;
  detail: string;
  actor: Actor;
}

export interface PlatformCopy {
  platform: string;
  text: string;
}

/** A job on the system's clock. Times are hours of the day, Toronto time (8.5 = 8:30). */
export interface ScheduledJob {
  name: string;
  when: string;
  does: string;
  at: number[];
  /** Runs every N minutes instead of at fixed times. */
  everyMinutes?: number;
  /** Not on a timer: it fires when something happens. */
  onEvent?: boolean;
}

/** A message that reaches the phone at a given hour of the day. */
export interface Alert {
  at: number;
  title: string;
  body: string;
}

/** The story in a few paragraphs, with one pull quote at the turning point. */
export interface StoryText {
  before: string[];
  quote: { lead: string; punch: string };
  after: string[];
}

/** A question asked of the database: the answer, the tables it read and a few facts. */
export interface AskExample {
  chip: string;
  question: string;
  answer: string;
  readFrom: string[];
  facts?: [label: string, value: string][];
  /** A small line chart under the answer, e.g. reach by day. */
  trend?: { label: string; values: number[] };
}

export interface Table {
  name: string;
  /** The table's real name in the system's database (one part can span several tables). */
  tech: string;
  holds: string;
}

/** A group of tables that answers one kind of question, explained for a stranger. */
export interface Drawer {
  name: string;
  answers: string;
  parts: Table[];
}

export interface Store {
  name: string;
  /** Where people buy, or how the link reaches them. */
  kind: "store" | "channel";
  role: string;
  howWeConnect: string;
}

/** One step a product goes through on its way to a store, and what happened there. */
export interface PathStep {
  label: string;
  result: string;
  outcome: "yes" | "no" | "skip";
}

export interface ProductPath {
  product: string;
  steps: PathStep[];
  landsIn: string;
}

/** One of the checks every product passes before it goes out. */
export interface Check {
  stamp: string;
  /** The check that waits for a person instead of passing on its own. */
  waits?: boolean;
}

/** One platform's audience on the media kit; `base` is where the live count starts. */
export interface MediaKitStat {
  platform: string;
  unit: string;
  base: number;
  /** How often its API is read. */
  source: string;
}

export interface KitReel {
  title: string;
  /** Which drawn thumbnail stands in for the video. */
  art: "look" | "blush" | "brow" | "lips" | "skincare" | "serum";
  views: string;
  saves: string;
}

/** The fictional media kit page, block by block, as a brand would see it. */
export interface MediaKitPreview {
  name: [string, string];
  eyebrow: string;
  reachBase: number;
  reachWindow: string;
  reels: KitReel[];
  /** A video that climbs into the top five while you watch. */
  newReel: KitReel;
  usualReach: string;
  audience: {
    engagement: string;
    women: string;
    ages: [band: string, share: string][];
    markets: [country: string, share: string][];
  };
  readAt: string;
}

/** One block of the media kit and how its numbers stay true. */
export interface KitNote {
  block: "hero" | "reels" | "platforms" | "audience" | "contact" | "design";
  title: string;
  how: string;
}
