import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

/** TODO: replace with the live domain once registered. */
const SITE_URL = "https://krinly.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({
      url: `${SITE_URL}/work/${p.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
