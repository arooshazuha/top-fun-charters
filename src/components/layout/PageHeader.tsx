import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

type Crumb = { name: string; path: string };

export function PageHeader({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  crumbs = [],
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  image?: string;
  imageAlt?: string;
  crumbs?: Crumb[];
}) {
  const allCrumbs: Crumb[] = [{ name: "Home", path: "/" }, ...crumbs];

  return (
    <section className="grain relative isolate overflow-hidden bg-ink text-sand">
      <JsonLd data={breadcrumbSchema(allCrumbs)} />

      {image ? (
        <>
          <Image
            src={image}
            alt={imageAlt ?? ""}
            aria-hidden={!imageAlt}
            fill
            priority
            quality={75}
            sizes="100vw"
            className="object-cover object-center opacity-40"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/60" />
        </>
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(120%_80%_at_15%_0%,rgba(21,105,123,0.35),transparent_60%)]"
        />
      )}

      <div className="container-x relative z-10 pb-14 pt-[calc(var(--header-h)+2.5rem)] md:pb-20 md:pt-[calc(var(--header-h)+4rem)]">
        <Reveal>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-sand/55">
              {allCrumbs.map((c, i) => {
                const last = i === allCrumbs.length - 1;
                return (
                  <li key={c.path} className="flex items-center gap-1.5">
                    {last ? (
                      <span className="text-sand/80" aria-current="page">{c.name}</span>
                    ) : (
                      <Link href={c.path} className="transition-colors hover:text-brass-300">
                        {c.name}
                      </Link>
                    )}
                    {!last && <ChevronRight className="size-3.5 text-sand/30" />}
                  </li>
                );
              })}
            </ol>
          </nav>
        </Reveal>

        {eyebrow && (
          <Reveal delay={0.03}>
            <span className="eyebrow mt-6 inline-flex items-center gap-2 text-brass-300">
              <span className="h-px w-6 bg-current opacity-60" aria-hidden />
              {eyebrow}
            </span>
          </Reveal>
        )}

        <Reveal delay={0.05}>
          <h1 className="mt-4 max-w-3xl text-balance font-display text-[clamp(2.2rem,5.5vw,4rem)] font-light leading-[1.03] text-foam">
            {title}
          </h1>
        </Reveal>

        {intro && (
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-sand/75">
              {intro}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
