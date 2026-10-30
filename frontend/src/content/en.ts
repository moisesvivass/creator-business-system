// English copy. The data modules hold the English text of the system; this file adds the page's
// own words. `es.ts` mirrors this shape exactly.
import { alerts, askExamples, jobs, kitNotes, stages } from "@/data/mockData";
import { checks, drawers, productPaths, stores, story } from "@/data/story";

const ui = {
  pageTitle: "Creator Business System",
  brand: "Creator Business System",
  nav: {
    story: "Story",
    system: "System",
    stores: "Stores",
    mediaKit: "Media kit",
  },
  hero: {
    kicker: "A real system, shown with fictional numbers",
    titleBefore: "The system",
    titleEm: "behind",
    titleAfter: "a creator's business",
    lede: "A content creator films. A system handles everything around the video: it tracks how it performs, finds the products in it, builds the affiliate links, prepares the replies and tells me when something needs a decision.",
    aside:
      "I built it with Claude Code, starting from a dashboard that ended up turning into a system with its own rules. Every number on this page is invented.",
    signature: "— Moises Vivas, Toronto",
  },
  footer: {
    note: "The system and its rules are real; every number is fictional. Made with",
  },
  story: {
    kicker: "The story",
    title: "How I got here",
    intro: "In my own words, as the person who built it.",
    turningPoint: "The turning point",
  },
  system: {
    kicker: "The system",
    title: "One database for the whole business",
    intro:
      "Every video is saved once, together with every platform it reached and every product in it. The platforms send their numbers on their own; small jobs keep everything current and tell me when a person is needed.",
    journeyTitle: "From the moment a video goes up",
    phoneScreens: "Phone screens, swipe to see each step",
    prev: "Previous step",
    next: "Next step",
    screens: {
      alertTime: "Alert, 6:42 pm",
      saved: "New video saved",
      updates: "Views, saves and shares update every day.",
      found: "Found in the video",
      sources: [
        "Sephora API: Canadian price",
        "Amazon API: sold by Amazon.ca",
        "Amazon API: sold by the brand",
      ],
      written: "Written for each platform",
      messageTime: "Message to me, 7:05 pm",
      ready: "Flow for BLUSH is ready",
      summary: [
        "3 products found",
        "Every affiliate link opened and checked",
        "DM drafted, keyword BLUSH",
        "Short and 2 pins drafted",
      ],
      waiting: "Saved as a draft. Waiting for you.",
      decision: "Your decision",
      start: "Start",
      igMessage: "Instagram message",
    },
  },
  actors: { system: "By itself", agent: "AI agent", human: "Me" },
  data: {
    kicker: "The database",
    title: "One place I can ask anything",
    intro:
      "Each video is saved once, linked to every platform it reached and every product shown in it. So instead of opening a dashboard, I ask Claude and it answers from the database. And I can ask from anywhere: Remote Control connects my phone to the session that runs the system, so I answer from the street and the work keeps going.",
    checking: "Checking",
    placeholder: "Ask about the account",
    caption: "Tap a question. Fictional answers",
    memoryTitle: "What it remembers",
    memoryIntro:
      "Four kinds of memory, one database. The parts Claude checks light up. Tap any part to ask about it.",
    underHood:
      "Under the hood: 13 tables in PostgreSQL on Railway, backed up every week. The small grey names are the real ones.",
    and: "and",
  },
  stores: {
    kicker: "The stores",
    title: "How each product finds its store",
    intro:
      "Every product in a video ends up somewhere a follower can buy it in one tap. Follow one: how the system decides where, the checks before it goes out, and how the link reaches people.",
    follow: "Follow a product",
    step: "Step",
    landsIn: "Lands in",
    beforeOut: "Before it goes out",
    groups: { store: "Where people buy", channel: "How the link reaches them" },
  },
  jobs: {
    kicker: "Runs by itself",
    title: "It works all day, and writes only when it matters",
    intro:
      "Small jobs run on a timer from morning to night. Most of the time they find nothing and stay quiet. When one finds something a person should see, a short message lands on my phone.",
    dayLabel: "One Monday, sped up. Each mark is a job running",
    day: "Monday",
    nothingYet: "Nothing yet. It only writes when something needs me.",
  },
  kit: {
    kicker: "Fed live",
    title: "A media kit that updates itself",
    intro:
      "The page brands see when they want to work with the account. Every number comes from the platforms' APIs through the database, so it is always current and nobody types a figure. Here is a fictional copy, live.",
    howTitle: "How each part works",
    footnote: "Fictional creator and numbers. The page and its rules are real.",
  },
};

export const en = {
  ui,
  story,
  stages,
  drawers,
  stores,
  productPaths,
  checks,
  jobs,
  alerts,
  kitNotes,
  askExamples,
};
