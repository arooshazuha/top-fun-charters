/**
 * The vessel. Every spec is verified from the live site / business documents.
 * Icon fields hold lucide-react icon *names* (mapped to components in the UI).
 */

export type YachtStat = { label: string; value: string; icon: string };
export type YachtFeature = { title: string; description: string; icon: string };

export const YACHT = {
  name: "Top Fun",
  headline: "A 50-foot performance yacht built for the day you'll remember",
  intro:
    "Top Fun is a 50-foot luxury performance yacht — fast when you want it, calm when you don't. She carries up to 13 guests in comfort, with two climate-controlled staterooms below, two full bathrooms, a proper galley, and a hydraulic swim platform that turns any sandbar into your own private beach club.",
  lengthFt: 50,
  maxGuests: 13,
} as const;

export const YACHT_STATS: YachtStat[] = [
  { label: "Length", value: "50 feet", icon: "Ruler" },
  { label: "Guests", value: "Up to 13", icon: "Users" },
  { label: "Staterooms", value: "2 private", icon: "BedDouble" },
  { label: "Top speed", value: "~40 mph", icon: "Gauge" },
];

export const YACHT_FEATURES: YachtFeature[] = [
  {
    title: "Hydraulic swim platform",
    description:
      "Drop the platform at a sandbar or quiet cove and step straight into the Gulf — the easiest water entry on the water.",
    icon: "Waves",
  },
  {
    title: "Two private staterooms",
    description:
      "Climate-controlled cabins below deck give you shade, air conditioning and a place to change or rest between swims.",
    icon: "BedDouble",
  },
  {
    title: "Two full bathrooms",
    description:
      "Two heads with showers on board — no rushing back to the dock, no roughing it.",
    icon: "ShowerHead",
  },
  {
    title: "Full galley",
    description:
      "A complete galley with refrigerator and sink keeps your food and drinks cold all day. Bring what you like — we'll keep it chilled.",
    icon: "Refrigerator",
  },
  {
    title: "Upper deck & large sundeck",
    description:
      "An upper sightseeing and entertainment area plus a spacious sundeck give everyone room to spread out, sunbathe or take in the view.",
    icon: "Sun",
  },
  {
    title: "TVs & games for the kids",
    description:
      "TVs and video games on board keep younger guests happy — this is a charter the whole family actually enjoys.",
    icon: "Tv",
  },
];

/** Short, machine-readable spec list used for AEO answer blocks. */
export const YACHT_SPEC_LINES: string[] = [
  "50-foot luxury performance yacht",
  "Up to 13 guests (6 or 13 depending on the charter option)",
  "Two private climate-controlled staterooms",
  "Two full bathrooms with showers",
  "Full galley with refrigerator and sink",
  "TVs and video games on board",
  "Upper sightseeing / entertainment deck and large sundeck",
  "Hydraulic swim platform",
  "Cruising speed around 10 mph; top speed near 40 mph",
];
