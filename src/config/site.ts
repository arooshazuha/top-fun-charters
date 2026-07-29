/**
 * Central business identity (NAP) and brand constants.
 * Every value here is verified from topfuncharters.com or the exported business
 * documents (see PROJECT_AUDIT.md). Do not add unverified claims.
 */

export const SITE = {
  name: "Top Fun Charters",
  legalName: "Get Serious LLC",
  tagline: "Anna Maria private yacht charter",
  /** Canonical production origin — update if the domain changes. */
  url: "https://www.topfuncharters.com",
  description:
    "Private luxury yacht charters on Anna Maria Island & Bradenton, Florida. Cruise aboard a 50-foot performance yacht for up to 13 guests — sunset cruises, dolphin watching, Egmont Key, sandbars and more.",

  phone: {
    display: "(941) 241-4077",
    e164: "+19412414077",
    href: "tel:+19412414077",
  },
  email: "support@topfuncharters.com",

  /** Departure marina (verified pickup point). */
  address: {
    place: "Safe Harbor Pier 77 Marina",
    street: "12312 Manatee Ave W",
    city: "Bradenton",
    region: "FL",
    regionName: "Florida",
    postalCode: "34209",
    country: "US",
    countryName: "United States",
  },

  areaServed: [
    "Anna Maria Island",
    "Bradenton",
    "Holmes Beach",
    "Bradenton Beach",
    "Longboat Key",
    "Cortez",
    "Palmetto",
    "Egmont Key",
  ],

  social: {
    facebook: "https://www.facebook.com/profile.php?id=61561775165427",
  },

  /** Public "leave a review" link (Google). Lands on the Google listing. */
  googleReviewUrl:
    "https://www.google.com/search?q=Top+Fun+Charters+Anna+Maria+reviews",

  /** Founded / operating notes kept intentionally minimal — no unverified claims. */
  foundedYear: 2024,
} as const;

export const FULL_ADDRESS = `${SITE.address.place}, ${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postalCode}`;

/** Google Maps embed (address query — no API key required). */
export const MAPS_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(
  `${SITE.address.place}, ${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postalCode}`,
)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

/** Human-facing Google Maps link. */
export const MAPS_LINK_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${SITE.address.place} ${SITE.address.street} ${SITE.address.city} ${SITE.address.region} ${SITE.address.postalCode}`,
)}`;
