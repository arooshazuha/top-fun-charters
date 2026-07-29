"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Vertical offset in px to travel from. */
  y?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  blur?: boolean;
};

/** Fade + slide reveal on scroll-into-view. No-ops under reduced motion. */
export function Reveal({
  children,
  className,
  y = 26,
  delay = 0,
  duration = 0.7,
  once = true,
  blur = false,
}: Props) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  const variants: Variants = {
    hidden: { opacity: 0, y, filter: blur ? "blur(8px)" : "blur(0px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
    >
      {children}
    </motion.div>
  );
}
