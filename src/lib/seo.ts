import type { Metadata } from "next";
import { SITE } from "@/config/site";

const DEFAULT_OG = "/og/default.jpg";
const BUSINESS_IMAGE = "/images/aerial-turquoise-water.jpg";

type BuildMeta = {
  title: string;
  description: string;
  /** Path beginning with "/", becomes the canonical URL. */
  path?: string;
  image?: string;
  noIndex?: boolean;
  keywords?: string[];
};

/**
 * Single source for page metadata. Guarantees a unique title/description,
 * canonical URL and social cards on every page.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  image = DEFAULT_OG,
  noIndex = false,
  keywords,
}: BuildMeta): Metadata {
  const url = new URL(path, SITE.url).toString();
  const fullTitle =
    path === "/" ? `${SITE.name} | ${SITE.tagline}` : `${title} | ${SITE.name}`;

  return {
    title: { absolute: fullTitle },
    description,
    keywords,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, "max-image-preview": "large" },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title: fullTitle,
      description,
      url,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

/* ------------------------------------------------------------------ *
 * JSON-LD structured data builders (AEO)
 * ------------------------------------------------------------------ */

const ORG_ID = `${SITE.url}/#business`;

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TouristAttraction"],
    "@id": ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.phone.e164,
    email: SITE.email,
    image: `${SITE.url}${BUSINESS_IMAGE}`,
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    areaServed: SITE.areaServed.map((name) => ({ "@type": "Place", name })),
    sameAs: [SITE.social.facebook],
    knowsAbout: [
      "Private yacht charter",
      "Sunset cruises",
      "Dolphin watching",
      "Egmont Key trips",
      "Sandbar excursions",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Private yacht charter",
    provider: { "@id": ORG_ID },
    areaServed: SITE.areaServed.map((name) => ({ "@type": "Place", name })),
    description:
      "Private luxury yacht charters for up to 13 guests around Anna Maria Island and Bradenton, Florida.",
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: "1299",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "USD",
        price: "1299",
        description: "Starting rate for a 4-hour private charter for up to 6 guests (taxes not included).",
      },
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: new URL(item.path, SITE.url).toString(),
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
