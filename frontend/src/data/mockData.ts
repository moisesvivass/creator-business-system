// Every figure, title and date in this file is invented for the demo.
// Nothing here is read from, or derived from, a real account.

import type {
  Alert,
  AskExample,
  KitNote,
  MediaKitPreview,
  MediaKitStat,
  PlatformCopy,
  ScheduledJob,
  Stage,
} from "@/types";

export const stages: Stage[] = [
  {
    actor: "system",
    title: "A video is posted",
    detail:
      "The system spots it within 15 minutes and saves it. Its views, saves and shares update every day.",
  },
  {
    actor: "agent",
    title: "AI finds its products",
    detail:
      "I start it with one command. An AI agent reads the video and its caption and names every product; Amazon's and Sephora's APIs add the price.",
  },
  {
    actor: "agent",
    title: "It goes to every platform",
    detail:
      "The same video is drafted as a YouTube Short and Pinterest pins, each rewritten for how people search there.",
  },
  {
    actor: "human",
    title: "It stops for my decision",
    detail:
      "The store links are built and checked and the message is drafted. I get one summary, review it and press Start. Nothing goes out without me.",
  },
  {
    actor: "system",
    title: "Followers get the links",
    detail:
      "Anyone who comments the keyword gets the products by message, one button per store.",
  },
];

export const platformCopy: PlatformCopy[] = [
  {
    platform: "Instagram caption",
    text: "The $14 blush everyone mistakes for the $40 one 👀 Comment BLUSH and I'll send you both",
  },
  {
    platform: "YouTube Short title",
    text: "Cream blush vs drugstore alternative under $15 | natural flush #shorts",
  },
  {
    platform: "Pinterest pin title",
    text: "Cream blush alternative under $15: drugstore cheek tint for a natural flush",
  },
];

// The real schedule (Railway scheduler, converted to Toronto time), on one Monday.
export const jobs: ScheduledJob[] = [
  {
    name: "New-video check",
    when: "Every 15 min",
    does: "Spots a new video and saves it",
    at: [],
    everyMinutes: 15,
  },
  {
    name: "Daily update",
    when: "8:00",
    does: "Account numbers, audience and every post",
    at: [8],
  },
  {
    name: "Pinterest update",
    when: "8:30",
    does: "Each pin's views, saves and clicks",
    at: [8.5],
  },
  {
    name: "Missing-data check",
    when: "Every 6 h",
    does: "Makes sure the numbers keep arriving",
    at: [2, 8, 14, 20],
  },
  {
    name: "Monday checks",
    when: "Mon 5:00",
    does: "Platform logins and the contact form",
    at: [5],
  },
  {
    name: "Weekly report",
    when: "Mon 9:00",
    does: "What went out and what is missing",
    at: [9],
  },
  {
    name: "When something happens",
    when: "Any time",
    does: "A brand writes in, a draft is ready",
    at: [14.25, 19.25],
    onEvent: true,
  },
];

// What reached the phone that Monday. Fictional.
export const alerts: Alert[] = [
  {
    at: 9,
    title: "Weekly report",
    body: "5 videos went out. 2 still need a pin, 1 needs its product message.",
  },
  {
    at: 14.25,
    title: "A brand reached out",
    body: "A skincare brand asked for the media kit. It's saved and in your inbox.",
  },
  {
    at: 18.75,
    title: "New video detected",
    body: '"Cream blush vs a drugstore alternative" is live. No product message yet.',
  },
  {
    at: 19.25,
    title: "Flow for BLUSH is ready",
    body: "3 products, every link checked. Waiting for you: Start.",
  },
];

export const mediaKit: MediaKitStat[] = [
  {
    platform: "Instagram",
    unit: "followers",
    base: 48_210,
    source: "Instagram API",
  },
  {
    platform: "TikTok",
    unit: "followers",
    base: 132_050,
    source: "TikTok API",
  },
  {
    platform: "YouTube",
    unit: "subscribers",
    base: 7_954,
    source: "YouTube API",
  },
];

export const kitPreview: MediaKitPreview = {
  name: ["Sample", "Creator"],
  eyebrow: "Beauty creator · Canada",
  reachBase: 2_418_300,
  reachWindow: "last 28 days",
  reels: [
    {
      title: "Award-show look, for less",
      art: "look",
      views: "1.2M",
      saves: "84K",
    },
    {
      title: "Cream blush vs drugstore",
      art: "blush",
      views: "640K",
      saves: "41K",
    },
    {
      title: "The two-minute brow trick",
      art: "brow",
      views: "410K",
      saves: "36K",
    },
    {
      title: "Fall lip combos under $20",
      art: "lips",
      views: "260K",
      saves: "19K",
    },
    {
      title: "Pharmacy skincare haul",
      art: "skincare",
      views: "180K",
      saves: "12K",
    },
  ],
  newReel: {
    title: "Glass skin in three steps",
    art: "serum",
    views: "820K",
    saves: "52K",
  },
  usualReach: "9.1K",
  audience: {
    engagement: "6.8%",
    women: "93%",
    ages: [
      ["25–34", "48%"],
      ["35–44", "31%"],
      ["18–24", "14%"],
    ],
    markets: [
      ["United States", "41%"],
      ["Canada", "9%"],
      ["United Kingdom", "6%"],
    ],
  },
  readAt: "Read today at 8:00. Next update tomorrow at 8:00.",
};

// What each block shows and how its numbers get there, from the real system.
export const kitNotes: KitNote[] = [
  {
    block: "hero",
    title: "Two numbers up top",
    how: "Followers on Instagram, TikTok and YouTube, read from each platform's API and added up. Nobody types them.",
  },
  {
    block: "reels",
    title: "The five best videos",
    how: "The five Reels with the most reach, straight from the database. When a new video beats one, it takes its place by itself. Saves included, a number almost no media kit shows.",
  },
  {
    block: "platforms",
    title: "Every platform, one total",
    how: "Each row links to the profile, so a brand can check it. A number that stops arriving is hidden, never shown as zero.",
  },
  {
    block: "audience",
    title: "Who is watching",
    how: "Gender, age and countries from Instagram's audience data, saved every day. Engagement is per Reel, the way the industry measures it.",
  },
  {
    block: "contact",
    title: "A form that reaches me",
    how: "A brand's message is saved in the database, emailed to the inbox and sent to my phone.",
  },
  {
    block: "design",
    title: "Yours to shape",
    how: "It's our own page on our own domain, not a template. The design, the order and the words change whenever we want. Only the numbers are off-limits: they always come from the APIs.",
  },
];

export const askExamples: AskExample[] = [
  {
    chip: "Blush video",
    question: "How's the cream blush video doing?",
    answer:
      "Really well. 18.4K people have seen it, about twice what a video usually gets, and most of the saves came on day one.",
    readFrom: ["posts", "post_metric_snapshots"],
    trend: {
      label: "People reached, first 7 days",
      values: [2.1, 7.8, 11.9, 14.6, 16.5, 17.6, 18.4],
    },
    facts: [
      ["Usual video", "9.1K"],
      ["Saves", "1,120"],
    ],
  },
  {
    chip: "Anything missing?",
    question: "Is anything missing from this week's videos?",
    answer: "Just two things. Everything else is already out everywhere.",
    readFrom: ["content_pieces", "publications"],
    facts: [
      ["Brow trick", "Needs its pin"],
      ["Fall lip combos", "Needs a Short"],
    ],
  },
  {
    chip: "Pins",
    question: "How are the pins doing?",
    answer:
      "The blush pin is this month's best. It keeps sending people to the products days after the video went up.",
    readFrom: ["pinterest_pin_days"],
    facts: [
      ["Views since Friday", "1,240"],
      ["Saves", "86"],
      ["Clicks to products", "41"],
    ],
  },
  {
    chip: "What to film",
    question: "What should we film next?",
    answer:
      "Another look ID. Four of the last five beat the usual reach, and cream blushes show up in six of the ten most-watched videos.",
    readFrom: ["posts", "affiliate_catalog"],
  },
  {
    chip: "Brands",
    question: "Did any brand reach out?",
    answer:
      "Yes, one this week. A skincare brand asked for the media kit. It's saved, and the email is in your inbox.",
    readFrom: ["brand_contacts"],
  },
  {
    chip: "AI check",
    question: "Did the second AI catch anything I missed?",
    answer:
      "One thing. It spotted a setting spray in the last few seconds of the video that isn't in the message yet.",
    readFrom: ["muse_reports", "affiliate_catalog"],
  },
  {
    chip: "New pins",
    question: "Which pins went up this week?",
    answer:
      "Three: a collage of the fall lip combos, the blush video as a video pin, and a photo pin of the brow trick.",
    readFrom: ["pinterest_pins"],
  },
  {
    chip: "Followers",
    question: "How many followers did we gain this month?",
    answer: "About 2,300, most of them the week of the award-show look.",
    readFrom: ["instagram_snapshots", "posts"],
    trend: { label: "New followers by week", values: [310, 1240, 450, 300] },
  },
];
