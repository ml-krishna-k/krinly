import type { MetadataRoute } from "next";

/** TODO: replace with the live domain once registered. */
const SITE_URL = "https://krinly.com";

/**
 * Currently disallows everything: the site is not on its final domain and the
 * layout still sets `robots: noindex`. Flip both together at launch, leaving
 * one of the two set is the usual way a site ends up quietly unindexed.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" }, // TODO: change to `allow: "/"` at launch
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
