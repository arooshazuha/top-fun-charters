"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import {
  GALLERY,
  GALLERY_CATEGORIES,
  type GalleryMedia,
} from "@/data/gallery";
import { GENERATED_MEDIA } from "@/data/gallery-generated";
import { cn } from "@/lib/utils";

const FILTERS = ["All", ...GALLERY_CATEGORIES] as const;

/** Curated images + auto-generated photos/videos, as one unified list. */
const ALL_MEDIA: GalleryMedia[] = [
  ...GALLERY.map((g) => ({ ...g, type: "image" as const })),
  ...GENERATED_MEDIA,
];

export function GalleryGrid() {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("All");
  const [index, setIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const items = useMemo<GalleryMedia[]>(
    () =>
      active === "All"
        ? ALL_MEDIA
        : ALL_MEDIA.filter((g) => g.category === active),
    [active],
  );

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length)),
    [items.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % items.length)),
    [items.length],
  );

  // Keyboard + scroll lock while lightbox is open
  useEffect(() => {
    if (index === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [index, close, prev, next]);

  const current = index === null ? null : items[index];

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter photos and videos">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={active === f}
            onClick={() => {
              setActive(f);
              setIndex(null);
            }}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              active === f
                ? "border-ink bg-ink text-sand"
                : "border-line text-ink/70 hover:border-ink/40 hover:text-ink",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Masonry */}
      <div className="mt-8 columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
        {items.map((item, i) => (
          <button
            key={`${item.src}-${i}`}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={
              item.type === "video" ? `Play video: ${item.alt}` : `Open image: ${item.alt}`
            }
            className="group relative mb-3 block w-full overflow-hidden rounded-lg md:mb-4"
          >
            <Image
              src={item.type === "video" ? item.poster ?? item.src : item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              quality={70}
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="h-auto w-full bg-sand-200 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
            />
            {item.type === "video" && (
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/20 transition-colors group-hover:bg-ink/10"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-foam/90 shadow-lg ring-1 ring-ink/10 transition-transform group-hover:scale-110">
                  <Play className="size-5 translate-x-0.5 fill-ink text-ink" />
                </span>
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/92 p-4 backdrop-blur-sm md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            onClick={close}
          >
            {/* Controls */}
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 inline-flex size-11 items-center justify-center rounded-full bg-foam/10 text-sand transition-colors hover:bg-foam/20"
            >
              <X className="size-6" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
              className="absolute left-2 z-10 inline-flex size-12 items-center justify-center rounded-full bg-foam/10 text-sand transition-colors hover:bg-foam/20 md:left-6"
            >
              <ChevronLeft className="size-7" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next"
              className="absolute right-2 z-10 inline-flex size-12 items-center justify-center rounded-full bg-foam/10 text-sand transition-colors hover:bg-foam/20 md:right-6"
            >
              <ChevronRight className="size-7" />
            </button>

            {/* Media */}
            <motion.figure
              key={current.src}
              className="relative flex max-h-full max-w-5xl flex-col items-center"
              onClick={(e) => e.stopPropagation()}
              initial={reduce ? undefined : { opacity: 0, scale: 0.97 }}
              animate={reduce ? undefined : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {current.type === "video" ? (
                <video
                  key={current.src}
                  src={current.src}
                  poster={current.poster}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[80vh] w-auto max-w-full rounded-lg bg-ink"
                />
              ) : (
                <Image
                  src={current.src}
                  alt={current.alt}
                  width={current.width}
                  height={current.height}
                  quality={82}
                  sizes="100vw"
                  className="max-h-[80vh] w-auto rounded-lg object-contain"
                />
              )}
              <figcaption className="mt-4 max-w-2xl text-center text-sm text-sand/70">
                {current.alt}
                <span className="ml-2 text-sand/40">
                  {index! + 1} / {items.length}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
