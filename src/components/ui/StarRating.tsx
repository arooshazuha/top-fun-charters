import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/** Whole-star rating (Google reviews are whole-star). */
export function StarRating({
  value = 5,
  size = 16,
  className,
}: {
  value?: number;
  size?: number;
  className?: string;
}) {
  const filled = Math.round(value);
  return (
    <div
      className={cn("inline-flex items-center gap-0.5", className)}
      role="img"
      aria-label={`${value} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={cn(
            "shrink-0",
            i < filled ? "fill-brass text-brass" : "fill-transparent text-brass/25",
          )}
          aria-hidden
        />
      ))}
    </div>
  );
}
