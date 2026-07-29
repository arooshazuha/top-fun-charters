"use client";

import { useCallback, useEffect, useState } from "react";
import { RotateCw, Star } from "lucide-react";
import type { ReviewsPayload } from "@/lib/reviews/types";
import { ReviewCard } from "./ReviewCard";
import { StarRating } from "@/components/ui/StarRating";

const PAGE = 6;

function Skeleton() {
  return (
    <div
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      aria-busy="true"
      aria-live="polite"
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="h-56 rounded-xl border border-foam/10 bg-gradient-to-r from-foam/[0.03] via-foam/[0.06] to-foam/[0.03] bg-[length:200%_100%] animate-shimmer"
        />
      ))}
      <span className="sr-only">Loading reviews…</span>
    </div>
  );
}

export function Reviews() {
  const [data, setData] = useState<ReviewsPayload | null>(null);
  const [status, setStatus] = useState<"loading" | "error" | "ready">("loading");
  const [visible, setVisible] = useState(PAGE);

  const load = useCallback(() => {
    setStatus("loading");
    fetch("/api/reviews")
      .then((r) => {
        if (!r.ok) throw new Error("Request failed");
        return r.json() as Promise<ReviewsPayload>;
      })
      .then((d) => {
        setData(d);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  useEffect(() => {
    // Initial dynamic fetch on mount (loading → ready/error/empty).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  if (status === "loading") return <Skeleton />;

  if (status === "error") {
    return (
      <div
        role="alert"
        className="mx-auto max-w-md rounded-xl border border-foam/10 bg-foam/[0.03] p-8 text-center"
      >
        <p className="text-sand/80">We couldn&apos;t load reviews right now.</p>
        <button
          type="button"
          onClick={load}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-foam/20 px-5 py-2 text-sm font-medium text-sand transition-colors hover:border-brass hover:text-brass-300"
        >
          <RotateCw className="size-4" /> Try again
        </button>
      </div>
    );
  }

  if (!data || data.reviews.length === 0) {
    return (
      <div className="mx-auto max-w-md rounded-xl border border-foam/10 bg-foam/[0.03] p-8 text-center text-sand/70">
        <Star className="mx-auto size-6 text-brass" />
        <p className="mt-3">
          Reviews are on the way. Be the first to share your day on the water!
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center">
        <StarRating value={data.summary.average} size={20} />
        <p className="text-sand/85">
          <span className="font-semibold text-sand">
            {data.summary.average.toFixed(1)}
          </span>{" "}
          from{" "}
          <span className="font-semibold text-sand">{data.summary.total}</span>{" "}
          reviews
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {data.reviews.slice(0, visible).map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>

      {visible < data.reviews.length && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE)}
            className="inline-flex items-center gap-2 rounded-full border border-foam/20 px-6 py-2.5 text-sm font-medium text-sand transition-colors hover:border-brass hover:text-brass-300"
          >
            Show more reviews
          </button>
        </div>
      )}
    </div>
  );
}
