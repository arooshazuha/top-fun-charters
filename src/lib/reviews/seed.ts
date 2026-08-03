import type { ReviewsPayload } from "./types";

/**
 * SEED / FALLBACK ONLY.
 *
 * These are REAL, published testimonials from topfuncharters.com, not invented.
 * They are used only when no live review provider (Google Places) is configured
 * via env vars. Production data flows from the provider in ./index.ts, so nothing
 * here is a hard-coded production array baked into the UI.
 *
 * The summary reflects the business's known standing (32 five-star reviews).
 */
export const SEED_REVIEWS: ReviewsPayload = {
  reviews: [
    {
      id: "seed-carrie-berens",
      author: "Carrie Berens",
      rating: 5,
      text: "What a fun day out at Egmont Key with Top Fun Charters. Great shelling and a beautiful beach. Matt is an excellent Captain and host!",
      location: "Bradenton, FL",
      source: "seed",
    },
    {
      id: "seed-matt-s",
      author: "Matt S.",
      rating: 5,
      text: "Captain Matt is very professional, educated and enthusiastic about the trip. Tons of fun, 10/10 would charter again anytime.",
      location: "Greensburg, PA",
      source: "seed",
    },
    {
      id: "seed-rebecca-marchino",
      author: "Rebecca Marchino",
      rating: 5,
      text: "Had a wonderful day on this magnificent boat! Watching the dolphins play in the wake was the highlight!",
      location: "Bradenton, FL",
      source: "seed",
    },
  ],
  summary: { average: 5, total: 32, source: "seed" },
};
