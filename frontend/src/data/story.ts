// The history, tables and store rules below describe the real system and how it got here.
// They carry no data about the creator: no name, handle, account figures, revenue or store IDs.

import type { Check, Drawer, ProductPath, Store, StoryText } from "@/types";

export const story: StoryText = {
  paragraphs: [
    "I've always been the person who reads the insights: the reach, the saves, the post that took off and the one that didn't. Working with a beauty creator, I noticed the app shows you the numbers one post at a time, but doesn't let you keep them, compare them or cross them with anything else. Instagram's API does. So I pulled the data out and built my own dashboard with Claude Code. Partly to understand the account. Partly to see how far I could take it.",
    "It took me further than I expected. Comparing post after post, the analysis kept pointing at the same few formats. The account leaned into them, the numbers moved, and some videos reached millions of views.",
    "That's when the dashboard became a system. It wasn't failing; it had become too small. Today one database holds every video, every platform it reached, every product in it and every affiliate link, Amazon included, and it keeps the media kit up to date on its own. I open the project with Claude and ask: what worked this week, which video is missing its links, how Pinterest compares to Instagram. The answer comes back live, and the next question starts from there.",
  ],
};

// The real tables of the system's database, grouped by the kind of question they answer.
export const drawers: Drawer[] = [
  {
    name: "The videos",
    answers: "How is a video doing, and where did it go?",
    parts: [
      {
        name: "Posts",
        tech: "posts",
        holds: "Reach, saves, shares and watch time",
      },
      {
        name: "Post history",
        tech: "post_metric_snapshots",
        holds: "Each post's numbers, day by day",
      },
      {
        name: "Videos",
        tech: "content_pieces",
        holds: "The format and theme of each video",
      },
      {
        name: "Platforms reached",
        tech: "publications",
        holds: "Where each video went",
      },
    ],
  },
  {
    name: "The products",
    answers: "What is in this video, and where can people buy it?",
    parts: [
      {
        name: "Products",
        tech: "affiliate_catalog",
        holds: "Every product and its affiliate link",
      },
      {
        name: "AI product lists",
        tech: "muse_reports",
        holds: "A second AI's list for each video",
      },
    ],
  },
  {
    name: "Pinterest",
    answers: "Which pins are working?",
    parts: [
      {
        name: "Pins",
        tech: "pinterest_pins",
        holds: "Every pin on the account",
      },
      {
        name: "Pin stats",
        tech: "pinterest_pin_days",
        holds: "Views, saves and clicks, per day",
      },
    ],
  },
  {
    name: "The account",
    answers: "How is the account growing, and who wants to work with it?",
    parts: [
      {
        name: "Account history",
        tech: "instagram_snapshots",
        holds: "Followers and audience, every day",
      },
      {
        name: "Brand enquiries",
        tech: "brand_contacts",
        holds: "Every brand that wrote in",
      },
    ],
  },
];

export const stores: Store[] = [
  {
    name: "Amazon Canada",
    kind: "store",
    role: "One list per video on the creator's storefront",
    howWeConnect:
      "Product, price and seller come from Amazon's API. The DM uses Amazon's own short link, the only kind that opens the Amazon app from Instagram.",
  },
  {
    name: "ShopMy (Sephora and more)",
    kind: "store",
    role: "One collection per video, the shop organised by content format",
    howWeConnect:
      "Sephora's prices come from its site API. ShopMy has none, so links and collections are built in the browser, and the video plays inside the shop.",
  },
  {
    name: "Instagram DM",
    kind: "channel",
    role: "Comment a keyword, get a message with one button per store",
    howWeConnect:
      "The flow is drafted in the automation tool. I review it and press Start.",
  },
  {
    name: "Pinterest",
    kind: "channel",
    role: "Pins people search like Google, built from videos that already exist",
    howWeConnect:
      "Pins go up after I approve them. The API reads their numbers into the database every day.",
  },
];

// The decision every product goes through, shown with three fictional products.
export const productPaths: ProductPath[] = [
  {
    product: "Cream blush",
    steps: [
      {
        label: "Already in our catalogue?",
        result: "Yes, from an older video",
        outcome: "yes",
      },
      { label: "Look it up", result: "Not needed", outcome: "skip" },
      {
        label: "Prove it's the product",
        result: "The link still lands on the same blush, same shade",
        outcome: "yes",
      },
      {
        label: "Pick the store",
        result: "Sephora carries it, so Sephora first",
        outcome: "yes",
      },
    ],
    landsIn: "Sephora, through ShopMy",
  },
  {
    product: "Drugstore cheek tint",
    steps: [
      {
        label: "Already in our catalogue?",
        result: "No, first time in a video",
        outcome: "no",
      },
      {
        label: "Look it up",
        result: "Amazon's API: sold by Amazon.ca, $14",
        outcome: "yes",
      },
      {
        label: "Prove it's the product",
        result: "The page names the exact tint and shade",
        outcome: "yes",
      },
      {
        label: "Pick the store",
        result: "Not at Sephora; amazon.ca has the exact product",
        outcome: "yes",
      },
    ],
    landsIn: "Amazon Canada",
  },
  {
    product: "Body glow oil",
    steps: [
      {
        label: "Already in our catalogue?",
        result: "No, first time in a video",
        outcome: "no",
      },
      {
        label: "Look it up",
        result: "Not at Sephora, not on amazon.ca",
        outcome: "no",
      },
      {
        label: "Prove it's the product",
        result: "The brand's own page, loaded and checked",
        outcome: "yes",
      },
      {
        label: "Pick the store",
        result: "Another ShopMy store that ships to Canada and the US",
        outcome: "yes",
      },
    ],
    landsIn: "The brand's own store, through ShopMy",
  },
];

export const checks: Check[] = [
  { stamp: "Agent counted every product" },
  { stamp: "Script tested every link" },
  { stamp: "Second agent reviewed it" },
  { stamp: "Waiting for me: Start", waits: true },
];
