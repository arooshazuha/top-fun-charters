import { Star } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reviews } from "@/components/reviews/Reviews";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/config/site";
import { getReviews } from "@/lib/reviews";

// Server component: fetches once for structured data (SEO); the visible list is
// fetched dynamically on the client (loading / error / empty states).
export async function ReviewsSection() {
  const { reviews, summary } = await getReviews();

  const ratingLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: summary.average,
      reviewCount: summary.total,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.slice(0, 5).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
      },
      reviewBody: r.text,
    })),
  };

  return (
    <Section tone="ink" spacing="lg" className="grain">
      <JsonLd data={ratingLd} />
      <div className="relative z-10">
        <SectionHeading
          align="center"
          tone="light"
          eyebrow="Guest Reviews"
          title="What our guests say"
          intro="We're proud of our reputation on the water. Here's what recent guests had to say about their day aboard Top Fun."
          className="mx-auto"
        />

        <div className="mt-14">
          <Reviews />
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={SITE.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brass px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-brass-300"
          >
            <Star className="size-4" />
            Leave us a review
          </a>
          <span className="text-sm text-sand/50">
            Loved your charter? A quick Google review means the world.
          </span>
        </div>
      </div>
    </Section>
  );
}
