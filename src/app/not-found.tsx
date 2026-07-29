import Link from "next/link";
import { LinkButton } from "@/components/ui/Button";
import { NAV_ITEMS } from "@/data/navigation";

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[70svh] items-center bg-ink text-sand">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(21,105,123,0.35),transparent_60%)]"
      />
      <div className="container-x relative z-10 py-24 text-center">
        <p className="eyebrow text-brass-300">Off the map</p>
        <h1 className="mx-auto mt-5 max-w-2xl text-balance font-display text-[clamp(2.4rem,6vw,4.5rem)] font-light leading-[1.02] text-foam">
          This page has drifted off course
        </h1>
        <p className="mx-auto mt-5 max-w-md text-sand/70">
          The page you&apos;re looking for isn&apos;t here — but the Gulf is
          still calling. Let&apos;s get you back on board.
        </p>
        <div className="mt-9 flex justify-center">
          <LinkButton href="/" variant="primary" size="lg">
            Back to home
          </LinkButton>
        </div>
        <nav aria-label="Helpful links" className="mt-10">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-sand/60">
            {NAV_ITEMS.filter((i) => !i.href.startsWith("/#")).map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="transition-colors hover:text-brass-300">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
