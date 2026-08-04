"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Star, Users, Ruler, MapPin, ChevronDown } from "lucide-react";
import { BookingButton } from "@/components/booking/BookingButton";
import { LinkButton } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// Poster shown for the instant before the video buffers: a premium gallery
// still (turquoise aerial of the yacht cruising) rather than a raw video frame.
const POSTER = "/images/aerial-turquoise-water.jpg";
const VIDEO_1080 = "/videos/hero.mp4";
const VIDEO_720 = "/videos/hero-720.mp4";

const HEADLINE = ["Anna", "Maria", "private", "yacht", "charter"];

const CHIPS = [
  { icon: Star, label: "5.0 ★ Google rated" },
  { icon: Users, label: "Up to 13 guests" },
  { icon: Ruler, label: "50-ft luxury yacht" },
  { icon: MapPin, label: "Departs Bradenton, FL" },
];

/**
 * Cinematic video hero for Top Fun Charters. A drone clip of the yacht on the
 * Gulf plays behind a luxury ocean gradient, with a subtle scroll-driven zoom +
 * parallax (Framer Motion). The poster ships as an optimized next/image for a
 * fast LCP; the video fades in once it can play. Respects prefers-reduced-motion
 * and Save-Data (poster only) and serves a lighter 720p source on small screens.
 */
export function VideoHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reduce) return;
    try {
      const saveData =
        (navigator as unknown as { connection?: { saveData?: boolean } }).connection
          ?.saveData ?? false;
      if (saveData) return;
      const mobile = window.matchMedia("(max-width: 768px)").matches;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVideoSrc(mobile ? VIDEO_720 : VIDEO_1080);
    } catch {
      /* poster-only fallback */
    }
  }, [reduce]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      aria-label="Top Fun Charters, Anna Maria Island private yacht charter"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink pb-16 pt-[var(--header-h)] md:pb-20"
    >
      {/* Media (poster + video) with scroll zoom + parallax. A bright, coastal
          color grade (lifted brightness + saturation) reads vibrant and blue. */}
      <motion.div
        aria-hidden
        className="absolute inset-0 z-0 [filter:saturate(1.22)_brightness(1.08)_contrast(1.04)]"
        style={reduce ? undefined : { scale: mediaScale, y: mediaY }}
      >
        <Image
          src={POSTER}
          alt="A Top Fun Charters luxury yacht cruising the Gulf of Mexico near Anna Maria Island, Florida"
          fill
          priority
          quality={82}
          sizes="100vw"
          className="object-cover object-center"
        />
        {videoSrc && (
          <video
            key={videoSrc}
            src={videoSrc}
            poster={POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={() => setReady(true)}
            className={cn(
              "absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700",
              ready ? "opacity-100" : "opacity-0",
            )}
          />
        )}
      </motion.div>

      {/* Legibility only, no color wash: a bottom-weighted deep-teal fade keeps
          the white headline readable while the footage stays bright and clean. */}
      <div aria-hidden className="absolute inset-0 z-10 bg-gradient-to-t from-ink via-ink/45 to-transparent" />
      <div aria-hidden className="absolute inset-0 z-10 bg-gradient-to-r from-ink/40 via-transparent to-transparent" />

      {/* Content */}
      <motion.div
        className="container-x relative z-20"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-3xl">
          <motion.p
            className="eyebrow text-white/85 [text-shadow:0_2px_6px_rgba(0,0,0,0.7)]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Anna Maria Island · Bradenton, Florida
          </motion.p>

          <h1 className="mt-5 text-balance font-display text-[clamp(2.6rem,8vw,5.5rem)] font-light leading-[0.98] text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.65)]">
            {HEADLINE.map((word, i) => (
              <Fragment key={word}>
                {i > 0 && " "}
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.85,
                    delay: 0.15 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word === "private" ? (
                    <em className="italic text-brass-300">private</em>
                  ) : (
                    word
                  )}
                  {i === HEADLINE.length - 1 && (
                    <span className="text-brass-300">!</span>
                  )}
                </motion.span>
              </Fragment>
            ))}
          </h1>

          <motion.p
            className="mt-6 max-w-xl text-pretty text-lg text-white/90 [text-shadow:0_2px_8px_rgba(0,0,0,0.6)] md:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            The whole boat is yours. Cruise the calm Gulf aboard a 50-foot
            luxury yacht for up to 13 guests. Relaxed 4-hour charters are the
            sweet spot, with 2-hour and full-day options too.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <BookingButton size="lg" />
            <LinkButton href="/pricing" variant="outlineLight" size="lg">
              View pricing
            </LinkButton>
          </motion.div>

          <motion.ul
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            {CHIPS.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-sm font-medium text-white/90 [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]"
              >
                <Icon className="size-4 text-brass-300" />
                {label}
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute inset-x-0 bottom-6 z-20 flex flex-col items-center gap-2 text-white/70 [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <span className="eyebrow text-[0.65rem]">Scroll</span>
        <motion.span
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="size-4" />
        </motion.span>
      </motion.div>
    </section>
  );
}

export default VideoHero;
