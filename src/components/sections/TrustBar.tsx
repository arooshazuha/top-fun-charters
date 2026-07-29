import { StarRating } from "@/components/ui/StarRating";

const POINTS = [
  "Experienced local captains",
  "Up to 13 guests",
  "Two staterooms · two baths",
  "Hydraulic swim platform",
  "Bring your own food & drinks",
  "Free marina parking",
  "Sunsets · Dolphins · Sandbars",
  "Departs Bradenton, near Anna Maria Island",
];

export function TrustBar() {
  return (
    <section aria-label="Why guests choose Top Fun Charters" className="bg-ink text-sand">
      <div className="container-x flex flex-col items-center gap-5 border-b border-foam/10 py-5 md:flex-row md:gap-8">
        <div className="flex shrink-0 items-center gap-3">
          <StarRating value={5} size={16} />
          <span className="text-sm font-medium text-sand">
            5.0 on Google
            <span className="text-sand/50"> · 32 five-star reviews</span>
          </span>
        </div>

        <div className="hidden h-5 w-px bg-foam/15 md:block" />

        {/* Marquee of trust points (freezes under reduced motion) */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
          <div className="flex w-max animate-marquee">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1}
                className="flex shrink-0 items-center gap-8 pr-8 text-sm text-sand/70"
              >
                {POINTS.map((p) => (
                  <li key={p} className="flex items-center gap-8 whitespace-nowrap">
                    <span>{p}</span>
                    <span className="text-brass" aria-hidden>◆</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
