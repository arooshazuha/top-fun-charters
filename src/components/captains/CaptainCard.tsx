import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import type { Captain } from "@/data/captains";
import { initials } from "@/lib/utils";

export function CaptainCard({ captain }: { captain: Captain }) {
  return (
    <article className="lift flex gap-5 rounded-xl border border-line bg-sand-100 p-5 shadow-[var(--shadow-card)]">
      <div className="relative size-24 shrink-0 overflow-hidden rounded-full ring-1 ring-line sm:size-28">
        {captain.photo ? (
          <Image
            src={captain.photo}
            alt={`Captain ${captain.name}`}
            fill
            quality={82}
            sizes="120px"
            className="object-cover"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center bg-sand-200 font-display text-2xl text-ink/45"
            aria-hidden
          >
            {initials(captain.name)}
          </div>
        )}
      </div>

      <div className="min-w-0">
        <h3 className="font-display text-xl leading-tight text-ink">
          {captain.name}
        </h3>
        <p className="text-sm font-medium text-brass-600">{captain.role}</p>
        {captain.bio && (
          <p className="mt-2 text-sm leading-relaxed text-muted">{captain.bio}</p>
        )}

        {(captain.credentials.length > 0 || captain.tags.length > 0) && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {captain.credentials.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1 rounded-full bg-brass/12 px-2.5 py-1 text-xs font-medium text-brass-600"
              >
                <BadgeCheck className="size-3.5" />
                {c}
              </span>
            ))}
            {captain.tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-full border border-line px-2.5 py-1 text-xs text-ink/70"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
