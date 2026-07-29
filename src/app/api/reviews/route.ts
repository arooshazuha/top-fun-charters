import { getReviews } from "@/lib/reviews";

// Cache the response for an hour; serve stale while revalidating.
export const revalidate = 3600;

export async function GET() {
  try {
    const data = await getReviews();
    return Response.json(data, {
      headers: {
        "Cache-Control":
          "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    console.error("[api/reviews]", err);
    return Response.json(
      { error: "Unable to load reviews right now." },
      { status: 500 },
    );
  }
}
