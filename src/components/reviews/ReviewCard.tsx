import { Quote } from "lucide-react";
import { StarRating } from "@/components/ui/StarRating";
import type { Review } from "@/lib/reviews/types";

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full flex-col rounded-xl border border-foam/10 bg-foam/[0.03] p-6">
      <div className="flex items-center justify-between">
        <StarRating value={review.rating} size={15} />
        <Quote className="size-6 text-brass/30" aria-hidden />
      </div>
      <blockquote className="mt-4 flex-1 text-[0.97rem] leading-relaxed text-sand/85">
        &ldquo;{review.text}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brass/15 font-display text-sm text-brass-300"
          aria-hidden
        >
          {initials(review.author)}
        </span>
        <span>
          <span className="block text-sm font-medium text-sand">{review.author}</span>
          <span className="block text-xs text-sand/50">
            {review.location ?? review.relativeTime ?? "Verified guest"}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
