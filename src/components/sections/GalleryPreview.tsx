import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const STRIP = [
  { src: "/images/aerial-overhead-yacht.jpg", alt: "Overhead aerial of the Top Fun yacht underway", w: 2600, h: 1025 },
  { src: "/images/aerial-turquoise-water.jpg", alt: "Top Fun yacht on turquoise Gulf water", w: 2200, h: 1238 },
  { src: "/images/yacht-front-view.jpg", alt: "The Top Fun yacht anchored on a sandbar", w: 2000, h: 1500 },
  { src: "/images/aerial-sandbar.jpg", alt: "Yacht anchored at a sandbar near Anna Maria Island", w: 2200, h: 1238 },
  { src: "/images/gallery-10.jpg", alt: "A day out with Top Fun Charters", w: 1800, h: 1350 },
  { src: "/images/egmont-key.jpg", alt: "Egmont Key island beach", w: 1024, h: 768 },
  { src: "/images/aerial-yacht-wake.jpg", alt: "Top Fun yacht carving a wake", w: 2200, h: 1238 },
  { src: "/images/gallery-01.jpg", alt: "Guests aboard a private charter", w: 1800, h: 1350 },
  { src: "/images/aerial-coastline.jpg", alt: "Cruising the Anna Maria Island coastline", w: 2200, h: 1238 },
  { src: "/images/gallery-20.jpg", alt: "Sunshine and open water off Anna Maria Island", w: 1800, h: 1350 },
];

const H = 264;

export function GalleryPreview() {
  return (
    <Section tone="ink" spacing="lg" container={false} className="grain overflow-hidden">
      <div className="container-x relative z-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          tone="light"
          eyebrow="The Gallery"
          title="A look aboard"
          intro="Real photos from real charters — the yacht, the water and the days our guests keep coming back for."
        />
        <Link
          href="/photos"
          className="group hidden items-center gap-2 text-sand transition-colors hover:text-brass-300 md:inline-flex"
        >
          <span className="link-underline font-medium">View all photos</span>
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      {/* Scrolling strip (freezes under reduced motion) */}
      <div className="relative z-10 mt-12 w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_4%,black_96%,transparent)]">
        <div className="flex w-max animate-marquee gap-4">
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-4 pr-4">
              {STRIP.map((img) => (
                <Link
                  key={`${copy}-${img.src}`}
                  href="/photos"
                  className="group relative block shrink-0 overflow-hidden rounded-lg ring-1 ring-foam/10"
                  style={{ height: H, width: Math.round((H * img.w) / img.h) }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    quality={70}
                    sizes="360px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="container-x relative z-10 mt-10 md:hidden">
        <Link
          href="/photos"
          className="inline-flex items-center gap-2 font-medium text-sand hover:text-brass-300"
        >
          View all photos <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </Section>
  );
}
