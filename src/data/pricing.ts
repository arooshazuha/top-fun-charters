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
  /** Short clarifier shown under the price (e.g. the bareboat captain note). */
  priceNote?: string;
  featured?: boolean;
};

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "1-6",
    name: "1-6 Guests",
    guests: "Up to 6 guests",
    summary:
      "Our private captained charter for smaller groups, perfect for couples, families and friends who want the whole boat to themselves.",
    includes: [
      "Private 50-foot yacht, exclusive use",
      "Licensed captain included in the rate",
      "Hydraulic swim platform & full amenities",
      "Bring your own food & drinks",
    ],
    options: [
      { duration: "4 hours", hours: 4, price: 1299 },
      { duration: "6 hours", hours: 6, price: 1590 },
      { duration: "8 hours", hours: 8, price: 1799 },
    ],
    formKey: "sixPersonCharter",
    priceNote: "Captained charter. A licensed captain is included in the rate.",
  },
  {
    id: "7-13",
    name: "7-13 Guests",
    guests: "7 to 13 guests",
    summary:
      "A private bareboat charter for larger groups and celebrations. You charter the boat and select a licensed captain who is hired and paid directly, keeping pricing transparent and Coast Guard compliant.",
    includes: [
      "Private 50-foot yacht, exclusive use",
      "7 to 13 guests total",
      "Bareboat charter: you select and hire your captain directly",
      "Hydraulic swim platform & full amenities",
    ],
    options: [
      { duration: "4 hours", hours: 4, price: 1399 },
      { duration: "6 hours", hours: 6, price: 1890 },
      { duration: "8 hours", hours: 8, price: 2320 },
    ],
    formKey: "thirteenPersonCharter",
    priceNote:
      "Boat charter fee only. A licensed captain is selected and paid directly to the captain, as a separate fee.",
    featured: true,
  },
];

/** Verified fine print. */
export const PRICING_NOTES: string[] = [
  "Four-hour charters are our most popular option and the relaxed sweet spot; shorter 2-hour outings can be arranged on request.",
  "Taxes are not included in quoted pricing.",
  "For 1 to 6 guests, your charter is captained: a licensed captain is included in the rate.",
  "For 7 to 13 guests, charters follow the U.S. Coast Guard bareboat model. The listed rate is the private boat charter; your licensed captain is selected and paid directly to the captain, as a separate fee. Captain fees are not paid by Top Fun Charters.",
  "You book directly with the owner-operator, so there are no broker markups or hidden booking fees.",
  "Six or 13 is the maximum legal number of passengers, including the person who booked. Exceptions cannot be made.",
  "Alternate pickup or drop-off locations can be arranged with advance notice for an additional fuel and crew cost.",
];

/** From (lowest) price for teaser copy / schema. */
export const PRICE_FROM = 1299;
