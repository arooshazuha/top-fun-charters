import type { Review, ReviewsPayload } from "./types";

type GooglePlaceReview = {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description?: string;
  time: number;
};

type GooglePlaceDetails = {
  status: string;
  result?: {
    rating?: number;
    user_ratings_total?: number;
    reviews?: GooglePlaceReview[];
  };
};

/**
 * Live reviews from the Google Places Details API. The API key stays server-side
 * (this module is only imported by the server-only reviews resolver / route).
 */
export async function getGoogleReviews(
  apiKey: string,
  placeId: string,
): Promise<ReviewsPayload> {
  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "rating,user_ratings_total,reviews");
  url.searchParams.set("reviews_sort", "newest");
  url.searchParams.set("key", apiKey);

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Google Places HTTP ${res.status}`);

  const data = (await res.json()) as GooglePlaceDetails;
  if (data.status !== "OK" || !data.result) {
    throw new Error(`Google Places status ${data.status}`);
  }

  const reviews: Review[] = (data.result.reviews ?? [])
    .filter((r) => r.text?.trim())
    .map((r) => ({
      id: `google-${r.time}`,
      author: r.author_name,
      rating: r.rating,
      text: r.text.trim(),
      relativeTime: r.relative_time_description,
      date: new Date(r.time * 1000).toISOString(),
      source: "google" as const,
    }));

  return {
    reviews,
    summary: {
      average: data.result.rating ?? 5,
      total: data.result.user_ratings_total ?? reviews.length,
      source: "google",
    },
  };
}
