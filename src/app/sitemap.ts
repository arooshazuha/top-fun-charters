import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

const ROUTES = [
  "",
  "/pricing",
  "/photos",
  "/captains",
  "/pickup-location",
  "/faq",
  "/forms",
  "/contact",
  "/terms",
  "/privacy",
  "/cancellation-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/pricing" ? 0.9 : 0.7,
  }));
}
