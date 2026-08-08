import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

/** TODO: replace with the live domain once registered. */
const SITE_URL = "https://krinly.com";

const ROUTES = [
  "",
  "/innovation-labs",
  "/schools",
  "/colleges",
  "/technology",
  "/work",
  "/about",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...ROUTES.map((r) => ({
      url: `${SITE_URL}${r}`,
      changeFrequency: "monthly" as const,
      priority: r === "" ? 1 : 0.8,
    })),
    ...projects.map((p) => ({
      url: `${SITE_URL}/work/${p.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
