/**
 * Charter experiences. Only experiences the business actually offers
 * (verified from topfuncharters.com). Copy is intentionally understated —
 * no promises the crew can't keep.
 */

export type Experience = {
  slug: string;
  title: string;
  blurb: string;
  image: string;
  imageAlt: string;
  icon: string;
};

export const EXPERIENCES: Experience[] = [
  {
    slug: "sunset-cruises",
    title: "Sunset Cruises",
    blurb:
      "End the day on the water as the Gulf turns gold. Bring a bottle, find a spot on the sundeck, and let the captain handle the rest.",
    image: "/images/aerial-open-water.jpg",
    imageAlt: "Top Fun Charters yacht cruising open Gulf water near Anna Maria Island",
    icon: "Sunset",
  },
  {
    slug: "dolphin-watching",
    title: "Dolphin Watching",
    blurb:
      "Our local dolphins love to ride the wake. Cruise at an easy pace and watch them play alongside the boat — a favorite with kids and grandkids.",
    image: "/images/aerial-yacht-wake.jpg",
    imageAlt: "Wake behind the Top Fun yacht where dolphins play near Anna Maria Island",
    icon: "Fish",
  },
  {
    slug: "sandbar-days",
    title: "Sandbar Days",
    blurb:
      "Anchor off a shallow sandbar, drop the swim platform, and spend the afternoon in waist-deep turquoise water. This is the Florida you came for.",
    image: "/images/aerial-sandbar.jpg",
    imageAlt: "Top Fun yacht anchored at a turquoise sandbar off Anna Maria Island",
    icon: "Umbrella",
  },
  {
    slug: "egmont-key",
    title: "Egmont Key",
    blurb:
      "Run out to Egmont Key — a remote island of white sand, historic ruins and some of the best shelling on the Gulf Coast.",
    image: "/images/egmont-key.jpg",
    imageAlt: "Egmont Key island beach reached by Top Fun Charters",
    icon: "TreePalm",
  },
  {
    slug: "shelling-adventures",
    title: "Shelling Adventures",
    blurb:
      "Beach the day on a quiet stretch of shoreline and comb for shells with the family. Slow, simple and unforgettable.",
    image: "/images/egmont-key-shelling.jpg",
    imageAlt: "Shelling on a white-sand beach near Anna Maria Island",
    icon: "Shell",
  },
  {
    slug: "celebrations",
    title: "Private Celebrations",
    blurb:
      "Birthdays, bachelor and bachelorette parties, anniversaries, family reunions — the whole boat is yours for the day.",
    image: "/images/gallery-01.jpg",
    imageAlt: "Guests celebrating aboard a private Top Fun Charters yacht",
    icon: "PartyPopper",
  },
];

/** One-line experience list for AEO / schema descriptions. */
export const EXPERIENCE_SUMMARY =
  "Sunset cruises, dolphin watching, sandbar days, Egmont Key trips, shelling adventures, private island beaches, and private celebrations including bachelor/bachelorette parties and family events.";
