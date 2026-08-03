import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const SRC = {
  color: "/brand/top-fun-charters-logo.png",
  cream: "/brand/logo-cream.png",
  ink: "/brand/logo-ink.png",
} as const;

const RATIO = 700 / 247;

export function Logo({
  variant = "color",
  height = 42,
  className,
  priority = false,
  linked = true,
}: {
  variant?: keyof typeof SRC;
  height?: number;
  className?: string;
  priority?: boolean;
  linked?: boolean;
}) {
  const img = (
    <Image
      src={SRC[variant]}
      alt="Top Fun Charters"
      width={Math.round(height * RATIO)}
      height={height}
      priority={priority}
      className={cn("object-contain", className)}
      style={{ height, width: "auto" }}
      sizes="200px"
      suppressHydrationWarning
    />
  );

  if (!linked) return img;

  return (
    <Link href="/" aria-label="Top Fun Charters, home" className="inline-flex">
      {img}
    </Link>
  );
}
