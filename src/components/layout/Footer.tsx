import Link from "next/link";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { SITE, FULL_ADDRESS, MAPS_LINK_URL } from "@/config/site";
import { FOOTER_NAV } from "@/data/navigation";
import { Logo } from "@/components/layout/Logo";
import { BookingButton } from "@/components/booking/BookingButton";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8v8.44C19.61 23.08 24 18.09 24 12.07Z" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="grain relative bg-ink text-sand">
      {/* CTA band */}
      <div className="relative z-10 border-b border-foam/10">
        <div className="container-x flex flex-col items-start gap-6 py-14 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-balance font-display text-3xl leading-tight text-sand md:text-4xl">
              Your day on the water starts here
            </h2>
            <p className="mt-3 text-sand/70">
              Check live availability and lock in the date that fits your group.
            </p>
          </div>
          <BookingButton size="lg" />
        </div>
      </div>

      {/* Main */}
      <div className="container-x relative z-10 grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo variant="cream" height={44} />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-sand/65">
            Private luxury yacht charters on Anna Maria Island and Bradenton,
            Florida. Up to 13 guests aboard a 50-foot luxury yacht.
          </p>
          <div className="mt-6 flex flex-col gap-3 text-sm">
            <a href={SITE.phone.href} className="group inline-flex items-center gap-3 text-sand/80 hover:text-brass-300">
              <Phone className="size-4 text-brass" />
              {SITE.phone.display}
            </a>
            <a href={`mailto:${SITE.email}`} className="group inline-flex items-center gap-3 text-sand/80 hover:text-brass-300">
              <Mail className="size-4 text-brass" />
              {SITE.email}
            </a>
            <a
              href={MAPS_LINK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-start gap-3 text-sand/80 hover:text-brass-300"
            >
              <MapPin className="mt-0.5 size-4 shrink-0 text-brass" />
              <span>{FULL_ADDRESS}</span>
            </a>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <a
              href={SITE.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Top Fun Charters on Facebook"
              className="inline-flex size-10 items-center justify-center rounded-full border border-foam/15 text-sand/80 transition-colors hover:border-brass hover:text-brass"
            >
              <FacebookIcon className="size-4" />
            </a>
          </div>
        </div>

        {FOOTER_NAV.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h3 className="eyebrow text-brass-300">{group.title}</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="inline-flex items-center gap-1 text-sand/70 transition-colors hover:text-sand"
                  >
                    {link.label}
                    {link.external && <ArrowUpRight className="size-3" />}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-foam/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-sand/50 sm:flex-row">
          <p>
            © {year} {SITE.name}. {SITE.legalName}. All rights reserved.
          </p>
          <p className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-sand/80">Terms</Link>
            <Link href="/privacy" className="hover:text-sand/80">Privacy</Link>
            <Link href="/cancellation-policy" className="hover:text-sand/80">Cancellation</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
