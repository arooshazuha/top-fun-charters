import Link from "next/link";
import type { ReactNode } from "react";
import {
  buttonVariants,
  type ButtonSize,
  type ButtonVariant,
} from "@/lib/button-variants";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = CommonProps & {
  href: string;
  external?: boolean;
};

/**
 * Presentational link-button (server component). Internal links use next/link;
 * external links open safely in a new tab. For analytics-tracked booking CTAs
 * use <BookingButton> instead.
 */
export function LinkButton({
  href,
  external,
  variant,
  size,
  className,
  children,
}: LinkButtonProps) {
  const classes = buttonVariants({ variant, size, className });

  if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    const isHttp = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(isHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
