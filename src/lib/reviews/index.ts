import "server-only";
import { getGoogleReviews } from "./google";
import { SEED_REVIEWS } from "./seed";
import { ReviewsPayloadSchema, type ReviewsPayload } from "./types";

/**
 * Resolve reviews from the best available source.
 * 1. Google Places (live) when GOOGLE_PLACES_API_KEY + GOOGLE_PLACE_ID are set.
 * 2. Otherwise the seeded real testimonials.
 *
 * The result is validated before it leaves this module.
 */
export async function getReviews(): Promise<ReviewsPayload> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  let payload: ReviewsPayload = SEED_REVIEWS;

  if (apiKey && placeId) {
    try {
      const live = await getGoogleReviews(apiKey, placeId);
      if (live.reviews.length > 0) payload = live;
    } catch (err) {
      // Never break the page on a provider hiccup — fall back to seed.
      console.error("[reviews] Google provider failed, using seed:", err);
    }
  }

  return ReviewsPayloadSchema.parse(payload);
}
