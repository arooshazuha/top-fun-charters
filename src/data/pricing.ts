/**
 * Charter pricing. Figures are verified from the live price list.
 * Taxes are NOT included (verified note). Do not invent add-ons or deposits.
 */

export type PricingOption = { duration: string; hours: number; price: number };

export type PricingTier = {
  id: string;
  name: string;
  guests: string;
  summary: string;
  includes: string[];
  options: PricingOption[];
  /** GHL form key used for this tier's booking form. */
  formKey: "sixPersonCharter" | "thirteenPersonCharter";
  featured?: boolean;
};

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "1-6",
    name: "1-6 Guests",
    guests: "Up to 6 guests",
    summary:
      "Our private yacht rental for smaller groups, perfect for couples, families and friends who want the whole boat to themselves.",
    includes: [
      "Private 50-foot yacht",
      "Up to 6 guests total",
      "Hydraulic swim platform & full amenities",
      "Bring your own food & drinks",
    ],
    options: [
      { duration: "4 hours", hours: 4, price: 1299 },
      { duration: "6 hours", hours: 6, price: 1590 },
      { duration: "8 hours", hours: 8, price: 1799 },
    ],
    formKey: "sixPersonCharter",
  },
  {
    id: "7-13",
    name: "7-13 Guests",
    guests: "7 to 13 guests",
    summary:
      "The full experience for larger groups and celebrations. Price includes the yacht, your captain, crew and fuel, so you can just show up and enjoy.",
    includes: [
      "Private 50-foot yacht",
      "Up to 13 guests total",
      "Captain, crew & fuel included",
      "Hydraulic swim platform & full amenities",
    ],
    options: [
      { duration: "4 hours", hours: 4, price: 1399 },
      { duration: "6 hours", hours: 6, price: 1890 },
      { duration: "8 hours", hours: 8, price: 2320 },
    ],
    formKey: "thirteenPersonCharter",
    featured: true,
  },
];

/** Verified fine print. */
export const PRICING_NOTES: string[] = [
  "Four-hour charters are our most popular option and the relaxed sweet spot; shorter 2-hour outings can be arranged on request.",
  "Taxes are not included in quoted pricing.",
  "The 7-13 guest rate includes yacht, captain, crew and fuel.",
  "Six or 13 is the maximum legal number of passengers, including the person who booked. Exceptions cannot be made.",
  "Alternate pickup or drop-off locations can be arranged with advance notice for an additional fuel and crew cost.",
];

/** From (lowest) price for teaser copy / schema. */
export const PRICE_FROM = 1299;
