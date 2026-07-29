"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Animated confirmation checkmark: a spring-in green disc with a drawing check
 *  and a soft ripple. Renders statically under reduced-motion. */
export function SuccessCheck() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto flex size-24 items-center justify-center">
      {!reduce && (
        <>
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full bg-emerald-400/30"
            initial={{ scale: 0.7, opacity: 0.6 }}
            animate={{ scale: 1.7, opacity: 0 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full bg-emerald-400/20"
            initial={{ scale: 0.7, opacity: 0.5 }}
            animate={{ scale: 1.7, opacity: 0 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
          />
        </>
      )}

      <motion.div
        className="relative flex size-24 items-center justify-center rounded-full bg-emerald-500 shadow-[0_16px_44px_-10px_rgba(16,185,129,0.75)] ring-8 ring-emerald-500/15"
        initial={reduce ? false : { scale: 0, rotate: -12 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 210, damping: 15, delay: 0.1 }}
      >
        <svg viewBox="0 0 52 52" className="size-11" fill="none" aria-hidden>
          <motion.path
            d="M14 27.5 L22.5 36 L38.5 17.5"
            stroke="white"
            strokeWidth={5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
